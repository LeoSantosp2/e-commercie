import { useEffect, useState } from 'react';
import { IoIosShirt, IoIosClose } from 'react-icons/io';
import { toast } from 'react-toastify';

import HeaderComponent from '../../components/header';

import { ProductProps } from '../../types/product-props';

const WishListPage = () => {
  const [products, setProduct] = useState<ProductProps[]>([]);

  const handleDeleteProduct = (id: number) => {
    const datas = products.filter((product) => product.id !== id);

    localStorage.setItem('my-list', JSON.stringify(datas));

    setProduct(datas);

    toast.success('Produto excluido com sucesso.');
  };

  useEffect(() => {
    const response = localStorage.getItem('my-list');

    const datas = response ? JSON.parse(response) : [];

    setProduct(datas);
  }, []);

  return (
    <>
      <head>
        <title>Minha Lista</title>
      </head>

      <HeaderComponent />

      <main className="w-full py-4">
        {products.map((product: ProductProps) => (
          <div
            key={product.id}
            className="w-3/4 h-52 my-4 mx-auto rounded-lg flex items-center border shadow-lg relative"
          >
            <div className="w-1/4 h-full flex justify-center items-center">
              <IoIosShirt size={72} />
            </div>

            <div className="w-1/2 h-full p-2 flex justify-between flex-col text-justify">
              <h1 className="text-2xl font-semibold">{product.productName}</h1>

              <p>{product.productDescription}</p>

              <p className="font-semibold">
                {product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </p>
            </div>

            <div className="w-1/4 h-full flex justify-center items-center">
              <a
                href={`/produto/${product.id}`}
                className="w-36 h-8 bg-secondary dark:bg-primary dark:text-secondary text-primary rounded-lg flex justify-center items-center hover:opacity-80 transition-all"
              >
                Ir para o Produto
              </a>
            </div>

            <IoIosClose
              size={32}
              className="absolute top-1 right-1 cursor-pointer hover:opacity-80 transition-all"
              onClick={() => handleDeleteProduct(product.id)}
            />
          </div>
        ))}
      </main>
    </>
  );
};

export default WishListPage;
