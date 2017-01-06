
import badwords              from 'badwords/array';
import bodyParser            from 'body-parser'
import natural			         from 'natural';
import { g, b, gr, r, y }    from '../color/chalk';

// stub
const input = {
  text: 'message stub in word api'
  }

const tokenCheck = new natural.WordTokenizer();
const returnText = {};
const tokenText = tokenCheck.tokenize(input.text);
const tokenCnt = tokenText.length;
var   chkDigit = -1;   // false word not found
var   returnMessage = "Sorry. This text violates acceptable use policy "
var   tokenWord = '';

    ////////////////////////////////////////////////////////////
    //////////////////Word Check API///////////////////////////
    //////////////////////////////////////////////////////////

module.exports = function(router) {
    router.use(bodyParser.json());
      //evaluate a new message
      router.post('/message', function(req, res, next) {

        console.log(g('Message API Route'));

        for (var nn = 0; nn < tokenCnt; nn++) {
          tokenWord = tokenText[nn];
          chkDigit = badwords.indexOf(tokenWord);
          if (chkDigit > -1) {
            returnMessage = input.text
            return callback(null, returnMessage);
      }
    }
  })
}
