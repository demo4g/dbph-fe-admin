import { PATHS, SIDEBAR_NAME } from '~/constants';

export const sidebarData = [
  {
    // Dashboard
    title: SIDEBAR_NAME.DASHBOARD,
    path: PATHS.DASHBOARD,
  },
  {
    // Quản lý báo cáo
    title: SIDEBAR_NAME.REPORT_MANAGEMENT,
    path: PATHS.REPORT_MANAGEMENT,
  },
  {
    // Quản lý giao dịch
    title: SIDEBAR_NAME.TRANSACTION_MANAGEMENT,
    path: PATHS.TRANSACTION_MANAGEMENT,
  },
  {
    // Quản lý người dùng
    title: SIDEBAR_NAME.USER_MANAGEMENT,
    path: PATHS.USER_MANAGEMENT,
  },
  {
    // Quản lý đơn vị hành chính
    title: SIDEBAR_NAME.ADMINISTRATIVE_MANAGEMENT,
    path: PATHS.ADMINISTRATIVE_MANAGEMENT,
  },
];
