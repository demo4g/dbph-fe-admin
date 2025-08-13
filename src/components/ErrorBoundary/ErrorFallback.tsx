import { Button, Image, Stack, Text } from '@mantine/core';
import { FallbackProps } from 'react-error-boundary';
import ErrorImage from '~/assets/images/500.png';
import { sessionStorageKeys } from '~/constants';
import { utils } from '~/utils';
import { Wrapper } from './styled';

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  //Handle error when deploy new version
  if (error?.name === 'ChunkLoadError') {
    const hasRefresh = utils.storage.session.get(sessionStorageKeys.retryChunkError) || false;

    if (hasRefresh !== true) {
      utils.storage.session.set(sessionStorageKeys.retryChunkError, true);
      window.location.reload();
      return null;
    }
  }

  return (
    <Wrapper>
      <Stack gap={32}>
        <Image alt="" src={ErrorImage} maw={946} />

        <Stack align="center">
          <Text size="headline-large" fw={500}>
            OOPS!!
          </Text>

          <Text size="title-large">Đã có lỗi xảy ra :(</Text>

          <Button onClick={() => (window.location.href = '/')}>Về trang chủ</Button>
        </Stack>
      </Stack>
    </Wrapper>
  );
};

export default ErrorFallback;
