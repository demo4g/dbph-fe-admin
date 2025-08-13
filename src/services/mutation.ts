import { useMutation } from '@tanstack/react-query';
import { logout, uploadFile } from './api';
import handleLogout from '~/utils/logout';

export const useLogout = () => {
  return useMutation(logout, {
    onSuccess: (response) => {
      handleLogout();
      console.log('logout: ', response);
    },
  });
};

export const useUploadFile = () => {
  return useMutation(uploadFile, {
    onSuccess: (response) => {
      console.log('uploadFile: ', response);
    },
  });
};
