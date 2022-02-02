import mongoose from 'mongoose'
import 'mongoose-type-email'
const Schema = mongoose.Schema;

const emailValidation = (email) => {
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
}

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        validate: [emailValidation, 'invalidEmail']
    },
    username: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User