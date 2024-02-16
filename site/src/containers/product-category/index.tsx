import { useEffect, useState } from 'react';
import {
  GiClothes,
  GiConverseShoe,
  GiUnderwearShorts,
  GiWool,
  GiMonclerJacket,
  GiLargeDress,
  GiSkirt,
} from 'react-icons/gi';
import { LiaShoePrintsSolid } from 'react-icons/lia';
import { FaTshirt } from 'react-icons/fa';
import { PiPantsFill } from 'react-icons/pi';

import HeaderComponent from '../../components/header';

import { ProductsProps } from '../../types/products-props';

const ProductsPage = ({ searchParams }: { searchParams: string | null }) => {
  const [products, setProducts] = useState<ProductsProps[]>([]);

  const fetchProducts = async () => {
    const response = await fetch(
      `http://localhost:3005/api/products?category=${searchParams}`,
    );

    const data = await response.json();

    setProducts(data.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <head>
        <title>
          {searchParams?.replace(/(?:^|\s)(?!da|de|do)\S/g, (l) =>
            l.toUpperCase(),
          )}
        </title>
      </head>

      <HeaderComponent />

      <main>
        <div className="w-full py-20 flex flex-wrap justify-center relative">
          <h1 className="font-bold text-2xl absolute top-10 left-5">
            Mais Vendidas
          </h1>

          {products.map((product) => (
            <a
              key={product.id}
              href={`/produto/${product.id}`}
              className="my-4 mx-4 hover:opacity-80 transition-all"
            >
              <div className="w-72 h-96 p-5 rounded-lg bg-tertiary dark:text-secondary text-justify shadow-lg relative">
                <div className="w-20 h-20 mx-auto rounded-full flex justify-center items-center">
                  {searchParams === 'pijamas' ? (
                    <GiClothes size={70} color="#121212" />
                  ) : null}

                  {searchParams === 'sapatos' ? (
                    <LiaShoePrintsSolid size={70} color="#121212" />
                  ) : null}

                  {searchParams === 'tênis' ? (
                    <GiConverseShoe size={70} color="#121212" />
                  ) : null}

                  {searchParams === 'moletoms' ? (
                    <GiWool size={70} color="#121212" />
                  ) : null}

                  {searchParams === 'shorts' || searchParams === 'bermudas' ? (
                    <GiUnderwearShorts size={70} color="#121212" />
                  ) : null}

                  {searchParams === 'blusas' ||
                  searchParams === 'camisas' ||
                  searchParams === 'camisetas' ? (
                    <FaTshirt size={70} color="#121212" />
                  ) : null}

                  {searchParams === 'jaquetas' ? (
                    <GiMonclerJacket size={70} color="#121212" />
                  ) : null}

                  {product.category === 'vestidos' ? (
                    <GiLargeDress size={70} color="#121212" />
                  ) : null}

                  {product.category === 'saias' ? (
                    <GiSkirt size={70} color="#121212" />
                  ) : null}

                  {product.category === 'calças' ? (
                    <PiPantsFill size={70} color="#121212" className="mr-2" />
                  ) : null}
                </div>

                <p className="text-center my-5 font-semibold">
                  {product.product_name}
                </p>

                <p className="text-justify">{product.product_description}</p>

                <p className="mt-4 font-semibold text-center absolute left-1/2 bottom-2 -translate-x-2/4">
                  {product.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="w-full py-20 flex flex-wrap justify-center relative">
          <h1 className="font-bold text-2xl absolute top-10 left-5">Ofertas</h1>

          {products.map((product) => (
            <a
              key={product.id}
              href={`/produto/${product.id}`}
              className="my-4 mx-4 hover:opacity-80 transition-all"
            >
              <div className="w-72 h-96 p-5 rounded-lg bg-tertiary dark:text-secondary text-justify shadow-lg relative">
                <div className="w-20 h-20 mx-auto rounded-full flex justify-center items-center">
                  {searchParams === 'pijamas' ? (
                    <GiClothes size={70} color="#121212" />
                  ) : null}

                  {searchParams === 'sapatos' ? (
                    <LiaShoePrintsSolid size={70} color="#121212" />
                  ) : null}

                  {searchParams === 'tênis' ? (
                    <GiConverseShoe size={70} color="#121212" />
                  ) : null}

                  {searchParams === 'moletoms' ? (
                    <GiWool size={70} color="#121212" />
                  ) : null}

                  {searchParams === 'shorts' || searchParams === 'bermudas' ? (
                    <GiUnderwearShorts size={70} color="#121212" />
                  ) : null}

                  {searchParams === 'blusas' ||
                  searchParams === 'camisas' ||
                  searchParams === 'camisetas' ? (
                    <FaTshirt size={70} color="#121212" />
                  ) : null}

                  {searchParams === 'jaquetas' ? (
                    <GiMonclerJacket size={70} color="#121212" />
                  ) : null}

                  {product.category === 'vestidos' ? (
                    <GiLargeDress size={70} color="#121212" />
                  ) : null}

                  {product.category === 'saias' ? (
                    <GiSkirt size={70} color="#121212" />
                  ) : null}

                  {product.category === 'calças' ? (
                    <PiPantsFill size={70} color="#121212" className="mr-2" />
                  ) : null}
                </div>

                <p className="text-center my-5 font-semibold">
                  {product.product_name}
                </p>

                <p className="text-justify">{product.product_description}</p>

                <p className="mt-4 font-semibold text-center absolute left-1/2 bottom-2 -translate-x-2/4">
                  {product.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </p>
              </div>
            </a>
          ))}
        </div>
      </main>
    </>
  );
};

export default ProductsPage;
