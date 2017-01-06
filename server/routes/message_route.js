
//////////////////////////////////////////////////////////////////////////
////////////////////Primary Main Message Route  /////////////////////////
////////////////////////////////////////////////////////////////////////

import ChatMessage                from '../db/schemas/Message';
import bodyParser                 from 'body-parser';
import moment                     from 'moment';
import uuid                       from 'node-uuid';
import vcapServices               from 'vcap_services';
import { g, b, gr, r, y }         from '../color/chalk';

require( 'dotenv' ).config( {silent: true} );

const accountSID =      process.env.TWILIO_SID;
const accountToken =    process.env.TWILIO_TOKEN;
const workspace =       process.env.WORKSPACE_ID || 'workspace-id';

const client = require('twilio')(accountSID, accountToken);

// watson conversation parameters
const watson =             require( 'watson-developer-cloud' );

const conversation = watson.conversation( {
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

const buildMessageToSend = {
  id: '',
  channelID: '',
  text: '',
  user: '',
  time: Number

}

const watsonUserID = {
  username: 'Watson',
  socketID: '/#testid'
}

var buildID = '';

////////////////////////////////////////////////////////////
//////////////////Message APIs ////////////////////////////
//////////////////////////////////////////////////////////

module.exports = function(router) {

  router.use(bodyParser.json());

  //evaluate a new message
  router.post('/message', function(req, res, next) {

    var io = req.app.get('socketio');

    let textMessage = new ChatMessage(req.body);    

   // If session context exists, need to use it for next iteration
   // It means we've already launched a discussion
    if (req.session.context) {
      message.context = req.session.context;
      req.session.count++;
    };

    console.log(g('Message API Route'));
    console.log({body: textMessage})

    textMessage.save(function (err, data){
      if (err) {
        console.log(r("Error Saving Text Message to Mongodb"))
        return res.status(500).json({msg: 'internal server error'});
      }
    })

    client.messages.create({
        to: "+19145005391",
        from: "+19148195104",
        body: "Hello Lee Anne - Will you join me here my love for dinner, dancing and a show?",
        mediaUrl: "http://static.eharmony.com/files/us/images/landing/czech-republic-prague.jpg",
//        mediaUrl: "https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg",
      }, function(err, message) {
        console.log(message.sid);
      });

    console.log({client: client})

    res.setHeader('Content-Type', 'text/xml')
    res.status(200).send({ text: "chaoticbots rule" });


   return;
 })
}
