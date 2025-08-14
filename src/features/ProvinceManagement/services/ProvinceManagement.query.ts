import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { IQueryParams, IResponse } from '~/types';
import { getProvinceList } from './ProvinceManagement.api';
import { IProvince } from './ProvinceManagement.type';

/**
 * @query
 * @description Lấy danh sách Tỉnh/Thành phố
 */
export const useGetProvinceList = ({ options }: IQueryParams = {}): UseQueryResult<IProvince[]> => {
  const _options: UseQueryOptions<IResponse<IProvince[]>, any, any> = {
    queryKey: ['getProvinceList'],
    queryFn: getProvinceList,
    select: (data) =>
      data?.data
        ?.filter((e) => e.is_enable)
        ?.sort((a, b) => {
          // Nếu priority = 0 thì coi như vô cực để đưa xuống cuối
          const pa = a.priority === 0 ? Infinity : a.priority;
          const pb = b.priority === 0 ? Infinity : b.priority;
          return pa - pb;
        }),
    ...options,
  };

  return useQuery(_options);
};
