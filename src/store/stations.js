import { defineStore } from "pinia";
import { requestStatusesCounts } from "@/services/stations";

export const useStationsStore = defineStore("stations", {
  state: () => ({
    counters: null,
    stations: [],
  }),
  actions: {
    storeStations(items) {
      this.stations = items;
    },
    refreshStation(id, status) {
      this.stations.forEach((item) => {
        if (item.id === id) {
          item.status = status;
          item.updated_at = new Date().toISOString();
        }
      });
    },
    fetchStatusesCounts() {
      requestStatusesCounts().then((response) => {
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
