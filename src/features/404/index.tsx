import { Button, Image, Stack, Text } from '@mantine/core';
import notfoundbg from '~/assets/images/404.png';
import { Wrapper } from './styled';

const NotFound404 = () => {
  return (
    <Wrapper>
      <Stack gap={32}>
        <Image alt="" src={notfoundbg} maw={946} />

        <Stack align="center">
          <Text size="headline-large" fw={500}>
            Địa chỉ bạn truy cập không tồn tại.
          </Text>

          <Button onClick={() => (window.location.href = '/')}>Về trang chủ</Button>
        </Stack>
      </Stack>
    </Wrapper>
  );
};

export default NotFound404;
