'use strict';

var mongoose = require('mongoose');

var classificationSchema = mongoose.Schema({
  text: { type: String },
  class: String
});

module.exports = mongoose.model('Classification', classificationSchema);
