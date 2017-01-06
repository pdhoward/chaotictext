
'use strict';

//////////////////////////////////////////////////////////////////////////
///////////////////////////// Mongodb Functions /////////////////////////
////////////////////////////////////////////////////////////////////////
import textMessages     from '../db/schemas/Message';


module.exports = {

  get: function({}, cb) {

   textMessages.find({}, function(err, response) {
      if (err) {
        if (err.error !== 'not_found') {
          return cb(err);
        } else {
          return cb(null);
        }};
      return cb(err, response);
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
