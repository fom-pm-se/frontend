import {UpdateUserRequest} from "@/model/request/UpdateUserRequest";
import {useAlertStore} from "@/store/AlertStore";
import axios from "axios";
import {API_CHANGE_CURRENT_USER_INFO} from "@/axios/ApiConstants";

export async function requestUserChange(updateUserRequest: UpdateUserRequest) {
  const alertStore = useAlertStore();

  try {
    const result = await axios.put(API_CHANGE_CURRENT_USER_INFO, updateUserRequest);
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
