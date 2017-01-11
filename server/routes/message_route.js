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
    let params = {};
    params.body = req.body;
    params.bag  = req.bag;

    console.log(g('Message API Route'));

    putDBText(params)
        .then(function(result){
              next();
            });

      })
}
