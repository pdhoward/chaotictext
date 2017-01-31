'use strict';

import Promise               from 'bluebird';
import bodyParser            from 'body-parser'
import dbText                from '../api/dbText';
import agents                from '../api/agents';
import { g, b, gr, r, y }    from '../color/chalk';

const getAgents =       Promise.promisify(agents.get.bind(agents));
const updateDBText =    Promise.promisify(dbText.update.bind(dbText));

    ////////////////////////////////////////////////////////////
    //////    Set the State Object for this Session        ////
    //////////////////////////////////////////////////////////

module.exports = function(router) {
    router.use(bodyParser.json());
      //evaluate a new message
      router.post('/message', function(req, res, next) {

        console.log(g('State API Route'));

        let transact_at = Date.now();
        // define these variables and their purpose
        // note that state object is also updated by routes which analyze the text
        // this is for the Twilio UI -- see schemas message.js
        req.bag =                               {};

        // load config information -- used in action routes

        getAgents({})
          .then(function(response){
            req.bag.agents = [];
            req.bag.agents = response.slice()    // copies array of agent configuration objects
          })

        ////////////      

        req.bag.state =                         {};
        req.bag.state.to_client =               req.body.To;   // message to
        req.bag.state.from_client =             req.body.From; // message from

        req.bag.state.input_analysis =           [];           // capture results from text analysis
        req.bag.state.input_intent =             [];           // composite score analysis -- currently spoofed in classify

        req.bag.state.count =                   0;            // need to increment this on every turn -- will drive access to array of input objects

        req.bag.state.text =                    req.body.Body; // active text message being analyzed

        req.bag.state.workflow =                [];           // workflow related to current active text - reset on each turn
        req.bag.state.responses =               [];           // responses related to current active text - reset on each turn

        ///// set of platform objects with input
        req.bag.state.input_dialogue_objects =  [];           // array of objects collecting all messages from same user
        let sourceObject = {
          platform: 'twilio'
        }
        let inputObject = Object.assign(sourceObject, req.body)
        req.bag.state.input_dialogue_objects.push(inputObject)  // capture twilio input object in an array - current default - reset each turn

        ///// set of platform objects with responses
        req.bag.state.output_dialogue_objects = [];          // platform objects related to current active text - reset on each turn

        // dialogue thread is kept for entire conversation until change in topic ! or time expires
        // message input loaded in messages.js
        // message out is captured in actions.js

        req.bag.state.dialogue_thread =         [];           // reset when topic changes or conversation expires


        req.bag.state.transact_at =             transact_at;
        req.bag.state.version =                 "v0.3.0";

        next()

        })
      }
