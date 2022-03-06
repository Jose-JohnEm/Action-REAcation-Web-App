const Discord = require('discord.js');

// ##### Area Functions #####
/**
 * Searches for a user in the guild.
 * @param guildId The guild ID.
 * @param userTag The user tag.
 */
export async function searchUser(guildId: string, userTag: string) {
    const members = await client.guilds.cache.get(guildId).members.fetch();
    const member = members.find(member => member.user.tag === userTag);
    if (!member)
        return null;
    return member.user.id;
}

/**
 * Verify the user before sending a message.
 * @param user The user ID.
 * @param params The parameters of the message.
 */
export async function discordPrivateMsg(user, params) {
    const discordUser = await searchUser(process.env.DISCORD_GUILD_ID, params.username);
    if (!discordUser) {
        console.error(`User ${params.username} not found`)
        return;
    }
    sendPrivateMessage(discordUser, params.message);
}

/**
 * Send a private message to a user
 * @param userId The user ID.
 * @param message  The message to send.
 */
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

/**
 * When the bot is ready, log that it is ready.
 */
client.on('ready', async () => {
    console.log(`Discord: Logged in as ${client.user.tag}!`);
    console.log("Discord server: " + process.env.DISCORD_GUILD)
});


/**
 * When a message is sent
 */
client.on('message', (msg) => {
    console.log(`${msg.author.username} (${msg.author.id}): ${msg.content}`);
    if (msg.content === 'ping') {
        msg.reply('pong');
    }
});

/**
 * Start the discord bot
 */
const startDiscord = async () => {
    if (!process.env.DISCORD_TOKEN) {
        console.error('Discord not starting: DISCORD_TOKEN not set in the .env file');
        return;
    }
    await client.login(process.env.DISCORD_TOKEN);
};

export default startDiscord;
