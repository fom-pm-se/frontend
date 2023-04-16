import {ChangePasswordRequest} from "@/model/request/ChangePasswordRequest";
import axios from "axios";
import {useAlertStore} from "@/store/AlertStore";

export async function changePassword(changePasswordRequest: ChangePasswordRequest): Promise<void> {
  const alertStore = useAlertStore();
  try {
    await axios.post("http://localhost:8080/api/v1/user/change-password", changePasswordRequest);
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
