const express = require('express')
const router = express.Router()

router.get('/', () => {
  res.render('login')
})

module.exports = router