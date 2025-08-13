import { Box } from '@mantine/core';
import { Helmet } from 'react-helmet';

export interface ITransactionManagementProps {}

/**
 * @page
 * @description Quản lý giao dịch
 * @createdAt 12/08/2025
 */
export default function TransactionManagement(props: ITransactionManagementProps) {
  return (
    <>
      <Helmet>
        <title>Quản lý giao dịch</title>
      </Helmet>

      <Box>Quản lý giao dịch</Box>
    </>
  );
}
