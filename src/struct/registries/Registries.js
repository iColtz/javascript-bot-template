const { sync } = require('glob');
const { resolve } = require('path');
const Event = require('../Event.js');

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

module.exports = {
  registerEvents
};