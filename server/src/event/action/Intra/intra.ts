import axios from 'axios'
import handleReactions from '../../reaction/reaction'
import {Imod, Imsg, IntraModule, IntraProfile} from './intraInterfaces'
import {action, reaction} from '../../../../models/users'

/**
 * Get the events of the user from is token
 * @param autologin The intra autologin
 */
const getEmailFromToken = async (autologin: string) => {
    let res = await axios.get(`https://intra.epitech.eu/${autologin}/user/?format=json`)
    let data: IntraProfile = res.data

    return data.login
}

/**
 * Get the profile of the user from the user token
 * @param autologin The intra autologin
 */
const getProfileFromToken = async (autologin: string) => {
    let res = await axios.get(`https://intra.epitech.eu/${autologin}/user/?format=json`)
    let data: IntraProfile = res.data

    return data
}

/**
 * Get the modules of the user
 * @param autologin The intra autologin
 * @param login The user login (email)
 */
const getModules = async (autologin: string, login: string) => {
    let res = await axios.get(`https://intra.epitech.eu/${autologin}/user/${login}/print?format=json`)
    let data: IntraModule = res.data

    return res.data.modules
}

/**
 * Get the messages of the user
 * @param autologin The intra autologin
 * @param login The user login (email)
 */
const getMessages = async (autologin: string, login: string) => {
    let res = await axios.get(`https://intra.epitech.eu/${autologin}/user/${login}/notification/message?format=json`)
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

/**
 * Verify if the user has new grade
 * @param user The user
 * @param action The action
 * @param reaction The reaction to do
 */
const new_grade = async (user, action: action, reaction: reaction) => {
    const autologin: string = action.params.token;
    const login: string = await getEmailFromToken(autologin)

    const messages: Imsg[] = await getMessages(autologin, login)
    const msg = messages[0]

    if (msg.class == "module") {
        if (user.data.intra[dict[action.name]] !== undefined) {
            let event_id = parseInt(msg.id)
            if (event_id !== user.data.intra[dict[action.name]]) {
                handleReactions(user, reaction, {"message": msg.title.split(" by <a href=")[0]})
            }
        }
        user.data.intra[dict[action.name]] = parseInt(msg.id)
        await user.save()
    }
}

/**
 * Verify if the user register to a module
 * @param user The user
 * @param action The action
 * @param reaction The reaction to do
 */
const new_registration = async (user, action: action, reaction: reaction) => {
    const autologin: string = action.params.token;
    const login: string = await getEmailFromToken(autologin)

    const messages = await getMessages(autologin, login)
    const msg = messages[0]

    if (msg.class == "register") {
        if (user.data.intra[dict[action.name]] !== undefined) {
            let event_id = parseInt(msg.id)
            if (event_id !== user.data.intra[dict[action.name]]) {
                handleReactions(user, reaction, {"message": msg.title.split(" <a href=")[0]})
            }
        }
        user.data.intra[dict[action.name]] = parseInt(msg.id)
        await user.save()
    }
}

/**
 * Verify if there is subscribed to a new module
 * @param user The user
 * @param action The action
 * @param reaction The reaction to do
 */
const new_module = async (user, action: action, reaction: reaction) => {
    const autologin: string = action.params.token;
    const login: string = await getEmailFromToken(autologin)

    const modules: Imod[] = await getModules(autologin, login)
    const l_mod: Imod = modules[modules.length - 1]

    if (user.data.intra[dict[action.name]] !== undefined) {
        let event_id = parseInt(l_mod.instance_id)
        if (event_id > user.data.intra[dict[action.name]]) {
            handleReactions(user, reaction, {"message": `${login} just subscribed to ${l_mod.title}`})
        }
    }
    user.data.intra[dict[action.name]] = parseInt(l_mod.instance_id)
    await user.save()
}

/**
 * Verify if the user has unsubscribed to a module
 * @param user The user
 * @param action The action
 * @param reaction The reaction to do
 */
const rm_module = async (user, action: action, reaction: reaction) => {
    const autologin: string = action.params.token;
    const login: string = await getEmailFromToken(autologin)

    const modules: Imod[] = await getModules(autologin, login)
    const l_mod: Imod = modules[modules.length - 1]

    if (user.data.intra[dict[action.name]] !== undefined) {
        let event_id = parseInt(l_mod.instance_id)
        if (event_id < user.data.intra[dict[action.name]]) {
            handleReactions(user, reaction, {"message": `${login} just unsubscribed to ${l_mod.title}`})
        }
    }
    user.data.intra[dict[action.name]] = parseInt(l_mod.instance_id)
    await user.save()
}

/**
 * Verify if the user has reached a credit goal
 * @param user The user
 * @param action The action
 * @param reaction The reaction to do
 */
const reach_credit = async (user, action: action, reaction: reaction) => {
    const autologin: string = action.params.token;
    const profile: IntraProfile = await getProfileFromToken(autologin)
    const target: number = parseInt(action.params.target)

    if (user.data.intra[dict[action.name]] !== undefined && user.data.intra[dict[action.name]] < target) {
        let credits = profile.credits
        if (credits >= target) {
            handleReactions(user, reaction, {"message": `${profile.firstname} ${profile.lastname} reached an amount of ${profile.credits} credits !`})
        }
    }
    user.data.intra[dict[action.name]] = profile.credits
    await user.save()
}

/**
 * Verify if the user has reached a gpa goal
 * @param user The user
 * @param action The action
 * @param reaction The reaction to do
 */
const reach_gpa = async (user, action: action, reaction: reaction) => {
    const autologin: string = action.params.token;
    const profile: IntraProfile = await getProfileFromToken(autologin)
    const target: number = parseFloat(action.params.target)

    if (user.data.intra[dict[action.name]] !== undefined && user.data.intra[dict[action.name]] < target) {
        let gpa = parseFloat(profile.gpa[0].gpa)
        if (gpa >= target) {
            handleReactions(user, reaction, {"message": `${profile.firstname} ${profile.lastname} reached a GPA of ${profile.gpa[0].gpa} !`})
        }
    }
    user.data.intra[dict[action.name]] = parseFloat(profile.gpa[0].gpa)
    await user.save()
}

export {new_module, rm_module, new_grade, new_registration, reach_credit, reach_gpa}