require('dotenv/config');
const Event = require('../../structures/bases/eventBase');
const { Collection } = require('discord.js');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            name: 'message',
        });
    }

    async execute(message) {
        if (!message.content.startsWith(this.client.prefix)) return;

        const [commandName, ...args] = message.content.slice(this.client.prefix.length).trim().split(/ +/g); 

        const command = this.client.commands.get(commandName)
            || this.client.commands.get(this.client.aliases.get(commandName));

        if (!command) return;

        if (command.ownerOnly && message.member.id !== process.env.BOT_OWNERID) {
            return message.channel.send('This command can only be used by the bot owner.');
        }
        
        if (command.guildOnly && message.channel.type === 'dm') {
            return message.channel.send('I can only execute this command in a guild.');
        }

        if (command.cooldown) {
            const { cooldowns } = this.client;

            if (!cooldowns.has(command.name)) {
                cooldowns.set(command.name, new Collection());
            }

            const now = Date.now();
            const timestamps = cooldowns.get(command.name);
            const cooldownAmount = command.cooldown * 1000;

            if (timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    return message.channel.send(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
                }
            }

            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        }

        try {
            command.execute(message, args);
        }
        catch (error) {
            console.log(`There was an error while executing a command: ${error}`);
        }
    }
}; 