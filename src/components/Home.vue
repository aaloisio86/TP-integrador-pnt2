<template>
  <div class="container py-5">
    <!-- 🔙 Título y botón volver -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <button class="btn btn-secondary" @click="volver">🔙 Volver</button>

      <h2 :class="tituloClase" class="m-0">📝 Tareas {{ tipoTarea }}</h2>
      <span class="badge bg-info text-dark">Pendientes: {{ pendientes }}</span>
    </div>

    <!-- 🎯 Filtros -->
    <div class="btn-group mb-4 w-100">
      <button
        class="btn"
        :class="{ 'btn-dark': filtro === 'todas', 'btn-outline-dark': filtro !== 'todas' }"
        @click="filtro = 'todas'"
      >
        Todas
      </button>
      <button
        class="btn"
        :class="{ 'btn-danger': filtro === 'pendientes', 'btn-outline-danger': filtro !== 'pendientes' }"
        @click="filtro = 'pendientes'"
      >
        Pendientes
      </button>
      <button
        class="btn"
        :class="{ 'btn-success': filtro === 'completadas', 'btn-outline-success': filtro !== 'completadas' }"
        @click="filtro = 'completadas'"
      >
        Completadas
      </button>
    </div>

    <!-- ✍️ Agregar nueva tarea -->
    <div class="input-group mb-4">
      <input
        v-model="nuevaTarea"
        type="text"
        class="form-control"
        placeholder="Escribí una nueva tarea..."
        @keyup.enter="agregarTarea"
        :style="inputStyle"
      />
      <button class="btn btn-primary" @click="agregarTarea">Agregar</button>
    </div>

    <!-- 📋 Lista de tareas (componente hijo) -->
    <ListaTareas
      :tareas="tareasFiltradas"
      @eliminar="eliminarTarea"
    />

    <!-- 💬 Mensajes de estado -->
    <div v-if="tareas.length === 0" class="text-center text-muted mt-4">
      No hay tareas todavía.
    </div>

    <div v-else-if="pendientes === 0" class="text-center text-success mt-4 fw-bold">
      🎉 ¡Todas las tareas están completadas!
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ListaTareas from './ListaTareas.vue'

const route = useRoute()
const router = useRouter()
const tipoTarea = route.params.tipo

const nuevaTarea = ref('')
const tareas = ref([])
const filtro = ref('todas')

// 📦 Cargar tareas guardadas
onMounted(() => {
  const tareasGuardadas = JSON.parse(localStorage.getItem(`tareas-${tipoTarea}`)) || []
  tareas.value = tareasGuardadas
})

// 💾 Guardar automáticamente cuando cambian
watch(
  tareas,
  (nuevas) => {
    localStorage.setItem(`tareas-${tipoTarea}`, JSON.stringify(nuevas))
  },
  { deep: true }
)

// ➕ Agregar nueva tarea
function agregarTarea() {
  if (nuevaTarea.value.trim() !== '') {
    tareas.value.push({ texto: nuevaTarea.value, completada: false })
    nuevaTarea.value = ''
  }
}

// 🗑️ Eliminar tarea
function eliminarTarea(index) {
  tareas.value.splice(index, 1)
}

// 🔙 Volver atrás
function volver() {
  router.push('/seleccion-tareas')
}

// 🧮 Computed: cantidad de tareas pendientes
const pendientes = computed(() => tareas.value.filter(t => !t.completada).length)

// 🎯 Computed: aplicar filtro
const tareasFiltradas = computed(() => {
  if (filtro.value === 'pendientes') return tareas.value.filter(t => !t.completada)
  if (filtro.value === 'completadas') return tareas.value.filter(t => t.completada)
  return tareas.value
})

// 🎨 :class dinámico para el título
const tituloClase = computed(() => ({
  'text-dark': tipoTarea === 'todos',
  'text-danger': tipoTarea === 'pendientes',
  'text-success': tipoTarea === 'completadas'
}))

// 🎨 :style dinámico para el input
const inputStyle = computed(() => ({
  borderColor:
    tipoTarea === 'pendientes'
      ? 'red'
      : tipoTarea === 'completadas'
      ? 'limegreen'
      : 'black',
  boxShadow: '0 0 4px rgba(0,0,0,0.2)'
}))
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>


  
  