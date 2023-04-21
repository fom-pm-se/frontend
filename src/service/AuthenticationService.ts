import axios from "axios";
import {useAlertStore} from "@/store/AlertStore";
import {Alert} from "@/model/store/Alert";
import {useTokenStore} from "@/store/TokenStore";
import {useUserStore} from "@/store/UserStore";
import router from "@/router";
import {API_EXISTS_USER, API_LOCK_CURRENT_USER, API_LOCK_USER} from "@/axios/ApiConstants";

export function isUsernameAvailable(username: string): Promise<any> {
  const alertStore = useAlertStore();
  return axios.get(API_EXISTS_USER + username).catch(() => {
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

export async function lockUser() {
  try {
    await axios.post(API_LOCK_CURRENT_USER);
    logout();
    window.location.reload();
  } catch (e: any) {
    const alertStore = useAlertStore();
    alertStore.setAlert({
      type: "error",
      message: e.response.data.errorMessage || "Ein Fehler ist beim sperren des Benutzers aufgetreten.",
      title: "Fehler."
    });
  }
}

export async function lockUserAdmin(username: string) {
  try {
    const userStore = useUserStore();
    await axios.post(API_LOCK_USER + username);
    await userStore.fetchUser();
    return Promise.resolve();
  } catch (e: any) {
    const alertStore = useAlertStore();
    alertStore.setAlert({
      type: "error",
      message: e.response.data.errorMessage || "Ein Fehler ist beim sperren des Benutzers aufgetreten.",
      title: "Fehler."
    });
    return Promise.reject();
  }
}
