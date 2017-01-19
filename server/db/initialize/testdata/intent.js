///////////////////////////////////////////////////////////////////////
////////     test data for intents and scripts           //////////////
//////////////////////////////////////////////////////////////////////

var uuid = require('node-uuid');

// list of channels with conversation scripts enabled

const configureIntents = [
  {
    intent: "ship",
    id: '${Date.now()}${uuid.v4()}',
    script: 'i need to ship something'
  },
  {
    intent: "ship",
    id: '${Date.now()}${uuid.v4()}',
    script: 'i need to ship a product'
  },
  {
    intent: "ship",
    id: '${Date.now()}${uuid.v4()}',
    script: 'need to fedex'
  },
  {
    intent: "ship",
    id: '${Date.now()}${uuid.v4()}',
    script: 'help me ship'
  },
  {
    intent: "ship",
    id: '${Date.now()}${uuid.v4()}',
    script: 'ship this please'
  },
  {
    intent: "ship",
    id: '${Date.now()}${uuid.v4()}',
    script: 'ship now'
  },
  {
    intent: "ship",
    id: '${Date.now()}${uuid.v4()}',
    script: 'ship product'
  },
  {
    intent: "ship",
    id: '${Date.now()}${uuid.v4()}',
    script: 'ship'
  },
  {
    intent: "buy",
    id: '${Date.now()}${uuid.v4()}',
    script: 'buy a product'
  },
  {
    intent: "buy",
    id: '${Date.now()}${uuid.v4()}',
    script: 'want to purchase something'
  },
  {
    intent: "buy",
    id: '${Date.now()}${uuid.v4()}',
    script: 'trying to find a product'
  },
  {
    intent: "buy",
    id: '${Date.now()}${uuid.v4()}',
    script: 'buy product'
  },
  {
    intent: "buy",
    id: '${Date.now()}${uuid.v4()}',
    script: 'buy'
  },
  {
    intent: "buy",
    id: '${Date.now()}${uuid.v4()}',
    script: 'help me buy'
  },
  {
    intent: "pay",
    id: '${Date.now()}${uuid.v4()}',
    script: 'need to make a payment'
  },
  {
    intent: "pay",
    id: '${Date.now()}${uuid.v4()}',
    script: 'pay'
  },
  {
    intent: "pay",
    id: '${Date.now()}${uuid.v4()}',
    script: 'pay please'
  },
  {
    intent: "pay",
    id: '${Date.now()}${uuid.v4()}',
    script: 'I need to pay on my account'
  },
  {
    intent: "pay",
    id: '${Date.now()}${uuid.v4()}',
    script: 'I want to pay my bill'
  },
  {
    intent: "pay",
    id: '${Date.now()}${uuid.v4()}',
    script: 'pay this now'
  },
  {
    intent: "dispute",
    id: '${Date.now()}${uuid.v4()}',
    script: 'there is something wrong with my account'
  },
  {
    intent: "dispute",
    id: '${Date.now()}${uuid.v4()}',
    script: 'help me'
  },
  {
    intent: "dispute",
    id: '${Date.now()}${uuid.v4()}',
    script: 'i need help resolving an issue'
  },
  {
    intent: "dispute",
    id: '${Date.now()}${uuid.v4()}',
    script: 'my account is screwed up'
  },
  {
    intent: "dispute",
    id: '${Date.now()}${uuid.v4()}',
    script: 'Who can I speak with to fix my account?'
  },
  {
    intent: "dispute",
    id: '${Date.now()}${uuid.v4()}',
    script: 'i have an issue with my account'    
  }
]

module.exports = configureIntents;
