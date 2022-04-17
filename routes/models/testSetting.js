const express = require('express')
const router = express.Router()
const customize = require('../../function/constructor')
const PORT = 3000
const cookieParser = require('cookie-parser')
router.use(cookieParser())

const testSettingCss = new customize.PageCss('testSetting', PORT)

router.get('/', (req, res) => {
  res.render('testSetting', {
    cssStyle: testSettingCss.css
  })
})

router.post('/start', (req, res) => {
  const testWordNum = req.body.number
  res.cookie('test', testWordNum, { maxAge: 90000, signed: true })
  res.cookie('numbering', 1)
  res.redirect('/test/1')
})

module.exports = router