
'use strict';
require( 'dotenv' ).config( {silent: true} );

//////////////////////////////////////////////////////////////////////////
////////////  Alchemy used for text message analysis    /////////////////
////////////////////////////////////////////////////////////////////////

import watson      from 'watson-developer-cloud';

var alchemyLanguage = watson.alchemy_language({
  api_key: process.env.ALCHEMY_API_KEY
});

////////////////////////////////
///    location analysis //////
///////////////////////////////

function isCity(entity) {
   return entity.type === 'City';
}

function onlyName(entity) {
  return { name: entity.text };
}

module.exports = {
  //  extract the name of the city mentioned in the text
  extractCity: function(params, callback) {

    params.language = 'english';

    alchemyLanguage.entities(params, function(err, response) {

      if (err) {
        callback(err);
      }
      else {
        var cities = response.entities.filter(isCity).map(onlyName);
        callback(null, cities.length > 0 ? cities[0] : null);
      }
    })
  },

  //////////////////////FINISH THIS//////////////////////////

  extractRelations: function(params, callback) {

    let arg = {};
    arg.text = params;

    alchemyLanguage.relations(arg, function(err, response) {
      if (err) {
        callback(err);
      }
      else {
        callback(null, response);
      }
    })
  },

  extractEntities: function(params, callback) {

    let arg = {};
    arg.text = params;

    alchemyLanguage.entities(arg, function(err, response) {
      if (err) {
        callback(err);
      }
      else {
        callback(null, response);
      }
    })
  },
  extractKeyWords: function(params, callback) {

    let arg = {};
    arg.text = params;

    alchemyLanguage.keywords(arg, function(err, response) {

      if (err) {
        callback(err);
      }
      else {
        callback(null, response);
      }
    })
  },
  extractConcepts: function(params, callback) {

    let arg = {};
    arg.text = params;

    alchemyLanguage.concepts(arg, function(err, response) {
      if (err) {
        callback(err);
      }
      else {
        callback(null, response);
      }
    })
  },


};
