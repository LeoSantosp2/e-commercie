import axios from '../../../services/axios';

export async function GET() {
  const response = await axios.get('/cupons');

  return Response.json({ data: response.data });
}
