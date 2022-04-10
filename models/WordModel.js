const mongoose = require('mongoose')
const schema = mongoose.Schema

const RecordSchema = new schema({
  id: {
    type: Number,
    required: true
  },
  word: {
    type: String,
    required: true
  },
  correctTimes: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  mistakeTimes: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  userId: {  // 加入關聯設定
    type: Number,
    required: true,
    ref: 'User'
  }
})

module.exports = mongoose.model('Record', RecordSchema)