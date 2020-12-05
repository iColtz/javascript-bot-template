const Event = require('../struct/Event.js');
const { Collection } = require('discord.js');

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
      const clientPermissions = command.clientPermissions;
      const missingPermissions = [];
      if (userPermissions.length) {
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
      if (clientPermissions.length) {
        for (let i = 0; i < clientPermissions.length; i++) {
          const hasPermission = message.guild.me.hasPermission(clientPermissions[i]);
          if (!hasPermission) {
            missingPermissions.push(clientPermissions[i]);
          }
        }
        if (missingPermissions.length) {
          return message.channel.send(`I'm missing these required permissions: ${missingPermissions.join(', ')}`);
        }
      }
      if (!this.client.cooldowns.has(command.name)) {
        this.client.cooldowns.set(command.name, new Collection());
      }
      const now = Date.now();
      const timestamps = this.client.cooldowns.get(command.name);
      const cooldownAmount = command.cooldown * 1000;
      if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
          const timeLeft = ((expirationTime - now) / 1000).toFixed(1);
          return message.channel.send(`Please wait ${timeLeft} more second(s) before reusing the \`${command.id}\` command.`);
        }
      }
      timestamps.set(message.author.id, now);
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
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