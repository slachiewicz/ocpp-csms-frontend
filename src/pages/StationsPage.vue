<template>
  <v-card elevation="0" v-if="stations.length">
    <v-card-title>
      <v-card-item class="text-center">Stations</v-card-item>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="stations"
      :hover="true"
      :hide-no-data="true"
      density="comfortable"
      item-value="id"
      class="elevation-0"
    >
      <template #bottom></template>
    </v-data-table>
  </v-card>
  <empty-data v-else></empty-data>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { updateEventListener } from "@/store/sse";
import { useStationsStore } from "@/store/stations";
import EmptyData from "@/components/EmptyData";
import { dateAgo } from "@/filters/date";

const store = useStationsStore();
const { fetchStations } = store;
const { stations } = storeToRefs(store);

const headers = [
  {
    title: "Id",
    key: "id",
    align: "center",
    sortable: false,
  },
  {
    title: "Status",
    key: "status",
    align: "center",
    sortable: false,
  },
  {
    title: "Last activity",
    key: "updated_at",
    align: "center",
    sortable: true,
    value: (v) => dateAgo(v.updated_at),
  },
];

const processSSE = (event) => {
  console.log("Start process stations SSE.");
};

onMounted(() => {
  fetchStations();
  updateEventListener(processSSE);
});
</script>
