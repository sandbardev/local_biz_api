
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: '1',
          name: 'name1',
          surname: 'surname1',
          email: 'email1@email.com',
          password: 'unencrypted1'
        },
        {
          id: '2',
          name: 'name2',
          surname: 'surname2',
          email: 'email2@email.com',
          password: 'unencrypted2'
        },
        {
          id: '3',
          name: 'name3',
          surname: 'surname3',
          email: 'email3@email.com',
          password: 'unencrypted3'
        },
      ]);
    });
};
