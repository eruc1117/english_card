const express = require('express')
const router = express.Router()

const Word = require('../../models/WordModel')

router.get('/', (req, res) => {
  async function displayAllWords() {
    const wordList = await Word.find().lean()
    wordList.forEach(word => {
      word.correctTimes !== 5 ?
        word.remember = `` :
        word.remember = `<i class="fa-solid fa-crown"></i>`
    })
    console.log(wordList)
    res.render('index', { wordList })
  }
  displayAllWords()
})

module.exports = router