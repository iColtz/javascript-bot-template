require('dotenv/config');
const { Client, Collection } = require('discord.js');
const { eventRegistry } = require('../registries/export/index');

module.exports = class DiscordClient extends Client {

    constructor() {
        super({
            disableMentions: 'everyone',
        });

        this.events = new Collection();
    }

    async start() {
        super.login(process.env.BOT_TOKEN);
        eventRegistry(this);
    }
};