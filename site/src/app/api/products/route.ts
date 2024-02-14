import { type NextRequest } from 'next/server';

import axios from '../../../services/axios';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const category = searchParams.get('category');

  let response;

  category
    ? (response = await axios.get(`/products/?category=${category}`))
    : (response = await axios.get('/products'));

  return Response.json({ data: response.data });
}
