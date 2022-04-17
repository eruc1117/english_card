const express = require('express')
const router = express.Router()
const PORT = 3000
const bcrypt = require('bcryptjs')
const User = require('../../models/UserModel')

const customize = require('../../function/constructor')
const registerCss = new customize.PageCss('register', PORT)

router.get('/', (req, res) => {
  res.render('register', { cssStyle: registerCss.css})
})

router.post('/', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  if (password !== confirmPassword) {
    return res.redirect('/user/rigster')
  }
  async function rigster(name, email, password) {
    const userInfo = await User.findOne({ email })
    const lastId = await User.find()
    let newUser = { name, email }
    if (userInfo) {
      const errorMsg = `這個 Email 已經註冊過了。`
      return res.render('rigster', { userInfo: newUser, error_msg: errorMsg, cssStyle: style.css })
    }
    if (!userInfo && !lastId[lastId.length - 1]) {//[lastId.length - 1]，在node v16後可以用 .at(-1)替代 
      newUser.id = 1
    } else {
      newUser.id = Number(lastId[lastId.length - 1].id) + 1
    }
    const salt = await bcrypt.genSalt(10)
    newUser.password = await bcrypt.hash(password, salt)
    newUser.name = name
    await User.create(newUser)
    return res.redirect('/')
  }
  rigster(name, email, password)
})

module.exports = router