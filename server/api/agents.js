'use strict';
require( 'dotenv' ).config( {silent: true} );
//////////////////////////////////////////////////////////
////////  Retrieve and configure Agents for Client////////
/////////////////////////////////////////////////////////
import configureAgents       from '../config/chaotic'
import { g, b, gr, r, y }    from '../color/chalk';

// called by routes/action_route
// to be refactored to retrieve the agent config object from mongodb based
// on client ID
// also used to extract handoffs to other agents and validate against directory

// take the string from the conversational ui and extract all triggers and return an array
function extractTriggers (uiString, cb) {
    var re = /\{(.*?)\}/g;
    var found = uiString.match(re);
    cb(found)
}

// function to parse a string and insert quotes for keys and values, complying with json syntax
function convertJSON (textString, cb){
        var jsonString = textString.replace(/([\$\w]+)\s*:/g, function(_, $1){return '"'+$1+'":'})
                              .replace(/([\$\w]+)\s*,/g, function(_, $1){return '"'+$1+'",'})
                              .replace(/([\$\w]+)\s*}/g, function(_, $1){return '"'+$1+'"}'})
        console.log(g("JSON CONVERTED"))
        console.log(jsonString)
        cb(jsonString)
    };

// function to convert string to json object and test compliance
function testJSON (jsonString, cb){
    try {
        var o = JSON.parse(jsonString);
        if (o && typeof o === "object") {
            cb(null, o) }
      }
      catch (e) { console.log("json test failed in action_route ... need err arch")}
    };
// function to test the object from a conversational ui to ensure it complies with requitements
function validateSchema (jsonObject) {

      return true
}


module.exports = {
  get: function(obj, cb) {
      return cb(null, configureAgents)
    },

  extract: function(obj, cb) {

    // future fix - need to be able to iterate over an array of responses
    var str = obj.response;

    extractTriggers(str, function(found){
      // any triggers found?
      if (found== null) {
        console.log(r("TRIGGERS NOT FOUND"))
        return cb(null, null)
      }

      console.log(g("TRIGGERS FOUND"))
      console.log(found)

      found.forEach(function(element) {
        convertJSON(element, function(strJson) {
          testJSON(strJson, function(err, o){
              if (err) {
                console.log(g("JSON TEST FAILED"))
                console.log(err)
                return cb(err)}
              else {
                console.log(g("JSON TEST SUCCESS  - REFACTOR FOR SCHEMA VALIDATION"))
                console.log(JSON.stringify(o))
                return cb(null, o)}
            })
         })
       })
     })
  }
}
