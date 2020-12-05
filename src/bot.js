const Client = require('./client/Client.js');
const config = require('../config.json');
const client = new Client(config);
client.start();