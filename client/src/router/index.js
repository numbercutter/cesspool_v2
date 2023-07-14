import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Marketplace from '../views/Marketplace.vue'
import CESS4CESSDetails from '../vaults/CESS4CESSDetails.vue'
import Shitcans from '../views/Shitcans.vue'

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
    props: true
  },
  

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
      document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
  }
})

export default router
