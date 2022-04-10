const express = require('express')
const router = express.Router()

const enCrud = require('./models/enCardController')
const login = require('./models/login')
const register = require('./models/register')
const testSetting = require('./models/testSetting')
const test = require('./models/test')
const home = require('./models/home')
const enWordList = require('./models/wordList')

router.use('/', home)
router.use('/enCrud', enCrud)
router.use('/login', login)
router.use('/register', register)
router.use('/testSetting', testSetting)
router.use('/test', test)
router.use('./enWordList', enWordList)


module.exports = router