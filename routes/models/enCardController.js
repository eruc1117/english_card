const express = require('express')
const router = express.Router()
const Word = require('../../models/WordModel')
const PORT = 3000

const customize = require('../../function/constructor')
const createWordCss = new customize.PageCss('createWord', PORT)

router.get('/new', (req, res) => {
  res.render('createWord', { cssStyle: createWordCss.css })
})

router.post('/new', (req, res) => {
  async function createWord(req) {
    const word = req.body
    const latestItem = await Word.find().sort({ _id: -1 }).limit(1).lean()
    word.id = Number(latestItem[0].id) + 1
    await Word.create(word)
    res.redirect('/enWordList')
  }
  createWord(req)
})

module.exports = router