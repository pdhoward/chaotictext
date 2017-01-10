'use strict';
import badwords              from 'badwords/array';
import bodyParser            from 'body-parser'
import natural			         from 'natural';
import ChatMessage           from '../db/schemas/Message';
import moment                from 'moment';
import uuid                  from 'node-uuid';
import { g, b, gr, r, y }    from '../color/chalk';

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
        console.log({tokens: tokenText})

        for (var i = 0; i < tokenCnt; i++) {
          tokenWord = tokenText[i];
          chkDigit = badwords.indexOf(tokenWord);
          if (chkDigit > -1) {
            wordArray.push(tokenWord);
          }
        }

      let wordsDisallowed = {};
      let created_at =      req.bag.transact_at;
      let From =            req.body.From;
      wordsDisallowed = Array.from(wordArray);

      ChatMessage.findOneAndUpdate({From: From, created_at: created_at},
                                   {$set: {wordsDisallowed: wordsDisallowed}},
                                   {new: true}, function (err, data) {
        if (err) {
          console.log(r("Error Saving Words Disallowed to Message"))
          return res.status(500).json({msg: 'internal server error'});
        }
        next()
      })

  })
}
