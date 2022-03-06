import {discordPrivateMsg} from "./Discord/discord";
import {slackPrivateMsg} from "./Slack/slack";
import {emailSending} from "./Email/email";

/**
 * Handle all discord reactions
 * @param reaction The reaction
 * @param user The user of the reaction
 * @param params The parameters
 */
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
/**
 * Handle all slack reactions
 * @param reaction The reaction
 * @param user The user of the reaction
 * @param params The parameters
 */
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

/**
 * Handle all email reactions
 * @param reaction The reaction
 * @param user The user of the reaction
 * @param params The parameters
 */
const handleEmailReactions = (reaction: string, user, params) => {
    const reactions = {
        "send_an_email": emailSending
    }
    reactions[reaction](user, params)
}

/**
 * Handle all reactions services
 * @param reaction The reaction
 * @param user The user of the reaction
 * @param params The parameters
 */
const handleReactions = (user, reaction, params) => {
    const services_mid = {
        "discord": handleDiscordReactions,
        "slack": handleSlackReactions,
        "email": handleEmailReactions,
    }
    if (!services_mid[reaction.service]) {
        console.error(`This reaction service is not supported: ${reaction.service}`);
        return;
    }
    services_mid[reaction.service](reaction.name, user, {...params, ...reaction.params})
}

export default handleReactions;