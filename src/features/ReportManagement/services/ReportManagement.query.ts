import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { IPagination, IQueryParams, IResponse } from '~/types';
import { getReportDetail, getReportFilter } from './ReportManagement.api';
import { IReportDetail, IReportFilter } from './ReportManagement.type';

/**
 * @query
 * @description Lấy danh sách báo cáo theo filter
 */
export const useGetReportFilter = ({
  options,
  params,
}: IQueryParams<IReportFilter> = {}): UseQueryResult<IPagination<IReportDetail>> => {
  const queryKey = params ? ['getReportFilter', params] : undefined;
  const _options: UseQueryOptions<IResponse<IPagination<IReportDetail>>, any, any> = {
    queryKey,
    queryFn: () => getReportFilter(params as IReportFilter),
    enabled: !!queryKey,
    select: (data) => data?.data,
    ...options,
  };

  return useQuery(_options);
};

/**
 * @query
 * @description Lấy chi tiết báo cáo
 */
export const useGetReportDetail = ({
  options,
  params,
}: IQueryParams<string> = {}): UseQueryResult<IReportDetail> => {
  const queryKey = params ? ['getReportDetail', params] : undefined;
  const _options: UseQueryOptions<IResponse<IReportDetail>, any, any> = {
    queryKey,
    queryFn: () => getReportDetail(params as string),
    enabled: !!queryKey,
    select: (data) => data?.data,
    ...options,
  };

  return useQuery(_options);
};
