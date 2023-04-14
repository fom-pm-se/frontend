import {LoginRequest} from "@/model/request/LoginRequest";
import {useTokenStore} from "@/store/TokenStore";
import {useUserStore} from "@/store/UserStore";

export async function onLoginRequest(request: LoginRequest) {
  const tokenStore = useTokenStore();
  const userStore = useUserStore();
  try {
    await tokenStore.authenticate(request);
    await userStore.fetchUser();
    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  }
}
