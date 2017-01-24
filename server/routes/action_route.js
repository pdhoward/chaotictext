'use strict';

import whilst                from 'async/whilst';
import Promise               from 'bluebird';
import bodyParser            from 'body-parser'
import natural			         from 'natural';
import openwhisk             from 'openwhisk';
import dbText                from '../api/dbText';
import classify              from '../api/classify';
import watson                from '../api/watson';
import agents                from '../api/agents';
import { g, b, gr, r, y }    from '../color/chalk';

const getAgents =       Promise.promisify(agents.get.bind(agents));
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
        let From =            req.bag.state.body.From;

        // note: this api will be refactored to retrieve intents and agents based on client id
        // client id would be passed as part of state object
        // clone array returned by git
        let configureAgents = [];
        configureAgents = req.bag.state.configureAgents.slice()

        let intent = req.bag.state.intent

        let workFlowObject = {};
        var chaotic = {};
        var workflow = [];
        var responses = [];

        // test data - grab a random bot from array of bots associated with intent
        // ultimately will be filtered based on priority code
        let x = getRandomInt(0, 2);


        // retrieve agent configuration based on intent
        chaotic =  configureAgents.filter(function (obj){
            return obj.intent == intent;
          })

        workFlowObject = Object.assign({}, chaotic[0].agent[x]);
        workflow.push(workFlowObject)


        console.log(g('Agent Identified and Configured based on Intent'));
        console.log({intent: intent});
        console.log({x: x});
        console.log({chaoticagent: JSON.stringify(workFlowObject)});
        console.log({platform: workFlowObject.platform})



        ////////////////////////////////////

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
                  getWatson(req.bag.state)
                    .then(function(response){
                      req.bag.state.watsonResponse = response.watsonResponse
                      console.log(g('watson responds'));
                      console.log({watson: req.bag.state.watsonResponse})

                      // spoof - load a referral agent
                      let n = getRandomInt(0, 4);   //grab random intent
                      let y = getRandomInt(0, 2);   //grab random agent

                      if (count < 5) {
                      workFlowObject = Object.assign({}, {
		                                                      name: 'COOL DEVELOPER',
		                                                      id: '${Date.now()}${uuid.v4()}',
		                                                      avatar: 'https://www.gravatar.com/avatar/',
		                                                      greeting: 'Hello. My Name is Dev? How are you?',
		                                                      priority: '1',
		                                                      platform: 'open',
		                                                      username: process.env.CONVERSATION_USERNAME || '<username>',
		                                                      password: process.env.CONVERSATION_PASSWORD || '<password>',
		                                                      url: 'https://gateway.watsonplatform.net/conversation/api',
		                                                      version_date: '2016-07-11',
		                                                      version: 'v1'});
                      workflow.push(workFlowObject);
                      }

                      // still need response array loaded
                      console.log(b('referral triggered'));
                      console.log({newagent: JSON.stringify(workFlowObject)})
                      console.log({count: count})
                      console.log({size: workflow.length})

                      callback(null, workFlowObject)
                    })

                  break;

                case "wit":
                    console.log(g('wit responds'));
                    callback(null, workFlowObject)
                    // load response array
                    break;

                case "api":
                    console.log(g('api responds'));
                    callback(null, workFlowObject)

                    break;

                case "google":
                    console.log(g('google responds'));

                    if (count < 5) {
                    workFlowObject = Object.assign({}, {
                                                        name: 'GREAT AGENT ',
                                                        id: '${Date.now()}${uuid.v4()}',
                                                        avatar: 'https://www.gravatar.com/avatar/',
                                                        greeting: 'Hello. My Name is GREAT? How are you?',
                                                        priority: '1',
                                                        platform: 'slack',
                                                        username: process.env.CONVERSATION_USERNAME || '<username>',
                                                        password: process.env.CONVERSATION_PASSWORD || '<password>',
                                                        url: 'https://gateway.watsonplatform.net/conversation/api',
                                                        version_date: '2016-07-11',
                                                        version: 'v1'});
                    workflow.push(workFlowObject);
                    }

                    // still need response array loaded
                    console.log(b('referral triggered'));
                    console.log({newagent: JSON.stringify(workFlowObject.name)})


                    callback(null, workFlowObject)

                    break;

                case "microsoft":
                    console.log(g('microsoft responds'));
                    callback(null, workFlowObject)

                    break;

                case "open":
                    ow.actions.invoke({actionName: 'shipaddress', blocking: true, params: {}})
                      .then(function(result){
                      console.log(g('open responds'));
                      console.log({result: JSON.stringify(result)})
                      // spoof
                      req.bag.state.response = result.response.result.payload


                      if (count < 5) {
                      workFlowObject = Object.assign({}, {
		                                                      name: 'WHO AM I',
		                                                      id: '${Date.now()}${uuid.v4()}',
		                                                      avatar: 'https://www.gravatar.com/avatar/',
		                                                      greeting: 'Hello. My Name is GREAT? How are you?',
		                                                      priority: '1',
		                                                      platform: 'google',
		                                                      username: process.env.CONVERSATION_USERNAME || '<username>',
		                                                      password: process.env.CONVERSATION_PASSWORD || '<password>',
		                                                      url: 'https://gateway.watsonplatform.net/conversation/api',
		                                                      version_date: '2016-07-11',
		                                                      version: 'v1'});
                      workflow.push(workFlowObject);
                      }

                      // still need response array loaded
                      console.log(b('referral triggered'));
                      console.log({newagent: JSON.stringify(workFlowObject.name)})

                      callback(null, result)
                    })

                    break;

                case "slack":
                    console.log(g('slack responds'));

                    if (count < 5) {
                    workFlowObject = Object.assign({}, {
                                                        name: 'NOW WHO AM I ',
                                                        id: '${Date.now()}${uuid.v4()}',
                                                        avatar: 'https://www.gravatar.com/avatar/',
                                                        greeting: 'Hello. My Name is GREAT? How are you?',
                                                        priority: '1',
                                                        platform: 'human',
                                                        username: process.env.CONVERSATION_USERNAME || '<username>',
                                                        password: process.env.CONVERSATION_PASSWORD || '<password>',
                                                        url: 'https://gateway.watsonplatform.net/conversation/api',
                                                        version_date: '2016-07-11',
                                                        version: 'v1'});
                    workflow.push(workFlowObject);
                    }

                    // still need response array loaded
                    console.log(b('referral triggered'));
                    console.log({newagent: JSON.stringify(workFlowObject.name)})

                    callback(null, workFlowObject)

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
