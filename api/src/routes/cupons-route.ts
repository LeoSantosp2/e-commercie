import cuponsController from '../controllers/cupons-controller';

export const cuponsRoute = async (
  method: string,
  body: string,
  idCupom: string | null,
) => {
  if (method === 'GET') {
    return await cuponsController.index();
  }

  if (method === 'POST') {
    return await cuponsController.store(JSON.parse(body));
  }

  if (method === 'PUT' && idCupom) {
    return await cuponsController.update(idCupom, JSON.parse(body));
  }

  if (method === 'DELETE' && idCupom) {
    return await cuponsController.delete(idCupom);
  }

  return new Response();
};
