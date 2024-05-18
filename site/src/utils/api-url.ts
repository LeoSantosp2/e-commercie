export const apiUrl = async (pathname: string) => {
  const response = await fetch(`http://localhost:3000${pathname}`);

  const datas = await response.json();

  return datas.data;
};
