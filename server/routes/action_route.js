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


var chaotic = [];


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

        console.log(g('TEST COMPLETED - Agent Contacted'));
        console.log({intent: intent});
        console.log({chaotic: JSON.stringify(chaotic)});

        let x = getRandomInt(1, 3);

        getWatson(req.bag.state)
         .then(function(response){
           req.bag.state.watsonResponse = response.watsonResponse
           console.log("watson responds")
           console.log({watson: req.bag.state.watsonResponse})

           // load response array

           //   place holder for pulsing other bots etc

           let testarray = [{text: 'one entry'}]
           let n = 0;

           for (var i = 0; i < testarray.length; i++) {
             console.log(testarray[i]);
             if (n<5){
               n++
               testarray.push({text: 'this is object number ' + n})
             }
           }

           next()
        })



/*
        updateDBText({From: From, created_at: created_at},
                   {$set: {action: null}},
                   {new: true})
              .then(function(result){
                  // do something
            })
*/
        next();
    });

}
