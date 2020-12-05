const Command = require('../struct/Command.js');

class PingCommand extends Command {
  constructor() {
    super({
      id: 'ping',
      aliases: ['p'],
      cooldown: 3,
    });
  }

  exec(message) {
    message.channel.send('Pong!');
  }
}

module.exports = PingCommand;