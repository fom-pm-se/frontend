import axios, {AxiosResponse} from "axios";
import {useAlertStore} from "@/store/AlertStore";
import {Alert} from "@/model/store/Alert";
import {tr} from "vuetify/locale";
import {User} from "@/model/store/User";
import {useTokenStore} from "@/store/TokenStore";
import {useUserStore} from "@/store/UserStore";
import router from "@/router";

export function isAuthenticated() {
  return !!localStorage.getItem("token");
}

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

export async function getCurrentUser(): Promise<User | null> {
  try {
    const response = await axios.get("http://localhost:8080/api/v1/user/me");
    if (response.data) {
      return Promise.resolve(response.data as User);
    }
    return Promise.reject("Der Benutzer ist nicht eingeloggt oder die Sitzung ist abgelaufen");
  } catch (e) {
    const tokenStore = useTokenStore();
    tokenStore.token = "";
    const userStore = useUserStore();
    userStore.isUserLoggedIn = false;
    return Promise.reject("Der Benutzer ist nicht eingeloggt oder die Sitzung ist abgelaufen");
  }
}

export function logout() {
  const tokenStore = useTokenStore();
  tokenStore.token = "";
  const userStore = useUserStore();
  userStore.flushUser();
  router.push("/login");
}
