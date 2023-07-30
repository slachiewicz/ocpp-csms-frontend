// Utilities
import { defineStore } from "pinia";
import { request } from "@/api";

export const useStationsStore = defineStore("stations", {
  state: () => ({
    counters: null,
  }),
  actions: {
    fetchCounters() {
      request.get("/charge_points/counters").then((response) => {
        this.counters = response;
      });
    },
    getCounters() {
      return this.counters;
    },
    updateCounters(value) {
      this.counters = value;
    },
  },
});
