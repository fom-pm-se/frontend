import { defineStore } from "pinia";

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
