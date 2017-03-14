const dbConfig = require('./knexfile')[process.env.NODE_ENV || 'development']
const knex = require('knex')(dbConfig)
const Bookshelf = require('bookshelf')(knex)

Bookshelf.plugin('registry')

module.exports = Bookshelf
