<template>
  <data-table
    title="Locations"
    :items-loader="requestLocationsList"
    :headers="headers"
  >
    <template v-slot:default="{ items, rowConfig }">
      <v-data-table
        :headers="headers"
        :items="items"
        :hover="rowConfig.hover"
        :density="rowConfig.density"
      >
        <template v-slot:item.name="{ item }">
          <p :class="rowConfig.itemClass">{{ item.columns.name }}</p>
        </template>
        <template v-slot:item.city="{ item }">
          <p :class="rowConfig.itemClass">{{ item.columns.city }}</p>
        </template>
        <template v-slot:item.address1="{ item }">
          <p :class="rowConfig.itemClass">{{ item.columns.address1 }}</p>
        </template>
      </v-data-table>
    </template>
  </data-table>
</template>

<script setup>
import DataTable from "@/components/DataTable";
import { requestLocationsList } from "@/services/locations";

const headers = [
  {
    title: "Name",
    key: "name",
    align: "center",
    sortable: false,
    width: "30%",
    class: "text-caption",
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
    style: "text-caption",
  },
];
</script>
