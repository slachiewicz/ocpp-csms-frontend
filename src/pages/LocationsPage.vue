<template>
  <v-card elevation="0" v-if="items.length">
    <v-card-title>
      <v-card-item class="text-center">Locations</v-card-item>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      :hover="true"
      density="comfortable"
      item-value="id"
    >
      <template v-slot:item.name="{ item }">
        <p :class="itemClass" @click="fetchData">
          {{ item.columns.name }}
        </p>
      </template>
      <template v-slot:item.city="{ item }">
        <p :class="itemClass">{{ item.columns.city }}</p>
      </template>
      <template v-slot:item.address1="{ item }">
        <p :class="itemClass">{{ item.columns.address1 }}</p>
      </template>
      <template #bottom></template>
    </v-data-table>
    <div class="text-center">
      <v-pagination
        v-model="currentPage"
        :length="lastPage"
        total-visible="6"
        density="compact"
      ></v-pagination>
    </div>
  </v-card>
  <empty-data v-else></empty-data>
</template>

<script setup>
import EmptyData from "@/components/EmptyData";
import { requestLocationsList } from "@/services/locations";
import { usePagination } from "@/use/pagination";

const itemClass = "text-caption";

const headers = [
  {
    title: "Name",
    key: "name",
    align: "center",
    sortable: false,
    width: "20%",
  },
  {
    title: "City",
    key: "city",
    align: "center",
    sortable: false,
    width: "20%",
  },
  {
    title: "Address",
    key: "address1",
    align: "center",
    sortable: false,
    width: "60%",
  },
];

const { items, currentPage, lastPage } = usePagination({
  itemsLoader: requestLocationsList,
});
</script>
