import axiosInstance from '~/configs/axios';

export const getUserInfo = () => {
  const url = `/me/profile/profile`;
  return axiosInstance.post(url);
};

export const logout = () => {
  const url = `/auth/logout`;
  return axiosInstance.post(url);
};

export const uploadFile = (file: File) => {
  const url = `/files/upload`;
  const formData = new FormData();

  formData.append('file', file);

  return axiosInstance.post(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
