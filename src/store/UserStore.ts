import {defineStore} from "pinia";
import {User} from "@/model/store/User";
import axios from "axios";

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {user: {} as User, isUserLoaded: false, isUserLoggedIn: false}
  },
  actions: {
    async fetchUser() {
      let response;
      try {
        response = await axios.get("http://localhost:8080/api/v1/user/me");
        if (response.status === 200 && response.data) {
          this.user = response.data as User;
          this.isUserLoaded = true;
          this.isUserLoggedIn = true;
        }
      } catch (e) {
        this.flushUser();
      }
    },
    flushUser() {
      this.user = {} as User;
      this.isUserLoaded = false;
      this.isUserLoggedIn = false;
    },
    isAdministrator() {
        return this.user.role === 'ADMIN';
    }
  }
});
