import UserData from '../../models/users'

/**
 * @description Compare is two params are equal
 * @param l1
 * @param l2
 */
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

/**
 * @description Get the reaction of the user
 * @param user The user where is the reaction
 * @param service The service of the reaction
 * @param name The name of the reaction
 * @param params The params of the reaction
 */
export function getUserReaction(user, service, name, params: {}) {
    if (!user)
        return undefined

    const reaction = user.events.find(event => {
        return event.action.service === service &&
            event.action.name === name &&
            haveSameData(event.action.params, params)
    })
    if (!reaction.reaction)
        return undefined
    return reaction.reaction
}


/**
 * @description Get the users from a github action
 * @param action The action that was done
 * @param repo The repo where the action was done
 */
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

/**
 * @description Get the users from a pivotal tracker action
 * @param kind The kind of the action
 * @param project The project where the action was done
 */
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

/**
 * @description Get the users from a teams action
 * @param action The action that was done
 * @param name  The name of the action
 * @param botName The name of the bot that was ping
 */
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