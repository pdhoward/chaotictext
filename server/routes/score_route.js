'use strict';

import Promise               from 'bluebird';
import dbText                from '../api/dbText';
import bodyParser            from 'body-parser'
import natural			         from 'natural';
import { g, b, gr, r, y }    from '../color/chalk';

const updateDBText = Promise.promisify(dbText.update.bind(dbText));

    ////////////////////////////////////////////////////////////
    ////// Score a Message based on Collective AI Scores   ////
    //////////////////////////////////////////////////////////

module.exports = function(router) {
    router.use(bodyParser.json());
      //evaluate a new message
      router.post('/message', function(req, res, next) {

        console.log(g('Score API Route'));

        let created_at =      req.bag.state.transact_at;
        let From =            req.bag.state.body.From;
        console.log(g('TEST COMPLETED - Message Scored'));
        console.log("STILL NEEDS REFACTORING - SET INTENT - currently spoofed in classify");
/*
        updateDBText({From: From, created_at: created_at},
                   {$set: {score: null}},
                   {new: true})
              .then(function(result){
              // do something
            })
*/
        next();
    });
}
