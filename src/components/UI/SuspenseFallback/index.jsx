import { Loader, Text } from '@mantine/core';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useEffect } from 'react';
import { SpinContainer } from './styled';

const SuspenseFallback = () => {
  useEffect(() => {
    NProgress.configure({ showSpinner: false });
    NProgress.start();

    return () => {
      NProgress.done();
    };
  });

  return (
    <SpinContainer>
      <Loader />
      <Text mt={12}>Đang tải ...</Text>
    </SpinContainer>
  );
};

export default SuspenseFallback;
