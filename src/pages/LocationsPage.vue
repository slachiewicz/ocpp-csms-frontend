<template>
  <data-table
    title="Locations"
    :items-loader="requestLocationsList"
    :items="locations"
    :headers="headers"
  >
  </data-table>
</template>

<script setup>
import DataTable from "@/components/DataTable";
import { requestLocationsList } from "@/services/locations";
import { storeToRefs } from "pinia";
import { useLocationsStore } from "@/store/locations";

const store = useLocationsStore();
const { locations } = storeToRefs(store);

const headers = [
  {
    title: "Name",
    key: "name",
    align: "center",
    sortable: false,
    width: "30%",
  },
  {
    title: "City",
    key: "city",
    align: "center",
    sortable: false,
    width: "30%",
  },
  {
    title: "Address",
    key: "address1",
    align: "center",
    sortable: false,
    width: "60%",
  },
];
</script>
