
import bodyParser                 from 'body-parser'
import natural                    from 'natural';
import { g, b, gr, r, y }         from '../color/chalk';

////////////////////////////////////////////////////////////////////////////
/////// Tokenize and stem the text message - permit pattern matching //////
//////////////////////////////////////////////////////////////////////////


const tokenCheck = new natural.WordTokenizer();
// stub for testig

const input = {
  text: 'this is a test text for testing the nlp process'
}

const testText = {
  text: 'So this is another test text with an entirely new string'
}

module.exports = function(router) {

  router.use(bodyParser.json());

  //evaluate a new message
  router.post('/message', function(req, res, next) {

      // establish string for NLP pattern matching
        natural.PorterStemmer.attach();

     // tokenize the text

      const tokenIdea = input.text.tokenizeAndStem();
      const diff = natural.JaroWinklerDistance(input.text, testText.text)

      console.log(g('Message API Route'));
      console.log({tokenIdea: tokenIdea})
      console.log({diff: diff})

    })
  }
