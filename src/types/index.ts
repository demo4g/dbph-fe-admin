import { UseQueryOptions } from '@tanstack/react-query';
import { EApiStatusCode } from '~/services';

export interface IPagination<T> {
  data: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export interface IResponse<T = any> {
  errorCode: EApiStatusCode;
  data: T;
  message: string;
  describe?: string[];
  metadata?: any;
}

export interface IResponsePagination<T> extends IResponse<IPagination<T>> {}

export interface IQueryParams<TParams = any, TOptions = UseQueryOptions<any, any, any>> {
  options?: TOptions;
  params?: TParams;
}

export interface IBaseFilter {
  page: number;
  limit: number;
}

export interface IBaseModalRef {
  open: () => void;
  close: () => void;
}

export interface IIconProps {
  size?: string | number;
  color?: string;
}
