import axios from 'axios'
import handleReactions from '../../reaction/reaction'

const getEmailFromToken = (autologin: string) => {
    axios.get(`https://intra.epitech.eu/${autologin}/user/?format=json`)
        .then(res => {
            console.log(res.data.login)
            return res.data.login
        })
        .catch((error) => {
            console.error(error)
        })
    return ''
}

const getProfileFromToken = (autologin: string) => {
    axios.get(`https://intra.epitech.eu/${autologin}/user/?format=json`)
        .then(res => {
            console.log(res.data)
            return res.data
        })
        .catch((error) => {
            console.error(error)
        })
}

const getModules = (autologin: string, login: string) => {
    axios.get(`https://intra.epitech.eu/${autologin}/user/${login}/notification/message?format=json`)
        .then(res => {
            console.log(res.data)
            return res.data
        })
        .catch((error) => {
            console.error(error)
        })
}

const getMessages = (autologin: string, login: string) => {
    axios.get(`https://intra.epitech.eu/${autologin}/user/${login}/notification/message?format=json`)
        .then(res => {
            console.log(res.data)
            return res.data
        })
        .catch((error) => {
            console.error(error)
        })
}
    
const dict = {
    "new_grade": "last_grade",
    "new_registration": "last_register",
    "rm_module": "last_module",
    "new_module": "last_module",
}

const new_grade = (user, action, reaction) => {
    if (user.data.intra[dict[action.name]] !== undefined) {
        
    }
}

const new_module = (user, action, reaction) => {
    if (user.data.intra[dict[action.name]] !== undefined) {
        
    }
}

const rm_module = (user, action, reaction) => {
    if (user.data.intra[dict[action.name]] !== undefined) {
        
    }
}


const new_registration = (user, action, reaction) => {
    if (user.data.intra[dict[action.name]] !== undefined) {
        
    }
}

export {new_module, rm_module, new_grade, new_registration}