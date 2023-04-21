import {LoginRequest} from "@/model/request/LoginRequest";
import {useTokenStore} from "@/store/TokenStore";
import {useUserStore} from "@/store/UserStore";
import {Alert} from "@/model/store/Alert";
import {useAlertStore} from "@/store/AlertStore";
import {AxiosError} from "axios";

export async function onLoginRequest(request: LoginRequest) {
  const tokenStore = useTokenStore();
  const userStore = useUserStore();
  const alertStore = useAlertStore();

  alertStore.clearAlerts();

  try {
    await tokenStore.authenticate(request);
    await userStore.fetchUser();
    return Promise.resolve();
  } catch (e: any) {
    const alert: Alert = {
      title: "Anmeldung fehlgeschlagen",
      message: e.response.data.errorMessage || "Ein Fehler ist beim anmelden aufgetreten.",
      type: "error"
    }
    alertStore.pushAlert(alert);
    return Promise.reject(e);
  }
}
