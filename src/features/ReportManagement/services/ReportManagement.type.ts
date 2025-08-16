import { IBaseFilter } from '~/types';
import { EREPORT_STATUS } from './ReportManagement.enum';

export interface IReportFilter extends IBaseFilter {
  search?: string;
  year?: number;
  status?: EREPORT_STATUS;
  province?: string;
  ward?: string;
}

export interface IReportItem {
  _id: string;
  name: string;
  code: string;
  province: string;
  year: number;
  price: number;
  file_size: number;
  status: EREPORT_STATUS;
  created_at: string;
  ward: string;
}

export interface IReportDetail extends IReportItem {
  file: string;
  description: string;
  thumbnail: string;
  download_count: number;
}

export interface IReportFileUpload {
  chunkIndex: number;
  fileChunk: Blob;
  fileName: string;
}
