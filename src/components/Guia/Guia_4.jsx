import React, { useState } from 'react';
import './Guias.css';

const Guia_4 = () => {
  const [copiado, setCopiado] = useState(null);

  const copiarCodigo = (codigo, id) => {
    navigator.clipboard.writeText(codigo);
    setCopiado(id);
    setTimeout(() => setCopiado(null), 2000);
  };

  const ejemplosCodigo = {
    condicionalIf: `// Estructuras condicionales if, else if, else
let temperatura = 25;
let hora = 14;

// if básico
if (temperatura > 30) {
    console.log("Hace mucho calor 🌞");
}

// if-else
if (temperatura > 25) {
    console.log("Es un día caluroso");
} else {
    console.log("La temperatura es agradable");
}

// if-else if-else
if (temperatura > 30) {
    console.log("Día muy caluroso");
} else if (temperatura > 20) {
    console.log("Día agradable");
} else if (temperatura > 10) {
    console.log("Día fresco");
} else {
    console.log("Día frío");
}

// Condiciones anidadas
if (hora >= 6 && hora < 12) {
    console.log("Buenos días");
} else if (hora >= 12 && hora < 18) {
    console.log("Buenas tardes");
} else {
    console.log("Buenas noches");
}

// Condiciones con operadores lógicos
let edad = 20;
let tieneLicencia = true;

if (edad >= 18 && tieneLicencia) {
    console.log("Puede conducir 🚗");
} else {
    console.log("No puede conducir");
}

// Condiciones con valores truthy/falsy
let nombre = "";
if (nombre) {
    console.log("Hola " + nombre);
} else {
    console.log("Nombre no proporcionado");
}

// if en una línea (solo para una sentencia)
if (temperatura > 30) console.log("¡Usa protector solar!");`,

    switchCase: `// Estructura switch para múltiples casos
let diaSemana = 3;
let nombreDia;

switch (diaSemana) {
    case 1:
        nombreDia = "Lunes";
        break;
    case 2:
        nombreDia = "Martes";
        break;
    case 3:
        nombreDia = "Miércoles";
        break;
    case 4:
        nombreDia = "Jueves";
        break;
    case 5:
        nombreDia = "Viernes";
        break;
    case 6:
        nombreDia = "Sábado";
        break;
    case 7:
        nombreDia = "Domingo";
        break;
    default:
        nombreDia = "Día inválido";
}

console.log(\`Hoy es \${nombreDia}\`);

// Switch con múltiples casos por condición
let mes = 2;
let estacion;

switch (mes) {
    case 12:
    case 1:
    case 2:
        estacion = "Invierno";
        break;
    case 3:
    case 4:
    case 5:
        estacion = "Primavera";
        break;
    case 6:
    case 7:
    case 8:
        estacion = "Verano";
        break;
    case 9:
    case 10:
    case 11:
        estacion = "Otoño";
        break;
    default:
        estacion = "Mes inválido";
}

console.log(\`Estación: \${estacion}\`);

// Switch con strings
let color = "rojo";
let significado;

switch (color.toLowerCase()) {
    case "rojo":
        significado = "Pasión, peligro";
        break;
    case "azul":
        significado = "Calma, confianza";
        break;
    case "verde":
        significado = "Naturaleza, crecimiento";
        break;
    case "amarillo":
        significado = "Energía, felicidad";
        break;
    default:
        significado = "Color no reconocido";
}

console.log(\`El color \${color} significa: \${significado}\`);

// Comparación: switch vs if-else
let puntuacion = 85;
let calificacion;

// Con if-else
if (puntuacion >= 90) {
    calificacion = "A";
} else if (puntuacion >= 80) {
    calificacion = "B";
} else if (puntuacion >= 70) {
    calificacion = "C";
} else if (puntuacion >= 60) {
    calificacion = "D";
} else {
    calificacion = "F";
}

// Con switch (menos eficiente en este caso)
switch (true) {
    case puntuacion >= 90:
        calificacion = "A";
        break;
    case puntuacion >= 80:
        calificacion = "B";
        break;
    case puntuacion >= 70:
        calificacion = "C";
        break;
    case puntuacion >= 60:
        calificacion = "D";
        break;
    default:
        calificacion = "F";
}

console.log(\`Puntuación: \${puntuacion}, Calificación: \${calificacion}\`);`,

    buclesFor: `// Bucles for - para iteraciones con contador
console.log("=== BUCLE FOR BÁSICO ===");
for (let i = 1; i <= 5; i++) {
    console.log("Iteración:", i);
}

console.log("\\n=== CONTEO REGRESIVO ===");
for (let i = 5; i >= 1; i--) {
    console.log("Cuenta regresiva:", i);
}

console.log("\\n=== SALTO DE 2 EN 2 ===");
for (let i = 0; i <= 10; i += 2) {
    console.log("Número par:", i);
}

console.log("\\n=== BUCLE CON ARRAY ===");
let frutas = ["manzana", "banana", "naranja", "uva"];
for (let i = 0; i < frutas.length; i++) {
    console.log(\`Fruta \${i + 1}: \${frutas[i]}\`);
}

console.log("\\n=== BUCLE ANIDADO ===");
for (let i = 1; i <= 3; i++) {
    console.log(\`Tabla del \${i}:\`);
    for (let j = 1; j <= 3; j++) {
        console.log(\`  \${i} x \${j} = \${i * j}\`);
    }
}

console.log("\\n=== BUCLE CON BREAK ===");
for (let i = 1; i <= 10; i++) {
    if (i === 6) {
        console.log("¡Break en 6!");
        break; // Sale del bucle completamente
    }
    console.log("Número:", i);
}

console.log("\\n=== BUCLE CON CONTINUE ===");
for (let i = 1; i <= 5; i++) {
    if (i === 3) {
        console.log("Saltando el 3...");
        continue; // Salta esta iteración
    }
    console.log("Número:", i);
}

console.log("\\n=== BUCLE INFINITO (EVITAR) ===");
// ¡CUIDADO! Este es un ejemplo de bucle infinito
// for (let i = 1; i > 0; i++) {
//     console.log("Esto nunca termina...");
// }`,

    buclesWhile: `// Bucles while - mientras se cumpla una condición
console.log("=== BUCLE WHILE BÁSICO ===");
let contador = 1;
while (contador <= 5) {
    console.log("Contador:", contador);
    contador++;
}

console.log("\\n=== WHILE CON ENTRADA DE USUARIO (simulado) ===");
let intentos = 0;
let passwordCorrecto = false;
const PASSWORD_CORRECTO = "1234";

// Simulamos intentos de contraseña
while (!passwordCorrecto && intentos < 3) {
    intentos++;
    let passwordIngresado = intentos === 2 ? "1234" : "0000"; // Simulación
    
    if (passwordIngresado === PASSWORD_CORRECTO) {
        passwordCorrecto = true;
        console.log("¡Contraseña correcta! Acceso concedido.");
    } else {
        console.log(\`Contraseña incorrecta. Intento \${intentos} de 3.\`);
    }
}

console.log("\\n=== GENERADOR DE NÚMEROS ALEATORIOS ===");
let numeroAleatorio;
let intentosAleatorio = 0;

while (true) {
    numeroAleatorio = Math.floor(Math.random() * 10) + 1;
    intentosAleatorio++;
    
    console.log(\`Intento \${intentosAleatorio}: \${numeroAleatorio}\`);
    
    if (numeroAleatorio === 7) {
        console.log("¡Encontré el 7!");
        break;
    }
    
    if (intentosAleatorio >= 10) {
        console.log("Demasiados intentos, terminando...");
        break;
    }
}

console.log("\\n=== DO-WHILE (ejecuta al menos una vez) ===");
let numero;

do {
    numero = Math.floor(Math.random() * 5) + 1;
    console.log("Número generado:", numero);
} while (numero !== 3);

console.log("¡Finalmente salió el 3!");`,

    buclesForOf: `// Bucles for...of - para iterar sobre elementos de arrays y strings
console.log("=== FOR...OF CON ARRAYS ===");
let colores = ["rojo", "verde", "azul", "amarillo"];

for (let color of colores) {
    console.log("Color:", color);
}

console.log("\\n=== FOR...OF CON STRINGS ===");
let mensaje = "Hola";

for (let letra of mensaje) {
    console.log("Letra:", letra);
}

console.log("\\n=== FOR...OF CON INDICE ===");
let frutas = ["manzana", "banana", "naranja"];

for (let [indice, fruta] of frutas.entries()) {
    console.log(\`Índice \${indice}: \${fruta}\`);
}

console.log("\\n=== FOR...OF CON SET ===");
let conjunto = new Set([1, 2, 3, 2, 1]); // Duplicados eliminados

for (let valor of conjunto) {
    console.log("Valor único:", valor);
}

console.log("\\n=== FOR...OF CON MAP ===");
let mapa = new Map([
    ["nombre", "Ana"],
    ["edad", 25],
    ["ciudad", "Madrid"]
]);

for (let [clave, valor] of mapa) {
    console.log(\`\${clave}: \${valor}\`);
}

console.log("\\n=== COMPARACIÓN: for vs for...of ===");
let numeros = [10, 20, 30, 40];

// Con for tradicional
console.log("Con for:");
for (let i = 0; i < numeros.length; i++) {
    console.log(\`numeros[\${i}] = \${numeros[i]}\`);
}

// Con for...of (más simple)
console.log("Con for...of:");
for (let numero of numeros) {
    console.log("Número:", numero);
}`,

    buclesForIn: `// Bucles for...in - para iterar sobre propiedades de objetos
console.log("=== FOR...IN CON OBJETOS ===");
let persona = {
    nombre: "Carlos",
    edad: 30,
    profesion: "Desarrollador",
    ciudad: "Barcelona"
};

for (let propiedad in persona) {
    console.log(\`\${propiedad}: \${persona[propiedad]}\`);
}

console.log("\\n=== FOR...IN CON MÉTODOS DE OBJETO ===");
class Usuario {
    constructor(nombre, email) {
        this.nombre = nombre;
        this.email = email;
    }
    
    saludar() {
        return \`Hola, soy \${this.nombre}\`;
    }
}

let usuario = new Usuario("María", "maria@email.com");

for (let prop in usuario) {
    console.log(\`\${prop}: \${usuario[prop]}\`);
}

console.log("\\n=== FOR...IN CON ARRAYS (NO RECOMENDADO) ===");
let arrayEjemplo = ["a", "b", "c"];
arrayEjemplo.propiedadPersonalizada = "valor extra";

console.log("Con for...in (incluye propiedades personalizadas):");
for (let indice in arrayEjemplo) {
    console.log(\`\${indice}: \${arrayEjemplo[indice]}\`);
}

console.log("Con for...of (solo elementos del array):");
for (let elemento of arrayEjemplo) {
    console.log("Elemento:", elemento);
}

console.log("\\n=== VERIFICACIÓN CON HASOWNPROPERTY ===");
let objetoComplejo = {
    propiedadNormal: "valor",
    metodo: function() { return "hola"; }
};

// Herencia de propiedades
let objetoHijo = Object.create(objetoComplejo);
objetoHijo.propiedadPropia = "valor propio";

console.log("Todas las propiedades (incluyendo heredadas):");
for (let prop in objetoHijo) {
    console.log(\`\${prop}: \${objetoHijo[prop]}\`);
}

console.log("\\nSolo propiedades propias:");
for (let prop in objetoHijo) {
    if (objetoHijo.hasOwnProperty(prop)) {
        console.log(\`\${prop}: \${objetoHijo[prop]}\`);
    }
}`,

    controlFlujo: `// Control de flujo con break, continue y labels
console.log("=== BREAK EN BUCLES ANIDADOS ===");
outerLoop: for (let i = 1; i <= 3; i++) {
    console.log(\`Bucle externo: \${i}\`);
    
    for (let j = 1; j <= 3; j++) {
        console.log(\`  Bucle interno: \${j}\`);
        
        if (i === 2 && j === 2) {
            console.log("  ¡Break del bucle externo!");
            break outerLoop; // Rompe el bucle externo
        }
    }
}

console.log("\\n=== CONTINUE CON LABEL ===");
principal: for (let i = 1; i <= 3; i++) {
    console.log(\`Iteración principal: \${i}\`);
    
    for (let j = 1; j <= 3; j++) {
        if (i === 2 && j === 2) {
            console.log("  Saltando al siguiente i");
            continue principal; // Salta a la siguiente iteración del bucle principal
        }
        console.log(\`  i=\${i}, j=\${j}\`);
    }
}

console.log("\\n=== USO PRÁCTICO: BUSCAR EN MATRIZ ===");
let matriz = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

let valorBuscado = 5;
let encontrado = false;

busqueda: for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[i].length; j++) {
        if (matriz[i][j] === valorBuscado) {
            console.log(\`Encontrado \${valorBuscado} en posición [\${i}][\${j}]\`);
            encontrado = true;
            break busqueda;
        }
    }
}

if (!encontrado) {
    console.log(\`Valor \${valorBuscado} no encontrado\`);
}

console.log("\\n=== FILTRAR Y PROCESAR ===");
let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (let numero of numeros) {
    // Saltar números pares
    if (numero % 2 === 0) {
        continue;
    }
    
    // Parar cuando lleguemos a 7
    if (numero === 7) {
        console.log("¡Encontrado el 7! Terminando...");
        break;
    }
    
    console.log("Procesando número impar:", numero);
}`,

ejemploCompleto: `// === SISTEMA DE GESTIÓN DE TAREAS CON ESTRUCTURAS DE CONTROL ===

class GestorTareas {
    constructor() {
        this.tareas = [];
        this.categorias = new Set();
        this.estados = ["pendiente", "en progreso", "completada"];
    }
    
    // Método para agregar tarea
    agregarTarea(titulo, categoria, prioridad = "media") {
        const nuevaTarea = {
            id: this.tareas.length + 1,
            titulo: titulo,
            categoria: categoria,
            prioridad: prioridad,
            estado: "pendiente",
            fechaCreacion: new Date()
        };
        
        this.tareas.push(nuevaTarea);
        this.categorias.add(categoria);
        console.log(\`✅ Tarea "\${titulo}" agregada.\`);
    }
    
    // Método para listar tareas con filtros
    listarTareas(filtroEstado = null, filtroCategoria = null) {
        console.log("\\n=== LISTA DE TAREAS ===");
        
        let tareasFiltradas = this.tareas;
        
        // Aplicar filtros si se especifican
        if (filtroEstado) {
            tareasFiltradas = tareasFiltradas.filter(tarea => 
                tarea.estado === filtroEstado
            );
        }
        
        if (filtroCategoria) {
            tareasFiltradas = tareasFiltradas.filter(tarea => 
                tarea.categoria === filtroCategoria
            );
        }
        
        // Usar for...of para iterar sobre tareas filtradas
        if (tareasFiltradas.length === 0) {
            console.log("No hay tareas que mostrar.");
            return;
        }
        
        for (let tarea of tareasFiltradas) {
            let emojiEstado = "";
            switch (tarea.estado) {
                case "pendiente":
                    emojiEstado = "⏳";
                    break;
                case "en progreso":
                    emojiEstado = "🔄";
                    break;
                case "completada":
                    emojiEstado = "✅";
                    break;
            }
            
            let emojiPrioridad = "";
            if (tarea.prioridad === "alta") emojiPrioridad = "🔴";
            else if (tarea.prioridad === "media") emojiPrioridad = "🟡";
            else emojiPrioridad = "🟢";
            
            console.log(
                \`\${emojiEstado} \${tarea.id}. \${tarea.titulo}\n   Categoría: \${tarea.categoria} | Prioridad: \${emojiPrioridad} \${tarea.prioridad}\n   Estado: \${tarea.estado} | Creada: \${tarea.fechaCreacion.toLocaleDateString()}\`
            );
        }
    }
    
    // Método para cambiar estado de tarea
    cambiarEstado(tareaId, nuevoEstado) {
        // Validar estado
        if (!this.estados.includes(nuevoEstado)) {
            console.log(\`❌ Estado "\${nuevoEstado}" no válido.\`);
            return false;
        }
        
        // Buscar tarea con for loop tradicional
        for (let i = 0; i < this.tareas.length; i++) {
            if (this.tareas[i].id === tareaId) {
                const estadoAnterior = this.tareas[i].estado;
                this.tareas[i].estado = nuevoEstado;
                console.log(
                    \`📝 Tarea \${tareaId} cambiada de "\${estadoAnterior}" a "\${nuevoEstado}"\`
                );
                return true;
            }
        }
        
        console.log(\`❌ Tarea con ID \${tareaId} no encontrada.\`);
        return false;
    }
    
    // Método para generar reportes
    generarReporte() {
        console.log("\\n=== REPORTE DE TAREAS ===");
        
        // Contadores por estado
        let contadores = {
            pendiente: 0,
            "en progreso": 0,
            completada: 0
        };
        
        // Contar tareas por estado usando for...of
        for (let tarea of this.tareas) {
            contadores[tarea.estado]++;
        }
        
        // Mostrar estadísticas
        console.log(\`Total de tareas: \${this.tareas.length}\`);
        for (let estado in contadores) {
            console.log(\`\${estado}: \${contadores[estado]} tareas\`);
        }
        
        // Análisis de prioridades con switch
        console.log("\\n--- Análisis por Prioridad ---");
        for (let prioridad of ["alta", "media", "baja"]) {
            let tareasPrioridad = this.tareas.filter(t => t.prioridad === prioridad);
            let completadas = tareasPrioridad.filter(t => t.estado === "completada").length;
            
            switch (prioridad) {
                case "alta":
                    console.log(\`🔴 Prioridad ALTA: \${tareasPrioridad.length} tareas (\${completadas} completadas)\`);
                    break;
                case "media":
                    console.log(\`🟡 Prioridad MEDIA: \${tareasPrioridad.length} tareas (\${completadas} completadas)\`);
                    break;
                case "baja":
                    console.log(\`🟢 Prioridad BAJA: \${tareasPrioridad.length} tareas (\${completadas} completadas)\`);
                    break;
            }
        }
        
        // Recomendaciones basadas en el reporte
        console.log("\\n--- Recomendaciones ---");
        if (contadores.pendiente > 5) {
            console.log("⚠️  Tienes muchas tareas pendientes. Considera priorizar.");
        }
        
        if (contadores.completada === this.tareas.length) {
            console.log("🎉 ¡Todas las tareas completadas! Excelente trabajo.");
        }
    }
    
    // Método para buscar tareas
    buscarTareas(termino) {
        console.log(\`\\n🔍 Buscando: "\${termino}"\`);
        let resultados = [];
        
        // Búsqueda case-insensitive
        for (let tarea of this.tareas) {
            if (tarea.titulo.toLowerCase().includes(termino.toLowerCase()) ||
                tarea.categoria.toLowerCase().includes(termino.toLowerCase())) {
                resultados.push(tarea);
            }
        }
        
        if (resultados.length === 0) {
            console.log("No se encontraron tareas.");
        } else {
            console.log(\`Se encontraron \${resultados.length} tarea(s):\`);
            for (let tarea of resultados) {
                console.log(\`   - \${tarea.titulo} (\${tarea.categoria})\`);
            }
        }
        
        return resultados;
    }
}

// === DEMOSTRACIÓN DEL SISTEMA ===
console.log("=== SISTEMA DE GESTIÓN DE TAREAS ===\\n");

const gestor = new GestorTareas();

// Agregar tareas de ejemplo
gestor.agregarTarea("Aprender JavaScript", "estudio", "alta");
gestor.agregarTarea("Comprar víveres", "personal", "media");
gestor.agregarTarea("Reunión con equipo", "trabajo", "alta");
gestor.agregarTarea("Hacer ejercicio", "salud", "media");
gestor.agregarTarea("Leer libro", "estudio", "baja");

// Cambiar algunos estados
gestor.cambiarEstado(1, "en progreso");
gestor.cambiarEstado(2, "completada");
gestor.cambiarEstado(3, "completada");

// Mostrar diferentes vistas
gestor.listarTareas();
gestor.listarTareas("completada");
gestor.listarTareas(null, "estudio");

// Generar reporte completo
gestor.generarReporte();

// Probar búsqueda
gestor.buscarTareas("java");
gestor.buscarTareas("ejercicio");

// Demostración de estructuras de control adicional
console.log("\\n=== DEMOSTRACIÓN ADICIONAL: PROCESAMIENTO POR LOTES ===");
const lotesTareas = [
    { lote: "Urgente", tareas: [1, 3] },
    { lote: "Normal", tareas: [2, 4] },
    { lote: "Baja prioridad", tareas: [5] }
];

for (let lote of lotesTareas) {
    console.log(\`\\nProcesando lote: \${lote.lote}\`);
    
    for (let tareaId of lote.tareas) {
        // Usando for loop tradicional para buscar por ID
        for (let i = 0; i < gestor.tareas.length; i++) {
            if (gestor.tareas[i].id === tareaId) {
                console.log(\`   - \${gestor.tareas[i].titulo} (\${gestor.tareas[i].prioridad})\`);
                break; // Romper el bucle interno una vez encontrada la tarea
            }
        }
    }
}`
  };

  return (
    <div className="guia-contenido">
      <header className="guia-header">
        <h1>Estructuras de Control en JavaScript</h1>
        <div className="guia-meta">
          <span className="nivel">Principiante</span>
          <span className="tiempo">60 minutos</span>
        </div>
      </header>

      <section className="guia-seccion">
        <h2>Introducción a las Estructuras de Control</h2>
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Control del Flujo de Ejecución</h3>
            <p>Las estructuras de control permiten dirigir el flujo de ejecución de un programa, tomando decisiones y repitiendo acciones según sea necesario.</p>
          </div>
        </div>

        <div className="tipos-datos-grid">
          <div className="tipo-dato-card">
            <h4>🎯 Condicionales</h4>
            <p>Tomar decisiones basadas en condiciones</p>
            <code>if, else, switch</code>
          </div>
          <div className="tipo-dato-card">
            <h4>🔄 Bucles</h4>
            <p>Repetir bloques de código</p>
            <code>for, while, do-while</code>
          </div>
          <div className="tipo-dato-card">
            <h4>🚦 Control de Flujo</h4>
            <p>Modificar la ejecución de bucles</p>
            <code>break, continue</code>
          </div>
          <div className="tipo-dato-card">
            <h4>📝 Iteradores</h4>
            <p>Recorrer estructuras de datos</p>
            <code>for...of, for...in</code>
          </div>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Estructuras Condicionales: if, else if, else</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Tomando Decisiones en el Código</h3>
            <p>Las sentencias condicionales permiten ejecutar diferentes bloques de código según si una condición es verdadera o falsa.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Condicionales If/Else</span>
            <button 
              className={`btn-copiar ${copiado === 'condicionalIf' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.condicionalIf, 'condicionalIf')}
            >
              {copiado === 'condicionalIf' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.condicionalIf}</code>
          </pre>
        </div>

        <div className="nota-importante">
          <h4>💡 Mejores Prácticas con If/Else</h4>
          <ul>
            <li>Usa <code>else if</code> para múltiples condiciones exclusivas</li>
            <li>Mantén las condiciones simples y legibles</li>
            <li>Evita anidar demasiados niveles de condicionales</li>
            <li>Considera usar <code>switch</code> para muchas condiciones de igualdad</li>
          </ul>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Estructura Switch</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Múltiples Casos de Igualdad</h3>
            <p>La sentencia switch es útil cuando necesitas comparar una variable contra múltiples valores específicos.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Switch y Cases</span>
            <button 
              className={`btn-copiar ${copiado === 'switchCase' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.switchCase, 'switchCase')}
            >
              {copiado === 'switchCase' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.switchCase}</code>
          </pre>
        </div>

        <div className="tabla-contenedor">
          <table className="tabla-guia">
            <thead>
              <tr>
                <th>Cuándo usar</th>
                <th>Cuándo evitar</th>
                <th>Mejores Prácticas</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Múltiples comparaciones de igualdad</td>
                <td>Comparaciones complejas con operadores</td>
                <td>Siempre incluye <code>break</code></td>
              </tr>
              <tr>
                <td>Código más legible para muchos casos</td>
                <td>Cuando necesitas evaluar rangos</td>
                <td>Usa <code>default</code> para casos no cubiertos</td>
              </tr>
              <tr>
                <td>Agrupar múltiples casos</td>
                <td>Cuando los casos no son discretos</td>
                <td>Mantén el orden lógico de casos</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Bucles For</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Iteraciones con Contador</h3>
            <p>El bucle for es ideal cuando sabes exactamente cuántas veces necesitas repetir un bloque de código.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Bucles For Completos</span>
            <button 
              className={`btn-copiar ${copiado === 'buclesFor' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.buclesFor, 'buclesFor')}
            >
              {copiado === 'buclesFor' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.buclesFor}</code>
          </pre>
        </div>

        <div className="nota-advertencia">
          <h4>⚠️ Cuidado con los Bucles Infinitos</h4>
          <p>Asegúrate de que la condición de terminación eventualmente se cumpla. Un bucle infinito puede bloquear tu aplicación.</p>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Bucles While y Do-While</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Iteraciones Basadas en Condiciones</h3>
            <p>Los bucles while se ejecutan mientras una condición sea verdadera. Do-while garantiza al menos una ejecución.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>While y Do-While</span>
            <button 
              className={`btn-copiar ${copiado === 'buclesWhile' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.buclesWhile, 'buclesWhile')}
            >
              {copiado === 'buclesWhile' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.buclesWhile}</code>
          </pre>
        </div>

        <div className="resumen-practicas">
          <h4>📋 Diferencias Clave</h4>
          <ul>
            <li><strong>While:</strong> Verifica la condición ANTES de ejecutar</li>
            <li><strong>Do-While:</strong> Ejecuta PRIMERO y luego verifica la condición</li>
            <li><strong>For:</strong> Ideal cuando conoces el número de iteraciones</li>
            <li><strong>While:</strong> Mejor cuando la condición es compleja o dinámica</li>
          </ul>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Bucle For...Of</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Iteración sobre Elementos Iterables</h3>
            <p>For...of es la forma moderna y limpia de iterar sobre arrays, strings, y otros objetos iterables.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>For...Of con Diferentes Estructuras</span>
            <button 
              className={`btn-copiar ${copiado === 'buclesForOf' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.buclesForOf, 'buclesForOf')}
            >
              {copiado === 'buclesForOf' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.buclesForOf}</code>
          </pre>
        </div>

        <div className="nota-exito">
          <h4>🎯 Ventajas de For...Of</h4>
          <ul>
            <li>Más legible y conciso que el for tradicional</li>
            <li>Funciona con cualquier objeto iterable</li>
            <li>No requiere manejo manual de índices</li>
            <li>Compatible con <code>break</code> y <code>continue</code></li>
          </ul>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Bucle For...In</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Iteración sobre Propiedades de Objetos</h3>
            <p>For...in itera sobre las propiedades enumerables de un objeto, incluyendo las heredadas.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>For...In y Consideraciones</span>
            <button 
              className={`btn-copiar ${copiado === 'buclesForIn' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.buclesForIn, 'buclesForIn')}
            >
              {copiado === 'buclesForIn' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.buclesForIn}</code>
          </pre>
        </div>

        <div className="nota-advertencia">
          <h4>⚠️ Precauciones con For...In</h4>
          <p>
            <strong>No usar con arrays:</strong> Puede incluir propiedades personalizadas<br/>
            <strong>Verificar herencia:</strong> Usa <code>hasOwnProperty()</code> para propiedades propias<br/>
            <strong>Orden no garantizado:</strong> Las propiedades pueden no iterarse en el orden esperado
          </p>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Control de Flujo: Break y Continue</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Modificando la Ejecución de Bucles</h3>
            <p>Break y continue permiten controlar finamente cómo se ejecutan los bucles, ya sea terminándolos prematuramente o saltando iteraciones.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Break, Continue y Labels</span>
            <button 
              className={`btn-copiar ${copiado === 'controlFlujo' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.controlFlujo, 'controlFlujo')}
            >
              {copiado === 'controlFlujo' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.controlFlujo}</code>
          </pre>
        </div>

        <div className="tabla-contenedor">
          <table className="tabla-guia">
            <thead>
              <tr>
                <th>Comando</th>
                <th>Función</th>
                <th>Uso Común</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>break</code></td>
                <td>Termina el bucle completamente</td>
                <td>Cuando encuentras lo que buscas</td>
              </tr>
              <tr>
                <td><code>continue</code></td>
                <td>Salta a la siguiente iteración</td>
                <td>Para filtrar elementos</td>
              </tr>
              <tr>
                <td><code>break label</code></td>
                <td>Rompe un bucle específico</td>
                <td>En bucles anidados</td>
              </tr>
              <tr>
                <td><code>continue label</code></td>
                <td>Salta a un bucle específico</td>
                <td>En estructuras complejas</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Ejemplo Completo: Sistema de Gestión de Tareas</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Aplicación Integrada de Estructuras de Control</h3>
            <p>Este sistema demuestra el uso práctico de todas las estructuras de control en un gestor de tareas completo.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Sistema Completo de Tareas</span>
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
            <li><strong>If/Else:</strong> Validaciones y decisiones simples</li>
            <li><strong>Switch:</strong> Manejo de estados y prioridades</li>
            <li><strong>For tradicional:</strong> Búsqueda por índice en arrays</li>
            <li><strong>For...of:</strong> Iteración limpia sobre arrays de objetos</li>
            <li><strong>For...in:</strong> Recorrido de propiedades de objetos</li>
            <li><strong>While:</strong> Procesamiento condicional</li>
            <li><strong>Break/Continue:</strong> Control preciso de bucles</li>
            <li><strong>Bucles anidados:</strong> Procesamiento de estructuras complejas</li>
          </ul>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Próximos Pasos</h2>
        <div className="proximos-pasos">
          <div className="paso-aprendizaje">
            <div className="paso-numero">5</div>
            <div className="paso-info">
              <h4>Funciones</h4>
              <p>Aprenderás a crear funciones reutilizables, parámetros, valores de retorno y scope.</p>
            </div>
          </div>
          <div className="paso-aprendizaje">
            <div className="paso-numero">6</div>
            <div className="paso-info">
              <h4>Arrays y Métodos</h4>
              <p>Profundizarás en métodos de arrays como map, filter, reduce para manipulación de datos.</p>
            </div>
          </div>
          <div className="paso-aprendizaje">
            <div className="paso-numero">7</div>
            <div className="paso-info">
              <h4>Objetos y POO</h4>
              <p>Aprenderás programación orientada a objetos, clases, herencia y encapsulamiento.</p>
            </div>
          </div>
        </div>

        <div className="resumen-practicas">
          <h4>📋 Resumen de Estructuras de Control</h4>
          <ul>
            <li><strong>Condicionales:</strong> <code>if</code>, <code>else if</code>, <code>else</code>, <code>switch</code></li>
            <li><strong>Bucles con contador:</strong> <code>for</code></li>
            <li><strong>Bucles condicionales:</strong> <code>while</code>, <code>do-while</code></li>
            <li><strong>Iteradores modernos:</strong> <code>for...of</code>, <code>for...in</code></li>
            <li><strong>Control de flujo:</strong> <code>break</code>, <code>continue</code>, labels</li>
            <li><strong>Mejores prácticas:</strong> Elegir la estructura adecuada para cada caso</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Guia_4;