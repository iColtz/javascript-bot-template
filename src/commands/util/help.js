const Command = require('../../structures/bases/commandBase');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'help',
            description: 'Display a list of all available commands!',
            category: 'Util',
        });
    }

    async execute(message, args) {
        const embed = new MessageEmbed()
            .setColor('BLUE');

        const command = this.client.commands.get(args[0]);

        if (command) {
            embed.setDescription([
                `**Name:** ${command.name}`,
                `**Description:** ${command.description || 'None'}`,
                `**Usage:** ${command.usage || 'None'}`,
                `**Aliases:** ${command.aliases.length ? command.aliases.map(alias => `\`${alias}\``).join(' ') : 'None'}`,
            ]);
        }
        else {
            const categories = this.client.util.removeDuplicates(this.client.commands.map(c => c.category));
            embed.setDescription('For additional info on a command, use `?help <command>`');

            for (const category of categories) {
                embed.addField(category || 'Misc', this.client.commands.filter(c => c.category === category).map(c => `\`${c.name}\``).join(' '));
            }
        }

        message.channel.send({ embed: embed });
    }
};