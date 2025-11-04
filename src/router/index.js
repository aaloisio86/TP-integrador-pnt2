import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Registro from '../components/Registro.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/registro', component: Registro },
  { path: '/home', component: { template: '<h2 class="text-center mt-5">Bienvenido al sistema 📚</h2>' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router


