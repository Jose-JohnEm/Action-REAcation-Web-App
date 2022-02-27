import {discordPrivateMsg} from "./Discord/discord";

const handleDiscordReactions = (reaction: string, user, params) => {
    const reactions = {
        "send_a_private_message": discordPrivateMsg
    }
    reactions[reaction](user, params)
}

const handleReactions = (user, service: string, reaction: string, params) => {
    const services_mid = {
        "discord": handleDiscordReactions
    }
    services_mid[service](reaction, user, params)
}

export default handleReactions;