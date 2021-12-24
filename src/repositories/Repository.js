import axios from 'axios';
import Cookies from 'js-cookie';

const baseDomain = process.env.VUE_APP_API_URL;
const baseURL = `${baseDomain}/v1`;

const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use(
  (config) => {
    if (Cookies.get('access_token')) {
      config.headers.Authorization = `Bearer ${Cookies.get('access_token')}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default instance;
