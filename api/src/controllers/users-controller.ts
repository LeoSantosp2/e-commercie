import isEmail from 'validator/lib/isEmail';
import { hashSync } from 'bcryptjs';
import { v4 } from 'uuid';

import knex from '../knex/config/database';

import { loginRequest } from '../middlewares/login-request';

import {
  type UsersStoreProps,
  type UsersUpdateProps,
} from '../types/users-props';

class UsersController {
  async index() {
    try {
      const users = await knex('users').select('*');

      return Response.json(users);
    } catch (err) {
      if (err instanceof Error) {
        return Response.json(err.message, { status: 400 });
      }

      return new Response();
    }
  }

  async show(slug: string) {
    try {
      const user = await knex('users')
        .select('first_name', 'last_name', 'email', 'token_id')
        .where('slug', '=', slug);

      if (user.length === 0) {
        return Response.json('Slug não existe.', { status: 400 });
      }

      return Response.json(user);
    } catch (err) {
      if (err instanceof Error) {
        return Response.json(err.message, { status: 400 });
      }

      return new Response();
    }
  }

  async store(body: UsersStoreProps) {
    try {
      const emailExists = await knex('users')
        .select('email')
        .where('email', '=', body.email);

      if (
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.password ||
        !body.confirm_password
      ) {
        return Response.json('Error: Os campos não podem estar vazios.', {
          status: 400,
        });
      }

      if (!isEmail(body.email)) {
        return Response.json('Error: E-mail inválido.', {
          status: 400,
        });
      }

      if (emailExists.length > 0) {
        return Response.json('Error: E-mail já cadastrado.', {
          status: 400,
        });
      }

      if (body.password.length < 8 || body.confirm_password.length < 8) {
        return Response.json('Error: Senha deve ter no mínimo 8 caracteres.', {
          status: 400,
        });
      }

      if (body.password !== body.confirm_password) {
        return Response.json('Error: As senhas não são iguais.', {
          status: 400,
        });
      }

      const newUser = {
        id: v4(),
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        password: hashSync(body.password, 8),
        slug:
          v4() +
          '-' +
          body.first_name.toLowerCase() +
          '-' +
          body.last_name.toLowerCase(),
      };

      await knex('users').insert(newUser);

      return Response.json('Usuário cadastrado com sucesso.');
    } catch (err) {
      if (err instanceof Error) {
        return Response.json(err.message, { status: 400 });
      }

      return new Response();
    }
  }

  async update(body: UsersUpdateProps, slug: string, token: string | null) {
    try {
      if ((await loginRequest(token)) !== true) {
        return Response.json(await loginRequest(token), { status: 401 });
      }

      const user = await knex('users')
        .select('first_name', 'last_name')
        .where('slug', '=', slug);

      if (user.length === 0) {
        return Response.json('Usuário não existe', { status: 400 });
      }

      if (
        user[0].first_name !== body.first_name &&
        user[0].last_name !== body.last_name
      ) {
        await knex('users')
          .update({ first_name: body.first_name, last_name: body.last_name })
          .where('slug', '=', slug);

        return Response.json('Nome e Sobrenome alterado com sucesso.');
      }

      if (user[0].first_name !== body.first_name) {
        await knex('users')
          .update({ first_name: body.first_name })
          .where('slug', '=', slug);

        return Response.json('Nome alterado com sucesso.');
      }

      if (user[0].last_name !== body.last_name) {
        await knex('users')
          .update({ last_name: body.last_name })
          .where('slug', '=', slug);

        return Response.json('Sobrenome alterado com sucesso.');
      }

      return Response.json('Não houve nenhuma alteração.');
    } catch (err) {
      if (err instanceof Error) {
        return Response.json(err.message, { status: 400 });
      }

      return new Response();
    }
  }

  async delete(slug: string | null) {
    try {
      if (!slug) {
        return Response.json('Slug não foi passado na url.', { status: 400 });
      }

      const user = await knex('users').select('slug').where('slug', '=', slug);

      if (user.length === 0) {
        return Response.json('Slug não existe.', { status: 400 });
      }

      await knex('users').delete().where('slug', '=', slug);

      return Response.json('Usuário excluido com sucesso.');
    } catch (err) {
      if (err instanceof Error) {
        return Response.json(err.message, { status: 400 });
      }

      return new Response();
    }
  }
}

export default new UsersController();
