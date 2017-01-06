'use strict';

var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
  ToCountry: String,
  ToState: String,
  SmsMessageSid: String,
  NumMedia: String,
  ToCity: String,
  FromZip: String,
  SmsSid: String,
  FromState: String,
  SmsStatus: String,
  FromCity: String,
  Body: String,
  FromCountry: String,
  To: String,
  MessagingServiceSid: String,
  ToZip: String,
  AddOns: Object,
  NumSegments: String,
  MessageSid: String,
  AccountSid: String,
  From: String,
  ApiVersion: String


});

module.exports = mongoose.model('Message', messageSchema);
