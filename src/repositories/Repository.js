import axios from 'axios';
import { getCookies } from '@/common/helpers/cookies';

const baseDomain = process.env.VUE_APP_API_URL;
const baseURL = `${baseDomain}/v1`;

const axiosInstance = axios.create({
  baseURL,
});

export const axiosInterceptors = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = getCookies('access_token');
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalConfig = error.config;
      if (error.response.status === 401 && originalConfig.url.includes('auth/refresh')) {
        return Promise.reject(error);
      }
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        const refreshToken = getCookies('refresh_token');
        if (refreshToken) {
          const response = await store.dispatch('auth/refreshToken', { token: refreshToken });
          if (response.data && response.status === 200) {
            const accessToken = response.data.access_token;
            originalConfig.headers.Authorization = `Bearer ${accessToken}`;
            return axiosInstance(originalConfig);
          }
        }
      }
      return Promise.reject(error);
    },
  );
};

export default axiosInstance;
