<template>
  <v-app id="inspire">
    <v-app-bar class="px-3" flat density="compact">

      <v-spacer></v-spacer>

      <v-tabs centered color="grey-darken-1">
        <v-tab
          v-for="link in links"
          :key="link.name"
          :to="link.path"
          density="comfortable"
        >
          {{ link.name }}
          <v-chip v-if="counters[link.name] !== undefined" class="ml-2">{{
            counters[link.name]
          }}</v-chip>
        </v-tab>
      </v-tabs>

      <v-spacer></v-spacer>

      <v-avatar
        class="hidden-sm-and-down"
        color="grey-darken-3"
        size="32"
      ></v-avatar>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <v-progress-linear
        :indeterminate="loading"
        color="cyan"
      ></v-progress-linear>
      <v-container>
        <v-row>
          <v-col cols="12" sm="2">
            <v-sheet rounded="lg" min-height="70vh">
              <!--  -->
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="8">
            <v-sheet min-height="90vh" rounded="lg">
              <router-view></router-view>
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="2">
            <v-sheet rounded="lg" min-height="70vh">
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { onBeforeMount, onMounted } from "vue";
import { initEventSource } from "@/store/sse";
import { useLoaderStore } from "@/store/loader";
import { useAuthStore } from "@/store/auth";
import { useCountersStore } from "@/store/counters";

const { counters } = storeToRefs(useCountersStore());
const { loading } = storeToRefs(useLoaderStore());
const { currentAccountId } = useAuthStore();
const { fetchCounters } = useCountersStore();

onBeforeMount(() => {
  initEventSource();
  fetchCounters();
});

const links = [
  {
    name: "dashboard",
    path: `/${currentAccountId}/dashboard`,
  },
  {
    name: "locations",
    path: `/${currentAccountId}/locations`,
  },
  {
    name: "stations",
    path: `/${currentAccountId}/stations`,
  },
  {
    name: "transactions",
    path: "/transactions",
  },
];
</script>
