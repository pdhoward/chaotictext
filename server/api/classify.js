'use strict';
require( 'dotenv' ).config( {silent: true} );
//////////////////////////////////////////////////////////////////////////
////////  Function to load Natural Classifier with Training Data ////////
////////  Note that training data only loaded in first call      ////////
////////  Otherwise classifier is returned directly              ////////
////////////////////////////////////////////////////////////////////////

import natural                     from 'natural';

var fileId =          process.env.CHAOTIC_CLIENT_ID + '.json';
var keepClassifier =  null;

module.exports = {
  get: function({}, cb) {

    if (keepClassifier) {
      console.log("Returning Classifier")
      return cb(null, keepClassifier)
    } else {

    natural.BayesClassifier.load(fileId, null, function(err, classifier) {
        if (err) {
          console.log({err: err})
          return cb(err);
        }
        console.log("Retrieve Training Data & Returning Classifier")
        keepClassifier = classifier;
        return cb(err, classifier)
      });
    }
  }
};
