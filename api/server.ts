import { productsRoute } from './src/routes/products-route';
import { usersRoute } from './src/routes/users-route';
import { cuponsRoute } from './src/routes/cupons-route';
import { loginRoute } from './src/routes/login-route';

const corsHeaders = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
};

const allowedOrigins = ['http://localhost:3000'];

Bun.serve({
  port: 3006,
  async fetch(req) {
    const origin = req.headers.get('origin');

    const headers = new Headers(corsHeaders);
    if (origin && allowedOrigins.includes(origin)) {
      headers.set('Access-Control-Allow-Origin', origin);
    }

    if (req.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers,
      });
    }

    const url = new URL(req.url);

    const body = await req.text();

    const slug = url.searchParams.get('slug');
    const id = url.searchParams.get('id');
    const category = url.searchParams.get('category');
    const idCupom = url.searchParams.get('id-cupom');

    const token = req.headers.get('authorization');

    if (url.pathname === '/users' || slug) {
      return await usersRoute(req.method, body, slug, token);
    }

    if (url.pathname === '/products' || id || category) {
      return await productsRoute(req.method, body, id, category);
    }

    if (url.pathname === '/cupons' || idCupom) {
      return await cuponsRoute(req.method, body, idCupom);
    }

    if (url.pathname === '/login') {
      return await loginRoute(req.method, body);
    }

    return new Response('404', { status: 404 });
  },
});

console.log('Servidor ativado');
