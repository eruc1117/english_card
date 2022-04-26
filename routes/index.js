const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth')

// 路由載入
const words = require('./models/words')
const home = require('./models/home')
const loginRegister = require('./models/loginRegister ')
const test = require('./models/test')

router.use('/word', authenticator, words)
router.use('/loginRegister', loginRegister)
router.use('/test', authenticator, test)
router.use('/', home)

module.exports = router