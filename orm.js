const dbConfig = require('./config/db.json')
const knex = require('knex')(dbConfig)

module.exports = require('bookshelf')(knex)
