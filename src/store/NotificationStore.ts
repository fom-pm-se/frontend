import {defineStore} from "pinia";
import {Notification} from "@/model/store/Notification";
import axios, {AxiosResponse} from "axios";
import {API_GET_NOTIFICATIONS, API_GET_NOTIFICATIONS_COUNT, API_SET_NOTIFICATION_READ} from "@/axios/ApiConstants";

export const useNotificationStore = defineStore('notificationStore', {
  state: () => (
    {notifications: [] as Notification[], notificationsCount: 0 as number, isLoading: false as boolean}
  ),
  actions: {
    async getNumberOfUnreadNotifications() {
      this.isLoading = true;
      const response = await axios.get<number>(API_GET_NOTIFICATIONS_COUNT);
      if (response.status === 200) {
        this.notificationsCount = response.data;
        this.isLoading = false;
        return Promise.resolve(response.data);
      }
      this.isLoading = false;
      return Promise.reject(response.data);
    },
    async fetchNotifications() {
      this.isLoading = true;
      const response = await axios.get<Notification[]>(API_GET_NOTIFICATIONS);
      if (response.status === 200) {
        this.notifications = response.data;
        this.isLoading = false;
        return Promise.resolve(response.data);
      }
      this.isLoading = false;
      return Promise.reject(response.data);
    },
    async setNotificationRead(id: number | string): Promise<boolean> {
      const response: AxiosResponse<Notification> = await axios.put(API_SET_NOTIFICATION_READ + id + "/");
      if (response.status === 200) {
        return Promise.resolve(response.data.read);
      }
      return Promise.reject(response.data);
    }
  },
  getters: {
    numberOfUnreadNotifications(): number {
      return this.notifications.filter(n => !n.read).length;
    }
  }
});
