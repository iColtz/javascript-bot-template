const Event = require('../struct/Event.js');

class MessageEvent extends Event {
  constructor() {
    super({
      id: 'message',
      once: false,
    });
  }

  exec(message) {
    if (message.bot || !message.content.startsWith(this.client.prefix)) return;
    const args = message.content.slice(this.client.prefix.length).trim().split(/ +/);
    const commandName = args.shift();
    const command = this.client.commands.get(commandName);
    if (command) {
      try {
        command.exec(message, args);
      }
      catch (error) {
        console.log(error);
      }
    }
  }
}

module.exports = MessageEvent;