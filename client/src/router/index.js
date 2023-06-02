import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Marketplace from '../views/Marketplace.vue'
import NftDetails from '../views/NftDetails.vue'
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
    path: '/NftDetails/:id',
    name: 'NftDetails',
    component: NftDetails,
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
