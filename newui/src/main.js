import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import VueParticles from "vue-particles";
import VueResource from "vue-resource";
import moment from "moment";

Vue.config.productionTip = false;

Vue.use(VueParticles);
Vue.use(VueResource);
Vue.filter("date", (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") =>
  moment(dataStr).format(pattern)
);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
