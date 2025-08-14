import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { IPagination, IQueryParams, IResponse } from '~/types';
import { getUserFilter } from './UserManagement.api';
import { IUserItem, IUserManagementFilter } from './UserManagement.type';

/**
 * @query
 * @description Lấy danh sách người dùng theo filter
 */
export const useGetUserFilter = ({
  options,
  params,
}: IQueryParams<IUserManagementFilter> = {}): UseQueryResult<IPagination<IUserItem>> => {
  const queryKey = params ? ['getUserFilter', params] : undefined;
  const _options: UseQueryOptions<IResponse<IPagination<IUserItem>>, any, any> = {
    queryKey,
    queryFn: () => getUserFilter(params as IUserManagementFilter),
    enabled: !!queryKey,
    select: (data) => data?.data,
    ...options,
  };

  return useQuery(_options);
};
