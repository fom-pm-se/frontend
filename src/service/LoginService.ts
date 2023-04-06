import axios, {AxiosResponse} from "axios";
import {LoginRequest} from "@/model/request/LoginRequest";
import {RegisterRequest} from "@/model/request/RegisterRequest";
import {AuthResponse} from "@/model/response/AuthResponse";

export function login(loginRequest: LoginRequest) {
    return axios.post("http://localhost:8080/api/v1/auth/signin", loginRequest)
        .then(response => {
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
            }
            return response.data;
        });
}

export function register(registerRequest: RegisterRequest): Promise<AxiosResponse<AuthResponse>> {
    return axios.post("http://localhost:8080/api/v1/auth/signup", registerRequest);
}

export function logout() {
    localStorage.removeItem("token");
    return axios.post("http://localhost:8080/api/v1/auth/signout");
}
