const express = require('express')
const router = express.Router()
const PORT = 3000

const customize = require('../../function/constructor')
const wordListCss = new customize.PageCss('wordList', PORT)


const Word = require('../../models/WordModel')


router.get('/', (req, res) => {
  async function displayAllWords() {
    const wordList = await Word.find().lean()
    wordList.forEach(word => {
      word.correctTimes !== 5 ?
        word.remember = `` :
        word.remember = `<i class="fa-solid fa-crown"></i>`
    })
    res.render('index', {
      cssStyle: wordListCss.css,
      wordList
    })
  }
  displayAllWords()
})

module.exports = router