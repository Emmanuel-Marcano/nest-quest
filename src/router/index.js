import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MyPropertiesView from '../views/MyPropertiesView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/MyProperties',
      name: 'MyProperties',
      component: MyPropertiesView
    }
  ]
})

export default router
