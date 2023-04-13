import {defineStore} from "pinia";

export const useTokenStore = defineStore('tokenStore', {
  state: () => {
    if (localStorage.getItem('token')) {
      let token: string = localStorage.getItem('token') as string;
      return {token: token}
    }
    return {token: "" as string}
  }
});
