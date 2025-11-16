<template>
  <div class="seleccion-container">
    <div class="overlay"></div>
    <div class="contenido text-center">
      <h2 class="fw-bold text-light mb-4">¡Bienvenido {{ nombreUsuario }}!</h2>
      <p class="text-light mb-4 fs-5">Elegí el tipo de tareas que querés gestionar:</p>

      <!-- Botones -->
      <div class="d-flex justify-content-center flex-wrap gap-3 mb-4">
        <button class="btn btn-outline-info btn-lg" @click="irA('personales')">Personales</button>
        <button class="btn btn-outline-warning btn-lg" @click="irA('estudio')">Estudio</button>
        <button class="btn btn-outline-success btn-lg" @click="irA('trabajo')">Trabajo</button>
        <button class="btn btn-outline-danger btn-lg" @click="irA('proyectos')">Proyectos</button>
      </div>

      <button class="btn btn-outline-light mb-4" @click="router.push('/login')">← Cerrar sesión</button>

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
  const tipos = ['personales', 'estudio', 'trabajo', 'proyectos']
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
  max-width: 800px;
  width: 100%;
}
</style>