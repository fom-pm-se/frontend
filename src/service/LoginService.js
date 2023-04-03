import axios from "axios";

export function login(loginRequest) {
    return axios.post("http://localhost:8080/api/v1/auth/signin", loginRequest)
        .then(response => {
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
            }
            return response.data;
        });
}
