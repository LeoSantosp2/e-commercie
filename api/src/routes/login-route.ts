import loginController from '../controllers/login-controller';

export const loginRoute = async (method: string, body: string) => {
  if (method === 'POST') {
    return await loginController.store(JSON.parse(body));
  }

  return new Response();
};
