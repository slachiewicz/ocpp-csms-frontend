/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";

// Vuetify
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";

const app = createApp(App);

registerPlugins(app);

app.mount("#app");
