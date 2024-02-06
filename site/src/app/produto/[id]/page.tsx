import ProductPage from '../../../containers/product';

import { products } from '../../../database/products';

import { Product } from '../../../types/product-props';

export default function Product({ params }: { params: { id: string } }) {
  return <ProductPage id={Number(params.id)} />;
}

export const generateStaticParams = () => {
  return products.map((product) => {
    product.id;
  });
};
