import axios from 'axios'
import handleReactions from '../../reaction/reaction'

const getEmailFromToken = async (autologin: string) => {
    var res = await axios.get(`https://intra.epitech.eu/${autologin}/user/?format=json`)
    return res.data.login
}

const getProfileFromToken = async (autologin: string) => {
    var res = await axios.get(`https://intra.epitech.eu/${autologin}/user/?format=json`)
    return res.data
}

const getModules = async (autologin: string, login: string) => {
    var res = await axios.get(`https://intra.epitech.eu/${autologin}/user/${login}/notification/message?format=json`)
    return res.data
}

const getMessages = async (autologin: string, login: string) => {
    var res = await axios.get(`https://intra.epitech.eu/${autologin}/user/${login}/notification/message?format=json`)
    return res.data
}

const dict = {
    "new_grade": "last_grade",
    "new_register": "last_register",
    "rm_module": "last_module",
    "new_module": "last_module",
}

const new_grade = async (user, action, reaction) => {
    const autologin: string = action.params.token;
    const login: string = await getEmailFromToken(autologin)

    const messages = await getMessages(autologin, login)
    const msg = messages[0]

    if (msg.class == "module") {
        if (user.data.intra[dict[action.name]] !== undefined) {
            var event_id = parseInt(msg.id)
            if (event_id !== user.data.intra[dict[action.name]]) {
                console.log("Intra Action ! :", reaction);
                handleReactions(user, reaction, {"message": msg.title.split(" by <a href=")[0]})
            }
        }
        user.data.intra[dict[action.name]] = parseInt(msg.id)
        user.save()
    }
}

const new_registration = async (user, action, reaction) => {
    // const autologin: string = action.params.token;
    // const login: string = await getEmailFromToken(autologin)

    // const messages = await getMessages(autologin, login)
    // const msg = messages[0]

    // if (msg.class == "register") {
    //     if (user.data.intra[dict[action.name]] !== undefined) {
    //         var event_id = parseInt(msg.id)
    //         if (event_id !== user.data.intra[dict[action.name]]) {
    //             console.log("Intra Action ! :", reaction);
    //             handleReactions(user, reaction, {"message": "You just registred to an activity"})
    //         }
    //         user.data.intra[dict[action.name]] = parseInt(msg.id)
    //         user.save()
    //     }
    // }
    
}

const new_module = (user, action, reaction) => {
    if (user.data.intra[dict[action.name]] !== undefined) {
        
    }
}

const rm_module = (user, action, reaction) => {
    if (user.data.intra[dict[action.name]] !== undefined) {
        
    }
}



export {new_module, rm_module, new_grade, new_registration}