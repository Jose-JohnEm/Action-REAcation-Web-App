// Create a slack bot using @slack/bolt

const { App } = require("@slack/bolt");

const slack = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// Start the app
const startSlackBot = async () => {
  await slack.start(process.env.PORT || 3000);
  console.log("Slack bot started!");
};

// Get the user id of a user by their name
const getUserId = async (userName) => {
  const user = await slack.client.users.info({
    token: process.env.SLACK_BOT_TOKEN,
    user: userName,
  });
  return user.user.id;
};

// List all users in the workspace
const listUsers = async () => {
  const users = await slack.client.users.list({
    token: process.env.SLACK_BOT_TOKEN,
  });
  console.log(users);
};

// Send a private message to a user
const sendPrivateMessage = async (userId: string, message: string) => {
  await slack.client.chat.postMessage({
    token: process.env.SLACK_BOT_TOKEN,
    channel: userId,
    text: message,
  });
};

export async function slackPrivateMsg(user, params) {
  await sendPrivateMessage(params.userid, params.message);
}

export default startSlackBot;