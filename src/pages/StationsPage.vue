<template>
  <v-card elevation="0" v-if="stations.length">
    <v-card-title>
      <v-card-item class="text-center">Stations</v-card-item>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="stations"
      :hover="true"
      density="comfortable"
      item-value="id"
      class="elevation-1"
    >
      <template #bottom></template>
      <template v-slot:item.status="{ item }">
        <v-chip :color="getColor(item.columns.status)">
          {{ item.columns.status }}
        </v-chip>
      </template>
      <template v-slot:item.id="{ item }">
        <p class="text-caption">{{ item.columns.id }}</p>
      </template>
      <template v-slot:item.updated_at="{ item }">
        <p class="text-caption">{{ item.columns.updated_at }}</p>
      </template>
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
import { EVENT_NAMES, STATION_STATUS } from "@/components/enums";

const store = useStationsStore();
const { fetchStations, refreshStation } = store;
const { stations } = storeToRefs(store);

const headers = [
  {
    title: "Id",
    key: "id",
    align: "center",
    sortable: false,
    width: "30%",
  },
  {
    title: "Status",
    key: "status",
    align: "center",
    sortable: false,
    width: "20%",
  },
  {
    title: "Last activity",
    key: "updated_at",
    align: "center",
    sortable: true,
    value: (v) => dateAgo(v.updated_at),
    width: "50%",
  },
];

const getColor = (status) => {
  if (status === "offline") return "grey";
  else if (status === "available") return "orange";
  else return "green";
};

const processSSE = (event) => {
  console.log("Start process event for stations.");
  let status = null;
  if (event.name === EVENT_NAMES.lost_connection) {
    status = STATION_STATUS.offline;
  }
  if (event.name === EVENT_NAMES.new_connection) {
    status = STATION_STATUS.available;
  }
  if (status) {
    refreshStation(event.charge_point_id, status);
  }
};

onMounted(() => {
  fetchStations();
  updateEventListener(processSSE);
});
</script>
