
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
    params.language = 'english';
    alchemyLanguage.relations(params, function(err, response) {

      if (err) {
        callback(err);
      }
      else {
        console.log((JSON,stringify))
      }
    })
  },


};
