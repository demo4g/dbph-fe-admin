import axiosInstance from '~/configs/axios';

export const getUserInfo = () => {
  const url = `/me/profile/profile`;
  return axiosInstance.post(url);
};

export const logout = () => {
  const url = `/auth/logout`;
  return axiosInstance.post(url);
};
