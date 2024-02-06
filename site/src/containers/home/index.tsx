/* eslint-disable @typescript-eslint/no-unused-vars */
import { IoIosMoon, IoIosSearch, IoIosShirt } from 'react-icons/io';
import { IoSunny } from 'react-icons/io5';
import { FaCartShopping } from 'react-icons/fa6';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import FooterComponent from '../../components/footer';
import RecentsProductsComponent from '../../components/recents-products';
import ProductsWithDiscountComponent from '../../components/products-with-discount';
import EmphasisComponent from '../../components/emphasis';

import { products } from '../../database/products';

const HomePage = () => {
  const [searchProduct, setSearchProduct] = useState('');
  const [select, setSelect] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { systemTheme, theme, setTheme } = useTheme();
  const { push } = useRouter();

  const productFiltered =
    searchProduct.length > 0
      ? products.filter((product) =>
          product.productName.includes(
            searchProduct.replace(/(?:^|\s)(?!da|de|do)\S/g, (l) =>
              l.toUpperCase(),
            ),
          ),
        )
      : [];

  const handleSelect = (option: string) => {
    push(`/produtos?categoria=${option}`);

    setSelect(option);
  };

  return (
    <>
      <header className="p-4 flex justify-between items-center">
        <div className="w-screen">
          <img src="/logo.png" width="301" height="49" />
        </div>

        <div className="w-screen flex justify-center">
          <select
            className="mr-4 cursor-pointer bg-primary dark:bg-secondary dark:text-primary outline-none"
            id="categories"
            value={select}
            onChange={(e) => handleSelect(e.target.value)}
          >
            <option value="categorias">Categorias</option>
            <option value="blusas">Blusas</option>
            <option value="calças">Calças</option>
            <option value="camisas">Camisas</option>
            <option value="camisetas">Camisetas</option>
            <option value="jaquetas">Jaquetas</option>
            <option value="pijamas">Pijamas</option>
            <option value="saias">Saias</option>
            <option value="sapatos">Sapatos</option>
            <option value="shorts">Shorts</option>
            <option value="tênis">Tênis</option>
            <option value="vestidos">Vestidos</option>
          </select>

          {isLoggedIn ? (
            <a href="/minha-lista" className="hover:opacity-80 transition-all">
              Minha Lista
            </a>
          ) : null}
        </div>

        <div className="w-screen flex justify-end items-center">
          {theme === 'light' ? (
            <button onClick={() => setTheme('dark')}>
              <IoIosMoon color="#121212" size={24} className="cursor-pointer" />
            </button>
          ) : (
            <IoSunny
              color="#F2F2F2"
              size={24}
              className="cursor-pointer"
              onClick={() => setTheme('light')}
            />
          )}

          {isLoggedIn ? (
            <a
              href="/carrinho"
              className="mx-4 hover:opacity-80 transition-all"
            >
              <FaCartShopping size={24} />
            </a>
          ) : (
            <a
              href="/cadastre-se"
              className="mx-4 hover:opacity-80 transition-all"
            >
              Cadastre-se
            </a>
          )}

          {isLoggedIn ? (
            <button className="w-28 h-8 bg-secondary dark:bg-primary dark:text-secondary text-primary rounded-lg flex justify-center items-center hover:opacity-80 transition-all">
              Logout
            </button>
          ) : (
            <a
              href="/login"
              className="w-28 h-8 bg-secondary dark:bg-primary dark:text-secondary text-primary rounded-lg flex justify-center items-center hover:opacity-80 transition-all"
            >
              Login
            </a>
          )}
        </div>
      </header>

      <main>
        <div className="w-3/4 h-96 m-auto my-40 bg-[url('/container-homepage.jpg')] bg-cover bg-no-repeat bg-center relative rounded-lg shadow-lg">
          <div
            className={`w-3/4 h-11 p-2 bg-primary rounded-lg absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 shadow-lg flex items-center ${
              searchProduct.length > 0 ? 'rounded-b-none' : ''
            } transition-all`}
          >
            <IoIosSearch color="#121212" size={24} className="cursor-pointer" />

            <input
              type="text"
              onChange={(e) => setSearchProduct(e.target.value)}
              placeholder="Pesquisar"
              className="w-full h-10 p-2 bg-primary text-secondary outline-none placeholder-secondary"
            />
          </div>

          {searchProduct.length > 0 ? (
            <div className="w-3/4 min-h-5 mt-5 absolute top-1/2 left-1/2 -translate-x-1/2 rounded-b-lg bg-primary text-secondary z-0">
              {productFiltered.map((product) => (
                <a
                  key={product.id}
                  href={`/produto/${product.id}`}
                  className="w-full mt-4 p-2 flex justify-between items-center hover:opacity-80 transition-all z-10"
                >
                  <p className="flex justify-center items-center font-semibold">
                    {' '}
                    <IoIosShirt size={32} className="mr-2" />
                    {product.productName}
                  </p>{' '}
                  <p>
                    {product.price.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </p>
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <div className="w-full">
          {isLoggedIn ? (
            <RecentsProductsComponent />
          ) : (
            <ProductsWithDiscountComponent />
          )}
        </div>

        <div className="mt-40 mb-40">
          {isLoggedIn ? <ProductsWithDiscountComponent /> : null}
        </div>

        <EmphasisComponent />
      </main>

      <FooterComponent />
    </>
  );
};

export default HomePage;
