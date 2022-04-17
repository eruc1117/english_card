const express = require('express')
const router = express.Router()
const passport = require('passport')
const PORT = 3000

const customize = require('../../function/constructor')
const loginCss = new customize.PageCss('login', PORT)

router.get('/', (req, res) => {
  res.render('login', { cssStyle: loginCss.css })
})

router.post('/', passport.authenticate('local', {
  successRedirect: '/enWordList',
  failureRedirect: '/login',
  failureMessage: true
}))
module.exports = router