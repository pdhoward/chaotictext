'use strict';

///////////////////////////////////////////////////////////////////////
////////     intialize object array from test or db     //////////////
//////////////////////////////////////////////////////////////////////

// Intent is the schema
import Intent                      from '../schemas/Intent';
import mongoose                    from 'mongoose';
import uuid                        from 'node-uuid';
import configureIntents            from './intent';
import { g, b, gr, r, y }          from '../../color/chalk';

module.exports.intents = [];

module.exports.getIntents = function () {
      Intent.find({}).exec(function (err, data){
        if (data.length === 0){
        module.exports.intents = configureIntents;
        console.log(g('Intents initialized from test file db/initialize/intent '))
        return
      }
      else {
        module.exports.intents = data;
        console.log(g('Intents initialized from db '))
        return
      }
  })
}
