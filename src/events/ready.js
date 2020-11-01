const Event = require('../structures/bases/eventBase');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            name: 'ready',
            once: true,
        });
    }

    async execute() {
        console.log('Yoo this is ready!');
    }
}; 