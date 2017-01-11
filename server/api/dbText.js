
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

  put: function(params, cb) {

    let text = new textMessages(params.body);
    text.created_at = params.bag.transact_at;

    text.save(function (err, response){
      if (err) {
          console.log(r("Error When Saving Text Message"))
          return cb(err);
        }
      return cb(err, response);
    })

  },

  update: function(params1, params2, params3, cb) {

    textMessages.findOneAndUpdate(params1, params2, params3, function (err, response) {
      if (err) {
        console.log(r("Error When Updating the Message Text"))
        return cb(err);
      }
      return cb(err, response);
    })
  }

  // fetch users ideas from db in the same geographic are as active user
  // note this search excludes the active user from the search results
/*
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
