const express = require('express')
const router = express.Router()
const Word = require('../../models/WordModel')
const PORT = 3000

const customize = require('../../function/constructor')
const page = new customize.PageCss('createWord', PORT)
const detail = new customize.PageCss('detail', PORT)

//新增單字功能
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

//修改單字功能
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

//讀取單字功能
router.get('/read/:id', (req, res) => {
  async function readWord(req) {
    const id = req.params.id
    const word = await Word.findOne({ id }).lean()
    res.render('detail', { word, cssStyle: detail.css })
  }
  readWord(req)
})
module.exports = router