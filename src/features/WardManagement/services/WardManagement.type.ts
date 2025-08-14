import { IProvince } from '~/features/ProvinceManagement/services';

export interface IWard {
  _id: string;
  code: string;
  name: string;
  priority: number;
  version: number;
  is_enable: boolean;
  parent: IProvince;
}
