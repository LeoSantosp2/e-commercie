import axios from '../../../../services/axios';

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;

  const response = await axios.get(`/products/?id=${id}`);

  return Response.json({ data: response.data });
}
