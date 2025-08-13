import { Box } from '@mantine/core';
import { Helmet } from 'react-helmet';

export interface IAdministrativeManagementProps {}

/**
 * @page
 * @description Quản lý đơn vị hành chính
 * @createdAt 12/08/2025
 */
export default function AdministrativeManagement(props: IAdministrativeManagementProps) {
  return (
    <>
      <Helmet>
        <title>Quản lý đơn vị hành chính</title>
      </Helmet>

      <Box>Quản lý đơn vị hành chính</Box>
    </>
  );
}
