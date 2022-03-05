import { discordPrivateMsg } from "./Discord/discord";
import { emailSending } from "./Email/email";

const handleDiscordReactions = (reaction: string, user, params) => {
    const reactions = {
        "send_a_private_message": discordPrivateMsg
    }
    reactions[reaction](user, params)
}

const handleEmailReactions = (reaction: string, user, params) => {
    const reactions = {
        "send_an_email": emailSending
    }
    reactions[reaction](user, params)
}

const handleReactions = (user, reaction, params) => {
    const services_mid = {
        "discord": handleDiscordReactions,
        "email": handleEmailReactions,
    }
    services_mid[reaction.service](reaction.name, user, {...params, ...reaction.params})
}

export default handleReactions;