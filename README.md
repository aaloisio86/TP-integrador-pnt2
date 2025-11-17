TP - Gestor de Tareas (Vue 3)

Proyecto de tablero / gestor de tareas simple construido con Vue 3, Vue Router, Vuex (archivo presente), Bootstrap 5 y axios.
Guardado principal de tareas en localStorage. Incluye autenticación simulada contra un mock (GET/POST a mockapi).

📌 Resumen rápido

SPA con rutas: Login, Registro, SeleccionarTareas y Home (gestión por tipo: personal, estudio, trabajo, proyectos).

Estado de tareas por tipo guardado en localStorage (tareas-personal, tareas-estudio, etc.).

Componente global de grilla para ver todas las tareas juntas (GrillaTareas).

Interacción con API simulada en Login.vue y Registro.vue usando axios.

🔧 Tecnologías

Vue 3 (Vite)

Vue Router 4

Vuex (archivo store/index.js incluido)

Axios

Bootstrap 5

Vite

🚀 Scripts útiles (package.json)
# instalar dependencias
npm install

# modo desarrollo (vite)
npm run dev

# build para producción
npm run build

# vista previa build
npm run preview

Estructura del proyecto (relevante)
src/
  components/
    GrillaTareas.vue
    Home.vue
    ListaTareas.vue
    Login.vue
    Registro.vue
    SeleccionarTareas.vue
  router/
    index.js
  store/
    index.js
  App.vue
  main.js
package.json

👉 Cómo funciona (flujo principal)

Login / Registro

Login.vue consulta a API_URL = 'https://6911e74852a60f10c81fc27b.mockapi.io/usuarios' (GET) y busca coincidencia usuario + password. Si ok, guarda user en localStorage y redirige a /seleccion-tareas.

Registro.vue realiza GET para verificar mails existentes y POST para crear un nuevo usuario en la misma URL mock.

Pantalla Selección

SeleccionarTareas.vue lee localStorage para los 4 tipos: personal, estudio, trabajo, proyectos.

Construye un arreglo tareasGlobales con objetos formateados:

{
  id: 'personal-1',
  titulo: 'texto de la tarea',
  estado: 'Pendiente' | 'Completada',
  tipo: 'Personal' | 'Estudio' | ...
  fecha: fechaISO
}


Muestra la grilla global (GrillaTareas) con dichas tareas.

Home (por tipo)

Ruta /home?tipo=personal (u otro).

Home.vue carga tareas-<tipo> desde localStorage en onMounted.

Permite: agregar tarea (con fecha: new Date().toISOString()), marcar completada (checkbox en ListaTareas), eliminar (evento emitido desde ListaTareas hacia Home).

Campos cuidados: watch de tareas guarda automáticamente en localStorage (deep: true).

Componentes

GrillaTareas.vue — Tabla estilizada que recibe tareas (prop: Array) y formatea fechas con formatearFecha.

ListaTareas.vue — Lista con transition-group, checkbox ligado a tarea.completada, emite eliminar con el índice.

Login.vue / Registro.vue — Formularios con validaciones de longitud y control básico de errores.

SeleccionarTareas.vue — Muestra GrillaTareas y botones para navegar al Home correspondiente.

🧾 Detalle por componente (qué hace y qué guarda)
GrillaTareas.vue

Props: tareas: Array (requerido)

Métodos: formatearFecha(fecha) → devuelve DD/MM/YYYY o Sin fecha.

Estilos: tabla con table-striped table-hover y clases scoped; usa :contains(...) en CSS (nota: :contains() no es un selector CSS estándar — ver sección Notas / recomendaciones).

Home.vue

Keys de localStorage: tareas-<tipo> (ej: tareas-personal)

Estados:

nuevaTarea (string)

tareas (array con objetos { texto, completada, fecha })

filtro (todas | pendientes | completadas)

Funciones principales:

agregarTarea() agrega con fecha: new Date().toISOString()

eliminarTarea(index) elimina del array

volver() redirige a /seleccion-tareas

ListaTareas.vue

Props: tareas (definido con defineProps)

Emits: eliminar con índice

Animaciones: transition-group + keyframes

Login.vue / Registro.vue

API: https://6911e74852a60f10c81fc27b.mockapi.io/usuarios

Login: GET para traer todos los usuarios y buscar coincidencia; guarda user en localStorage.

Registro: GET para verificar email único y POST para crear nuevo usuario.

SeleccionarTareas.vue

Carga tareas de los 4 tipos y construye tareasGlobales.

Botón de logout redirige a /login (no borra localStorage automáticamente).

🔁 Rutas (router/index.js)
{ path: '/', redirect: '/login' }
{ path: '/login', component: Login }
{ path: '/registro', component: Registro }
{ path: '/seleccion-tareas', component: SeleccionTareas }
{ path: '/home', component: Home }  // usa query param: ?tipo=personal

🧠 Store (store/index.js)

Archivo con Vuex simple:

state: tasks: []

mutation: setTasks

action: fetchTasks → axios.get('https://mockapi.io/api/v1/tasks')

Nota: el store está presente, pero el main.js del proyecto tal como está no lo monta con .use(store). (Si querés usarlo, integrar import store from './store' y .use(store) en main.js.)

⚙️ Configuración local y consejos

Instalar dependencias

npm install


Levantar en modo desarrollo

npm run dev


Abre la URL que te muestra Vite (ej. http://localhost:5173).

Mock API

Login / Registro usan un mock público. Si el mock cambia o falla, las funcionalidades relacionadas dejarán de funcionar (error en consola o error mostrado en UI).

🐞 Problemas conocidos / troubleshooting

:contains() en CSS no funciona en navegadores modernos — algunos selectores en GrillaTareas.vue usan td:nth-child(3):contains('Completada') que no es válido en CSS estándar. Si ves que el color de estado no cambia, ese es el motivo. Recomendación: usar clases dinámicas en el template para estados en vez de ese selector CSS.

Store no montado: store/index.js existe pero main.js no lo está usando. Si necesitas un store global, importar y .use(store) en main.js.

Duplicado de import en main.js: al final del archivo aparece otra línea import 'bootstrap/dist/css/bootstrap.min.css'; — no rompe pero es redundante.

localStorage: los datos son específicos por tipo. Si cambias la forma de guardar, puede romper SeleccionarTareas.vue o la vista global.

✅ Buenas prácticas / mejoras sugeridas (no obligatorias)

Reemplazar localStorage por un store central (Pinia o Vuex montado) para sincronizar vistas y facilitar testing.

Añadir un logout que borre localStorage (o al menos remueva user) para seguridad.

Reemplazar :contains() por clases (tarea.estado === 'Completada' ? 'text-success' : 'text-warning') para colores.

Controlar indices en eliminación global: SeleccionarTareas.vue muestra tareasGlobales pero eliminar ahí no quita la tarea del localStorage del tipo original. Si querés persistencia real al eliminar desde grilla global, habría que mapear al origen y borrar en su key.

💡 Ejemplos útiles (fragmentos de uso)

Agregar tarea (Home.vue):

tareas.value.push({
  texto: nuevaTarea.value,
  completada: false,
  fecha: new Date().toISOString()
})


Leer tareas globales (SeleccionarTareas.vue):

const lista = JSON.parse(localStorage.getItem(`tareas-${tipo}`)) || []
lista.forEach((t, i) => {
  todas.push({
    id: `${tipo}-${i + 1}`,
    titulo: t.texto,
    estado: t.completada ? 'Completada' : 'Pendiente',
    tipo: tipo.charAt(0).toUpperCase() + tipo.slice(1),
    fecha: t.fecha || new Date().toISOString()
  })
})

👥 Autores / Créditos
Autores del TP: [Alejandro Aloisio,Juan Cornejo,Juan Pappalardo,Facundo Folgueira]
Librerías: Vue 3, Vue Router, Vuex (archivo presente), Bootstrap, axios

✅ Conclusión

Este README explica la estructura, el flujo y el uso del TP tal como está actualmente: funciona localmente con localStorage y usa un mock para autenticación. Incluí notas sobre mejoras y problemas conocidos (por ejemplo selector CSS no estándar y store no montado) como recomendaciones conservadoras que podés aplicar luego si querés.