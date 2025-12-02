import React, { useState } from 'react';
import './Guias.css';

const Guia_1 = () => {
  const [copiado, setCopiado] = useState(null);

  const copiarCodigo = (codigo, id) => {
    navigator.clipboard.writeText(codigo);
    setCopiado(id);
    setTimeout(() => setCopiado(null), 2000);
  };

  const ejemplosCodigo = {
    holaMundo: `// Tu primer programa en JavaScript
console.log("¡Hola, Mundo!");

// Mostrar mensaje en el navegador
alert("Bienvenido a JavaScript");`,

    sintaxisBasica: `// Los comentarios se escriben con //
/* 
   Los comentarios multilínea
   se escriben así 
*/

// Las sentencias terminan con punto y coma (opcional)
console.log("Hola");
console.log("Mundo");

// Los bloques de código usan llaves
if (true) {
    console.log("Este código se ejecuta");
}

// JavaScript es case sensitive
let nombre = "Juan";
let Nombre = "Pedro"; // Estas son variables diferentes`,

    dondeEjecutar: `// 1. En la consola del navegador (F12)
console.log("Ejecutando en consola");

// 2. En un archivo HTML
// <script>
//   console.log("Desde HTML");
// </script>

// 3. En Node.js
// console.log("Desde Node.js");

// 4. En herramientas online (CodePen, JSFiddle)
console.log("Desde herramienta online");`,

    conceptosBasicos: `// JavaScript es un lenguaje de programación
// que se ejecuta en el navegador

// Podemos interactuar con la página web
document.getElementById("miBoton").addEventListener("click", function() {
    alert("¡Botón clickeado!");
});

// Podemos modificar el contenido HTML
document.getElementById("titulo").textContent = "Nuevo título";

// Podemos cambiar estilos CSS
document.body.style.backgroundColor = "lightblue";`,

    ejemploInteractivo: `// Ejemplo simple de interactividad
function cambiarColor() {
    const colores = ["red", "blue", "green", "yellow", "purple"];
    const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
    document.body.style.backgroundColor = colorAleatorio;
    console.log("Color cambiado a: " + colorAleatorio);
}

// Simulación de un contador de clics
let contadorClics = 0;

function contarClic() {
    contadorClics++;
    console.log("Número de clics: " + contadorClics);
    document.getElementById("contador").textContent = contadorClics;
}

// Ejemplo de validación simple
function validarFormulario() {
    const nombre = document.getElementById("nombre").value;
    
    if (nombre === "") {
        alert("Por favor ingresa tu nombre");
        return false;
    } else {
        alert("¡Hola " + nombre + "!");
        return true;
    }
}`,

    ejemploCompleto: `// === EJEMPLO COMPLETO: PÁGINA INTERACTIVA SIMPLE ===

// Función para mostrar u ocultar contenido
function toggleContenido() {
    const contenido = document.getElementById("contenidoExtra");
    const boton = document.getElementById("botonToggle");
    
    if (contenido.style.display === "none") {
        contenido.style.display = "block";
        boton.textContent = "Ocultar Contenido";
        console.log("Contenido mostrado");
    } else {
        contenido.style.display = "none";
        boton.textContent = "Mostrar Contenido";
        console.log("Contenido ocultado");
    }
}

// Función para cambiar el tema
function cambiarTema() {
    const body = document.body;
    
    if (body.classList.contains("tema-oscuro")) {
        body.classList.remove("tema-oscuro");
        body.classList.add("tema-claro");
        console.log("Cambiado a tema claro");
    } else {
        body.classList.remove("tema-claro");
        body.classList.add("tema-oscuro");
        console.log("Cambiado a tema oscuro");
    }
}

// Función para mostrar la hora actual
function mostrarHora() {
    const ahora = new Date();
    const hora = ahora.toLocaleTimeString();
    document.getElementById("horaActual").textContent = "Hora actual: " + hora;
    console.log("Hora actualizada: " + hora);
}

// Función principal que se ejecuta al cargar la página
function inicializar() {
    console.log("=== BIENVENIDO A JAVASCRIPT ===");
    console.log("La página se ha cargado correctamente");
    
    // Mostrar hora inicial
    mostrarHora();
    
    // Actualizar la hora cada segundo
    setInterval(mostrarHora, 1000);
    
    // Mensaje de bienvenida
    alert("¡Bienvenido! Esta página muestra ejemplos básicos de JavaScript");
}

// Ejecutar la función inicial cuando la página cargue
// window.onload = inicializar;

console.log("Ejecuta inicializar() cuando la página cargue para ver la magia de JavaScript");`
  };

  return (
    <div className="guia-contenido">
      <header className="guia-header">
        <h1>Introducción a JavaScript</h1>
        <div className="guia-meta">
          <span className="nivel">Principiante</span>
          <span className="tiempo">30 minutos</span>
        </div>
      </header>

      <section className="guia-seccion">
        <h2>¿Qué es JavaScript?</h2>
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>El lenguaje de programación de la web</h3>
            <p>JavaScript es un lenguaje de programación que permite crear contenido dinámico e interactivo en las páginas web. Es uno de los tres pilares fundamentales del desarrollo web, junto con HTML y CSS.</p>
            <ul>
              <li><strong>HTML:</strong> Estructura el contenido (el esqueleto)</li>
              <li><strong>CSS:</strong> Define el estilo y diseño (la apariencia)</li>
              <li><strong>JavaScript:</strong> Añade interactividad y comportamiento (la acción)</li>
            </ul>
          </div>
        </div>

        <div className="aplicaciones-grid">
          <div className="aplicacion-card">
            <h4>🌐 Frontend Web</h4>
            <p>Interactividad en navegadores, animaciones, validación de formularios</p>
          </div>
          <div className="aplicacion-card">
            <h4>⚙️ Backend</h4>
            <p>Servidores con Node.js, APIs, bases de datos</p>
          </div>
          <div className="aplicacion-card">
            <h4>📱 Apps Móviles</h4>
            <p>Aplicaciones nativas con React Native, Ionic</p>
          </div>
          <div className="aplicacion-card">
            <h4>🖥️ Desktop</h4>
            <p>Aplicaciones de escritorio con Electron</p>
          </div>
        </div>

        <div className="nota-importante">
          <h4>💡 ¿Por qué aprender JavaScript?</h4>
          <p>JavaScript es el único lenguaje que funciona en todos los navegadores web sin necesidad de plugins. Es esencial para el desarrollo web moderno y tiene una gran comunidad y ecosistema.</p>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Tu Primer Código JavaScript</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Hola Mundo</h3>
            <p>El tradicional "Hola Mundo" es el primer programa que escriben la mayoría de los programadores cuando aprenden un nuevo lenguaje.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Primeros Pasos</span>
            <button 
              className={`btn-copiar ${copiado === 'holaMundo' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.holaMundo, 'holaMundo')}
            >
              {copiado === 'holaMundo' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.holaMundo}</code>
          </pre>
        </div>

        <div className="nota-exito">
          <h4>🎯 Lo que hace este código:</h4>
          <ul>
            <li><code>console.log()</code>: Muestra mensajes en la consola del navegador</li>
            <li><code>alert()</code>: Muestra un cuadro de diálogo emergente</li>
          </ul>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Sintaxis Básica</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Reglas Fundamentales</h3>
            <p>JavaScript tiene reglas simples pero importantes que debes seguir para escribir código válido.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Conceptos de Sintaxis</span>
            <button 
              className={`btn-copiar ${copiado === 'sintaxisBasica' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.sintaxisBasica, 'sintaxisBasica')}
            >
              {copiado === 'sintaxisBasica' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.sintaxisBasica}</code>
          </pre>
        </div>

        <div className="resumen-practicas">
          <h4>📋 Reglas Básicas de JavaScript</h4>
          <ul>
            <li>Los comentarios se escriben con <code>//</code> para una línea o <code>/* */</code> para múltiples líneas</li>
            <li>Las sentencias pueden terminar con <code>;</code> (recomendado)</li>
            <li>Los bloques de código usan llaves <code>{}</code></li>
            <li>JavaScript es <strong>case sensitive</strong> (diferencia entre mayúsculas y minúsculas)</li>
            <li>Los nombres no pueden empezar con números ni contener espacios</li>
          </ul>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>¿Dónde Ejecutar JavaScript?</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Múltiples Ambientes de Ejecución</h3>
            <p>JavaScript puede ejecutarse en diferentes lugares, cada uno con sus propias características.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Ambientes de Ejecución</span>
            <button 
              className={`btn-copiar ${copiado === 'dondeEjecutar' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.dondeEjecutar, 'dondeEjecutar')}
            >
              {copiado === 'dondeEjecutar' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.dondeEjecutar}</code>
          </pre>
        </div>

        <div className="pasos-lista">
          <div className="paso">
            <div className="paso-numero">1</div>
            <div className="paso-contenido">
              <h4>Consola del Navegador</h4>
              <p>Presiona F12 en cualquier navegador y ve a la pestaña "Console". Perfecto para pruebas rápidas.</p>
            </div>
          </div>
          <div className="paso">
            <div className="paso-numero">2</div>
            <div className="paso-contenido">
              <h4>Archivo HTML</h4>
              <p>Incrusta código JavaScript en un archivo HTML usando la etiqueta &lt;script&gt;.</p>
            </div>
          </div>
          <div className="paso">
            <div className="paso-numero">3</div>
            <div className="paso-contenido">
              <h4>Node.js</h4>
              <p>Ejecuta JavaScript en el servidor o en tu computadora con Node.js.</p>
            </div>
          </div>
          <div className="paso">
            <div className="paso-numero">4</div>
            <div className="paso-contenido">
              <h4>Herramientas Online</h4>
              <p>Usa CodePen, JSFiddle o CodeSandbox para experimentar sin instalar nada.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Conceptos Fundamentales</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>¿Qué puede hacer JavaScript?</h3>
            <p>JavaScript te permite hacer que las páginas web sean interactivas y dinámicas.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Capacidades Básicas</span>
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
            <h4>🖱️ Manipular Eventos</h4>
            <p>Responder a clics, teclas, movimientos del mouse</p>
          </div>
          <div className="tipo-dato-card">
            <h4>🎨 Modificar Estilos</h4>
            <p>Cambiar colores, animaciones, posiciones</p>
          </div>
          <div className="tipo-dato-card">
            <h4>📝 Actualizar Contenido</h4>
            <p>Cambiar texto, imágenes, elementos HTML</p>
          </div>
          <div className="tipo-dato-card">
            <h4>📊 Validar Datos</h4>
            <p>Verificar formularios, mostrar errores</p>
          </div>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Ejemplos Interactivos</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Código que Responde a Acciones</h3>
            <p>JavaScript brilla cuando creas interacciones que responden a lo que hace el usuario.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Interactividad Básica</span>
            <button 
              className={`btn-copiar ${copiado === 'ejemploInteractivo' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.ejemploInteractivo, 'ejemploInteractivo')}
            >
              {copiado === 'ejemploInteractivo' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.ejemploInteractivo}</code>
          </pre>
        </div>

        <div className="nota-importante">
          <h4>💡 Cómo probar estos ejemplos</h4>
          <p>Copia este código en la consola del navegador o en un archivo HTML. Luego crea botones en HTML con los IDs correspondientes (<code>miBoton</code>, <code>contador</code>, etc.) para ver la magia en acción.</p>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Ejemplo Completo: Página Interactiva</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Integrando Conceptos Básicos</h3>
            <p>Este ejemplo muestra cómo varios conceptos de JavaScript pueden trabajar juntos para crear una experiencia interactiva.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Página Interactiva Completa</span>
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
          <h4>🎉 ¡Felicidades!</h4>
          <p>Has completado tu primera introducción a JavaScript. Has aprendido:</p>
          <ul>
            <li><strong>Qué es JavaScript</strong> y para qué se usa</li>
            <li><strong>Cómo escribir código básico</strong> y dónde ejecutarlo</li>
            <li><strong>La sintaxis fundamental</strong> del lenguaje</li>
            <li><strong>Conceptos de interactividad</strong> con la página web</li>
            <li><strong>Ejemplos prácticos</strong> de lo que puedes crear</li>
          </ul>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Próximos Pasos en tu Aprendizaje</h2>
        <div className="proximos-pasos">
          <div className="paso-aprendizaje">
            <div className="paso-numero">2</div>
            <div className="paso-info">
              <h4>Variables y Tipos de Datos</h4>
              <p>Aprenderás a almacenar información usando variables y conocerás los diferentes tipos de datos en JavaScript.</p>
            </div>
          </div>
          <div className="paso-aprendizaje">
            <div className="paso-numero">3</div>
            <div className="paso-info">
              <h4>Operadores y Expresiones</h4>
              <p>Descubrirás cómo realizar operaciones matemáticas, comparaciones y lógicas con operadores.</p>
            </div>
          </div>
          <div className="paso-aprendizaje">
            <div className="paso-numero">4</div>
            <div className="paso-info">
              <h4>Estructuras de Control</h4>
              <p>Aprenderás a controlar el flujo de tu programa con condicionales y bucles.</p>
            </div>
          </div>
        </div>

        <div className="resumen-practicas">
          <h4>📋 Resumen de lo Aprendido</h4>
          <ul>
            <li>JavaScript es el lenguaje de programación de la web</li>
            <li>Se ejecuta en navegadores y otros ambientes</li>
            <li>Permite crear páginas web interactivas y dinámicas</li>
            <li>Usa sintaxis simple con comentarios, sentencias y bloques</li>
            <li>Puede manipular HTML, CSS y responder a eventos del usuario</li>
            <li>Es el primer paso para convertirte en desarrollador web</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Guia_1;