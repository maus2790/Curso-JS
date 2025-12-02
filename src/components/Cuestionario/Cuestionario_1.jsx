import React, { useState } from 'react';
import './Cuestionarios.css';

const Cuestionario_1 = () => {
  const [copiado, setCopiado] = useState(null);

  const copiarCodigo = (codigo, id) => {
    navigator.clipboard.writeText(codigo);
    setCopiado(id);
    setTimeout(() => setCopiado(null), 2000);
  };

  const ejemplosCodigo = {
    ejemplo1: `// Mi primer programa en JavaScript
console.log("¡Hola Mundo desde JavaScript!");

// Mostrar mensaje emergente en el navegador
alert("Bienvenido al mundo de la programación con JavaScript");

// Función básica
function saludar(nombre) {
    return "Hola, " + nombre + "!";
}

// Llamar a la función
let saludo = saludar("Estudiante");
console.log(saludo);`,

    ejemplo2: `// Declaración de variables con diferentes tipos
let nombre = "Carlos García";
const edad = 28;
let esEstudiante = true;
let altura = 1.75;

// Concatenación de strings
let mensaje = "Hola, me llamo " + nombre + " y tengo " + edad + " años.";

// Template literals (ES6+)
let mensajeModerno = \`Hola, me llamo \${nombre} y tengo \${edad} años.\`;`,

    ejemplo3: `// En la Consola del Navegador
console.log("Hola Mundo");

// En un Archivo HTML
<script>
  alert("JavaScript funcionando!");
</script>

// Archivo Externo
<script src="mi-script.js"></script>`,

    ejemplo4: `// Declaración de variable
let mensaje = "Hola Mundo";

// Función básica
function mostrarMensaje(texto) {
    console.log(texto);
}

// Llamada a función
mostrarMensaje(mensaje);`
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
            <h3>Lenguaje de Programación Web</h3>
            <p>JavaScript es un lenguaje de programación interpretado, dialecto del estándar ECMAScript. Se define como orientado a objetos, basado en prototipos, imperativo, débilmente tipado y dinámico.</p>
          </div>
        </div>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Características Principales</h3>
            <ul>
              <li><strong>Interpretado:</strong> No necesita compilación</li>
              <li><strong>Orientado a objetos:</strong> Basado en prototipos</li>
              <li><strong>Multiplataforma:</strong> Funciona en todos los navegadores</li>
              <li><strong>Dinámico:</strong> No requiere declaración de tipos</li>
              <li><strong>Event-driven:</strong> Responde a eventos</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Configuración del Entorno</h2>
        <div className="pasos-lista">
          <div className="paso">
            <div className="paso-numero">1</div>
            <div className="paso-contenido">
              <h4>Editor de Código</h4>
              <p>Instala Visual Studio Code o tu editor preferido.</p>
            </div>
          </div>
          <div className="paso">
            <div className="paso-numero">2</div>
            <div className="paso-contenido">
              <h4>Navegador Web</h4>
              <p>Usa Chrome, Firefox o cualquier navegador moderno.</p>
            </div>
          </div>
          <div className="paso">
            <div className="paso-numero">3</div>
            <div className="paso-contenido">
              <h4>Node.js (Opcional)</h4>
              <p>Para desarrollo full-stack, instala Node.js.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Tu Primer Código JavaScript</h2>
        
        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Ejemplo Básico</span>
            <button 
              className={`btn-copiar ${copiado === 'ejemplo1' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.ejemplo1, 'ejemplo1')}
            >
              {copiado === 'ejemplo1' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.ejemplo1}</code>
          </pre>
        </div>

        <div className="nota-importante">
          <h4>💡 Nota Importante</h4>
          <p>JavaScript se puede incluir en páginas HTML de tres formas: inline, interno y externo. Para proyectos serios, usa archivos externos.</p>
        </div>

        <div className="ejemplos-rapidos">
          <h4>Ejemplos Rápidos</h4>
          <div className="codigo-contenedor">
            <div className="codigo-header">
              <span>Diferentes Formas de Usar JS</span>
              <button 
                className={`btn-copiar ${copiado === 'ejemplo3' ? 'copiado' : ''}`}
                onClick={() => copiarCodigo(ejemplosCodigo.ejemplo3, 'ejemplo3')}
              >
                {copiado === 'ejemplo3' ? '✓ Copiado' : '📋 Copiar'}
              </button>
            </div>
            <pre className="codigo-ejemplo">
              <code>{ejemplosCodigo.ejemplo3}</code>
            </pre>
          </div>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Ámbitos de Aplicación</h2>
        <div className="aplicaciones-grid">
          <div className="aplicacion-card">
            <h4>🌐 Frontend</h4>
            <p>Interactividad en páginas web, SPAs con React, Angular o Vue.</p>
          </div>
          <div className="aplicacion-card">
            <h4>⚙️ Backend</h4>
            <p>Con Node.js para crear servidores y APIs.</p>
          </div>
          <div className="aplicacion-card">
            <h4>📱 Móvil</h4>
            <p>React Native, Ionic para apps nativas.</p>
          </div>
          <div className="aplicacion-card">
            <h4>🖥️ Desktop</h4>
            <p>Electron para apps de escritorio.</p>
          </div>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Conceptos Fundamentales</h2>
        <div className="conceptos-lista">
          <div className="concepto-item">
            <h4>Sintaxis Básica</h4>
            <p>JavaScript tiene sintaxis similar a C/Java.</p>
            <div className="codigo-contenedor">
              <div className="codigo-header">
                <span>Sintaxis Ejemplo</span>
                <button 
                  className={`btn-copiar ${copiado === 'ejemplo4' ? 'copiado' : ''}`}
                  onClick={() => copiarCodigo(ejemplosCodigo.ejemplo4, 'ejemplo4')}
                >
                  {copiado === 'ejemplo4' ? '✓ Copiado' : '📋 Copiar'}
                </button>
              </div>
              <pre className="codigo-ejemplo">
                <code>{ejemplosCodigo.ejemplo4}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Próximos Pasos</h2>
        <div className="proximos-pasos">
          <div className="paso-aprendizaje">
            <div className="paso-numero">1</div>
            <div className="paso-info">
              <h4>Variables y Tipos de Datos</h4>
              <p>Aprenderás sobre let, const, var y tipos de datos.</p>
            </div>
          </div>
          <div className="paso-aprendizaje">
            <div className="paso-numero">2</div>
            <div className="paso-info">
              <h4>Operadores</h4>
              <p>Dominarás operadores aritméticos y lógicos.</p>
            </div>
          </div>
          <div className="paso-aprendizaje">
            <div className="paso-numero">3</div>
            <div className="paso-info">
              <h4>Estructuras de Control</h4>
              <p>Aprenderás if/else, bucles y switch.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cuestionario_1;