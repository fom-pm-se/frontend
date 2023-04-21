import {defineStore} from "pinia";
import {User} from "@/model/store/User";
import axios from "axios";
import {UpdateUserRequest} from "@/model/request/UpdateUserRequest";
import {requestUserChange} from "@/service/UserService";
import {API_GET_CURRENT_USER} from "@/axios/ApiConstants";

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {user: {} as User, isUserLoaded: false, isUserLoggedIn: false}
  },
  actions: {
    async fetchUser() {
      let response;
      try {
        response = await axios.get(API_GET_CURRENT_USER);
        if (response.status === 200 && response.data) {
          this.user = response.data as User;
          this.isUserLoaded = true;
          this.isUserLoggedIn = true;
        }
        return Promise.resolve();
      } catch (e) {
        this.flushUser();
        return Promise.reject();
      }
    },
    flushUser() {
      this.user = {} as User;
      this.isUserLoaded = false;
      this.isUserLoggedIn = false;
    },
    isAdministrator() {
        return this.user.role === 'ADMIN';
    },
    async updateUser(updateUserRequest: UpdateUserRequest) {
      try {
        const response = await requestUserChange(updateUserRequest);
        this.user = response as User;
        await this.fetchUser();
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    },
    getCopyOfUser() : User {
      return {...this.user};
    }
  },
});
