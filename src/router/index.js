import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/AppLayout.vue"),
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () =>
          import(
            /* webpackChunkName: "home" */ "@/pages/dashboard/DashboardPage.vue"
          ),
      },
      {
        path: "stations",
        name: "Stations",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/pages/StationsPage.vue"),
      },
      {
        path: "transactions",
        name: "Transactions",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/pages/TransactionsPage.vue"),
      },
      {
        path: "locations",
        name: "Locations",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/pages/LocationsPage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
