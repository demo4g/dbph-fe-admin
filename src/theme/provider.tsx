import { MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { mantineTheme } from '.';
import { GlobalStyle } from './globalStyle';

export interface IMaintineThemeProviderProps extends React.PropsWithChildren {}

export default function MaintineThemeProvider({ children }: IMaintineThemeProviderProps) {
  return (
    <MantineProvider theme={mantineTheme} classNamesPrefix="nvt">
      <ModalsProvider modalProps={{ size: 440 }} labels={{ confirm: 'Xác nhận', cancel: 'Hủy' }}>
        <DatesProvider settings={{ locale: 'vi-VN' }}>{children}</DatesProvider>
      </ModalsProvider>
      <GlobalStyle />
      <Notifications position="top-right" />
    </MantineProvider>
  );
}
