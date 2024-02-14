import knex from '../knex/config/database';

export const loginRequest = async (token: string | null) => {
  if (!token) {
    return 'Necessário efetuar login.';
  }

  try {
    const user = await knex('users')
      .select('token_id')
      .where('token_id', '=', token);

    if (user.length === 0) {
      return 'Usuário inválido.';
    }

    return true;
  } catch (err) {
    return 'Token expirado ou inválido.';
  }
};
