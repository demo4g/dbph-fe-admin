import axiosInstance from '~/configs/axios';
import { IUserManagementFilter } from './UserManagement.type';

export const getUserFilter = (filter: IUserManagementFilter) => {
  const url = `/user/list`;
  return axiosInstance.post(url, filter);
};
