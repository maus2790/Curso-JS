import React, { useState } from 'react';
import './Guias.css';

const Guia_9 = () => {
  const [copiado, setCopiado] = useState(null);

  const copiarCodigo = (codigo, id) => {
    navigator.clipboard.writeText(codigo);
    setCopiado(id);
    setTimeout(() => setCopiado(null), 2000);
  };

  const ejemplosCodigo = {
    fundamentosEventos: `// === FUNDAMENTOS DE EVENTOS EN JAVASCRIPT ===

// Los eventos son acciones que ocurren en el navegador y que podemos capturar

// HTML de referencia:
/*
<button id="miBoton">Haz clic</button>
<div id="miCaja" style="width: 200px; height: 200px; background: lightblue;">
    Área interactiva
</div>
<input id="miInput" type="text" placeholder="Escribe aquí">
*/

// 1. MÉTODOS PARA ASIGNAR EVENTOS

// Método tradicional (onclick en HTML)
// <button onclick="manejarClick()">Click</button>

// Asignación directa (no recomendado)
const boton = document.getElementById('miBoton');
boton.onclick = function() {
    console.log('Click con onclick');
};

// addEventListener (RECOMENDADO)
boton.addEventListener('click', function(event) {
    console.log('Click con addEventListener');
    console.log('Evento:', event);
});

// 2. OBJETO EVENT
boton.addEventListener('click', function(event) {
    // Propiedades importantes del objeto event
    console.log('Tipo de evento:', event.type);
    console.log('Elemento target:', event.target);
    console.log('Elemento currentTarget:', event.currentTarget);
    console.log('Coordenadas X:', event.clientX);
    console.log('Coordenadas Y:', event.clientY);
    console.log('Tecla presionada:', event.key); // Para eventos de teclado
    console.log('Botón del mouse:', event.button); // 0=izquierdo, 1=medio, 2=derecho
});

// 3. EVENTOS COMUNES

// Eventos de Mouse
const caja = document.getElementById('miCaja');
caja.addEventListener('click', () => console.log('Click en caja'));
caja.addEventListener('dblclick', () => console.log('Doble click en caja'));
caja.addEventListener('mousedown', () => console.log('Mouse presionado'));
caja.addEventListener('mouseup', () => console.log('Mouse liberado'));
caja.addEventListener('mouseover', () => console.log('Mouse sobre elemento'));
caja.addEventListener('mouseout', () => console.log('Mouse fuera del elemento'));
caja.addEventListener('mousemove', (e) => {
    console.log(\`Mouse moviéndose: X:\${e.clientX}, Y:\${e.clientY}\`);
});

// Eventos de Teclado
const input = document.getElementById('miInput');
input.addEventListener('keydown', (e) => {
    console.log(\`Tecla presionada: \${e.key}, Código: \${e.code}\`);
});
input.addEventListener('keyup', (e) => {
    console.log(\`Tecla liberada: \${e.key}\`);
});
input.addEventListener('keypress', (e) => {
    console.log(\`Tecla pulsada: \${e.key}\`);
});

// Eventos de Formulario
const formulario = document.querySelector('form');
formulario.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita el envío del formulario
    console.log('Formulario enviado');
});
input.addEventListener('focus', () => console.log('Input enfocado'));
input.addEventListener('blur', () => console.log('Input perdió el foco'));
input.addEventListener('change', () => console.log('Valor del input cambiado'));
input.addEventListener('input', (e) => {
    console.log(\`Input cambiando: \${e.target.value}\`);
});

// Eventos de Ventana
window.addEventListener('load', () => {
    console.log('Página completamente cargada');
});
window.addEventListener('resize', () => {
    console.log(\`Ventana redimensionada: \${window.innerWidth}x\${window.innerHeight}\`);
});
window.addEventListener('scroll', () => {
    console.log(\`Scroll position: \${window.scrollY}\`);
});

// 4. REMOVER EVENT LISTENERS
function manejarClickEspecial() {
    console.log('Click especial');
}

// Agregar event listener
boton.addEventListener('click', manejarClickEspecial);

// Remover event listener (debe ser la misma función)
// boton.removeEventListener('click', manejarClickEspecial);

// 5. EVENTOS ÚNICOS (una sola ejecución)
boton.addEventListener('click', function manejarClickUnico() {
    console.log('Este evento solo se ejecutará una vez');
    boton.removeEventListener('click', manejarClickUnico);
}, { once: true });`,

    propagacionEventos: `// === PROPAGACIÓN DE EVENTOS (BUBBLING Y CAPTURING) ===

// HTML de referencia:
/*
<div id="abuelo" style="padding: 50px; background: #f0f0f0;">
    <div id="padre" style="padding: 30px; background: #d0d0d0;">
        <div id="hijo" style="padding: 10px; background: #b0b0b0;">
            Haz clic aquí
        </div>
    </div>
</div>
*/

const abuelo = document.getElementById('abuelo');
const padre = document.getElementById('padre');
const hijo = document.getElementById('hijo');

// 1. BUBBLING (por defecto) - El evento sube desde el elemento objetivo
hijo.addEventListener('click', (e) => {
    console.log('Hijo - Bubbling');
    console.log('Target:', e.target.id);
    console.log('CurrentTarget:', e.currentTarget.id);
});

padre.addEventListener('click', (e) => {
    console.log('Padre - Bubbling');
    console.log('Target:', e.target.id);
    console.log('CurrentTarget:', e.currentTarget.id);
});

abuelo.addEventListener('click', (e) => {
    console.log('Abuelo - Bubbling');
    console.log('Target:', e.target.id);
    console.log('CurrentTarget:', e.currentTarget.id);
});

// 2. CAPTURING (fase de captura) - El evento baja hacia el elemento objetivo
hijo.addEventListener('click', (e) => {
    console.log('Hijo - Capturing');
}, true); // true habilita capturing

padre.addEventListener('click', (e) => {
    console.log('Padre - Capturing');
}, true);

abuelo.addEventListener('click', (e) => {
    console.log('Abuelo - Capturing');
}, true);

// 3. ORDEN DE EJECUCIÓN
// Al hacer clic en "hijo", el orden es:
// 1. Abuelo - Capturing
// 2. Padre - Capturing  
// 3. Hijo - Capturing
// 4. Hijo - Bubbling
// 5. Padre - Bubbling
// 6. Abuelo - Bubbling

// 4. DETENER LA PROPAGACIÓN
hijo.addEventListener('click', (e) => {
    console.log('Hijo - Deteniendo propagación');
    e.stopPropagation(); // Evita que el evento continúe propagándose
});

padre.addEventListener('click', (e) => {
    // Esta función NO se ejecutará si stopPropagation() fue llamado
    console.log('Padre - Este mensaje no aparecerá');
});

// 5. stopImmediatePropagation()
hijo.addEventListener('click', (e) => {
    console.log('Primer listener del hijo');
    e.stopImmediatePropagation(); // Detiene propagación y otros listeners del mismo elemento
});

hijo.addEventListener('click', (e) => {
    // Este listener NO se ejecutará
    console.log('Segundo listener del hijo - No se ejecuta');
});

// 6. eventPhase - Saber en qué fase está el evento
abuelo.addEventListener('click', (e) => {
    const fases = {
        1: 'CAPTURING_PHASE',
        2: 'AT_TARGET', 
        3: 'BUBBLING_PHASE'
    };
    console.log(\`Fase del evento: \${fases[e.eventPhase]} (\${e.eventPhase})\`);
}, true); // Capturing

// 7. EJEMPLO PRÁCTICO: Menú desplegable
const menu = document.createElement('div');
menu.innerHTML = \`
    <div class="menu">
        <button class="menu-btn">Menú ▽</button>
        <div class="menu-content" style="display: none;">
            <a href="#">Opción 1</a>
            <a href="#">Opción 2</a>
            <a href="#">Opción 3</a>
        </div>
    </div>
\`;
document.body.appendChild(menu);

const menuBtn = menu.querySelector('.menu-btn');
const menuContent = menu.querySelector('.menu-content');

// Mostrar/ocultar menú
menuBtn.addEventListener('click', (e) => {
    menuContent.style.display = menuContent.style.display === 'none' ? 'block' : 'none';
    e.stopPropagation(); // Evita que el click se propague al document
});

// Ocultar menú al hacer click fuera
document.addEventListener('click', () => {
    menuContent.style.display = 'none';
});

// Evitar que el click dentro del menú lo cierre
menuContent.addEventListener('click', (e) => {
    e.stopPropagation();
});`,

    delegacionEventos: `// === DELEGACIÓN DE EVENTOS ===

// La delegación de eventos permite manejar eventos en elementos hijos
// mediante un listener en un elemento padre

// HTML de referencia:
/*
<ul id="listaDinamica">
    <li data-id="1">Elemento 1 <button class="eliminar">❌</button></li>
    <li data-id="2">Elemento 2 <button class="eliminar">❌</button></li>
    <li data-id="3">Elemento 3 <button class="eliminar">❌</button></li>
</ul>
<button id="agregarElemento">Agregar Elemento</button>
*/

const listaDinamica = document.getElementById('listaDinamica');
const botonAgregar = document.getElementById('agregarElemento');

// 1. DELEGACIÓN BÁSICA
// En lugar de agregar listeners a cada botón, usamos uno en el padre
listaDinamica.addEventListener('click', function(event) {
    // event.target es el elemento que realmente fue clickeado
    // event.currentTarget es el elemento que tiene el listener (listaDinamica)
    
    console.log('Target:', event.target);
    console.log('CurrentTarget:', event.currentTarget);
    
    // Verificar si el click fue en un botón de eliminar
    if (event.target.classList.contains('eliminar')) {
        const li = event.target.closest('li');
        const id = li.dataset.id;
        console.log(\`Eliminando elemento con ID: \${id}\`);
        li.remove();
    }
    
    // Verificar si el click fue en un elemento de la lista
    if (event.target.matches('li')) {
        event.target.classList.toggle('seleccionado');
        console.log(\`Elemento \${event.target.dataset.id} clickeado\`);
    }
});

// 2. AGREGAR ELEMENTOS DINÁMICAMENTE
let contador = 4;
botonAgregar.addEventListener('click', function() {
    const nuevoElemento = document.createElement('li');
    nuevoElemento.dataset.id = contador;
    nuevoElemento.innerHTML = \`Elemento \${contador} <button class="eliminar">❌</button>\`;
    listaDinamica.appendChild(nuevoElemento);
    contador++;
    
    // ¡NO necesitamos agregar un event listener al nuevo elemento!
    // La delegación ya se encarga de ello
});

// 3. VENTAJAS DE LA DELEGACIÓN
// - Menos memory footprint (solo un listener)
// - Funciona con elementos dinámicos
// - Código más limpio y mantenible
// - Mejor performance en listas grandes

// 4. COMPARACIÓN: DELEGACIÓN VS LISTENERS INDIVIDUALES

// SIN DELEGACIÓN (no recomendado para elementos dinámicos)
/*
const botonesEliminar = document.querySelectorAll('.eliminar');
botonesEliminar.forEach(boton => {
    boton.addEventListener('click', function() {
        this.parentElement.remove();
    });
});

// Problema: Los nuevos elementos no tendrán el listener
*/

// CON DELEGACIÓN (recomendado)
// Ya implementado arriba - funciona para todos los elementos, presentes y futuros

// 5. DELEGACIÓN CON EVENTOS COMPLEJOS
listaDinamica.addEventListener('mouseover', function(event) {
    if (event.target.matches('li')) {
        event.target.style.backgroundColor = '#f0f0f0';
    }
});

listaDinamica.addEventListener('mouseout', function(event) {
    if (event.target.matches('li')) {
        event.target.style.backgroundColor = '';
    }
});

// 6. DELEGACIÓN EN FORMULARIOS DINÁMICOS
const formularioDinamico = document.createElement('div');
formularioDinamico.innerHTML = \`
    <form id="formDinamico">
        <div class="campo">
            <input type="text" name="campo1" placeholder="Campo 1">
            <button type="button" class="remover-campo">−</button>
        </div>
        <button type="button" id="agregarCampo">+ Agregar Campo</button>
    </form>
\`;
document.body.appendChild(formularioDinamico);

const formDinamico = formularioDinamico.querySelector('#formDinamico');
const agregarCampo = formularioDinamico.querySelector('#agregarCampo');

// Delegación para remover campos
formDinamico.addEventListener('click', function(event) {
    if (event.target.classList.contains('remover-campo')) {
        event.target.parentElement.remove();
    }
});

// Agregar nuevos campos
agregarCampo.addEventListener('click', function() {
    const nuevoCampo = document.createElement('div');
    nuevoCampo.className = 'campo';
    nuevoCampo.innerHTML = \`
        <input type="text" name="campo\${Date.now()}" placeholder="Nuevo campo">
        <button type="button" class="remover-campo">−</button>
    \`;
    formDinamico.insertBefore(nuevoCampo, agregarCampo);
});

// 7. PATRÓN DE DELEGACIÓN AVANZADO
function crearDelegador(selector, evento, callback) {
    return function(event) {
        if (event.target.matches(selector)) {
            callback.call(event.target, event);
        }
    };
}

// Uso del patrón
const delegadorBotones = crearDelegador('.eliminar', 'click', function(event) {
    console.log(\`Botón eliminador clickeado en: \${this.textContent}\`);
});

listaDinamica.addEventListener('click', delegadorBotones);`,

    eventosPersonalizados: `// === EVENTOS PERSONALIZADOS ===

// Podemos crear y disparar nuestros propios eventos

// 1. CREAR EVENTOS PERSONALIZADOS BÁSICOS
const miBoton = document.getElementById('miBoton');

// Crear evento personalizado
const eventoPersonalizado = new Event('miEventoPersonalizado');

// Escuchar el evento personalizado
miBoton.addEventListener('miEventoPersonalizado', function(e) {
    console.log('¡Evento personalizado disparado!', e);
});

// Disparar el evento
// miBoton.dispatchEvent(eventoPersonalizado);

// 2. EVENTOS PERSONALIZADOS CON DATOS
const eventoConDatos = new CustomEvent('miEventoConDatos', {
    detail: {
        mensaje: 'Hola desde el evento personalizado',
        timestamp: new Date(),
        datosExtra: { valor: 42 }
    },
    bubbles: true, // Permite que el evento burbujee
    cancelable: true // Permite cancelar el evento
});

miBoton.addEventListener('miEventoConDatos', function(e) {
    console.log('Evento con datos:', e.detail);
    console.log('Mensaje:', e.detail.mensaje);
    console.log('Timestamp:', e.detail.timestamp);
});

// Disparar evento con datos
// miBoton.dispatchEvent(eventoConDatos);

// 3. SISTEMA DE NOTIFICACIONES CON EVENTOS PERSONALIZADOS
class SistemaNotificaciones {
    constructor() {
        this.eventTarget = new EventTarget();
    }
    
    // Suscribirse a notificaciones
    suscribir(tipo, callback) {
        this.eventTarget.addEventListener(tipo, callback);
    }
    
    // Desuscribirse
    desuscribir(tipo, callback) {
        this.eventTarget.removeEventListener(tipo, callback);
    }
    
    // Enviar notificación
    notificar(tipo, datos) {
        const evento = new CustomEvent(tipo, {
            detail: datos
        });
        this.eventTarget.dispatchEvent(evento);
    }
}

// Uso del sistema de notificaciones
const notificador = new SistemaNotificaciones();

// Suscribirse a diferentes tipos de notificaciones
notificador.suscribir('usuarioRegistrado', (e) => {
    console.log('Usuario registrado:', e.detail);
});

notificador.suscribir('pedidoCompletado', (e) => {
    console.log('Pedido completado:', e.detail);
});

// Disparar notificaciones
notificador.notificar('usuarioRegistrado', {
    nombre: 'Ana García',
    email: 'ana@ejemplo.com',
    id: 12345
});

notificador.notificar('pedidoCompletado', {
    pedidoId: 67890,
    total: 99.99,
    productos: ['Producto A', 'Producto B']
});

// 4. EVENTOS DE COMPONENTES
class MiComponente {
    constructor(elemento) {
        this.elemento = elemento;
        this.inicializar();
    }
    
    inicializar() {
        // Evento personalizado para cuando el componente está listo
        const eventoListo = new CustomEvent('componenteListo', {
            detail: { componente: this }
        });
        this.elemento.dispatchEvent(eventoListo);
        
        // Escuchar eventos internos
        this.elemento.addEventListener('actualizarEstado', (e) => {
            this.actualizar(e.detail);
        });
    }
    
    actualizar(datos) {
        console.log('Componente actualizado con:', datos);
        
        // Disparar evento de actualización completada
        const eventoActualizado = new CustomEvent('componenteActualizado', {
            detail: datos
        });
        this.elemento.dispatchEvent(eventoActualizado);
    }
}

// Uso del componente
const miComponente = new MiComponente(document.createElement('div'));

// Escuchar eventos del componente
miComponente.elemento.addEventListener('componenteListo', (e) => {
    console.log('El componente está listo:', e.detail.componente);
});

miComponente.elemento.addEventListener('componenteActualizado', (e) => {
    console.log('Componente actualizado:', e.detail);
});

// Disparar actualización
miComponente.elemento.dispatchEvent(new CustomEvent('actualizarEstado', {
    detail: { nuevoEstado: 'activo' }
}));

// 5. PATRÓN PUBLISH-SUBSCRIBE CON EVENTOS
const EventBus = {
    eventos: {},
    
    suscribir(evento, callback) {
        if (!this.eventos[evento]) {
            this.eventos[evento] = [];
        }
        this.eventos[evento].push(callback);
    },
    
    desuscribir(evento, callback) {
        if (this.eventos[evento]) {
            this.eventos[evento] = this.eventos[evento].filter(cb => cb !== callback);
        }
    },
    
    publicar(evento, datos) {
        if (this.eventos[evento]) {
            this.eventos[evento].forEach(callback => {
                callback(datos);
            });
        }
    }
};

// Uso del EventBus
EventBus.suscribir('mensajeEnviado', (datos) => {
    console.log('Mensaje enviado:', datos);
});

EventBus.suscribir('usuarioConectado', (usuario) => {
    console.log('Usuario conectado:', usuario.nombre);
});

// Publicar eventos
EventBus.publicar('mensajeEnviado', { texto: 'Hola mundo', hora: new Date() });
EventBus.publicar('usuarioConectado', { nombre: 'Carlos', id: 123 });`,

    metodosEvento: `// === MÉTODOS Y PROPIEDADES DEL OBJETO EVENT ===

// El objeto Event tiene muchos métodos y propiedades útiles

// HTML de referencia:
/*
<form id="miFormulario">
    <input type="text" id="miInput" required placeholder="Escribe algo">
    <input type="checkbox" id="miCheckbox"> Aceptar términos
    <button type="submit">Enviar</button>
</form>
<a href="https://ejemplo.com" id="miEnlace">Enlace de ejemplo</a>
*/

const formulario = document.getElementById('miFormulario');
const input = document.getElementById('miInput');
const checkbox = document.getElementById('miCheckbox');
const enlace = document.getElementById('miEnlace');

// 1. MÉTODOS PRINCIPALES

// preventDefault() - Previene el comportamiento por defecto
enlace.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Navegación prevenida, enlace clickeado:', this.href);
});

formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Envío de formulario prevenido');
});

// stopPropagation() - Detiene la propagación del evento
document.body.addEventListener('click', function() {
    console.log('Click en body');
});

input.addEventListener('click', function(e) {
    e.stopPropagation();
    console.log('Click en input (no se propaga al body)');
});

// stopImmediatePropagation() - Detiene propagación y otros listeners
input.addEventListener('focus', function(e) {
    console.log('Primer listener de focus');
    e.stopImmediatePropagation();
});

input.addEventListener('focus', function(e) {
    // Este listener NO se ejecutará
    console.log('Segundo listener de focus - No se ejecuta');
});

// 2. PROPIEDADES DEL TARGET

input.addEventListener('input', function(e) {
    console.log('=== PROPIEDADES DEL TARGET ===');
    console.log('target:', e.target);
    console.log('target.value:', e.target.value);
    console.log('target.type:', e.target.type);
    console.log('target.id:', e.target.id);
    console.log('target.tagName:', e.target.tagName);
    console.log('target.className:', e.target.className);
});

// 3. PROPIEDADES DE POSICIÓN Y TECLADO

document.addEventListener('mousemove', function(e) {
    console.log('=== PROPIEDADES DE POSICIÓN ===');
    console.log('clientX:', e.clientX, 'clientY:', e.clientY);
    console.log('pageX:', e.pageX, 'pageY:', e.pageY);
    console.log('screenX:', e.screenX, 'screenY:', e.screenY);
    console.log('offsetX:', e.offsetX, 'offsetY:', e.offsetY);
});

document.addEventListener('keydown', function(e) {
    console.log('=== PROPIEDADES DE TECLADO ===');
    console.log('key:', e.key);
    console.log('code:', e.code);
    console.log('ctrlKey:', e.ctrlKey);
    console.log('shiftKey:', e.shiftKey);
    console.log('altKey:', e.altKey);
    console.log('metaKey:', e.metaKey);
    console.log('repeat:', e.repeat);
});

// 4. PROPIEDADES ESPECÍFICAS POR TIPO DE EVENTO

// Eventos de Mouse
document.addEventListener('click', function(e) {
    console.log('=== PROPIEDADES DE MOUSE ===');
    console.log('button:', e.button); // 0=izquierdo, 1=medio, 2=derecho
    console.log('buttons:', e.buttons); // Múltiples botones presionados
    console.log('relatedTarget:', e.relatedTarget); // Elemento relacionado (mouseover/out)
});

// Eventos de Formulario
input.addEventListener('change', function(e) {
    console.log('=== PROPIEDADES DE FORMULARIO ===');
    console.log('target.checked:', e.target.checked); // Para checkboxes
    console.log('target.selectedIndex:', e.target.selectedIndex); // Para selects
});

// 5. MÉTODOS DE VERIFICACIÓN

document.addEventListener('click', function(e) {
    console.log('=== MÉTODOS DE VERIFICACIÓN ===');
    console.log('e.isTrusted:', e.isTrusted); // True si fue disparado por usuario
    console.log('e.defaultPrevented:', e.defaultPrevented); // Si se llamó preventDefault()
});

// 6. COMPOSITION EVENTS (para input de idiomas complejos)
input.addEventListener('compositionstart', function(e) {
    console.log('Iniciando composición (ej: IME para japonés)');
});

input.addEventListener('compositionupdate', function(e) {
    console.log('Actualizando composición:', e.data);
});

input.addEventListener('compositionend', function(e) {
    console.log('Composición terminada:', e.data);
});

// 7. EVENTOS DE DRAG AND DROP
const elementoArrastrable = document.createElement('div');
elementoArrastrable.innerHTML = 'Arrástrame';
elementoArrastrable.style.cssText = \`
    width: 100px; height: 100px; background: blue; color: white; 
    display: flex; align-items: center; justify-content: center;
    cursor: move;
\`;
elementoArrastrable.draggable = true;
document.body.appendChild(elementoArrastrable);

// Eventos del elemento que se arrastra
elementoArrastrable.addEventListener('dragstart', function(e) {
    console.log('Drag start');
    e.dataTransfer.setData('text/plain', this.id);
});

elementoArrastrable.addEventListener('drag', function(e) {
    console.log('Dragging...');
});

elementoArrastrable.addEventListener('dragend', function(e) {
    console.log('Drag end');
});

// Eventos de la zona de destino
document.body.addEventListener('dragover', function(e) {
    e.preventDefault(); // Necesario para permitir el drop
    console.log('Drag over body');
});

document.body.addEventListener('drop', function(e) {
    e.preventDefault();
    console.log('Dropped on body');
    const data = e.dataTransfer.getData('text/plain');
    console.log('Datos transferidos:', data);
});`,

    patronesAvanzados: `// === PATRONES AVANZADOS DE EVENTOS ===

// 1. THROTTLING - Limitar la frecuencia de ejecución
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Uso: Scroll event throttled
window.addEventListener('scroll', throttle(function() {
    console.log('Scroll throttled:', window.scrollY);
}, 100)); // Máximo una vez cada 100ms

// 2. DEBOUNCING - Esperar a que termine la acción
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Uso: Input search debounced
const searchInput = document.createElement('input');
searchInput.placeholder = 'Buscar...';
document.body.appendChild(searchInput);

searchInput.addEventListener('input', debounce(function(e) {
    console.log('Buscando:', e.target.value);
    // Aquí iría la llamada a la API de búsqueda
}, 300)); // Espera 300ms después de que el usuario deje de escribir

// 3. EVENT BUS PATTERN (mejorado)
class AdvancedEventBus {
    constructor() {
        this.events = new Map();
    }
    
    on(event, callback, options = {}) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        
        const listener = {
            callback,
            once: options.once || false,
            context: options.context || null
        };
        
        this.events.get(event).push(listener);
    }
    
    once(event, callback) {
        this.on(event, callback, { once: true });
    }
    
    off(event, callback) {
        if (this.events.has(event)) {
            const listeners = this.events.get(event);
            const filtered = listeners.filter(listener => listener.callback !== callback);
            this.events.set(event, filtered);
        }
    }
    
    emit(event, data) {
        if (this.events.has(event)) {
            const listeners = this.events.get(event);
            const remaining = [];
            
            listeners.forEach(listener => {
                // Ejecutar callback con el contexto apropiado
                const context = listener.context || this;
                listener.callback.call(context, data);
                
                // Mantener solo los listeners que no son 'once'
                if (!listener.once) {
                    remaining.push(listener);
                }
            });
            
            this.events.set(event, remaining);
        }
    }
    
    clear(event) {
        if (event) {
            this.events.delete(event);
        } else {
            this.events.clear();
        }
    }
}

// Uso del AdvancedEventBus
const bus = new AdvancedEventBus();

// Suscripción normal
bus.on('mensaje', (data) => {
    console.log('Mensaje recibido:', data);
});

// Suscripción única
bus.once('primerMensaje', (data) => {
    console.log('Primer mensaje (solo una vez):', data);
});

// Emitir eventos
bus.emit('mensaje', { texto: 'Hola mundo' });
bus.emit('primerMensaje', { texto: 'Este es el primero' });
bus.emit('primerMensaje', { texto: 'Este no se mostrará' });

// 4. OBSERVER PATTERN PARA ESTADO COMPARTIDO
class Observable {
    constructor() {
        this.observers = [];
        this.state = {};
    }
    
    subscribe(observer) {
        this.observers.push(observer);
    }
    
    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }
    
    setState(newState) {
        const oldState = { ...this.state };
        this.state = { ...this.state, ...newState };
        this.notify(oldState, this.state);
    }
    
    notify(oldState, newState) {
        this.observers.forEach(observer => {
            observer.update(oldState, newState);
        });
    }
}

class Observer {
    constructor(name) {
        this.name = name;
    }
    
    update(oldState, newState) {
        console.log(\`[\${this.name}] Estado cambiado:\`, {
            anterior: oldState,
            actual: newState
        });
    }
}

// Uso del patrón Observer
const appState = new Observable();

const logger = new Observer('Logger');
const uiUpdater = new Observer('UI Updater');

appState.subscribe(logger);
appState.subscribe(uiUpdater);

// Cambios de estado
appState.setState({ usuario: null });
appState.setState({ usuario: { nombre: 'Ana', id: 1 } });
appState.setState({ tema: 'oscuro' });

// 5. COMMAND PATTERN PARA ACCIONES REVERSIBLES
class CommandManager {
    constructor() {
        this.history = [];
        this.position = -1;
    }
    
    execute(command) {
        // Eliminar comandos futuros si estamos en medio del historial
        if (this.position < this.history.length - 1) {
            this.history = this.history.slice(0, this.position + 1);
        }
        
        command.execute();
        this.history.push(command);
        this.position++;
    }
    
    undo() {
        if (this.position >= 0) {
            this.history[this.position].undo();
            this.position--;
        }
    }
    
    redo() {
        if (this.position < this.history.length - 1) {
            this.position++;
            this.history[this.position].execute();
        }
    }
}

class ChangeColorCommand {
    constructor(element, oldColor, newColor) {
        this.element = element;
        this.oldColor = oldColor;
        this.newColor = newColor;
    }
    
    execute() {
        this.element.style.backgroundColor = this.newColor;
    }
    
    undo() {
        this.element.style.backgroundColor = this.oldColor;
    }
}

// Uso del Command Pattern
const colorBox = document.createElement('div');
colorBox.style.cssText = \`
    width: 100px; height: 100px; background: red; margin: 10px;
\`;
document.body.appendChild(colorBox);

const commandManager = new CommandManager();

// Botones para probar
const btnRed = document.createElement('button');
btnRed.textContent = 'Rojo';
btnRed.onclick = () => {
    const command = new ChangeColorCommand(colorBox, colorBox.style.backgroundColor, 'red');
    commandManager.execute(command);
};

const btnBlue = document.createElement('button');
btnBlue.textContent = 'Azul';
btnBlue.onclick = () => {
    const command = new ChangeColorCommand(colorBox, colorBox.style.backgroundColor, 'blue');
    commandManager.execute(command);
};

const btnUndo = document.createElement('button');
btnUndo.textContent = 'Deshacer';
btnUndo.onclick = () => commandManager.undo();

const btnRedo = document.createElement('button');
btnRedo.textContent = 'Rehacer';
btnRedo.onclick = () => commandManager.redo();

[btnRed, btnBlue, btnUndo, btnRedo].forEach(btn => document.body.appendChild(btn));`,

    ejemploCompleto: `// === EJEMPLO COMPLETO: APLICACIÓN DE NOTAS CON EVENTOS AVANZADOS ===

// HTML completo:
/*
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestor de Notas con Eventos</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5; }
        .app { max-width: 800px; margin: 0 auto; }
        .header { background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .note-form { background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .notes-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
        .note { background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); position: relative; }
        .note.priority-high { border-left: 4px solid #e74c3c; }
        .note.priority-medium { border-left: 4px solid #f39c12; }
        .note.priority-low { border-left: 4px solid #27ae60; }
        .note-title { font-weight: bold; margin-bottom: 5px; }
        .note-content { color: #666; margin-bottom: 10px; }
        .note-actions { display: flex; gap: 10px; margin-top: 10px; }
        .btn { padding: 5px 10px; border: none; border-radius: 4px; cursor: pointer; }
        .btn-primary { background: #3498db; color: white; }
        .btn-danger { background: #e74c3c; color: white; }
        .btn-success { background: #27ae60; color: white; }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        input, textarea, select { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
        textarea { height: 100px; resize: vertical; }
        .stats { background: white; padding: 15px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .search-box { margin-bottom: 20px; }
        .search-input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="app">
        <div class="header">
            <h1>📝 Gestor de Notas Avanzado</h1>
            <p>Gestiona tus notas con eventos JavaScript avanzados</p>
        </div>

        <div class="stats" id="estadisticas">
            <strong>Estadísticas:</strong>
            <span id="totalNotas">Total: 0</span> | 
            <span id="notasPorPrioridad">Prioridades: Alto: 0, Medio: 0, Bajo: 0</span>
        </div>

        <div class="search-box">
            <input type="text" id="buscarNotas" class="search-input" placeholder="🔍 Buscar en notas...">
        </div>

        <div class="note-form">
            <h3>➕ Nueva Nota</h3>
            <div class="form-group">
                <label for="tituloNota">Título:</label>
                <input type="text" id="tituloNota" placeholder="Título de la nota">
            </div>
            <div class="form-group">
                <label for="contenidoNota">Contenido:</label>
                <textarea id="contenidoNota" placeholder="Contenido de la nota"></textarea>
            </div>
            <div class="form-group">
                <label for="prioridadNota">Prioridad:</label>
                <select id="prioridadNota">
                    <option value="low">Baja</option>
                    <option value="medium">Media</option>
                    <option value="high">Alta</option>
                </select>
            </div>
            <button id="agregarNota" class="btn btn-primary">Agregar Nota</button>
        </div>

        <div class="notes-grid" id="listaNotas">
            <!-- Las notas se generarán dinámicamente -->
        </div>
    </div>

    <script>
        // === SISTEMA DE GESTIÓN DE NOTAS CON EVENTOS AVANZADOS ===

        // Event Bus para comunicación entre componentes
        class NoteEventBus {
            constructor() {
                this.events = {};
            }
            
            on(event, callback) {
                if (!this.events[event]) {
                    this.events[event] = [];
                }
                this.events[event].push(callback);
            }
            
            emit(event, data) {
                if (this.events[event]) {
                    this.events[event].forEach(callback => callback(data));
                }
            }
        }

        // Gestor de Notas
        class NoteManager {
            constructor(eventBus) {
                this.eventBus = eventBus;
                this.notes = this.cargarNotas();
                this.inicializarEventos();
                this.actualizarEstadisticas();
            }
            
            cargarNotas() {
                const guardadas = localStorage.getItem('notes');
                return guardadas ? JSON.parse(guardadas) : [];
            }
            
            guardarNotas() {
                localStorage.setItem('notes', JSON.stringify(this.notes));
            }
            
            inicializarEventos() {
                // Escuchar eventos del bus
                this.eventBus.on('noteAdded', (note) => {
                    this.agregarNota(note);
                });
                
                this.eventBus.on('noteDeleted', (noteId) => {
                    this.eliminarNota(noteId);
                });
                
                this.eventBus.on('noteUpdated', (updatedNote) => {
                    this.actualizarNota(updatedNote);
                });
                
                this.eventBus.on('searchNotes', (query) => {
                    this.buscarNotas(query);
                });
            }
            
            agregarNota(noteData) {
                const nuevaNota = {
                    id: Date.now().toString(),
                    title: noteData.title,
                    content: noteData.content,
                    priority: noteData.priority,
                    createdAt: new Date(),
                    completed: false
                };
                
                this.notes.unshift(nuevaNota);
                this.guardarNotas();
                this.actualizarEstadisticas();
                this.eventBus.emit('notesChanged', this.notes);
            }
            
            eliminarNota(noteId) {
                this.notes = this.notes.filter(note => note.id !== noteId);
                this.guardarNotas();
                this.actualizarEstadisticas();
                this.eventBus.emit('notesChanged', this.notes);
            }
            
            actualizarNota(updatedNote) {
                const index = this.notes.findIndex(note => note.id === updatedNote.id);
                if (index !== -1) {
                    this.notes[index] = { ...this.notes[index], ...updatedNote };
                    this.guardarNotas();
                    this.actualizarEstadisticas();
                    this.eventBus.emit('notesChanged', this.notes);
                }
            }
            
            buscarNotas(query) {
                const filtered = query ? this.notes.filter(note => 
                    note.title.toLowerCase().includes(query.toLowerCase()) ||
                    note.content.toLowerCase().includes(query.toLowerCase())
                ) : this.notes;
                
                this.eventBus.emit('notesFiltered', filtered);
            }
            
            actualizarEstadisticas() {
                const total = this.notes.length;
                const high = this.notes.filter(n => n.priority === 'high').length;
                const medium = this.notes.filter(n => n.priority === 'medium').length;
                const low = this.notes.filter(n => n.priority === 'low').length;
                
                this.eventBus.emit('statsUpdated', {
                    total,
                    high,
                    medium,
                    low
                });
            }
            
            getNotes() {
                return this.notes;
            }
        }

        // Interfaz de Usuario
        class NoteUI {
            constructor(eventBus, noteManager) {
                this.eventBus = eventBus;
                this.noteManager = noteManager;
                this.inicializarElementos();
                this.inicializarEventos();
                this.renderNotas();
            }
            
            inicializarElementos() {
                this.tituloInput = document.getElementById('tituloNota');
                this.contenidoInput = document.getElementById('contenidoNota');
                this.prioridadSelect = document.getElementById('prioridadNota');
                this.agregarBtn = document.getElementById('agregarNota');
                this.listaNotas = document.getElementById('listaNotas');
                this.buscarInput = document.getElementById('buscarNotas');
                this.totalNotas = document.getElementById('totalNotas');
                this.notasPorPrioridad = document.getElementById('notasPorPrioridad');
            }
            
            inicializarEventos() {
                // Evento para agregar nota
                this.agregarBtn.addEventListener('click', () => {
                    this.agregarNotaDesdeFormulario();
                });
                
                // Enter para agregar nota
                this.tituloInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') this.agregarNotaDesdeFormulario();
                });
                
                // Búsqueda con debounce
                this.buscarInput.addEventListener('input', this.debounce((e) => {
                    this.eventBus.emit('searchNotes', e.target.value);
                }, 300));
                
                // Escuchar eventos del bus
                this.eventBus.on('notesChanged', (notes) => {
                    this.renderNotas(notes);
                });
                
                this.eventBus.on('notesFiltered', (notes) => {
                    this.renderNotas(notes);
                });
                
                this.eventBus.on('statsUpdated', (stats) => {
                    this.actualizarEstadisticas(stats);
                });
            }
            
            agregarNotaDesdeFormulario() {
                const titulo = this.tituloInput.value.trim();
                const contenido = this.contenidoInput.value.trim();
                const prioridad = this.prioridadSelect.value;
                
                if (titulo && contenido) {
                    this.eventBus.emit('noteAdded', {
                        title: titulo,
                        content: contenido,
                        priority: prioridad
                    });
                    
                    // Limpiar formulario
                    this.tituloInput.value = '';
                    this.contenidoInput.value = '';
                    this.tituloInput.focus();
                }
            }
            
            renderNotas(notes = this.noteManager.getNotes()) {
                this.listaNotas.innerHTML = '';
                
                notes.forEach(note => {
                    const noteElement = this.crearElementoNota(note);
                    this.listaNotas.appendChild(noteElement);
                });
            }
            
            crearElementoNota(note) {
                const div = document.createElement('div');
                div.className = \`note priority-\${note.priority}\`;
                div.innerHTML = \`
                    <div class="note-title">\${this.escapeHtml(note.title)}</div>
                    <div class="note-content">\${this.escapeHtml(note.content)}</div>
                    <div class="note-meta">
                        <small>\${new Date(note.createdAt).toLocaleDateString()}</small>
                        <small>\${note.priority.toUpperCase()}</small>
                    </div>
                    <div class="note-actions">
                        <button class="btn btn-success toggle-complete" data-id="\${note.id}">
                            \${note.completed ? '↶ Reabrir' : '✓ Completar'}
                        </button>
                        <button class="btn btn-danger delete-note" data-id="\${note.id}">🗑️ Eliminar</button>
                    </div>
                \`;
                
                // Delegación de eventos para los botones
                div.addEventListener('click', (e) => {
                    if (e.target.classList.contains('delete-note')) {
                        if (confirm('¿Estás seguro de que quieres eliminar esta nota?')) {
                            this.eventBus.emit('noteDeleted', e.target.dataset.id);
                        }
                    }
                    
                    if (e.target.classList.contains('toggle-complete')) {
                        this.eventBus.emit('noteUpdated', {
                            id: e.target.dataset.id,
                            completed: !note.completed
                        });
                    }
                });
                
                return div;
            }
            
            actualizarEstadisticas(stats) {
                this.totalNotas.textContent = \`Total: \${stats.total}\`;
                this.notasPorPrioridad.textContent = 
                    \`Prioridades: Alto: \${stats.high}, Medio: \${stats.medium}, Bajo: \${stats.low}\`;
            }
            
            escapeHtml(text) {
                const div = document.createElement('div');
                div.textContent = text;
                return div.innerHTML;
            }
            
            debounce(func, wait) {
                let timeout;
                return function executedFunction(...args) {
                    const later = () => {
                        clearTimeout(timeout);
                        func(...args);
                    };
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                };
            }
        }

        // Inicialización de la aplicación
        const eventBus = new NoteEventBus();
        const noteManager = new NoteManager(eventBus);
        const noteUI = new NoteUI(eventBus, noteManager);

        console.log('Aplicación de notas inicializada con eventos avanzados');

        // Agregar algunas notas de ejemplo si no hay ninguna
        if (noteManager.getNotes().length === 0) {
            eventBus.emit('noteAdded', {
                title: 'Bienvenido a la app de notas',
                content: 'Esta es tu primera nota. ¡Puedes editarla o eliminarla!',
                priority: 'high'
            });
            
            eventBus.emit('noteAdded', {
                title: 'Características',
                content: 'La app usa eventos personalizados, delegación, y patrones avanzados',
                priority: 'medium'
            });
        }
    </script>
</body>
</html>
*/`
  };

  return (
    <div className="guia-contenido">
      <header className="guia-header">
        <h1>Eventos en JavaScript</h1>
        <div className="guia-meta">
          <span className="nivel">Intermedio</span>
          <span className="tiempo">55 minutos</span>
        </div>
      </header>

      <section className="guia-seccion">
        <h2>Fundamentos de Eventos</h2>
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>¿Qué son los eventos?</h3>
            <p>Los eventos son acciones que ocurren en el navegador y que podemos capturar con JavaScript para crear interactividad.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Conceptos Básicos de Eventos</span>
            <button 
              className={`btn-copiar ${copiado === 'fundamentosEventos' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.fundamentosEventos, 'fundamentosEventos')}
            >
              {copiado === 'fundamentosEventos' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.fundamentosEventos}</code>
          </pre>
        </div>

        <div className="tipos-datos-grid">
          <div className="tipo-dato-card">
            <h4>🖱️ Eventos de Mouse</h4>
            <p>click, dblclick, mouseover, mouseout</p>
            <code>addEventListener</code>
          </div>
          <div className="tipo-dato-card">
            <h4>⌨️ Eventos de Teclado</h4>
            <p>keydown, keyup, keypress</p>
            <code>event.key</code>
          </div>
          <div className="tipo-dato-card">
            <h4>📄 Eventos de Formulario</h4>
            <p>submit, change, input, focus</p>
            <code>preventDefault()</code>
          </div>
          <div className="tipo-dato-card">
            <h4>🔄 Eventos de Ventana</h4>
            <p>load, resize, scroll</p>
            <code>window.addEventListener</code>
          </div>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Propagación de Eventos</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Bubbling y Capturing</h3>
            <p>Los eventos en el DOM se propagan en dos fases: capturing (hacia abajo) y bubbling (hacia arriba). Entender esto es crucial para el manejo correcto de eventos.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Bubbling y Capturing</span>
            <button 
              className={`btn-copiar ${copiado === 'propagacionEventos' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.propagacionEventos, 'propagacionEventos')}
            >
              {copiado === 'propagacionEventos' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.propagacionEventos}</code>
          </pre>
        </div>

        <div className="tabla-contenedor">
          <table className="tabla-guia">
            <thead>
              <tr>
                <th>Fase</th>
                <th>Dirección</th>
                <th>Orden</th>
                <th>Uso</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Capturing</td>
                <td>Padre → Hijo</td>
                <td>Primero</td>
                <td><code>addEventListener(..., true)</code></td>
              </tr>
              <tr>
                <td>Target</td>
                <td>Elemento objetivo</td>
                <td>Segundo</td>
                <td>El elemento que disparó el evento</td>
              </tr>
              <tr>
                <td>Bubbling</td>
                <td>Hijo → Padre</td>
                <td>Tercero</td>
                <td>Comportamiento por defecto</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Delegación de Eventos</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Manejo Eficiente de Múltiples Elementos</h3>
            <p>La delegación de eventos permite manejar eventos en elementos hijos mediante un solo listener en un elemento padre, ideal para elementos dinámicos.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Delegación de Eventos</span>
            <button 
              className={`btn-copiar ${copiado === 'delegacionEventos' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.delegacionEventos, 'delegacionEventos')}
            >
              {copiado === 'delegacionEventos' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.delegacionEventos}</code>
          </pre>
        </div>

        <div className="nota-importante">
          <h4>💡 Ventajas de la Delegación</h4>
          <ul>
            <li><strong>Menos memoria:</strong> Un solo listener en lugar de muchos</li>
            <li><strong>Elementos dinámicos:</strong> Funciona con elementos agregados después</li>
            <li><strong>Mejor performance:</strong> Especialmente en listas grandes</li>
            <li><strong>Código más limpio:</strong> Menos código repetitivo</li>
            <li><strong>Más mantenible:</strong> Fácil de actualizar y depurar</li>
          </ul>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Eventos Personalizados</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Creando Tus Propios Eventos</h3>
            <p>JavaScript permite crear y disparar eventos personalizados, lo que es útil para comunicación entre componentes y arquitecturas basadas en eventos.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Eventos Personalizados</span>
            <button 
              className={`btn-copiar ${copiado === 'eventosPersonalizados' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.eventosPersonalizados, 'eventosPersonalizados')}
            >
              {copiado === 'eventosPersonalizados' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.eventosPersonalizados}</code>
          </pre>
        </div>

        <div className="resumen-practicas">
          <h4>📋 Tipos de Eventos Personalizados</h4>
          <ul>
            <li><strong>Event básico:</strong> <code>new Event('nombre')</code></li>
            <li><strong>CustomEvent con datos:</strong> <code>{`new CustomEvent('nombre', {detail: {...}})`}</code></li>
            <li><strong>Event buses:</strong> Para comunicación entre componentes</li>
            <li><strong>Pub/Sub pattern:</strong> Patrón publicador-suscriptor</li>
            <li><strong>Component events:</strong> Eventos específicos de componentes</li>
          </ul>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Métodos y Propiedades del Evento</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>El Objeto Event y Sus Herramientas</h3>
            <p>El objeto Event proporciona métodos y propiedades esenciales para controlar el comportamiento de los eventos y obtener información sobre ellos.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Métodos del Objeto Event</span>
            <button 
              className={`btn-copiar ${copiado === 'metodosEvento' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.metodosEvento, 'metodosEvento')}
            >
              {copiado === 'metodosEvento' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.metodosEvento}</code>
          </pre>
        </div>

        <div className="nota-advertencia">
          <h4>⚠️ Métodos Clave del Evento</h4>
          <ul>
            <li><strong>preventDefault():</strong> Evita el comportamiento por defecto</li>
            <li><strong>stopPropagation():</strong> Detiene la propagación del evento</li>
            <li><strong>stopImmediatePropagation():</strong> Detiene otros listeners del mismo elemento</li>
            <li><strong>event.target:</strong> Elemento que originó el evento</li>
            <li><strong>event.currentTarget:</strong> Elemento que tiene el listener</li>
          </ul>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Patrones Avanzados de Eventos</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Técnicas para Manejo de Eventos Complejos</h3>
            <p>Patrones como throttling, debouncing, y patrones de diseño específicos para eventos pueden mejorar significativamente el rendimiento y la experiencia de usuario.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Patrones Avanzados</span>
            <button 
              className={`btn-copiar ${copiado === 'patronesAvanzados' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.patronesAvanzados, 'patronesAvanzados')}
            >
              {copiado === 'patronesAvanzados' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.patronesAvanzados}</code>
          </pre>
        </div>

        <div className="tipos-datos-grid">
          <div className="tipo-dato-card">
            <h4>⏱️ Throttling</h4>
            <p>Limita la frecuencia de ejecución</p>
            <code>scroll, resize</code>
          </div>
          <div className="tipo-dato-card">
            <h4>⏳ Debouncing</h4>
            <p>Espera a que termine la acción</p>
            <code>search, input</code>
          </div>
          <div className="tipo-dato-card">
            <h4>🚌 Event Bus</h4>
            <p>Comunicación entre componentes</p>
            <code>Pub/Sub pattern</code>
          </div>
          <div className="tipo-dato-card">
            <h4>👀 Observer</h4>
            <p>Patrón observador para estado</p>
            <code>state management</code>
          </div>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Ejemplo Completo: Aplicación de Notas</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Sistema Completo con Eventos Avanzados</h3>
            <p>Esta aplicación integra todos los conceptos de eventos en un gestor de notas completo con eventos personalizados, delegación, y patrones avanzados.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Aplicación de Notas Completa</span>
            <button 
              className={`btn-copiar ${copiado === 'ejemploCompleto' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.ejemploCompleto, 'ejemploCompleto')}
            >
              {copiado === 'ejemploCompleto' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.ejemploCompleto}</code>
          </pre>
        </div>

        <div className="nota-exito">
          <h4>🎯 Características Implementadas</h4>
          <ul>
            <li><strong>Event Bus:</strong> Comunicación entre componentes</li>
            <li><strong>Delegación de eventos:</strong> Para elementos dinámicos</li>
            <li><strong>Eventos personalizados:</strong> noteAdded, noteDeleted, etc.</li>
            <li><strong>Debouncing:</strong> Para búsqueda en tiempo real</li>
            <li><strong>Persistencia:</strong> LocalStorage con eventos</li>
            <li><strong>Estadísticas:</strong> Actualizadas automáticamente</li>
            <li><strong>Arquitectura modular:</strong> Separación de responsabilidades</li>
          </ul>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Próximos Pasos</h2>
        <div className="proximos-pasos">
          <div className="paso-aprendizaje">
            <div className="paso-numero">10</div>
            <div className="paso-info">
              <h4>ES6+ Features</h4>
              <p>Aprenderás características modernas como arrow functions, template literals y destructuring.</p>
            </div>
          </div>
          <div className="paso-aprendizaje">
            <div className="paso-numero">11</div>
            <div className="paso-info">
              <h4>Async/Await y Promesas</h4>
              <p>Dominarás la programación asíncrona para operaciones de red y temporizadores.</p>
            </div>
          </div>
          <div className="paso-aprendizaje">
            <div className="paso-numero">12</div>
            <div className="paso-info">
              <h4>Módulos y Import/Export</h4>
              <p>Aprenderás a organizar tu código en módulos reutilizables.</p>
            </div>
          </div>
        </div>

        <div className="resumen-practicas">
          <h4>📋 Resumen de Eventos</h4>
          <ul>
            <li><strong>Fundamentos:</strong> addEventListener, objeto Event</li>
            <li><strong>Propagación:</strong> Bubbling, Capturing, stopPropagation</li>
            <li><strong>Delegación:</strong> event.target.matches(), eficiencia</li>
            <li><strong>Personalizados:</strong> CustomEvent, Event buses</li>
            <li><strong>Métodos:</strong> preventDefault(), stopImmediatePropagation()</li>
            <li><strong>Patrones:</strong> Throttling, Debouncing, Observer</li>
            <li><strong>Mejores prácticas:</strong> Delegación, organización, performance</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Guia_9;