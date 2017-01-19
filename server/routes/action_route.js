'use strict';

import Promise               from 'bluebird';
import bodyParser            from 'body-parser'
import natural			         from 'natural';
import dbText                from '../api/dbText';
import watsonResponse        from '../db/schemas/WatsonResponse';
import configureAgents       from '../config/chaotic'
import { g, b, gr, r, y }    from '../color/chalk';
import watson                from 'watson-developer-cloud';

const updateDBText =    Promise.promisify(dbText.update.bind(dbText));
const workspace =       process.env.WORKSPACE_ID || 'workspace-id';

const conversation =    watson.conversation( {
  url: 'https://gateway.watsonplatform.net/conversation/api',
  username: process.env.CONVERSATION_USERNAME || '<username>',
  password: process.env.CONVERSATION_PASSWORD || '<password>',
  version_date: '2016-07-11',
  version: 'v1'
  } );

var chaotic = [];

const message = {
  workspace_id: workspace,
  input: {
    text: ''
  },
  context: {},
  alternate_intents: false,
  entities: [],
  intents: [],
  output: {}
}

const watsonUserID = {
  username: 'Watson',
  socketID: '/#testid'
}

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
        chaotic =             configureAgents.filter(function (obj){
          return obj.intent == intent;
        })

        // session status

        if (req.session.context) {
          message.context = req.session.context;
          req.session.count++;
        };

        console.log(g('TEST COMPLETED - Agent Contacted'));
        console.log({intent: intent});
        console.log({chaotic: JSON.stringify(chaotic)});

        let x = getRandomInt(1, 3);

        //prepare message to send to Watson
        message.input.text = req.body.Body

        if ( ! message.workspace_id || message.workspace_id === 'workspace-id' ) {
          console.log("workspace id error")
        };

        // Send the input to the Watson conversation service
        conversation.message( message, function(err, data) {
            if ( err )  return err;
        //prepare to save watson message to mongodb collection
            const newwatsonResponse = new watsonResponse(data);
            req.session.context = newwatsonResponse.context;
            console.log({watson: JSON.stringify(newwatsonResponse)})
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
