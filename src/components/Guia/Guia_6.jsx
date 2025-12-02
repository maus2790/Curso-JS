import React, { useState } from 'react';
import './Guias.css';

const Guia_6 = () => {
  const [copiado, setCopiado] = useState(null);

  const copiarCodigo = (codigo, id) => {
    navigator.clipboard.writeText(codigo);
    setCopiado(id);
    setTimeout(() => setCopiado(null), 2000);
  };

  const ejemplosCodigo = {
    // EJEMPLO 1: INTRODUCCIÓN A ARRAYS
    introduccionArrays: `// Creación de arrays usando diferentes métodos
const arrayVacio = [];
const arrayConElementos = [1, 2, 3, 4, 5];
const arrayMixto = [1, "hola", true, null, {nombre: "Juan"}];
const arrayConstructor = new Array(5); // Crea array con 5 elementos vacíos
const arrayConValores = Array.of(1, 2, 3); // Crea array con valores específicos

// Mostrar los arrays creados
console.log(arrayConElementos); // [1, 2, 3, 4, 5]
console.log(arrayMixto[1]); // "hola" - Acceso por índice

// Propiedades básicas de arrays
const frutas = ["manzana", "banana", "naranja"];
console.log(frutas.length); // 3 - Número de elementos
console.log(frutas[0]); // "manzana" - Primer elemento
console.log(frutas[frutas.length - 1]); // "naranja" - Último elemento

// Verificar tipo de array
console.log(typeof frutas); // "object" - Arrays son objetos especiales
console.log(Array.isArray(frutas)); // true - Verificación segura de array

// Mutabilidad de arrays - Modificar elementos existentes
const numeros = [1, 2, 3];
numeros[1] = 20; // Modificar elemento en posición 1
numeros[3] = 4; // Agregar nuevo elemento
console.log(numeros); // [1, 20, 3, 4]

// Arrays multidimensionales - Matrices
const matriz = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
console.log(matriz[1][2]); // 6 - Segunda fila, tercera columna`,

    // EJEMPLO 2: MÉTODOS BÁSICOS
    metodosBasicos: `// MÉTODOS QUE TRABAJAN AL FINAL DEL ARRAY
const stack = [1, 2, 3];

// push: agrega elementos al final del array
stack.push(4);
console.log(stack); // [1, 2, 3, 4]

// pop: elimina y retorna el último elemento
const ultimo = stack.pop();
console.log(ultimo); // 4
console.log(stack); // [1, 2, 3]

// MÉTODOS QUE TRABAJAN AL INICIO DEL ARRAY
const queue = [2, 3, 4];

// unshift: agrega elementos al inicio del array
queue.unshift(1);
console.log(queue); // [1, 2, 3, 4]

// shift: elimina y retorna el primer elemento
const primero = queue.shift();
console.log(primero); // 1
console.log(queue); // [2, 3, 4]

// CONCAT - Combina múltiples arrays
const array1 = [1, 2];
const array2 = [3, 4];
const array3 = [5, 6];

const combinado = array1.concat(array2, array3);
console.log(combinado); // [1, 2, 3, 4, 5, 6]

// SLICE - Extrae una porción sin modificar el original
const original = [1, 2, 3, 4, 5];
const porcion1 = original.slice(1, 4); // Desde índice 1 hasta 3
const porcion2 = original.slice(2); // Desde índice 2 hasta el final
const porcion3 = original.slice(-2); // Últimos 2 elementos

console.log(porcion1); // [2, 3, 4]
console.log(porcion2); // [3, 4, 5]
console.log(porcion3); // [4, 5]
console.log(original); // [1, 2, 3, 4, 5] - Array original sin cambios

// SPLICE - Modifica el array insertando/eliminando elementos
const elementos = ['a', 'b', 'c', 'd'];

// Eliminar 2 elementos desde la posición 1
const eliminados = elementos.splice(1, 2);
console.log(eliminados); // ['b', 'c'] - Elementos eliminados
console.log(elementos); // ['a', 'd'] - Array modificado

// Insertar elementos en posición 1 sin eliminar
elementos.splice(1, 0, 'x', 'y');
console.log(elementos); // ['a', 'x', 'y', 'd']

// Reemplazar elementos en posición 1
elementos.splice(1, 2, 'b', 'c');
console.log(elementos); // ['a', 'b', 'c', 'd']`,

    // EJEMPLO 3: MÉTODOS DE BÚSQUEDA
    metodosBusqueda: `// MÉTODOS DE BÚSQUEDA POR VALOR
const numeros = [1, 2, 3, 2, 1];

// indexOf: encuentra la primera ocurrencia de un valor
console.log(numeros.indexOf(2)); // 1 - Primera ocurrencia del 2
console.log(numeros.lastIndexOf(2)); // 3 - Última ocurrencia del 2
console.log(numeros.indexOf(5)); // -1 - Valor no encontrado

// includes: verifica si un valor existe en el array
const colores = ['rojo', 'verde', 'azul'];
console.log(colores.includes('verde')); // true
console.log(colores.includes('amarillo')); // false

// MÉTODOS DE BÚSQUEDA CON CONDICIONES
const personas = [
  { nombre: 'Ana', edad: 25 },
  { nombre: 'Juan', edad: 30 },
  { nombre: 'Maria', edad: 28 }
];

// find: retorna el primer elemento que cumple la condición
const personaJoven = personas.find(p => p.edad < 30);
console.log(personaJoven); // { nombre: 'Ana', edad: 25 }

// findIndex: retorna el índice del primer elemento que cumple
const indiceJoven = personas.findIndex(p => p.edad < 30);
console.log(indiceJoven); // 0

// MÉTODOS DE VERIFICACIÓN MÚLTIPLE
const edades = [25, 30, 35, 18];

// some: verifica si al menos un elemento cumple la condición
console.log(edades.some(edad => edad < 20)); // true (18 < 20)

// every: verifica si todos los elementos cumplen la condición
console.log(edades.every(edad => edad >= 18)); // true
console.log(edades.every(edad => edad > 20)); // false

// FILTER - Filtra elementos basado en una condición
const productos = [
  { nombre: 'Laptop', precio: 1000, stock: 5 },
  { nombre: 'Mouse', precio: 25, stock: 0 },
  { nombre: 'Teclado', precio: 75, stock: 10 },
  { nombre: 'Monitor', precio: 300, stock: 3 }
];

// Filtrar productos con stock disponible
const disponibles = productos.filter(p => p.stock > 0);
console.log(disponibles);
// [{ nombre: 'Laptop', ... }, { nombre: 'Teclado', ... }, ...]

// Filtrar productos caros (más de $100)
const caros = productos.filter(p => p.precio > 100);
console.log(caros);
// [{ nombre: 'Laptop', ... }, { nombre: 'Monitor', ... }]`,

    // EJEMPLO 4: MÉTODOS DE TRANSFORMACIÓN
    metodosTransformacion: `// MAP - Transforma cada elemento del array
const numeros = [1, 2, 3, 4, 5];

// Duplicar cada número
const duplicados = numeros.map(n => n * 2);
console.log(duplicados); // [2, 4, 6, 8, 10]

// Transformar array de objetos
const usuarios = [
  { nombre: 'Ana', edad: 25 },
  { nombre: 'Juan', edad: 30 }
];

// Extraer solo los nombres
const nombres = usuarios.map(u => u.nombre);
console.log(nombres); // ['Ana', 'Juan']

// Agregar propiedades a objetos existentes
const usuariosConId = usuarios.map((u, index) => ({
  ...u, // Spread operator para copiar propiedades
  id: index + 1 // Agregar nueva propiedad
}));
console.log(usuariosConId);
// [{ nombre: 'Ana', edad: 25, id: 1 }, ...]

// REDUCE - Reduce el array a un solo valor
const ventas = [100, 200, 150, 300];

// Suma total de ventas
const total = ventas.reduce((acumulador, venta) => acumulador + venta, 0);
console.log(total); // 750

// Encontrar valor máximo
const maximo = ventas.reduce((max, venta) => venta > max ? venta : max, 0);
console.log(maximo); // 300

// Contar ocurrencias de palabras
const palabras = ['hola', 'mundo', 'hola', 'javascript'];
const contador = palabras.reduce((cont, palabra) => {
  cont[palabra] = (cont[palabra] || 0) + 1; // Incrementar contador
  return cont;
}, {});
console.log(contador); // { hola: 2, mundo: 1, javascript: 1 }

// REDUCERIGHT - Reduce de derecha a izquierda
const numerosParaUnir = [1, 2, 3, 4];
const unido = numerosParaUnir.reduceRight((acc, num) => acc + num.toString(), '');
console.log(unido); // "4321"

// FLAT y FLATMAP - Aplanar arrays anidados
const arrayAnidado = [1, [2, 3], [4, [5, 6]]];

// flat: aplanar un nivel de anidación
console.log(arrayAnidado.flat()); // [1, 2, 3, 4, [5, 6]]

// flat: aplanar múltiples niveles
console.log(arrayAnidado.flat(2)); // [1, 2, 3, 4, 5, 6]

// flatMap: mapear y luego aplanar en una sola operación
const frases = ["Hola mundo", "JavaScript es genial"];
const palabrasIndividuales = frases.flatMap(frase => frase.split(' '));
console.log(palabrasIndividuales);
// ["Hola", "mundo", "JavaScript", "es", "genial"]`,

    // EJEMPLO 5: MÉTODOS DE ORDENACIÓN
    metodosOrdenacion: `// SORT - Ordena el array (MODIFICA el original)
const numeros = [3, 1, 4, 1, 5, 9, 2];

// Orden por defecto (convierte a strings para comparar)
numeros.sort();
console.log(numeros); // [1, 1, 2, 3, 4, 5, 9]

// Orden numérico ascendente
numeros.sort((a, b) => a - b);
console.log(numeros); // [1, 1, 2, 3, 4, 5, 9]

// Orden numérico descendente
numeros.sort((a, b) => b - a);
console.log(numeros); // [9, 5, 4, 3, 2, 1, 1]

// Ordenar array de objetos
const personas = [
  { nombre: 'Ana', edad: 25 },
  { nombre: 'Juan', edad: 30 },
  { nombre: 'Maria', edad: 22 }
];

// Orden por edad ascendente
personas.sort((a, b) => a.edad - b.edad);
console.log(personas);
// [{ nombre: 'Maria', ... }, { nombre: 'Ana', ... }, { nombre: 'Juan', ... }]

// Orden alfabético por nombre
personas.sort((a, b) => a.nombre.localeCompare(b.nombre));
console.log(personas);
// [{ nombre: 'Ana', ... }, { nombre: 'Juan', ... }, { nombre: 'Maria', ... }]

// REVERSE - Invertir orden del array (MODIFICA el original)
const letras = ['a', 'b', 'c', 'd'];
letras.reverse();
console.log(letras); // ['d', 'c', 'b', 'a']

// TO SORTED y TO REVERSED (ES2023) - Versiones inmutables
const original = [3, 1, 2];
const ordenado = original.toSorted(); // No modifica el original
const invertido = original.toReversed(); // No modifica el original

console.log(original); // [3, 1, 2] - Sin cambios
console.log(ordenado); // [1, 2, 3]
console.log(invertido); // [2, 1, 3]`,

    // EJEMPLO 6: MÉTODOS DE ITERACIÓN
    metodosIteracion: `// FOR EACH - Ejecuta función para cada elemento
const frutas = ['manzana', 'banana', 'naranja'];

frutas.forEach((fruta, indice) => {
  console.log(\`\${indice + 1}. \${fruta}\`);
});
// "1. manzana"
// "2. banana" 
// "3. naranja"

// Comparación entre forEach y for loop tradicional
const numeros = [1, 2, 3];

// Con forEach (estilo más declarativo)
numeros.forEach(num => console.log(num * 2));

// Con for loop (estilo más imperativo)
for (let i = 0; i < numeros.length; i++) {
  console.log(numeros[i] * 2);
}

// ITERADORES DE ARRAYS
const colores = ['rojo', 'verde', 'azul'];

// entries: retorna pares [índice, valor]
for (const [indice, color] of colores.entries()) {
  console.log(\`Índice \${indice}: \${color}\`);
}

// keys: retorna solo los índices
for (const indice of colores.keys()) {
  console.log(\`Índice: \${indice}\`);
}

// values: retorna solo los valores
for (const color of colores.values()) {
  console.log(\`Color: \${color}\`);
}

// JOIN - Unir elementos del array en un string
const palabras = ['Hola', 'mundo', 'JavaScript'];
const frase1 = palabras.join(' '); // Separador: espacio
const frase2 = palabras.join('-'); // Separador: guión
const frase3 = palabras.join(); // Separador por defecto: coma

console.log(frase1); // "Hola mundo JavaScript"
console.log(frase2); // "Hola-mundo-JavaScript"
console.log(frase3); // "Hola,mundo,JavaScript"

// TO STRING y TO LOCALE STRING
const arrayParaString = [1, 2, 3];
console.log(arrayParaString.toString()); // "1,2,3"
console.log(arrayParaString.toLocaleString()); // "1,2,3" (versión localizada)`,

    // EJEMPLO 7: MÉTODOS AVANZADOS
    metodosAvanzados: `// DESTRUCTURING CON ARRAYS
const coordenadas = [10, 20, 30];

// Destructuring básico - extraer valores en variables
const [x, y, z] = coordenadas;
console.log(x, y, z); // 10 20 30

// Destructuring con valores por defecto
const [a, b, c = 0, d = 0] = [1, 2];
console.log(a, b, c, d); // 1 2 0 0

// Intercambiar variables usando destructuring
let primero = 1;
let segundo = 2;
[primero, segundo] = [segundo, primero];
console.log(primero, segundo); // 2 1

// SPREAD OPERATOR CON ARRAYS
const parte1 = [1, 2, 3];
const parte2 = [4, 5, 6];

// Combinar arrays usando spread operator
const combinado = [...parte1, ...parte2];
console.log(combinado); // [1, 2, 3, 4, 5, 6]

// Copiar arrays (shallow copy)
const original = [1, 2, 3];
const copia = [...original];
console.log(copia); // [1, 2, 3]
console.log(original === copia); // false - Diferentes referencias

// REST PARAMETERS EN DESTRUCTURING
const [primerElemento, ...resto] = [1, 2, 3, 4, 5];
console.log(primerElemento); // 1
console.log(resto); // [2, 3, 4, 5]

// ARRAY.FROM - Crear arrays desde objetos iterables
// Desde string
const desdeString = Array.from("Hola");
console.log(desdeString); // ['H', 'o', 'l', 'a']

// Desde Set (elimina duplicados automáticamente)
const desdeSet = Array.from(new Set([1, 2, 2, 3]));
console.log(desdeSet); // [1, 2, 3]

// Con función de mapeo integrada
const cuadrados = Array.from([1, 2, 3], x => x * x);
console.log(cuadrados); // [1, 4, 9]

// ARRAY.FILL - Rellenar array con valor específico
const tamaño = 5;
const llenoDeCeros = new Array(tamaño).fill(0);
const llenoDeValores = new Array(3).fill('hola');

console.log(llenoDeCeros); // [0, 0, 0, 0, 0]
console.log(llenoDeValores); // ['hola', 'hola', 'hola']

// PATRONES COMUNES CON ARRAYS
// Eliminar duplicados usando Set
const conDuplicados = [1, 2, 2, 3, 4, 4, 5];
const sinDuplicados = [...new Set(conDuplicados)];
console.log(sinDuplicados); // [1, 2, 3, 4, 5]

// Crear rango de números
const rango = (inicio, fin) => 
  Array.from({ length: fin - inicio + 1 }, (_, i) => inicio + i);
console.log(rango(1, 5)); // [1, 2, 3, 4, 5]

// Agrupar elementos por propiedad
const productos = [
  { categoria: 'electronica', nombre: 'Laptop' },
  { categoria: 'ropa', nombre: 'Camisa' },
  { categoria: 'electronica', nombre: 'Phone' }
];

const agrupados = productos.reduce((grupos, producto) => {
  const categoria = producto.categoria;
  if (!grupos[categoria]) {
    grupos[categoria] = []; // Inicializar array para categoría
  }
  grupos[categoria].push(producto);
  return grupos;
}, {});

console.log(agrupados);
// { electronica: [...], ropa: [...] }`,

    // EJEMPLO 8: SISTEMA COMPLETO
    ejemploCompleto: `// === SISTEMA DE GESTIÓN DE INVENTARIO CON ARRAYS ===

// 1. Datos de ejemplo del inventario
const productos = [
  { id: 1, nombre: "Laptop", categoria: "electronica", precio: 1000, stock: 5, vendidos: 12 },
  { id: 2, nombre: "Mouse", categoria: "electronica", precio: 25, stock: 20, vendidos: 45 },
  { id: 3, nombre: "Camisa", categoria: "ropa", precio: 35, stock: 15, vendidos: 28 },
  { id: 4, nombre: "Teclado", categoria: "electronica", precio: 75, stock: 0, vendidos: 15 },
  { id: 5, nombre: "Pantalón", categoria: "ropa", precio: 45, stock: 8, vendidos: 22 },
  { id: 6, nombre: "Monitor", categoria: "electronica", precio: 300, stock: 3, vendidos: 8 }
];

// 2. Funciones de análisis usando métodos de arrays

// Obtener productos con stock disponible
function obtenerProductosDisponibles() {
  return productos.filter(producto => producto.stock > 0);
}

// Filtrar productos por categoría específica
function obtenerProductosPorCategoria(categoria) {
  return productos.filter(producto => producto.categoria === categoria);
}

// Calcular el total de ventas en dinero
function calcularVentasTotales() {
  return productos.reduce((total, producto) => 
    total + (producto.precio * producto.vendidos), 0);
}

// Obtener los productos más vendidos
function obtenerProductosMasVendidos(limite = 3) {
  return productos
    .slice() // Crear copia para no modificar el original
    .sort((a, b) => b.vendidos - a.vendidos) // Ordenar descendente por ventas
    .slice(0, limite); // Tomar solo los primeros 'limite' elementos
}

// Generar estadísticas detalladas por categoría
function obtenerEstadisticasPorCategoria() {
  const categorias = [...new Set(productos.map(p => p.categoria))];
  
  return categorias.map(categoria => {
    const productosCategoria = productos.filter(p => p.categoria === categoria);
    
    return {
      categoria,
      cantidadProductos: productosCategoria.length,
      ventasTotales: productosCategoria.reduce((sum, p) => sum + p.vendidos, 0),
      ingresosTotales: productosCategoria.reduce((sum, p) => sum + (p.precio * p.vendidos), 0),
      stockTotal: productosCategoria.reduce((sum, p) => sum + p.stock, 0),
      productoMasVendido: productosCategoria.reduce((max, p) => 
        p.vendidos > max.vendidos ? p : max
      )
    };
  });
}

// Buscar productos por término en nombre o categoría
function buscarProductos(termino) {
  return productos.filter(producto =>
    producto.nombre.toLowerCase().includes(termino.toLowerCase()) ||
    producto.categoria.toLowerCase().includes(termino.toLowerCase())
  );
}

// Actualizar stock de un producto específico
function actualizarStock(idProducto, cantidad) {
  const producto = productos.find(p => p.id === idProducto);
  if (producto) {
    producto.stock += cantidad;
    return \`Stock actualizado: \${producto.nombre} - Nuevo stock: \${producto.stock}\`;
  }
  return "Producto no encontrado";
}

// Generar resumen general del inventario
function obtenerResumenInventario() {
  const totalProductos = productos.length;
  const productosDisponibles = productos.filter(p => p.stock > 0).length;
  const productosSinStock = productos.filter(p => p.stock === 0).length;
  const valorInventario = productos.reduce((sum, p) => sum + (p.precio * p.stock), 0);
  
  return {
    totalProductos,
    productosDisponibles,
    productosSinStock,
    valorInventario,
    porcentajeDisponibles: (productosDisponibles / totalProductos * 100).toFixed(1) + '%'
  };
}

// 3. Ejecución y demostración del sistema
console.log("=== SISTEMA DE GESTIÓN DE INVENTARIO ===\\n");

console.log("1. PRODUCTOS DISPONIBLES:");
console.log(obtenerProductosDisponibles().map(p => \`- \${p.nombre} (Stock: \${p.stock})\`).join('\\n'));

console.log("\\n2. PRODUCTOS ELECTRÓNICOS:");
console.log(obtenerProductosPorCategoria('electronica').map(p => \`- \${p.nombre} - $\${p.precio}\`).join('\\n'));

console.log("\\n3. VENTAS TOTALES: $\${calcularVentasTotales()}");

console.log("\\n4. PRODUCTOS MÁS VENDIDOS:");
obtenerProductosMasVendidos().forEach((p, i) => {
  console.log(\`\${i + 1}. \${p.nombre} - \${p.vendidos} unidades\`);
});

console.log("\\n5. ESTADÍSTICAS POR CATEGORÍA:");
obtenerEstadisticasPorCategoria().forEach(estadistica => {
  console.log(\`\\n\${estadistica.categoria.toUpperCase()}:\`);
  console.log(\`  Productos: \${estadistica.cantidadProductos}\`);
  console.log(\`  Ventas: \${estadistica.ventasTotales} unidades\`);
  console.log(\`  Ingresos: $\${estadistica.ingresosTotales}\`);
  console.log(\`  Stock actual: \${estadistica.stockTotal} unidades\`);
  console.log(\`  Producto más vendido: \${estadistica.productoMasVendido.nombre}\`);
});

console.log("\\n6. BÚSQUEDA: 'ta'");
console.log(buscarProductos('ta').map(p => \`- \${p.nombre} (\${p.categoria})\`).join('\\n'));

console.log("\\n7. ACTUALIZACIÓN DE STOCK:");
console.log(actualizarStock(1, 3)); // Agregar 3 laptops al stock

console.log("\\n8. RESUMEN DEL INVENTARIO:");
const resumen = obtenerResumenInventario();
console.log(\`Total productos: \${resumen.totalProductos}\`);
console.log(\`Productos disponibles: \${resumen.productosDisponibles}\`);
console.log(\`Productos sin stock: \${resumen.productosSinStock}\`);
console.log(\`Porcentaje disponibles: \${resumen.porcentajeDisponibles}\`);
console.log(\`Valor total del inventario: $\${resumen.valorInventario}\`);

console.log("\\n9. TRANSFORMACIONES AVANZADAS:\");

// Aplicar descuento del 10% a productos más vendidos
const conDescuento = productos
  .filter(p => p.vendidos > 20)
  .map(p => ({
    ...p,
    precioOriginal: p.precio,
    precioDescuento: p.precio * 0.9,
    ahorro: p.precio * 0.1
  }));

console.log("Productos con descuento:");
conDescuento.forEach(p => {
  console.log(\`- \${p.nombre}: $\${p.precioOriginal} → $\${p.precioDescuento.toFixed(2)} (Ahorro: $\${p.ahorro})\`);
});

// Agrupar productos por rango de precio
const porRangoPrecio = productos.reduce((rangos, producto) => {
  let rango;
  if (producto.precio < 50) rango = "Económico";
  else if (producto.precio < 200) rango = "Medio";
  else rango = "Premium";
  
  if (!rangos[rango]) rangos[rango] = [];
  rangos[rango].push(producto);
  return rangos;
}, {});

console.log("\\nProductos por rango de precio:");
Object.entries(porRangoPrecio).forEach(([rango, productos]) => {
  console.log(\`\${rango}: \${productos.map(p => p.nombre).join(', ')}\`);
});`
  };

  return (
    <div className="guia-contenido">
      <header className="guia-header">
        <h1>Arrays y Métodos en JavaScript - Guía Completa</h1>
        <div className="guia-meta">
          <span className="nivel">Intermedio-Avanzado</span>
          <span className="tiempo">75-90 minutos</span>
          <span className="temas">8 temas principales</span>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <div className="guia-contenido-principal">
        
        {/* SECCIÓN 1: INTRODUCCIÓN A ARRAYS */}
        <section className="guia-seccion">
          <h2>¿Qué son los Arrays en JavaScript?</h2>
          
          <div className="concepto-card">
            <div className="concepto-content">
              <h3>🧱 Estructuras de Datos Fundamentales</h3>
              <p>Un array es una estructura de datos que almacena múltiples valores en una sola variable, organizados secuencialmente y accesibles mediante índices numéricos.</p>
              
              <div className="lista-conceptos">
                <h4>🔧 Características Clave de los Arrays:</h4>
                <ul>
                  <li><strong>Dinámicos:</strong> Pueden crecer o reducirse automáticamente según necesidad</li>
                  <li><strong>Indexados:</strong> Acceso rápido O(1) a elementos por posición numérica (0-based)</li>
                  <li><strong>Heterogéneos:</strong> Pueden contener diferentes tipos de datos en un mismo array</li>
                  <li><strong>Iterables:</strong> Se pueden recorrer fácilmente con bucles y métodos de iteración</li>
                  <li><strong>Métodos integrados:</strong> Gran cantidad de funciones útiles para manipulación</li>
                  <li><strong>Mutables:</strong> La mayoría de métodos modifican el array original</li>
                </ul>
              </div>

              <div className="analogia">
                <h4>📚 Analogía de Biblioteca</h4>
                <div className="analogia-grid">
                  <div className="analogia-item">
                    <span className="emoji">📚</span>
                    <strong>Estante</strong>
                    <span>Array</span>
                  </div>
                  <div className="analogia-item">
                    <span className="emoji">📖</span>
                    <strong>Libros</strong>
                    <span>Elementos</span>
                  </div>
                  <div className="analogia-item">
                    <span className="emoji">🔢</span>
                    <strong>Números</strong>
                    <span>Índices</span>
                  </div>
                  <div className="analogia-item">
                    <span className="emoji">📏</span>
                    <strong>Capacidad</strong>
                    <span>Longitud</span>
                  </div>
                  <div className="analogia-item">
                    <span className="emoji">🔄</span>
                    <strong>Reorganizar</strong>
                    <span>Métodos</span>
                  </div>
                  <div className="analogia-item">
                    <span className="emoji">🔍</span>
                    <strong>Buscar</strong>
                    <span>Búsqueda</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="codigo-contenedor">
            <div className="codigo-header">
              <span>Ejemplo 1: Conceptos Fundamentales y Creación de Arrays</span>
              <button 
                className={`btn-copiar ${copiado === 'introduccionArrays' ? 'copiado' : ''}`}
                onClick={() => copiarCodigo(ejemplosCodigo.introduccionArrays, 'introduccionArrays')}
              >
                {copiado === 'introduccionArrays' ? '✓ Copiado' : '📋 Copiar'}
              </button>
            </div>
            <pre className="codigo-ejemplo">
              <code>{ejemplosCodigo.introduccionArrays}</code>
            </pre>
          </div>

          <div className="beneficios-grid">
            <div className="beneficio-card">
              <div className="beneficio-icono">⚡</div>
              <h4>Acceso Rápido</h4>
              <p>Acceso instantáneo O(1) a elementos por índice mediante cálculo directo de memoria</p>
            </div>
            <div className="beneficio-card">
              <div className="beneficio-icono">🔄</div>
              <h4>Flexibilidad Total</h4>
              <p>Tamaño dinámico, diferentes tipos de datos y estructuras complejas</p>
            </div>
            <div className="beneficio-card">
              <div className="beneficio-icono">🔧</div>
              <h4>Métodos Integrados</h4>
              <p>Más de 30 métodos para manipulación, búsqueda, transformación y ordenación</p>
            </div>
            <div className="beneficio-card">
              <div className="beneficio-icono">🎯</div>
              <h4>Versatilidad</h4>
              <p>Ideal para listas, pilas, colas, matrices y estructuras de datos complejas</p>
            </div>
            <div className="beneficio-card">
              <div className="beneficio-icono">🚀</div>
              <h4>Performance</h4>
              <p>Operaciones optimizadas a nivel de motor JavaScript para máximo rendimiento</p>
            </div>
            <div className="beneficio-card">
              <div className="beneficio-icono">🔗</div>
              <h4>Interoperabilidad</h4>
              <p>Integración perfecta con otros objetos JavaScript y APIs del navegador</p>
            </div>
          </div>

          <div className="nota-importante">
            <h4>💡 Inmutabilidad vs Mutabilidad en Arrays</h4>
            <p>Es crucial distinguir entre métodos que <strong>modifican el array original</strong> (mutables) como <code>push</code>, <code>pop</code>, <code>splice</code>, <code>sort</code> y aquellos que <strong>retornan un nuevo array</strong> (inmutables) como <code>map</code>, <code>filter</code>, <code>slice</code>, <code>concat</code>. Para programación funcional y evitar efectos secundarios, prefiere los métodos inmutables.</p>
          </div>

          <div className="nota-advertencia">
            <h4>⚠️ Consideraciones de Performance</h4>
            <ul>
              <li><strong>push/pop</strong> son O(1) - Operaciones muy rápidas al final del array</li>
              <li><strong>shift/unshift</strong> son O(n) - Más lentos porque reindexan todo el array</li>
              <li><strong>Acceso por índice</strong> es O(1) - Instantáneo sin importar el tamaño</li>
              <li><strong>Búsqueda lineal</strong> es O(n) - Debe revisar cada elemento en el peor caso</li>
              <li><strong>Arrays muy grandes</strong> pueden beneficiarse de estructuras especializadas</li>
            </ul>
          </div>
        </section>

        {/* SECCIÓN 2: MÉTODOS BÁSICOS */}
        <section className="guia-seccion">
          <h2>Métodos Básicos de Manipulación</h2>
          
          <div className="concepto-card">
            <div className="concepto-content">
              <h3>🎛️ Operaciones Fundamentales de Arrays</h3>
              <p>Estos métodos permiten las operaciones esenciales de agregar, eliminar, combinar y extraer elementos en los arrays. Son el fundamento de toda manipulación de arrays.</p>

              <h4>📋 Clasificación por Comportamiento:</h4>
              <ul>
                <li><strong>Modificadores:</strong> Cambian el array original (push, pop, shift, unshift, splice)</li>
                <li><strong>Inmutables:</strong> Retornan nuevo array sin modificar original (slice, concat)</li>
                <li><strong>Extractores:</strong> Obtienen información o porciones (slice, índices)</li>
                <li><strong>Combinadores:</strong> Unen múltiples arrays (concat)</li>
              </ul>
            </div>
          </div>

          <div className="codigo-contenedor">
            <div className="codigo-header">
              <span>Ejemplo 2: Métodos Esenciales - push, pop, shift, unshift, concat, slice, splice</span>
              <button 
                className={`btn-copiar ${copiado === 'metodosBasicos' ? 'copiado' : ''}`}
                onClick={() => copiarCodigo(ejemplosCodigo.metodosBasicos, 'metodosBasicos')}
              >
                {copiado === 'metodosBasicos' ? '✓ Copiado' : '📋 Copiar'}
              </button>
            </div>
            <pre className="codigo-ejemplo">
              <code>{ejemplosCodigo.metodosBasicos}</code>
            </pre>
          </div>

          <div className="tabla-contenedor">
            <h4>📊 Resumen Completo de Métodos Básicos</h4>
            <table className="tabla-guia">
              <thead>
                <tr>
                  <th>Método</th>
                  <th>Propósito</th>
                  <th>Modifica Original</th>
                  <th>Retorna</th>
                  <th>Complejidad</th>
                  <th>Uso Común</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>push()</code></td>
                  <td>Agregar al final</td>
                  <td>✅ Sí</td>
                  <td>Nueva longitud</td>
                  <td>O(1)</td>
                  <td>Pilas, acumuladores</td>
                </tr>
                <tr>
                  <td><code>pop()</code></td>
                  <td>Eliminar del final</td>
                  <td>✅ Sí</td>
                  <td>Elemento eliminado</td>
                  <td>O(1)</td>
                  <td>Pilas, procesamiento LIFO</td>
                </tr>
                <tr>
                  <td><code>unshift()</code></td>
                  <td>Agregar al inicio</td>
                  <td>✅ Sí</td>
                  <td>Nueva longitud</td>
                  <td>O(n)</td>
                  <td>Colas, prioridades</td>
                </tr>
                <tr>
                  <td><code>shift()</code></td>
                  <td>Eliminar del inicio</td>
                  <td>✅ Sí</td>
                  <td>Elemento eliminado</td>
                  <td>O(n)</td>
                  <td>Colas, procesamiento FIFO</td>
                </tr>
                <tr>
                  <td><code>concat()</code></td>
                  <td>Combinar arrays</td>
                  <td>❌ No</td>
                  <td>Nuevo array</td>
                  <td>O(n)</td>
                  <td>Unión de datasets</td>
                </tr>
                <tr>
                  <td><code>slice()</code></td>
                  <td>Extraer porción</td>
                  <td>❌ No</td>
                  <td>Nuevo array</td>
                  <td>O(n)</td>
                  <td>Paginación, subconjuntos</td>
                </tr>
                <tr>
                  <td><code>splice()</code></td>
                  <td>Insertar/eliminar</td>
                  <td>✅ Sí</td>
                  <td>Elementos eliminados</td>
                  <td>O(n)</td>
                  <td>Edición en posición específica</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mejores-practicas">
            <h4>🎯 Mejores Prácticas con Métodos Básicos</h4>
            <ul>
              <li><strong>Preferir push/pop</strong> sobre unshift/shift por mejor performance</li>
              <li><strong>Usar slice()</strong> para copiar arrays en lugar de referencia directa</li>
              <li><strong>splice() es versátil</strong> pero costoso en arrays grandes</li>
              <li><strong>concat() es inmutable</strong> - ideal para programación funcional</li>
              <li><strong>Considerar métodos modernos</strong> como spread operator para algunas operaciones</li>
              <li><strong>Validar existencia</strong> antes de acceder con índices negativos en slice()</li>
            </ul>
          </div>
        </section>

        {/* SECCIÓN 3: MÉTODOS DE BÚSQUEDA */}
        <section className="guia-seccion">
          <h2>Métodos de Búsqueda y Filtrado</h2>
          
          <div className="concepto-card">
            <div className="concepto-content">
              <h3>🔍 Encontrar y Filtrar Elementos Efficientemente</h3>
              <p>Estos métodos permiten localizar elementos específicos y crear subconjuntos basados en condiciones. Son esenciales para el procesamiento y análisis de datos.</p>

              <h4>🎯 Estrategias de Búsqueda:</h4>
              <ul>
                <li><strong>Búsqueda por valor:</strong> Localizar elementos con valores específicos (indexOf, includes)</li>
                <li><strong>Búsqueda por condición:</strong> Encontrar elementos que cumplan criterios (find, filter)</li>
                <li><strong>Verificación existencial:</strong> Confirmar presencia/ausencia de elementos (some, every)</li>
                <li><strong>Búsqueda múltiple:</strong> Obtener todos los elementos que cumplan condiciones (filter)</li>
              </ul>
            </div>
          </div>

          <div className="codigo-contenedor">
            <div className="codigo-header">
              <span>Ejemplo 3: Métodos de Búsqueda - indexOf, find, filter, some, every, includes</span>
              <button 
                className={`btn-copiar ${copiado === 'metodosBusqueda' ? 'copiado' : ''}`}
                onClick={() => copiarCodigo(ejemplosCodigo.metodosBusqueda, 'metodosBusqueda')}
              >
                {copiado === 'metodosBusqueda' ? '✓ Copiado' : '📋 Copiar'}
              </button>
            </div>
            <pre className="codigo-ejemplo">
              <code>{ejemplosCodigo.metodosBusqueda}</code>
            </pre>
          </div>

          <div className="nota-importante">
            <h4>💡 Diferencias Clave en Métodos de Búsqueda</h4>
            <ul>
              <li><strong>indexOf vs findIndex:</strong> <code>indexOf</code> busca por valor exacto, <code>findIndex</code> por condición personalizada</li>
              <li><strong>find vs filter:</strong> <code>find</code> retorna el primer elemento que cumple, <code>filter</code> retorna todos los que cumplen</li>
              <li><strong>some vs every:</strong> <code>some</code> verifica si al menos uno cumple, <code>every</code> si todos cumplen</li>
              <li><strong>includes vs indexOf:</strong> <code>includes</code> es más legible que <code>indexOf !== -1</code> para verificar existencia</li>
              <li><strong>find en objetos:</strong> Especialmente útil para buscar en arrays de objetos por propiedades</li>
              <li><strong>filter para datasets:</strong> Ideal para crear vistas filtradas de datos sin modificar el original</li>
            </ul>
          </div>

          <div className="tabla-contenedor">
            <h4>📊 Comparación de Métodos de Búsqueda</h4>
            <table className="tabla-guia">
              <thead>
                <tr>
                  <th>Método</th>
                  <th>Retorna</th>
                  <th>Condición</th>
                  <th>Caso de Uso</th>
                  <th>Performance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>indexOf()</code></td>
                  <td>Índice numérico</td>
                  <td>Valor exacto</td>
                  <td>Búsqueda simple por valor</td>
                  <td>O(n)</td>
                </tr>
                <tr>
                  <td><code>find()</code></td>
                  <td>Elemento</td>
                  <td>Función condición</td>
                  <td>Primer elemento que cumple</td>
                  <td>O(n)</td>
                </tr>
                <tr>
                  <td><code>filter()</code></td>
                  <td>Array</td>
                  <td>Función condición</td>
                  <td>Todos los que cumplen</td>
                  <td>O(n)</td>
                </tr>
                <tr>
                  <td><code>some()</code></td>
                  <td>Boolean</td>
                  <td>Función condición</td>
                  <td>¿Existe al menos uno?</td>
                  <td>O(n) - cortocircuito</td>
                </tr>
                <tr>
                  <td><code>every()</code></td>
                  <td>Boolean</td>
                  <td>Función condición</td>
                  <td>¿Todos cumplen?</td>
                  <td>O(n) - cortocircuito</td>
                </tr>
                <tr>
                  <td><code>includes()</code></td>
                  <td>Boolean</td>
                  <td>Valor exacto</td>
                  <td>Verificar existencia</td>
                  <td>O(n)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECCIÓN 4: MÉTODOS DE TRANSFORMACIÓN */}
        <section className="guia-seccion">
          <h2>Métodos de Transformación</h2>
          
          <div className="concepto-card">
            <div className="concepto-content">
              <h3>🔄 Transformar y Reducir Arrays</h3>
              <p>Estos métodos son fundamentales para la programación funcional, permitiendo transformar arrays en nuevos valores o estructuras sin modificar los originales.</p>

              <h4>🎯 Métodos de Transformación Clave:</h4>
              <ul>
                <li><strong>Map:</strong> Transforma cada elemento en uno nuevo</li>
                <li><strong>Reduce:</strong> Reduce el array a un solo valor acumulado</li>
                <li><strong>Flat:</strong> Aplana arrays anidados a un nivel específico</li>
                <li><strong>FlatMap:</strong> Combina mapeo y aplanamiento en una operación</li>
                <li><strong>ReduceRight:</strong> Reduce comenzando desde el final</li>
              </ul>

              <h4>🚀 Aplicaciones en el Mundo Real:</h4>
              <ul>
                <li><strong>Transformación de datos:</strong> API responses → formatos UI</li>
                <li><strong>Agregación:</strong> Cálculo de totales, promedios, máximos</li>
                <li><strong>Normalización:</strong> Estructurar datos anidados</li>
                <li><strong>Pipeline de procesamiento:</strong> Cadena de transformaciones</li>
              </ul>
            </div>
          </div>

          <div className="codigo-contenedor">
            <div className="codigo-header">
              <span>Ejemplo 4: Métodos de Transformación - map, reduce, flat, flatMap</span>
              <button 
                className={`btn-copiar ${copiado === 'metodosTransformacion' ? 'copiado' : ''}`}
                onClick={() => copiarCodigo(ejemplosCodigo.metodosTransformacion, 'metodosTransformacion')}
              >
                {copiado === 'metodosTransformacion' ? '✓ Copiado' : '📋 Copiar'}
              </button>
            </div>
            <pre className="codigo-ejemplo">
              <code>{ejemplosCodigo.metodosTransformacion}</code>
            </pre>
          </div>

          <div className="resumen-practicas">
            <h4>🎯 Patrones Comunes con Reduce</h4>
            <ul>
              <li><strong>Suma/acumulación:</strong> <code>{`reduce((sum, item) => sum + item, 0)`}</code></li>
              <li><strong>Conteo de ocurrencias:</strong> <code>{`reduce((count, item) => {count[item] = (count[item] || 0) + 1; return count}, {})`}</code></li>
              <li><strong>Agrupación:</strong> <code>{`reduce((groups, item) => {const key = item.categoria; groups[key] = groups[key] || []; groups[key].push(item); return groups}, {})`}</code></li>
              <li><strong>Máximo/mínimo:</strong> <code>{`reduce((max, item) => item > max ? item : max, 0)`}</code></li>
              <li><strong>Aplanamiento:</strong> <code>{`reduce((flat, arr) => flat.concat(arr), [])`}</code></li>
              <li><strong>Transformación a objeto:</strong> <code>{`reduce((obj, item) => ({...obj, [item.id]: item}), {})`}</code></li>
            </ul>
          </div>

          <div className="tabla-contenedor">
            <h4>📊 Comparación de Métodos de Transformación</h4>
            <table className="tabla-guia">
              <thead>
                <tr>
                  <th>Método</th>
                  <th>Propósito</th>
                  <th>Retorna</th>
                  <th>Inmutable</th>
                  <th>Caso de Uso</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>map()</code></td>
                  <td>Transformar elementos</td>
                  <td>Nuevo array</td>
                  <td>✅ Sí</td>
                  <td>Cambiar formato de datos</td>
                </tr>
                <tr>
                  <td><code>reduce()</code></td>
                  <td>Acumular valores</td>
                  <td>Cualquier tipo</td>
                  <td>✅ Sí</td>
                  <td>Cálculos, agrupaciones</td>
                </tr>
                <tr>
                  <td><code>flat()</code></td>
                  <td>Aplanar arrays</td>
                  <td>Nuevo array</td>
                  <td>✅ Sí</td>
                  <td>Estructuras anidadas</td>
                </tr>
                <tr>
                  <td><code>flatMap()</code></td>
                  <td>Mapear y aplanar</td>
                  <td>Nuevo array</td>
                  <td>✅ Sí</td>
                  <td>Transformación + aplanamiento</td>
                </tr>
                <tr>
                  <td><code>reduceRight()</code></td>
                  <td>Acumular desde derecha</td>
                  <td>Cualquier tipo</td>
                  <td>✅ Sí</td>
                  <td>Operaciones que dependen del orden</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECCIÓN 5: MÉTODOS DE ORDENACIÓN */}
        <section className="guia-seccion">
          <h2>Métodos de Ordenación</h2>
          
          <div className="concepto-card">
            <div className="concepto-content">
              <h3>📊 Ordenar y Organizar Datos</h3>
              <p>La ordenación es esencial para presentar datos de manera organizada, facilitar búsquedas eficientes y mejorar la experiencia del usuario.</p>

              <h4>🎯 Algoritmos de Ordenación en JavaScript:</h4>
              <ul>
                <li><strong>Sort nativo:</strong> Usa TimSort (híbrido de Merge Sort e Insertion Sort)</li>
                <li><strong>Estabilidad:</strong> Elementos iguales mantienen su orden relativo (ES2019+)</li>
                <li><strong>Performance:</strong> O(n log n) en promedio, O(n) en el mejor caso</li>
                <li><strong>In-place:</strong> Modifica el array original (a menos que uses toSorted)</li>
              </ul>

              <h4>🔧 Consideraciones de Ordenación:</h4>
              <ul>
                <li><strong>Strings vs Números:</strong> Comportamiento diferente por defecto</li>
                <li><strong>Locale:</strong> Considerar ordenación sensible al idioma</li>
                <li><strong>Objetos complejos:</strong> Necesitan funciones de comparación personalizadas</li>
                <li><strong>Inmutabilidad:</strong> Preferir toSorted() para programación funcional</li>
              </ul>
            </div>
          </div>

          <div className="codigo-contenedor">
            <div className="codigo-header">
              <span>Ejemplo 5: Métodos de Ordenación - sort, reverse, toSorted, toReversed</span>
              <button 
                className={`btn-copiar ${copiado === 'metodosOrdenacion' ? 'copiado' : ''}`}
                onClick={() => copiarCodigo(ejemplosCodigo.metodosOrdenacion, 'metodosOrdenacion')}
              >
                {copiado === 'metodosOrdenacion' ? '✓ Copiado' : '📋 Copiar'}
              </button>
            </div>
            <pre className="codigo-ejemplo">
              <code>{ejemplosCodigo.metodosOrdenacion}</code>
            </pre>
          </div>

          <div className="nota-advertencia">
            <h4>⚠️ Importante sobre Sort</h4>
            <ul>
              <li><strong>Sort modifica el array original</strong> - Usa <code>toSorted()</code> (ES2023) para versión inmutable</li>
              <li><strong>Por defecto ordena como strings</strong> - Para números usa <code>{`sort((a, b) => a - b)`}</code></li>
              <li><strong>Para objetos</strong> necesitas proporcionar una función de comparación personalizada</li>
              <li><strong>La estabilidad</strong> (mantener orden de elementos iguales) está garantizada en ES2019+</li>
              <li><strong>Locale-sensitive:</strong> Usa <code>localeCompare()</code> para strings con acentos</li>
            </ul>
          </div>

          <div className="patrones-avanzados">
            <h4>🔧 Funciones de Comparación Avanzadas</h4>
            
            <div className="patron-grid">
              <div className="patron-card">
                <h5>Ordenación por Múltiples Campos</h5>
                <pre><code>{`personas.sort((a, b) => {
  // Primero por edad descendente
  if (a.edad !== b.edad) return b.edad - a.edad;
  // Luego por nombre ascendente
  return a.nombre.localeCompare(b.nombre);
});`}</code></pre>
                <p>Ordena por prioridad de campos.</p>
              </div>
              
              <div className="patron-card">
                <h5>Ordenación Personalizada</h5>
                <pre><code>{`const ordenPersonalizado = ["alta", "media", "baja"];
tareas.sort((a, b) => 
  ordenPersonalizado.indexOf(a.prioridad) - 
  ordenPersonalizado.indexOf(b.prioridad)
);`}</code></pre>
                <p>Ordena según un orden específico.</p>
              </div>
              
              <div className="patron-card">
                <h5>Ordenación por Fecha</h5>
                <pre><code>{`eventos.sort((a, b) => 
  new Date(a.fecha) - new Date(b.fecha)
);`}</code></pre>
                <p>Ordena cronológicamente.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 6: MÉTODOS DE ITERACIÓN */}
        <section className="guia-seccion">
          <h2>Métodos de Iteración</h2>
          
          <div className="concepto-card">
            <div className="concepto-content">
              <h3>🔄 Recorrer y Procesar Elementos</h3>
              <p>Estos métodos permiten recorrer arrays y ejecutar operaciones sobre cada elemento, desde simples iteraciones hasta procesamiento complejo.</p>

              <h4>🎯 Tipos de Iteración:</h4>
              <ul>
                <li><strong>forEach:</strong> Ejecutar efectos secundarios para cada elemento</li>
                <li><strong>Iteradores:</strong> entries, keys, values para diferentes perspectivas</li>
                <li><strong>Conversión:</strong> join para transformar arrays en strings</li>
                <li><strong>Representación:</strong> toString y toLocaleString para display</li>
              </ul>

              <h4>🚀 Diferencias Clave:</h4>
              <ul>
                <li><strong>forEach vs for...of:</strong> forEach es más funcional, for...of permite break/continue</li>
                <li><strong>forEach vs map:</strong> forEach para efectos, map para transformaciones</li>
                <li><strong>entries vs keys/values:</strong> entries da acceso completo, los otros son específicos</li>
                <li><strong>join vs toString:</strong> join permite separador personalizado</li>
              </ul>
            </div>
          </div>

          <div className="codigo-contenedor">
            <div className="codigo-header">
              <span>Ejemplo 6: Métodos de Iteración - forEach, entries, keys, values, join</span>
              <button 
                className={`btn-copiar ${copiado === 'metodosIteracion' ? 'copiado' : ''}`}
                onClick={() => copiarCodigo(ejemplosCodigo.metodosIteracion, 'metodosIteracion')}
              >
                {copiado === 'metodosIteracion' ? '✓ Copiado' : '📋 Copiar'}
              </button>
            </div>
            <pre className="codigo-ejemplo">
              <code>{ejemplosCodigo.metodosIteracion}</code>
            </pre>
          </div>

          <div className="resumen-practicas">
            <h4>📋 Cuándo Usar Cada Método de Iteración</h4>
            <ul>
              <li><strong>forEach:</strong> Cuando necesitas ejecutar efectos secundarios para cada elemento</li>
              <li><strong>for...of:</strong> Para iteración simple con posibilidad de break/continue</li>
              <li><strong>entries:</strong> Cuando necesitas tanto el índice como el valor</li>
              <li><strong>map:</strong> Cuando necesitas transformar cada elemento (preferible sobre forEach)</li>
              <li><strong>join:</strong> Para convertir arrays en strings con separadores personalizados</li>
              <li><strong>keys/values:</strong> Cuando solo necesitas índices o valores específicos</li>
              <li><strong>toString:</strong> Para representación rápida con comas</li>
            </ul>
          </div>

          <div className="tabla-contenedor">
            <h4>📊 Comparación de Métodos de Iteración</h4>
            <table className="tabla-guia">
              <thead>
                <tr>
                  <th>Método</th>
                  <th>Acceso a Índice</th>
                  <th>Break/Continue</th>
                  <th>Retorno</th>
                  <th>Uso Ideal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>forEach</code></td>
                  <td>✅ Sí</td>
                  <td>❌ No</td>
                  <td><code>undefined</code></td>
                  <td>Efectos secundarios</td>
                </tr>
                <tr>
                  <td><code>for...of</code></td>
                  <td>❌ No (separado)</td>
                  <td>✅ Sí</td>
                  <td>N/A</td>
                  <td>Iteración con control</td>
                </tr>
                <tr>
                  <td><code>entries</code></td>
                  <td>✅ Sí (como [i,val])</td>
                  <td>✅ Sí</td>
                  <td>Iterador</td>
                  <td>Acceso completo</td>
                </tr>
                <tr>
                  <td><code>keys</code></td>
                  <td>✅ Sí (solo índices)</td>
                  <td>✅ Sí</td>
                  <td>Iterador</td>
                  <td>Solo índices</td>
                </tr>
                <tr>
                  <td><code>values</code></td>
                  <td>❌ No</td>
                  <td>✅ Sí</td>
                  <td>Iterador</td>
                  <td>Solo valores</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECCIÓN 7: MÉTODOS AVANZADOS Y PATRONES */}
        <section className="guia-seccion">
          <h2>Métodos Avanzados y Patrones</h2>
          
          <div className="concepto-card">
            <div className="concepto-content">
              <h3>🚀 Técnicas Avanzadas con Arrays</h3>
              <p>Combinaciones de métodos y patrones comunes para resolver problemas complejos de manera elegante y eficiente.</p>

              <h4>🎯 Características ES6+ Avanzadas:</h4>
              <ul>
                <li><strong>Destructuring:</strong> Extracción elegante de valores de arrays</li>
                <li><strong>Spread Operator:</strong> Expansión y combinación de arrays</li>
                <li><strong>Rest Parameters:</strong> Captura de elementos restantes</li>
                <li><strong>Array.from():</strong> Creación desde objetos iterables</li>
                <li><strong>Array.fill():</strong> Rellenado rápido con valores</li>
              </ul>

              <h4>🔧 Patrones de Resolución de Problemas:</h4>
              <ul>
                <li><strong>Eliminación de duplicados:</strong> Uso de Set para unicidad</li>
                <li><strong>Generación de rangos:</strong> Creación de secuencias numéricas</li>
                <li><strong>Agrupación:</strong> Organización por categorías o propiedades</li>
                <li><strong>Transformación de datos:</strong> Pipeline de métodos encadenados</li>
              </ul>
            </div>
          </div>

          <div className="codigo-contenedor">
            <div className="codigo-header">
              <span>Ejemplo 7: Métodos Avanzados - Destructuring, Spread, Array.from, fill, patrones</span>
              <button 
                className={`btn-copiar ${copiado === 'metodosAvanzados' ? 'copiado' : ''}`}
                onClick={() => copiarCodigo(ejemplosCodigo.metodosAvanzados, 'metodosAvanzados')}
              >
                {copiado === 'metodosAvanzados' ? '✓ Copiado' : '📋 Copiar'}
              </button>
            </div>
            <pre className="codigo-ejemplo">
              <code>{ejemplosCodigo.metodosAvanzados}</code>
            </pre>
          </div>

          <div className="nota-exito">
            <h4>🎯 Patrones Avanzados Comunes</h4>
            <ul>
              <li><strong>Eliminar duplicados:</strong> <code>[...new Set(array)]</code></li>
              <li><strong>Crear rangos:</strong> <code>{`Array.from({length: n}, (_, i) => i)`}</code></li>
              <li><strong>Agrupar por propiedad:</strong> <code>reduce</code> con objetos</li>
              <li><strong>Chunking:</strong> <code>{`Array.from({length: Math.ceil(arr.length/size)}, (_,i) => arr.slice(i*size, i*size+size))`}</code></li>
              <li><strong>Shuffle aleatorio:</strong> <code>{`[...array].sort(() => Math.random() - 0.5)`}</code></li>
              <li><strong>Intersection:</strong> <code>{`array1.filter(x => array2.includes(x))`}</code></li>
              <li><strong>Union:</strong> <code>{`[...new Set([...array1, ...array2])]`}</code></li>
              <li><strong>Difference:</strong> <code>{`array1.filter(x => !array2.includes(x))`}</code></li>
            </ul>
          </div>

          <div className="patrones-avanzados">
            <h4>🔧 Utilidades de Array para Proyectos Reales</h4>
            
            <div className="patron-grid">
              <div className="patron-card">
                <h5>Paginación</h5>
                <pre><code>{`function paginar(array, pagina, itemsPorPagina) {
  const inicio = (pagina - 1) * itemsPorPagina;
  return array.slice(inicio, inicio + itemsPorPagina);
}`}</code></pre>
                <p>Divide array en páginas.</p>
              </div>
              
              <div className="patron-card">
                <h5>Buscar y Reemplazar</h5>
                <pre><code>{`function buscarYReemplazar(array, buscar, reemplazar) {
  return array.map(item => 
    item === buscar ? reemplazar : item
  );
}`}</code></pre>
                <p>Reemplaza elementos específicos.</p>
              </div>
              
              <div className="patron-card">
                <h5>Estadísticas Básicas</h5>
                <pre><code>{`function estadisticas(array) {
  return {
    promedio: array.reduce((a,b)=>a+b,0)/array.length,
    max: Math.max(...array),
    min: Math.min(...array),
    suma: array.reduce((a,b)=>a+b,0)
  };
}`}</code></pre>
                <p>Cálculos estadísticos rápidos.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 8: EJEMPLO COMPLETO INTEGRADO */}
        <section className="guia-seccion">
          <h2>Ejemplo Completo: Sistema de Gestión de Inventario</h2>
          
          <div className="concepto-card">
            <div className="concepto-content">
              <h3>🛒 Sistema Real con Arrays</h3>
              <p>Un sistema completo de gestión de inventario que demuestra cómo los diferentes métodos de arrays pueden trabajar juntos para resolver problemas del mundo real.</p>
              
              <h4>🎯 Características del Sistema:</h4>
              <ul>
                <li><strong>Gestión completa:</strong> CRUD de productos, categorías, estados</li>
                <li><strong>Análisis avanzado:</strong> Estadísticas, reportes, filtros</li>
                <li><strong>Transformaciones:</strong> Descuentos, agrupaciones, formatos</li>
                <li><strong>Búsqueda inteligente:</strong> Filtrado por múltiples criterios</li>
                <li><strong>Validaciones:</strong> Verificaciones de stock, estados válidos</li>
              </ul>

              <h4>🔧 Métodos de Array Utilizados:</h4>
              <ul>
                <li><strong>Filter:</strong> Para obtener productos disponibles y por categoría</li>
                <li><strong>Reduce:</strong> Para cálculos de ventas, estadísticas y agrupaciones</li>
                <li><strong>Map:</strong> Para transformar datos y aplicar descuentos</li>
                <li><strong>Sort:</strong> Para ordenar productos por popularidad</li>
                <li><strong>Find:</strong> Para buscar productos específicos</li>
                <li><strong>Spread operator:</strong> Para copiar arrays y combinar datos</li>
                <li><strong>Set:</strong> Para obtener categorías únicas</li>
                <li><strong>Destructuring:</strong> Para extraer y manipular datos eficientemente</li>
                <li><strong>ForEach:</strong> Para mostrar resultados y ejecutar efectos</li>
                <li><strong>Slice:</strong> Para paginación y límites</li>
              </ul>
            </div>
          </div>

          <div className="codigo-contenedor">
            <div className="codigo-header">
              <span>Ejemplo 8: Sistema Completo de Gestión de Inventario</span>
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
            <h4>🎯 Conceptos Aplicados en el Ejemplo</h4>
            <ul>
              <li><strong>Programación funcional:</strong> Métodos puros sin efectos secundarios</li>
              <li><strong>Inmutabilidad:</strong> Preferencia por métodos que no modifican originales</li>
              <li><strong>Composición:</strong> Encadenamiento de métodos para pipelines</li>
              <li><strong>Abstracción:</strong> Funciones reutilizables y modulares</li>
              <li><strong>Performance:</strong> Elección de métodos eficientes para cada tarea</li>
              <li><strong>Legibilidad:</strong> Código expresivo y auto-documentado</li>
              <li><strong>Mantenibilidad:</strong> Separación clara de responsabilidades</li>
              <li><strong>Escalabilidad:</strong> Estructura que permite fácil extensión</li>
            </ul>
          </div>

          <div className="patrones-avanzados">
            <h4>🔧 Lecciones Clave del Sistema</h4>
            
            <div className="patron-grid">
              <div className="patron-card">
                <h5>Pipeline de Datos</h5>
                <pre><code>{`// Ejemplo de pipeline
const resultado = datos
  .filter(item => item.activo)
  .map(item => transformar(item))
  .sort((a, b) => b.prioridad - a.prioridad)
  .slice(0, 10);`}</code></pre>
                <p>Encadenamiento lógico de operaciones.</p>
              </div>
              
              <div className="patron-card">
                <h5>Agrupaciones Dinámicas</h5>
                <pre><code>{`function agruparPor(array, clave) {
  return array.reduce((grupos, item) => {
    const valor = item[clave];
    grupos[valor] = grupos[valor] || [];
    grupos[valor].push(item);
    return grupos;
  }, {});
}`}</code></pre>
                <p>Agrupación reutilizable por cualquier propiedad.</p>
              </div>
              
              <div className="patron-card">
                <h5>Búsqueda Avanzada</h5>
                <pre><code>{`function buscarAvanzado(array, criterios) {
  return array.filter(item =>
    Object.entries(criterios).every(([clave, valor]) =>
      item[clave].toString().toLowerCase()
        .includes(valor.toString().toLowerCase())
    )
  );
}`}</code></pre>
                <p>Búsqueda por múltiples criterios dinámicos.</p>
              </div>
            </div>
          </div>
        </section>


      {/* RESUMEN FINAL Y PRÓXIMOS PASOS */}
      <section className="guia-seccion">
        <h2>Próximos Pasos</h2>
        <div className="proximos-pasos">
          <div className="paso-aprendizaje">
            <div className="paso-numero">7</div>
            <div className="paso-info">
              <h4>Objetos y POO</h4>
              <p>Aprenderás programación orientada a objetos, clases, herencia, encapsulamiento y métodos de objeto para crear estructuras de datos más complejas.</p>
            </div>
          </div>
          <div className="paso-aprendizaje">
            <div className="paso-numero">8</div>
            <div className="paso-info">
              <h4>DOM Manipulation</h4>
              <p>Manipularás el Document Object Model usando arrays y métodos para crear interfaces dinámicas y aplicaciones web interactivas.</p>
            </div>
          </div>
          <div className="paso-aprendizaje">
            <div className="paso-numero">9</div>
            <div className="paso-info">
              <h4>Eventos</h4>
              <p>Aprenderás a manejar eventos del usuario como clicks, teclas, formularios y cómo responder a interacciones en tiempo real.</p>
            </div>
          </div>
        </div>

        <div className="resumen-practicas">
          <h4>📋 Resumen de Arrays y Métodos</h4>
          <ul>
            <li><strong>Manipulación:</strong> <code>push</code>, <code>pop</code>, <code>shift</code>, <code>unshift</code>, <code>splice</code>, <code>slice</code>, <code>concat</code></li>
            <li><strong>Búsqueda:</strong> <code>find</code>, <code>filter</code>, <code>some</code>, <code>every</code>, <code>includes</code>, <code>indexOf</code></li>
            <li><strong>Transformación:</strong> <code>map</code>, <code>reduce</code>, <code>flat</code>, <code>flatMap</code>, <code>reduceRight</code></li>
            <li><strong>Ordenación:</strong> <code>sort</code>, <code>reverse</code>, <code>toSorted</code>, <code>toReversed</code></li>
            <li><strong>Iteración:</strong> <code>forEach</code>, <code>for...of</code>, <code>entries</code>, <code>keys</code>, <code>values</code></li>
            <li><strong>Avanzados:</strong> destructuring, spread operator, <code>Array.from()</code>, <code>fill()</code>, rest parameters</li>
            <li><strong>Patrones:</strong> eliminación de duplicados, agrupación, chunking, rangos, intersección</li>
          </ul>
        </div>
      </section>
      </div>
    </div>
  );
};

export default Guia_6;