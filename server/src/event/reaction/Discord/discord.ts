const Discord = require('discord.js');

const client = new Discord.Client({
    intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES'],
});

client.on('ready', () => {
    console.log(`Discord: Logged in as ${client.user.tag}!`);
});

// send a private message to a user
client.on('message', (msg) => {
    console.log(`${msg.author.username} (${msg.author.id}): ${msg.content}`);
    if (msg.content === 'ping') {
        msg.reply('pong');
    }
});


// create a startDiscord function, that login the bot
const startDiscord = async () => {
    if (!process.env.DISCORD_TOKEN) {
        console.error('Discord not starting: DISCORD_TOKEN not set in the .env file');
        return;
    }
    await client.login(process.env.DISCORD_TOKEN);
};

export default startDiscord;