import { createRouter, createWebHistory } from "vue-router";
import VoterView from "../views/VoterView.vue";
import PaymentView from '../views/PaymentView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: VoterView,
    },
    {
      path: '/payment',
      name: 'Payments',
      component: PaymentView,
    },
  ],
})

export default router;
