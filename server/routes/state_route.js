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
        // this is for the Twilio UI
        req.bag =                               {};
        req.bag.state =                         {};
        req.bag.state.count =                   0;
        req.bag.state.body =                    req.body
        req.bag.state.text =                    req.body.Body // rename for clarity on var
        req.bag.state.transact_at =             transact_at;
        req.bag.state.watsonResponse =          {};  // see action/watson
        req.bag.state.watsonResponse.context =  {};  // see action/watson

        // session status
        if (req.bag.state.watsonResponse.context) {
          req.bag.state.count++;
        };

        getAgents({})
          .then(function(configureAgents){
            // retrieve intent and agent configuration for the client
            req.bag.state.configureAgents = [];
            req.bag.state.configureAgents = configureAgents.slice()
            next()

          })
        })
      }
