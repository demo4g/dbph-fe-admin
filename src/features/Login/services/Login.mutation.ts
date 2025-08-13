import { useMutation } from '@tanstack/react-query';
import { login } from './Login.api';

export const useLogin = () => {
  return useMutation(login, {
    onSuccess: (response) => {
      console.log('login: ', response);
    },
  });
};
