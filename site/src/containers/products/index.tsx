import { IoIosShirt } from 'react-icons/io';

import HeaderComponent from '../../components/header';

import { products } from '../../database/products';

const ProductsPage = ({ searchParams }: { searchParams: string | null }) => {
  const productsFiltered = products.filter(
    (product) => product.category === searchParams,
  );

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

          {productsFiltered.map((product) => (
            <a
              key={product.id}
              href={`/produto/${product.id}`}
              className="my-4 mx-4 hover:opacity-80 transition-all"
            >
              <div className="w-72 h-96 p-5 rounded-lg bg-tertiary dark:text-secondary text-justify shadow-lg relative">
                <div className="w-20 h-20 mx-auto rounded-full flex justify-center items-center">
                  <IoIosShirt size={70} color="#121212" />
                </div>

                <p className="text-center my-5 font-semibold">
                  {product.productName}
                </p>

                <p className="text-justify">{product.productDescription}</p>

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

          {productsFiltered.map((product) => (
            <a
              key={product.id}
              href={`/produto/${product.id}`}
              className="my-4 mx-4 hover:opacity-80 transition-all"
            >
              <div className="w-72 h-96 p-5 rounded-lg bg-tertiary dark:text-secondary text-justify shadow-lg relative">
                <div className="w-20 h-20 mx-auto rounded-full flex justify-center items-center">
                  <IoIosShirt size={70} color="#121212" />
                </div>

                <p className="text-center my-5 font-semibold">
                  {product.productName}
                </p>

                <p className="text-justify">{product.productDescription}</p>

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
