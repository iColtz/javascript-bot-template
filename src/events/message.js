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
    const command = this.client.commands.get(commandName)
      || this.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (command) {
      if (command.guildOnly && !message.guild) {
        return message.channel.send('This command can only be used in guilds.');
      }
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