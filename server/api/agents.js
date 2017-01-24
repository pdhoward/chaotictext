'use strict';
require( 'dotenv' ).config( {silent: true} );
//////////////////////////////////////////////////////////
////////  Retrieve and configure Agents for Client////////
/////////////////////////////////////////////////////////
import configureAgents       from '../config/chaotic'

// called by routes/action_route
// to be refactored to retrive the agent config object from mongodb based
// on client is

module.exports = {
  get: function(obj, cb) {
      return cb(null, configureAgents)
    }
  }
