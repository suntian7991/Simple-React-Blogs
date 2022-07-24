const mongoose = require('mongoose')
const md5 = require("../util/md5")

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        set: value => md5(value),
        //The returned message does not contain the password
        select: false,
    },
    profile: {
        nickname: {
            type: String,
            default: null
        },
        gender: {
            type: String,
            default: null
        },
        birthday: {
            type: Date,
            default: null
        },
        bio: {
            type: String,
            default: null
        },
        image: {
            type: [],
            default: null
        }
    }
},
    { timestamps: true })


module.exports = UserSchema


