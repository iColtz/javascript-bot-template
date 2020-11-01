module.exports = class Command {

    constructor(client, name, options = {}) {
        this.client = client;
        this.name = options.name || name;
        this.description = options.description || null;
        this.aliases = options.aliases || [];
        this.category = options.category || null;
        this.permission = options.permission || null;
        this.cooldown = options.cooldown || null;
        this.usage = options.usage || null;
        this.disabled = options.disabled || false;
        this.nsfw = options.nsfw || false;
        this.ownerOnly = options.ownerOnly || false;
        this.guildOnly = options.guildOnly || false;
    }

}; 