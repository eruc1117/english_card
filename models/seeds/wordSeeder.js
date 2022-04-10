const db = require('../../config/mongoose')
const Word = require('../WordModel')


db.once('open', () => {
  Word.create({
    id: 2,
    word: 'example',
    partOfSpeech: 'n.',
    enExplain: 'something that is typical of the group of things that it is a member of',
    explain: '範例',
    sentence: 'This painting is a marvellous example of her work.',
    correctTimes: 0,
    mistakeTimes: 0,
  }).then(() => {
    console.log('Word Seeder done!')
    process.exit()
  })
})