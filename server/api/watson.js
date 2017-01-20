'use strict';
require( 'dotenv' ).config( {silent: true} );
//////////////////////////////////////////////////////////
////////  Conversational UI for Watson           ////////
/////////////////////////////////////////////////////////
import watson                      from 'watson-developer-cloud';
import watsonResponse              from '../db/schemas/WatsonResponse';

const workspace =       process.env.WORKSPACE_ID || 'workspace-id';

const conversation =    watson.conversation( {
  url: 'https://gateway.watsonplatform.net/conversation/api',
  username: process.env.CONVERSATION_USERNAME || '<username>',
  password: process.env.CONVERSATION_PASSWORD || '<password>',
  version_date: '2016-07-11',
  version: 'v1'
  } );

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

module.exports = {
  get: function(obj, cb) {

    //prepare message to send to Watson
    message.input.text = obj.body;
    message.context = obj.watsonResponse.context;

    // watson interaction
    conversation.message( message, function(err, data) {
        if ( err ){
          console.log({err: err})
          return cb(err);
        }
        const newwatsonResponse = new watsonResponse(data);
        obj.watsonResponse = newwatsonResponse;
        return cb(err, obj)
     })
    }
  }
