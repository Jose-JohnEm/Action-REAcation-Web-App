const Discord = require('discord.js');

// ##### Area Functions #####
export async function searchUser(guildId: string, userTag: string) {
    const members = await client.guilds.cache.get(guildId).members.fetch();
    const member = members.find(member => member.user.tag === userTag);
    if (!member)
        return null;
    return member.user.id;
}

export async function discordPrivateMsg(user, params) {
    const discordUser = await searchUser(process.env.DISCORD_GUILD_ID, user.data.username.discord);
    if (!discordUser) {
        console.error(`User ${user.data.username.discord} not found`)
        return;
    }
    sendPrivateMessage(discordUser, params.message);
}

export function sendPrivateMessage(userId, message) {
    client.users.fetch(userId).then(user => {
        user.createDM().then(channel => {
            channel.send(message);
        });
    });
}

// ##### Discord BOT #####
const client = new Discord.Client({
    intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES'],
});

client.on('ready', async () => {
    console.log(`Discord: Logged in as ${client.user.tag}!`);
    console.log("Discord server: " + process.env.DISCORD_GUILD)
});

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
