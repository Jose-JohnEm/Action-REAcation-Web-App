import UserModel from '../../models/users'
import {new_module, rm_module, new_grade, new_registration} from '../event/action/Intra/intra';

const getUserWithIntraService = async () => {
    var list = await UserModel.find({
        'events.action.service': 'intra'
    })
    if (!list)
        return []
    return list
}

const handleIntraArea = async () => {
    var users = await getUserWithIntraService()
    for (var user of users) {
        for (var event of user.events) {
            if (event.action.service === 'intra') {
                var dict = {
                    "new_module": new_module,
                    "rm_module": rm_module,
                    "new_grade": new_grade,
                    "new_register": new_registration,
                }
                dict[event.action.name](user, event.action, event.reaction)
            }
        }
    }
}

export default handleIntraArea;