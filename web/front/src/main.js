import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import VueCookies from "vue-cookies";
import "material-design-icons-iconfont";
import waterfall from "vue-waterfall2";
import VueParticles from "vue-particles";
import VueResource from "vue-resource";
import moment from "moment";

Vue.config.productionTip = false;
Vue.filter("date", (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") =>
  moment(dataStr).format(pattern)
);
Vue.use(waterfall);
Vue.use(VueCookies);
Vue.use(VueParticles);
Vue.use(VueResource);
Vue.prototype.$secret = "";
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - THUPC`;
  next();
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  data: () => ({
    secret: ""
  })
}).$mount("#app");
