import {ChangePasswordRequest} from "@/model/request/ChangePasswordRequest";
import axios from "axios";
import {useAlertStore} from "@/store/AlertStore";
import {API_CHANGE_PASSWORD} from "@/axios/ApiConstants";

export async function changePassword(changePasswordRequest: ChangePasswordRequest): Promise<void> {
  const alertStore = useAlertStore();
  try {
    await axios.post(API_CHANGE_PASSWORD, changePasswordRequest);
    alertStore.setAlert({
      type: "success",
      message: "Dein Passwort wurde erfolgreich geändert.",
      title: "Erledigt."
    });
    return Promise.resolve();
  } catch (e: any) {
    alertStore.setAlert({
      type: "error",
      message: e.response.data.errorMessage || "Ein Fehler ist aufgetreten.",
      title: "Fehler."
    });
    return Promise.reject(e);
  }
}
