import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';

import HeaderComponent from '../../components/header';

import { registerRequired } from '../../utils/register-required';

const RegisterPage = () => {
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [hiddenConfirmPassword, setHiddenConfirmPassword] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const request = await registerRequired(
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    );

    if (request === 200) {
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="size-full">
      <head>
        <title>Cadastre-se</title>
      </head>

      <HeaderComponent />

      <main className="w-full h-3/4 relative flex justify-center items-center">
        <img
          src="/container-homepage.jpg"
          className="w-1/2 h-80 rounded-lg z-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />

        <div className="w-1/2 h-80 flex justify-center items-center flex-col rounded-lg backdrop-blur-xl shadow-lg">
          <h1 className="font-bold text-3xl text-secondary">Cadastre-se</h1>

          <form action="#" className="w-3/4">
            <div className="w-full p-5 flex justify-around">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Nome"
                className="w-full h-10 mr-2 pl-2 rounded-lg outline-none bg-primary text-secondary placeholder-secondary"
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Sobrenome"
                className="w-full h-10 p-2 rounded-lg outline-none bg-primary text-secondary placeholder-secondary"
              />
            </div>

            <div className="w-full flex justify-center items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                className="w-full h-10 mx-5 m-auto pl-2 rounded-lg outline-none bg-primary text-secondary placeholder-secondary"
              />
            </div>

            <div className="w-full p-5 flex justify-around">
              <div className="w-full h-10 mr-2 rounded-lg bg-primary flex">
                <input
                  type={hiddenPassword ? 'password' : 'text'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Senha"
                  className="w-4/5 h-full pl-2 z-10 rounded-s-lg outline-none bg-transparent text-secondary placeholder-secondary"
                />

                <div className="w-1/5 h-full rounded-e-lg flex justify-center items-center">
                  {hiddenPassword ? (
                    <FaEye
                      size={24}
                      color="#121212"
                      className="cursor-pointer"
                      onClick={() => setHiddenPassword(!hiddenPassword)}
                    />
                  ) : (
                    <FaEyeSlash
                      size={25}
                      color="#121212"
                      className="cursor-pointer"
                      onClick={() => setHiddenPassword(!hiddenPassword)}
                    />
                  )}
                </div>
              </div>

              <div className="w-full mr-2 rounded-lg bg-primary flex">
                <input
                  type={hiddenConfirmPassword ? 'password' : 'text'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirmar Senha"
                  className="w-full h-full pl-2 rounded-lg outline-none bg-primary text-secondary placeholder-secondary"
                />

                <div className="w-1/5 h-full rounded-e-lg flex justify-center items-center">
                  {hiddenConfirmPassword ? (
                    <FaEye
                      size={24}
                      color="#121212"
                      className="cursor-pointer"
                      onClick={() =>
                        setHiddenConfirmPassword(!hiddenConfirmPassword)
                      }
                    />
                  ) : (
                    <FaEyeSlash
                      size={25}
                      color="#121212"
                      className="cursor-pointer"
                      onClick={() =>
                        setHiddenConfirmPassword(!hiddenConfirmPassword)
                      }
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="w-full flex justify-center items-center">
              <button
                className="w-48 h-9 rounded-lg bg-primary text-secondary hover:opacity-85 transition-all"
                onClick={(e) => handleRegister(e)}
              >
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
