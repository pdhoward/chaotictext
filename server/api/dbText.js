
'use strict';

//////////////////////////////////////////////////////////////////////////
///////////////////////////// Mongodb Functions /////////////////////////
////////////////////////////////////////////////////////////////////////
import textMessages     from '../db/schemas/Message';

const texts = new textMessages();

module.exports = {

  get: function(params, callback) {

   texts.find({}, function(err, response) {
      if (err) {
        if (err.error !== 'not_found') {
          return callback(err);
        } else {
          return callback(null);
        }};
        return callback(null, response);

    });
  },
/*
  put: function(params, callback) {
        botdb.findOneAndUpdate({userID: params.userID}, params, {new: true, upsert: true}, function(err, doc) {
          if (err) {
              return callback(err);
          }
          else {
              return callback(err, doc);
          }
        })
      },

  // fetch users ideas from db in the same geographic are as active user
  // note this search excludes the active user from the search results

  fetch: function(params, callback) {

      botdb.find({ $and: [ {'context.longitude': {$eq: params.context.longitude} },
                           {'context.latitude': {$eq: params.context.latitude} },
                           {'userID': {$ne: params.user} } ] },
              function(err, results) {

                return callback(err, results);
              });


    }
*/
};
