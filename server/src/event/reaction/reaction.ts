import {discordPrivateMsg} from "./Discord/discord";

const handleDiscordReactions = (reaction: string, user, params) => {
    const reactions = {
        "send_a_private_message": discordPrivateMsg
    }
    reactions[reaction](user, params)
}

const handleReactions = (user, reaction, params) => {
    const services_mid = {
        "discord": handleDiscordReactions
    }
    services_mid[reaction.service](reaction.name, user, {...params, ...reaction.params})
}

export default handleReactions;