import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'
import CoinDetail from '../views/CoinDetail.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/coin/:id',
    name: 'coin-detail',
    component: CoinDetail,
  },
  {
    path: '/coin',
    redirect: () => {
      return { path: '/' }
    },
  },
  {
    path: '/:catchAll(.*)',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
