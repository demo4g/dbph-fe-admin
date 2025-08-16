import axiosInstance from '~/configs/axios';
import { utils } from '~/utils';
import { IReportFileUpload, IReportFilter } from './ReportManagement.type';

export const getReportDetail = (id: string) => {
  const url = `/report/detail`;
  return axiosInstance.post(url, { id });
};

export const getReportFilter = (filter: IReportFilter) => {
  const url = `/report/list`;
  return axiosInstance.post(url, filter);
};

export const createReport = (payload: any) => {
  const url = `/report/create`;
  return axiosInstance.post(url, payload);
};

export const updateReport = (payload: any) => {
  const url = `/report/update`;
  return axiosInstance.post(url, payload);
};

export const uploadFileReport = ({
  config,
  payload,
}: {
  config: any;
  payload: IReportFileUpload;
}) => {
  const formData = utils.format.objectToFormData(payload);
  const url = `/report/upload`;
  return axiosInstance.post(url, formData, config);
};
