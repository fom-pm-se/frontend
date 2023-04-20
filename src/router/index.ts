// Composables
import {createRouter, createWebHistory} from 'vue-router'
import {useUserStore} from "@/store/UserStore";
import {useAlertStore} from "@/store/AlertStore";
import {Alert} from "@/model/store/Alert";
import {useSettingsStore} from "@/store/SettingsStore";
import {useTokenStore} from "@/store/TokenStore";
import {useGlobalPropertiesStore} from "@/store/GlobalPropertiesStore";

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: '/settings',
        name: 'Settings',
        component: () => import('@/views/Settings.vue'),
      },
      {
        path: '/profiles',
        name: 'Profile',
        component: () => import('@/views/Profile.vue'),
      },
      {
        path: '/administrator',
        name: 'Administrator',
        meta: {
          adminAccess: true
        },
        component: () => import('@/views/Administrator.vue'),
        children: [
          {
            path: '',
            name: 'AdministratorHome',
            component: () => import('@/layouts/administrator/AdministratorDefault.vue'),
          },
          {
            path: 'users',
            name: 'Users',
            component: () => import('@/layouts/administrator/Users.vue'),
          }, {
            path: 'settings',
            name: 'ApplicationSettings',
            component: () => import('@/layouts/administrator/ApplicationSettings.vue'),
          }
        ]
      }
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/layouts/default/Login.vue'),
    meta: {
      anonymousAccess: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/components/common/NotFound.vue'),
    meta: {
      anonymousAccess: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async (to) => {
  const globalPropertiesStore = useGlobalPropertiesStore();
  globalPropertiesStore.setLoading(true);
  const userStore = useUserStore();
  const alertStore = useAlertStore();
  const settingsStore = useSettingsStore();
  const tokenStore = useTokenStore();

  await userStore.fetchUser().catch(() => {
    userStore.flushUser();
    tokenStore.flushToken();
  });
  await settingsStore.fetchSettingsShort();

  if (to.meta.adminAccess && !(userStore.isAdministrator())) {
    const alert: Alert = {
      title: "Keine Berechtigung.",
      message: "Du hast keine Berechtigung diese Seite aufzurufen.",
      type: "warning"
    }
    alertStore.clearAlerts();
    alertStore.pushAlert(alert);

    return {name: 'Home'}
  }

  if (
    !userStore.user.enabled &&
    !to.meta.anonymousAccess
  ) {
    const alert: Alert = {
      title: "Du wurdest abgemeldet.",
      message: "Bitte melde dich erneut an.",
      type: "warning"
    }
    alertStore.clearAlerts();
    alertStore.pushAlert(alert);
    return {name: 'Login'}
  }
});

router.afterEach(() => {
  const globalPropertiesStore = useGlobalPropertiesStore();
  globalPropertiesStore.setLoading(false);
});

export default router
