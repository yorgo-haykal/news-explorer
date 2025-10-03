import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ExploreView from "../views/ExploreView.vue"; // ✅ Ajout ici

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/explore", // ✅ Nouvelle route
    name: "explore",
    component: ExploreView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
