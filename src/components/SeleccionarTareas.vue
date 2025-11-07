<template>
    <div class="seleccion-container">
      <div class="overlay"></div>
  
      <div class="contenido text-center">
        <h2 class="fw-bold text-light mb-4">¡Bienvenido {{ nombreUsuario }}!</h2>
        <p class="text-light mb-4 fs-5">Elegí el tipo de tareas que querés gestionar:</p>

        <div class="d-flex justify-content-center flex-wrap gap-3">
          <button class="btn btn-outline-info btn-lg" @click="irA('personales')">Personales</button>
          <button class="btn btn-outline-warning btn-lg" @click="irA('estudio')">Estudio</button>
          <button class="btn btn-outline-success btn-lg" @click="irA('trabajo')">Trabajo</button>
          <button class="btn btn-outline-danger btn-lg" @click="irA('proyectos')">Proyectos</button>
        </div>
        <br>
        <button class="btn btn-outline-light mb-4" @click="router.push('/login')">← Cerrar sesión</button>

      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const nombreUsuario = ref('')
  
  // recuperar usuario desde localStorage (si existe)
  onMounted(() => {
    const user = JSON.parse(localStorage.getItem('user')) || null
    if (user) {
      nombreUsuario.value = user.usuario
    } else {
      router.push('/login')
    }
  })
  
  function irA(tipo) {
    router.push(`/home?tipo=${tipo}`)
  }
  </script>
  
  <style scoped>
  .seleccion-container {
    position: relative;
    background: url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1350&q=80')
      center/cover no-repeat;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  
  .contenido {
    position: relative;
    z-index: 2;
  }
  </style>
  