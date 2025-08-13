import { useMutation } from '@tanstack/react-query';
import { logout } from './api';
import handleLogout from '~/utils/logout';

export const useLogout = () => {
  return useMutation(logout, {
    onSuccess: (response) => {
      handleLogout();
      console.log('logout: ', response);
    },
  });
};
