import {LoginRequest} from "@/model/request/LoginRequest";
import {useTokenStore} from "@/store/TokenStore";
import {useUserStore} from "@/store/UserStore";
import {Alert} from "@/model/store/Alert";
import {useAlertStore} from "@/store/AlertStore";

export async function onLoginRequest(request: LoginRequest) {
  const tokenStore = useTokenStore();
  const userStore = useUserStore();
  const alertStore = useAlertStore();

  alertStore.clearAlerts();

  try {
    await tokenStore.authenticate(request);
    await userStore.fetchUser();
    return Promise.resolve();
  } catch (e) {
    const alert: Alert = {
      title: "Anmeldung fehlgeschlagen",
      message: "Benutzername oder Passwort falsch",
      type: "error"
    }
    alertStore.pushAlert(alert);
    return Promise.reject(e);
  }
}
