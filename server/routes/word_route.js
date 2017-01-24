'use strict';

import Promise               from 'bluebird';
import dbText                from '../api/dbText';
import badwords              from 'badwords/array';
import bodyParser            from 'body-parser'
import natural			         from 'natural';
import { g, b, gr, r, y }    from '../color/chalk';

const updateDBText = Promise.promisify(dbText.update.bind(dbText));

    ////////////////////////////////////////////////////////////
    //////////////////Word Check API///////////////////////////
    //////////////////////////////////////////////////////////

module.exports = function(router) {
    router.use(bodyParser.json());
      //evaluate a new message
      router.post('/message', function(req, res, next) {

        const tokenCheck = new natural.WordTokenizer();
        const tokenText = tokenCheck.tokenize(req.body.Body);
        const tokenCnt = tokenText.length;
        let   chkDigit = -1;   // false word not found
        let   tokenWord = '';
        let   wordArray = [];

        console.log(g('Word API Route'));

        for (var i = 0; i < tokenCnt; i++) {
          tokenWord = tokenText[i];
          chkDigit = badwords.indexOf(tokenWord);
          if (chkDigit > -1) {
            wordArray.push(tokenWord);
          }
        }

      let wordsDisallowed = {};
      let created_at =      req.bag.state.transact_at;
      let From =            req.bag.state.body.From;
      wordsDisallowed =     Array.from(wordArray);

      updateDBText({From: From, created_at: created_at},
                   {$set: {wordsDisallowed: wordsDisallowed}},
                   {new: true})
      .then(function(result){
        next();
    });
  })
}
