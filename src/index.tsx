import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App';
import queryClient from './configs/react-query';
import reportWebVitals from './reportWebVitals';
import { BREAKPOINTS, COLORS, SHADOWS, SIZES } from './theme';
import MaintineThemeProvider from './theme/provider';

dayjs.locale('vi');
dayjs.extend(customParseFormat);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const theme = {
  colors: COLORS,
  sizes: SIZES,
  shadows: SHADOWS,
  breakpoints: BREAKPOINTS,
};

root.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <MaintineThemeProvider>
        <App />
      </MaintineThemeProvider>
    </ThemeProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
