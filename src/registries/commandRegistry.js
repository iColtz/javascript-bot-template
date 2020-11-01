const { promisify } = require('util');
const path = require('path');
const glob = promisify(require('glob'));

module.exports = (client) => {
    return glob(`${path.dirname(require.main.filename)}${path.sep}commands/**/*.js`).then(commands => {
        for (const commandFile of commands) {
            const { name } = path.parse(commandFile);
            const File = require(commandFile);
            const command = new File(client, name.toLowerCase());
            client.commands.set(command.name, command);
            if (command.aliases.length) {
                for (const alias of command.aliases) {
                    client.aliases.set(alias, command.name);
                }
            }
        }
    });
};