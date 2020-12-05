const Command = require('../struct/Command.js');

class PingCommand extends Command {
  constructor() {
    super({
      id: 'ping',
    });
  }

  exec(message) {
    message.channel.send('Pong!');
  }
}

module.exports = PingCommand;