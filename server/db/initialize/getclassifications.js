'use strict';

///////////////////////////////////////////////////////////////////////
////////     intialize object array from test or db     //////////////
//////////////////////////////////////////////////////////////////////
require( 'dotenv' ).config( {silent: true} );

import Classifications             from '../schemas/Classification';
import mongoose                    from 'mongoose';
import uuid                        from 'node-uuid';
import configureClassifications    from './testdata/classifications';
import natural                     from 'natural';
import { g, b, gr, r, y }          from '../../color/chalk';

var fileId = process.env.CHAOTIC_CLIENT_ID + '.json';

var classArray = [];
const classifier = new natural.BayesClassifier();

function mapdata(cb){
  classArray = configureClassifications;
  classArray.map(function(document){
    classifier.addDocument(document.text, document.class);
      })
  console.log("Mapping Completed")
  cb()
}

function traindata(cb) {
  classifier.train();
  console.log("Training Completed")
  cb()
}

function savedata(parm, cb) {
  classifier.save(parm, function(err, classifier) {
      console.log("Saving Completed")
      console.log({classifier: JSON.stringify(classifier)})
      return cb()
  });

}

module.exports.getClassifications = function () {
      Classifications.find({}).exec(function (err, data){
        if (data.length === 0){

            mapdata(function(){
              traindata(function(){
                var parm = fileId;
                savedata(parm, function(){
                  console.log(g('Classifier initialized from test file db/initialize/classifications '))

                  natural.BayesClassifier.load(fileId, null, function(err, classifier) {
                      if (err) { console.log({err: err})}

                      console.log('Classification data retrieved');

                  });
                  return
                })
              })
            })

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
