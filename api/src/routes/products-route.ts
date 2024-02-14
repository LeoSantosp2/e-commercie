import productsController from '../controllers/products-controller';

export const productsRoute = async (
  method: string,
  body: string,
  id: string | null,
  category: string | null,
) => {
  if (method === 'GET' && !id && !category) {
    return await productsController.index();
  }

  if (method === 'GET' && id) {
    return await productsController.show(id);
  }

  if (method === 'GET' && category) {
    return await productsController.showCategory(category);
  }

  if (method === 'POST') {
    return await productsController.store(JSON.parse(body));
  }

  if (method === 'PUT' && id) {
    return await productsController.update(JSON.parse(body), id);
  }

  if (method === 'DELETE' && id) {
    return await productsController.delete(id);
  }

  return new Response('');
};
