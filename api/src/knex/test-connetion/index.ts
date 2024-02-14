import knex from '../config/database';

knex('users')
  .then((users) => {
    console.log(users);
  })
  .catch((err) => console.log(err.message))
  .finally(() => {
    knex.destroy();
  });
