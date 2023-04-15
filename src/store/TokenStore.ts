import {defineStore} from "pinia";
import {LoginRequest} from "@/model/request/LoginRequest";
import axios from "axios";

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
        const response = await axios.post("http://localhost:8080/api/v1/auth/signin", request);
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
