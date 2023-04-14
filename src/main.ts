/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import {createApp, watch} from 'vue'
import {createPinia} from "pinia";


// Plugins
import {registerPlugins} from '@/plugins'
import axios from "axios";
import {useTokenStore} from "@/store/TokenStore";

const app = createApp(App)
const pinia = createPinia();
app.use(pinia);

//define Axios interceptor to add token to every request
axios.interceptors.request.use(
  (config) => {
    const tokenStore = useTokenStore();
    const token = tokenStore.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);

// Sync token with local storage

useTokenStore();
watch(pinia.state,
  (state) => {
    localStorage.setItem('token', state.tokenStore.token);
  },
  {deep: true}
)

registerPlugins(app)

app.mount('#app')
