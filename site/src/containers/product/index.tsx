'use client';

import {
  GiPadlock,
  GiLargeDress,
  GiMonclerJacket,
  GiSkirt,
  GiWool,
} from 'react-icons/gi';
import { IoIosShirt } from 'react-icons/io';
import { PiPantsFill } from 'react-icons/pi';
import { toast } from 'react-toastify';
import { useState } from 'react';

import { products } from '../../database/products';

import HeaderComponent from '../../components/header';

import { Product } from '../../types/product-props';

const ProductPage = ({ id }: Product) => {
  const [qtd, setQtd] = useState('1');

  const newProduct = products.filter((product) => product.id === id);

  const handleAddList = () => {
    const response = localStorage.getItem('my-list');

    const datas = response ? JSON.parse(response) : [];

    const newDatas = [...datas, newProduct[0]];

    localStorage.setItem('my-list', JSON.stringify(newDatas));

    toast.success('produto adicionado a lista com sucesso.');
  };

  const handleAddShoppingCart = () => {
    const response = localStorage.getItem('shopping-cart');

    const datas = response ? JSON.parse(response) : [];

    const newData = {
      id: newProduct[0].id,
      productName: newProduct[0].productName,
      productDescription: newProduct[0].productDescription,
      price: newProduct[0].price * Number(qtd),
      category: newProduct[0].category,
      qtd: qtd,
    };

    const newDatas = [...datas, newData];

    localStorage.setItem('shopping-cart', JSON.stringify(newDatas));

    toast.success('produto adicionado ao carrinho com sucesso.');
  };

  return (
    <>
      <head>
        <title>{newProduct[0].productName}</title>
      </head>

      <HeaderComponent />

      <main className="w-full">
        <div className="flex justify-around">
          {newProduct.map((product) => (
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
                <GiMonclerJacket size={72} color="#121212" />
              ) : null}

              {product.category === 'saias' ? (
                <GiSkirt size={72} color="#121212" />
              ) : null}

              {product.category === 'blusas' ? (
                <GiWool size={70} color="#121212" />
              ) : null}
            </div>
          ))}

          {newProduct.map((product) => (
            <div
              key={product.id}
              className="w-1/4 flex flex-col justify-between"
            >
              <h1 className="font-bold text-3xl">{product.productName}</h1>

              <p>{product.productDescription}</p>

              <p className="text-lg font-semibold">
                {product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </p>
            </div>
          ))}

          <div className="w-60 p-2 flex flex-col rounded-lg border shadow-xl text-center relative">
            {newProduct.map((product) => (
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
    </>
  );
};

export default ProductPage;
