<template>
  <div class="auth-card">
    <h2 class="text-center mb-4 text-primary fw-bold">Iniciar Sesión</h2>

    <form @submit.prevent="login">
      <div class="mb-3">
        <label class="form-label">Usuario</label>
        <input
          v-model="usuario"
          type="text"
          class="form-control"
          placeholder="Ingresa tu usuario"
          required
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Contraseña</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          placeholder="••••••••"
          required
        />
      </div>

      <button type="submit" class="btn btn-primary w-100 mb-3" :disabled="!canLogin">Ingresar</button>

      <p class="text-center">
        ¿No tenés cuenta?
        <router-link to="/registro" class="text-decoration-none fw-bold text-success">
          Registrate
        </router-link>
      </p>

      <p v-if="error" class="text-danger text-center mt-3">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const usuario = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const API_URL = 'https://6911e74852a60f10c81fc27b.mockapi.io/usuarios'

// computed que valida inputs
const canLogin = computed(() => {
  return usuario.value.trim().length > 0 && password.value.length >= 6
})

async function login() {
  error.value = ''
  try {
    const { data: usuarios } = await axios.get(API_URL)
    const user = usuarios.find(u => u.usuario === usuario.value && u.password === password.value)
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
      router.push('/seleccion-tareas')
    } else {
      error.value = 'Usuario o contraseña incorrectos.'
    }
  } catch (err) {
    console.error(err)
    error.value = 'Error al conectar con el servidor.'
  }
}
</script>

<style scoped>
.auth-card {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 400px;
}
</style>


