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
import workflow              from '../api/workflow';
import { g, b, gr, r, y }    from '../color/chalk';

const getAgents =       Promise.promisify(agents.get.bind(agents));
const extractAgents =   Promise.promisify(agents.extract.bind(agents));
const setWorkflow =     Promise.promisify(workflow.set.bind(workflow));
const getWatson =       Promise.promisify(watson.get.bind(watson));
const updateDBText =    Promise.promisify(dbText.update.bind(dbText));

let configureAgents = [];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
    ////////////////////////////////////////////////////////////
    //////  Agent Router - Invoke Agent based intent       ////
    //////////////////////////////////////////////////////////

module.exports = function(router) {
    router.use(bodyParser.json());
      //evaluate a new message
      router.post('/message', function(req, res, next) {

        console.log(g('Action API Route'));

        let created_at =      req.bag.state.transact_at;
        let From =            req.bag.state.from_client;

        /////////////////////////////////////////////////////////////////////////////////////
        ////////////                         Initialize                         /////////////
        /////////////////////////////////////////////////////////////////////////////////////

        // the agents are attached to the req.bag object in state.js  --- we need to load this up on initialization

        configureAgents = req.bag.agents.slice()
        let turns =       req.bag.state.count;
        let intent =      req.bag.state.input_intent[turns].intent;

        var workflow = [];
        var responses = [];
        // note that in the first cycle of processing a message the
        // intent is known but not yet matched to platform or agent

        workflow.push({platform:'unknown', intent: intent})

        /////////////////////////////////////////////////////////////////////////////////////

        // count is equal to the number of interactions with agents
        // which is dynamic since an agent may engage another to complete a
        // dialogue

        var count = 0;
          whilst(
            function() { return count < workflow.length; },

            function(callback) {

              // pull the agent object from the workflow queue
              let config = workflow[count]
              let apiType = workflow[count].platform;
              count++;

              console.log(r('TOP OF THE FUNCTION'));
              console.log({array: workflow});
              console.log({UpdatedCount: count});
              console.log({workflowLength: workflow.length});

              switch (apiType) {

                case "unknown":

                      console.log(g('ENTERED UNKNOWN'));

                      let params = {};
                      params.priority = 'new';
                      params.response = {};
                      params.response.intent = intent;

                    setWorkflow(params)
                      .then(function(response){
                        console.log(g('INITIALIZATION ACTIONS'));
                        workflow.push(response)
                        callback(null, 'unknown')
                      })

                    break;
                case "watson":

                  console.log(g('Watson Responds ' + config.name));
                  console.log(g('Refactor to iterate over text array + load output dialogue just subset'));
                  getWatson(req.bag.state, config)
                    .then(function(response){

                      let sourceObject = {
                        platform: 'watson'
                      }
                      let inputObject = Object.assign(sourceObject, response.watsonResponse)
                      req.bag.state.output_dialogue_objects.push(inputObject)  // capture response object in state

                      // future fix -- need to iterate over text array -- concatenate responses - send single string?

                      req.bag.state.response = response.watsonResponse.output.text[0];   // REFACTOR Need to iterate over output array

                      // inspect Watson Response
                      // if bot referral then grab bot config from config array

                      extractAgents(req.bag.state)
                        .then(function(response){
                          // retrieve agent configuration based on intent, agent name and platform
                          // needs to be updated to handle no agent being returned and for configuring workflow
                          // extractAgents needs to be fixed to laod and return an array of objects
                          console.log(g("Found Agent Referral"))
                          console.log(JSON.stringify(response))

                          let params = {};
                          params.priority = '1';
                          params.response = response;

                        setWorkflow(params)
                          .then(function(response){
                            console.log(g('WATSON WORKFLOW ACTIONS'));
                            workflow.push(response)
                            callback(null, 'watson')
                          })
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
                    console.log(g('Open Responds ' + config.name));

                    let api_key = config.username + ":" + config.password;
                    // openwhisk configurators
                    var options = { api: config.url,
                                    api_key: api_key };

                    var ow = openwhisk(options);

                    ow.actions.invoke({actionName: config.name, blocking: true, params: {}})
                      .then(function(result){

                        req.bag.state.response = result.response.result.payload

                        // inspect Open Response - note the result needs to be returned as payload
                        // if bot referral then grab bot config from config array

                        extractAgents(req.bag.state)
                          .then(function(response){

                            // no triggers found
                            if (response == null) {
                              console.log(r("ACTION ROUTE SENSES NO MORE TRIGGERS"))
                              return callback(null, 'open')
                            }
                            // retrieve agent configuration based on intent, agent name and platform
                            // extractAgents needs to be fixed to load and return an array of objects
                              console.log(g("AGENT TRIGGER FOUND - CONFIG WORKFLOW"))

                              let params = {};
                              params.priority = '1';
                              params.response = response;

                              setWorkflow(params)
                                .then(function(response){
                                  console.log(g('OPEN WORKFLOW ARRAY LOADED'));
                                  workflow.push(response)
                                  callback(null, 'open')
                                })
                              })
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
