import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    component: () => import('@/layouts/AppLayout.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "home" */ '@/pages/Dashboard.vue'),
      },
      {
        path: 'stations',
        name: 'Stations',
        component: () => import(/* webpackChunkName: "home" */ '@/pages/Stations.vue'),
      },
      {
        path: 'transactions',
        name: 'Transactions',
        component: () => import(/* webpackChunkName: "home" */ '@/pages/Transactions.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
