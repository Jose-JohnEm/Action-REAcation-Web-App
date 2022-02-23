import UserData from '../../models/users'

// TODO: save an event to the database

// --- Global ---
export function getUserReaction(user, service, name, params: []) { // TODO Fix and try before use
    // verify if user is not null
    if (!user)
        return null

    const reaction = user.events.find(event => {
        return event.action.service === service &&
            event.action.name === name &&
            event.action.params === params
    })
    console.log(reaction);
    return reaction
}


// --- Github ---
export async function getUserFromGithubAction(action, sender, repo) {
    console.log(action + " / " + sender + " / " + repo);
    // Find the user and wait for the response before returning
    const user = await UserData.findOne({
        'events.action.service': 'github',
        'events.action.name': action,
        'data.githubUsername': sender,
        'events.action.params.repository': repo
    })
    if (!user)
        return null
    return JSON.parse(JSON.stringify(user))
}

export default {
    getUserReaction,
    getUserFromGithubAction
}