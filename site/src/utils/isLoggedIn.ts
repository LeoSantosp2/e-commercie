import Cookies from 'js-cookie';

export const isLoggedIn = () => {
  const token = Cookies.get('tokenAuth');

  if (!token) return false;

  return true;
};
