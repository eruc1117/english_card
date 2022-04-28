const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = 'mongodb://localhost:27017'
const client = new MongoClient(MONGODB_URI);
const dbName = 'english-card';
const PORT = 3000
const customize = require('../function/constructor')
const db = client.db(dbName)
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
    res.cookie('examId', examId, { maxAge: 90000, signed: true })
    res.render('test/test', {
      examination: totalTestWord, cssStyle: testCss.css
    })
  },
  test: async (req, res) => {
    const userId = req.user.id
    const examNum = (req.signedCookies.examId)
    const ans = Object.values(req.body)
    await client.connect();
    const totalWord = await db.collection('records').find(
      { userId },
      { id: { $in: examNum } })
      .project({
        'id': 1,
        'word': 1,
        'correctTimes': 1
      })
      .toArray()
    const correctAns = []
    for (let num = 0; num < examNum.length; num++) {
      for (let index = 0; index < totalWord.length; index++) {
        if (examNum[num] === Number(totalWord[index].id)) {
          correctAns.push(totalWord[index])
        }
      }
    }

    for (let num = 0; num < ans.length; num++) {
      if (correctAns[num].word === ans[num]) {
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
  }
}

module.exports = testController
