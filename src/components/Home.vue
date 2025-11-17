<template>
  <div class="home-container" :class="tipoTarea">
    <div class="overlay"></div>
    <div class="container py-5 contenido">
    <!-- 🔙 Título y botón volver -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <button class="btn btn-secondary" @click="volver">🔙 Volver</button>
      <h2 :class="tituloClase" class="m-0">📝 Tablero {{ tipoTarea }}</h2>
      <span class="badge bg-info text-dark">Pendientes: {{ pendientes }}</span>
    </div>

    <!-- 🎯 Filtros -->
    <div class="btn-group mb-4 w-100">
      <button class="btn" :class="{ 'btn-dark': filtro === 'todas', 'btn-outline-dark': filtro !== 'todas' }" @click="filtro = 'todas'">Todas</button>
      <button class="btn" :class="{ 'btn-danger': filtro === 'pendientes', 'btn-outline-danger': filtro !== 'pendientes' }" @click="filtro = 'pendientes'">Pendientes</button>
      <button class="btn" :class="{ 'btn-success': filtro === 'completadas', 'btn-outline-success': filtro !== 'completadas' }" @click="filtro = 'completadas'">Completadas</button>
    </div>

    <!-- ✍️ Agregar nueva tarea -->
    <div class="input-group mb-4">
      <input v-model="nuevaTarea" type="text" class="form-control" placeholder="Escribí una nueva tarea..." @keyup.enter="agregarTarea" :style="inputStyle" />
      <button class="btn btn-primary" @click="agregarTarea">Agregar</button>
    </div>

    <!-- 📋 Lista de tareas -->
    <ListaTareas :tareas="tareasFiltradas" @eliminar="eliminarTarea" />

    <!-- 💬 Mensajes -->
    <div v-if="tareas.length === 0" class="text-center text-muted mt-4">No hay tareas todavía.</div>
    <div v-else-if="pendientes === 0" class="text-center text-success mt-4 fw-bold">🎉 ¡Todas las tareas están completadas!</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ListaTareas from './ListaTareas.vue'

const route = useRoute()
const router = useRouter()
const tipoTarea = route.query.tipo || 'personal'

const nuevaTarea = ref('')
const tareas = ref([])
const filtro = ref('todas')

// ✅ Cargar tareas guardadas
onMounted(() => {
  const tareasGuardadas = JSON.parse(localStorage.getItem(`tareas-${tipoTarea}`)) || []
  tareas.value = tareasGuardadas
})

// ✅ Guardar automáticamente cuando cambian
watch(tareas, (nuevas) => {
  localStorage.setItem(`tareas-${tipoTarea}`, JSON.stringify(nuevas))
}, { deep: true })

// ✅ Agregar nueva tarea con fecha real
function agregarTarea() {
  if (nuevaTarea.value.trim() !== '') {
    tareas.value.push({
      texto: nuevaTarea.value,
      completada: false,
      fecha: new Date().toISOString() // ✅ fecha real
    })
    nuevaTarea.value = ''
  }
}

function eliminarTarea(index) {
  tareas.value.splice(index, 1)
}

function volver() {
  router.push('/seleccion-tareas')
}

const pendientes = computed(() => tareas.value.filter(t => !t.completada).length)

const tareasFiltradas = computed(() => {
  if (filtro.value === 'pendientes') return tareas.value.filter(t => !t.completada)
  if (filtro.value === 'completadas') return tareas.value.filter(t => t.completada)
  return tareas.value
})

const tituloClase = computed(() => ({
  'text-dark': tipoTarea === 'todos',
  'text-danger': tipoTarea === 'pendientes',
  'text-success': tipoTarea === 'completadas'
}))

const inputStyle = computed(() => ({
  borderColor: tipoTarea === 'pendientes' ? 'red' : tipoTarea === 'completadas' ? 'limegreen' : 'black',
  boxShadow: '0 0 4px rgba(0,0,0,0.2)'
}))
</script>

<style scoped>
/* Moved to the bottom for better organization */

.contenido {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 2rem auto;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  min-height: auto;
  overflow: visible;
  -webkit-overflow-scrolling: touch;
}

/* Fondos base */
.home-container {
  background-color: #f5f5f5;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 100vh;
  position: relative;
  width: 100%;
  height: auto;
  margin: 0;
  padding: 2rem 0;
  overflow-x: hidden;
}

/* Fondos según el tipo de tarea */
.home-container.personal {
  background-image: url('https://i0.wp.com/universal.org.mx/wp-content/uploads/2023/03/Dia-de-la-Familia.jpg?fit=860%2C525&ssl=1');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.home-container.estudio {
  background-image: url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.home-container.trabajo {
  background-image: url('https://cdn.prod.website-files.com/681c92407added77301eaeea/68874a16af8f4562cfeb2715_workaholic-persona-que-se-aplica-mucho-en-el-trabajo.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.home-container.proyectos {
  background-image: url('https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

/* Asegurar que el overlay no tape la imagen de fondo */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

/* Ajustes para móviles */
@media (max-width: 768px) {
  .contenido {
    margin: 1rem;
    padding: 1rem;
  }
}
</style>
