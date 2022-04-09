import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/index.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { createPinia } from 'pinia'

/* add some free styles */
import { faMoon, faSun, faChartPie, faRankingStar, faList, faBars, faUserGroup, faMoneyBill, faHammer } from "@fortawesome/free-solid-svg-icons";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* add icons to the library */
library.add(faMoon, faSun, faChartPie, faRankingStar, faList, faBars, faUserGroup, faMoneyBill, faHammer)

const app = createApp(App);

app.component("FontAwesomeIcon", FontAwesomeIcon);

app.use(router);
app.use(createPinia());

app.mount("#app");
