import axios from 'axios'
import handleReactions from '../../reaction/reaction'
import { IntraProfile, IntraModule, Imsg, Imod } from './intraInterfaces'
import { Iuser, action, reaction } from '../../../../models/users'

const getEmailFromToken = async (autologin: string) => {
    var res = await axios.get(`https://intra.epitech.eu/${autologin}/user/?format=json`)
    var data : IntraProfile = res.data

    return data.login
}

const getProfileFromToken = async (autologin: string) => {
    var res = await axios.get(`https://intra.epitech.eu/${autologin}/user/?format=json`)
    var data : IntraProfile = res.data

    return data
}

const getModules = async (autologin: string, login: string) => {
    var res = await axios.get(`https://intra.epitech.eu/${autologin}/user/${login}/print?format=json`)
    var data : IntraModule = res.data

    return res.data.modules
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
    "reach_credit": "last_credit",
    "reach_gpa": "last_gpa",
}

const new_grade = async (user, action: action, reaction: reaction) => {
    const autologin: string = action.params.token;
    const login: string = await getEmailFromToken(autologin)

    const messages : Imsg[] = await getMessages(autologin, login)
    const msg = messages[0]

    if (msg.class == "module") {
        if (user.data.intra[dict[action.name]] !== undefined) {
            var event_id = parseInt(msg.id)
            if (event_id !== user.data.intra[dict[action.name]]) {
                handleReactions(user, reaction, {"message": msg.title.split(" by <a href=")[0]})
            }
        }
        user.data.intra[dict[action.name]] = parseInt(msg.id)
        await user.save()
    }
}

const new_registration = async (user, action: action, reaction: reaction) => {
    const autologin: string = action.params.token;
    const login: string = await getEmailFromToken(autologin)

    const messages = await getMessages(autologin, login)
    const msg = messages[0]

    if (msg.class == "register") {
        if (user.data.intra[dict[action.name]] !== undefined) {
            var event_id = parseInt(msg.id)
            if (event_id !== user.data.intra[dict[action.name]]) {
                handleReactions(user, reaction, {"message": msg.title.split(" <a href=")[0]})
            }
        }
        user.data.intra[dict[action.name]] = parseInt(msg.id)
        await user.save()
    }
}

const new_module = async (user, action: action, reaction: reaction) => {
    const autologin: string = action.params.token;
    const login: string = await getEmailFromToken(autologin)

    const modules: Imod[] = await getModules(autologin, login)
    const l_mod: Imod = modules[modules.length - 1]

    if (user.data.intra[dict[action.name]] !== undefined) {
        var event_id = parseInt(l_mod.instance_id)
        if (event_id > user.data.intra[dict[action.name]]) {
            handleReactions(user, reaction, {"message": `${login} just subscribed to ${l_mod.title}`})
        }
    }
    user.data.intra[dict[action.name]] = parseInt(l_mod.instance_id)
    await user.save()
}

const rm_module = async (user, action: action, reaction: reaction) => {
    const autologin: string = action.params.token;
    const login: string = await getEmailFromToken(autologin)

    const modules: Imod[] = await getModules(autologin, login)
    const l_mod: Imod = modules[modules.length - 1]

    if (user.data.intra[dict[action.name]] !== undefined) {
        var event_id = parseInt(l_mod.instance_id)
        if (event_id < user.data.intra[dict[action.name]]) {
            handleReactions(user, reaction, {"message": `${login} just unsubscribed to ${l_mod.title}`})
        }
    }
    user.data.intra[dict[action.name]] = parseInt(l_mod.instance_id)
    await user.save()
}

const reach_credit = async (user, action: action, reaction: reaction) => {
    const autologin: string = action.params.token;
    const profile: IntraProfile = await getProfileFromToken(autologin)
    const target: number = parseInt(action.params.target)

    if (user.data.intra[dict[action.name]] !== undefined && user.data.intra[dict[action.name]] < target) {
        var credits = profile.credits
        if (credits >= target) {
            handleReactions(user, reaction, {"message": `${profile.firstname} ${profile.lastname} reached an amount of ${profile.credits} credits !`})
        }
    }
    user.data.intra[dict[action.name]] = profile.credits
    await user.save()
}

const reach_gpa = async (user, action: action, reaction: reaction) => {
    const autologin: string = action.params.token;
    const profile: IntraProfile = await getProfileFromToken(autologin)
    const target: number = parseFloat(action.params.target)

    if (user.data.intra[dict[action.name]] !== undefined && user.data.intra[dict[action.name]] < target) {
        var gpa = parseFloat(profile.gpa[0].gpa)
        if (gpa >= target) {
            handleReactions(user, reaction, {"message": `${profile.firstname} ${profile.lastname} reached a GPA of ${profile.gpa[0].gpa} !`})
        }
    }
    user.data.intra[dict[action.name]] = parseFloat(profile.gpa[0].gpa)
    await user.save()
}

export {new_module, rm_module, new_grade, new_registration, reach_credit, reach_gpa}