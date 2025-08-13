import { Box } from '@mantine/core';
import { Helmet } from 'react-helmet';

export interface IProvinceManagementProps {}

/**
 * @page
 * @description Quản lý Tỉnh/Thành phố
 * @createdAt 12/08/2025
 */
export default function ProvinceManagement(props: IProvinceManagementProps) {
  return (
    <>
      <Helmet>
        <title>Quản lý Tỉnh/Thành phố</title>
      </Helmet>

      <Box>Quản lý Tỉnh/Thành phố</Box>
    </>
  );
}
