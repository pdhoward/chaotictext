'use strict';
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


////////////////////////////////////////////////////////////
//////////////// RESPONSE EVENTS //////////////////////////
//////////////////////////////////////////////////////////

module.exports = function(router) {

  router.use(bodyParser.json());

  router.post('/message', function(req, res, next) {
    var io = req.app.get('socketio');

    console.log(g('Response API Route'));

    // Work to do on twilio text responses

    client.messages.create({
        to: "+19145005391",
        from: "+19148195104",
        body: req.bag.state.response,
        mediaUrl: "http://static.eharmony.com/files/us/images/landing/czech-republic-prague.jpg"
      }, function(err, message) {
        console.log(message.sid);
      });

    res.setHeader('Content-Type', 'text/xml')
    res.status(200).send({ text: "chaoticbots rule" });
    io.emit('incoming data');

   next();

 })
}
