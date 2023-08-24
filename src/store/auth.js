import { defineStore } from "pinia";
import { useRoute } from "vue-router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    currentAccountId: "9206e2b4-56b4-4887-acb2-a5baa3ce48e0",
  }),
  actions: {
    getAccountId() {
      const router = useRoute();
      return router.params.accountId;
    },
  },
});
