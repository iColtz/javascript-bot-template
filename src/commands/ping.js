const Command = require('../structures/bases/commandBase');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'ping',
            description: 'Pong!',
            category: 'Util',
            cooldown: 3,
            guildOnly: false,
        });
    }

    async execute(message) {
        const msg = await message.channel.send('Pinging...');

        const messagePing = msg.createdTimestamp - message.createdTimestamp;

        msg.edit(`🏓 Pong! \`${messagePing}ms\` \nHeart beat: \`${this.client.ws.ping}ms\``);
    }
}; 