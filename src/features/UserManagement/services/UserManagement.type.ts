import { IBaseFilter } from '~/types';
import { EUSER_STATUS } from './UserManagement.enum';

export interface IUserManagementFilter extends IBaseFilter {
  status?: EUSER_STATUS;
  date?: string;
  search?: string;
}

export interface IUserItem {
  _id: string;
  phone: string;
  email: string;
  name: string;
  status: EUSER_STATUS;
  created_at: string;
}
