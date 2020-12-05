const Event = require('../struct/Event.js');

class ReadyEvent extends Event {
  constructor() {
    super({
      id: 'ready',
      once: true,
    });
  }

  exec() {
    console.log('Yoo this is ready!');
  }
}

module.exports = ReadyEvent;