const mongoose = require('mongoose')
const Schema = mongoose.Schema

// TODO:populate user 
const ArticleSchema = new mongoose.Schema({
    /* author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, */
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true
    },
    channel: {
        id: {
            type: Number,
        },
        name: {
            type: String,
        }
    },
    cover: {
        coverType: {
            type: Number,
            default: 0
        },
        coverImg: {
            type: []
        },
    },
    status: {
        type: Number,
        default: 0
    },
},
    { timestamps: true })

/* //USe { timestamps: true } Mongoose will add two properties of type Date to your schema:
createdAt: a date representing when this document was created
updatedAt: a date representing when this document was last updated */

module.exports = ArticleSchema