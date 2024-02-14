import { v4 } from 'uuid';

import knex from '../knex/config/database';

import { type CuponsProps } from '../types/cupons-props';

class CuponsController {
  async index() {
    try {
      const cupons = await knex('cupons').select('*');

      return Response.json(cupons);
    } catch (err) {
      if (err instanceof Error) {
        return Response.json(err.message, { status: 400 });
      }

      return new Response();
    }
  }

  async store(body: CuponsProps) {
    try {
      if (!body.cupom_name || !body.cupom_value) {
        return Response.json('Os campos não podem estar vazios.', {
          status: 400,
        });
      }

      const newCupom = {
        id: v4(),
        cupom_name: body.cupom_name.toUpperCase(),
        cupom_value: body.cupom_value,
      };

      await knex('cupons').insert(newCupom);

      return Response.json('Cupom adicionado com sucesso.');
    } catch (err) {
      if (err instanceof Error) {
        return Response.json(err.message, { status: 400 });
      }

      return new Response();
    }
  }

  async update(idCupom: string, body: CuponsProps) {
    try {
      if (!body.cupom_name || !body.cupom_value) {
        return Response.json('Os campos não podem estar vazios.', {
          status: 400,
        });
      }

      const cupom = await knex('cupons')
        .select('cupom_name', 'cupom_value')
        .where('id', '=', idCupom);

      if (cupom.length === 0) {
        return Response.json('Cupom não existe.', {
          status: 400,
        });
      }

      if (
        body.cupom_name !== cupom[0].cupom_name &&
        body.cupom_value !== cupom[0].cupom_value
      ) {
        await knex('cupons')
          .update({
            cupom_name: body.cupom_name,
            cupom_value: body.cupom_value,
          })
          .where('id', '=', idCupom);

        return Response.json('Cupom alterado com sucesso.');
      }

      if (body.cupom_name !== cupom[0].cupom_name) {
        await knex('cupons')
          .update({ cupom_name: body.cupom_name })
          .where('id', '=', idCupom);

        return Response.json('Nome do cupom alterado com sucesso.');
      }

      if (body.cupom_value !== cupom[0].cupom_value) {
        await knex('cupons')
          .update({ cupom_value: body.cupom_value })
          .where('id', '=', idCupom);

        return Response.json('Valor do cupom alterado com sucesso.');
      }

      return Response.json('Nenhum alteração foi efetuada.');
    } catch (err) {
      if (err instanceof Error) {
        return Response.json(err.message, { status: 400 });
      }

      return new Response();
    }
  }

  async delete(idCupom: string) {
    try {
      const cupom = await knex('cupons')
        .select('cupom_name', 'cupom_value')
        .where('id', '=', idCupom);

      if (cupom.length === 0) {
        return Response.json('Cupom não existe.', {
          status: 400,
        });
      }

      await knex('cupons').delete().where('id', '=', idCupom);

      return Response.json('Cupom excluido com sucesso.');
    } catch (err) {
      if (err instanceof Error) {
        return Response.json(err.message, { status: 400 });
      }

      return new Response();
    }
  }
}

export default new CuponsController();
