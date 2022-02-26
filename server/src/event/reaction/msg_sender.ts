

const sendMessageToJS = (message: string) => {
    console.log(message);
}

const handleDiscordReactions = (reaction: string, params) => {
    const reactions = {
        "send_a_private_message": sendMessageToJS
    }
    reactions[reaction](params.message)
}

const handleReactions = (service: string, reaction: string, params) => {
    const services_mid = {
        "discord": handleDiscordReactions
    }
    services_mid[service](reaction, params)
}

