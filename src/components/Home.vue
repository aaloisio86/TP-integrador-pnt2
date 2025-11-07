<template>
    <div class="container py-5">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <button class="btn btn-secondary mb-3" @click="volver">🔙 Volver</button>
        <h2 class="m-0">📝 Tareas {{ tipoTarea }}</h2>
      </div>
  
      <!-- resto del código igual -->
      <div class="input-group mb-4">
        <input
          v-model="nuevaTarea"
          type="text"
          class="form-control"
          placeholder="Escribí una nueva tarea..."
          @keyup.enter="agregarTarea"
        />
        <button class="btn btn-primary" @click="agregarTarea">Agregar</button>
      </div>
  
      <ul class="list-group">
        <li
          v-for="(tarea, index) in tareas"
          :key="index"
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <div>
            <input
              type="checkbox"
              class="form-check-input me-2"
              v-model="tarea.completada"
            />
            <span :class="{ 'text-decoration-line-through text-muted': tarea.completada }">
              {{ tarea.texto }}
            </span>
          </div>
          <button class="btn btn-danger btn-sm" @click="eliminarTarea(index)">🗑️</button>
        </li>
      </ul>
  
      <div v-if="tareas.length === 0" class="text-center text-muted mt-4">
        No hay tareas todavía.
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  
  const route = useRoute()
  const router = useRouter()
  const tipoTarea = route.params.tipo
  
  const nuevaTarea = ref('')
  const tareas = ref([])
  
  // Cargar tareas guardadas
  onMounted(() => {
    const tareasGuardadas = JSON.parse(localStorage.getItem(`tareas-${tipoTarea}`)) || []
    tareas.value = tareasGuardadas
  })
  
  // Guardar automáticamente cuando cambian
  watch(tareas, (nuevas) => {
    localStorage.setItem(`tareas-${tipoTarea}`, JSON.stringify(nuevas))
  }, { deep: true })
  
  function agregarTarea() {
    if (nuevaTarea.value.trim() !== '') {
      tareas.value.push({ texto: nuevaTarea.value, completada: false })
      nuevaTarea.value = ''
    }
  }
  
  function eliminarTarea(index) {
    tareas.value.splice(index, 1)
  }
  
  // 🔙 Botón volver
  function volver() {
    router.push('/seleccion-tareas')
  }
  </script>
  
  
  <style scoped>
  .container {
    max-width: 600px;
  }
  </style>
  
  