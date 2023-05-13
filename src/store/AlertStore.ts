import { defineStore } from "pinia";
import {Alert} from "@/model/store/Alert";

export const useAlertStore = defineStore('alertStore', {
  state: () => ({alerts: [] as Alert[], showSnackbar: false, snackbarMessage: '' as string}),
  actions: {
    clearAlerts() {
      while (this.alerts.length > 0) {
        this.alerts.pop();
      }
    },
    pushAlert(alert: Alert) {
      this.alerts.push(alert);
    },
    setAlert(alert: Alert) {
      this.clearAlerts();
      this.pushAlert(alert);
    },
    showSnackbarMessage(message: string) {
      this.snackbarMessage = message;
      this.showSnackbar = true;
    },
    hideSnackbarMessage()
    {
      this.snackbarMessage = '';
      this.showSnackbar = false;
    }
  }
})
