const { Client } = require('discord.js');

class client extends Client {
  constructor(config) {
    super({
      /* Discord.js Client Options */
      disableMentions: 'everyone',
    });

    this.token = config.token;

    this.once('ready', () => console.log('Yoo this is ready!'));
  }

  start() {
    super.login(this.token);
  }
}

module.exports = client;