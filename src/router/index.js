import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Marketplace from '../views/Marketplace.vue';
import CESS4CESSDetails from '../vaults/CESS4CESSDetails.vue';
import PSWAPCESSBNBDetails from '../vaults/PSWAPCESSBNBDetails.vue';
import Shitcans from '../views/Shitcans.vue';
import store from '../store' // Ensure you import the store

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Marketplace',
    name: 'Marketplace',
    component: Marketplace
  },
  {
    path: '/Shitcans',
    name: 'Shitcans',
    component: Shitcans
  },
  {
    path: '/CESS4CESSDetails',
    name: 'CESS4CESSDetails',
    component: CESS4CESSDetails,
    props: true,
    beforeEnter: (to, from, next) => {
      const address = store.getters.address; 
      if (!address) {
        next('/Shitcans'); 
      } else {
        next();
      }
    },
  },
  {
    path: '/PSWAPCESSBNBDetails',
    name: 'PSWAPCESSBNBDetails',
    component: PSWAPCESSBNBDetails,
    props: true,
    beforeEnter: (to, from, next) => {
      const address = store.getters.address; 
      if (!address) {
        next('/Shitcans'); 
      } else {
        next();
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
  }
});

export default router;

