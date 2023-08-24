<template>
  <data-table
    title="Stations"
    :items-loader="requestStationsList"
    :headers="headers"
  >
    <template v-slot:item.status="{ item }">
      <v-chip :color="STATION_STATUS_COLOR[item.columns.status]">
        {{ item.columns.status }}
      </v-chip>
    </template>
  </data-table>
</template>

<script setup>
import { onMounted } from "vue";
import { updateEventListener } from "@/store/sse";
import { dateAgo } from "@/filters/date";
import DataTable from "@/components/DataTable";
import { requestStationsList } from "@/services/stations";

import {
  EVENT_NAMES,
  STATION_STATUS,
  STATION_STATUS_COLOR,
} from "@/components/enums";

const headers = [
  {
    title: "Id",
    key: "id",
    align: "center",
    sortable: false,
    width: "20%",
  },
  {
    title: "Status",
    key: "status",
    align: "center",
    sortable: false,
    width: "20%",
  },
  {
    title: "Location",
    key: "location",
    align: "center",
    sortable: false,
    width: "30%",
    value: (v) => `${v.location.city}/${v.location.name}`,
  },
  {
    title: "Last activity",
    key: "updated_at",
    align: "center",
    sortable: true,
    value: (v) => dateAgo(v.updated_at),
    width: "30%",
  },
];

const processSSE = (event) => {
  console.log(`Start process event for stations (event=${event.name}.)`);
  let status = null;
  if (event.name === EVENT_NAMES.lost_connection) {
    status = STATION_STATUS.offline;
  }
  if (
    [EVENT_NAMES.new_connection, EVENT_NAMES.heartbeat].includes(event.name)
  ) {
    status = STATION_STATUS.available;
  }
  // if (status) {
  //   refreshStation(event.charge_point_id, status);
  // }
};

onMounted(() => {
  updateEventListener(processSSE);
});
</script>
