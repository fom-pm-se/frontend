import axios from "axios";
import router from "../router";

const axios = axios.create();
axios.interceptors.request.use((() => {
  console.log("interceptor request");
}).catch((error) => {
  router.push("/login").then((r) => {
    console.log(r)
  });
}));
