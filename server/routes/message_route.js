'use strict';
//////////////////////////////////////////////////////////////////////////
////////////////////Initial Main Message Route  /////////////////////////
////////////////////////////////////////////////////////////////////////
import Promise                    from 'bluebird';
import dbText                     from '../api/dbText';
import bodyParser                 from 'body-parser';
import { g, b, gr, r, y }         from '../color/chalk';

const putDBText = Promise.promisify(dbText.put.bind(dbText));


////////////////////////////////////////////////////////////
//////////////////Message APIs ////////////////////////////
//////////////////////////////////////////////////////////

module.exports = function(router) {

  router.use(bodyParser.json());

  //evaluate a new message
  router.post('/message', function(req, res, next) {

    // revist this
    let params = {};
    params.body = req.body;
    params.bag  = req.bag;

    // capturing the input dialogue and responses -- full  history of a thread

    let dialogueObject =                    { };
    dialogueObject.text_received =          req.body.Body;
    dialogueObject.text_received_from =     req.body.From;
    dialogueObject.text_received_to =       req.body.To;
    dialogueObject.text_original_intent =   "";
    dialogueObject.text_received_time =     req.bag.state.transact_at;
    dialogueObject.messages =               [];

    let inputObject = Object.assign({}, dialogueObject)
    req.bag.state.dialogue_thread.push(inputObject)

    ////////////////////////

    console.log(g('Message API Route'));

    putDBText(params)
        .then(function(result){
              next();
            });

      })
}
