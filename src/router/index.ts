// Composables
import {createRouter, createWebHistory} from 'vue-router'
import {useUserStore} from "@/store/UserStore";

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
        path: 'profiles',
        name: 'Profile',
        component: () => import('@/views/Profile.vue'),
      }
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/layouts/default/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from) => {
  const userStore = useUserStore();
  await userStore.fetchUser();
  if (
    !userStore.user.enabled &&
    to.name !== 'Login'
  ) {
    return {name: 'Login'}
  }
})

export default router
