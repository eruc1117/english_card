const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = new schema({
  id: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  password: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('User', userSchema)