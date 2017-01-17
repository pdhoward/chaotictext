///////////////////////////////////////////////////////////////////////
////////     test data for intents and scripts           //////////////
//////////////////////////////////////////////////////////////////////

var uuid = require('node-uuid');

// list of channels with conversation scripts enabled

const configureClassifications = [
  {text: 'help me ship this product',
   class: 'ship'},
  {text: 'need to ship product',
   class: 'ship'},
  {text: 'i have product to ship',
   class: 'ship'},
  {text: 'need to ship something',
   class: 'ship'},
  {text: 'transport to qqqq',
   class: 'ship'},
  {text: 'need to ship',
   class: 'ship'},
  {text: 'purchase this product',
   class: 'buy'},
  {text: 'buy product',
   class: 'buy'},
  {text: 'order a product',
   class: 'buy'},
  {text: 'i want to purchase something',
   class: 'buy'},
  {text: 'acquire product',
   class: 'buy'},
  {text: 'buy from your catalogue',
   class: 'buy'},

]

module.exports = configureClassifications;
