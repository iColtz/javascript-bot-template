# 🤖 Discord Bot Template
> Discord JS command + event handler.
## ⚓ Requirements
1. Discord Bot Token **[Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)**
3. **[NodeJS](https://nodejs.org/en/)** v12.0.0 or higher

## 🚀  Getting Started
```
git clone https://github.com/iColtz/Discord-Bot-Base
cd Discord-Bot-Base
npm install
```

## ⚙️  Configuration
Rename the file `.envEXAMPLE` to `.env` and fill out the values

⚠️  **Note: Never share your tokens publicly**  ⚠️
```
BOT_TOKEN=DISCORD BOT TOKEN
BOT_OWNERID=BOT OWNER USER ID
PREFIX=!
```

## 📝Features
- Features
	- Command Handler
	- Event Handler
	- Help command
- Command Options:
	- Description
	- Usage
	- Aliases
	- Categories
	- Member Permissions
	- Bot Permissions
	- Cooldowns
	- NSFW
	- Owner Only
	- Guild Only
	
## ✏️ Exampe Command
```js
const Command = require('../structures/bases/commandBase');
module.exports = class extends Command  {
	constructor(...args)  {
		super(...args,  {
			name: 'kick', // Command name
			description: 'Kicks a member!', // A brief description of the command
			usage: '!kick @Member Reason', // The usage of the command
			aliases: ['remove'], // Command aliases
			category: 'Moderation', // Command category
			memberPermission: 'KICK_MEMBERS', // Permissions the message member requires
			botPermission: 'KICK_MEMBERS', // Permissions the message bot requires
			coldown: 3, // Command cooldown in seconds
			nsfw: false, // Weather the command can only be done in NSFW channels
			ownerOnly: false, // Only the bot owner can use the command
			guildOnly: true, // The command can only be used in guilds (not dms)
		});
	}

	async  execute(message)  {
		// COMMAND CODE
	}
};
```