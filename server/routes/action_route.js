'use strict';

import whilst                from 'async/whilst';
import Promise               from 'bluebird';
import bodyParser            from 'body-parser'
import natural			         from 'natural';
import openwhisk             from 'openwhisk';
import uuid                  from 'node-uuid';
import dbText                from '../api/dbText';
import classify              from '../api/classify';
import watson                from '../api/watson';
import agents                from '../api/agents';
import { g, b, gr, r, y }    from '../color/chalk';

const getAgents =       Promise.promisify(agents.get.bind(agents));
const extractAgents =   Promise.promisify(agents.extract.bind(agents));
const getWatson =       Promise.promisify(watson.get.bind(watson));
const updateDBText =    Promise.promisify(dbText.update.bind(dbText));

// openwhisk configurators
var options = {apihost: 'openwhisk.ng.bluemix.net',
               api: 'https://openwhisk.ng.bluemix.net/api/v1/',
               api_key: '2fcf92aa-bc9a-4765-a9c8-361fdfd8c914:VZUUzt3Eyt12OOtb5idbFaqmCTdhYM9fJBLgGn2PR3OwEy96B4j9OJ7xfiOMS2ax'
              };

var ow = openwhisk(options);



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

    ////////////////////////////////////////////////////////////
    //////    Agent Router based on Identified Topic       ////
    //////////////////////////////////////////////////////////

module.exports = function(router) {
    router.use(bodyParser.json());
      //evaluate a new message
      router.post('/message', function(req, res, next) {

        console.log(g('Action API Route'));

        let created_at =      req.bag.state.transact_at;
        let From =            req.bag.state.from_client;

        /////////////////////////////////////////////////////////////////////////////////////
        ////////////            SECTION TO BE REFACTORED                         /////////////
        /////////////////////////////////////////////////////////////////////////////////////

        // note: this api will be refactored to retrieve intents and agents based on client id
        // client id would be passed as part of state object as well
        // clone array returned via github potentially
        // the agents are attached to the req.bag object in state.js  --- we need to load this up on initialization
        let configureAgents = [];
        configureAgents = req.bag.agents.slice()


        // currently spoofed and set by classify
        let turns = req.bag.state.count;
        let intent = req.bag.state.input_intent[turns].intent;

        // test data - grab a random bot from array of bots associated with intent
        // ultimately will be filtered based on priority code
        // note 4th bot in the array is from openwhisk -- used for testing
        let x = getRandomInt(0, 2);

        // retrieve agent ID based on the intent of the text deciphered by AI process
        let workFlowObject = {};
        var workflow = [];
        var responses = [];

        let chaotic = {};
        chaotic =  configureAgents.filter(function (obj){
            return obj.intent == intent;
          })

        // using the platform associated with the intent of the agent, retrieve config data
        let nextAgentConfig = {}
        nextAgentConfig =  configureAgents.filter(function (obj){
              return obj.platform == chaotic[0].agent[x].platform;
        })

        workFlowObject = Object.assign({}, chaotic[0].agent[x], nextAgentConfig[0]);
        workflow.push(workFlowObject)

        console.log(g('Agent Identified and Configured based on Intent'));
        console.log({intent: intent});
        console.log({workflowobject: JSON.stringify(workFlowObject)});
        console.log({chaotic: JSON.stringify(chaotic)});
        console.log({agentconfig: JSON.stringify(nextAgentConfig)});

        /////////////////////////////////////////////////////////////////////////////////////

        // count is equal to the number of interactions with agents
        // which is dynamic since an agent may engage another to complete a
        // dialogue

        var count = 0;
          whilst(
            function() { return count < workflow.length; },

            function(callback) {

              let apiType = workflow[count].platform;
              count++;

              switch (apiType) {

                case "watson":
                  getWatson(req.bag.state.output_dialogue_objects)
                    .then(function(response){

                      let sourceObject = {
                        platform: 'watson'
                      }
                      let inputObject = Object.assign(sourceObject, response.watsonResponse)
                      req.bag.state.output_dialogue_objects.push(inputObject)  // capture response object in state

                      console.log(g('watson responds'));
                      console.log({watson: JSON.stringify(inputObject)})

                      // future fix -- need to iterate over output array
                      req.bag.state.response = response.watsonResponse.output.text[0];   // REFACTOR Need to iterate over output array

                      // inspect watsonResponse
                      // if bot referral then grab bot config from config array
                      // workFlowObject = Object.assign({}, chaotic[0].agent[x])
                      // workflow.push(workFlowObject);

                      extractAgents(req.bag.state)
                        .then(function(response){

                          // retrieve agent configuration based on platform and agent name
                          // needs to be updated to handle no agent being returned and for configuring workflow
                          // extractAgents needs to be fixed to laod and return an array of objects
                          console.log(g("Extracted Agent - BACK IN ACTION"))
                          console.log(JSON.stringify(response))

                          // grab config and auth data for platform to be pulsed
                          let configobj = {}
                          configobj =  configureAgents.filter(function (obj){
                              return obj.platform == response.platform;
                            })
                          // grab intent objects for further filtering
                          let intentobj = {}
                          intentobj =  configureAgents.filter(function (obj){
                              return obj.platform == response.intent;
                            })
                         // from the filtered intent array, grab the agent that matches
                          let agentobj = {}
                          agentobj =  intentobj.filter(function (obj){
                                return obj.platform == response.agent;
                            })

                          // merge two objects to create new workflow entry
                          workFlowObject = {};
                          workFlowObject = Object.assign(configobj[0], agentobj[0]);

                          // final update specific properties
                          workFlowObject.name = response.agent;
                          workFlowObject.greeting = response.greeting;
                          workFlowObject.id = uuid.v1({msecs: new Date()});

                          console.log("DEBUG FROM CASE WATSON")

/*
                          // build agent object for insertion to workflow.
                          // First, copy in directly the parms from the response object
                          let nextAgentParms = {}
                          nextAgentParms.greeting = nextAgentConfig.greeting;  // note permits user to insert new greeting via response
                          nextAgentParms.platform = nextAgentConfig.platform;
                          nextAgentParms.intent = nextAgentConfig.intent;

                          // This step grabs data from config object related to agent platform
                          nextAgentParms.url = nextAgentConfig.url;
                          nextAgentParms.username = nextAgentConfig.username;
                          nextAgentParms.password = nextAgentConfig.password;
                          nextAgentParms.version_date = nextAgentConfig.version_date;
                          nextAgentParms.version = nextAgentConfig.version;

                          // This step grabs final config related to agent based on intent
                          // First - filter config file based on intent stated for agent
                          let nextAgentID = {}
                          nextAgentID =  configureAgents.filter(function (obj){
                              return obj.intent == nextAgentConfig.intent;
                            })
                          nextAgentParms.avatar = nextAgentID.avatar;
                          nextAgentParms.priority = nextAgentID.priority;

                          // time stamp the object
                          nextAgentParms.id = uuid.v1({msecs: new Date()});

                          // insert object into workflow

                          workFlowObject = {};
                          workFlowObject = Object.assign({}, nextAgentParms);
            */
                          workflow.push(workFlowObject)

                          console.log(b('Agent Configured based on Intent'));
                          console.log({newagent: workFlowObject});
                          console.log({array: workflow});
                          callback(null, 'watson')
                        })
                    })

                  break;

                case "wit":
                    console.log(g('wit responds'));
                    callback(null, 'wit')
                    // load response array
                    break;

                case "api":
                    console.log(g('api responds'));
                    callback(null, 'api')

                    break;

                case "google":
                    console.log(g('google responds'));

                    callback(null, 'google')

                    break;

                case "microsoft":
                    console.log(g('microsoft responds'));
                    callback(null, 'microsoft')

                    break;

                case "open":
                    ow.actions.invoke({actionName: 'shipaddress', blocking: true, params: {}})
                      .then(function(result){
                      console.log(g('open responds'));
                      console.log({result: JSON.stringify(result)})
                      // spoof
                      req.bag.state.response = result.response.result.payload
                      callback(null, 'open')
                    })

                    break;

                case "slack":
                    console.log(g('slack responds'));

                    callback(null, 'slack')

                    break;

                default:
                    console.log(r('AGENT PLATFORM UNKNOWN'))
                    callback(null, workFlowObject)
                    break;
                }
  //            callback(null, workFlowObject)

            },
            function (err, n) {
              console.log("WHILST FUNCTION EXECUTED")
              console.log({n: JSON.stringify(n)})
              next()
            }
          )
        })
      }
