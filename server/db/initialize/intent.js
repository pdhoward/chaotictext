///////////////////////////////////////////////////////////////////////
////////     test data for intents and scripts           //////////////
//////////////////////////////////////////////////////////////////////

var uuid = require('node-uuid');

// list of channels with conversation scripts enabled

const configureIntents = [
  {
    intent: "ship",
    id: '${Date.now()}${uuid.v4()}',
    script: 'i need to ship something',
    tokens: [],
    entities: [],
    keywords: [],
    actions: [],
    confidence: 80,
    botGreeting: 'I am here to help you ship',
    botConfig: {}
  },
  {
    intent: "ship",
    id: '${Date.now()}${uuid.v4()}',
    script: 'i need to ship a product',
    tokens: [],
    entities: [],
    keywords: [],
    actions: [],
    confidence: 80,
    botGreeting: 'I am here to help you ship',
    botConfig: {}
  },
  {
    intent: "ship",
    id: '${Date.now()}${uuid.v4()}',
    script: 'need to fedex',
    tokens: [],
    entities: [],
    keywords: [],
    actions: [],
    confidence: 80,
    botGreeting: 'I am here to help you ship',
    botConfig: {}
  },
  {
    intent: "ship",
    id: '${Date.now()}${uuid.v4()}',
    script: 'help me ship',
    tokens: [],
    entities: [],
    keywords: [],
    actions: [],
    confidence: 80,
    botGreeting: 'I am here to help you ship',
    botConfig: {}
  },
  {
    intent: "ship",
    id: '${Date.now()}${uuid.v4()}',
    script: 'ship this please',
    tokens: [],
    entities: [],
    keywords: [],
    actions: [],
    confidence: 80,
    botGreeting: 'I am here to help you ship',
    botConfig: {}
  },
  {
    intent: "buy",
    id: '${Date.now()}${uuid.v4()}',
    script: 'buy a product',
    tokens: [],
    entities: [],
    keywords: [],
    actions: [],
    confidence: 80,
    botGreeting: 'I can help with you buy',
    botConfig: {}
  },
  {
    intent: "buy",
    id: '${Date.now()}${uuid.v4()}',
    script: 'want to purchase something',
    tokens: [],
    entities: [],
    keywords: [],
    actions: [],
    confidence: 80,
    botGreeting: 'I can help you purchase something',
    botConfig: {}
  },
  {
    intent: "buy",
    id: '${Date.now()}${uuid.v4()}',
    script: 'trying to find a product',
    tokens: [],
    entities: [],
    keywords: [],
    actions: [],
    confidence: 80,
    botGreeting: 'I can help you shop',
    botConfig: {}
  },
  {
    intent: "buy",
    id: '${Date.now()}${uuid.v4()}',
    script: 'help me buy',
    tokens: [],
    entities: [],
    keywords: [],
    actions: [],
    confidence: 80,
    botGreeting: 'I am here to help',
    botConfig: {}
  },
  {
    intent: "buy",
    id: '${Date.now()}${uuid.v4()}',
    script: 'buy',
    tokens: [],
    entities: [],
    keywords: [],
    actions: [],
    confidence: 80,
    botGreeting: 'I can help you buy',
    botConfig: {}
  },
  {
    intent: "pay",
    id: '${Date.now()}${uuid.v4()}',
    script: 'need to make a payment',
    tokens: [],
    entities: [],
    keywords: [],
    actions: [],
    confidence: 80,
    botGreeting: 'I can help you pay',
    botConfig: {}
  },
  {
    intent: "pay",
    id: '${Date.now()}${uuid.v4()}',
    script: 'pay please',
    tokens: [],
    entities: [],
    keywords: [],
    actions: [],
    confidence: 80,
    botGreeting: 'I can help with that',
    botConfig: {}
  },
  {
    intent: "pay",
    id: '${Date.now()}${uuid.v4()}',
    script: 'I need to pay on my account',
    tokens: [],
    entities: [],
    keywords: [],
    actions: [],
    confidence: 80,
    botGreeting: 'I can help you process a payment',
    botConfig: {}
  },
  {
    intent: "pay",
    id: '${Date.now()}${uuid.v4()}',
    script: 'I want to pay my bill',
    tokens: [],
    entities: [],
    keywords: [],
    actions: [],
    confidence: 80,
    botGreeting: 'I can help you with your bill',
    botConfig: {}
  },
  {
    intent: "pay",
    id: '${Date.now()}${uuid.v4()}',
    script: 'pay',
    tokens: [],
    entities: [],
    keywords: [],
    actions: [],
    confidence: 80,
    botGreeting: 'I can help with that',
    botConfig: {}
  },
  {
    intent: "dispute",
    id: '${Date.now()}${uuid.v4()}',
    script: 'there is something wrong with my account',
    tokens: [],
    entities: [],
    keywords: [],
    actions: [],
    confidence: 80,
    botGreeting: 'You have a problem with your account. How can I help?',
    botConfig: {}
  },
  {
    intent: "dispute",
    id: '${Date.now()}${uuid.v4()}',
    script: 'i need help resolving an issue',
    tokens: [],
    entities: [],
    keywords: [],
    actions: [],
    confidence: 80,
    botGreeting: 'How can I help?',
    botConfig: {}
  },
  {
    intent: "dispute",
    id: '${Date.now()}${uuid.v4()}',
    script: 'my account is screwed up',
    tokens: [],
    entities: [],
    keywords: [],
    actions: [],
    confidence: 80,
    botGreeting: 'Let me help you with that',
    botConfig: {}
  },
  {
    intent: "dispute",
    id: '${Date.now()}${uuid.v4()}',
    script: 'Who can I speak with to fix my account?',
    tokens: [],
    entities: [],
    keywords: [],
    actions: [],
    confidence: 80,
    botGreeting: 'I can help!',
    botConfig: {}
  },
  {
    intent: "dispute",
    id: '${Date.now()}${uuid.v4()}',
    script: 'i have an issue with my account',
    tokens: [],
    entities: [],
    keywords: [],
    actions: [],
    confidence: 80,
    botGreeting: 'I can help you with any issues',
    botConfig: {}
  },
]

module.exports = configureIntents;
