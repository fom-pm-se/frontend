import {defineStore} from "pinia";
import {User} from "@/model/store/User";
import axios from "axios";
import {Alert} from "@/model/store/Alert";
import {useAlertStore} from "@/store/AlertStore";
import {getCurrentUser} from "@/service/AuthenticationService";
export const useUserStore = defineStore('userStore', {
  state: () => {
    return {user: {} as User, isUserLoaded: false, isUserLoggedIn: false}
  },
  actions: {
    fetchUser() {
      getCurrentUser().then((response) => {
        if (response) {
          this.user = response as User;
          this.isUserLoaded = true;
          this.isUserLoggedIn = true;
        }
      }).catch((reason: string) => {
        const alert: Alert = {
            title: "Du wurdest abgemeldet.",
            message: reason,
            type: "error"
        }
        const alertStore = useAlertStore();
        alertStore.clearAlerts();
        alertStore.pushAlert(alert);
      });
    },
    flushUser() {
        this.user = {} as User;
        this.isUserLoaded = false;
        this.isUserLoggedIn = false;
    }
  }
});
