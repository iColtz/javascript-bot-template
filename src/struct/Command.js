class Command {
  constructor(options) {
    this.id = options.id || '';
    this.aliases = options.aliases || [];
  }
}

module.exports = Command;