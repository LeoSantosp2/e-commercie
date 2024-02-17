import { IoIosShirt } from 'react-icons/io';
import { PiPantsFill } from 'react-icons/pi';
import {
  GiClothes,
  GiConverseShoe,
  GiLargeDress,
  GiMonclerJacket,
  GiSkirt,
  GiUnderwearShorts,
  GiWool,
} from 'react-icons/gi';
import { useState, useEffect } from 'react';
import { LiaShoePrintsSolid } from 'react-icons/lia';

import { ProductsProps } from '../../types/products-props';

import { apiUrl } from '../../utils/api-url';

const ProductsWithDiscountComponent = () => {
  const [products, setProducts] = useState<ProductsProps[]>([]);

  const fetchDatas = async () => {
    const datas = await apiUrl('/api/products');

    const newProducts = [];

    for (let i = 0; i < 3; i++) {
      newProducts.push(datas[Math.floor(Math.random() * datas.length)]);
    }

    setProducts(newProducts);
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  return (
    <>
      <h1 className="mx-8 text-3xl">Produtos com Desconto</h1>

      <div className="w-full py-20 px-20 flex flex-wrap justify-center">
        {products.map((product) => (
          <a
            key={product.id}
            href={`/produto/${product.id}`}
            className="m-4 hover:opacity-80 transition-all"
          >
            <div className="w-72 h-full p-5 rounded-lg bg-tertiary dark:text-secondary text-justify shadow-lg">
              <div className="w-20 h-20 mx-auto rounded-full  justify-center items-center">
                {product.category === 'camisetas' ||
                product.category === 'camisas' ||
                product.category === 'blusas' ? (
                  <IoIosShirt size={70} color="#121212" />
                ) : null}

                {product.category === 'calças' ? (
                  <PiPantsFill size={70} color="#121212" />
                ) : null}

                {product.category === 'vestidos' ? (
                  <GiLargeDress size={70} color="#121212" />
                ) : null}

                {product.category === 'jaquetas' ? (
                  <GiMonclerJacket size={70} color="#121212" />
                ) : null}

                {product.category === 'pijamas' ? (
                  <GiClothes size={70} color="#121212" />
                ) : null}

                {product.category === 'sapatos' ? (
                  <LiaShoePrintsSolid size={70} color="#121212" />
                ) : null}

                {product.category === 'tênis' ? (
                  <GiConverseShoe size={70} color="#121212" />
                ) : null}

                {product.category === 'saias' ? (
                  <GiSkirt size={70} color="#121212" />
                ) : null}

                {product.category === 'shorts' ||
                product.category === 'bermudas' ? (
                  <GiUnderwearShorts size={70} color="#121212" />
                ) : null}

                {product.category === 'moletoms' ? (
                  <GiWool size={70} color="#121212" />
                ) : null}
              </div>

              <p className="text-center my-5 font-semibold">
                {product.product_name}
              </p>

              <p className="text-center">{product.product_description}</p>
            </div>
          </a>
        ))}
      </div>
    </>
  );
};

export default ProductsWithDiscountComponent;
