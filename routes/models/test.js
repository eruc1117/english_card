const express = require('express')
const router = express.Router()
const testController = require('../../controller/test-controller')

router.get('/setting', testController.settingPage)
router.post('/setting', testController.setting)
router.get('/', testController.testPage)
router.post('/', testController.test)

module.exports = router