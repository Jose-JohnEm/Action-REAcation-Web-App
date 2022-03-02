import UserModel from '../../models/users'
import {new_module, rm_module, new_grade, new_registration} from '../event/action/Intra/intra';
import {cron_timer} from "../event/action/Timer/timer";

export async function startEvent() {
    let users = await getAllUsers()
    for (let user of users) {
        for (let event of user.events) {
            if (event.action.service === 'intra') {
                let dict = {
                    "new_module": await new_module,
                    "rm_module": await rm_module,
                    "new_grade": await new_grade,
                    "new_register": await new_registration,
                }
                dict[event.action.name](user, event.action, event.reaction)
            }
        }
    }
}

export async function startOneTimeEvent() {
    let users = await getAllUsers()

    for (let user of users) {
        for (let event of user.events) {
            if (event.action.service === 'timer') {
                let dict = {
                    "cron_timer": cron_timer,
                }
                dict[event.action.name](user, event.action, event.reaction)
            }
        }
    }
}

export const getAllUsers = async () => {
    const users = await UserModel.find({});
    if (!users) {
        throw new Error('No users found');
    }
    return users;
}


const getUserWithIntraService = async () => {
    let list = await UserModel.find({
        'events.action.service': 'intra'
    })
    if (!list)
        return []
    return list
}
