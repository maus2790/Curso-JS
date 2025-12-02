import React, { useState } from 'react';
import './Guias.css';

const Guia_3 = () => {
  const [copiado, setCopiado] = useState(null);

  const copiarCodigo = (codigo, id) => {
    navigator.clipboard.writeText(codigo);
    setCopiado(id);
    setTimeout(() => setCopiado(null), 2000);
  };

  const ejemplosCodigo = {
    operadoresAritmeticos: `// Operadores aritméticos básicos
let a = 15;
let b = 4;

// Suma
let suma = a + b;
console.log("15 + 4 =", suma);        // 19

// Resta
let resta = a - b;
console.log("15 - 4 =", resta);       // 11

// Multiplicación
let multiplicacion = a * b;
console.log("15 * 4 =", multiplicacion); // 60

// División
let division = a / b;
console.log("15 / 4 =", division);    // 3.75

// Módulo (resto de la división)
let modulo = a % b;
console.log("15 % 4 =", modulo);      // 3

// Exponenciación (ES6+)
let exponente = a ** 2;
console.log("15 ** 2 =", exponente);  // 225

// Incremento y decremento
let contador = 5;
contador++; // Incremento postfijo
console.log("contador++ =", contador); // 6

contador--; // Decremento postfijo
console.log("contador-- =", contador); // 5

// Incremento prefijo
let numero = 10;
console.log("++numero =", ++numero);  // 11

// Operadores de asignación compuesta
let total = 20;
total += 5;  // total = total + 5
console.log("total += 5 =", total);   // 25

total *= 2;  // total = total * 2
console.log("total *= 2 =", total);   // 50

total /= 5;  // total = total / 5
console.log("total /= 5 =", total);   // 10`,

    operadoresComparacion: `// Operadores de comparación
let x = 10;
let y = "10";
let z = 15;

// Igualdad débil (==) - compara valores
console.log("10 == '10':", x == y);   // true

// Igualdad estricta (===) - compara valores y tipos
console.log("10 === '10':", x === y); // false

// Desigualdad débil (!=)
console.log("10 != '10':", x != y);   // false

// Desigualdad estricta (!==)
console.log("10 !== '10':", x !== y); // true

// Mayor que
console.log("10 > 15:", x > z);       // false

// Menor que
console.log("10 < 15:", x < z);       // true

// Mayor o igual que
console.log("10 >= 10:", x >= x);     // true

// Menor o igual que
console.log("10 <= 15:", x <= z);     // true

// Comparaciones con strings
console.log("'a' < 'b':", 'a' < 'b'); // true (orden alfabético)
console.log("'apple' < 'banana':", 'apple' < 'banana'); // true

// Casos especiales
console.log("null == undefined:", null == undefined);   // true
console.log("null === undefined:", null === undefined); // false
console.log("NaN == NaN:", NaN == NaN);                 // false`,

    operadoresLogicos: `// Operadores lógicos
let edad = 25;
let tieneLicencia = true;
let tieneVehiculo = false;
let puntuacion = 85;

// AND lógico (&&) - TODAS las condiciones deben ser true
console.log("edad >= 18 && tieneLicencia:", 
  edad >= 18 && tieneLicencia); // true

console.log("edad >= 18 && tieneLicencia && tieneVehiculo:", 
  edad >= 18 && tieneLicencia && tieneVehiculo); // false

// OR lógico (||) - AL MENOS UNA condición debe ser true
console.log("tieneLicencia || tieneVehiculo:", 
  tieneLicencia || tieneVehiculo); // true

// NOT lógico (!) - invierte el valor booleano
console.log("!tieneVehiculo:", !tieneVehiculo); // true

// Combinaciones complejas
let puedeConducir = (edad >= 18 && tieneLicencia) || tieneVehiculo;
console.log("Puede conducir:", puedeConducir); // true

// Evaluación de cortocircuito
let nombre = "";
let nombreUsuario = nombre || "Usuario Anónimo";
console.log("Nombre de usuario:", nombreUsuario); // "Usuario Anónimo"

let config = {
  tiempo: 0
};
let tiempo = config.tiempo || 30; // Usa 30 si config.tiempo es 0 (falsy)
console.log("Tiempo configurado:", tiempo); // 30

// Operador nullish coalescing (??) - ES6+
let tiempoMejorado = config.tiempo ?? 30; // Usa 30 solo si config.tiempo es null/undefined
console.log("Tiempo mejorado:", tiempoMejorado); // 0`,

    operadoresTernarios: `// Operador ternario - if/else en una línea
let edad = 20;
let esMayor = edad >= 18 ? "Mayor de edad" : "Menor de edad";
console.log(esMayor); // "Mayor de edad"

// Múltiples condiciones con ternarios
let puntuacion = 85;
let calificacion = puntuacion >= 90 ? "A" :
                  puntuacion >= 80 ? "B" :
                  puntuacion >= 70 ? "C" :
                  puntuacion >= 60 ? "D" : "F";

console.log(\`Puntuación: \${puntuacion}, Calificación: \${calificacion}\`); // "B"

// Ternarios con funciones
function obtenerDescuento(esMiembro) {
  return esMiembro ? 0.2 : 0.1; // 20% descuento para miembros, 10% para no miembros
}

console.log("Descuento miembro:", obtenerDescuento(true));   // 0.2
console.log("Descuento no miembro:", obtenerDescuento(false)); // 0.1

// Ternarios para asignaciones condicionales
let usuario = {
  nombre: "Ana",
  nivel: "premium"
};

let mensajeBienvenida = usuario.nivel === "premium" 
  ? "¡Bienvenida usuaria premium!" 
  : "¡Bienvenida!";

console.log(mensajeBienvenida);`,

    operadoresString: `// Operadores con strings
let saludo = "Hola";
let nombre = "Carlos";

// Concatenación con +
let mensaje = saludo + ", " + nombre + "!";
console.log(mensaje); // "Hola, Carlos!"

// Concatenación con +=
let frase = "JavaScript";
frase += " es ";
frase += "genial!";
console.log(frase); // "JavaScript es genial!"

// Template literals (ES6+)
let mensajeModerno = \`\${saludo}, \${nombre}! Bienvenido al curso.\`;
console.log(mensajeModerno);

// Expresiones en template literals
let precio = 99.99;
let iva = 0.21;
let factura = \`Precio: $\${precio}
IVA: $\{(precio * iva).toFixed(2)}
Total: $\{(precio * (1 + iva)).toFixed(2)}\`;

console.log(factura);

// Operadores de comparación con strings
console.log("'a' < 'b':", 'a' < 'b');           // true
console.log("'apple' < 'banana':", 'apple' < 'banana'); // true
console.log("'A' < 'a':", 'A' < 'a');           // true (mayúsculas primero)

// Coerción de tipos en operaciones
console.log("10 + '5':", 10 + '5');     // "105" (concatenación)
console.log("10 - '5':", 10 - '5');     // 5 (conversión a número)
console.log("10 * '5':", 10 * '5');     // 50 (conversión a número)
console.log("10 / '5':", 10 / '5');     // 2 (conversión a número)`,

    operadoresBit: `// Operadores a nivel de bit
let a = 5;  // 0101 en binario
let b = 3;  // 0011 en binario

// AND a nivel de bit (&)
console.log("5 & 3:", a & b);   // 1 (0001)

// OR a nivel de bit (|)
console.log("5 | 3:", a | b);   // 7 (0111)

// XOR a nivel de bit (^)
console.log("5 ^ 3:", a ^ b);   // 6 (0110)

// NOT a nivel de bit (~)
console.log("~5:", ~a);         // -6 (complemento a 2)

// Desplazamiento a la izquierda (<<)
console.log("5 << 1:", a << 1); // 10 (1010)

// Desplazamiento a la derecha (>>)
console.log("5 >> 1:", a >> 1); // 2 (0010)

// Desplazamiento a la derecha sin signo (>>>)
console.log("-5 >>> 1:", (-5 >>> 1)); // 2147483645

// Casos prácticos
// Verificar si un número es par
function esPar(numero) {
  return (numero & 1) === 0;
}

console.log("¿5 es par?", esPar(5)); // false
console.log("¿8 es par?", esPar(8)); // true

// Intercambiar valores sin variable temporal
let x = 10, y = 20;
console.log("Antes: x =", x, "y =", y);

x = x ^ y;
y = x ^ y;
x = x ^ y;

console.log("Después: x =", x, "y =", y);`,

    precedenciaOperadores: `// Precedencia de operadores
let resultado1 = 10 + 5 * 2;     // 10 + (5 * 2) = 20
let resultado2 = (10 + 5) * 2;   // (10 + 5) * 2 = 30

console.log("10 + 5 * 2 =", resultado1);
console.log("(10 + 5) * 2 =", resultado2);

// Expresión compleja
let a = 8, b = 3, c = 2;
let expresionCompleja = a + b * c ** 2 / (a % b);
// Pasos: 1. c ** 2 = 4, 2. a % b = 2, 3. b * 4 = 12, 4. 12 / 2 = 6, 5. 8 + 6 = 14
console.log("Expresión compleja:", expresionCompleja);

// Uso de paréntesis para claridad
let calculoClaro = ((a + b) * (c ** 2)) / (a % b);
console.log("Cálculo claro:", calculoClaro);

// Precedencia con operadores lógicos
let esValido = true;
let tieneAcceso = false;
let esAdmin = true;

// && tiene mayor precedencia que ||
let puedeAcceder1 = esValido && tieneAcceso || esAdmin;  // (true && false) || true = true
let puedeAcceder2 = esValido && (tieneAcceso || esAdmin); // true && (false || true) = true

console.log("Puede acceder 1:", puedeAcceder1);
console.log("Puede acceder 2:", puedeAcceder2);`,

    ejemploCompleto: `// === SISTEMA DE VALIDACIÓN Y CÁLCULOS ===

// Constantes del sistema
const EDAD_MINIMA = 18;
const PUNTUACION_MINIMA = 70;
const DESCUENTO_PREMIUM = 0.15;
const DESCUENTO_REGULAR = 0.05;

// Datos de ejemplo
const usuarios = [
  { nombre: "Ana", edad: 25, esPremium: true, puntuacion: 85 },
  { nombre: "Carlos", edad: 17, esPremium: false, puntuacion: 65 },
  { nombre: "Elena", edad: 30, esPremium: true, puntuacion: 92 },
  { nombre: "David", edad: 22, esPremium: false, puntuacion: 78 }
];

// Función para validar usuario
function validarUsuario(usuario) {
  const esMayorEdad = usuario.edad >= EDAD_MINIMA;
  const tienePuntuacionSuficiente = usuario.puntuacion >= PUNTUACION_MINIMA;
  const esValido = esMayorEdad && tienePuntuacionSuficiente;
  
  return {
    ...usuario,
    esValido: esValido,
    puedeAcceder: esValido || usuario.esPremium // Los premium acceden siempre
  };
}

// Función para calcular descuento
function calcularDescuento(usuario) {
  // Operador ternario anidado
  const porcentajeDescuento = usuario.esPremium ? DESCUENTO_PREMIUM :
                             usuario.puntuacion >= 80 ? DESCUENTO_REGULAR : 0;
  
  return porcentajeDescuento;
}

// Función para generar mensaje personalizado
function generarMensaje(usuario) {
  const validacion = validarUsuario(usuario);
  const descuento = calcularDescuento(usuario);
  
  // Template literals con expresiones
  const mensaje = \`
Usuario: \${usuario.nombre}
Edad: \${usuario.edad} años \${usuario.edad >= EDAD_MINIMA ? "✅" : "❌"}
Puntuación: \${usuario.puntuacion} puntos
Premium: \${usuario.esPremium ? "Sí 🌟" : "No"}
Estado: \${validacion.esValido ? "VÁLIDO" : "NO VÁLID"}
Acceso: \${validacion.puedeAcceder ? "PERMITIDO 🎉" : "DENEGADO"}
Descuento: \${(descuento * 100).toFixed(0)}%
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-
  \`;
  
  return mensaje;
}

// Función para procesar todos los usuarios
function procesarUsuarios() {
  console.log("=== SISTEMA DE VALIDACIÓN DE USUARIOS ===\\n");
  
  let totalValidos = 0;
  let totalConDescuento = 0;
  
  usuarios.forEach((usuario, index) => {
    console.log(\`👤 USUARIO \${index + 1}\`);
    console.log(generarMensaje(usuario));
    
    const validacion = validarUsuario(usuario);
    const descuento = calcularDescuento(usuario);
    
    // Operadores de incremento
    if (validacion.esValido) totalValidos++;
    if (descuento > 0) totalConDescuento++;
  });
  
  // Estadísticas finales
  console.log("=== ESTADÍSTICAS FINALES ===");
  console.log(\`Total usuarios: \${usuarios.length}\`);
  console.log(\`Usuarios válidos: \${totalValidos}\`);
  console.log(\`Usuarios con descuento: \${totalConDescuento}\`);
  console.log(\`Porcentaje válidos: \${((totalValidos / usuarios.length) * 100).toFixed(1)}%\`);
  
  // Operadores lógicos para resumen
  const sistemaFuncional = totalValidos > 0 && usuarios.length > 0;
  const necesitaMejoras = totalValidos < usuarios.length / 2;
  
  console.log(\`\\nSistema funcional: \${sistemaFuncional ? "✅" : "❌"}\`);
  console.log(\`Necesita mejoras: \${necesitaMejoras ? "⚠️ Sí" : "✅ No"}\`);
}

// Función con operadores bit a bit para características
function gestionarCaracteristicas() {
  console.log("\\n=== GESTIÓN DE CARACTERÍSTICAS (Bitwise) ===");
  
  // Flags de características usando bits
  const CARACTERISTICAS = {
    DARK_MODE: 1 << 0,        // 1 (0001)
    NOTIFICACIONES: 1 << 1,   // 2 (0010)
    OFFLINE_MODE: 1 << 2,     // 4 (0100)
    ANIMACIONES: 1 << 3       // 8 (1000)
  };
  
  let configUsuario = CARACTERISTICAS.DARK_MODE | CARACTERISTICAS.NOTIFICACIONES; // 3 (0011)
  
  console.log("Configuración inicial:", configUsuario.toString(2));
  
  // Verificar si una característica está activa
  const tieneDarkMode = (configUsuario & CARACTERISTICAS.DARK_MODE) !== 0;
  console.log("Tiene dark mode:", tieneDarkMode);
  
  // Activar una característica
  configUsuario |= CARACTERISTICAS.ANIMACIONES;
  console.log("Con animaciones:", configUsuario.toString(2));
  
  // Desactivar una característica
  configUsuario &= ~CARACTERISTICAS.NOTIFICACIONES;
  console.log("Sin notificaciones:", configUsuario.toString(2));
}

// === EJECUCIÓN PRINCIPAL ===
procesarUsuarios();
gestionarCaracteristicas();

// Demostración de precedencia
console.log("\\n=== DEMOSTRACIÓN DE PRECEDENCIA ===");
let ejemploPrecedencia = 10 + 5 * 2 ** 3 / 4 - 1;
// 1. 2 ** 3 = 8, 2. 5 * 8 = 40, 3. 40 / 4 = 10, 4. 10 + 10 = 20, 5. 20 - 1 = 19
console.log(\`10 + 5 * 2 ** 3 / 4 - 1 = \${ejemploPrecedencia}\`);`
  };

  return (
    <div className="guia-contenido">
      <header className="guia-header">
        <h1>Operadores y Expresiones en JavaScript</h1>
        <div className="guia-meta">
          <span className="nivel">Principiante</span>
          <span className="tiempo">40 minutos</span>
        </div>
      </header>

      <section className="guia-seccion">
        <h2>Introducción a los Operadores</h2>
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>¿Qué son los operadores?</h3>
            <p>Los operadores son símbolos que permiten realizar operaciones sobre valores y variables. JavaScript tiene diferentes tipos de operadores para diferentes propósitos.</p>
          </div>
        </div>

        <div className="tipos-datos-grid">
          <div className="tipo-dato-card">
            <h4>➕ Aritméticos</h4>
            <p>Para operaciones matemáticas básicas</p>
            <code>+ - * / % **</code>
          </div>
          <div className="tipo-dato-card">
            <h4>⚖️ Comparación</h4>
            <p>Para comparar valores</p>
            <code>== === != !== &gt; &lt;</code>
          </div>
          <div className="tipo-dato-card">
            <h4>🔗 Lógicos</h4>
            <p>Para combinar condiciones</p>
            <code>&& || !</code>
          </div>
          <div className="tipo-dato-card">
            <h4>💼 Asignación</h4>
            <p>Para asignar valores</p>
            <code>= += -= *= /=</code>
          </div>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Operadores Aritméticos</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Operaciones Matemáticas Básicas</h3>
            <p>Los operadores aritméticos se utilizan para realizar operaciones matemáticas entre números.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Operadores Aritméticos Completos</span>
            <button 
              className={`btn-copiar ${copiado === 'operadoresAritmeticos' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.operadoresAritmeticos, 'operadoresAritmeticos')}
            >
              {copiado === 'operadoresAritmeticos' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.operadoresAritmeticos}</code>
          </pre>
        </div>

        <div className="tabla-contenedor">
          <table className="tabla-guia">
            <thead>
              <tr>
                <th>Operador</th>
                <th>Nombre</th>
                <th>Ejemplo</th>
                <th>Resultado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>+</code></td>
                <td>Suma</td>
                <td><code>5 + 3</code></td>
                <td>8</td>
              </tr>
              <tr>
                <td><code>-</code></td>
                <td>Resta</td>
                <td><code>10 - 4</code></td>
                <td>6</td>
              </tr>
              <tr>
                <td><code>*</code></td>
                <td>Multiplicación</td>
                <td><code>3 * 7</code></td>
                <td>21</td>
              </tr>
              <tr>
                <td><code>/</code></td>
                <td>División</td>
                <td><code>15 / 3</code></td>
                <td>5</td>
              </tr>
              <tr>
                <td><code>%</code></td>
                <td>Módulo</td>
                <td><code>10 % 3</code></td>
                <td>1</td>
              </tr>
              <tr>
                <td><code>**</code></td>
                <td>Exponenciación</td>
                <td><code>2 ** 3</code></td>
                <td>8</td>
              </tr>
              <tr>
                <td><code>++</code></td>
                <td>Incremento</td>
                <td><code>a++</code></td>
                <td>a + 1</td>
              </tr>
              <tr>
                <td><code>--</code></td>
                <td>Decremento</td>
                <td><code>a--</code></td>
                <td>a - 1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Operadores de Comparación</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Comparando Valores</h3>
            <p>Los operadores de comparación devuelven un valor booleano (true o false) indicando si la comparación es verdadera.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Comparaciones en JavaScript</span>
            <button 
              className={`btn-copiar ${copiado === 'operadoresComparacion' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.operadoresComparacion, 'operadoresComparacion')}
            >
              {copiado === 'operadoresComparacion' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.operadoresComparacion}</code>
          </pre>
        </div>

        <div className="nota-importante">
          <h4>⚠️ Importante: Comparación Estricta vs Débil</h4>
          <p>
            <strong>Comparación estricta (===):</strong> Compara valor Y tipo de dato<br/>
            <strong>Comparación débil (==):</strong> Solo compara valor (puede hacer conversión automática de tipos)<br/>
            <strong>Recomendación:</strong> Usa siempre comparación estricta para evitar errores sutiles.
          </p>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Operadores Lógicos</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Combinando Condiciones</h3>
            <p>Los operadores lógicos se utilizan para combinar múltiples condiciones y tomar decisiones complejas.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Operadores Lógicos y Cortocircuito</span>
            <button 
              className={`btn-copiar ${copiado === 'operadoresLogicos' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.operadoresLogicos, 'operadoresLogicos')}
            >
              {copiado === 'operadoresLogicos' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.operadoresLogicos}</code>
          </pre>
        </div>

        <div className="tabla-contenedor">
          <table className="tabla-guia">
            <thead>
              <tr>
                <th>Operador</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Ejemplo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>&&</code></td>
                <td>AND</td>
                <td>Verdadero si AMBAS condiciones son verdaderas</td>
                <td><code>true && false → false</code></td>
              </tr>
              <tr>
                <td><code>||</code></td>
                <td>OR</td>
                <td>Verdadero si AL MENOS UNA condición es verdadera</td>
                <td><code>true || false → true</code></td>
              </tr>
              <tr>
                <td><code>!</code></td>
                <td>NOT</td>
                <td>Invierte el valor booleano</td>
                <td><code>!true → false</code></td>
              </tr>
              <tr>
                <td><code>??</code></td>
                <td>Nullish Coalescing</td>
                <td>Devuelve el primer valor que no sea null/undefined</td>
                <td><code>null ?? 'default' → 'default'</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Operador Ternario</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>If/Else en una Línea</h3>
            <p>El operador ternario es una forma concisa de escribir condicionales simples en una sola línea.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Sintaxis del Operador Ternario</span>
            <button 
              className={`btn-copiar ${copiado === 'operadoresTernarios' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.operadoresTernarios, 'operadoresTernarios')}
            >
              {copiado === 'operadoresTernarios' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.operadoresTernarios}</code>
          </pre>
        </div>

        <div className="nota-advertencia">
          <h4>💡 Mejor Práctica</h4>
          <p>Usa el operador ternario para condiciones simples y legibles. Para lógica compleja, es mejor usar if/else tradicional para mayor claridad.</p>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Operadores con Strings</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Concatenación y Template Literals</h3>
            <p>JavaScript proporciona diferentes formas de trabajar con strings, desde la concatenación básica hasta los modernos template literals.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Operaciones con Strings</span>
            <button 
              className={`btn-copiar ${copiado === 'operadoresString' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.operadoresString, 'operadoresString')}
            >
              {copiado === 'operadoresString' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.operadoresString}</code>
          </pre>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Operadores a Nivel de Bit</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Manipulación de Bits</h3>
            <p>Los operadores a nivel de bit trabajan con representaciones binarias de los números. Son útiles para optimización y operaciones de bajo nivel.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Operadores Bit a Bit</span>
            <button 
              className={`btn-copiar ${copiado === 'operadoresBit' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.operadoresBit, 'operadoresBit')}
            >
              {copiado === 'operadoresBit' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.operadoresBit}</code>
          </pre>
        </div>

        <div className="nota-advertencia">
          <h4>🔍 Uso Avanzado</h4>
          <p>Los operadores a nivel de bit son menos comunes en aplicaciones web típicas, pero son esenciales para algoritmos de optimización, gráficos y sistemas embebidos.</p>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Precedencia de Operadores</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Orden de Evaluación</h3>
            <p>JavaScript evalúa las expresiones en un orden específico basado en la precedencia de operadores. Los paréntesis pueden cambiar este orden.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Precedencia y Paréntesis</span>
            <button 
              className={`btn-copiar ${copiado === 'precedenciaOperadores' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.precedenciaOperadores, 'precedenciaOperadores')}
            >
              {copiado === 'precedenciaOperadores' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.precedenciaOperadores}</code>
          </pre>
        </div>

        <div className="resumen-practicas">
          <h4>📋 Orden de Precedencia (de mayor a menor)</h4>
          <ul>
            <li><strong>Paréntesis:</strong> <code>()</code></li>
            <li><strong>Exponenciación:</strong> <code>**</code></li>
            <li><strong>Multiplicación/División/Módulo:</strong> <code>* / %</code></li>
            <li><strong>Suma/Resta:</strong> <code>+ -</code></li>
            <li><strong>Comparación:</strong> <code>&lt; &lt;= &gt; &gt;=</code></li>
            <li><strong>Igualdad:</strong> <code>== === != !==</code></li>
            <li><strong>AND lógico:</strong> <code>&&</code></li>
            <li><strong>OR lógico:</strong> <code>||</code></li>
            <li><strong>Asignación:</strong> <code>= += -= etc.</code></li>
          </ul>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Ejemplo Completo: Sistema de Validación</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>Aplicación Integrada de Operadores</h3>
            <p>Este sistema demuestra el uso práctico de todos los tipos de operadores en un contexto real de validación de usuarios.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Sistema Completo de Validación</span>
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
            <li><strong>Operadores aritméticos:</strong> Cálculos de descuentos y promedios</li>
            <li><strong>Operadores de comparación:</strong> Validación de edad y puntuación</li>
            <li><strong>Operadores lógicos:</strong> Combinación de múltiples condiciones</li>
            <li><strong>Operador ternario:</strong> Asignaciones condicionales concisas</li>
            <li><strong>Template literals:</strong> Generación de mensajes dinámicos</li>
            <li><strong>Operadores de asignación:</strong> Incremento de contadores</li>
            <li><strong>Operadores bit a bit:</strong> Gestión de flags y características</li>
            <li><strong>Precedencia:</strong> Orden correcto de evaluación en expresiones complejas</li>
          </ul>
        </div>
      </section>

      <section className="guia-seccion">
        <h2>Próximos Pasos</h2>
        <div className="proximos-pasos">
          <div className="paso-aprendizaje">
            <div className="paso-numero">4</div>
            <div className="paso-info">
              <h4>Estructuras de Control</h4>
              <p>Aprenderás sobre if/else, switch, bucles for/while y cómo controlar el flujo de ejecución.</p>
            </div>
          </div>
          <div className="paso-aprendizaje">
            <div className="paso-numero">5</div>
            <div className="paso-info">
              <h4>Funciones</h4>
              <p>Profundizarás en funciones, parámetros, valores de retorno y scope.</p>
            </div>
          </div>
          <div className="paso-aprendizaje">
            <div className="paso-numero">6</div>
            <div className="paso-info">
              <h4>Arrays y Métodos</h4>
              <p>Aprenderás métodos avanzados para manipular arrays y trabajar con datos.</p>
            </div>
          </div>
        </div>

        <div className="resumen-practicas">
          <h4>📋 Resumen de Operadores</h4>
          <ul>
            <li><strong>Aritméticos:</strong> <code>+ - * / % ** ++ --</code></li>
            <li><strong>Comparación:</strong> <code>== === != !== &gt; &lt; &gt;= &lt;=</code></li>
            <li><strong>Lógicos:</strong> <code>&amp;&amp; || ! ??</code></li>
            <li><strong>Asignación:</strong> <code>= += -= *= /= %= **=</code></li>
            <li><strong>Ternario:</strong> <code>condición ? valor1 : valor2</code></li>
            <li><strong>Bit a bit:</strong> <code>&amp; | ^ ~ &lt;&lt; &gt;&gt; &gt;&gt;&gt;</code></li>
            <li><strong>String:</strong> <code>+ += ``</code></li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Guia_3;