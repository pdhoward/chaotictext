'use strict';

var mongoose = require('mongoose');

var classificationSchema = mongoose.Schema({
  classifier: {
    classFeatures: Object,
    classTotals: Object,
    totalExamples: Number,
    smoothing: Number
  },
  docs: Array,
  features: Object,
  stemmer: Object,
  lastAdded: 12,
  events: Object
});

module.exports = mongoose.model('Classification', classificationSchema);
