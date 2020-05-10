
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.string('id').unique().notNullable
    table.string('name').notNullable
    table.string('surname').notNullable
    table.string('email').unique().notNullable
    table.string('password').notNullable
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')  
};
