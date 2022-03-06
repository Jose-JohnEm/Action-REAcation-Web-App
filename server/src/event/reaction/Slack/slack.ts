// Create a slack bot using @slack/bolt

const {App} = require("@slack/bolt");

const slack = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
});

/**
 * Start the slack bot
 */
const startSlackBot = async () => {
    await slack.start(process.env.PORT || 3000);
    console.log("Slack bot started!");
};

/**
 * List all the users in the slack team
 */
const listUsers = async () => {
    const users = await slack.client.users.list({
        token: process.env.SLACK_BOT_TOKEN,
    });
    console.log(users);
};

// Send a private message to a user
/**
 * Send a private message to a user
 * @param {string} userId The user id of the user to send the message to
 * @param {string} message The message to send
 */
const sendPrivateMessage = async (userId: string, message: string) => {
    await slack.client.chat.postMessage({
        token: process.env.SLACK_BOT_TOKEN,
        channel: userId,
        text: message,
    });
};

/**
 * Send a private message to a user
 * @param user The userid of the user to send the message to
 * @param params Parameters to send to the slack api
 */
export async function slackPrivateMsg(user, params) {
    await sendPrivateMessage(params.userid, params.message);
}

export default startSlackBot;