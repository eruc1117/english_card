const express = require('express')
const router = express.Router()
const passport = require('passport')

const loginRegisterController = require('../../controller/loginRegister-controller')

router.get('/login', loginRegisterController.loginPage)
router.post('/login', passport.authenticate('local', {
  successRedirect: '/word/list',
  failureRedirect: '/',
  failureMessage: true
}))
router.get('/logout', loginRegisterController.logout)
router.get('/register', loginRegisterController.registerPage)
router.post('/register', loginRegisterController.register)


module.exports = router