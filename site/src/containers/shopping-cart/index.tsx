import { IoIosClose, IoIosShirt } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import HeaderComponent from '../../components/header';

import { ProductProps } from '../../types/product-props';

const ShoppingCartPage = () => {
  const [products, setProduct] = useState<ProductProps[]>([]);

  const handleDeleteProduct = (id: number) => {
    const datas = products.filter((product) => product.id !== id);

    localStorage.setItem('shopping-cart', JSON.stringify(datas));

    setProduct(datas);

    toast.success('Produto excluido com sucesso.');
  };

  useEffect(() => {
    const response = localStorage.getItem('shopping-cart');

    const datas = response ? JSON.parse(response) : [];

    setProduct(datas);
  }, []);

  return (
    <>
      <HeaderComponent />

      <main className="w-full py-4 flex justify-center">
        <div className="w-3/5 mr-5 flex flex-col">
          {products.map((product: ProductProps) => (
            <div
              key={product.id}
              className="w-full h-52 my-4 rounded-lg flex items-center border shadow-lg relative"
            >
              <div className="w-1/4 h-full flex justify-center items-center">
                <IoIosShirt size={72} />
              </div>

              <div className="w-1/2 h-full p-2 flex justify-between flex-col text-justify">
                <h1 className="text-2xl font-semibold">
                  {product.productName}
                </h1>

                <p>{product.productDescription}</p>

                <div className="flex justify-between">
                  <p className="font-semibold">
                    {product.price.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </p>

                  <p className="font-semibold">Quantidade: {product.qtd}</p>
                </div>
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
        </div>

        <div className="w-1/4 h-96 my-4 p-2 border rounded-lg flex flex-col justify-between">
          <h1 className="font-semibold">Subtotal: R$300,00</h1>

          <div className="flex items-center">
            <p className="mr-2">Cupom:</p>

            <input
              type="text"
              className="w-44 h-7 px-2 rounded-lg outline-none bg-primary text-secondary border"
            />
          </div>

          <div>
            <p className="flex justify-between items-center">
              Cupom 1 <span>-R$10,00</span>
            </p>
            <p className="flex justify-between items-center">
              Cupom 2 <span>-R$34,99</span>
            </p>
            <p className="flex justify-between items-center">
              Cupom 3 <span>-R$50,00</span>
            </p>
          </div>

          <div className="flex flex-col justify-center items-center">
            <button className="w-1/2 mb-2 py-1 px-2 bg-secondary text-primary dark:bg-primary dark:text-secondary rounded-lg hover:opacity-80 transition-all">
              Finalizar Compra
            </button>

            <button className="w-1/2 py-1 px-2 bg-secondary text-primary dark:bg-primary dark:text-secondary rounded-lg hover:opacity-80 transition-all">
              Excluir Produtos
            </button>
          </div>

          <h1 className="font-semibold">Total: R$205,01</h1>
        </div>
      </main>
    </>
  );
};

export default ShoppingCartPage;
