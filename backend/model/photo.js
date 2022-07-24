const mongoose = require('mongoose')

// TODO:populate user 
const PhotoSchema = new mongoose.Schema({
  path: {
    type: String
  },
  name: {
    type: String
  }
})

/* //USe { timestamps: true } Mongoose will add two properties of type Date to your schema:
createdAt: a date representing when this document was created
updatedAt: a date representing when this document was last updated */

module.exports = PhotoSchema