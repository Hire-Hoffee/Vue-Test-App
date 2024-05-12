import { createWebHistory, createRouter } from "vue-router";

import AllDoneStuff from "../views/AllDoneStuff.vue";
import TestingStuff from "../views/TestingStuff.vue";

const routes = [
  { path: "/done", component: AllDoneStuff },
  { path: "/testing", component: TestingStuff },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
