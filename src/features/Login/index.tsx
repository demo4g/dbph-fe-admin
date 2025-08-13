import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Image,
  LoadingOverlay,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { MESSAGES, PATHS } from '~/constants';
import { trimObject } from '~/utils';
import tokenManager from '~/utils/tokenManager';
import { ILoginPayload, useLogin } from './services';
import { LoginContentWrapper, LoginWrapper } from './styled';
import { Helmet } from 'react-helmet';
import logo from '~/assets/images/logo.png';

export interface ILoginProps {}

/**
 * @page
 * @description Màn hình đăng nhập
 */
export default function Login(props: ILoginProps) {
  const { mutate: login, isLoading } = useLogin();

  const defaultValues: ILoginPayload = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required(MESSAGES.REQUIRED),
    password: Yup.string().required(MESSAGES.REQUIRED),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const handleLogin = (values: any) => {
    login(trimObject(values), {
      onSuccess: (response) => {
        const { refresh_token, access_token } = response.data;
        tokenManager.setAccessToken(access_token);
        tokenManager.setRefreshToken(refresh_token);
        window.location.replace(PATHS.HOME);
      },
    });
  };

  return (
    <>
      <Helmet>
        <title>Đăng nhập</title>
      </Helmet>

      <LoginWrapper>
        <LoginContentWrapper>
          <Box w={400} pos="relative">
            <Stack component="form" onSubmit={handleSubmit(handleLogin)} py={24} px={16}>
              <LoadingOverlay visible={false} />

              <Image src={logo} w={240} mx="auto" />

              <Box>
                <Text ta="center" fw={500} fz={20} mb={8}>
                  Đăng nhập quản trị
                </Text>

                <Text ta="center" fz={14}>
                  Liên hệ quản trị viên để đăng nhập vào hệ thống
                </Text>
              </Box>

              <TextInput
                {...register('username')}
                label="Tài khoản"
                placeholder="Nhập tài khoản"
                error={errors?.username?.message}
              />

              <PasswordInput
                {...register('password')}
                label="Mật khẩu"
                placeholder="Nhập mật khẩu"
                error={errors?.password?.message}
              />

              <Button type="submit" loading={isLoading}>
                Đăng nhập
              </Button>
            </Stack>
          </Box>
        </LoginContentWrapper>
      </LoginWrapper>
    </>
  );
}
