<template>
    <ul class="list-group">
      <transition-group name="fade" tag="div">
        <li
          v-for="(tarea, index) in tareas"
          :key="index"
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <div class="d-flex align-items-center">
            <input
              type="checkbox"
              class="form-check-input me-2"
              v-model="tarea.completada"
            />
            <span
              :class="{
                'text-decoration-line-through text-muted': tarea.completada,
                'fw-bold': !tarea.completada
              }"
            >
              {{ tarea.texto }}
            </span>
  
            <!-- ✅ Animación al completar -->
            <span v-if="tarea.completada" class="ms-2 text-success fade-in">✅</span>
          </div>
          <button class="btn btn-danger btn-sm" @click="$emit('eliminar', index)">🗑️</button>
        </li>
      </transition-group>
    </ul>
  </template>
  
  <script setup>
  defineProps({
    tareas: Array
  })
  </script>
  
  <style scoped>
  /* 💫 Suaviza la aparición/desaparición */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  
  /* ✨ Animación para el check verde */
  .fade-in {
    animation: aparecer 0.3s ease-in-out;
  }
  @keyframes aparecer {
    from { opacity: 0; transform: scale(0.5); }
    to { opacity: 1; transform: scale(1); }
  }
  </style>
  
  
  