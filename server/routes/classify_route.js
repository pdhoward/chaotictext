'use strict';
require( 'dotenv' ).config( {silent: true} );

import Promise                    from 'bluebird';
import natural                    from 'natural';
import bodyParser                 from 'body-parser';
import classify                   from '../api/classify';
import { g, b, gr, r, y }         from '../color/chalk';

////////////////////////////////////////////////////////////
////////        NLP Message Analysis          /////////////
///////     Natural Language Classifier      //////////////
//////    Attempt to Classify by Topic       /////////////
//////////////////////////////////////////////////////////
var fileId = process.env.CHAOTIC_CLIENT_ID + '.json';

const getClassifier = Promise.promisify(classify.get.bind(classify));

module.exports = function(router) {

  router.use(bodyParser.json());

  //evaluate a new message
  router.post('/message', function(req, res, next) {

    console.log(g('Message Classify Route'));
     let textMessage = req.body.Body;

     getClassifier({})
      .then(function(classifier){
        const classifyMessage = classifier.classify(textMessage)
        const classifyMatches = classifier.getClassifications(textMessage)
        console.log({topic: classifyMessage})
        console.log({matches: JSON.stringify(classifyMatches)})
        // SPOOF - update state
        req.bag.state.intent = classifyMatches[0].label;
        req.bag.state.score = classifyMatches[0].value

        next()
     })
    })
  }
