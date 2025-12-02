import React, { useState } from 'react';
import './Guias.css';

const Guia_5 = () => {
  const [copiado, setCopiado] = useState(null);

  const copiarCodigo = (codigo, id) => {
    navigator.clipboard.writeText(codigo);
    setCopiado(id);
    setTimeout(() => setCopiado(null), 2000);
  };

  const ejemplosCodigo = {
    // EJEMPLO 1: CONCEPTOS BÁSICOS Y FUNCIONES COMO CIUDADANOS DE PRIMERA CLASE
    queEsFuncion: `// Ejemplo básico de función
function prepararCafe(tipo, azucar) {
    return "Café " + tipo + " con " + azucar + " cucharadas de azúcar";
}

// Usar la función múltiples veces
console.log(prepararCafe("negro", 0));     // "Café negro con 0 cucharadas de azúcar"
console.log(prepararCafe("con leche", 2)); // "Café con leche con 2 cucharadas de azúcar"

// FUNCIONES COMO CIUDADANOS DE PRIMERA CLASE
// 1. Asignadas a variables
const miFuncion = function() { 
    return "Hola"; 
};

// 2. Pasadas como argumentos
function ejecutarFuncion(fn) {
    return fn();
}

// 3. Retornadas desde otras funciones
function crearSaludador() {
    return function() {
        return "¡Hola desde función retornada!";
    };
}

// 4. Almacenadas en estructuras de datos
const arrayDeFunciones = [
    miFuncion, 
    function() { return "Mundo"; },
    () => "JavaScript"
];

// Ejecutar ejemplos
console.log(ejecutarFuncion(miFuncion));       // "Hola"
console.log(crearSaludador()());              // "¡Hola desde función retornada!"
console.log(arrayDeFunciones[0]());           // "Hola"`,

    // EJEMPLO 2: DECLARACIÓN DE FUNCIÓN
    declaracionFuncion: `// 1. DECLARACIÓN DE FUNCIÓN (Function Declaration)
function calcularAreaRectangulo(ancho, alto) {
    return ancho * alto;
}

// Hoisting ejemplo (funciona):
console.log(saludar("Ana")); // "¡Hola, Ana!" (aunque la función está después)

function saludar(nombre) {
    return "¡Hola, " + nombre + "!";
}

// USO DE ARGUMENTS
function sumarTodos() {
    let suma = 0;
    // arguments es un objeto similar array disponible en funciones declaradas
    for (let i = 0; i < arguments.length; i++) {
        suma += arguments[i];
    }
    return suma;
}

console.log(sumarTodos(1, 2, 3, 4)); // 10

// FUNCIONES COMO CONSTRUCTORES
function Persona(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
}

// Añadir método al prototipo
Persona.prototype.presentarse = function() {
    return "Hola, soy " + this.nombre + " y tengo " + this.edad + " años";
};

const persona1 = new Persona("María", 25);
console.log(persona1.nombre);           // "María"
console.log(persona1.presentarse());    // "Hola, soy María y tengo 25 años"

// Ejemplos de uso
console.log(calcularAreaRectangulo(5, 10)); // 50
console.log(saludar("Carlos"));             // "¡Hola, Carlos!"`,

    // EJEMPLO 3: EXPRESIÓN DE FUNCIÓN
    expresionFuncion: `// 2. EXPRESIÓN DE FUNCIÓN (Function Expression)
const calcularIVA = function(precio) {
    return precio * 0.21;
};

// Esto causaría ERROR por no tener hoisting:
// console.log(calcularDescuento(100)); // Error: calcularDescuento no está definido

const calcularDescuento = function(precio) {
    return precio * 0.10;
};

console.log(calcularDescuento(100)); // 10 (ahora sí funciona)

// EXPRESIÓN DE FUNCIÓN CON NOMBRE
const factorial = function fac(n) {
    return n < 2 ? 1 : n * fac(n - 1);
};

console.log(factorial(5)); // 120

// ASIGNACIÓN CONDICIONAL
let operacion;
if (Math.random() > 0.5) {
    operacion = function(x) { 
        return x * 2; 
    };
} else {
    operacion = function(x) { 
        return x / 2; 
    };
}

console.log(operacion(10)); // 20 o 5 (depende del random)

// IIFE (Immediately Invoked Function Expression)
const resultado = (function() {
    const secreto = "valor privado";
    return "Ejecutado inmediatamente: " + secreto;
})();

console.log(resultado); // "Ejecutado inmediatamente: valor privado"

// IIFE con parámetros
const config = (function(configuracion) {
    return {
        ...configuracion,
        inicializado: true
    };
})({ tema: "oscuro", idioma: "es" });

console.log(config); // {tema: "oscuro", idioma: "es", inicializado: true}

// Usar funciones
console.log(calcularIVA(100));    // 21
console.log(factorial(4));        // 24`,

    // EJEMPLO 4: ARROW FUNCTION
    arrowFunction: `// 3. FUNCIÓN FLECHA (Arrow Function) - ES6+

// Sintaxis básica
const sumar = (a, b) => {
    return a + b;
};

// Return implícito (cuando hay una sola expresión)
const multiplicar = (a, b) => a * b;

// Un solo parámetro (sin paréntesis)
const cuadrado = x => x * x;

// Sin parámetros
const obtenerPi = () => 3.1416;

// Con cuerpo de múltiples líneas (necesita return explícito)
const procesarDatos = (datos) => {
    const limpios = datos.filter(item => item !== null);
    return limpios.map(item => item * 2);
};

// DIFERENCIA CLAVE CON 'this'
const objeto = {
    valor: 42,
    metodoTradicional: function() {
        console.log("Tradicional this:", this.valor); // 42 (this es el objeto)
    },
    metodoFlecha: () => {
        console.log("Flecha this:", this.valor); // undefined (this es el contexto exterior)
    },
    metodoConTimeout: function() {
        // Problema con this en callbacks tradicionales
        setTimeout(function() {
            console.log("Timeout tradicional:", this.valor); // undefined
        }, 100);
        
        // Solución con arrow function
        setTimeout(() => {
            console.log("Timeout flecha:", this.valor); // 42
        }, 100);
    }
};

// USO COMÚN EN CALLBACKS
const numeros = [1, 2, 3, 4];
const duplicados = numeros.map(num => num * 2);
const pares = numeros.filter(num => num % 2 === 0);
const suma = numeros.reduce((acum, num) => acum + num, 0);

console.log(sumar(5, 3));        // 8
console.log(multiplicar(4, 5));  // 20
console.log(cuadrado(6));        // 36
console.log(obtenerPi());        // 3.1416
console.log(duplicados);         // [2, 4, 6, 8]
console.log(pares);              // [2, 4]
console.log(suma);               // 10

// Ejecutar métodos para ver diferencia de this
objeto.metodoTradicional();  // "Tradicional this: 42"
objeto.metodoFlecha();       // "Flecha this: undefined"
objeto.metodoConTimeout();   // Muestra diferencia en timeouts`,

    // EJEMPLO 5: PARÁMETROS BÁSICOS
    parametrosBasicos: `// PARÁMETROS BÁSICOS
// Los parámetros son variables que reciben valores cuando se llama la función

function presentarPersona(nombre, edad, ciudad) {
    return \`Hola, soy \${nombre}, tengo \${edad} años y vivo en \${ciudad}\`;
}

// Los argumentos son los valores reales que pasamos
console.log(presentarPersona("María", 25, "Madrid"));
// "Hola, soy María, tengo 25 años y vivo en Madrid"

// Si no pasamos todos los argumentos, los parámetros serán undefined
console.log(presentarPersona("Carlos")); 
// "Hola, soy Carlos, tengo undefined años y vivo en undefined"

// VALIDACIÓN DE PARÁMETROS
function dividir(a, b) {
    // Validar tipos
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error("Ambos parámetros deben ser números");
    }
    
    // Validar división por cero
    if (b === 0) {
        throw new Error("División por cero no permitida");
    }
    
    return a / b;
}

try {
    console.log(dividir(10, 2));  // 5
    console.log(dividir(10, 0));  // Error
} catch (error) {
    console.error(error.message);
}

// ORDEN DE PARÁMETROS
// Buenas prácticas: ordenar parámetros de más importante a menos importante
function configurarUsuario(nombre, email, telefono = "", activo = true) {
    return { 
        nombre, 
        email, 
        telefono, 
        activo 
    };
}

// DESTRUCTURING EN PARÁMETROS
function procesarPedido({ producto, cantidad, direccion }) {
    return \`Pedido: \${cantidad} x \${producto} para \${direccion}\`;
}

const pedido = {
    producto: "Laptop",
    cantidad: 1,
    direccion: "Calle Principal 123"
};

console.log(procesarPedido(pedido)); // "Pedido: 1 x Laptop para Calle Principal 123"`,

    // EJEMPLO 6: PARÁMETROS POR DEFECTO
    parametrosDefault: `// PARÁMETROS POR DEFECTO (ES6+)
// Podemos asignar valores por defecto a los parámetros

function crearUsuario(nombre, rol = "usuario", activo = true) {
    return {
        nombre: nombre,
        rol: rol,
        activo: activo
    };
}

// Si no pasamos un argumento, se usa el valor por defecto
console.log(crearUsuario("Ana"));
// {nombre: "Ana", rol: "usuario", activo: true}

console.log(crearUsuario("Pedro", "admin"));
// {nombre: "Pedro", rol: "admin", activo: true}

console.log(crearUsuario("Laura", "editor", false));
// {nombre: "Laura", rol: "editor", activo: false}

// Los parámetros por defecto pueden ser expresiones
function crearId(prefixo = "usr", numero = Math.random()) {
    return prefixo + "_" + numero;
}

console.log(crearId()); // "usr_0.123456789"

// PARÁMETROS POR DEFECTO CON FUNCIONES
function obtenerFecha(formato = "DD/MM/YYYY") {
    const ahora = new Date();
    
    const formatos = {
        "DD/MM/YYYY": \`\${ahora.getDate()}/\${ahora.getMonth() + 1}/\${ahora.getFullYear()}\`,
        "MM/DD/YYYY": \`\${ahora.getMonth() + 1}/\${ahora.getDate()}/\${ahora.getFullYear()}\`,
        "YYYY-MM-DD": \`\${ahora.getFullYear()}-\${(ahora.getMonth() + 1).toString().padStart(2, '0')}-\${ahora.getDate().toString().padStart(2, '0')}\`
    };
    
    return formatos[formato] || formatos["DD/MM/YYYY"];
}

console.log(obtenerFecha()); // "15/10/2024"
console.log(obtenerFecha("YYYY-MM-DD")); // "2024-10-15"

// PARÁMETROS POR DEFECTO QUE DEPENDEN DE OTROS PARÁMETROS
function crearProducto(nombre, precio, impuesto = precio * 0.21, descuento = 0) {
    return {
        nombre,
        precioBase: precio,
        impuesto,
        descuento,
        precioFinal: precio + impuesto - descuento
    };
}

const producto1 = crearProducto("Laptop", 1000);
console.log(producto1.precioFinal); // 1210

const producto2 = crearProducto("Tablet", 500, 50, 25);
console.log(producto2.precioFinal); // 525

// VALOR undefined ACTIVA EL VALOR POR DEFECTO
function conValoresPorDefecto(a = 10, b = 20) {
    return a + b;
}

console.log(conValoresPorDefecto(5, 5));     // 10
console.log(conValoresPorDefecto(5));        // 25 (5 + 20)
console.log(conValoresPorDefecto(undefined, 5)); // 15 (10 + 5)`,

    // EJEMPLO 7: PARÁMETROS REST
    restParameters: `// PARÁMETROS REST (ES6+)
// Captura múltiples argumentos como un array

function sumarTodos(...numeros) {
    let total = 0;
    // Usar for...of para iterar el array
    for (let numero of numeros) {
        total += numero;
    }
    return total;
}

console.log(sumarTodos(1, 2, 3));        // 6
console.log(sumarTodos(5, 10, 15, 20));  // 50
console.log(sumarTodos(2));              // 2
console.log(sumarTodos());               // 0

// Útil para funciones que aceptan número variable de argumentos
function crearPizza(tamaño, ...ingredientes) {
    return \`Pizza \${tamaño} con: \${ingredientes.join(", ")}\`;
}

console.log(crearPizza("mediana", "queso", "jamón", "champiñones"));
// "Pizza mediana con: queso, jamón, champiñones"

// COMBINACIÓN CON PARÁMETROS NORMALES
function configurarServidor(protocolo, host, ...puertos) {
    return {
        url: \`\${protocolo}://\${host}\`,
        puertos: puertos,
        puertoPrincipal: puertos[0]
    };
}

const servidor = configurarServidor("https", "api.midominio.com", 3000, 3001, 3002);
console.log(servidor);
// {url: "https://api.midominio.com", puertos: [3000, 3001, 3002], puertoPrincipal: 3000}

// DIFERENCIA ENTRE REST PARAMETERS Y ARGUMENTS
function ejemploDiferencias(a, b, ...rest) {
    console.log("Parámetros normales:", a, b);
    console.log("Rest parameters:", rest);
    console.log("Arguments object:", arguments);
    console.log("¿Rest es array?", Array.isArray(rest));
    console.log("¿Arguments es array?", Array.isArray(arguments));
}

// Llamar la función para ver diferencias
ejemploDiferencias(1, 2, 3, 4, 5);
// Parámetros normales: 1 2
// Rest parameters: [3, 4, 5]
// Arguments object: Arguments(5) [1, 2, 3, 4, 5]
// ¿Rest es array? true
// ¿Arguments es array? false

// COMBINAR REST CON DESTRUCTURING
function procesarUsuarios(...usuarios) {
    const [primero, ...resto] = usuarios;
    return {
        primerUsuario: primero,
        otrosUsuarios: resto,
        total: usuarios.length
    };
}

const resultado = procesarUsuarios(
    {nombre: "Ana", edad: 25},
    {nombre: "Carlos", edad: 30},
    {nombre: "Maria", edad: 28}
);

console.log(resultado);
// {primerUsuario: {nombre: "Ana", edad: 25}, otrosUsuarios: Array(2), total: 3}`,

    // EJEMPLO 8: RETURN BÁSICO
    returnBasico: `// VALORES DE RETORNO - RETURN
// La sentencia 'return' especifica el valor que devuelve la función

function esMayorDeEdad(edad) {
    return edad >= 18;
}

// Sin return, la función devuelve undefined
function saludar(nombre) {
    console.log("Hola " + nombre);
    // No hay return → devuelve undefined
}

console.log(esMayorDeEdad(20));  // true
console.log(esMayorDeEdad(15));  // false

const resultadoSaludo = saludar("Ana"); 
console.log(resultadoSaludo); // undefined (aunque imprime "Hola Ana")

// Return detiene la ejecución de la función
function verificarNumero(numero) {
    if (numero < 0) {
        return "Negativo";
    }
    if (numero > 0) {
        return "Positivo";
    }
    return "Cero"; // Solo se ejecuta si no es negativo ni positivo
}

console.log(verificarNumero(-5));  // "Negativo"
console.log(verificarNumero(10));  // "Positivo"
console.log(verificarNumero(0));   // "Cero"

// MÚLTIPLES PUNTOS DE RETORNO (GUARD CLAUSES)
function procesarUsuario(usuario) {
    // Guard clauses: retornos tempranos para casos especiales
    if (!usuario) {
        return null;
    }
    
    if (!usuario.activo) {
        return "Usuario inactivo";
    }
    
    if (usuario.edad < 18) {
        return "Usuario menor de edad";
    }
    
    // Lógica principal - solo se ejecuta si pasa todas las validaciones
    return \`Usuario válido: \${usuario.nombre}\`;
}

console.log(procesarUsuario({nombre: "Ana", edad: 25, activo: true}));
// "Usuario válido: Ana"

console.log(procesarUsuario({nombre: "Luis", edad: 16, activo: true}));
// "Usuario menor de edad"

console.log(procesarUsuario(null));
// null

// RETURN EN ARROW FUNCTIONS
const esPar = (numero) => {
    if (numero % 2 === 0) {
        return true;
    }
    return false;
};

// Return implícito en arrow functions
const esImpar = numero => numero % 2 !== 0;

console.log(esPar(4));  // true
console.log(esImpar(4)); // false`,

    // EJEMPLO 9: RETURN MÚLTIPLES VALORES
    returnMultiples: `// RETORNAR MÚLTIPLES VALORES
// JavaScript solo puede retornar un valor, pero podemos usar objetos o arrays

// Retornar objeto (recomendado para datos con significado)
function operacionesMatematicas(a, b) {
    return {
        suma: a + b,
        resta: a - b,
        multiplicacion: a * b,
        division: a / b,
        modulo: a % b,
        potencia: a ** b
    };
}

const resultados = operacionesMatematicas(10, 5);
console.log(resultados.suma);           // 15
console.log(resultados.multiplicacion); // 50

// Retornar array (útil para valores del mismo tipo)
function obtenerMinMax(numeros) {
    return [Math.min(...numeros), Math.max(...numeros)];
}

const [minimo, maximo] = obtenerMinMax([5, 2, 8, 1, 9]);
console.log(minimo); // 1
console.log(maximo); // 9

// Retornar función (closure)
function crearMultiplicador(factor) {
    return function(numero) {
        return numero * factor;
    };
}

const duplicar = crearMultiplicador(2);
const triplicar = crearMultiplicador(3);

console.log(duplicar(5)); // 10
console.log(triplicar(5)); // 15

// RETORNO CONDICIONAL DE TIPOS
function procesarEntrada(entrada) {
    if (typeof entrada === 'number') {
        return entrada * 2;
    }
    
    if (typeof entrada === 'string') {
        return entrada.toUpperCase();
    }
    
    if (Array.isArray(entrada)) {
        return entrada.length;
    }
    
    return "Tipo no soportado";
}

console.log(procesarEntrada(5));        // 10
console.log(procesarEntrada("hola"));   // "HOLA"
console.log(procesarEntrada([1, 2, 3])); // 3
console.log(procesarEntrada({}));       // "Tipo no soportado"

// RETORNAR PROMESAS (para operaciones asíncronas)
function obtenerDatos(usuarioId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (usuarioId > 0) {
                resolve({id: usuarioId, nombre: "Usuario " + usuarioId});
            } else {
                reject("ID de usuario inválido");
            }
        }, 1000);
    });
}

// Usar la función que retorna una promesa
obtenerDatos(1)
    .then(usuario => console.log("Usuario obtenido:", usuario))
    .catch(error => console.error("Error:", error));

// RETORNAR MÚLTIPLES VALORES CON DESTRUCTURING
function analizarCadena(texto) {
    const palabras = texto.split(' ').length;
    const caracteres = texto.length;
    const mayusculas = texto === texto.toUpperCase();
    
    return { palabras, caracteres, mayusculas };
}

const { palabras, caracteres } = analizarCadena("Hola Mundo JavaScript");
console.log(\`Palabras: \${palabras}, Caracteres: \${caracteres}\`);
// "Palabras: 3, Caracteres: 21"`,

    // EJEMPLO 10: SCOPE DE VARIABLES
    scopeVariables: `// SCOPE (ALCANCE) DE VARIABLES
// El scope determina dónde una variable es accesible

let global = "Soy global"; // Scope global

function funcionExterna() {
    let externa = "Soy externa"; // Scope de función
    
    function funcionInterna() {
        let interna = "Soy interna"; // Scope de función interna
        console.log(global);   // ✅ Accesible
        console.log(externa);  // ✅ Accesible  
        console.log(interna);  // ✅ Accesible
    }
    
    funcionInterna();
    console.log(global);   // ✅ Accesible
    console.log(externa);  // ✅ Accesible
    // console.log(interna); // ❌ ERROR - No accesible
}

funcionExterna();
console.log(global);   // ✅ Accesible
// console.log(externa); // ❌ ERROR - No accesible
// console.log(interna); // ❌ ERROR - No accesible

// Scope de bloque (let/const)
if (true) {
    let bloque = "Solo en este bloque";
    const constante = "También solo aquí";
    var conVar = "Var escapa del bloque"; // ❌ Mal práctica
}

// console.log(bloque);    // ❌ ERROR
// console.log(constante); // ❌ ERROR
console.log(conVar);      // ✅ Funciona (var no tiene scope de bloque)

// SCOPE CHAIN (CADENA DE ALCANCE)
const nivelGlobal = "global";

function nivel1() {
    const nivel1Var = "nivel 1";
    
    function nivel2() {
        const nivel2Var = "nivel 2";
        
        function nivel3() {
            const nivel3Var = "nivel 3";
            console.log(nivelGlobal);  // ✅
            console.log(nivel1Var);    // ✅
            console.log(nivel2Var);    // ✅
            console.log(nivel3Var);    // ✅
        }
        
        nivel3();
        console.log(nivelGlobal);  // ✅
        console.log(nivel1Var);    // ✅
        console.log(nivel2Var);    // ✅
        // console.log(nivel3Var); // ❌
    }
    
    nivel2();
}

nivel1();

// TEMPORAL DEAD ZONE (TDZ)
console.log(varConHoisting); // undefined (hoisting)
var varConHoisting = "hola";

// console.log(letSinHoisting); // ❌ ReferenceError
let letSinHoisting = "mundo";

// EJEMPLO PRÁCTICO DE SCOPE
function crearContadores() {
    let contador1 = 0;
    let contador2 = 0;
    
    return {
        incrementar1: function() {
            contador1++;
            return contador1;
        },
        incrementar2: function() {
            contador2 += 2;
            return contador2;
        },
        obtenerContadores: function() {
            return { contador1, contador2 };
        }
    };
}

const contadores = crearContadores();
console.log(contadores.incrementar1()); // 1
console.log(contadores.incrementar2()); // 2
console.log(contadores.incrementar1()); // 2
console.log(contadores.obtenerContadores()); // {contador1: 2, contador2: 2}`,

    // EJEMPLO 11: CLOSURES
    closures: `// CLOSURES (CLAUSURAS)
// Una closure es una función que recuerda las variables de su scope exterior

function crearContador() {
    let cuenta = 0; // Variable "privada"
    
    return function() {
        cuenta++;    // Recuerda 'cuenta' del scope exterior
        return cuenta;
    };
}

const contador = crearContador();
console.log(contador()); // 1
console.log(contador()); // 2  
console.log(contador()); // 3

// Cada closure mantiene su propio estado
const contador2 = crearContador();
console.log(contador2()); // 1 (independiente del primero)

// Ejemplo práctico: crear personalizadores
function crearSaludador(saludo) {
    return function(nombre) {
        return \`\${saludo}, \${nombre}!\`;
    };
}

const saludarEsp = crearSaludador("Hola");
const saludarEng = crearSaludador("Hello");
const saludarFormal = crearSaludador("Buenos días");

console.log(saludarEsp("Ana"));      // "Hola, Ana!"
console.log(saludarEng("John"));     // "Hello, John!"
console.log(saludarFormal("Sr. García")); // "Buenos días, Sr. García!"

// CLOSURES PARA DATA PRIVADA
function crearCuentaBancaria(saldoInicial) {
    let saldo = saldoInicial;
    
    return {
        depositar: function(cantidad) {
            if (cantidad <= 0) {
                return "Cantidad debe ser positiva";
            }
            saldo += cantidad;
            return \`Depositado: $\${cantidad}. Nuevo saldo: $\${saldo}\`;
        },
        
        retirar: function(cantidad) {
            if (cantidad <= 0) {
                return "Cantidad debe ser positiva";
            }
            if (cantidad > saldo) {
                return "Fondos insuficientes";
            }
            saldo -= cantidad;
            return \`Retirado: $\${cantidad}. Nuevo saldo: $\${saldo}\`;
        },
        
        consultarSaldo: function() {
            return \`Saldo actual: $\${saldo}\`;
        }
    };
}

const miCuenta = crearCuentaBancaria(1000);
console.log(miCuenta.depositar(500));  // "Depositado: $500. Nuevo saldo: $1500"
console.log(miCuenta.retirar(200));    // "Retirado: $200. Nuevo saldo: $1300"
console.log(miCuenta.consultarSaldo());// "Saldo actual: $1300"
// console.log(miCuenta.saldo);        // ❌ undefined (saldo es privado)

// CLOSURES EN BUCLES (PROBLEMA COMÚN)
console.log("=== PROBLEMA COMÚN CON CLOSURES Y BUCLES ===");
for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log("var i =", i); // Siempre muestra 3
    }, 100);
}

// SOLUCIONES:
// 1. Usar let en lugar de var
for (let i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log("let i =", i); // Muestra 0, 1, 2
    }, 100);
}

// 2. IIFE (Immediately Invoked Function Expression)
for (var i = 0; i < 3; i++) {
    (function(j) {
        setTimeout(function() {
            console.log("IIFE j =", j); // Muestra 0, 1, 2
        }, 100);
    })(i);
}

// CLOSURE PARA CACHE/MEMOIZACIÓN
function crearCalculadoraCostosa() {
    const cache = new Map();
    
    return function(n) {
        if (cache.has(n)) {
            console.log(\`Cache hit para \${n}\`);
            return cache.get(n);
        }
        
        console.log(\`Calculando para \${n}\`);
        // Simular cálculo costoso
        const resultado = n * n * n; // n^3
        cache.set(n, resultado);
        return resultado;
    };
}

const calculadora = crearCalculadoraCostosa();
console.log(calculadora(5)); // Calculando para 5 → 125
console.log(calculadora(5)); // Cache hit para 5 → 125
console.log(calculadora(3)); // Calculando para 3 → 27`,

    // EJEMPLO 12: FUNCIONES DE ORDEN SUPERIOR
    ordenSuperior: `// FUNCIONES DE ORDEN SUPERIOR
// Son funciones que reciben otras funciones como argumentos o devuelven funciones

// 1. Función que RECIBE otra función como argumento
function procesarArray(array, operacion) {
    const resultado = [];
    for (let elemento of array) {
        resultado.push(operacion(elemento));
    }
    return resultado;
}

// Funciones para usar como argumentos
function duplicar(x) { 
    return x * 2; 
}

function cuadrado(x) { 
    return x * x; 
}

const numeros = [1, 2, 3, 4];
console.log(procesarArray(numeros, duplicar));   // [2, 4, 6, 8]
console.log(procesarArray(numeros, cuadrado));   // [1, 4, 9, 16]

// Con arrow function inline
console.log(procesarArray(numeros, x => x + 10)); // [11, 12, 13, 14]

// 2. Función que DEVUELVE otra función
function crearComparador(operador) {
    if (operador === "mayor") {
        return (a, b) => a > b;
    } else if (operador === "menor") {
        return (a, b) => a < b;
    } else if (operador === "igual") {
        return (a, b) => a === b;
    } else {
        throw new Error("Operador no válido");
    }
}

const esMayor = crearComparador("mayor");
const esMenor = crearComparador("menor");

console.log(esMayor(5, 3)); // true
console.log(esMenor(2, 7)); // true
console.log(esMayor(2, 7)); // false

// EJEMPLOS AVANZADOS DE ORDEN SUPERIOR

// COMPOSICIÓN DE FUNCIONES
function componer(f, g) {
    return function(x) {
        return f(g(x));
    };
}

const sumarUno = x => x + 1;
const multiplicarPorDos = x => x * 2;

const sumarUnoYMultiplicarPorDos = componer(multiplicarPorDos, sumarUno);
console.log(sumarUnoYMultiplicarPorDos(5)); // 12 (5+1=6, 6*2=12)

// MEMOIZACIÓN (CACHE)
function memoizar(funcion) {
    const cache = new Map();
    
    return function(...args) {
        const clave = JSON.stringify(args);
        
        if (cache.has(clave)) {
            console.log("Recuperando de cache:", clave);
            return cache.get(clave);
        }
        
        console.log("Calculando:", clave);
        const resultado = funcion.apply(this, args);
        cache.set(clave, resultado);
        return resultado;
    };
}

const factorialLento = memoizar(function(n) {
    console.log(\`Calculando factorial(\${n})\`);
    if (n <= 1) return 1;
    return n * factorialLento(n - 1);
});

console.log(factorialLento(5)); // Calcula todo
console.log(factorialLento(5)); // Recupera de cache

// DECORADORES
function conLogging(funcion) {
    return function(...args) {
        console.log(\`Llamando \${funcion.name} con argumentos:\`, args);
        const inicio = performance.now();
        const resultado = funcion.apply(this, args);
        const fin = performance.now();
        console.log(\`\${funcion.name} retornó:\`, resultado, \`en \${fin - inicio}ms\`);
        return resultado;
    };
}

const sumarConLog = conLogging((a, b) => a + b);
console.log(sumarConLog(3, 4));
// "Llamando (anonymous) con argumentos: [3, 4]"
// "(anonymous) retornó: 7 en Xms"
// 7

// FUNCIÓN DE ORDEN SUPERIOR PARA VALIDACIÓN
function crearValidador(esquema) {
    return function(objeto) {
        const errores = [];
        
        for (let [campo, validacion] of Object.entries(esquema)) {
            if (!validacion(objeto[campo])) {
                errores.push(\`\${campo} no cumple la validación\`);
            }
        }
        
        return {
            valido: errores.length === 0,
            errores
        };
    };
}

const validarUsuario = crearValidador({
    nombre: val => val && val.length >= 2,
    edad: val => val >= 18,
    email: val => val && val.includes('@')
});

const usuario1 = { nombre: "Ana", edad: 25, email: "ana@test.com" };
const usuario2 = { nombre: "A", edad: 15, email: "invalido" };

console.log(validarUsuario(usuario1)); // {valido: true, errores: []}
console.log(validarUsuario(usuario2)); // {valido: false, errores: [...]}`,

    // EJEMPLO 13: RECURSIVIDAD
    recursion: `// RECURSIÓN
// Una función recursiva se llama a sí misma para resolver un problema

// FACTORIAL: 5! = 5 × 4 × 3 × 2 × 1 = 120
function factorial(n) {
    // CASO BASE: detiene la recursión
    if (n === 0 || n === 1) {
        return 1;
    }
    // CASO RECURSIVO: llama a la función misma
    return n * factorial(n - 1);
}

// Traza de ejecución para factorial(3):
// factorial(3) = 3 * factorial(2)
// factorial(2) = 2 * factorial(1)  
// factorial(1) = 1 (caso base)
// factorial(2) = 2 * 1 = 2
// factorial(3) = 3 * 2 = 6

console.log(factorial(3)); // 6
console.log(factorial(5)); // 120

// FIBONACCI: 0, 1, 1, 2, 3, 5, 8, 13...
function fibonacci(n) {
    // Casos base
    if (n === 0) return 0;
    if (n === 1) return 1;
    
    // Caso recursivo
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(6)); // 8 (0,1,1,2,3,5,8)

// RECURSIÓN CON ACUMULADOR (más eficiente)
function factorialAcumulador(n, acumulador = 1) {
    if (n <= 1) return acumulador;
    return factorialAcumulador(n - 1, n * acumulador);
}

console.log(factorialAcumulador(5)); // 120

// RECURSIÓN EN ESTRUCTURAS DE DATOS
function profundidadArbol(arbol) {
    if (!arbol || !arbol.hijos || arbol.hijos.length === 0) {
        return 1;
    }
    
    let maxProfundidad = 0;
    for (let hijo of arbol.hijos) {
        maxProfundidad = Math.max(maxProfundidad, profundidadArbol(hijo));
    }
    
    return 1 + maxProfundidad;
}

const arbol = {
    valor: "raiz",
    hijos: [
        {
            valor: "hijo1",
            hijos: [
                { valor: "nieto1", hijos: [] },
                { valor: "nieto2", hijos: [
                    { valor: "bisnieto", hijos: [] }
                ]}
            ]
        },
        {
            valor: "hijo2", 
            hijos: []
        }
    ]
};

console.log(profundidadArbol(arbol)); // 4

// BÚSQUEDA BINARIA RECURSIVA
function busquedaBinaria(arr, objetivo, inicio = 0, fin = arr.length - 1) {
    // Caso base: elemento no encontrado
    if (inicio > fin) return -1;
    
    const medio = Math.floor((inicio + fin) / 2);
    
    // Caso base: elemento encontrado
    if (arr[medio] === objetivo) return medio;
    
    // Casos recursivos
    if (arr[medio] > objetivo) {
        return busquedaBinaria(arr, objetivo, inicio, medio - 1);
    } else {
        return busquedaBinaria(arr, objetivo, medio + 1, fin);
    }
}

const numerosOrdenados = [1, 3, 5, 7, 9, 11, 13, 15];
console.log(busquedaBinaria(numerosOrdenados, 7));  // 3
console.log(busquedaBinaria(numerosOrdenados, 10)); // -1

// RECURSIÓN PARA TRANSFORMAR ESTRUCTURAS
function aplanarArray(arr) {
    let resultado = [];
    
    for (let elemento of arr) {
        if (Array.isArray(elemento)) {
            resultado = resultado.concat(aplanarArray(elemento));
        } else {
            resultado.push(elemento);
        }
    }
    
    return resultado;
}

const arrayAnidado = [1, [2, [3, 4], 5], 6];
console.log(aplanarArray(arrayAnidado)); // [1, 2, 3, 4, 5, 6]

// CONTROLES PARA EVITAR RECURSIÓN INFINITA
function recursionSegura(n, profundidad = 0, maxProfundidad = 1000) {
    if (profundidad > maxProfundidad) {
        throw new Error("Profundidad de recursión máxima excedida");
    }
    
    // Caso base
    if (n <= 0) return 0;
    
    // Caso recursivo con control de profundidad
    return n + recursionSegura(n - 1, profundidad + 1, maxProfundidad);
}

try {
    console.log(recursionSegura(5)); // 15
    console.log(recursionSegura(10000)); // Error
} catch (error) {
    console.error(error.message);
}`,

    // EJEMPLO 14: SISTEMA COMPLETO
    ejemploCompleto: `// === SISTEMA DE TIENDA CON FUNCIONES ===

// 1. Factory Function para crear productos
function crearProducto(nombre, precio, stock = 0) {
    return {
        nombre,
        precio,
        stock,
        
        // Métodos
        vender: function(cantidad) {
            if (this.stock >= cantidad) {
                this.stock -= cantidad;
                return \`Vendidos \${cantidad} unidades de \${this.nombre}\`;
            } else {
                return "Stock insuficiente";
            }
        },
        
        reponer: function(cantidad) {
            this.stock += cantidad;
            return \`Repuestas \${cantidad} unidades de \${this.nombre}\`;
        },
        
        aplicarDescuento: function(porcentaje) {
            const descuento = this.precio * (porcentaje / 100);
            this.precio -= descuento;
            return \`Descuento aplicado: $\${descuento.toFixed(2)}\`;
        },
        
        obtenerInfo: function() {
            return \`\${this.nombre} - $\${this.precio} (Stock: \${this.stock})\`;
        }
    };
}

// 2. Función de orden superior para procesar inventario
function procesarInventario(productos, operacion) {
    const resultados = [];
    for (let producto of productos) {
        resultados.push(operacion(producto));
    }
    return resultados;
}

// 3. Funciones para usar como callbacks
const obtenerNombres = producto => producto.nombre;
const aplicarDescuento = producto => {
    return {
        ...producto,
        precio: producto.precio * 0.9 // 10% de descuento
    };
};

const esCaro = producto => producto.precio > 100;

// 4. Closure para generar IDs únicos
function crearGeneradorId(prefixo = "PROD") {
    let contador = 0;
    
    return function() {
        contador++;
        return \`\${prefixo}_\${contador.toString().padStart(3, '0')}\`;
    };
}

// 5. Función recursiva para buscar producto
function buscarProducto(productos, nombre, indice = 0) {
    // Caso base: producto no encontrado
    if (indice >= productos.length) {
        return null;
    }
    
    // Caso base: producto encontrado
    if (productos[indice].nombre === nombre) {
        return productos[indice];
    }
    
    // Caso recursivo: buscar en siguiente posición
    return buscarProducto(productos, nombre, indice + 1);
}

// 6. Función de validación con parámetros por defecto
function validarProducto(nombre, precio, stock = 0, categoria = "general") {
    const errores = [];
    
    if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
        errores.push("Nombre inválido");
    }
    
    if (typeof precio !== 'number' || precio <= 0) {
        errores.push("Precio debe ser un número positivo");
    }
    
    if (typeof stock !== 'number' || stock < 0) {
        errores.push("Stock no puede ser negativo");
    }
    
    const categoriasValidas = ["general", "electrónica", "ropa", "hogar"];
    if (!categoriasValidas.includes(categoria)) {
        errores.push("Categoría no válida");
    }
    
    return {
        valido: errores.length === 0,
        errores,
        producto: { nombre: nombre.trim(), precio, stock, categoria }
    };
}

// 7. Función de orden superior para crear filtros
function crearFiltroPorPropiedad(propiedad, valor) {
    return function(producto) {
        return producto[propiedad] === valor;
    };
}

// 8. Composición de funciones
function pipe(...funciones) {
    return function(valorInicial) {
        return funciones.reduce((valor, funcion) => funcion(valor), valorInicial);
    };
}

// 9. Función memoizada para cálculos costosos
const calcularImpuestos = (function() {
    const cache = new Map();
    
    return function(precio, tasa = 0.21) {
        const clave = \`\${precio}_\${tasa}\`;
        
        if (cache.has(clave)) {
            console.log("Usando cache para impuestos");
            return cache.get(clave);
        }
        
        console.log("Calculando impuestos...");
        const impuesto = precio * tasa;
        const total = precio + impuesto;
        const resultado = { impuesto, total };
        
        cache.set(clave, resultado);
        return resultado;
    };
})();

// 10. Función recursiva para categorizar productos
function categorizarProductos(productos, categoria = "", nivel = 0) {
    let resultado = "";
    const indentacion = "  ".repeat(nivel);
    
    if (categoria) {
        resultado += \`\${indentacion}Categoría: \${categoria}\\n\`;
    }
    
    const productosFiltrados = categoria 
        ? productos.filter(p => p.categoria === categoria)
        : productos;
    
    for (let producto of productosFiltrados) {
        resultado += \`\${indentacion}- \${producto.obtenerInfo()}\\n\`;
    }
    
    // Recursión para subcategorías si existieran
    if (nivel === 0) {
        const categorias = [...new Set(productos.map(p => p.categoria))];
        for (let cat of categorias) {
            if (cat !== categoria) {
                resultado += categorizarProductos(productos, cat, nivel + 1);
            }
        }
    }
    
    return resultado;
}

// === USO DEL SISTEMA ===
const generarId = crearGeneradorId();

// Crear productos usando factory function
const productos = [
    crearProducto("Laptop", 1000, 5),
    crearProducto("Mouse", 25, 20),
    crearProducto("Teclado", 75, 15),
    crearProducto("Monitor", 300, 8),
    crearProducto("Auriculares", 50, 30)
];

// Asignar categorías
productos[0].categoria = "electrónica";
productos[1].categoria = "electrónica";
productos[2].categoria = "electrónica";
productos[3].categoria = "electrónica";
productos[4].categoria = "electrónica";

console.log("=== INVENTARIO INICIAL ===");
productos.forEach(p => console.log(p.obtenerInfo()));

console.log("\\n=== VENTAS ===");
console.log(productos[0].vender(2)); // Vendidos 2 unidades de Laptop
console.log(productos[1].vender(25)); // Stock insuficiente
console.log(productos[1].vender(5)); // Vendidos 5 unidades de Mouse

console.log("\\n=== PROCESAR INVENTARIO ===");
const nombres = procesarInventario(productos, obtenerNombres);
console.log("Nombres:", nombres);

const productosCaros = procesarInventario(productos, p => esCaro(p) ? p : null)
    .filter(p => p !== null);
console.log("Productos caros:", productosCaros.map(p => p.nombre));

console.log("\\n=== BÚSQUEDA RECURSIVA ===");
const encontrado = buscarProducto(productos, "Teclado");
console.log("Producto encontrado:", encontrado?.obtenerInfo());

console.log("\\n=== VALIDACIÓN ===");
const validacion = validarProducto("Nuevo Producto", 50, 10, "electrónica");
console.log("Validación:", validacion);

console.log("\\n=== FILTROS DINÁMICOS ===");
const filtroPorPrecio = crearFiltroPorPropiedad("precio", 25);
const productosFiltrados = productos.filter(filtroPorPrecio);
console.log("Productos de $25:", productosFiltrados.map(p => p.nombre));

console.log("\\n=== COMPOSICIÓN ===");
const procesarYFormatear = pipe(
    p => ({ ...p, precio: p.precio * 0.8 }), // 20% descuento
    p => \`\${p.nombre} - $\${p.precio.toFixed(2)}\`
);
const productosProcesados = productos.map(procesarYFormatear);
console.log("Productos procesados:", productosProcesados);

console.log("\\n=== MEMOIZACIÓN IMPUESTOS ===");
console.log(calcularImpuestos(100)); // Calculando...
console.log(calcularImpuestos(100)); // Usando cache...
console.log(calcularImpuestos(200)); // Calculando...

console.log("\\n=== CATEGORIZACIÓN RECURSIVA ===");
console.log(categorizarProductos(productos));

console.log("\\n=== REPOSICIÓN Y DESCUENTOS ===");
console.log(productos[0].reponer(3)); // Repuestas 3 unidades de Laptop
console.log(productos[0].aplicarDescuento(10)); // Descuento aplicado: $100.00

console.log("\\n=== INVENTARIO FINAL ===");
productos.forEach(p => console.log(p.obtenerInfo()));

console.log("\\n=== GENERACIÓN DE IDs ===");
console.log("ID 1:", generarId()); // PROD_001
console.log("ID 2:", generarId()); // PROD_002
console.log("ID 3:", generarId()); // PROD_003

// 11. Función de orden superior para crear reportes
function crearGeneradorReporte(titulo) {
    return function(datos) {
        console.log(\`=== \${titulo} ===\`);
        console.log(\`Fecha: \${new Date().toLocaleDateString()}\`);
        console.log(\`Total items: \${datos.length}\`);
        
        if (datos.length > 0 && typeof datos[0] === 'object') {
            const totalValor = datos.reduce((sum, item) => sum + (item.precio * item.stock), 0);
            console.log(\`Valor total inventario: $\${totalValor.toFixed(2)}\`);
        }
        
        datos.forEach((item, index) => {
            if (typeof item === 'object' && item.obtenerInfo) {
                console.log(\`\${index + 1}. \${item.obtenerInfo()}\`);
            } else {
                console.log(\`\${index + 1}. \${item}\`);
            }
        });
    };
}

const generarReporteInventario = crearGeneradorReporte("REPORTE DE INVENTARIO");
console.log("\\n=== REPORTE FINAL ===\\n");
generarReporteInventario(productos);`
  };

  return (
    <div className="guia-contenido">
      <header className="guia-header">
        <h1>Funciones en JavaScript - Guía Completa</h1>
        <div className="guia-meta">
          <span className="nivel">Intermedio-Avanzado</span>
          <span className="tiempo">90-120 minutos</span>
          <span className="temas">14 temas principales</span>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <div className="guia-contenido-principal">
        
        {/* SECCIÓN 1: CONCEPTOS BÁSICOS */}
        <section className="guia-seccion">
          <h2>¿Qué son las Funciones en JavaScript?</h2>
          
          <div className="concepto-card">
            <div className="concepto-content">
              <h3>🧩 Bloques de Código Reutilizables</h3>
              <p>Una función es un bloque de código reutilizable que realiza una tarea específica. Se ejecuta cuando es "invocada" o "llamada".</p>
              
              <div className="lista-conceptos">
                <h4>🔧 Anatomía de una Función:</h4>
                <ul>
                  <li><strong>Nombre:</strong> Identificador único (opcional en expresiones)</li>
                  <li><strong>Parámetros:</strong> Variables que reciben valores de entrada</li>
                  <li><strong>Cuerpo:</strong> Bloque de código entre { } que realiza la tarea</li>
                  <li><strong>Return:</strong> Especifica el valor de salida (opcional)</li>
                  <li><strong>Contexto (this):</strong> Referencia al objeto que la contiene</li>
                </ul>
              </div>

              <div className="analogia">
                <h4>🍳 Analogía de Cocina</h4>
                <div className="analogia-grid">
                  <div className="analogia-item">
                    <span className="emoji">📝</span>
                    <strong>Receta</strong>
                    <span>Función</span>
                  </div>
                  <div className="analogia-item">
                    <span className="emoji">🥕</span>
                    <strong>Ingredientes</strong>
                    <span>Parámetros</span>
                  </div>
                  <div className="analogia-item">
                    <span className="emoji">👨‍🍳</span>
                    <strong>Pasos</strong>
                    <span>Código</span>
                  </div>
                  <div className="analogia-item">
                    <span className="emoji">🍽️</span>
                    <strong>Plato Terminado</strong>
                    <span>Return</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="codigo-contenedor">
            <div className="codigo-header">
              <span>Ejemplo 1: Conceptos Básicos y Funciones como Ciudadanos de Primera Clase</span>
              <button 
                className={`btn-copiar ${copiado === 'queEsFuncion' ? 'copiado' : ''}`}
                onClick={() => copiarCodigo(ejemplosCodigo.queEsFuncion, 'queEsFuncion')}
              >
                {copiado === 'queEsFuncion' ? '✓ Copiado' : '📋 Copiar'}
              </button>
            </div>
            <pre className="codigo-ejemplo">
              <code>{ejemplosCodigo.queEsFuncion}</code>
            </pre>
          </div>

          <div className="beneficios-grid">
            <div className="beneficio-card">
              <div className="beneficio-icono">🔄</div>
              <h4>Reutilización</h4>
              <p>Escribe una vez, usa muchas veces. Reduce duplicación de código.</p>
            </div>
            <div className="beneficio-card">
              <div className="beneficio-icono">🧩</div>
              <h4>Modularidad</h4>
              <p>Divide problemas complejos en partes manejables.</p>
            </div>
            <div className="beneficio-card">
              <div className="beneficio-icono">🔧</div>
              <h4>Mantenibilidad</h4>
              <p>Cambios en un solo lugar afectan toda la aplicación.</p>
            </div>
            <div className="beneficio-card">
              <div className="beneficio-icono">🧪</div>
              <h4>Testabilidad</h4>
              <p>Unidades individuales fáciles de probar y depurar.</p>
            </div>
            <div className="beneficio-card">
              <div className="beneficio-icono">📖</div>
              <h4>Legibilidad</h4>
              <p>Código más fácil de entender y mantener.</p>
            </div>
            <div className="beneficio-card">
              <div className="beneficio-icono">🏗️</div>
              <h4>Modularidad</h4>
              <p>Permite construir sistemas complejos a partir de partes simples.</p>
            </div>
          </div>

          <div className="nota-importante">
            <h4>💡 Funciones como Ciudadanos de Primera Clase</h4>
            <p>En JavaScript, las funciones son objetos y pueden ser:</p>
            <ul>
              <li><strong>Asignadas a variables</strong> - Como cualquier otro valor</li>
              <li><strong>Pasadas como argumentos</strong> - A otras funciones (callbacks)</li>
              <li><strong>Retornadas desde otras funciones</strong> - (Higher-order functions)</li>
              <li><strong>Almacenadas en estructuras de datos</strong> - Arrays, objetos, etc.</li>
            </ul>
            <p>Esta característica hace que JavaScript sea ideal para la programación funcional.</p>
          </div>

          <div className="nota-importante">
            <h4>💡 Principio DRY (Don't Repeat Yourself)</h4>
            <p><strong>"No te repitas"</strong> es uno de los principios fundamentales del desarrollo de software. Las funciones son tu mejor herramienta para aplicar este principio, permitiéndote escribir código una vez y reutilizarlo múltiples veces, haciendo tu código más mantenible y menos propenso a errores.</p>
          </div>
        </section>

        {/* SECCIÓN 2: DECLARACIÓN DE FUNCIONES */}
        <section className="guia-seccion">
          <h2>Formas de Declarar Funciones</h2>
          
          <div className="concepto-card">
            <div className="concepto-content">
              <h3>🎭 Tres Enfoques Principales</h3>
              <p>JavaScript ofrece diferentes sintaxis para crear funciones, cada una con sus propias características, ventajas y casos de uso recomendados.</p>
            </div>
          </div>

          <h3>1. Declaración de Función (Function Declaration)</h3>
          <div className="codigo-contenedor">
            <div className="codigo-header">
              <span>Ejemplo 2: Declaración de Función - Hoisting y Arguments</span>
              <button 
                className={`btn-copiar ${copiado === 'declaracionFuncion' ? 'copiado' : ''}`}
                onClick={() => copiarCodigo(ejemplosCodigo.declaracionFuncion, 'declaracionFuncion')}
              >
                {copiado === 'declaracionFuncion' ? '✓ Copiado' : '📋 Copiar'}
              </button>
            </div>
            <pre className="codigo-ejemplo">
              <code>{ejemplosCodigo.declaracionFuncion}</code>
            </pre>
          </div>

          <div className="nota-importante">
            <h4>🔍 Características de Function Declaration:</h4>
            <ul>
              <li><strong>Tienen nombre</strong> - Identificador obligatorio</li>
              <li><strong>Sufren HOISTING</strong> - Se pueden llamar antes de declararlas</li>
              <li><strong>Ideales para funciones principales</strong> - Del programa</li>
              <li><strong>Se pueden usar como constructores</strong> - Con 'new'</li>
              <li><strong>Tienen acceso al objeto 'arguments'</strong> - Similar array con todos los argumentos</li>
              <li><strong>Tienen propiedad 'prototype'</strong> - Para métodos compartidos</li>
            </ul>
          </div>

          <h3>2. Expresión de Función (Function Expression)</h3>
          <div className="codigo-contenedor">
            <div className="codigo-header">
              <span>Ejemplo 3: Expresión de Función - Flexibilidad y IIFE</span>
              <button 
                className={`btn-copiar ${copiado === 'expresionFuncion' ? 'copiado' : ''}`}
                onClick={() => copiarCodigo(ejemplosCodigo.expresionFuncion, 'expresionFuncion')}
              >
                {copiado === 'expresionFuncion' ? '✓ Copiado' : '📋 Copiar'}
              </button>
            </div>
            <pre className="codigo-ejemplo">
              <code>{ejemplosCodigo.expresionFuncion}</code>
            </pre>
          </div>

          <div className="nota-importante">
            <h4>🔍 Características de Function Expression:</h4>
            <ul>
              <li><strong>La función puede ser anónima o con nombre</strong> - Flexibilidad en naming</li>
              <li><strong>NO sufren hoisting</strong> - No se pueden usar antes de declarar</li>
              <li><strong>Útiles para callbacks y asignaciones condicionales</strong> - Mayor flexibilidad</li>
              <li><strong>Pueden ser auto-ejecutadas (IIFE)</strong> - Immediately Invoked Function Expression</li>
              <li><strong>Más control sobre el scope</strong> - Se definen en el punto de ejecución</li>
            </ul>
          </div>

          <h3>3. Función Flecha (Arrow Function)</h3>
          <div className="codigo-contenedor">
            <div className="codigo-header">
              <span>Ejemplo 4: Arrow Function - Sintaxis Concisa y this Léxico</span>
              <button 
                className={`btn-copiar ${copiado === 'arrowFunction' ? 'copiado' : ''}`}
                onClick={() => copiarCodigo(ejemplosCodigo.arrowFunction, 'arrowFunction')}
              >
                {copiado === 'arrowFunction' ? '✓ Copiado' : '📋 Copiar'}
              </button>
            </div>
            <pre className="codigo-ejemplo">
              <code>{ejemplosCodigo.arrowFunction}</code>
            </pre>
          </div>

          <div className="nota-importante">
            <h4>🔍 Características de Arrow Functions:</h4>
            <ul>
              <li><strong>Sintaxis más corta y legible</strong> - Menos código boilerplate</li>
              <li><strong>NO tienen su propio 'this'</strong> - Heredan el 'this' del contexto exterior</li>
              <li><strong>NO tienen objeto 'arguments'</strong> - Usar rest parameters en su lugar</li>
              <li><strong>NO pueden ser constructores</strong> - No usar con 'new'</li>
              <li><strong>NO tienen propiedad 'prototype'</strong> - No para uso con 'new'</li>
              <li><strong>IDEALES para funciones cortas y callbacks</strong> - Sintaxis concisa</li>
              <li><strong>Return implícito</strong> - Para expresiones simples de una línea</li>
            </ul>
          </div>

          <div className="tabla-contenedor">
            <h4>📊 Comparación Completa de Tipos de Funciones</h4>
            <table className="tabla-guia">
              <thead>
                <tr>
                  <th>Característica</th>
                  <th>Declaración</th>
                  <th>Expresión</th>
                  <th>Flecha</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Hoisting</td>
                  <td>✅ Completo</td>
                  <td>❌ No (solo la variable)</td>
                  <td>❌ No</td>
                </tr>
                <tr>
                  <td>this</td>
                  <td>✅ Dinámico</td>
                  <td>✅ Dinámico</td>
                  <td>✅ Léxico (heredado)</td>
                </tr>
                <tr>
                  <td>arguments</td>
                  <td>✅ Sí</td>
                  <td>✅ Sí</td>
                  <td>❌ No</td>
                </tr>
                <tr>
                  <td>Constructor</td>
                  <td>✅ Sí (con new)</td>
                  <td>✅ Sí (con new)</td>
                  <td>❌ No</td>
                </tr>
                <tr>
                  <td>prototype</td>
                  <td>✅ Sí</td>
                  <td>✅ Sí</td>
                  <td>❌ No</td>
                </tr>
                <tr>
                  <td>Nombre</td>
                  <td>Obligatorio</td>
                  <td>Opcional</td>
                  <td>Anónima</td>
                </tr>
                <tr>
                  <td>Sintaxis</td>
                  <td>function name() {}</td>
                  <td>const name = function() {}</td>
                  <td>const name = () =&gt; {}</td>
                </tr>
                <tr>
                  <td>Uso Recomendado</td>
                  <td>Funciones principales</td>
                  <td>Callbacks, asignaciones</td>
                  <td>Callbacks, funciones cortas</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mejores-practicas">
            <h4>🎯 Mejores Prácticas en la Declaración</h4>
            <ul>
              <li><strong>Usa declaraciones</strong> para funciones principales y reutilizables</li>
              <li><strong>Usa expresiones</strong> para callbacks y asignaciones condicionales</li>
              <li><strong>Usa arrow functions</strong> para funciones cortas y callbacks</li>
              <li><strong>Nombra tus funciones</strong> para mejor debugging (incluso en expresiones)</li>
              <li><strong>Evita el hoisting</strong> como característica, declara antes de usar</li>
              <li><strong>Considera el contexto de 'this'</strong> al elegir entre tradicional y flecha</li>
              <li><strong>Usa IIFE</strong> para crear scope privado y evitar contaminación global</li>
            </ul>
          </div>
        </section>

        {/* SECCIÓN 3: PARÁMETROS Y ARGUMENTOS */}
        <section className="guia-seccion">
          <h2>Parámetros y Argumentos</h2>
          
          <div className="concepto-card">
            <div className="concepto-content">
              <h3>🎛️ Comunicación con las Funciones</h3>
              <p>Los parámetros permiten que las funciones sean flexibles y trabajen con diferentes datos de entrada. JavaScript ofrece varias formas avanzadas de manejar parámetros.</p>
              
              <h4>📝 Definiciones Clave:</h4>
              <ul>
                <li><strong>Parámetros:</strong> Variables en la definición de la función</li>
                <li><strong>Argumentos:</strong> Valores reales pasados cuando se llama la función</li>
                <li><strong>Parámetros por defecto:</strong> Valores predeterminados si no se proporciona argumento</li>
                <li><strong>Rest parameters:</strong> Capturan múltiples argumentos como array</li>
                <li><strong>Destructuring:</strong> Extraer valores de objetos/arrays directamente en parámetros</li>
              </ul>
            </div>
          </div>

          <h3>Parámetros Básicos y Validación</h3>
          <div className="codigo-contenedor">
            <div className="codigo-header">
              <span>Ejemplo 5: Parámetros Básicos y Defensa Robusta</span>
              <button 
                className={`btn-copiar ${copiado === 'parametrosBasicos' ? 'copiado' : ''}`}
                onClick={() => copiarCodigo(ejemplosCodigo.parametrosBasicos, 'parametrosBasicos')}
              >
                {copiado === 'parametrosBasicos' ? '✓ Copiado' : '📋 Copiar'}
              </button>
            </div>
            <pre className="codigo-ejemplo">
              <code>{ejemplosCodigo.parametrosBasicos}</code>
            </pre>
          </div>

          <h3>Parámetros por Defecto Avanzados</h3>
          <div className="codigo-contenedor">
            <div className="codigo-header">
              <span>Ejemplo 6: Parámetros por Defecto - Valores Predeterminados y Expresiones</span>
              <button 
                className={`btn-copiar ${copiado === 'parametrosDefault' ? 'copiado' : ''}`}
                onClick={() => copiarCodigo(ejemplosCodigo.parametrosDefault, 'parametrosDefault')}
              >
                {copiado === 'parametrosDefault' ? '✓ Copiado' : '📋 Copiar'}
              </button>
            </div>
            <pre className="codigo-ejemplo">
              <code>{ejemplosCodigo.parametrosDefault}</code>
            </pre>
          </div>

          <h3>Parámetros Rest y Operador Spread</h3>
          <div className="codigo-contenedor">
            <div className="codigo-header">
              <span>Ejemplo 7: Parámetros Rest - Múltiples Argumentos y Diferencias con Arguments</span>
              <button 
                className={`btn-copiar ${copiado === 'restParameters' ? 'copiado' : ''}`}
                onClick={() => copiarCodigo(ejemplosCodigo.restParameters, 'restParameters')}
              >
                {copiado === 'restParameters' ? '✓ Copiado' : '📋 Copiar'}
              </button>
            </div>
            <pre className="codigo-ejemplo">
              <code>{ejemplosCodigo.restParameters}</code>
            </pre>
          </div>

          <div className="patrones-avanzados">
            <h4>🔧 Patrones Avanzados de Parámetros</h4>
            
            <div className="patron-grid">
              <div className="patron-card">
                <h5>Destructuring en Parámetros</h5>
                <pre><code>{`function procesarUsuario({nombre, edad, ciudad = "Desconocida"}) {
  return \`\${nombre} (\${edad}) - \${ciudad}\`;
}`}</code></pre>
                <p>Extrae propiedades de objetos directamente en los parámetros.</p>
              </div>
              
              <div className="patron-card">
                <h5>Parámetros con Validation</h5>
                <pre><code>{`function crearCuenta(email, contraseña) {
  if (!email.includes('@')) 
    throw new Error('Email inválido');
  if (contraseña.length < 8) 
    throw new Error('Contraseña muy corta');
  return { email, contraseña };
}`}</code></pre>
                <p>Valida argumentos al inicio de la función.</p>
              </div>
              
              <div className="patron-card">
                <h5>Options Object Pattern</h5>
                <pre><code>{`function configurarAPI({
  url, 
  timeout = 5000, 
  retries = 3
}) {
  return { url, timeout, retries };
}`}</code></pre>
                <p>Objeto de opciones para muchos parámetros opcionales.</p>
              </div>
            </div>
          </div>

          <div className="nota-advertencia">
            <h4>⚠️ Diferencias Clave: Rest Parameters vs Arguments</h4>
            <ul>
              <li><strong>Rest parameters son arrays reales</strong> - Pueden usar métodos como map, filter</li>
              <li><strong>Arguments es un objeto similar array</strong> - No tiene métodos de array</li>
              <li><strong>Rest parameters son explícitos</strong> - Aparecen en la definición</li>
              <li><strong>Arguments es implícito</strong> - Disponible en todas las funciones (no arrow)</li>
              <li><strong>Rest parameters capturan solo los "sobrantes"</strong> - Después de parámetros normales</li>
              <li><strong>Arguments contiene todos los argumentos</strong> - Incluyendo los nombrados</li>
            </ul>
          </div>
        </section>

        {/* SECCIÓN 4: VALORES DE RETORNO */}
        <section className="guia-seccion">
          <h2>Valores de Retorno</h2>
          
          <div className="concepto-card">
            <div className="concepto-content">
              <h3>📤 Devolviendo Resultados</h3>
              <p>El return es la forma en que las funciones comunican sus resultados al código que las llamó. JavaScript ofrece varias estrategias para manejar valores de retorno.</p>
              
              <h4>🎯 Comportamiento del Return:</h4>
              <ul>
                <li><strong>Return detiene la ejecución</strong> - El código después del return no se ejecuta</li>
                <li><strong>Sin return = undefined</strong> - Si no hay return explícito, la función devuelve undefined</li>
                <li><strong>Solo un valor</strong> - JavaScript solo permite retornar un valor, pero puede ser un objeto o array</li>
                <li><strong>Return temprano</strong> - Puedes usar múltiples returns para diferentes casos (guard clauses)</li>
                <li><strong>Return implícito</strong> - Arrow functions pueden retornar sin la palabra return</li>
              </ul>
            </div>
          </div>

          <h3>Return Básico y Guard Clauses</h3>
          <div className="codigo-contenedor">
            <div className="codigo-header">
              <span>Ejemplo 8: Return Básico - Sentencia Return y Retornos Tempranos</span>
              <button 
                className={`btn-copiar ${copiado === 'returnBasico' ? 'copiado' : ''}`}
                onClick={() => copiarCodigo(ejemplosCodigo.returnBasico, 'returnBasico')}
              >
                {copiado === 'returnBasico' ? '✓ Copiado' : '📋 Copiar'}
              </button>
            </div>
            <pre className="codigo-ejemplo">
              <code>{ejemplosCodigo.returnBasico}</code>
            </pre>
          </div>

          <h3>Múltiples Valores y Retornos Avanzados</h3>
          <div className="codigo-contenedor">
            <div className="codigo-header">
              <span>Ejemplo 9: Return Múltiples Valores - Retornar Múltiples Datos y Tipos Diferentes</span>
              <button 
                className={`btn-copiar ${copiado === 'returnMultiples' ? 'copiado' : ''}`}
                onClick={() => copiarCodigo(ejemplosCodigo.returnMultiples, 'returnMultiples')}
              >
                {copiado === 'returnMultiples' ? '✓ Copiado' : '📋 Copiar'}
              </button>
            </div>
            <pre className="codigo-ejemplo">
              <code>{ejemplosCodigo.returnMultiples}</code>
            </pre>
          </div>

          <div className="nota-exito">
            <h4>🎯 Estrategias para Retornar Múltiples Valores</h4>
            <ul>
              <li><strong>Objetos</strong> - Para datos con significado semántico (recomendado)</li>
              <li><strong>Arrays</strong> - Para valores del mismo tipo, usar con destructuring</li>
              <li><strong>Tuplas</strong> - Arrays con posición fija para diferentes tipos</li>
              <li><strong>Funciones</strong> - Retornar closures para comportamiento especializado</li>
              <li><strong>Promesas</strong> - Para operaciones asíncronas</li>
              <li><strong>Iteradores</strong> - Para secuencias de valores</li>
            </ul>
          </div>

          <div className="mejores-practicas">
            <h4>💡 Mejores Prácticas con Return</h4>
            <ul>
              <li><strong>Usa guard clauses</strong> para manejar casos especiales temprano</li>
              <li><strong>Retorna consistentemente</strong> el mismo tipo de dato</li>
              <li><strong>Documenta el valor de retorno</strong> con JSDoc</li>
              <li><strong>Evita efectos secundarios</strong> en funciones que retornan valores</li>
              <li><strong>Considera funciones puras</strong> cuando sea posible</li>
              <li><strong>Usa destructuring</strong> para trabajar con múltiples valores retornados</li>
            </ul>
          </div>
        </section>

        {/* SECCIÓN 5: SCOPE Y CLOSURES */}
        <section className="guia-seccion">
          <h2>Scope y Closures</h2>
          
          <div className="concepto-card">
            <div className="concepto-content">
              <h3>🏗️ Alcance de Variables y Funciones que Recuerdan</h3>
              <p>El scope determina dónde las variables son accesibles en tu código. Las closures son funciones que "recuerdan" el entorno en el que fueron creadas.</p>
              
              <h4>📋 Tipos de Scope en JavaScript:</h4>
              <ul>
                <li><strong>Global:</strong> Accesible desde cualquier parte del código</li>
                <li><strong>Función (Local):</strong> Solo accesible dentro de la función</li>
                <li><strong>Bloque:</strong> Accesible dentro de { } (con let/const desde ES6)</li>
                <li><strong>Módulo:</strong> Scope de archivos ES6 modules</li>
              </ul>

              <h4>🔗 Scope Chain (Cadena de Alcance):</h4>
              <p>Cuando se accede a una variable, JavaScript busca en el scope actual, luego en el scope exterior, y así sucesivamente hasta llegar al scope global.</p>

              <h4>🔒 Closures (Clausuras):</h4>
              <p>Una función que tiene acceso a variables de su función exterior incluso después de que la función exterior haya terminado de ejecutarse.</p>
            </div>
          </div>

          <h3>Scope de Variables</h3>
          <div className="codigo-contenedor">
            <div className="codigo-header">
              <span>Ejemplo 10: Scope - Alcance, Cadena de Scope y Temporal Dead Zone</span>
              <button 
                className={`btn-copiar ${copiado === 'scopeVariables' ? 'copiado' : ''}`}
                onClick={() => copiarCodigo(ejemplosCodigo.scopeVariables, 'scopeVariables')}
              >
                {copiado === 'scopeVariables' ? '✓ Copiado' : '📋 Copiar'}
              </button>
            </div>
            <pre className="codigo-ejemplo">
              <code>{ejemplosCodigo.scopeVariables}</code>
            </pre>
          </div>

          <h3>Closures</h3>
          <div className="codigo-contenedor">
            <div className="codigo-header">
              <span>Ejemplo 11: Closures - Funciones que Recuerdan y Data Privada</span>
              <button 
                className={`btn-copiar ${copiado === 'closures' ? 'copiado' : ''}`}
                onClick={() => copiarCodigo(ejemplosCodigo.closures, 'closures')}
              >
                {copiado === 'closures' ? '✓ Copiado' : '📋 Copiar'}
              </button>
            </div>
            <pre className="codigo-ejemplo">
              <code>{ejemplosCodigo.closures}</code>
            </pre>
          </div>

          <div className="nota-exito">
            <h4>🎯 Aplicaciones Prácticas de Closures</h4>
            <ul>
              <li><strong>Variables privadas:</strong> Encapsular datos que no deben ser accesibles directamente</li>
              <li><strong>Factory functions:</strong> Crear objetos con estado interno</li>
              <li><strong>Módulos:</strong> Implementar el patrón módulo antes de ES6</li>
              <li><strong>Callbacks con estado:</strong> Mantener contexto en funciones asíncronas</li>
              <li><strong>Memorización:</strong> Cachear resultados de funciones costosas</li>
              <li><strong>Currying:</strong> Transformar funciones multi-parámetro en cadena de funciones</li>
              <li><strong>Partial Application:</strong> Fijar algunos argumentos de una función</li>
              <li><strong>Event Handlers:</strong> Mantener estado entre llamadas de evento</li>
            </ul>
          </div>

          <div className="nota-advertencia">
            <h4>⚠️ Consideraciones de Performance con Closures</h4>
            <ul>
              <li><strong>Memory leaks:</strong> Las closures mantienen referencias a variables externas</li>
              <li><strong>Garbage collection:</strong> Las variables capturadas no se liberan hasta que la closure se libere</li>
              <li><strong>Optimización:</strong> Algunos motores optimizan closures que no capturan variables externas</li>
              <li><strong>Debugging:</strong> Puede ser más difícil depurar código con muchas closures</li>
            </ul>
          </div>
        </section>

        {/* SECCIÓN 6: FUNCIONES DE ORDEN SUPERIOR */}
        <section className="guia-seccion">
          <h2>Funciones de Orden Superior</h2>
          
          <div className="concepto-card">
            <div className="concepto-content">
              <h3>🔄 Funciones que Trabajan con Funciones</h3>
              <p>Estas funciones aceptan otras funciones como argumentos o devuelven funciones como resultado, permitiendo un alto nivel de abstracción y reutilización.</p>
              
              <h4>🎯 Características Principales:</h4>
              <ul>
                <li><strong>Aceptan funciones como argumentos</strong> - Para personalizar comportamiento</li>
                <li><strong>Retornan funciones como resultado</strong> - Para crear comportamiento especializado</li>
                <li><strong>Permiten composición</strong> - Combinar funciones simples en comportamiento complejo</li>
                <li><strong>Facilitan el código declarativo</strong> - Decir "qué" en lugar de "cómo"</li>
              </ul>

              <h4>🏗️ Beneficios de la Programación Funcional:</h4>
              <ul>
                <li><strong>Abstracción:</strong> Ocultar detalles de implementación complejos</li>
                <li><strong>Reutilización:</strong> Comportamiento parametrizable y reutilizable</li>
                <li><strong>Composición:</strong> Combinar funciones simples para crear comportamiento complejo</li>
                <li><strong>Flexibilidad:</strong> Fácil de extender y modificar</li>
                <li><strong>Declaratividad:</strong> Código más expresivo y fácil de leer</li>
                <li><strong>Testabilidad:</strong> Funciones puras más fáciles de testear</li>
              </ul>
            </div>
          </div>

          <div className="codigo-contenedor">
            <div className="codigo-header">
              <span>Ejemplo 12: Funciones de Orden Superior - Composición, Memoización y Decoradores</span>
              <button 
                className={`btn-copiar ${copiado === 'ordenSuperior' ? 'copiado' : ''}`}
                onClick={() => copiarCodigo(ejemplosCodigo.ordenSuperior, 'ordenSuperior')}
              >
                {copiado === 'ordenSuperior' ? '✓ Copiado' : '📋 Copiar'}
              </button>
            </div>
            <pre className="codigo-ejemplo">
              <code>{ejemplosCodigo.ordenSuperior}</code>
            </pre>
          </div>

          <div className="patrones-avanzados">
            <h4>🔧 Patrones Comunes de Orden Superior</h4>
            
            <div className="patron-grid">
              <div className="patron-card">
                <h5>Decoradores</h5>
                <pre><code>{`function conLogging(fn) {
  return function(...args) {
    console.log('Llamando:', fn.name);
    return fn(...args);
  };
}`}</code></pre>
                <p>Añaden comportamiento a funciones existentes.</p>
              </div>
              
              <div className="patron-card">
                <h5>Memoización</h5>
                <pre><code>{`function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    return cache.has(key) ? 
      cache.get(key) : 
      cache.set(key, fn(...args)).get(key);
  };
}`}</code></pre>
                <p>Cachea resultados de funciones costosas.</p>
              </div>
              
              <div className="patron-card">
                <h5>Currying</h5>
                <pre><code>{`function curry(fn) {
  return function curried(...args) {
    return args.length >= fn.length ?
      fn(...args) :
      (...moreArgs) => curried(...args, ...moreArgs);
  };
}`}</code></pre>
                <p>Transforma funciones multi-argumento en cadena.</p>
              </div>
            </div>
          </div>

          <div className="resumen-practicas">
            <h4>📋 Aplicaciones en el Mundo Real</h4>
            <ul>
              <li><strong>Array methods:</strong> map, filter, reduce, forEach</li>
              <li><strong>Event handlers:</strong> Manejo de eventos en el DOM</li>
              <li><strong>Middleware:</strong> En frameworks como Express.js</li>
              <li><strong>Validación:</strong> Crear validadores reutilizables</li>
              <li><strong>Transformación de datos:</strong> Pipelines de procesamiento</li>
              <li><strong>Configuración:</strong> Crear configuradores flexibles</li>
              <li><strong>Testing:</strong> Crear assertions y matchers</li>
            </ul>
          </div>
        </section>

        {/* SECCIÓN 7: RECURSIÓN */}
        <section className="guia-seccion">
          <h2>Recursión</h2>
          
          <div className="concepto-card">
            <div className="concepto-content">
              <h3>🔄 Funciones que se Llaman a Sí Mismas</h3>
              <p>La recursión es una técnica poderosa para resolver problemas que pueden dividirse en subproblemas similares más pequeños. Es especialmente útil para estructuras de datos anidadas.</p>
              
              <h4>🎯 Componentes Esenciales:</h4>
              <ul>
                <li><strong>Caso Base:</strong> Condición que detiene la recursión</li>
                <li><strong>Caso Recursivo:</strong> Llamada a la función misma con parámetros modificados</li>
                <li><strong>Convergencia:</strong> Cada llamada debe acercarse al caso base</li>
              </ul>

              <h4>✅ Cuándo Usar Recursión:</h4>
              <ul>
                <li><strong>Estructuras de datos anidadas</strong> - Árboles, grafos, objetos anidados</li>
                <li><strong>Problemas matemáticos</strong> - Factorial, Fibonacci, torres de Hanoi</li>
                <li><strong>Algoritmos de búsqueda</strong> - Búsqueda binaria, backtracking</li>
                <li><strong>Problemas de división y conquista</strong> - Merge sort, quick sort</li>
              </ul>

              <h4>❌ Cuándo Evitar Recursión:</h4>
              <ul>
                <li><strong>Problemas con profundidad desconocida</strong> - Puede causar stack overflow</li>
                <li><strong>Problemas con soluciones iterativas simples</strong> - La iteración puede ser más eficiente</li>
                <li><strong>Ambientes con call stack limitado</strong> - Navegadores web, dispositivos móviles</li>
              </ul>
            </div>
          </div>

          <div className="codigo-contenedor">
            <div className="codigo-header">
              <span>Ejemplo 13: Recursividad - Básica y Avanzada</span>
              <button 
                className={`btn-copiar ${copiado === 'recursion' ? 'copiado' : ''}`}
                onClick={() => copiarCodigo(ejemplosCodigo.recursion, 'recursion')}
              >
                {copiado === 'recursion' ? '✓ Copiado' : '📋 Copiar'}
              </button>
            </div>
            <pre className="codigo-ejemplo">
              <code>{ejemplosCodigo.recursion}</code>
            </pre>
          </div>

          <div className="nota-advertencia">
            <h4>⚠️ Reglas de la Recursión</h4>
            <ul>
              <li><strong>Caso base obligatorio:</strong> Siempre debe existir una condición que detenga la recursión</li>
              <li><strong>Caso recursivo convergente:</strong> El problema debe poder dividirse en versiones más pequeñas de sí mismo</li>
              <li><strong>Convergencia garantizada:</strong> Cada llamada recursiva debe acercarse al caso base</li>
              <li><strong>Stack limit:</strong> Demasiadas llamadas recursivas pueden causar "stack overflow"</li>
              <li><strong>Optimización de cola:</strong> Algunos lenguajes optimizan recursion tail-call (no JavaScript)</li>
              <li><strong>Considera iteración:</strong> Para problemas simples, la iteración puede ser más eficiente</li>
            </ul>
          </div>

          <div className="patrones-avanzados">
            <h4>🔧 Tipos de Recursión</h4>
            
            <div className="patron-grid">
              <div className="patron-card">
                <h5>Recursión Directa</h5>
                <pre><code>{`function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`}</code></pre>
                <p>La función se llama a sí misma directamente.</p>
              </div>
              
              <div className="patron-card">
                <h5>Recursión con Acumulador</h5>
                <pre><code>{`function factorial(n, acc = 1) {
  if (n <= 1) return acc;
  return factorial(n - 1, n * acc);
}`}</code></pre>
                <p>Lleva el resultado parcial como parámetro.</p>
              </div>
              
              <div className="patron-card">
                <h5>Recursión Mutua</h5>
                <pre><code>{`function esPar(n) {
  if (n === 0) return true;
  return esImpar(n - 1);
}

function esImpar(n) {
  if (n === 0) return false;
  return esPar(n - 1);
}`}</code></pre>
                <p>Dos o más funciones se llaman entre sí.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 8: EJEMPLO COMPLETO INTEGRADO */}
        <section className="guia-seccion">
          <h2>Ejemplo Completo: Sistema de Tienda</h2>
          
          <div className="concepto-card">
            <div className="concepto-content">
              <h3>🛒 Integrando Todos los Conceptos</h3>
              <p>Este sistema demuestra cómo los diferentes tipos de funciones pueden trabajar juntos en una aplicación real, aplicando patrones y mejores prácticas.</p>
              
              <h4>🎯 Conceptos Aplicados en el Ejemplo:</h4>
              <ul>
                <li><strong>Factory functions:</strong> Para crear objetos producto con métodos encapsulados</li>
                <li><strong>Funciones de orden superior:</strong> Para procesar arrays de productos de forma declarativa</li>
                <li><strong>Closures:</strong> Para generar IDs únicos y mantener estado privado</li>
                <li><strong>Recursión:</strong> Para búsqueda eficiente en el array de productos</li>
                <li><strong>Arrow functions:</strong> Para callbacks concisos y legibles</li>
                <li><strong>Parámetros por defecto:</strong> Para valores predeterminados sensatos</li>
                <li><strong>Métodos de objeto:</strong> Funciones como propiedades de objetos</li>
                <li><strong>Validación robusta:</strong> Para asegurar la integridad de los datos</li>
                <li><strong>Composición de funciones:</strong> Para crear pipelines de procesamiento</li>
                <li><strong>Memoización:</strong> Para cachear cálculos costosos</li>
                <li><strong>Destructuring:</strong> Para trabajar con objetos de forma concisa</li>
                <li><strong>Rest parameters:</strong> Para funciones que aceptan múltiples argumentos</li>
              </ul>
            </div>
          </div>

          <div className="codigo-contenedor">
            <div className="codigo-header">
              <span>Ejemplo 14: Sistema Completo de Gestión de Tienda</span>
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
            <h4>🎯 Características del Sistema Implementado</h4>
            <ul>
              <li><strong>Encapsulación completa:</strong> Estado interno protegido mediante closures</li>
              <li><strong>Flexibilidad extensible:</strong> Nuevas funcionalidades fáciles de añadir</li>
              <li><strong>Validación robusta:</strong> Prevención de estados inválidos</li>
              <li><strong>Eficiencia optimizada:</strong> Cache para operaciones costosas</li>
              <li><strong>Código mantenible:</strong> Separación clara de responsabilidades</li>
              <li><strong>Interfaces fluidas:</strong> Métodos encadenables y composición</li>
              <li><strong>Error handling:</strong> Manejo graceful de casos edge</li>
              <li><strong>Performance:</strong> Operaciones optimizadas y memoización</li>
            </ul>
          </div>
        </section>
      </div>

      {/* RESUMEN FINAL Y PRÓXIMOS PASOS */}
      <section className="guia-seccion">
        <h2>Próximos Pasos</h2>
        <div className="proximos-pasos">
          <div className="paso-aprendizaje">
            <div className="paso-numero">6</div>
            <div className="paso-info">
              <h4>Arrays y Métodos</h4>
              <p>Aprenderás a trabajar con arrays, métodos funcionales como map, filter, reduce y manipulación avanzada de colecciones de datos.</p>
            </div>
          </div>
          <div className="paso-aprendizaje">
            <div className="paso-numero">7</div>
            <div className="paso-info">
              <h4>Objetos y POO</h4>
              <p>Profundizarás en objetos, clases, prototipos, herencia y programación orientada a objetos en JavaScript.</p>
            </div>
          </div>
          <div className="paso-aprendizaje">
            <div className="paso-numero">8</div>
            <div className="paso-info">
              <h4>DOM Manipulation</h4>
              <p>Aprenderás a manipular el Document Object Model para crear interfaces web dinámicas e interactivas.</p>
            </div>
          </div>
        </div>

        <div className="resumen-practicas">
          <h4>📋 Resumen de Funciones en JavaScript</h4>
          <ul>
            <li><strong>Declaración:</strong> <code>function</code>, expresiones, arrow functions, IIFE</li>
            <li><strong>Parámetros:</strong> valores por defecto, rest parameters, destructuring, arguments</li>
            <li><strong>Return:</strong> valores de retorno, múltiples valores, early returns, guard clauses</li>
            <li><strong>Scope:</strong> alcance léxico, closures, cadena de scope, temporal dead zone</li>
            <li><strong>Orden superior:</strong> funciones que reciben o retornan funciones, callbacks</li>
            <li><strong>Recursión:</strong> funciones que se llaman a sí mismas, casos base, acumuladores</li>
            <li><strong>Patrones:</strong> factory functions, composición, memoización, decoradores</li>
            <li><strong>this:</strong> contexto de ejecución, bind, call, apply, arrow functions vs tradicionales</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Guia_5;