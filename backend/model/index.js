
const mongoose = require('mongoose')
const { dbUrl } = require("../config/config.default")

mongoose.connect(dbUrl)

//Organizational export model class
module.exports = {
    User: mongoose.model('User', require('./user')),
    Article: mongoose.model('Article', require('./article')),
    Photo: mongoose.model('Photo', require('./photo'))
}