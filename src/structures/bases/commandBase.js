module.exports = class Command {

    constructor(client, name, options = {}) {
        this.client = client;
        this.name = options.name || name;
        this.description = options.description || null;
        this.usage = options.usage || null;
        this.aliases = options.aliases || [];
        this.category = options.category || null;
        this.memberPermission = options.memberPermission || [];
        this.botPermission = options.botPermission || [];
        this.cooldown = options.cooldown || null;
        this.nsfw = options.nsfw || false;
        this.ownerOnly = options.ownerOnly || false;
        this.guildOnly = options.guildOnly || false;
    }

}; 