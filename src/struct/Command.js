class Command {
  constructor(options) {
    this.id = options.id || '';
    this.aliases = options.aliases || [];
    this.guildOnly = Boolean(options.guildOnly) || true;
    this.ownerOnly = Boolean(options.ownerOnly) || false;
  }
}

module.exports = Command;