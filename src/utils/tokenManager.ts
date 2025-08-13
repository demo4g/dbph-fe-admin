import { localStorageKeys } from '~/constants';
import { utils } from '.';
import { decryptDES, encryptDES } from './DES.encryt';

const tokenManager = () => {
  let accessToken: string | undefined = utils.storage.local.get(localStorageKeys.accessToken);
  let refreshToken: string | undefined = utils.storage.local.get(localStorageKeys.refreshToken);

  const getAccessToken = (): string | undefined => {
    if (!accessToken) return undefined;
    try {
      if (process.env.NODE_ENV === 'development') {
        return accessToken;
      } else {
        return decryptDES(accessToken);
      }
    } catch {
      return undefined;
    }
  };

  const setAccessToken = (token: string): void => {
    if (process.env.NODE_ENV === 'development') {
      accessToken = token;
    } else {
      accessToken = encryptDES(token);
    }
    utils.storage.local.set(localStorageKeys.accessToken, accessToken);
  };

  const removeAccessToken = (): void => {
    accessToken = undefined;
    localStorage.removeItem(localStorageKeys.accessToken);
  };

  const getRefreshToken = () => {
    if (!refreshToken) return undefined;
    if (process.env.NODE_ENV === 'development') {
      return refreshToken;
    } else {
      return decryptDES(refreshToken);
    }
  };

  const setRefreshToken = (token: string): void => {
    if (process.env.NODE_ENV === 'development') {
      refreshToken = token;
    } else {
      refreshToken = encryptDES(token);
    }
    utils.storage.local.set(localStorageKeys.refreshToken, refreshToken);
  };

  const removeRefreshToken = (): void => {
    refreshToken = undefined;
    localStorage.removeItem(localStorageKeys.refreshToken);
  };

  return {
    getAccessToken,
    setAccessToken,
    removeAccessToken,
    getRefreshToken,
    setRefreshToken,
    removeRefreshToken,
  };
};

export default tokenManager();
