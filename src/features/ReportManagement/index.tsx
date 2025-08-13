import { Box } from '@mantine/core';
import { Helmet } from 'react-helmet';

export interface IReportManagementProps {}

/**
 * @page
 * @description Quản lý báo cáo
 * @createdAt 12/08/2025
 */
export default function ReportManagement(props: IReportManagementProps) {
  return (
    <>
      <Helmet>
        <title>Quản lý báo cáo</title>
      </Helmet>

      <Box>Quản lý báo cáo</Box>
    </>
  );
}
