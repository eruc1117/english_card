const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = process.env.MONGODB_URI
const client = new MongoClient(MONGODB_URI);
const dbName = 'english_card';
const PORT = process.env.PORT
const customize = require('../function/constructor')
const db = client.db(dbName)
const Word = require('../models/WordModel')
//根據頁面生成對應的CSS路徑
const testSettingCss = new customize.PageCss('testSetting', PORT)
const testCss = new customize.PageCss('test', PORT)
const testEndCss = new customize.PageCss('testEnd', PORT)

const testController = {
  settingPage: (req, res) => {
    res.render('test/setting', {
      cssStyle: testSettingCss.css
    })
  },
  testPage: async (req, res) => {
    try {
      const userId = req.user.id
      const testNum = Number(req.body.number)
      await client.connect();
      const totalTestWord = await db.collection('records')
        .aggregate(
          [{ "$match": { userId } },
          { $sample: { size: testNum } }]
        ).toArray()
      const examId = []
      for (let index = 0; index < totalTestWord.length; index++) {
        const word = totalTestWord[index]
        const testSentence = word.sentence.replace(new RegExp(word.word, 'gi'), '____')
        word.sentence = testSentence
        word.examNum = index + 1
        examId.push(word.id)
      }
      res.render('test/test', {
        examination: totalTestWord, cssStyle: testCss.css, examId: JSON.stringify(examId)
      })
    } catch (err) {
      console.log(err)
    }
  },
  test: async (req, res) => {
    try {
      const userId = req.user.id
      const examNum = JSON.parse(req.body.examId)
      const ans = req.body.ans
      const correctAns = []
      const totalWord = await db.collection('records').find({
        id: {
          $in:
            examNum
        }
      }, {
        userId
      })
        .project({
          'id': 1,
          'word': 1,
          'correctTimes': 1
        })
        .toArray()
      for (let num = 0; num < examNum.length; num++) {
        for (let index = 0; index < totalWord.length; index++) {
          if (examNum[num] === Number(totalWord[index].id)) {
            correctAns.push(totalWord[index])
          }
        }
      }
      const ansList = []
      if ((typeof (ans) === 'string')) {
        ansList.push(ans)
      } else {
        for (let index = 0; index < ans.length; index++) {
          ansList.push(ans[index])
        }
      }
      for (let num = 0; num < correctAns.length; num++) {
        if (correctAns[num].word === ansList[num]) {
          correctAns[num].correctTimes < 5 ?
            correctAns[num].correctTimes += 1 :
            correctAns[num].correctTimes = 5
          correctAns[num].correct = true
        } else {
          correctAns[num].correctTimes !== 0 ?
            correctAns[num].correctTimes -= 1 :
            correctAns[num].correctTimes = 0
          correctAns[num].correct = false
        }
      }
      for await (const word of correctAns) {
        db.collection('records').updateMany({
          _id: word._id
        }, {
          $set: {
            correctTimes: word.correctTimes
          }
        })
      }
      res.render('test/testEnd', { end: correctAns, cssStyle: testEndCss.css })
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = testController
