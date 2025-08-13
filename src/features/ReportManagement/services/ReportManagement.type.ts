export interface IReportFilter {
  keyword?: string;
  year?: string;
  status?: string;
  province?: string;
  ward?: string;
}

export interface IReportItem {
  code: string;
  name: string;
  image?: string;
  year: number;
  price?: number;
  status: boolean;
}

export interface IReportDetail extends IReportItem {
  file: any;
  province: string;
  ward?: string;
  description?: string;
}
