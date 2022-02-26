

const sendMessageToJS = (params) => {
    console.log(params.message);
}

const handleDiscordReactions = (reaction: string, params) => {
    const reactions = {
        "send_a_private_message": sendMessageToJS
    }
    reactions[reaction](params)
}

const handleReactions = (service: string, reaction: string, params) => {
    const services_mid = {
        "discord": handleDiscordReactions
    }
    services_mid[service](reaction, params)
}

export default handleReactions;