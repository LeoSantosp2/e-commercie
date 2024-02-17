import { IoIosClose, IoIosShirt } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';

import HeaderComponent from '../../components/header';

import { ProductProps } from '../../types/product-props';
import { CupomProps } from '../../types/cupom-props';
import { apiUrl } from '@/utils/api-url';

const ShoppingCartPage = () => {
  const [products, setProduct] = useState<ProductProps[]>([]);
  const [subTotal, setSubTotal] = useState(0);
  const [tot, setTot] = useState(0);
  const [insertCupom, setInsertCupom] = useState('');
  const [cupomFiltered, setCupomFiltered] = useState<CupomProps[]>([]);

  const handleDeleteProduct = (id: number) => {
    const datas = products.filter((product) => product.id !== id);
    const newTot = products.filter((product) => product.id === id);

    localStorage.setItem('shopping-cart', JSON.stringify(datas));

    setProduct(datas);

    toast.success('Produto excluido com sucesso.');

    let subTot = 0;

    datas.forEach((product: ProductProps) => {
      subTot += product.price;
    });

    setSubTotal(subTot);
    setTot(tot - newTot[0].price);
  };

  const handleAddCupon = async () => {
    const datas = await apiUrl('/api/cupons');

    const newCupomFiltered =
      insertCupom.length > 0
        ? datas.filter((cupom: CupomProps) =>
            cupom.cupom_name.includes(insertCupom.toUpperCase()),
          )
        : [];

    if (newCupomFiltered.length === 0) {
      return toast.error('Cupom não existe.');
    }

    setCupomFiltered([...cupomFiltered, newCupomFiltered[0]]);
    setInsertCupom('');

    setTot(tot - newCupomFiltered[0].cupom_value);
  };

  const deleteAllProducts = () => {
    setProduct([]);
    setSubTotal(0);
    setTot(0);
    setCupomFiltered([]);

    localStorage.removeItem('shopping-cart');

    toast.success('Conteúdo do carrinho excluido com sucesso.');
  };

  const handleDeleteCupom = (id: string) => {
    const newCupom = cupomFiltered.filter((cupom) => cupom.id !== id);
    const newTot = cupomFiltered.filter((cupom) => cupom.id === id);

    console.log(newTot);

    setTot(tot + newTot[0].cupom_value);

    setCupomFiltered(newCupom);
  };

  useEffect(() => {
    const response = localStorage.getItem('shopping-cart');

    const datas = response ? JSON.parse(response) : [];

    setProduct(datas);

    let subTot = 0;

    datas.forEach((product: ProductProps) => {
      subTot += product.price;
    });

    setSubTotal(subTot);
    setTot(subTot);
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
          <h1 className="font-semibold">
            Subtotal:{' '}
            {subTotal.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </h1>

          <div className="flex items-center">
            <p className="mr-2">Cupom:</p>

            <input
              type="text"
              value={insertCupom}
              onChange={(e) => setInsertCupom(e.target.value)}
              className="w-44 h-7 px-2 rounded-lg outline-none bg-primary text-secondary border"
            />
          </div>

          <div>
            {cupomFiltered.map((cupom) => (
              <p key={cupom.id} className="flex justify-between items-center">
                {cupom.cupom_name}{' '}
                <span className="flex items-center">
                  {cupom.cupom_value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}

                  <FaTrash
                    className="ml-2 hover:opacity-80 transition-all cursor-pointer"
                    onClick={() => handleDeleteCupom(cupom.id)}
                  />
                </span>
              </p>
            ))}
          </div>

          <div className="flex flex-col justify-center items-center">
            <button
              className="w-1/2 mb-2 py-1 px-2 bg-secondary text-primary dark:bg-primary dark:text-secondary rounded-lg hover:opacity-80 transition-all"
              onClick={handleAddCupon}
            >
              Adicionar Cupom
            </button>

            <button className="w-1/2 mb-2 py-1 px-2 bg-secondary text-primary dark:bg-primary dark:text-secondary rounded-lg hover:opacity-80 transition-all">
              Finalizar Compra
            </button>

            <button
              className="w-1/2 py-1 px-2 bg-secondary text-primary dark:bg-primary dark:text-secondary rounded-lg hover:opacity-80 transition-all"
              onClick={deleteAllProducts}
            >
              Limpar Carrinho
            </button>
          </div>

          <h1 className="font-semibold">
            Total:{' '}
            {tot.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </h1>
        </div>
      </main>
    </>
  );
};

export default ShoppingCartPage;
