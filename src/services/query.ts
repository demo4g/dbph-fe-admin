import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { IQueryParams } from '~/types';
import { getUserInfo } from './api';
import { IUserInfo } from './type';

export const useGetUserInfo = ({ options }: IQueryParams = {}): UseQueryResult<IUserInfo> => {
  const _options = {
    queryKey: ['getUserInfo'],
    queryFn: getUserInfo,
    select: (data: any) => data.data,
    ...options,
  };
  return useQuery(_options);
};
