const Event = require('../../structures/bases/eventBase');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            name: 'message',
        });
    }

    async execute(message) {
        if (!message.guild || !message.content.startsWith(this.client.prefix)) return;
        
        const [commandName, ...args] = message.content.slice(this.client.prefix.length).trim().split(/ +/g); 

        const command = this.client.commands.get(commandName)
            || this.client.commands.get(this.client.aliases.get(commandName));

        if (!command) return;

        try {
            command.execute(message, args);
        }
        catch (error) {
            console.log(`There was an error while executing a command: ${error}`);
        }
    }
}; 