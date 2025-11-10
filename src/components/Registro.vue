<template>
    <div class="auth-card">
      <h2 class="text-center mb-4 text-success fw-bold">Crear Cuenta</h2>
  
      <form @submit.prevent="registrar">
        <div class="mb-3">
          <label class="form-label">Usuario</label>
          <input
            v-model="usuario"
            type="text"
            class="form-control"
            placeholder="Ej: facu123"
            required
          />
        </div>
  
        <div class="mb-3">
          <label class="form-label">Correo electrónico</label>
          <input
            v-model="email"
            type="email"
            class="form-control"
            placeholder="ejemplo@mail.com"
            required
          />
        </div>
  
        <div class="mb-3">
          <label class="form-label">Contraseña</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            placeholder="Mínimo 6 caracteres"
            required
            minlength="6"
          />
        </div>
  
        <button type="submit" class="btn btn-success w-100 mb-3">Registrarme</button>
  
        <p class="text-center">
          ¿Ya tenés cuenta?
          <router-link to="/" class="text-decoration-none fw-bold text-primary">
            Iniciar sesión
          </router-link>
        </p>
  
        <p v-if="error" class="text-danger text-center mt-3">{{ error }}</p>
        <p v-if="success" class="text-success text-center mt-3">{{ success }}</p>
      </form>
    </div>
  </template>
  
  <script setup>
    import { ref } from 'vue'
    import axios from 'axios'

    const usuario = ref('')
    const email = ref('')
    const password = ref('')
    const error = ref('')
    const success = ref('')

    const API_URL = 'https://6911e74852a60f10c81fc27b.mockapi.io/usuarios' // 👈 reemplazá esto

    async function registrar() {
      error.value = ''
      success.value = ''

      try {
        // Traer usuarios actuales
        const { data: usuarios } = await axios.get(API_URL)

        // Verificar si ya existe el mail
        const existeMail = usuarios.some(u => u.email === email.value)
        if (existeMail) {
          error.value = 'Ya existe una cuenta registrada con este correo.'
          return
      }

        // Crear nuevo usuario
        await axios.post(API_URL, {
          usuario: usuario.value,
          email: email.value,
          password: password.value
        })

        success.value = 'Cuenta creada con éxito. Ya podés iniciar sesión.'
        usuario.value = ''
        email.value = ''
        password.value = ''
      } catch (err) {
        console.error(err)
        error.value = 'Hubo un error al registrar la cuenta.'
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
    max-width: 420px;
  }
  </style>
  
  
  
  