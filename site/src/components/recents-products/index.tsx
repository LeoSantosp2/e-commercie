import { IoIosShirt } from 'react-icons/io';
import { PiPantsFill } from 'react-icons/pi';
import { GiLargeDress, GiMonclerJacket } from 'react-icons/gi';

import { recents } from '../../database/recents';

const RecentsProductsComponent = () => {
  return (
    <>
      <h1 className="mx-8 text-3xl">Recentes</h1>
      <div className="w-full py-20 px-20 flex flex-wrap justify-center">
        {recents.map((product) => (
          <a
            key={product.id}
            href={`/produto/${product.id}`}
            className="m-4 hover:opacity-80 transition-all"
          >
            <div className="w-72 h-full p-5 rounded-lg bg-tertiary dark:text-secondary text-justify shadow-lg">
              <div className="w-20 h-20 mx-auto rounded-full  justify-center items-center">
                {product.category === 'camisetas' ? (
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
              </div>

              <p className="text-center my-5 font-semibold">
                {product.productName}
              </p>

              <p className="text-center">{product.productDescription}</p>
            </div>
          </a>
        ))}
      </div>{' '}
    </>
  );
};

export default RecentsProductsComponent;
