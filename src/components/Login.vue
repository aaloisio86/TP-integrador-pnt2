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

      <button type="submit" class="btn btn-primary w-100 mb-3">Ingresar</button>

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
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const usuario = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

function login() {
  const cuentas = JSON.parse(localStorage.getItem('cuentas')) || []
  const user = cuentas.find(c => c.usuario === usuario.value && c.password === password.value)

  if (user) {
    error.value = ''
    // guardamos usuario en localStorage para usar en la próxima pantalla
    localStorage.setItem('user', JSON.stringify(user))
    router.push('/seleccion-tareas')
  } else {
    error.value = 'Usuario o contraseña incorrectos.'
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


