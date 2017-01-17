'use strict';
import bodyParser                 from 'body-parser'
import natural                    from 'natural';
//import intents                    from '../db/initialize/getintents';
import { g, b, gr, r, y }         from '../color/chalk';

////////////////////////////////////////////////////////////
////////        NLP Message Analysis          /////////////
///////     Natural Language Classifier      //////////////
//////    Attempt to Classify by Topic       /////////////
//////////////////////////////////////////////////////////

const classifier = new natural.BayesClassifier();

natural.BayesClassifier.load('classifier.json', null, function(err, classifier) {
    console.log('Classification data retrieved');
  
});

module.exports = function(router) {

  router.use(bodyParser.json());

  //evaluate a new message
  router.post('/message', function(req, res, next) {

     let textMessage = req.body.Body;
     // classify the text

      const classifyMessage = classifier.classify(textMessage)
      const classifyMatches = classifier.getClassifications(textMessage)

      console.log(g('Message Classify Route'));
      console.log({topic: classifyMessage})
      console.log({matches: JSON.stringify(classifyMatches)})

      next()

    })
  }
