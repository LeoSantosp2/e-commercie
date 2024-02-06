import { GiLargeDress, GiMonclerJacket, GiSkirt, GiWool } from 'react-icons/gi';
import { IoIosShirt } from 'react-icons/io';
import { PiPantsFill } from 'react-icons/pi';

import { emphasis } from '../../database/emphasis';

const EmphasisComponent = () => {
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
                {product.productName}
              </p>

              <p className="text-center">{product.productDescription}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default EmphasisComponent;
