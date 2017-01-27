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


          // session status -- needs to be updated to pulse the req.bag.ouput_dialogue_objects - pass back context if it exists
  //        if (req.bag.state.watsonResponse.context) {
  //          req.bag.state.count++;
  //      };

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

    // pull the last entry in the state's dialogue objects that matches watson, if any

    let indx = obj.map(x => x.platform).lastIndexOf('watson');

    if (indx = -1){
      message.context = {}
    } else {
    console.log("DEBUG")
    console.log(obj[indx])
    }

    //prepare message to send to Watson
    message.input.text = obj.text;
    message.context = {};

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
