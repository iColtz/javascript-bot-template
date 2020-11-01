const Event = require('../../structures/bases/eventBase');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            name: 'message',
        });
    }

    async execute(message) {
        if (message.content === '!ping') {
            return message.channel.send(`Pong! ${this.client.ws.ping}ms`);
        }
    }
}; 