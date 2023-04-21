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
import {useTokenStore} from "@/store/TokenStore";
import {registerAxios} from "@/axios/axiosConfig";

registerAxios();

const app = createApp(App)
const pinia = createPinia();
app.use(pinia);



useTokenStore();
watch(pinia.state,
  (state) => {
    localStorage.setItem('token', state.tokenStore.token);
  },
  {deep: true}
)

registerPlugins(app)

app.mount('#app')
