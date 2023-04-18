import axios from "axios";
import {API_BASE_URL} from "@/properties";
import {useTokenStore} from "@/store/TokenStore";

export function registerAxios() {
  axios.defaults.baseURL = API_BASE_URL;

  axios.interceptors.request.use(
    (config) => {
      const tokenStore = useTokenStore();
      const token = tokenStore.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }
  );
}
