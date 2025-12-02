import React, { useState } from 'react';
import './Guias.css';

const Guia_2 = () => {
  const [copiado, setCopiado] = useState(null);

  const copiarCodigo = (codigo, id) => {
    navigator.clipboard.writeText(codigo);
    setCopiado(id);
    setTimeout(() => setCopiado(null), 2000);
  };

  const ejemplosCodigo = {
    ejemplo1: `// Declaración de variables
let nombre = "María"; // String
const edad = 25;      // Number
let esEstudiante = true; // Boolean

// Reasignación de variables
nombre = "Carlos";
// edad = 30; // Error: no se puede reasignar una constante

// Variables con diferentes tipos
let altura = 1.75;
let direccion = "Calle Principal 123";
let tieneMascota = false;

console.log("Nombre:", nombre);
console.log("Edad:", edad);
console.log("Es estudiante:", esEstudiante);`,

    ejemplo2: `// Tipos de datos primitivos
let texto = "Hola Mundo";           // String
let numeroEntero = 42;              // Number
let numeroDecimal = 3.14;           // Number
let booleanoVerdadero = true;       // Boolean
let booleanoFalso = false;          // Boolean
let nulo = null;                    // Null
let indefinido = undefined;         // Undefined
let simbolo = Symbol('id');         // Symbol (ES6)

// typeof para verificar tipos
console.log("Tipo de texto:", typeof texto);          // "string"
console.log("Tipo de numeroEntero:", typeof numeroEntero);   // "number"
console.log("Tipo de booleanoVerdadero:", typeof booleanoVerdadero); // "boolean"
console.log("Tipo de nulo:", typeof nulo);           // "object" (¡comportamiento histórico!)
console.log("Tipo de indefinido:", typeof indefinido);     // "undefined"`,

    ejemplo3: `// Strings y métodos comunes
let saludo = "Hola JavaScript";
let nombre = "Ana";

// Concatenación
let mensaje = saludo + ", " + nombre + "!";
console.log("Concatenación:", mensaje);

// Template literals (ES6+)
let mensajeModerno = \`\${saludo}, \${nombre}!\`;
console.log("Template literal:", mensajeModerno);

// Métodos de string
console.log("Longitud:", saludo.length);         // 16
console.log("Mayúsculas:", saludo.toUpperCase());  // "HOLA JAVASCRIPT"
console.log("Minúsculas:", saludo.toLowerCase());  // "hola javascript"
console.log("Incluye 'Java':", saludo.includes("Java")); // true
console.log("Substring:", saludo.substring(0, 4)); // "Hola"`,

    ejemplo4: `// Números y operaciones
let precio = 99.99;
let cantidad = 3;
let iva = 0.21;

// Operaciones aritméticas
let subtotal = precio * cantidad;
let total = subtotal * (1 + iva);

console.log("Precio:", precio);
console.log("Cantidad:", cantidad);
console.log("Subtotal:", subtotal);
console.log("Total con IVA:", total);

// Métodos numéricos
console.log("Redondeo:", Math.round(precio));    // 100
console.log("Floor:", Math.floor(precio));    // 99
console.log("Parse Int:", parseInt("100"));       // 100
console.log("Parse Float:", parseFloat("99.99"));   // 99.99
console.log("Total formateado:", total.toFixed(2));      // "362.96"

// Valores especiales
let infinito = Infinity;
let noEsNumero = NaN;
console.log("Infinito:", infinito);
console.log("NaN:", noEsNumero);`,

    ejemplo5: `// Comparación de tipos
let numero = 5;
let textoNumero = "5";

// Comparación débil (==)
console.log("5 == '5':", numero == textoNumero);   // true

// Comparación estricta (===)
console.log("5 === '5':", numero === textoNumero);  // false

// Conversión de tipos
let numeroConvertido = Number(textoNumero);
let textoConvertido = String(numero);

console.log("5 === Number('5'):", numero === numeroConvertido);     // true
console.log("'5' === String(5):", textoNumero === textoConvertido); // false (diferentes strings)

// Valores truthy y falsy
console.log("Boolean(''):", Boolean(""));        // false
console.log("Boolean('texto'):", Boolean("texto"));   // true
console.log("Boolean(0):", Boolean(0));         // false
console.log("Boolean(1):", Boolean(1));         // true
console.log("Boolean(null):", Boolean(null));      // false
console.log("Boolean(undefined):", Boolean(undefined)); // false`,

    ejemplo6: `// Arrays (arreglos)
let frutas = ["manzana", "banana", "naranja"];
let numeros = [1, 2, 3, 4, 5];
let mixto = [1, "texto", true, null];

// Acceso a elementos
console.log("Primera fruta:", frutas[0]);          // "manzana"
console.log("Longitud del array:", frutas.length);      // 3

// Métodos de array
frutas.push("uva");              // Agrega al final
console.log("Después de push:", frutas);

frutas.pop();                    // Elimina el último
console.log("Después de pop:", frutas);

frutas.unshift("kiwi");          // Agrega al inicio
console.log("Después de unshift:", frutas);

frutas.shift();                  // Elimina el primero
console.log("Después de shift:", frutas);

// Objetos
let persona = {
    nombre: "Laura",
    edad: 30,
    profesion: "Desarrolladora",
    activo: true
};

// Acceso a propiedades
console.log("Nombre:", persona.nombre);     // "Laura"
console.log("Edad:", persona["edad"]);    // 30`,

    ejemplo7: `// Buenas prácticas con variables
// 1. Nombres descriptivos
let usuarioNombre = "Carlos";
let usuarioEdad = 25;

// 2. Usar const por defecto
const PI = 3.14159;
const DIAS_SEMANA = 7;

// 3. Usar let cuando necesites reasignar
let contador = 0;
contador = contador + 1;

// 4. Evitar var (scope de función)
function ejemploScope() {
    if (true) {
        var variableVar = "soy var";    // Accesible fuera del bloque
        let variableLet = "soy let";    // Solo en este bloque
    }
    console.log(variableVar);  // Funciona
    // console.log(variableLet); // Error: no definida
}

// 5. CamelCase para nombres de variables
let nombreCompletoUsuario = "Ana García";
let esUsuarioActivo = true;

console.log("Usuario:", nombreCompletoUsuario);
console.log("Activo:", esUsuarioActivo);
console.log("PI:", PI);
console.log("Contador:", contador);`,

    ejemploCompleto: `// === EJEMPLO COMPLETO: SISTEMA DE GESTIÓN DE ESTUDIANTES ===

// Definición de constantes
const CURSO = "JavaScript Básico";
const NOTA_APROBACION = 6.0;
const MAX_ESTUDIANTES = 10;

// Array para almacenar estudiantes
let estudiantes = [];

// Función para agregar estudiantes
function agregarEstudiante(nombre, edad, email) {
    if (estudiantes.length >= MAX_ESTUDIANTES) {
        console.log("No se pueden agregar más estudiantes. Límite alcanzado.");
        return false;
    }
    
    const nuevoEstudiante = {
        id: Symbol('estudiante'),
        nombre: nombre,
        edad: edad,
        email: email,
        activo: true,
        notas: [],
        promedio: 0
    };
    
    estudiantes.push(nuevoEstudiante);
    console.log(\`Estudiante \${nombre} agregado correctamente.\`);
    return true;
}

// Función para agregar notas
function agregarNota(idEstudiante, nota) {
    const estudiante = estudiantes.find(est => est.id === idEstudiante);
    
    if (!estudiante) {
        console.log("Estudiante no encontrado.");
        return false;
    }
    
    if (typeof nota !== 'number' || nota < 0 || nota > 10) {
        console.log("La nota debe ser un número entre 0 y 10.");
        return false;
    }
    
    estudiante.notas.push(nota);
    calcularPromedio(estudiante);
    console.log(\`Nota \${nota} agregada a \${estudiante.nombre}.\`);
    return true;
}

// Función para calcular promedio
function calcularPromedio(estudiante) {
    if (estudiante.notas.length === 0) {
        estudiante.promedio = 0;
        return;
    }
    
    const suma = estudiante.notas.reduce((total, nota) => total + nota, 0);
    estudiante.promedio = suma / estudiante.notas.length;
}

// Función para verificar aprobación
function estaAprobado(estudiante) {
    return estudiante.promedio >= NOTA_APROBACION;
}

// Función para generar reporte
function generarReporte() {
    console.log("\\n=== REPORTE DEL CURSO: " + CURSO + " ===");
    console.log(\`Total de estudiantes: \${estudiantes.length}\`);
    
    estudiantes.forEach((estudiante, index) => {
        const estado = estudiante.activo ? "Activo" : "Inactivo";
        const aprobado = estaAprobado(estudiante) ? "APROBADO" : "REPROBADO";
        
        console.log(\`\\n\${index + 1}. \${estudiante.nombre}\`);
        console.log(\`   Edad: \${estudiante.edad}\`);
        console.log(\`   Email: \${estudiante.email}\`);
        console.log(\`   Estado: \${estado}\`);
        console.log(\`   Notas: [\${estudiante.notas.join(", ")}]\`);
        console.log(\`   Promedio: \${estudiante.promedio.toFixed(2)}\`);
        console.log(\`   Situación: \${aprobado}\`);
    });
}

// Función para buscar estudiante
function buscarEstudiante(nombre) {
    return estudiantes.filter(est => 
        est.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
}

// === EJECUCIÓN DEL EJEMPLO ===

console.log("Iniciando sistema de gestión de estudiantes...\\n");

// Agregar algunos estudiantes
agregarEstudiante("Ana García", 22, "ana@email.com");
agregarEstudiante("Carlos López", 24, "carlos@email.com");
agregarEstudiante("María Rodríguez", 23, "maria@email.com");

// Obtener IDs para agregar notas (en un sistema real usaríamos mejor nombres únicos)
const ana = estudiantes.find(est => est.nombre === "Ana García");
const carlos = estudiantes.find(est => est.nombre === "Carlos López");
const maria = estudiantes.find(est => est.nombre === "María Rodríguez");

// Agregar notas
if (ana) {
    agregarNota(ana.id, 8.5);
    agregarNota(ana.id, 7.0);
    agregarNota(ana.id, 9.0);
}

if (carlos) {
    agregarNota(carlos.id, 5.5);
    agregarNota(carlos.id, 6.0);
    agregarNota(carlos.id, 4.5);
}

if (maria) {
    agregarNota(maria.id, 7.5);
    agregarNota(maria.id, 8.0);
    agregarNota(maria.id, 9.5);
}

// Generar reporte final
generarReporte();

// Ejemplo de búsqueda
console.log("\\n=== BÚSQUEDA DE ESTUDIANTES ===");
const resultados = buscarEstudiante("ana");
console.log("Resultados de búsqueda para 'ana':", resultados);

// Demostración de tipos de datos
console.log("\\n=== VERIFICACIÓN DE TIPOS ===");
console.log("Tipo de CURSO:", typeof CURSO);
console.log("Tipo de NOTA_APROBACION:", typeof NOTA_APROBACION);
console.log("Tipo de estudiantes:", typeof estudiantes);
console.log("¿Estudiantes es array?", Array.isArray(estudiantes));`
  };

  return (
    <div className="guia-contenido">
      <header className="guia-header">
        <h1>Variables y Tipos de Datos en JavaScript</h1>
        <div className="guia-meta">
          <span className="nivel">Principiante</span>
          <span className="tiempo">45 minutos</span>
        </div>
      </header>

      <section className="guia-seccion">
        <h2>Introducción a las Variables</h2>
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>¿Qué son las variables?</h3>
            <p>Las variables son contenedores para almacenar datos. En JavaScript, puedes declarar variables usando <code>let</code>, <code>const</code> o <code>var</code> (este último en desuso).</p>
          </div>
        </div>
        
        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Declaración de Variables</span>
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

        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Diferencias entre let, const y var</h3>
            <ul>
              <li><strong>const:</strong> Para valores constantes que no cambian. Debe inicializarse al declarar.</li>
              <li><strong>let:</strong> Para variables que pueden cambiar su valor. Scope de bloque.</li>
              <li><strong>var:</strong> Antigua forma, scope de función. Evitar su uso en código moderno.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Tipos de Datos Primitivos</h2>
        
        <div className="tipos-datos-grid">
          <div className="tipo-dato-card">
            <h4>📝 String</h4>
            <p>Cadenas de texto. Se crean con comillas simples, dobles o backticks.</p>
            <code>"Hola Mundo"</code>
          </div>
          <div className="tipo-dato-card">
            <h4>🔢 Number</h4>
            <p>Números enteros o decimales. Incluye valores especiales como Infinity y NaN.</p>
            <code>42, 3.14, Infinity</code>
          </div>
          <div className="tipo-dato-card">
            <h4>✅ Boolean</h4>
            <p>Valores lógicos: true o false.</p>
            <code>true, false</code>
          </div>
          <div className="tipo-dato-card">
            <h4>🚫 Null</h4>
            <p>Representa la ausencia intencional de valor.</p>
            <code>null</code>
          </div>
          <div className="tipo-dato-card">
            <h4>❓ Undefined</h4>
            <p>Variable declarada pero sin valor asignado.</p>
            <code>undefined</code>
          </div>
          <div className="tipo-dato-card">
            <h4>🔣 Symbol</h4>
            <p>Valor único e inmutable (ES6+).</p>
            <code>Symbol('id')</code>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Ejemplos de Tipos Primitivos</span>
            <button 
              className={`btn-copiar ${copiado === 'ejemplo2' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.ejemplo2, 'ejemplo2')}
            >
              {copiado === 'ejemplo2' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.ejemplo2}</code>
          </pre>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Trabajando con Strings</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Operaciones con Strings</h3>
            <p>Los strings son inmutables, pero puedes crear nuevos strings a partir de operaciones.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Métodos y Operaciones de Strings</span>
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
      </section>

      <section className="guia-seccion">
        <h2>Trabajando con Números</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Operaciones Numéricas</h3>
            <p>JavaScript soporta todas las operaciones matemáticas básicas y proporciona el objeto Math para operaciones más complejas.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Operaciones y Métodos Numéricos</span>
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
      </section>

      <section className="guia-seccion">
        <h2>Conversión y Coerción de Tipos</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Comparación de Valores</h3>
            <p>JavaScript realiza conversión automática de tipos (coerción) en algunas operaciones. Es importante entender la diferencia entre comparación débil (==) y estricta (===).</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Comparación y Conversión de Tipos</span>
            <button 
              className={`btn-copiar ${copiado === 'ejemplo5' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.ejemplo5, 'ejemplo5')}
            >
              {copiado === 'ejemplo5' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.ejemplo5}</code>
          </pre>
        </div>

        <div className="nota-importante">
          <h4>💡 Mejor Práctica</h4>
          <p>Siempre usa comparación estricta (===) en lugar de comparación débil (==) para evitar resultados inesperados debido a la coerción de tipos.</p>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Estructuras de Datos: Arrays y Objetos</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Tipos de Referencia</h3>
            <p>Además de los tipos primitivos, JavaScript tiene tipos de referencia como Arrays y Objetos que pueden contener múltiples valores.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Arrays y Objetos</span>
            <button 
              className={`btn-copiar ${copiado === 'ejemplo6' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.ejemplo6, 'ejemplo6')}
            >
              {copiado === 'ejemplo6' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.ejemplo6}</code>
          </pre>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Buenas Prácticas con Variables</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Convenciones y Estándares</h3>
            <p>Seguir buenas prácticas en la declaración de variables mejora la legibilidad y mantenibilidad del código.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Buenas Prácticas</span>
            <button 
              className={`btn-copiar ${copiado === 'ejemplo7' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.ejemplo7, 'ejemplo7')}
            >
              {copiado === 'ejemplo7' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.ejemplo7}</code>
          </pre>
        </div>

        <div className="resumen-practicas">
          <h4>📋 Resumen de Buenas Prácticas</h4>
          <ul>
            <li>Usa <code>const</code> por defecto y <code>let</code> solo cuando necesites reasignar</li>
            <li>Evita <code>var</code> en código nuevo</li>
            <li>Usa nombres descriptivos en camelCase</li>
            <li>Inicializa las variables al declararlas</li>
            <li>Usa comparación estricta (===) en lugar de débil (==)</li>
            <li>Declara variables en el scope más pequeño posible</li>
          </ul>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Ejemplo Completo: Sistema de Gestión de Estudiantes</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Aplicación de Todos los Conceptos</h3>
            <p>Este ejemplo integra todo lo aprendido: variables, tipos de datos, arrays, objetos, funciones y buenas prácticas en un sistema completo.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Sistema Completo de Gestión</span>
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
          <h4>🎯 Lo que Aprendiste en este Ejemplo</h4>
          <ul>
            <li><strong>Constantes:</strong> Uso de <code>const</code> para valores fijos</li>
            <li><strong>Variables:</strong> Uso de <code>let</code> para valores que cambian</li>
            <li><strong>Arrays:</strong> Almacenamiento y manipulación de listas de datos</li>
            <li><strong>Objetos:</strong> Estructuración de datos complejos</li>
            <li><strong>Funciones:</strong> Organización del código en bloques reutilizables</li>
            <li><strong>Tipos de datos:</strong> Strings, numbers, booleans, symbols, arrays y objetos</li>
            <li><strong>Métodos:</strong> Uso de métodos integrados como <code>push()</code>, <code>find()</code>, <code>filter()</code></li>
          </ul>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Próximos Pasos</h2>
        <div className="proximos-pasos">
          <div className="paso-aprendizaje">
            <div className="paso-numero">3</div>
            <div className="paso-info">
              <h4>Operadores y Expresiones</h4>
              <p>Aprenderás sobre operadores aritméticos, de comparación, lógicos y más.</p>
            </div>
          </div>
          <div className="paso-aprendizaje">
            <div className="paso-numero">4</div>
            <div className="paso-info">
              <h4>Estructuras de Control</h4>
              <p>Dominarás if/else, bucles for/while y switch para controlar el flujo del programa.</p>
            </div>
          </div>
          <div className="paso-aprendizaje">
            <div className="paso-numero">5</div>
            <div className="paso-info">
              <h4>Funciones</h4>
              <p>Aprenderás a crear y usar funciones para organizar y reutilizar código.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Guia_2;