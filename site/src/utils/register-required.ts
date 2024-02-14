import isEmail from 'validator/lib/isEmail';
import { toast } from 'react-toastify';

import axios from '../services/axios';

export const registerRequired = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string,
) => {
  try {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return toast.error('Os campos não podem estar vazios.');
    }

    if (!isEmail(email)) {
      return toast.error('E-mail inválido.');
    }

    if (password.length < 8 || confirmPassword.length < 8) {
      return toast.error('A senha deve ter no mínimo 8 caracteres.');
    }

    if (password !== confirmPassword) {
      return toast.error('As senhas não são iguais.');
    }

    const request = await axios
      .post('/users', {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        confirm_password: confirmPassword,
      })
      .catch((err) => {
        return err.response;
      });

    if (request.status === 400) {
      return toast.error(request.data);
    }

    toast.success('Usuário cadastrado com sucesso.');

    return request.status;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
};
