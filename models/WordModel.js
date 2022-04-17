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
  partOfSpeech: {
    type: String,
    required: true
  },
  enExplain: {
    type: String,
    required: true
  },
  explain: {
    type: String,
    required: true
  },
  sentence: {
    type: String,
    required: true
  },
  correctTimes: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  userId: {  // 加入關聯設定
    type: Number,
    //required: true,開發終暫時不用

    ref: 'User'
  }
})

module.exports = mongoose.model('Record', RecordSchema)