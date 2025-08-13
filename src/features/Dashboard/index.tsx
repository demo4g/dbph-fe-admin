import { Box } from '@mantine/core';
import { Helmet } from 'react-helmet';

export interface IDashboardProps {}

export default function Dashboard(props: IDashboardProps) {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <Box>Dashboard</Box>
    </>
  );
}
