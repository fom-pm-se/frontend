import { defineStore } from "pinia";
import {Alert} from "@/model/store/Alert";

export const useAlertStore = defineStore('alertStore', {
  state: () => ({alerts: [] as Alert[]}),
  actions: {
    clearAlerts() {
      while (this.alerts.length > 0) {
        this.alerts.pop();
      }
    },
    pushAlert(alert: Alert) {
      this.alerts.push(alert);
    }
  }
})
