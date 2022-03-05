import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const emailValidation = (email) => {
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

export const reaction = {
    service: String,
    name: String,
    params: {},
}

export const uEvent = {
    name: String,
    action: action,
    reaction: reaction,
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
        type: Object,
    },
    events: {
        type: Array<typeof uEvent>(),
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User