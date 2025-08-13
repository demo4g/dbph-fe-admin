import { Box } from '@mantine/core';
import { Helmet } from 'react-helmet';

export interface IUserManagementProps {}

/**
 * @page
 * @description Quản lý người dùng
 * @createdAt 12/08/2025
 */
export default function UserManagement(props: IUserManagementProps) {
  return (
    <>
      <Helmet>
        <title>Quản lý người dùng</title>
      </Helmet>

      <Box>Quản lý người dùng</Box>
    </>
  );
}
