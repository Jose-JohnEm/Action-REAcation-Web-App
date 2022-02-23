import UserData from '../../models/users'

// TODO: save an event to the database

const haveSameData = (l1, l2) => {

    if (l1.length === l2.length) {
        for (let i = 0; i < l1.length; i++) {
            var obj1 = l1[i]
            var obj2 = l1[i]
        
            const obj1Length = Object.keys(obj1).length;
            const obj2Length = Object.keys(obj2).length;
        
            if (obj1Length === obj2Length) {
                return Object.keys(obj1).every(
                    key => obj2.hasOwnProperty(key)
                        && obj2[key] === obj1[key]);
            }
        }
    }
    return false;
}

// --- Global ---
export function getUserReaction(user, service, name, params: Array<{}>) {
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