const express = require('express')
const router = express.Router()

router.get('/enCrud', () => {
  res.render('index')
})

module.exports = router