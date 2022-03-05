import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const emailValidation = (email: string) => {
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
}

const uToken = {
    service: String,
    token: String,
}

export const action = {
    service: String,
    name: String,
    params: {},
}

export type action = {
    service: string,
    name: string,
    params: any,
}

export type reaction = {
    service: string,
    name: string,
    params: any,
}

export type uEvent = {
    name: string,
    action: action,
    reaction: reaction,
}

export type Iuser = {
    email: string,
    password: string,
    firstName: string,
    data: {
        intra: {
            last_grade: number,
            last_register: number,
            last_module: number,
        }
    },
    lastName: string,
    token: string,
    oauth: string,
    events: uEvent[]
}

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        validate: [emailValidation, 'invalidEmail']
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
    },
    data: {
        intra: {
            last_grade: Number,
            last_register: Number,
            last_module: Number,
            last_credit: Number,
            last_gpa: Number
        }
    },
    lastName: {
        type: String,
    },
    token: {
        type: String,
    },
    github: {
        type: String,
    },
    office: {
        type: String,
    },
    services: {
        type: Array,
    },
    events: {
        type: Array<uEvent>(),
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User