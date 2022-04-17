const db = require('../../config/mongoose')
const Word = require('../WordModel')
const User = require('../UserModel')
const bcrypt = require('bcryptjs')
const wordListJson = require('./seedJson/seedWord.json')
const userJson = require('./seedJson/seedUser.json')


db.once('open', () => {
  try {
    createUser(userJson).then(
      () => {
        return createWord(userJson, wordListJson)
      }
    ).then(() => {
      process.exit()
    })
  } catch (err) {
    console.log(err)
  }
})


process.exit

process.on('exit', () => {
  console.log('Seeder done!')
})

async function createUser(user) {
  const totalUser = await User.find().lean()
  if (!totalUser[totalUser.length - 1]) {//[lastId.length - 1]，在node v16後可以用 .at(-1)替代 
    user.id = 1
  } else {
    user.id = Number(totalUser[totalUser.length - 1].id) + 1
  }
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(user.password, salt)
  user['password'] = hash
  await User.create(user)
}

async function createWord(user, wordList) {
  const userInfo = await User.findOne({ email: user.email })
  wordList.forEach(element => {
    element.userId = userInfo.id
  })
  await Word.create(wordList)
}
