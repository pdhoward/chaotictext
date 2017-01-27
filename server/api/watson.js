'use strict';
require( 'dotenv' ).config( {silent: true} );
//////////////////////////////////////////////////////////
////////  Conversational UI for Watson           ////////
/////////////////////////////////////////////////////////
import watson                      from 'watson-developer-cloud';
import watsonResponse              from '../db/schemas/WatsonResponse';


module.exports = {
  get: function(obj, config, cb) {    

    // configure watson conversation for the agent that has been called
    let watsonconfig = {};
    watsonconfig.url =          config.url;
    watsonconfig.username =     config.username;
    watsonconfig.password =     config.password;
    watsonconfig.version_date = config.version_date;
    watsonconfig.version =      config.version;
    let conversation =          watson.conversation( watsonconfig );

    // Retrieve the context of a conversation with watson, if any
    // If a context exists from a prior interaction, it is persisted via sessions
    // This is found by searching for the last entry = watson on the dialogue array

    let dialogue = JSON.parse(JSON.stringify(obj.output_dialogue_objects))

    let indx = dialogue.map(x => x.platform).lastIndexOf('watson');
    let context = {}
    if (indx = -1){
       console.log("WATSON API - NO CONTEXT FOUND")}
     else {
      console.log("WATSON API - CONTEXT FOUND BUT NOT USED")
      console.log(dialogue[indx])
     }

    // config the message object to pass to watson, which includes the context
    let message = {}
    message.input = {}
    message.workspace_id =      config.workspace;
    message.context =           context;          // may need an object assign
    message.input.text =        obj.text;
    message.alternate_intents = false;

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
