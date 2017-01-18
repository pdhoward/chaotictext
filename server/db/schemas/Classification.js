'use strict';

var mongoose = require('mongoose');

var classificationSchema = mongoose.Schema({
  classifier: Object,
  docs: Array,
  features: Object,
  stemmer: Object,
  lastAdded: Number,
  events: Object
});

module.exports = mongoose.model('Classification', classificationSchema);
