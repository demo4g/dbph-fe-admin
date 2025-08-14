import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { IQueryParams, IResponse } from '~/types';
import { getWardList } from './WardManagement.api';
import { IWard } from './WardManagement.type';

/**
 * @query
 * @description Lấy danh sách Tỉnh/Thành phố
 */
export const useGetWardList = ({ options, params }: IQueryParams<string> = {}): UseQueryResult<
  IWard[]
> => {
  const queryKey = params ? ['getWardList', params] : undefined;
  const _options: UseQueryOptions<IResponse<IWard[]>, any, any> = {
    queryKey,
    queryFn: () => getWardList(params as string),
    enabled: !!queryKey,
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
