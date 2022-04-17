const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth')

const enCrud = require('./models/enCardController')
const login = require('./models/login')
const register = require('./models/register')
const logout = require('./models/logout')
const testSetting = require('./models/testSetting')
const test = require('./models/test')
const home = require('./models/home')
const enWordList = require('./models/wordList')

router.use('/login', login)
router.use('/logout', logout)
router.use('/register', register)
router.use('/enWordList', authenticator, enWordList)
router.use('/enCrud', authenticator, enCrud)
router.use('/testSetting', authenticator, testSetting)
router.use('/test', authenticator, test)
router.use('/', home)


module.exports = router