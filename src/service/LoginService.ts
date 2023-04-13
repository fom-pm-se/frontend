import {LoginRequest} from "@/model/request/LoginRequest";
import {useTokenStore} from "@/store/TokenStore";
import {useAlertStore} from "@/store/AlertStore";
import axios, {AxiosResponse} from "axios";
import {AuthResponse} from "@/model/response/AuthResponse";
import {Alert} from "@/model/store/Alert";
import {ErrorResponse} from "@/model/response/ErrorResponse";

export async function onLoginRequest(request: LoginRequest) {
  const tokenStore = useTokenStore();
  const alertStore = useAlertStore();
  try {
    const response: AxiosResponse<any> = await axios.post("http://localhost:8080/api/v1/auth/signin", request);
    const tokenResponse: AuthResponse = response.data as AuthResponse;
    const token: string = tokenResponse.token;
    tokenStore.token = token;
  } catch (e: AxiosResponse<ErrorResponse> | any) {
    const errorResponse: AxiosResponse<ErrorResponse> = e.response;
    const errorMessage: string = errorResponse.data.errorMessage;
    const alert: Alert = {
      title: "Anmeldung fehlgeschlagen!",
      message: errorMessage,
      type: "error"
    }
    alertStore.clearAlerts();
    alertStore.pushAlert(alert);
    return Promise.reject(e);
  }
}
