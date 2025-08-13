import { Box } from '@mantine/core';
import { Helmet } from 'react-helmet';

export interface IWardManagementProps {}

/**
 * @page
 * @description Quản lý Phường/Xã
 * @createdAt 12/08/2025
 */
export default function WardManagement(props: IWardManagementProps) {
  return (
    <>
      <Helmet>
        <title>Quản lý Phường/Xã</title>
      </Helmet>

      <Box>Quản lý Phường/Xã</Box>
    </>
  );
}
