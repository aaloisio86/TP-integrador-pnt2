<template>
  <div class="table-responsive mt-4">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Estado</th>
          <th>Tipo</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tarea in tareas" :key="tarea.id">
          <td>{{ tarea.id }}</td>
          <td>{{ tarea.titulo }}</td>
          <td>{{ tarea.estado }}</td>
          <td>{{ tarea.tipo }}</td>
          <td>{{ formatearFecha(tarea.fecha) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'GrillaTareas',
  props: {
    tareas: {
      type: Array,
      required: true
    }
  },
  methods: {
    formatearFecha(fecha) {
  if (!fecha) return 'Sin fecha'
  const d = new Date(fecha)
  if (isNaN(d)) return 'Sin fecha'
  const dia = String(d.getDate()).padStart(2, '0')
  const mes = String(d.getMonth() + 1).padStart(2, '0')
  const anio = d.getFullYear()
  return `${dia}/${mes}/${anio}`
}
  }
}
</script>

<style scoped>
.table {
  font-size: 14px;
}
</style>