import { v4 } from 'uuid';

import knex from '../knex/config/database';

import { type ProductsProps } from '../types/products-props';

class ProductsController {
  async index() {
    try {
      const products = await knex('products').select('*');

      return Response.json(products);
    } catch (err) {
      if (err instanceof Error) {
        return Response.json(err.message, { status: 400 });
      }

      return new Response();
    }
  }

  async show(id: string) {
    try {
      const product = await knex('products').select('*').where('id', '=', id);

      return Response.json(product);
    } catch (err) {
      if (err instanceof Error) {
        return Response.json(err.message, { status: 400 });
      }

      return new Response();
    }
  }

  async showCategory(category: string) {
    try {
      const products = await knex('products')
        .select('*')
        .where('category', '=', category);

      return Response.json(products);
    } catch (err) {
      if (err instanceof Error) {
        return Response.json(err.message, { status: 400 });
      }

      return new Response();
    }
  }

  async store(body: ProductsProps[]) {
    try {
      body.forEach(async (product) => {
        const newProduct = {
          id: v4(),
          product_name: product.product_name,
          product_description: product.product_description,
          price: product.price,
          category: product.category,
          stock: product.stock,
        };

        await knex('products').insert(newProduct);
      });

      return Response.json('Produtos cadastrados com sucesso.');
    } catch (err) {
      if (err instanceof Error) {
        return Response.json(err.message, { status: 400 });
      }

      return new Response();
    }
  }

  async update(body: ProductsProps, id: string) {
    try {
      const product = await knex('products')
        .select('product_name', 'product_description', 'price', 'category')
        .where('id', '=', id);

      if (
        product[0].product_name !== body.product_name &&
        product[0].product_description !== body.product_description &&
        product[0].price !== body.price &&
        product[0].category !== body.category
      ) {
        await knex('products')
          .update({
            product_name: body.product_name,
            product_description: body.product_description,
            product_price: body.price,
            category: body.category,
          })
          .where('id', '=', id);

        return Response.json('Produto atualizado com sucesso.');
      }

      if (product[0].product_name !== body.product_name) {
        await knex('products')
          .update({
            product_name: body.product_name,
          })
          .where('id', '=', id);

        return Response.json('Nome do produto atualizado com sucesso.');
      }

      if (product[0].product_description !== body.product_description) {
        await knex('products')
          .update({
            product_description: body.product_description,
          })
          .where('id', '=', id);

        return Response.json('Descrição do produto atualizada com sucesso.');
      }

      if (product[0].price !== body.price) {
        await knex('products')
          .update({
            product_price: body.price,
          })
          .where('id', '=', id);

        return Response.json('Preço do produto atualizado com sucesso.');
      }

      if (product[0].category !== body.category) {
        await knex('products')
          .update({
            category: body.category,
          })
          .where('id', '=', id);

        return Response.json('Categoria do produto atualizado com sucesso.');
      }

      return Response.json('Nenhuma informação de produto foi atualizada.');
    } catch (err) {
      if (err instanceof Error) {
        return Response.json(err.message, { status: 400 });
      }

      return new Response();
    }
  }

  async delete(id: string) {
    try {
      const product = await knex('products')
        .select('product_name')
        .where('id', '=', id);

      if (product.length === 0) {
        return Response.json('Id informado é inválido.');
      }

      await knex('products').delete().where('id', '=', id);

      return Response.json('Produto excluido com sucesso.');
    } catch (err) {
      if (err instanceof Error) {
        return Response.json(err.message, { status: 400 });
      }

      return new Response();
    }
  }
}

export default new ProductsController();
