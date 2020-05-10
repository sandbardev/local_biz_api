
exports.up = function(knex) {
  return knex.schema.createTable('businesses', (table) => {
    table.increments('id').unique()
    table.string('business_name').notNullable
    table.string('phone')
    table.string('social')
    table.string('cep').notNullable
    table.string('state').notNullable
    table.string('city').notNullable
    table.string('street').notNullable
    table.string('number')

    table.string('owner_email').notNullable
    table.foreign('owner_email').references('email').inTable('users')
  })  
};

exports.down = function(knex) {
  return knex.schema.dropTable('businesses')
};
