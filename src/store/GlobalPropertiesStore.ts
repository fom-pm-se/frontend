import { defineStore } from "pinia";
import {Alert} from "@/model/store/Alert";
import {User} from "@/model/store/User";

export const useGlobalPropertiesStore = defineStore('globalProperties', {
  state: () => {
    return {isLoading: false as boolean}
  },
  actions: {
    setLoading(isLoading: boolean) {
      this.isLoading = isLoading;
    }
  }
})
