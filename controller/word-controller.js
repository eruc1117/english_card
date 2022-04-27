const Word = require('../models/WordModel')
const PORT = 3000
//載入自定義CSS物件
const customize = require('../function/constructor')
//根據頁面生成對應的CSS路徑
const wordListCss = new customize.PageCss('wordList', PORT)
const page = new customize.PageCss('createWord', PORT)
const detail = new customize.PageCss('detail', PORT)
//wordController總體
const wordController = {
  //載入該使用者所有的單字
  getWords: async (req, res, next) => {
    try {
      const userId = req.user.id
      const wordList = await Word.find({
        userId
      }).lean()
      wordList.forEach(word => {
        word.correctTimes !== 5 ?
          word.remember = `` :
          word.remember = `<i class="fa-solid fa-crown"></i>`
      })
      res.render('words/index', {
        cssStyle: wordListCss.css,
        wordList
      })
    } catch (err) {
      (err) => {
        next(err)
      }
    }
  },
  // 讀取單字詳細資料
  getWord: async (req, res) => {
    const id = req.params.id
    const word = await Word.findOne({
      id,
      userId: req.user.id
    }).lean()
    res.render('words/detail', { word, cssStyle: detail.css })
  },
  //單字詳細畫面中直接跳到前一個
  previousWord: async (req, res) => {
    const id = Number(req.params.id)
    const preWord = await Word.find({ id: { $lt: id } }).sort({ id: -1 }).limit(1).lean()
    //不同使用者情況下id不一定能作為參考，改以物件存在與否
    if ((id - 1) === 0) {
      return res.redirect(`/enCrud/read/${id}`)
    }
    res.redirect(`/enCrud/read/${preWord[0].id}`)
  },
  //單字詳細畫面中直接跳到下一個
  nextWord: async (req, res) => {
    const id = Number(req.params.id)
    const nextWordList = await Word.find({ id: { $gt: id } }).sort({ id: 1 }).limit(1).lean()
    if (nextWordList.length === 0) {
      return res.redirect(`/enCrud/read/${id}`)
    }
    res.redirect(`/enCrud/read/${nextWordList[0].id}`)
  },
  //新增單字功能
  newWordPage: (req, res) => {
    res.render('words/createWord', { cssStyle: page.css })
  },
  createWord: async (req, res) => {
    const word = req.body
    const latestItem = await Word.find().sort({ _id: -1 }).limit(1).lean()
    if (latestItem.length === 0) {
      word.id = 1
    } else {
      word.id = Number(latestItem[0].id) + 1
    }
    word.userId = req.user.id
    await Word.create(word)
    res.redirect('/word/list')
  },
  editWordPage: async (req, res) => {
    const id = req.params.id
    const word = await Word.findOne({ id }).lean()
    res.render('words/editWord', { word, cssStyle: page.css })
  },
  editWord: async (req, res) => {
    const word = req.body
    const id = req.params.id
    await Word.findOneAndUpdate({ id }, word)
    res.redirect('/word/list')
  },
  deleteWord: async (req, res) => {
    const id = Number(req.params.id)
    await Word.findOneAndDelete({ id })
    res.redirect('/word/list')
  }
}

module.exports = wordController 