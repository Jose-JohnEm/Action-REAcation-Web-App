import UserData from '../../models/users'

// TODO: save an event to the database

const haveSameData = (l1, l2) => {

    const obj1Length = Object.keys(l1).length;
    const l2Length = Object.keys(l2).length;

    if (obj1Length === l2Length) {
        return Object.keys(l1).every(
            key => l2.hasOwnProperty(key)
                && l2[key] === l1[key]);
    }
    return false;
}

// --- Global ---
export function getUserReaction(user, service, name, params: {}) {
    if (!user)
        return undefined

    const reaction = user.events.find(event => {
        return event.action.service === service &&
            event.action.name === name &&
            haveSameData(event.action.params, params)
    })
    return reaction.reaction
}


// --- Github ---
export async function getUserFromGithubAction(action, repo) {
    console.log(action + " / " + repo);
    // Find the user and wait for the response before returning
    const user = await UserData.find({
        'events.action.service': 'github',
        'events.action.name': action,
        'events.action.params.repository': repo
    })
    if (!user)
        return null
    return JSON.parse(JSON.stringify(user))
}

// --- Pivotal Tracker ---
export async function getUserFromPivotalTrackerAction(kind, project) {
    console.log(kind + " / " + project);
    // Find the user and wait for the response before returning
    const user = await UserData.find({
        'events.action.service': 'pivotaltracker',
        'events.action.name': kind,
        'events.action.params.projectId': project
    })
    if (!user)
        return null
    return JSON.parse(JSON.stringify(user))
}

// --- Teams ---
export async function getUserFromTeamsAction(action, name, botName) {
    console.log(action + " / " + name);
    // Find the user and wait for the response before returning
    const user = await UserData.find({
        'events.action.service': 'teams',
        'events.action.name': action,
        'events.action.params.botname': botName
    })
    if (!user)
        return null
    return JSON.parse(JSON.stringify(user))
}

export default {
    getUserReaction,
    getUserFromGithubAction
}