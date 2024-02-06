import HeaderComponent from '../components/header';

export default function NotFound() {
  return (
    <>
      <HeaderComponent />

      <main className="w-full h-4/5 flex justify-center items-center">
        <h1 className="text-lg">404 Página não encontrada.</h1>
      </main>
    </>
  );
}
