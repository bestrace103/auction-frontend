import axios, { AxiosRequestConfig } from 'axios';
// config
import { API_URL } from 'src/config-global';
import { enqueueSnackbar } from 'notistack';
import { signout } from 'src/store/reducers/auth';
import { store } from 'src/store';
// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: API_URL });

axiosInstance.interceptors.request.use(
  (config: any) => {
    config.baseURL = API_URL;
    const state = store.getState() as any;
    const accessToken = state.auth.token;
    if (accessToken) {
      config.headers['x-auth-token'] = accessToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response && response.status === 400) {
      enqueueSnackbar(response.data, { variant: 'error' });
    } else if (response && response.status === 401) {
      store.dispatch(signout());
    } else if (response && response.status === 402) {
      enqueueSnackbar(response.data, { variant: 'warning' });
    } else if (response && response.status === 429) {
      enqueueSnackbar(response.data, { variant: 'error' });
    } else {
      console.log(response);
    }
  }
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  auctions: {
    list: '/auction/get-bid-state',
    request: '/auction/get-auction-request',
  }
};
