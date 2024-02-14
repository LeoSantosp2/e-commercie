import usersController from '../controllers/users-controller';

export const usersRoute = async (
  method: string,
  body: string,
  slug: string | null,
  token: string | null,
) => {
  if (method === 'GET' && !slug) {
    return await usersController.index();
  }

  if (method === 'GET' && slug) {
    return await usersController.show(slug);
  }

  if (method === 'POST') {
    return await usersController.store(JSON.parse(body));
  }

  if (method === 'PUT' && slug) {
    return await usersController.update(JSON.parse(body), slug, token);
  }

  if (method === 'DELETE') {
    return await usersController.delete(slug);
  }

  return Response.json('');
};
