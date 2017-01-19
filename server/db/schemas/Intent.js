'use strict';

var mongoose = require('mongoose');

var intentSchema = mongoose.Schema({
  intent: { type: String },
  id: String,
  script: String,  
});

module.exports = mongoose.model('Intent', intentSchema);
