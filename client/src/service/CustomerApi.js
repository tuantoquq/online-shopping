import axios from "axios";
import TokenService from "./TokenService";
import { BASE_API_URL, ROLE } from '../constants/Constants';

const instance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken(ROLE.customer);
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== (BASE_API_URL + "/customer/login") && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await axios.post(BASE_API_URL + "/customer/refresh-token",{},{
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${TokenService.getLocalRefreshToken(ROLE.customer)}` 
            }
          });
          if (rs?.data?.status === 0) {
            const accessToken = rs?.data?.data?.token;
            const refreshToken = rs?.data?.data?.refreshToken;

            TokenService.updateLocalAccessToken(ROLE.customer, accessToken);
            TokenService.updateLocalRefreshToken(ROLE.customer, refreshToken);
          } else {
            console.log("Refresh token api was wrong!");
            localStorage.clear();
            window.location = '/customer/login';
          }
          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);
export default instance;