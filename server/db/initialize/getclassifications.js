'use strict';

///////////////////////////////////////////////////////////////////////
////////     intialize object array from test or db     //////////////
//////////////////////////////////////////////////////////////////////

// Intent is the schema
import Classifications             from '../schemas/Classification';
import mongoose                    from 'mongoose';
import uuid                        from 'node-uuid';
import configureClassifications    from './classifications';
import natural                     from 'natural';
import { g, b, gr, r, y }          from '../../color/chalk';

var classArray = [];
const classifier = new natural.BayesClassifier();

module.exports.getClassifications = function () {
      Classifications.find({}).exec(function (err, data){
        if (data.length === 0){
          classArray = configureClassifications;
          classArray.map(function(document){
            classifier.addDocument(document.text, document.class);
          })
          classifier.train();

          classifier.save('classifier.json', function(err, classifier) {
              console.log("TEST CLASSIFIER SAVED")
          });
        console.log(g('Classifier initialized from test file db/initialize/classifications '))
        return
      }
      else {
        data.map(function(document){
          classifier.addDocument(document.text, document.class);
        })
        classifier.train();
        classifier.save('classifier.json', function(err, classifier) {
            console.log("DB CLASSIFIER SAVED")
        });
        console.log(g('Classifier initialized from db '))
        return
      }
  })
}
