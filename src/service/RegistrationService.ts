import {RegisterRequest} from "@/model/request/RegisterRequest";
import axios, {AxiosResponse} from "axios";
import {AuthResponse} from "@/model/response/AuthResponse";
import {useTokenStore} from "@/store/TokenStore";
import {ErrorResponse} from "@/model/response/ErrorResponse";
import {useAlertStore} from "@/store/AlertStore";
import {Alert} from "@/model/store/Alert";

export async function onRegistrationRequest(request: RegisterRequest) {
  const tokenStore = useTokenStore();
  const alertStore = useAlertStore();
  try {
    const response: AxiosResponse<any> = await axios.post("http://localhost:8080/api/v1/auth/signup", request);
    const tokenResponse: AuthResponse = response.data as AuthResponse;
    const token: string = tokenResponse.token;
    tokenStore.token = token;
    const alert: Alert = {
      title: "Registrierung erfolgreich!",
      message: "Du kannst dich nun einloggen, " + request.firstname + "!",
      type: "success"
    }
    alertStore.clearAlerts();
    alertStore.pushAlert(alert);
  } catch (e: AxiosResponse<ErrorResponse> | any) {
    const errorResponse: AxiosResponse<ErrorResponse> = e.response;
    const errorMessage: string = errorResponse.data.errorMessage;
    const alert: Alert = {
      title: "Registrierung fehlgeschlagen!",
      message: errorMessage,
      type: "error"
    }
    alertStore.clearAlerts();
    alertStore.pushAlert(alert);
    throw e;
  }
}
