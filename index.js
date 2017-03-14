const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const Entry = require('./models/entry')

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/entries', (req, res) => {
  new Entry().fetchAll()
    .then(function (entries) {
      res.send(entries.toJSON())
    }).catch(function (error) {
      console.log(error)
      res.send('An error occured')
    })
})

app.post('/entries', (req, res) => {
  var reading = req.body.reading
  new Entry({ reading: reading })
  .save().then((model) => {
    res.send({entry: model})
  }).catch(function (error) {
    console.log(error)
    res.send('An error occured')
  })
})

app.delete('/entries/:entryId', (req, res) => {
  var entryId = req.params.entryId
  new Entry({ id: entryId }).destroy().then(() => {
    res.send('Entry ' + entryId + ' deleted')
  }).catch(function (error) {
    console.log(error)
    res.send('An error occured')
  })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  next(err)
})

app.listen(3000, () => { console.log('Listening on port 3000') })
