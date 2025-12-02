import React, { useState } from 'react';
import './Guias.css';

const Guia_8 = () => {
  const [copiado, setCopiado] = useState(null);

  const copiarCodigo = (codigo, id) => {
    navigator.clipboard.writeText(codigo);
    setCopiado(id);
    setTimeout(() => setCopiado(null), 2000);
  };

  const ejemplosCodigo = {
    conceptosBasicos: `// === CONCEPTOS BÁSICOS DEL DOM ===

// El DOM (Document Object Model) es una interfaz de programación
// que representa el documento HTML como un árbol de nodos

// Estructura HTML de ejemplo:
/*
<!DOCTYPE html>
<html>
  <head>
    <title>Mi Página</title>
  </head>
  <body>
    <h1 id="titulo">Hola, mundo</h1>
    <p class="parrafo">Este es un párrafo.</p>
    <button id="miBoton">Haz clic aquí</button>
  </body>
</html>
*/

// En este ejemplo:
// - El nodo raíz es <html>
// - Los nodos hijos son <head> y <body>
// - Dentro de <body>, hay nodos como <h1>, <p> y <button>

// Tipos de nodos en el DOM:
// - Element nodes: <div>, <p>, <h1>, etc.
// - Attribute nodes: class="miClase", id="elemento", etc.
// - Text nodes: El texto dentro de los elementos
// - Comment nodes: <!-- comentarios -->

console.log("=== ESTRUCTURA DEL DOM ===");
console.log("document:", document);
console.log("document.documentElement:", document.documentElement); // <html>
console.log("document.head:", document.head);
console.log("document.body:", document.body);`,

    metodosSeleccion: `// === MÉTODOS AVANZADOS PARA SELECCIONAR ELEMENTOS ===

// HTML de referencia:
/*
<div id="contenedor">
  <h1 id="titulo">Título Principal</h1>
  <p class="parrafo">Párrafo 1</p>
  <p class="parrafo">Párrafo 2</p>
  <button class="boton">Botón 1</button>
  <button class="boton">Botón 2</button>
  <div class="caja">Caja 1</div>
  <div class="caja">Caja 2</div>
</div>
*/

// 1. document.getElementById(id) - Selecciona por ID único
const titulo = document.getElementById('titulo');
console.log("getElementById:", titulo); // <h1 id="titulo">

// 2. document.querySelector(selector) - Primer elemento que coincida
const primerParrafo = document.querySelector('.parrafo');
console.log("querySelector:", primerParrafo); // Primer <p class="parrafo">

const primerBoton = document.querySelector('button');
console.log("querySelector button:", primerBoton); // Primer <button>

// 3. document.querySelectorAll(selector) - Todos los elementos (NodeList)
const parrafos = document.querySelectorAll('.parrafo');
console.log("querySelectorAll .parrafo:", parrafos);
parrafos.forEach((parrafo, index) => {
    console.log(\`Párrafo \${index + 1}:\`, parrafo.textContent);
});

// 4. document.getElementsByClassName(clase) - HTMLCollection
const elementosParrafo = document.getElementsByClassName('parrafo');
console.log("getElementsByClassName:", elementosParrafo);

// 5. document.getElementsByTagName(etiqueta) - HTMLCollection
const botones = document.getElementsByTagName('button');
console.log("getElementsByTagName button:", botones);

// Diferencias importantes:
// - querySelectorAll devuelve NodeList (más métodos disponibles)
// - getElementsByClassName/getElementsByTagName devuelven HTMLCollection
// - NodeList es estático, HTMLCollection es vivo (se actualiza automáticamente)

// Selecciones complejas con CSS
const parrafoEnContenedor = document.querySelector('#contenedor .parrafo');
const segundoBoton = document.querySelector('.boton:nth-child(2)');
const botonesConClase = document.querySelectorAll('button.boton');

console.log("Selección compleja:", parrafoEnContenedor);
console.log("Segundo botón:", segundoBoton);
console.log("Botones con clase:", botonesConClase);`,

    modificarElementos: `// === MODIFICAR ELEMENTOS DEL DOM ===

// HTML de referencia:
/*
<div id="contenedor">
  <p id="miParrafo">Texto original</p>
  <div id="caja" style="width: 100px; height: 100px; background: red;"></div>
  <img id="miImagen" src="imagen-vieja.jpg" alt="Imagen">
  <a id="enlace" href="#">Enlace original</a>
</div>
*/

// 1. Cambiar contenido de texto con textContent
const parrafo = document.querySelector('#miParrafo');
parrafo.textContent = 'Este es un nuevo texto';
console.log("textContent modificado:", parrafo.textContent);

// 2. Cambiar contenido HTML con innerHTML
const contenedor = document.querySelector('#contenedor');
contenedor.innerHTML += '<strong>Texto en negrita agregado</strong>';
console.log("innerHTML modificado:", contenedor.innerHTML);

// 3. Cambiar estilos directamente
const caja = document.querySelector('#caja');
caja.style.backgroundColor = 'blue';
caja.style.color = 'white';
caja.style.fontSize = '20px';
caja.style.border = '2px solid black';
caja.style.borderRadius = '10px';

// 4. Modificar atributos
const imagen = document.querySelector('#miImagen');
imagen.setAttribute('src', 'ruta/nueva-imagen.jpg');
imagen.setAttribute('alt', 'Nueva imagen descriptiva');

const enlace = document.querySelector('#enlace');
enlace.setAttribute('href', 'https://www.ejemplo.com');
enlace.setAttribute('target', '_blank');

// 5. Obtener atributos
const srcImagen = imagen.getAttribute('src');
console.log("Src de la imagen:", srcImagen);

// 6. Verificar si existe un atributo
if (enlace.hasAttribute('target')) {
    console.log("El enlace tiene target");
}

// 7. Remover atributos
enlace.removeAttribute('title'); // Si existiera

// 8. Modificar propiedades directamente
imagen.alt = 'Texto alternativo modificado';
enlace.href = 'https://www.otro-ejemplo.com';

// 9. Trabajar con data attributes
// <div id="producto" data-id="123" data-precio="29.99">Producto</div>
const producto = document.querySelector('#producto');
const idProducto = producto.dataset.id;
const precioProducto = producto.dataset.precio;
console.log(\`Producto ID: \${idProducto}, Precio: $\${precioProducto}\`);

// Modificar data attributes
producto.dataset.categoria = 'electronica';
producto.dataset.precio = '39.99';`,

    crearEliminarElementos: `// === CREAR Y ELIMINAR ELEMENTOS ===

// HTML de referencia:
/*
<div id="contenedorPadre">
  <div id="elementoExistente">Elemento existente</div>
</div>
<ul id="lista"></ul>
*/

// 1. Crear un nuevo elemento
const nuevoDiv = document.createElement('div');
nuevoDiv.textContent = 'Soy un nuevo div creado con JavaScript';
nuevoDiv.className = 'nuevo-elemento';
nuevoDiv.style.padding = '10px';
nuevoDiv.style.border = '1px solid #ccc';

// 2. Añadir el elemento al body
document.body.appendChild(nuevoDiv);

// 3. Añadir elemento a un contenedor específico
const contenedorPadre = document.querySelector('#contenedorPadre');
contenedorPadre.appendChild(nuevoDiv);

// 4. Crear elemento con atributos complejos
const nuevoBoton = document.createElement('button');
nuevoBoton.textContent = 'Botón Dinámico';
nuevoBoton.setAttribute('id', 'botonDinamico');
nuevoBoton.setAttribute('class', 'btn btn-primary');
nuevoBoton.setAttribute('data-accion', 'guardar');

// 5. Insertar antes de un elemento específico
const elementoExistente = document.querySelector('#elementoExistente');
contenedorPadre.insertBefore(nuevoBoton, elementoExistente);

// 6. Crear lista dinámica
const lista = document.querySelector('#lista');
const elementos = ['Manzana', 'Banana', 'Naranja', 'Uva'];

elementos.forEach((fruta, index) => {
    const li = document.createElement('li');
    li.textContent = \`\${index + 1}. \${fruta}\`;
    li.setAttribute('data-indice', index);
    lista.appendChild(li);
});

// 7. Eliminar un elemento
const elementoAEliminar = document.querySelector('#elementoExistente');
if (elementoAEliminar) {
    elementoAEliminar.remove();
}

// 8. Eliminar desde el padre
const primerLi = lista.querySelector('li');
if (primerLi) {
    lista.removeChild(primerLi);
}

// 9. Reemplazar un elemento
const viejoElemento = document.querySelector('#viejo'); // Si existiera
if (viejoElemento) {
    const nuevoElemento = document.createElement('span');
    nuevoElemento.textContent = 'Nuevo elemento de reemplazo';
    nuevoElemento.className = 'reemplazo';
    viejoElemento.replaceWith(nuevoElemento);
}

// 10. Clonar elementos
const original = document.querySelector('.nuevo-elemento');
if (original) {
    const clon = original.cloneNode(true); // true = clon profundo
    clon.textContent = 'Soy un clon';
    document.body.appendChild(clon);
}

// 11. Vaciar un contenedor
// lista.innerHTML = ''; // Una forma
while (lista.firstChild) {
    lista.removeChild(lista.firstChild); // Otra forma
}`,

    manejarEventos: `// === MANEJAR EVENTOS ===

// HTML de referencia:
/*
<button id="miBoton">Haz clic aquí</button>
<div id="cajaEventos" style="width: 200px; height: 200px; background: lightblue;">
    Pasa el mouse por aquí
</div>
<input type="text" id="miInput" placeholder="Escribe algo...">
<form id="miFormulario">
    <input type="text" name="usuario" placeholder="Usuario">
    <button type="submit">Enviar</button>
</form>
<div id="contenedorDelegacion">
    <button class="boton-dinamico">Botón 1</button>
    <button class="boton-dinamico">Botón 2</button>
    <button class="boton-dinamico">Botón 3</button>
</div>
*/

// 1. Evento click básico
const boton = document.querySelector('#miBoton');
boton.addEventListener('click', (event) => {
    alert('¡Botón presionado!');
    console.log('Evento click:', event);
    console.log('Elemento clickeado:', event.target);
});

// 2. Eventos de mouse
const cajaEventos = document.querySelector('#cajaEventos');
cajaEventos.addEventListener('mouseover', () => {
    cajaEventos.style.backgroundColor = 'lightgreen';
    console.log('Mouse sobre la caja');
});

cajaEventos.addEventListener('mouseout', () => {
    cajaEventos.style.backgroundColor = 'lightblue';
    console.log('Mouse fuera de la caja');
});

cajaEventos.addEventListener('mousedown', () => {
    console.log('Mouse presionado en la caja');
});

cajaEventos.addEventListener('mouseup', () => {
    console.log('Mouse liberado en la caja');
});

// 3. Eventos de teclado
const input = document.querySelector('#miInput');
input.addEventListener('keydown', (event) => {
    console.log(\`Tecla presionada: \${event.key}, Código: \${event.code}\`);
});

input.addEventListener('keyup', (event) => {
    console.log(\`Tecla liberada: \${event.key}\`);
});

input.addEventListener('input', (event) => {
    console.log(\`Valor actual: \${event.target.value}\`);
});

// 4. Evento de formulario
const formulario = document.querySelector('#miFormulario');
formulario.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita que se envíe el formulario
    console.log('Formulario enviado');
    const datos = new FormData(formulario);
    console.log('Usuario:', datos.get('usuario'));
});

// 5. Delegación de eventos
const contenedorDelegacion = document.querySelector('#contenedorDelegacion');
contenedorDelegacion.addEventListener('click', (event) => {
    if (event.target.matches('.boton-dinamico')) {
        alert(\`Botón delegado presionado: \${event.target.textContent}\`);
        console.log('Target:', event.target);
        console.log('CurrentTarget:', event.currentTarget);
    }
});

// 6. Múltiples eventos en un elemento
const elementoMultiple = document.querySelector('#miBoton');
const manejadorClick = () => console.log('Click registrado');
const manejadorDobleClick = () => console.log('Doble click registrado');

elementoMultiple.addEventListener('click', manejadorClick);
elementoMultiple.addEventListener('dblclick', manejadorDobleClick);

// 7. Remover event listeners
// elementoMultiple.removeEventListener('click', manejadorClick);

// 8. Eventos de carga
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM completamente cargado y parseado');
});

window.addEventListener('load', () => {
    console.log('Página completamente cargada (incluyendo imágenes)');
});

// 9. Prevenir comportamiento por defecto y propagación
document.querySelector('a').addEventListener('click', (event) => {
    event.preventDefault(); // Previene la navegación
    event.stopPropagation(); // Detiene la propagación
    console.log('Enlace clickeado pero no navega');
});`,

    trabajarClases: `// === TRABAJAR CON CLASES ===

// HTML de referencia:
/*
<div id="miElemento" class="base inicial">Elemento de prueba</div>
<button id="btnAgregar">Agregar Clase</button>
<button id="btnQuitar">Quitar Clase</button>
<button id="btnToggle">Alternar Clase</button>
<button id="btnVerificar">Verificar Clases</button>
*/

// CSS de ejemplo:
/*
.base { padding: 20px; margin: 10px; }
.inicial { background-color: #f0f0f0; }
.activo { background-color: #4CAF50; color: white; }
.importante { font-weight: bold; border: 2px solid red; }
.visible { display: block; }
.oculto { display: none; }
.grande { font-size: 24px; }
*/

const elemento = document.querySelector('#miElemento');
const btnAgregar = document.querySelector('#btnAgregar');
const btnQuitar = document.querySelector('#btnQuitar');
const btnToggle = document.querySelector('#btnToggle');
const btnVerificar = document.querySelector('#btnVerificar');

// 1. Agregar una clase
btnAgregar.addEventListener('click', () => {
    elemento.classList.add('activo', 'importante', 'grande');
    console.log('Clases agregadas:', elemento.classList);
});

// 2. Quitar una clase
btnQuitar.addEventListener('click', () => {
    elemento.classList.remove('inicial', 'importante');
    console.log('Clases después de quitar:', elemento.classList);
});

// 3. Alternar una clase
btnToggle.addEventListener('click', () => {
    elemento.classList.toggle('activo');
    elemento.classList.toggle('oculto');
    console.log('Clases después de toggle:', elemento.classList);
});

// 4. Verificar si tiene una clase
btnVerificar.addEventListener('click', () => {
    const tieneActivo = elemento.classList.contains('activo');
    const tieneOculto = elemento.classList.contains('oculto');
    
    console.log(\`¿Tiene clase 'activo'? \${tieneActivo}\`);
    console.log(\`¿Tiene clase 'oculto'? \${tieneOculto}\`);
    
    if (tieneActivo) {
        console.log('El elemento está activo');
    }
});

// 5. Reemplazar una clase
function reemplazarClase(viejaClase, nuevaClase) {
    if (elemento.classList.contains(viejaClase)) {
        elemento.classList.replace(viejaClase, nuevaClase);
        console.log(\`Clase '\${viejaClase}' reemplazada por '\${nuevaClase}'\`);
    }
}

// 6. Iterar sobre todas las clases
function listarClases() {
    console.log('Todas las clases del elemento:');
    elemento.classList.forEach(clase => {
        console.log(\` - \${clase}\`);
    });
}

// 7. Ejemplo práctico: Acordeón
const acordeones = document.querySelectorAll('.acordeon');
acordeones.forEach(acordeon => {
    const titulo = acordeon.querySelector('.acordeon-titulo');
    const contenido = acordeon.querySelector('.acordeon-contenido');
    
    titulo.addEventListener('click', () => {
        // Cerrar todos los demás acordeones
        acordeones.forEach(acc => {
            if (acc !== acordeon) {
                acc.classList.remove('activo');
            }
        });
        
        // Alternar el acordeón actual
        acordeon.classList.toggle('activo');
    });
});

// 8. Ejemplo: Validación de formulario en tiempo real
const inputs = document.querySelectorAll('.input-validacion');
inputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() === '') {
            input.classList.add('error');
            input.classList.remove('valido');
        } else {
            input.classList.add('valido');
            input.classList.remove('error');
        }
    });
});

// 9. Trabajar con className (método antiguo)
// elemento.className = 'nueva-clase'; // Reemplaza todas las clases
// elemento.className += ' clase-adicional'; // Agrega una clase

// 10. Ventajas de classList sobre className:
// - No sobrescribe clases existentes
// - Métodos más específicos (add, remove, toggle, contains)
// - Mejor rendimiento con múltiples clases
// - Más legible y mantenible`,

    ejemploAvanzado: `// === EJEMPLO AVANZADO: LISTA DINÁMICA ===

// HTML completo:
/*
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lista Dinámica</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; }
    .completado { 
        text-decoration: line-through; 
        color: #888;
        background-color: #f9f9f9;
    }
    .tarea { 
        padding: 10px; 
        margin: 5px 0; 
        border: 1px solid #ddd;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    .tarea:hover { background-color: #f0f0f0; }
    .tarea.completado:hover { background-color: #e9e9e9; }
    .urgente { border-left: 4px solid #e74c3c; }
    .importante { border-left: 4px solid #f39c12; }
    .normal { border-left: 4px solid #3498db; }
    input, button { padding: 10px; margin: 5px; }
    button { cursor: pointer; }
    #estadisticas { margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 5px; }
  </style>
</head>
<body>
  <h1>📝 Lista de Tareas Avanzada</h1>
  
  <div id="controles">
    <input type="text" id="nuevaTarea" placeholder="Nueva tarea..." maxlength="100">
    <select id="prioridad">
      <option value="normal">Normal</option>
      <option value="importante">Importante</option>
      <option value="urgente">Urgente</option>
    </select>
    <button id="agregar">➕ Agregar</button>
    <button id="limpiarCompletadas">🧹 Limpiar Completadas</button>
    <button id="limpiarTodo">🗑️ Limpiar Todo</button>
  </div>

  <div id="estadisticas">
    <strong>Estadísticas:</strong>
    <span id="totalTareas">Total: 0</span> | 
    <span id="tareasCompletadas">Completadas: 0</span> | 
    <span id="tareasPendientes">Pendientes: 0</span>
  </div>

  <ul id="listaTareas"></ul>

  <script>
    // Selección de elementos
    const input = document.getElementById('nuevaTarea');
    const selectPrioridad = document.getElementById('prioridad');
    const botonAgregar = document.getElementById('agregar');
    const botonLimpiarCompletadas = document.getElementById('limpiarCompletadas');
    const botonLimpiarTodo = document.getElementById('limpiarTodo');
    const lista = document.getElementById('listaTareas');
    const totalTareas = document.getElementById('totalTareas');
    const tareasCompletadas = document.getElementById('tareasCompletadas');
    const tareasPendientes = document.getElementById('tareasPendientes');

    // Array para almacenar las tareas
    let tareas = [];

    // Función para actualizar estadísticas
    function actualizarEstadisticas() {
        const total = tareas.length;
        const completadas = tareas.filter(t => t.completada).length;
        const pendientes = total - completadas;
        
        totalTareas.textContent = \`Total: \${total}\`;
        tareasCompletadas.textContent = \`Completadas: \${completadas}\`;
        tareasPendientes.textContent = \`Pendientes: \${pendientes}\`;
    }

    // Función para renderizar la lista
    function renderizarLista() {
        lista.innerHTML = '';
        
        tareas.forEach((tarea, index) => {
            const li = document.createElement('li');
            li.className = \`tarea \${tarea.prioridad} \${tarea.completada ? 'completado' : ''}\`;
            li.innerHTML = \`
                <span>\${tarea.texto}</span>
                <small>(\${tarea.prioridad})</small>
                <button class="btn-eliminar" data-index="\${index}">❌</button>
            \`;
            
            // Evento para marcar como completada
            li.addEventListener('click', (e) => {
                if (!e.target.classList.contains('btn-eliminar')) {
                    tarea.completada = !tarea.completada;
                    renderizarLista();
                    actualizarEstadisticas();
                }
            });
            
            // Evento para eliminar tarea
            const btnEliminar = li.querySelector('.btn-eliminar');
            btnEliminar.addEventListener('click', (e) => {
                e.stopPropagation(); // Evita que se active el click del li
                tareas.splice(index, 1);
                renderizarLista();
                actualizarEstadisticas();
            });
            
            lista.appendChild(li);
        });
    }

    // Agregar nueva tarea
    botonAgregar.addEventListener('click', () => {
        const texto = input.value.trim();
        if (texto !== '') {
            const nuevaTarea = {
                texto: texto,
                prioridad: selectPrioridad.value,
                completada: false,
                fechaCreacion: new Date()
            };
            
            tareas.push(nuevaTarea);
            input.value = '';
            renderizarLista();
            actualizarEstadisticas();
        }
    });

    // Agregar con Enter
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            botonAgregar.click();
        }
    });

    // Limpiar tareas completadas
    botonLimpiarCompletadas.addEventListener('click', () => {
        tareas = tareas.filter(t => !t.completada);
        renderizarLista();
        actualizarEstadisticas();
    });

    // Limpiar todas las tareas
    botonLimpiarTodo.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres eliminar todas las tareas?')) {
            tareas = [];
            renderizarLista();
            actualizarEstadisticas();
        }
    });

    // Ejemplo de tareas iniciales
    tareas = [
        { texto: 'Aprender DOM Manipulation', prioridad: 'urgente', completada: true, fechaCreacion: new Date() },
        { texto: 'Practicar con ejercicios', prioridad: 'importante', completada: false, fechaCreacion: new Date() },
        { texto: 'Crear proyecto personal', prioridad: 'normal', completada: false, fechaCreacion: new Date() }
    ];

    // Inicializar la aplicación
    renderizarLista();
    actualizarEstadisticas();

    console.log('Aplicación de lista de tareas inicializada');
  </script>
</body>
</html>
*/`,

    herramientasBuenasPracticas: `// === HERRAMIENTAS Y BUENAS PRÁCTICAS ===

// 1. HERRAMIENTAS ÚTILES

// Consola del navegador
console.log('Para depurar tu código DOM');
console.dir(elemento); // Muestra las propiedades de un elemento
console.table(tareas); // Muestra arrays/objetos como tabla

// Inspeccionar elementos en tiempo real
// - Click derecho → Inspeccionar
// - F12 → Elements tab
// - console.log(document.activeElement) // Elemento activo

// Live Server para desarrollo
// Extensión VS Code que recarga automáticamente

// 2. BUENAS PRÁCTICAS

// ✅ EVITAR MODIFICACIONES EXCESIVAS DEL DOM
// Mal: Muchas operaciones individuales
function agregarElementosMalo() {
    for (let i = 0; i < 100; i++) {
        const div = document.createElement('div');
        document.body.appendChild(div); // 100 reflows
    }
}

// Bien: Agrupar modificaciones
function agregarElementosBueno() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 100; i++) {
        const div = document.createElement('div');
        fragment.appendChild(div);
    }
    document.body.appendChild(fragment); // 1 reflow
}

// ✅ USAR DELEGACIÓN DE EVENTOS
// Mal: Múltiples event listeners
document.querySelectorAll('.boton').forEach(boton => {
    boton.addEventListener('click', manejarClick); // Muchos listeners
});

// Bien: Un event listener delegado
document.body.addEventListener('click', (event) => {
    if (event.target.matches('.boton')) {
        manejarClick(event);
    }
});

// ✅ CACHEAR SELECTORES
// Mal: Seleccionar repetidamente
function operacionMala() {
    document.querySelector('#elemento').style.color = 'red';
    document.querySelector('#elemento').style.fontSize = '20px';
    document.querySelector('#elemento').textContent = 'Nuevo texto';
}

// Bien: Cachear el selector
function operacionBuena() {
    const elemento = document.querySelector('#elemento');
    elemento.style.color = 'red';
    elemento.style.fontSize = '20px';
    elemento.textContent = 'Nuevo texto';
}

// ✅ VERIFICAR EXISTENCIA DE ELEMENTOS
function operacionSegura() {
    const elemento = document.querySelector('#elementoInexistente');
    if (elemento) {
        elemento.style.color = 'red';
    } else {
        console.warn('Elemento no encontrado');
    }
}

// ✅ USAR requestAnimationFrame PARA ANIMACIONES
function animarSuavemente() {
    const elemento = document.querySelector('#animado');
    let posicion = 0;
    
    function animar() {
        posicion += 1;
        elemento.style.transform = \`translateX(\${posicion}px)\`;
        
        if (posicion < 100) {
            requestAnimationFrame(animar);
        }
    }
    
    requestAnimationFrame(animar);
}

// ✅ SEPARAR LÓGICA DE PRESENTACIÓN
// Mal: Lógica y DOM mezclados
function procesoComplejoMalo() {
    const resultado = calcularResultado();
    document.querySelector('#output').textContent = resultado;
    document.querySelector('#output').classList.add('destacado');
    // ... más manipulación DOM
}

// Bien: Separar responsabilidades
function procesoComplejoBueno() {
    const resultado = calcularResultado();
    actualizarInterfaz(resultado);
}

function actualizarInterfaz(resultado) {
    const output = document.querySelector('#output');
    output.textContent = resultado;
    output.classList.add('destacado');
}

// ✅ MANEJAR ERRORES EN MANIPULACIÓN DOM
function manipulacionSegura() {
    try {
        const elemento = document.querySelector('#elemento');
        if (!elemento) {
            throw new Error('Elemento no encontrado');
        }
        elemento.style.color = 'red';
    } catch (error) {
        console.error('Error en manipulación DOM:', error);
        // Fallback o recuperación
    }
}

// 3. PATRONES ÚTILES

// Patrón Module para organizar código DOM
const GestorUI = (function() {
    const elementos = {};
    
    function inicializar() {
        elementos.boton = document.querySelector('#boton');
        elementos.input = document.querySelector('#input');
        elementos.lista = document.querySelector('#lista');
        
        configurarEventos();
    }
    
    function configurarEventos() {
        elementos.boton.addEventListener('click', manejarClick);
    }
    
    function manejarClick() {
        // Lógica del click
    }
    
    function actualizarLista(datos) {
        elementos.lista.innerHTML = '';
        datos.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            elementos.lista.appendChild(li);
        });
    }
    
    return {
        inicializar,
        actualizarLista
    };
})();

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', GestorUI.inicializar);

// 4. PROYECTOS PARA PRACTICAR
/*
- Carrito de compras
- Cronómetro o temporizador
- Juego de memoria
- Editor de texto simple
- Galería de imágenes
- Lista de contactos
- Clima app (con API)
- Calculadora
- Juego del ahorcado
- Tablero Kanban
*/

console.log('¡Recuerda practicar con proyectos reales!');`
  };

  return (
    <div className="guia-contenido">
      <header className="guia-header">
        <h1>DOM Manipulation en JavaScript</h1>
        <div className="guia-meta">
          <span className="nivel">Intermedio</span>
          <span className="tiempo">90 minutos</span>
        </div>
      </header>

      <section className="guia-seccion">
        <h2>Conceptos Básicos del DOM</h2>
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>¿Qué es el DOM?</h3>
            <p>El DOM (Document Object Model) es una interfaz de programación que representa el documento HTML como un árbol de nodos. Cada nodo puede ser un elemento, atributo o texto.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Estructura del DOM</span>
            <button 
              className={`btn-copiar ${copiado === 'conceptosBasicos' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.conceptosBasicos, 'conceptosBasicos')}
            >
              {copiado === 'conceptosBasicos' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.conceptosBasicos}</code>
          </pre>
        </div>

        <div className="tipos-datos-grid">
          <div className="tipo-dato-card">
            <h4>🌳 Nodo Elemento</h4>
            <p>Etiquetas HTML como div, p, h1</p>
            <code>&lt;div&gt;, &lt;p&gt;</code>
          </div>
          <div className="tipo-dato-card">
            <h4>🏷️ Nodo Atributo</h4>
            <p>Atributos como class, id, src</p>
            <code>class="mi-clase"</code>
          </div>
          <div className="tipo-dato-card">
            <h4>📝 Nodo Texto</h4>
            <p>Contenido textual dentro de elementos</p>
            <code>"Hola Mundo"</code>
          </div>
          <div className="tipo-dato-card">
            <h4>💬 Nodo Comentario</h4>
            <p>Comentarios en el código HTML</p>
            <code>&lt;!-- comentario --&gt;</code>
          </div>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Métodos para Seleccionar Elementos</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Encontrando Elementos en el DOM</h3>
            <p>JavaScript proporciona varios métodos para seleccionar elementos del DOM, desde selecciones simples por ID hasta consultas complejas con selectores CSS.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Métodos de Selección</span>
            <button 
              className={`btn-copiar ${copiado === 'metodosSeleccion' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.metodosSeleccion, 'metodosSeleccion')}
            >
              {copiado === 'metodosSeleccion' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.metodosSeleccion}</code>
          </pre>
        </div>

        <div className="tabla-contenedor">
          <table className="tabla-guia">
            <thead>
              <tr>
                <th>Método</th>
                <th>Retorna</th>
                <th>Live/Static</th>
                <th>Uso Recomendado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>getElementById()</code></td>
                <td>Element</td>
                <td>-</td>
                <td>Elementos únicos por ID</td>
              </tr>
              <tr>
                <td><code>querySelector()</code></td>
                <td>Element</td>
                <td>Static</td>
                <td>Primer elemento que coincida</td>
              </tr>
              <tr>
                <td><code>querySelectorAll()</code></td>
                <td>NodeList</td>
                <td>Static</td>
                <td>Múltiples elementos</td>
              </tr>
              <tr>
                <td><code>getElementsByClassName()</code></td>
                <td>HTMLCollection</td>
                <td>Live</td>
                <td>Elementos por clase</td>
              </tr>
              <tr>
                <td><code>getElementsByTagName()</code></td>
                <td>HTMLCollection</td>
                <td>Live</td>
                <td>Elementos por etiqueta</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Modificar Elementos del DOM</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Cambiando Contenido y Atributos</h3>
            <p>Una vez seleccionados los elementos, puedes modificar su contenido, estilos, atributos y propiedades para crear interfaces dinámicas.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Modificación de Elementos</span>
            <button 
              className={`btn-copiar ${copiado === 'modificarElementos' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.modificarElementos, 'modificarElementos')}
            >
              {copiado === 'modificarElementos' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.modificarElementos}</code>
          </pre>
        </div>

        <div className="nota-importante">
          <h4>💡 Diferencias Clave</h4>
          <ul>
            <li><strong>textContent:</strong> Solo texto, más seguro</li>
            <li><strong>innerHTML:</strong> Interpreta HTML, potencial riesgo XSS</li>
            <li><strong>style:</strong> Modifica estilos inline</li>
            <li><strong>setAttribute:</strong> Cambia cualquier atributo HTML</li>
            <li><strong>dataset:</strong> Accede a data attributes</li>
          </ul>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Crear y Eliminar Elementos</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Manipulación Dinámica del DOM</h3>
            <p>Puedes crear nuevos elementos, insertarlos en diferentes posiciones, eliminar elementos existentes y reemplazar contenido dinámicamente.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Creación y Eliminación</span>
            <button 
              className={`btn-copiar ${copiado === 'crearEliminarElementos' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.crearEliminarElementos, 'crearEliminarElementos')}
            >
              {copiado === 'crearEliminarElementos' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.crearEliminarElementos}</code>
          </pre>
        </div>

        <div className="pasos-lista">
          <div className="paso">
            <div className="paso-numero">1</div>
            <div className="paso-contenido">
              <h4>Crear Elemento</h4>
              <p><code>document.createElement('div')</code> - Crea un nuevo elemento</p>
            </div>
          </div>
          <div className="paso">
            <div className="paso-numero">2</div>
            <div className="paso-contenido">
              <h4>Agregar al DOM</h4>
              <p><code>appendChild()</code>, <code>insertBefore()</code> - Inserta en el documento</p>
            </div>
          </div>
          <div className="paso">
            <div className="paso-numero">3</div>
            <div className="paso-contenido">
              <h4>Eliminar</h4>
              <p><code>remove()</code>, <code>removeChild()</code> - Quita elementos</p>
            </div>
          </div>
          <div className="paso">
            <div className="paso-numero">4</div>
            <div className="paso-contenido">
              <h4>Reemplazar</h4>
              <p><code>replaceWith()</code>, <code>replaceChild()</code> - Cambia elementos</p>
            </div>
          </div>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Manejar Eventos</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Interactividad con Eventos</h3>
            <p>Los eventos permiten que tu JavaScript responda a las acciones del usuario como clics, teclas, movimientos del mouse y más.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Manejo de Eventos</span>
            <button 
              className={`btn-copiar ${copiado === 'manejarEventos' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.manejarEventos, 'manejarEventos')}
            >
              {copiado === 'manejarEventos' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.manejarEventos}</code>
          </pre>
        </div>

        <div className="tipos-datos-grid">
          <div className="tipo-dato-card">
            <h4>🖱️ Eventos de Mouse</h4>
            <p>click, dblclick, mouseover, mouseout</p>
          </div>
          <div className="tipo-dato-card">
            <h4>⌨️ Eventos de Teclado</h4>
            <p>keydown, keyup, keypress</p>
          </div>
          <div className="tipo-dato-card">
            <h4>📄 Eventos de Formulario</h4>
            <p>submit, change, input, focus</p>
          </div>
          <div className="tipo-dato-card">
            <h4>🔄 Eventos de Ventana</h4>
            <p>load, resize, scroll</p>
          </div>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Trabajar con Clases</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Gestión de Clases CSS</h3>
            <p>El objeto classList proporciona métodos para agregar, quitar, alternar y verificar clases CSS de manera eficiente.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Métodos de classList</span>
            <button 
              className={`btn-copiar ${copiado === 'trabajarClases' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.trabajarClases, 'trabajarClases')}
            >
              {copiado === 'trabajarClases' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.trabajarClases}</code>
          </pre>
        </div>

        <div className="nota-exito">
          <h4>🎯 Ventajas de classList</h4>
          <ul>
            <li>Múltiples clases en una sola operación</li>
            <li>No sobrescribe clases existentes</li>
            <li>Métodos específicos y legibles</li>
            <li>Mejor rendimiento que className</li>
            <li>Fácil de mantener y depurar</li>
          </ul>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Ejemplo Avanzado: Lista Dinámica</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Aplicación Completa de Gestión de Tareas</h3>
            <p>Este ejemplo integra todos los conceptos del DOM en una aplicación funcional de lista de tareas con estadísticas, prioridades y persistencia.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Lista de Tareas Avanzada</span>
            <button 
              className={`btn-copiar ${copiado === 'ejemploAvanzado' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.ejemploAvanzado, 'ejemploAvanzado')}
            >
              {copiado === 'ejemploAvanzado' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.ejemploAvanzado}</code>
          </pre>
        </div>

        <div className="nota-exito">
          <h4>🎯 Características Implementadas</h4>
          <ul>
            <li>Agregar, eliminar y marcar tareas</li>
            <li>Sistema de prioridades con estilos visuales</li>
            <li>Estadísticas en tiempo real</li>
            <li>Delegación de eventos eficiente</li>
            <li>Interfaz responsive y accesible</li>
            <li>Manejo de formularios y validación</li>
            <li>Animaciones y transiciones CSS</li>
          </ul>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Herramientas y Buenas Prácticas</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Desarrollo Eficiente y Profesional</h3>
            <p>Conoce las herramientas de desarrollo y sigue las mejores prácticas para crear aplicaciones web eficientes, mantenibles y de alto rendimiento.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Buenas Prácticas DOM</span>
            <button 
              className={`btn-copiar ${copiado === 'herramientasBuenasPracticas' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.herramientasBuenasPracticas, 'herramientasBuenasPracticas')}
            >
              {copiado === 'herramientasBuenasPracticas' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.herramientasBuenasPracticas}</code>
          </pre>
        </div>

        <div className="resumen-practicas">
          <h4>📋 Proyectos para Practicar</h4>
          <ul>
            <li><strong>Carrito de compras:</strong> Gestión de productos y totales</li>
            <li><strong>Cronómetro:</strong> Temporizador con pausa y reinicio</li>
            <li><strong>Juego de memoria:</strong> Cartas que se voltean</li>
            <li><strong>Editor de texto:</strong> Formato en tiempo real</li>
            <li><strong>Galería de imágenes:</strong> Lightbox y navegación</li>
            <li><strong>Lista de contactos:</strong> CRUD completo</li>
            <li><strong>Clima app:</strong> Integración con API</li>
            <li><strong>Calculadora:</strong> Operaciones matemáticas</li>
            <li><strong>Juego del ahorcado:</strong> Lógica de juego</li>
            <li><strong>Tablero Kanban:</strong> Drag and drop</li>
          </ul>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Próximos Pasos</h2>
        <div className="proximos-pasos">
          <div className="paso-aprendizaje">
            <div className="paso-numero">9</div>
            <div className="paso-info">
              <h4>Eventos</h4>
              <p>Profundizarás en el manejo avanzado de eventos, propagación y delegación.</p>
            </div>
          </div>
          <div className="paso-aprendizaje">
            <div className="paso-numero">10</div>
            <div className="paso-info">
              <h4>ES6+ Features</h4>
              <p>Aprenderás características modernas de JavaScript como módulos y destructuring.</p>
            </div>
          </div>
          <div className="paso-aprendizaje">
            <div className="paso-numero">11</div>
            <div className="paso-info">
              <h4>Async/Await y Promesas</h4>
              <p>Dominarás la programación asíncrona para operaciones de red y temporizadores.</p>
            </div>
          </div>
        </div>

        <div className="resumen-practicas">
          <h4>📋 Resumen de DOM Manipulation</h4>
          <ul>
            <li><strong>Selección:</strong> querySelector, getElementById, querySelectorAll</li>
            <li><strong>Modificación:</strong> textContent, innerHTML, style, setAttribute</li>
            <li><strong>Creación:</strong> createElement, appendChild, insertBefore</li>
            <li><strong>Eliminación:</strong> remove, removeChild, replaceWith</li>
            <li><strong>Eventos:</strong> addEventListener, delegación, tipos de eventos</li>
            <li><strong>Clases:</strong> classList.add/remove/toggle/contains</li>
            <li><strong>Buenas prácticas:</strong> performance, delegación, organización</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Guia_8;