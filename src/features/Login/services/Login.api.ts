import axiosInstance from '~/configs/axios';
import { ILoginPayload } from './Login.type';

export const login = (payload: ILoginPayload) => {
  const url = `/auth/login`;
  return axiosInstance.post(url, payload);
};
