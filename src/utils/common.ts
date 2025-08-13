import { MESSAGES } from '~/constants';

export const alertTinhNangDangPhatTrien = () => window.alert(MESSAGES.FEATURE_UNDER_DEVELOPMENT);

export const delay = (ms: number = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

export const transformInputNumber = (value: any, originalValue: any) =>
  originalValue === '' || originalValue === null ? undefined : value;
