<template>
  <div class="seleccion-container">
    <div class="overlay"></div>
    <!-- Botón de cerrar sesión en esquina superior izquierda -->
    <button class="btn btn-outline-light logout-btn" @click="router.push('/login')">
      <i class="bi bi-box-arrow-left"></i> Cerrar sesión
    </button>
    
    <div class="contenido text-center">
      <h2 class="fw-bold text-light mb-4">¡Bienvenido {{ nombreUsuario }}!</h2>
      <p class="text-light mb-4 fs-5">Elegí el tipo de tareas que querés gestionar:</p>

      <!-- Botones -->
      <div class="d-flex justify-content-center flex-wrap gap-3 mb-4">
        <button class="btn btn-outline-info btn-lg" @click="irA('personal')">Personal</button>
        <button class="btn btn-outline-warning btn-lg" @click="irA('estudio')">Estudio</button>
        <button class="btn btn-outline-success btn-lg trabajo-btn" @click="irA('trabajo')">Trabajo</button>
        <button class="btn btn-outline-danger btn-lg" @click="irA('proyectos')">Proyectos</button>
      </div>

      <!-- ✅ Grilla global -->
      <h3 class="text-light mt-4">Listado global de tareas</h3>
      <GrillaTareas :tareas="tareasGlobales" @eliminar="eliminarTareaGlobal" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import GrillaTareas from './GrillaTareas.vue'

const router = useRouter()
const nombreUsuario = ref('')
const tareasGlobales = ref([])

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user')) || null
  if (user) {
    nombreUsuario.value = user.usuario
  } else {
    router.push('/login')
  }

  // ✅ Cargar todas las tareas desde localStorage
  const tipos = ['personal', 'estudio', 'trabajo', 'proyectos']
  let todas = []
  tipos.forEach(tipo => {
    const lista = JSON.parse(localStorage.getItem(`tareas-${tipo}`)) || []
    lista.forEach((t, i) => {
      todas.push({
        id: `${tipo}-${i + 1}`,
        titulo: t.texto,
        estado: t.completada ? 'Completada' : 'Pendiente',
        tipo: tipo.charAt(0).toUpperCase() + tipo.slice(1),
        fecha: t.fecha || new Date().toISOString() // ✅ usar fecha guardada o actual
      })
    })
  })
  tareasGlobales.value = todas
})

function irA(tipo) {
  router.push(`/home?tipo=${tipo}`)
}

function eliminarTareaGlobal(index) {
  tareasGlobales.value.splice(index, 1)
}
</script>

<style scoped>
.seleccion-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80')
    center/cover no-repeat fixed;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  padding: 2rem 0;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.contenido {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
  padding: 2rem;
}

/* Ensure the content is scrollable if it's taller than the viewport */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow-x: hidden;
}

/* Estilos para el botón de cerrar sesión */
.logout-btn {
  position: fixed;
  top: 1.5rem;
  left: 1.5rem;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Estilo para el botón de trabajo */
.trabajo-btn {
  --bs-btn-color: #75b798;
  --bs-btn-border-color: #75b798;
  --bs-btn-hover-bg: #75b798;
  --bs-btn-hover-border-color: #75b798;
  --bs-btn-active-bg: #5da384;
  --bs-btn-active-border-color: #5da384;
}

.trabajo-btn:hover {
  --bs-btn-hover-color: #fff;
}

/* Ajuste para dispositivos móviles */
@media (max-width: 768px) {
  .logout-btn {
    top: 1rem;
    left: 1rem;
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
}
</style>