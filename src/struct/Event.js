class Event {
  constructor(options) {
    this.id = options.id || '';
    this.type = options.once || false;
    this.emitter = options.emitter || null;
  }
}

module.exports = Event;