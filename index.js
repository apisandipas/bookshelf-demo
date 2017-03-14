const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const router = require('./router')

const app = express()
const PORT = process.env.NODE_ENV || 3000

app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/v1/', router)

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  next(err)
})

app.listen(PORT, () => { console.log('Listening on port %d', PORT) })
