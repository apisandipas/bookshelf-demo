
exports.up = function (knex, Promise) {
  return knex.schema.createTable('entries', function (table) {
    table.increments('id').primary()
    table.string('reading')
    table.timestamp('updated_at')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('entries')
}
