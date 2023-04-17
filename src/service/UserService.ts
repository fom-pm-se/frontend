import {UpdateUserRequest} from "@/model/request/UpdateUserRequest";
import {useAlertStore} from "@/store/AlertStore";
import axios from "axios";

export async function requestUserChange(updateUserRequest: UpdateUserRequest) {
  const alertStore = useAlertStore();

  try {
    const result = await axios.put("http://localhost:8080/api/v1/user/change/me", updateUserRequest);
    alertStore.setAlert({
      type: "success",
      message: "Deine Daten wurden erfolgreich geändert.",
      title: "Erledigt."
    });
    return Promise.resolve(result.data);
  } catch (e: any) {
    alertStore.setAlert({
      type: "error",
      message: e.response.data.errorMessage || "Ein Fehler ist aufgetreten.",
      title: "Fehler."
    });
    return Promise.reject(e);
  }
}
