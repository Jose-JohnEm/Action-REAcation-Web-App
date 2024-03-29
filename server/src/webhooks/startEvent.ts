import UserModel, {Iuser} from '../../models/users'
import {new_grade, new_module, new_registration, reach_credit, reach_gpa, rm_module} from '../event/action/Intra/intra';

/**
 * Do each event
 */
export async function startEvent() {
    let users: Iuser[] = await getAllUsers()
    for (let user of users) {
        for (let event of user.events) {
            if (event.action.service === 'intra') {
                let dict = {
                    "new_module": new_module,
                    "rm_module": rm_module,
                    "new_grade": new_grade,
                    "new_register": new_registration,
                    "reach_credit": reach_credit,
                    "reach_gpa": reach_gpa,
                }
                if (dict[event.action.name] instanceof Function) {
                    await dict[event.action.name](user, event.action, event.reaction)
                }
            }
        }
    }
}

/**
 * Get all users in the database
 */
export const getAllUsers = async () => {
    const users: Iuser[] = await UserModel.find({});
    if (!users) {
        throw new Error('No users found');
    }
    return users;
}
