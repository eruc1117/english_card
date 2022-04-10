const express = require('express')
const router = express.Router()
const PORT = 3000

const customize = require('../../function/constructor')
const home = new customize.PageCss('home', PORT)

router.get('/', (req, res) => {
  res.render('home', { cssStyle: home.css })
})

module.exports = router