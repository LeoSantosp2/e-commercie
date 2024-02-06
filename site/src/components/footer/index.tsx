import {
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
  FaRegCopyright,
} from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';

const FooterComponent = () => {
  return (
    <div className="w-full h-96 bg-tertiary dark:text-secondary relative">
      <div className="flex">
        <div className="w-full">
          <h1 className="m-5 text-2xl">Redes Sociais</h1>

          <nav className="flex">
            <FaFacebookSquare size={24} className="ml-4 cursor-pointer" />
            <FaInstagram size={24} className="ml-4 cursor-pointer" />
            <BsTwitterX size={24} className="ml-4 cursor-pointer" />
            <FaLinkedin size={24} className="ml-4 cursor-pointer" />
          </nav>
        </div>

        <div className="w-full mr-7 pt-7 flex justify-end">
          <nav className="flex flex-col">
            <a href="#" className="mb-4 hover:underline">
              Política de Privacidade
            </a>
            <a href="#" className="mb-4 hover:underline">
              Política de Cookies
            </a>
            <a href="#" className="mb-4 hover:underline">
              Trabalhe Conosco
            </a>
          </nav>
        </div>
      </div>
      <div className="w-full absolute bottom-0 flex justify-center items-center">
        <p className="flex justify-center items-center italic">
          <FaRegCopyright />
          paycommercie LTDA 2024
        </p>
      </div>
    </div>
  );
};

export default FooterComponent;
