import {defineStore} from "pinia";
import {User} from "@/model/store/User";
import axios from "axios";
import {API_GET_ALL_USER} from "@/axios/ApiConstants";

export const useUserListStore = defineStore('userListStore', {
  state: () => {
    return {userList: [] as User[]}
  },
  actions: {
    async fetchUserList() {
      let response;
      try {
        response = await axios.get(API_GET_ALL_USER);
        if (response.status === 200 && response.data) {
          this.userList = response.data as User[];
        }
      } catch (e) {
        this.flushUserList();
      }
    },
    flushUserList() {
      this.userList = [] as User[];
    }
  },
  getters: {
    isUserListLoaded(): boolean {
      return this.userList.length > 0;
    }
  }
});
