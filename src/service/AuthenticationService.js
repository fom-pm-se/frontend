import axios from "axios";

export function isAuthenticated() {
  return !!localStorage.getItem("token");
}

export function isUsernameAvailable(username) {
  return axios.get("http://localhost:8080/api/v1/auth/exists?username=" + username);
}
