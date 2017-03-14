const express = require('express')
const Entry = require('./models/entry')

var router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello World')
})

router.get('/entries', (req, res) => {
  new Entry().fetchAll()
    .then((entries) => {
      res.json({
        error: false,
        data: { entries: entries }
      })
    }).catch((error) => {
      console.log(error)
      res.send('An error occured')
    })
})

router.post('/entries', (req, res) => {
  var reading = req.body.reading
  Entry.forge({ reading: reading })
    .save()
    .then((entry) => {
      res.json({
        error: false,
        data: { entry: entry }
      })
    }).catch((error) => {
      console.log(error)
      res.send('An error occured')
    })
})

router.put('/entries/:entryId', (req, res) => {
  Entry.forge({ id: req.params.entryId })
    .fetch({require: true})
    .then((entry) => {
      entry.save({
        reading: req.body.reading || entry.get('reading')
      })
      .then((saved) => {
        res.json({
          error: false,
          data: { message: 'Entry details updated', entry: saved }
        })
      })
      .catch((err) => {
        res.status(500).json({
          error: true,
          data: { message: err.message }
        })
      })
    }).catch((err) => {
      res.status(500).json({
        error: true,
        data: { message: err.message }
      })
    })
})

router.delete('/entries/:entryId', (req, res) => {
  var entryId = req.params.entryId
  Entry
    .where({ id: entryId })
    .destroy().then(() => {
      res.json({
        error: false,
        data: { message: 'Entry details updated' }
      })
    }).catch((err) => {
      res.status(500).json({
        error: true,
        data: { message: err.message }
      })
    })
})

module.exports = router

