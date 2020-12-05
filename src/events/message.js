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
      else if (command.ownerOnly && !this.client.owners.includes(message.author.id)) {
        return message.channel.send('This command can only be used by the owner of this bot.');
      }
      else if (command.requiredArgs && args.length < command.requiredArgs) {
        return message.channel.send(`That is not a valid usage of this command check out \`${this.client.prefix}help ${command.id}\` for more info!`);
      }
      const userPermissions = command.userPermissions;
      if (userPermissions.length) {
        const missingPermissions = [];
        for (let i = 0; i < userPermissions.length; i++) {
          const hasPermission = message.member.hasPermission(userPermissions[i]);
          if (!hasPermission) {
            missingPermissions.push(userPermissions[i]);
          }
        }
        if (missingPermissions.length) {
          return message.channel.send(`Your missing these required permissions: ${missingPermissions.join(', ')}`);
        }
      }
    }
    try {
      command.exec(message, args);
    }
    catch (error) {
      console.log(error);
    }
  }
}


module.exports = MessageEvent;