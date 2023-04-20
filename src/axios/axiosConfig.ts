import axios from "axios";
import {API_BASE_URL} from "@/properties";
import {useTokenStore} from "@/store/TokenStore";
import {useAlertStore} from "@/store/AlertStore";

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

  axios.interceptors.response.use(
    (response) => {
      if (response.status !== 200) {
        const alertStore = useAlertStore();
        if (response.data.errorMessage) {
          alertStore.setAlert({
            type: "error",
            message: response.data.errorMessage,
            title: "Fehler."
          });
        }
      }
      return response;
    });
}
