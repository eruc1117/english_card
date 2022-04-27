const express = require('express')
const router = express.Router()
const testController = require('../../controller/test-controller')

router.get('/setting', testController.settingPage)
router.post('/setting', testController.setting)
router.post('/', testController.test)
router.get('', testController.testPage)

module.exports = router