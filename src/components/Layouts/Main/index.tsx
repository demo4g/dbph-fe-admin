import { Box } from '@mantine/core';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from 'styled-components';
import AuthElement from '~/components/AuthElement';
import SuspenseFallback from '~/components/UI/SuspenseFallback';
import Header from '../Header';
import Sidebar from '../Siderbar';

function MainLayout() {
  const theme = useTheme();

  return (
    <AuthElement>
      <Header />

      <Box
        style={{
          height: `calc(100vh - ${theme?.sizes.HEADER_HEIGHT})`,
          overflowY: 'auto',
          overflowX: 'hidden',
          display: 'flex',
        }}
      >
        <Sidebar />

        <Box
          bg={theme?.colors.BACKGROUND_SECONDARY}
          flex={1}
          px={16}
          pt={16}
          pos="relative"
          style={{ overflow: 'hidden', height: `calc(100vh - ${theme?.sizes.HEADER_HEIGHT})` }}
        >
          <Suspense fallback={<SuspenseFallback />}>
            <Outlet />
          </Suspense>
        </Box>
      </Box>
    </AuthElement>
  );
}

export default MainLayout;
