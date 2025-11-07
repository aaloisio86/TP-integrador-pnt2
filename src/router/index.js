import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Registro from '../components/Registro.vue'
import SeleccionTareas from '../components/SeleccionarTareas.vue'
import Home from '../components/Home.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/registro', component: Registro },
  { path: '/seleccion-tareas', component: SeleccionTareas },
  { path: '/home', component: Home }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router



