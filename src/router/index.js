import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MyPropertiesView from '../views/MyPropertiesView.vue'
import PropertyView from '../views/PropertyView.vue'


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
    }, 
    {
      path: "/properties/:id",
      name: "property",
      component: PropertyView
    }
  ]
})

export default router
