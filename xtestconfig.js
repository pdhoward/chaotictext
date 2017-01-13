
//config file 1
{
    "GA_Tracking_ID": "UA-000000-0",
    "GA_Enabled": false,
    "DB_Use_Mongo" : false,
    "DB_Mongo_URL": "mongodb://localhost/chaotic",
    "Use_Anti_Spam": false
}
//config file 2
{
    "GA_Tracking_ID": "UA-000000-0",
    "GA_Enabled": false,
    "DB_Use_Mongo" : true,
    "DB_Mongo_URL": "mongodb://xio:chaotic@ds147777.mlab.com:47777/chaoticchatter",
    "DB_Mongo_Agents_URL": "mongodb://xio:chaotic@ds133378.mlab.com:33378/chaoticagents",
    "Use_Anti_Spam": false,
    "PUB_KEY": "pub-c-fd7baf82-35ee-4889-9a36-560d0681eee6",
    "SUB_KEY": "sub-c-78144356-ac3b-11e6-a7bb-0619f8945a4f",
    "PUB_SECRET": "sec-c-NzNhZTYwYTQtYjI2OC00YzliLWExZjQtMmQwMDc0YmZjMTQx"
}

// logic to load
//config/index.js
const fs = require('fs');
const path = require('path');

const fileExist = fs.existsSync(path.resolve(__dirname, 'configuration.json'));

if (fileExist) {
    module.exports = require('./configuration.json');
} else {
    module.exports = require('./configuration_template.json');
}

//logic main line
import config         from '../config';
