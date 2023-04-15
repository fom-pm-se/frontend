import axios from "axios";
import {useAlertStore} from "@/store/AlertStore";
import {Alert} from "@/model/store/Alert";
import {useTokenStore} from "@/store/TokenStore";
import {useUserStore} from "@/store/UserStore";
import router from "@/router";

export function isUsernameAvailable(username: string): Promise<any> {
  const alertStore = useAlertStore();
  return axios.get("http://localhost:8080/api/v1/auth/exists?username=" + username).catch(() => {
    const alert: Alert = {
      title: "Benutzername kann nicht geprüft werden",
      message: "Vermutlich liegt ein Netzwerkfehler vor. Bitte versuche es später erneut :(",
      type: "error"
    }
    alertStore.clearAlerts();
    alertStore.pushAlert(alert);
  });
}

export function logout() {
  // Flush Token Store
  const tokenStore = useTokenStore();
  tokenStore.token = "";

  // Flush User Store
  const userStore = useUserStore();
  userStore.flushUser();

  // Redirect to login page
  router.push("/login").then(
    () => {
      const alert: Alert = {
        title: "Erfolgreich abgemeldet",
        message: "Du wurdest erfolgreich abgemeldet",
        type: "success"
      }
      const alertStore = useAlertStore();
      alertStore.clearAlerts();
      alertStore.pushAlert(alert);
    }
  );
}
