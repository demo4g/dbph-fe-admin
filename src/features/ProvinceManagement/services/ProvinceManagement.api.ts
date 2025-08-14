import axiosInstance from '~/configs/axios';
import { IProvince } from './ProvinceManagement.type';

export const getProvinceList = () => {
  const url = `/province/list-provinces`;
  return axiosInstance.post(url);
};

export const createProvince = (payload: IProvince) => {
  const url = `/province/create-province`;
  return axiosInstance.post(url, payload);
};

export const updateProvince = (payload: any) => {
  const url = `/province/update`;
  return axiosInstance.post(url, payload);
};

export const deleteProvince = (id: string) => {
  const url = `/province/delete`;
  return axiosInstance.post(url, { id });
};
