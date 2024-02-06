'use client';

import { useSearchParams } from 'next/navigation';

import ProductsPage from '../../containers/products';

export default function Products() {
  const searchParams = useSearchParams();

  const category = searchParams.get('categoria');

  return <ProductsPage searchParams={category} />;
}
