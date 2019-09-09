import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Group from "./views/Group.vue";
import Admin from "./views/Admin.vue";
import AdminGroup from "./views/AdminGroup.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        title: "主页"
      }
    },
    {
      path: "/adm",
      name: "admin",
      component: Admin,
      meta: {
        title: "主页"
      }
    },
    {
      path: "/adm/password/:pass",
      name: "admin",
      component: Admin,
      meta: {
        title: "主页"
      }
    },
    {
      path: "/:group",
      name: "group",
      component: Group,
      meta: {
        title: "比赛"
      }
    },
    {
      path: "/adm/:group",
      name: "about",
      component: AdminGroup,
      meta: {
        title: "比赛管理"
      }
    },
    {
      path: "/adm/:group/password/:pass",
      name: "about",
      component: AdminGroup,
      meta: {
        title: "比赛管理"
      }
    }
  ]
});
