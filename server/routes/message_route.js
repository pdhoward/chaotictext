'use strict';
//////////////////////////////////////////////////////////////////////////
////////////////////Initial Main Message Route  /////////////////////////
////////////////////////////////////////////////////////////////////////

import ChatMessage                from '../db/schemas/Message';
import bodyParser                 from 'body-parser';
import moment                     from 'moment';
import uuid                       from 'node-uuid';
import vcapServices               from 'vcap_services';
import { g, b, gr, r, y }         from '../color/chalk';


////////////////////////////////////////////////////////////
//////////////////Message APIs ////////////////////////////
//////////////////////////////////////////////////////////

module.exports = function(router) {

  router.use(bodyParser.json());

  //evaluate a new message
  router.post('/message', function(req, res, next) {

    var io = req.app.get('socketio');
    let textMessage = new ChatMessage(req.body);
    textMessage.created_at = req.bag.transact_at;

    console.log(g('Message API Route'));
  
    textMessage.save(function (err, data){
      if (err) {
        console.log(r("Error Saving Text Message to Mongodb"))
        return res.status(500).json({msg: 'internal server error'});
      }

      next()
    })

 })
}
