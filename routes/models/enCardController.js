const express = require('express')
const router = express.Router()
const Word = require('../../models/WordModel')
const PORT = 3000

const customize = require('../../function/constructor')
const page = new customize.PageCss('createWord', PORT)

router.get('/new', (req, res) => {
  res.render('createWord', { cssStyle: page.css })
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

router.get('/edit/:id', (req, res) => {
  async function editWordPage(req) {
    const id = req.params.id
    const word = await Word.findOne({ id }).lean()
    res.render('editWord', { word, cssStyle: page.css })
  }
  editWordPage(req)
})

router.post('/edit/:id', (req, res) => {
  async function editWord(req) {
    const word = req.body
    const id = req.params.id
    await Word.findOneAndUpdate({ id }, word)
    res.redirect('/enWordList')
  }
  editWord(req)
})

module.exports = router