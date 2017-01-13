'use strict';
import bodyParser                 from 'body-parser'
import natural                    from 'natural';
import intents                    from '../db/initialize/getintents';
import { g, b, gr, r, y }         from '../color/chalk';

////////////////////////////////////////////////////////////
////////        NLP Message Analysis          /////////////
/////// Tokenize and stem the text message - //////////////
//////    Attempt to Match on patterns       /////////////
//////////////////////////////////////////////////////////

const tokenCheck = new natural.WordTokenizer();
// stub for testig

const test = {
  text: 'test - ship my product now!'
}

module.exports = function(router) {

  router.use(bodyParser.json());

  //evaluate a new message
  router.post('/message', function(req, res, next) {

      // bind natural module and function
      natural.PorterStemmer.attach();
      let textMessage = req.body.Body;
     // tokenize the text

      const tokenMessage = textMessage.tokenizeAndStem();
      const diff = natural.JaroWinklerDistance(textMessage, test.text)

      console.log(g('Message Pattern Route'));
      console.log({message: textMessage})
      console.log({token: tokenMessage})
      console.log(g('Pattern Matches'));
      
      intents.array.forEach(script => {
        const diff = natural.JaroWinklerDistance(textMessage, script.script);
        if (diff > .7) {
          console.log({intent: script.intent})
          console.log({match: script.script})
          console.log({diff: diff})
        }

      })

      next()

    })
  }
