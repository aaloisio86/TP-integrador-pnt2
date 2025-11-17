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
  font-size: 15px;
  color: #e9ecef;
  background: rgba(33, 37, 41, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.table th {
  background: linear-gradient(135deg, #0d6efd, #0dcaf0);
  color: white;
  font-weight: 500;
  border: none;
  padding: 14px 16px;
  text-transform: uppercase;
  font-size: 0.8em;
  letter-spacing: 0.5px;
}

.table td {
  border-color: rgba(255, 255, 255, 0.1);
  padding: 12px 16px;
  vertical-align: middle;
  position: relative;
}

.table-hover tbody tr:hover {
  background: rgba(13, 110, 253, 0.2) !important;
  transform: translateY(-1px);
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(13, 110, 253, 0.2);
}

tbody tr {
  transition: all 0.3s ease;
  background: rgba(33, 37, 41, 0.7);
}

tbody tr:nth-child(even) {
  background: rgba(52, 58, 64, 0.7);
}

/* Status badges */
td:nth-child(3) {
  font-weight: 500;
}

td:nth-child(3):contains('Completada') {
  color: #20c997;
}

td:nth-child(3):contains('Pendiente') {
  color: #ffc107;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .table {
    font-size: 14px;
  }
  
  .table th, 
  .table td {
    padding: 10px 12px;
  }
}
</style>