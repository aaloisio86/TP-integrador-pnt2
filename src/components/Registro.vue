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
  
  const usuario = ref('')
  const email = ref('')
  const password = ref('')
  const error = ref('')
  const success = ref('')
  
  function registrar() {
    const cuentas = JSON.parse(localStorage.getItem('cuentas')) || []
  
    const existeMail = cuentas.some(c => c.email === email.value)
    if (existeMail) {
      error.value = 'Ya existe una cuenta registrada con este correo.'
      success.value = ''
      return
    }
  
    const nuevaCuenta = {
      usuario: usuario.value,
      email: email.value,
      password: password.value
    }
  
    cuentas.push(nuevaCuenta)
    localStorage.setItem('cuentas', JSON.stringify(cuentas))
  
    success.value = 'Cuenta creada con éxito. Ya podés iniciar sesión.'
    error.value = ''
    usuario.value = ''
    email.value = ''
    password.value = ''
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
  
  
  
  