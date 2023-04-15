import {defineStore} from "pinia";
import {User} from "@/model/store/User";
import axios from "axios";

export const useUserListStore = defineStore('userListStore', {
  state: () => {
    return {userList: [] as User[]}
  },
  actions: {
    async fetchUserList() {
      let response;
      try {
        response = await axios.get("http://localhost:8080/api/v1/user/all");
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
