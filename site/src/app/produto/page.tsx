'use client';

import { useSearchParams } from 'next/navigation';

import ProductCategoryPage from '../../containers/product-category';

export default function ProductCategory() {
  const searchParams = useSearchParams();

  const category = searchParams.get('categoria');

  return <ProductCategoryPage searchParams={category} />;
}
