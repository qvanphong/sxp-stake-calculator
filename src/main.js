import Vue from "vue";
import VueI18n from "vue-i18n";
import Antd from "ant-design-vue";
import App from "./App.vue";
import messages from "../locales";
import axios from "axios";

import "ant-design-vue/dist/antd.css";
import "./assets/tailwind.css";

Vue.use(Antd);
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "en",
  messages,
});

const axiosConfig = {
  baseURL: "https://calculator.sxpviet.com/",
};

Vue.config.productionTip = false;
Vue.prototype.$axios = axios.create(axiosConfig);

new Vue({
  i18n,
  render: (h) => h(App),
}).$mount("#app");
