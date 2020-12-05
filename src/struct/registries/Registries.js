const { sync } = require('glob');
const { resolve } = require('path');
const Event = require('../Event.js');
const Command = require('../Command.js');

function registerEvents(client) {
  const eventFiles = sync(resolve('./src/events/**/*.js'));
  eventFiles.forEach((filepath) => {
    const File = require(filepath);
    if (!(File.prototype instanceof Event)) return;
    const event = new File();
    client.events.set(event.id, event);
    client[event.type ? 'once' : 'on'](event.id, (...args) => event.exec(...args));
  });
}

function registerCommands(client) {
  const commandFiles = sync(resolve('./src/commands/**/*.js'));
  commandFiles.forEach((filepath) => {
    const File = require(filepath);
    if (!(File.prototype instanceof Command)) return;
    const command = new File();
    client.commands.set(command.id, command);
  });
}

module.exports = {
  registerEvents,
  registerCommands,
};