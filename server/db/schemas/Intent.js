'use strict';

var mongoose = require('mongoose');

var intentSchema = mongoose.Schema({
  intent: { type: String },
  id: String,
  script: String,
  tokens: Array,
  entities: Array,
  keywords: Array,
  actions: Array,
  confidence: Number,
  botGreeting: String,
  botConfig: Object
});

module.exports = mongoose.model('Intent', intentSchema);
