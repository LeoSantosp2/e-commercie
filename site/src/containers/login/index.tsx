import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import HeaderComponent from '../../components/header';

import { loginRequired } from '../../utils/login-required';

const LoginPage = () => {
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { back } = useRouter();

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const login = await loginRequired(email, password);

    setTimeout(() => {
      if (!login) {
        back();
      }
    }, 1000);
  };

  return (
    <div className="size-full">
      <head>
        <title>Login</title>
      </head>

      <HeaderComponent />

      <main className="w-full h-3/4 relative flex justify-center items-center">
        <img
          src="/container-homepage.jpg"
          className="w-1/2 h-80 rounded-lg z-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />

        <div className="w-1/2 h-80 flex justify-center items-center flex-col rounded-lg backdrop-blur-xl shadow-lg">
          <h1 className="font-bold text-3xl text-secondary">Login</h1>

          <form action="#" className="w-3/4">
            <div className="w-full mt-10">
              <input
                type="email"
                value={email}
                placeholder="E-mail"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-5 p-2 rounded-lg outline-none bg-primary text-secondary placeholder-secondary"
              />

              <div className="w-full h-10 mr-2 rounded-lg bg-primary flex ">
                <input
                  type={hiddenPassword ? 'password' : 'text'}
                  value={password}
                  placeholder="Senha"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-11/12 h-full pl-2 outline-none rounded-s-lg bg-transparent text-secondary placeholder-secondary"
                />

                <div className="w-1/12 h-full rounded-e-lg flex justify-center items-center">
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
            </div>

            <div className="w-full flex justify-center items-center">
              <button
                className="w-48 h-9 mt-10 rounded-lg bg-primary text-secondary hover:opacity-85 transition-all"
                onClick={(e) => handleLogin(e)}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
