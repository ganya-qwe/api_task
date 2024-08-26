import { createMemoryHistory, createRouter } from "vue-router";

import Main from "@/components/Main.vue";
import Details from "@/components/Details.vue";

const routes = [
  { path: "/", component: Main },
  { path: "/details/:lccn", component: Details },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
