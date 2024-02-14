import ProductPage from '../../../containers/product';

import axios from '../../../services/axios';

import { ProductsProps } from '../../../types/products-props';

export default function Product({ params }: { params: { id: string } }) {
  return <ProductPage id={params.id} />;
}

export const generateStaticParams = async () => {
  const response = await axios.get('/products');

  return response.data.map((product: ProductsProps) => {
    product.id;
  });
};
