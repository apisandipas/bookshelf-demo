const db = require('../orm')

const Entry = db.Model.extend({
  tableName: 'entries'
})

module.exports = Entry
