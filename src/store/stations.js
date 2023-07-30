// Utilities
import { defineStore } from "pinia";
import { request } from "@/api";
import { useLoaderStore } from "@/store/loader";

const { setLoading, unSetLoading } = useLoaderStore();

export const useStationsStore = defineStore("stations", {
  state: () => ({
    counters: null,
    stations: [],
  }),
  actions: {
    fetchStations() {
      setLoading();
      request.get("/charge_points").then((response) => {
        this.stations = response;
        unSetLoading();
      });
    },
    updateStationsStatus(id, status) {
      this.stations.forEach((item) => {
        if (item.id === id) {
          item.status = status;
        }
      });
    },
    fetchCounters() {
      setLoading();
      request.get("/charge_points/counters").then((response) => {
        this.counters = response;
        unSetLoading();
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
