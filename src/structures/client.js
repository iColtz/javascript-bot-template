require('dotenv/config');
const { Client } = require('discord.js');

module.exports = class DiscordClient extends Client {

    constructor() {
        super({
            disableMentions: 'everyone',
        });

        this.on('ready', () => console.log('Yoo this is ready!'));

        this.on('message', (message) => {
            if (message.content === '!ping') {
                return message.channel.send(`Pong! ${this.ws.ping}ms`);
            }
        });
    }

    async start() {
        super.login(process.env.BOT_TOKEN);
    }
};