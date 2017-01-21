'use strict';

import Promise               from 'bluebird';
import bodyParser            from 'body-parser'
import natural			         from 'natural';
import dbText                from '../api/dbText';
import classify              from '../api/classify';
import watson                from '../api/watson';
import configureAgents       from '../config/chaotic'
import { g, b, gr, r, y }    from '../color/chalk';


const getWatson =       Promise.promisify(watson.get.bind(watson));
const updateDBText =    Promise.promisify(dbText.update.bind(dbText));


var chaotic = {};
var workflow = [];
var responses = [];


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

        console.log(g('Agent API Route'));

        let created_at =      req.bag.transact_at;
        let From =            req.body.From;
        let intent =          req.bag.state.intent;
        req.bag.state.body =  req.body.Body

        // session status
        if (req.bag.state.watsonResponse.context) {
          req.bag.state.count++;
        };

        // retrieve agent configuration based on intent
        chaotic =  configureAgents.filter(function (obj){
          return obj.intent == intent;
        })

        // test data - grab a random bot from array of bots associated with intent
        let x = getRandomInt(0, 2);

        let workFlowObject = {};
        workFlowObject = Object.assign({}, chaotic[0].agent[x]);
        workflow.push(workFlowObject)

        console.log(g('TEST COMPLETED - Agent Contacted'));
        console.log({intent: intent});
        console.log({x: x});
        console.log({chaoticagent: JSON.stringify(workFlowObject)});
        console.log({platform: workFlowObject.platform})

        ////////////////////////////////////
        var k = 0;
        for (var i = 0; i < workflow.length; i++) {

          let apiType = workflow[i].platform;

          switch (apiType) {
            case "watson":

            getWatson(req.bag.state)
              .then(function(response){
               req.bag.state.watsonResponse = response.watsonResponse
               console.log(g('watson responds'));
               console.log({watson: req.bag.state.watsonResponse})


               // update workflow array if needed
               // load response array

               if (k<5) {
                 k++;
                 let n = getRandomInt(0, 4);   //grab random intent
                 let y = getRandomInt(0, 2);    // grab random agent
                 workFlowObject = Object.assign({}, configureAgents[n].agent[y]);
                 workflow.push(workFlowObject);

                 // need response array loaded
                 console.log(b('referral triggered'));
                 console.log({newagent: JSON.stringify(workFlowObject)})

               }

               return
              })
              break;

            case "wit":
                console.log(g('wit responds'));
                // load response array
                break;

            case "api":
                console.log(g('api responds'));

                break;

            case "google":
                console.log(g('google responds'));

                break;

            case "microsoft":
                console.log(g('microsoft responds'));

                break;

            case "slack":
                console.log(g('slack responds'));

                break;

        default:
            console.log(r('AGENT PLATFORM UNKNOWN'))
            break;
        }
        console.log("ITERATING ARRAY")
        console.log({i: i})
        console.log({length: workflow.length})
    };

    console.log("SEEM TO BE EXITING")

    next()
  })
}
