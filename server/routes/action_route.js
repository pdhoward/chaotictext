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
        console.log({chaoticagent: JSON.stringify(workFlowObject)});

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

                      // future fix -- need to iterate over output array
                      req.bag.state.response = response.watsonResponse.output.text[0];   // all CUI responses stored here. Need to
                      console.log(g('watson responds'));
                      console.log({watson: JSON.stringify(req.bag.state.watsonResponse)})

                      // inspect watsonResponse
                      // if bot referral then grab bot config from config array
                      // workFlowObject = Object.assign({}, chaotic[0].agent[x])
                      // workflow.push(workFlowObject);

                      extractAgents(req.bag.state)
                        .then(function(response){

                          // temp
                          console.log(g("Made it through Extract Agent"))
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
