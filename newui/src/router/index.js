import Vue from "vue";
import VueRouter from "vue-router";
import Console from "../views/Console.vue";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/console/:group",
    name: "console",
    component: Console,
    meta: {
      title: "控制台"
    }
  },
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "主页"
    }
  }
];

const router = new VueRouter({
  routes
});

export default router;
