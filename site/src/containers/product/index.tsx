'use client';

import Cookies from 'js-cookie';
import ReactStarts from 'react-stars';
import {
  GiPadlock,
  GiLargeDress,
  GiSkirt,
  GiWool,
  GiMonclerJacket,
  GiUnderwearShorts,
  GiConverseShoe,
  GiClothes,
} from 'react-icons/gi';
import { IoIosShirt } from 'react-icons/io';
import { PiPantsFill } from 'react-icons/pi';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { LiaShoePrintsSolid } from 'react-icons/lia';
import { FaStar } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';

import HeaderComponent from '../../components/header';

import { ProductId } from '../../types/product-props';
import { ProductsProps } from '../../types/products-props';

import { apiUrl } from '../../utils/api-url';

const ProductPage = ({ id }: ProductId) => {
  const [qtd, setQtd] = useState('1');
  const [product, setProduct] = useState<ProductsProps[]>([]);

  const fetchDatas = async () => {
    const datas = await apiUrl(`/api/products/${id}`);

    setProduct(datas);
  };

  const handleAddList = () => {
    const token = Cookies.get('tokenAuth');

    if (!token) return toast.error('Necessário efetua login.');

    const response = localStorage.getItem('my-list');

    const datas = response ? JSON.parse(response) : [];

    const newDatas = [...datas, product[0]];

    localStorage.setItem('my-list', JSON.stringify(newDatas));

    toast.success('produto adicionado a lista com sucesso.');
  };

  const handleAddShoppingCart = () => {
    const token = Cookies.get('tokenAuth');

    if (!token) return toast.error('Necessário efetua login.');

    const response = localStorage.getItem('shopping-cart');

    const datas = response ? JSON.parse(response) : [];

    const newData = {
      id: product[0].id,
      productName: product[0].product_name,
      productDescription: product[0].product_description,
      price: product[0].price * Number(qtd),
      category: product[0].category,
      qtd: qtd,
    };

    const newDatas = [...datas, newData];

    localStorage.setItem('shopping-cart', JSON.stringify(newDatas));

    toast.success('produto adicionado ao carrinho com sucesso.');
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  return (
    <>
      <title>Produto</title>

      <HeaderComponent />

      <main className="w-full">
        <div className="flex justify-around">
          {product.map((product) => (
            <div
              key={product.id}
              className="size-96 rounded-lg flex justify-center items-center bg-tertiary"
            >
              {product.category === 'camisetas' ? (
                <IoIosShirt size={72} color="#121212" />
              ) : null}

              {product.category === 'calças' ? (
                <PiPantsFill size={72} color="#121212" />
              ) : null}

              {product.category === 'vestidos' ? (
                <GiLargeDress size={72} color="#121212" />
              ) : null}

              {product.category === 'moletoms' ? (
                <GiWool size={72} color="#121212" />
              ) : null}

              {product.category === 'saias' ? (
                <GiSkirt size={72} color="#121212" />
              ) : null}

              {product.category === 'blusas' ? (
                <IoIosShirt size={70} color="#121212" />
              ) : null}

              {product.category === 'jaquetas' ? (
                <GiMonclerJacket size={70} color="#121212" />
              ) : null}

              {product.category === 'shorts' ||
              product.category === 'bermudas' ? (
                <GiUnderwearShorts size={70} color="#121212" />
              ) : null}

              {product.category === 'tênis' ? (
                <GiConverseShoe size={70} color="#121212" />
              ) : null}

              {product.category === 'sapatos' ? (
                <LiaShoePrintsSolid size={70} color="#121212" />
              ) : null}

              {product.category === 'pijamas' ? (
                <GiClothes size={70} color="#121212" />
              ) : null}
            </div>
          ))}

          {product.map((product) => (
            <div
              key={product.id}
              className="w-1/4 flex flex-col justify-between"
            >
              <h1 className="font-bold text-3xl">{product.product_name}</h1>

              <p>{product.product_description}</p>

              <p className="text-lg font-semibold">
                {product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </p>
            </div>
          ))}

          <div className="w-60 p-2 flex flex-col rounded-lg border shadow-xl text-center relative">
            {product.map((product) => (
              <p key={product.id} className="text-lg text-left font-semibold">
                {product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </p>
            ))}

            <p className="my-4 flex justify-center items-center">
              <GiPadlock size={16} className="mr-1" /> Compra segura
            </p>

            <div className="flex my-10 mx-auto">
              <label htmlFor="select-qtd">Quantidade:</label>

              <select
                id="select-qtd"
                className="w-10 ml-2 text-center outline-none cursor-pointer"
                value={qtd}
                onChange={(e) => setQtd(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            <button
              className="w-44 h-8 mx-auto bg-secondary text-primary dark:bg-primary dark:text-secondary rounded-lg hover:opacity-80 transition-all"
              onClick={handleAddShoppingCart}
            >
              Adicionar ao Carrinho
            </button>
            <button className="w-44 h-8 mt-3 mx-auto bg-secondary text-primary dark:bg-primary dark:text-secondary rounded-lg hover:opacity-80 transition-all">
              Comprar
            </button>

            <button
              className="w-44 bg-primary text-secondary rounded-lg hover:opacity-80 transition-all shadow-lg border absolute bottom-3 left-1/2 -translate-x-1/2"
              onClick={handleAddList}
            >
              Adicionar a lista
            </button>
          </div>
        </div>
      </main>

      <aside className="w-full mt-40">
        <div>
          <h1 className="mx-8 text-3xl">Avaliar produto</h1>

          <div className="w-full h-96 flex items-center">
            <div className="w-1/5 h-full flex justify-center items-center">
              <ReactStarts count={5} size={32} />
            </div>

            <div className="w-4/5 h-full flex justify-center items-center">
              <form action="#" className="flex flex-col">
                <textarea
                  cols={100}
                  rows={7}
                  className="p-2 outline-none rounded-lg bg-primary text-secondary border"
                ></textarea>

                <button className="w-full h-10 mt-2 m-auto rounded-lg bg-primary text-secondary hover:opacity-80 transition-all shadow-lg border">
                  Enviar comentário
                </button>
              </form>
            </div>
          </div>
        </div>

        <div>
          <h1 className="mx-8 text-3xl">Avaliações</h1>

          <div className="w-full flex relative">
            <div className="w-72 h-96 border rounded-lg absolute top-4 left-20">
              <h2 className="m-4 text-2xl font-semibold">Nota: 4.2</h2>

              <div className="px-2 w-full flex items-center">
                <div className="mr-20">
                  <FaStar color="#FDD700" />
                </div>

                <p className="mr-6">1 estrela</p>

                <p className="text-xs">5 avaliações</p>
              </div>

              <div className="px-2 w-full flex items-center">
                <div className="flex mr-16">
                  <FaStar color="#FDD700" />
                  <FaStar color="#FDD700" />
                </div>

                <p className="mr-4">2 estrelas</p>

                <p className="text-xs">10 avaliações</p>
              </div>

              <div className="px-2 w-full flex items-center">
                <div className="flex mr-12">
                  <FaStar color="#FDD700" />
                  <FaStar color="#FDD700" />
                  <FaStar color="#FDD700" />
                </div>

                <p className="mr-4">3 estrelas</p>

                <p className="text-xs">15 avaliações</p>
              </div>

              <div className="px-2 w-full flex items-center">
                <div className="flex mr-8">
                  <FaStar color="#FDD700" />
                  <FaStar color="#FDD700" />
                  <FaStar color="#FDD700" />
                  <FaStar color="#FDD700" />
                </div>

                <p className="mr-4">4 estrelas</p>

                <p className="text-xs">20 avaliações</p>
              </div>

              <div className="px-2 w-full flex items-center">
                <div className="flex mr-4">
                  <FaStar color="#FDD700" />
                  <FaStar color="#FDD700" />
                  <FaStar color="#FDD700" />
                  <FaStar color="#FDD700" />
                  <FaStar color="#FDD700" />
                </div>

                <p className="mr-4">5 estrelas</p>

                <p className="text-xs">25 avaliações</p>
              </div>
            </div>

            <div className="w-2/4 absolute top-4 left-2/3 -translate-x-2/3">
              <div className="mb-10">
                <div>
                  <div className="flex items-center mb-2">
                    <CgProfile size={32} />
                    <h1 className="ml-2 text-2xl font-semibold">
                      Lorem, ipsum dolor.
                    </h1>
                  </div>

                  <div className="flex mb-4">
                    <FaStar size={12} color="#FDD700" />
                    <FaStar size={12} color="#CCCCCC" />
                    <FaStar size={12} color="#CCCCCC" />
                    <FaStar size={12} color="#CCCCCC" />
                    <FaStar size={12} color="#CCCCCC" />
                  </div>
                </div>

                <p className="text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                  qui doloremque, asperiores facilis ipsa itaque ea vel
                  consequatur et placeat id amet incidunt sed vitae accusamus,
                  assumenda sint saepe facere.
                </p>
              </div>

              <div className="mb-10">
                <div>
                  <div className="flex items-center mb-2">
                    <CgProfile size={32} />
                    <h1 className="ml-2 text-2xl font-semibold">
                      Lorem, ipsum dolor.
                    </h1>
                  </div>

                  <div className="flex mb-4">
                    <FaStar size={12} color="#FDD700" />
                    <FaStar size={12} color="#FDD700" />
                    <FaStar size={12} color="#CCCCCC" />
                    <FaStar size={12} color="#CCCCCC" />
                    <FaStar size={12} color="#CCCCCC" />
                  </div>
                </div>

                <p className="text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                  qui doloremque, asperiores facilis ipsa itaque ea vel
                  consequatur et placeat id amet incidunt sed vitae accusamus,
                  assumenda sint saepe facere.
                </p>
              </div>

              <div className="mb-10">
                <div>
                  <div className="flex items-center mb-2">
                    <CgProfile size={32} />
                    <h1 className="ml-2 text-2xl font-semibold">
                      Lorem, ipsum dolor.
                    </h1>
                  </div>

                  <div className="flex mb-4">
                    <FaStar size={12} color="#FDD700" />
                    <FaStar size={12} color="#FDD700" />
                    <FaStar size={12} color="#FDD700" />
                    <FaStar size={12} color="#CCCCCC" />
                    <FaStar size={12} color="#CCCCCC" />
                  </div>
                </div>

                <p className="text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                  qui doloremque, asperiores facilis ipsa itaque ea vel
                  consequatur et placeat id amet incidunt sed vitae accusamus,
                  assumenda sint saepe facere.
                </p>
              </div>

              <div className="mb-10">
                <div>
                  <div className="flex items-center mb-2">
                    <CgProfile size={32} />
                    <h1 className="ml-2 text-2xl font-semibold">
                      Lorem, ipsum dolor.
                    </h1>
                  </div>

                  <div className="flex mb-4">
                    <FaStar size={12} color="#FDD700" />
                    <FaStar size={12} color="#FDD700" />
                    <FaStar size={12} color="#FDD700" />
                    <FaStar size={12} color="#FDD700" />
                    <FaStar size={12} color="#CCCCCC" />
                  </div>
                </div>

                <p className="text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                  qui doloremque, asperiores facilis ipsa itaque ea vel
                  consequatur et placeat id amet incidunt sed vitae accusamus,
                  assumenda sint saepe facere.
                </p>
              </div>

              <div className="mb-10">
                <div>
                  <div className="flex items-center mb-2">
                    <CgProfile size={32} />
                    <h1 className="ml-2 text-2xl font-semibold">
                      Lorem, ipsum dolor.
                    </h1>
                  </div>

                  <div className="flex mb-4">
                    <FaStar size={12} color="#FDD700" />
                    <FaStar size={12} color="#FDD700" />
                    <FaStar size={12} color="#FDD700" />
                    <FaStar size={12} color="#FDD700" />
                    <FaStar size={12} color="#FDD700" />
                  </div>
                </div>

                <p className="text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                  qui doloremque, asperiores facilis ipsa itaque ea vel
                  consequatur et placeat id amet incidunt sed vitae accusamus,
                  assumenda sint saepe facere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default ProductPage;
