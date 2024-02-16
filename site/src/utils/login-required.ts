import isEmail from 'validator/lib/isEmail';
import Cookie from 'js-cookie';
import { toast } from 'react-toastify';

import axios from '../services/axios';

export const loginRequired = async (email: string, password: string) => {
  try {
    if (!email || !password) {
      return toast.error('Os campos não podem estar vazios.');
    }

    if (!isEmail(email)) {
      return toast.error('E-mail inválido.');
    }

    const request = await axios
      .post('/login', {
        email: email,
        password: password,
      })
      .catch((err) => {
        return err.response;
      });

    if (request.status === 400) {
      return toast.error(request.data);
    }

    Cookie.set('tokenAuth', request.data.token);

    toast.success('Login efetuado com sucesso.');
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
};
