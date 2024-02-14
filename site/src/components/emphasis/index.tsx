import { GiLargeDress, GiMonclerJacket, GiSkirt, GiWool } from 'react-icons/gi';
import { IoIosShirt } from 'react-icons/io';
import { PiPantsFill } from 'react-icons/pi';
import { useState, useEffect } from 'react';

import { ProductsProps } from '../../types/products-props';

const EmphasisComponent = () => {
  const [emphasis, setEmphasis] = useState<ProductsProps[]>([]);

  const fetchDatas = async () => {
    const response = await fetch('http://localhost:3000/api/products');

    const data = await response.json();

    const products = [];

    for (let i = 0; i < 6; i++) {
      products.push(data.data[Math.floor(Math.random() * data.data.length)]);
    }

    setEmphasis(products);
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  return (
    <div className="mt-40 mb-40">
      <h1 className="mx-8 text-3xl">Destaques</h1>

      <div className="w-full py-20 px-20 flex flex-wrap justify-center">
        {emphasis.map((product) => (
          <a
            key={product.id}
            href={`/produto/${product.id}`}
            className="w-72 m-4 hover:opacity-80 transition-all"
          >
            <div className="w-72 h-full p-5 rounded-lg bg-tertiary dark:text-secondary text-justify shadow-lg">
              <div className="w-20 h-20 mx-auto flex rounded-full justify-center items-center">
                {product.category === 'camisetas' ? (
                  <IoIosShirt size={70} />
                ) : null}

                {product.category === 'calças' ? (
                  <PiPantsFill size={70} />
                ) : null}

                {product.category === 'vestidos' ? (
                  <GiLargeDress size={70} />
                ) : null}

                {product.category === 'moletoms' ? (
                  <GiMonclerJacket size={70} />
                ) : null}

                {product.category === 'blusas' ? <GiWool size={70} /> : null}

                {product.category === 'saias' ? <GiSkirt size={70} /> : null}
              </div>

              <p className="text-center my-5 font-semibold">
                {product.product_name}
              </p>

              <p className="text-center">{product.product_description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default EmphasisComponent;
