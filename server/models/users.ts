import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const emailValidation = (email) => {
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
}

const randomCodeGenerator = (length :number) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const uToken = {
    service: String,
    token: String,
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
    data: {
        firstname: {
            type: String,
        },
        lastname: {
            type: String,
        }
    },
    certification: {
        accessToken: {
            type: String,
            required: true,
            default: randomCodeGenerator(16)
        },
        oauth: {
            type: Array<typeof uToken>(),
        }
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User