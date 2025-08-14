import axiosInstance from '~/configs/axios';

export const getWardList = (parent_id: string) => {
  const url = `/province/list-wards`;
  return axiosInstance.post(url, { parent_id });
};

export const createWard = (payload: any) => {
  const url = `/province/create-ward`;
  return axiosInstance.post(url, payload);
};

export const updateWard = (payload: any) => {
  const url = `/province/update`;
  return axiosInstance.post(url, payload);
};

export const deleteWard = (id: string) => {
  const url = `/province/delete`;
  return axiosInstance.post(url, { id });
};
