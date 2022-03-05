import {discordPrivateMsg} from "./Discord/discord";
import {slackPrivateMsg} from "./Slack/slack";

const handleDiscordReactions = (reaction: string, user, params) => {
    const reactions = {
        "send_a_private_message": discordPrivateMsg
    }
    if (!reactions[reaction]) {
        console.error(`Reaction ${reaction} not found`);
        return;
    }
    reactions[reaction](user, params)
}
const handleSlackReactions = (reaction: string, user, params) => {
    const reactions = {
        "send_a_private_message": slackPrivateMsg
    }
    if (!reactions[reaction]) {
        console.error(`Reaction ${reaction} not found`);
        return;
    }
    reactions[reaction](user, params)
}

const handleReactions = (user, reaction, params) => {
    const services_mid = {
        "discord": handleDiscordReactions,
        "slack": handleSlackReactions
    }
    if (!services_mid[reaction.service]) {
        console.error(`This reaction service is not supported: ${reaction.service}`);
        return;
    }
    services_mid[reaction.service](reaction.name, user, {...params, ...reaction.params})
}

export default handleReactions;