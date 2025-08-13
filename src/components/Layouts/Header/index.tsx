import { Group, Image, Loader, LoadingOverlay, Stack, Text, UnstyledButton } from '@mantine/core';
import { useLogger } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { IoLogOutOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';
import logo from '~/assets/images/logo.png';
import { PATHS } from '~/constants';
import { useGetUserInfo, useLogout } from '~/services';
import { Wrapper } from './styled';
import Timer from './Timer';

export interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
  const theme = useTheme();
  const { data: user } = useGetUserInfo();
  const { mutate: logout, isLoading } = useLogout();

  useLogger('user', [user]);

  return (
    <>
      <LoadingOverlay
        visible={isLoading}
        loaderProps={{
          children: (
            <Stack align="center">
              <Loader />
              <Text>Đang đăng xuất...</Text>
            </Stack>
          ),
        }}
      />

      <Wrapper>
        <Group gap={10}>
          <Link to={PATHS.HOME}>
            <Image src={logo} h={40} />
          </Link>
          <Text fz={23} c={theme?.colors.GRAY} tt="uppercase">
            Hệ thống quản trị báo cáo
          </Text>
        </Group>

        <Group>
          <Timer />

          <UnstyledButton
            display="flex"
            onClick={() => {
              modals.openConfirmModal({
                title: 'Đăng xuất tài khoản',
                size: 320,
                children: <Text>Bạn muốn thoát tài khoản?</Text>,
                onConfirm: logout,
              });
            }}
          >
            <IoLogOutOutline size={28} color={theme?.colors.GRAY} />
          </UnstyledButton>
        </Group>
      </Wrapper>
    </>
  );
}
