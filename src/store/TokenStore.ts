import {defineStore} from "pinia";
import {LoginRequest} from "@/model/request/LoginRequest";
import axios from "axios";
import {API_SIGN_IN} from "@/axios/ApiConstants";

export const useTokenStore = defineStore('tokenStore', {
  state: () => {
    if (localStorage.getItem('token')) {
      const token: string = localStorage.getItem('token') as string;
      return {token: token}
    }
    return {token: "" as string}
  },
  actions: {
    async authenticate(request: LoginRequest) {
      try {
        this.flushToken();
        const response = await axios.post(API_SIGN_IN, request);
        this.token = response.data.token;
      } catch (e) {
        return Promise.reject(e);
      }
    },
    flushToken() {
      this.token = "";
    }
  }
});
