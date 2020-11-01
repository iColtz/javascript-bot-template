const { promisify } = require('util');
const path = require('path');
const glob = promisify(require('glob'));

module.exports = (client) => {
    return glob(`${path.dirname(require.main.filename)}${path.sep}events/**/*.js`).then(events => {
        for (const eventFile of events) {
            const { name } = path.parse(eventFile);
            const File = require(eventFile);
            const event = new File(client, name.toLowerCase());
            client.events.set(event.name, event);
            event.emitter[event.type](name, (...args) => event.execute(...args));
        }
    });
};