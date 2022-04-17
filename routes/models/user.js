const express = require('express')
const router = express.Router()
const User = require('../../models/UserModel')
const PORT = 3000

const customize = require('../../function/constructor')
const userCss = new customize.PageCss('user', PORT)
const checkCss = new customize.PageCss('check', PORT)

router.get('/', (req, res) => {
  async function userInfoDisplay(req) {
    const userId = req.user.id
    console.log(userId)
    const userInfo = await User.findOne({ id: userId }).lean()
    res.render('user', {
      cssStyle: userCss.css,
      userInfo
    })
  }
  userInfoDisplay(req)
})

router.get('/captcha', (req, res) => {
  res.render('captcha', {cssStyle: checkCss.css})
})

module.exports = router