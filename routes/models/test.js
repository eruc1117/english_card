const express = require('express');
const { render } = require('express/lib/response');
const router = express.Router()
const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = 'mongodb://localhost:27017'
const client = new MongoClient(MONGODB_URI);
const dbName = 'english-card';
const Word = require('../../models/WordModel')

router.get('/:num', (req, res) => {
  async function wordExam(req) {
    const testnum = req.params.num
    const testCookie = req.cookie
    console.log(testCookie)
    await client.connect();
    const db = client.db(dbName)
    const totalTestWord = await db.collection('records')
      .aggregate(
        [{ $sample: { size: 2 } }]
      ).toArray()
    console.log(totalTestWord)
  }
  wordExam(req)
  res.render('test')
})

module.exports = router