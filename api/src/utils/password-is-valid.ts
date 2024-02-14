import { compareSync } from 'bcryptjs';

import knex from '../knex/config/database';

export const passwordIsValid = async (email: string, password: string) => {
  const user = await knex('users')
    .select('password')
    .where('email', '=', email);

  return compareSync(password, user[0].password);
};
