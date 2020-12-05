class Event {
  constructor(options) {
    this.id = options.id || '';
    this.type = options.once || false;
  }
}

module.exports = Event;