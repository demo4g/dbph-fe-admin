import axios from 'axios';
import axiosInstance, { IOriginRequest } from '~/configs/axios';

import handleLogout from './logout';
import tokenManager from './tokenManager';
import { ILoginSuccessResponse } from '~/services/type';
import { IResponse } from '~/types';
interface IFailedQueue {
  resolve: Promise<any>;
  reject: Promise<any>;
}

// for multiple requests
let isRefreshing = false;
let failedQueue: IFailedQueue[] = [];

const processQueue = (error: Error | null, token: string = '') => {
  failedQueue.forEach((prom: any) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export const handleRefreshToken = async (originalRequest: IOriginRequest) => {
  if (isRefreshing) {
    return new Promise(function (resolve: any, reject: any) {
      failedQueue.push({ resolve, reject });
    })
      .then((token) => {
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = 'Bearer ' + token;
        }

        return axiosInstance(originalRequest);
      })
      .catch((err) => err);
  }

  originalRequest._retry = true;
  isRefreshing = true;

  return new Promise(function (resolve, reject) {
    const refresh_token = tokenManager.getRefreshToken();

    if (!refresh_token) return handleLogout();

    const url = `${process.env.REACT_APP_API_URL}/auth/relogin`;
    const payload = { refresh_token };
    const headers = { 'Content-Type': 'application/json' };

    axios
      .post<IResponse<ILoginSuccessResponse>>(url, payload, { headers })
      .then(({ data }) => {
        //Trường hợp refresh token hết hạn đẩy về trang đăng nhập
        if (!data?.data) handleLogout();

        tokenManager.setAccessToken(data.data.access_token);
        tokenManager.setRefreshToken(data.data.refresh_token);

        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = 'Bearer ' + data.data.access_token;
        }

        processQueue(null, data.data.access_token);
        resolve(axiosInstance(originalRequest));
      })
      .catch((err) => {
        console.log('refresh token err: ', err);
        handleLogout();
        // processQueue(err, null);
        // reject(err);
      })
      .finally(() => {
        isRefreshing = false;
      });
  });
};
