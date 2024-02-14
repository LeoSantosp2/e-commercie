import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail';

import knex from '../knex/config/database';
import env from '../config/env.ts';

import { passwordIsValid } from '../utils/password-is-valid.ts';

import { type LoginProps } from '../types/login-props.ts';

class LoginController {
  async store(body: LoginProps) {
    try {
      if (!body.email || !body.password) {
        return Response.json('Os campos não podem estar vazios.', {
          status: 400,
        });
      }

      if (!isEmail(body.email)) {
        return Response.json('E-mail inválido.', { status: 400 });
      }

      const user = await knex('users')
        .select('id')
        .where('email', '=', body.email);

      if (user.length === 0) {
        return Response.json('Usuário não existe', { status: 400 });
      }

      if (!(await passwordIsValid(body.email, body.password))) {
        return Response.json('Senha inválida.', { status: 400 });
      }

      const { id } = user[0];
      const { email } = body;

      const token = jwt.sign({ id, email }, env.TOKEN_SECRET, {
        expiresIn: env.TOKEN_EXPIRATION,
      });

      await knex('users')
        .update({ token_id: token })
        .where('email', '=', email);

      return Response.json({
        message: 'Login efetuado com sucesso.',
        token: token,
      });
    } catch (err) {
      if (err instanceof Error) {
        return Response.json(err.message, { status: 400 });
      }

      return new Response();
    }
  }
}

export default new LoginController();
