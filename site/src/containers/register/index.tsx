import HeaderComponent from '../../components/header';

const RegisterPage = () => {
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
                placeholder="Nome"
                className="w-full mr-2 p-2 rounded-lg outline-none bg-primary text-secondary placeholder-secondary"
              />
              <input
                type="text"
                placeholder="Sobrenome"
                className="w-full p-2 rounded-lg outline-none bg-primary text-secondary placeholder-secondary"
              />
            </div>

            <div className="w-full flex justify-center items-center">
              <input
                type="email"
                placeholder="E-mail"
                className="w-full mx-5 m-auto p-2 rounded-lg outline-none bg-primary text-secondary placeholder-secondary"
              />
            </div>

            <div className="w-full p-5 flex justify-around">
              <input
                type="password"
                placeholder="Senha"
                className="w-full mr-2 p-2 rounded-lg outline-none bg-primary text-secondary placeholder-secondary"
              />
              <input
                type="password"
                placeholder="Confirmar Senha"
                className="w-full p-2 rounded-lg outline-none bg-primary text-secondary placeholder-secondary"
              />
            </div>

            <div className="w-full flex justify-center items-center">
              <button className="w-48 h-9 rounded-lg bg-primary text-secondary hover:opacity-85 transition-all">
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
