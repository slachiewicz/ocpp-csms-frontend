import { defineStore } from "pinia";

export const useLocationsStore = defineStore("locations", {
  state: () => ({
    locations: [],
  }),
  actions: {
    storeLocations(items) {
      this.locations = items;
    },
  },
});
