const express = require('express')
const router = express.Router()
const wordController = require('../../controller/word-controller')

router.get('/list', wordController.getWords)
router.post('/search', wordController.search)
router.get('/previousWord/:id', wordController.previousWord)
router.post('/edit/:id', wordController.editWord)
router.get('/editWord/:id', wordController.editWordPage)
router.get('/nextWord/:id', wordController.nextWord)
router.get('/newWord', wordController.newWordPage)
router.post('/create', wordController.createWord)
router.delete('/delete/:id', wordController.deleteWord)
router.get('/:id', wordController.getWord)


module.exports = router