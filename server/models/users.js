import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: 'string',
        required: true,
    },
    password: {
        type: 'string',
        required: true,
    },
    firstName: {
        type: 'string',
    },
    LastName: {
        type: 'string',
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User