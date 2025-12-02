import React, { useState } from 'react';
import './Guias.css';

const Guia_7 = () => {
  const [copiado, setCopiado] = useState(null);

  const copiarCodigo = (codigo, id) => {
    navigator.clipboard.writeText(codigo);
    setCopiado(id);
    setTimeout(() => setCopiado(null), 2000);
  };

  const ejemplosCodigo = {
    // EJEMPLO 1: INTRODUCCIÓN A OBJETOS
    introduccionObjetos: `// CREACIÓN DE OBJETOS - Diferentes métodos

// 1. Object literal (más común)
const persona = {
  nombre: "Ana García",
  edad: 28,
  profesion: "Desarrolladora",
  ciudad: "Madrid",
  
  // Método dentro del objeto
  presentarse: function() {
    return \`Hola, soy \${this.nombre} y tengo \${this.edad} años\`;
  },
  
  // Método shorthand (ES6)
  trabajar() {
    return \`\${this.nombre} está trabajando como \${this.profesion}\`;
  }
};

// 2. Constructor Object
const coche = new Object();
coche.marca = "Toyota";
coche.modelo = "Corolla";
coche.año = 2022;
coche.arrancar = function() {
  return \`\${this.marca} \${this.modelo} está arrancando...\`;
};

// 3. Object.create() - con prototipo
const prototipoPersona = {
  saludar() {
    return "¡Hola!";
  },
  tipo: "humano"
};

const juan = Object.create(prototipoPersona);
juan.nombre = "Juan";
juan.edad = 25;

// ACCESO A PROPIEDADES
console.log(persona.nombre);           // "Ana García" - Notación punto
console.log(persona["edad"]);          // 28 - Notación corchetes
console.log(persona.presentarse());    // "Hola, soy Ana García y tengo 28 años"

// Propiedades dinámicas
const propiedad = "ciudad";
console.log(persona[propiedad]);       // "Madrid"

// MÉTODOS ÚTILES DE OBJECT
console.log(Object.keys(persona));     // ["nombre", "edad", "profesion", "ciudad", "presentarse", "trabajar"]
console.log(Object.values(persona));   // ["Ana García", 28, "Desarrolladora", "Madrid", function, function]
console.log(Object.entries(persona));  // Array de arrays [clave, valor]

// VERIFICACIÓN DE PROPIEDADES
console.log("nombre" in persona);      // true
console.log(persona.hasOwnProperty("edad")); // true
console.log(persona.hasOwnProperty("saludar")); // false (solo propiedades propias)

// ITERACIÓN SOBRE OBJETOS
for (let clave in persona) {
  if (persona.hasOwnProperty(clave)) {
    console.log(\`\${clave}: \${persona[clave]}\`);
  }
}

// USO PRÁCTICO
console.log(persona.trabajar());       // "Ana García está trabajando como Desarrolladora"
console.log(coche.arrancar());         // "Toyota Corolla está arrancando..."
console.log(juan.saludar());           // "¡Hola!" (heredado del prototipo)
console.log(juan.tipo);                // "humano" (heredado del prototipo)`,

    // EJEMPLO 2: MÉTODOS Y THIS
    metodosThis: `// COMPORTAMIENTO DE THIS EN OBJETOS

const empresa = {
  nombre: "TechSolutions",
  empleados: ["Ana", "Carlos", "María"],
  fundacion: 2010,
  
  // Método regular - this se refiere al objeto
  infoEmpresa: function() {
    return \`\${this.nombre} fundada en \${this.fundacion} con \${this.empleados.length} empleados\`;
  },
  
  // Arrow function - this se refiere al contexto exterior
  infoArrow: () => {
    return \`Empresa: \${this.nombre}\`; // this será undefined o window
  },
  
  // Método que usa otros métodos
  reporteCompleto: function() {
    const info = this.infoEmpresa();
    const empleadosStr = this.empleados.join(", ");
    return \`\${info}. Empleados: \${empleadosStr}\`;
  },
  
  // Método que modifica propiedades
  contratar: function(nuevoEmpleado) {
    this.empleados.push(nuevoEmpleado);
    return \`\${nuevoEmpleado} fue contratado. Total empleados: \${this.empleados.length}\`;
  },
  
  // Método con parámetros y validación
  buscarEmpleado: function(nombre) {
    const encontrado = this.empleados.find(emp => 
      emp.toLowerCase() === nombre.toLowerCase()
    );
    return encontrado ? \`\${encontrado} trabaja aquí\` : "Empleado no encontrado";
  }
};

// USO DE MÉTODOS
console.log(empresa.infoEmpresa());    // "TechSolutions fundada en 2010 con 3 empleados"
console.log(empresa.reporteCompleto()); // Información completa
console.log(empresa.contratar("Laura")); // "Laura fue contratado. Total empleados: 4"
console.log(empresa.buscarEmpleado("carlos")); // "Carlos trabaja aquí"

// PROBLEMAS COMUNES CON THIS
const estudiante = {
  nombre: "Pedro",
  notas: [8, 7, 9, 6],
  
  calcularPromedio: function() {
    const suma = this.notas.reduce((acc, nota) => acc + nota, 0);
    return suma / this.notas.length;
  },
  
  // Método que pierde el contexto
  mostrarInfo: function() {
    return \`\${this.nombre} - Promedio: \${this.calcularPromedio()}\`;
  }
};

// El problema: perder el contexto de this
const mostrarInfo = estudiante.mostrarInfo;
// console.log(mostrarInfo()); // ERROR - this es undefined

// SOLUCIONES PARA MANEJAR THIS

// 1. Bind - crea nueva función con this fijo
const infoBind = estudiante.mostrarInfo.bind(estudiante);
console.log(infoBind()); // "Pedro - Promedio: 7.5"

// 2. Call - ejecuta inmediatamente con this específico
console.log(estudiante.mostrarInfo.call(estudiante)); // "Pedro - Promedio: 7.5"

// 3. Apply - similar a call pero con array de argumentos
console.log(estudiante.mostrarInfo.apply(estudiante)); // "Pedro - Promedio: 7.5"

// MÉTODO CON CALLBACK Y THIS
const contador = {
  valor: 0,
  incrementar: function() {
    this.valor++;
  },
  
  // Problema: this en setTimeout
  iniciarConProblema: function() {
    setTimeout(function() {
      this.incrementar(); // ERROR - this es window
    }, 1000);
  },
  
  // Solución: arrow function (mantiene this léxico)
  iniciarCorrecto: function() {
    setTimeout(() => {
      this.incrementar(); // FUNCIONA - this es contador
      console.log(\`Valor: \${this.valor}\`);
    }, 1000);
  },
  
  // Solución alternativa: bind
  iniciarConBind: function() {
    setTimeout(function() {
      this.incrementar();
    }.bind(this), 1000);
  }
};

contador.iniciarCorrecto(); // Funciona correctamente`,

    // EJEMPLO 3: CONSTRUCTORES Y PROTOTIPOS
    constructoresPrototipos: `// CONSTRUCTORES FUNCIONALES (ES5)

// Constructor de Persona
function Persona(nombre, edad, profesion) {
  // Propiedades de instancia
  this.nombre = nombre;
  this.edad = edad;
  this.profesion = profesion;
  this.id = Math.random().toString(36).substr(2, 9);
  
  // Método de instancia (cada instancia tiene su copia)
  this.presentarse = function() {
    return \`Hola, soy \${this.nombre}, tengo \${this.edad} años y soy \${this.profesion}\`;
  };
}

// Métodos en el prototipo (compartidos entre instancias)
Persona.prototype.obtenerInfo = function() {
  return \`Nombre: \${this.nombre}, Edad: \${this.edad}, Profesión: \${this.profesion}\`;
};

Persona.prototype.esMayorDeEdad = function() {
  return this.edad >= 18;
};

// Propiedad estática (de la función constructora, no de las instancias)
Persona.especie = "Homo Sapiens";

// CREACIÓN DE INSTANCIAS
const persona1 = new Persona("María", 25, "Ingeniera");
const persona2 = new Persona("Carlos", 17, "Estudiante");

console.log(persona1.presentarse());   // "Hola, soy María, tengo 25 años y soy Ingeniera"
console.log(persona1.obtenerInfo());   // "Nombre: María, Edad: 25, Profesión: Ingeniera"
console.log(persona1.esMayorDeEdad()); // true
console.log(persona2.esMayorDeEdad()); // false

// VERIFICACIÓN DE INSTANCIAS
console.log(persona1 instanceof Persona); // true
console.log(persona1.constructor === Persona); // true

// CADENA DE PROTOTIPOS
console.log(persona1.__proto__ === Persona.prototype); // true
console.log(Persona.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__); // null

// HERENCIA CON PROTOTIPOS
function Desarrollador(nombre, edad, lenguaje) {
  // Llamar al constructor padre
  Persona.call(this, nombre, edad, "Desarrollador");
  this.lenguaje = lenguaje;
}

// Establecer la herencia del prototipo
Desarrollador.prototype = Object.create(Persona.prototype);
Desarrollador.prototype.constructor = Desarrollador;

// Métodos específicos de Desarrollador
Desarrollador.prototype.programar = function() {
  return \`\${this.nombre} está programando en \${this.lenguaje}\`;
};

Desarrollador.prototype.obtenerInfo = function() {
  // Llamar al método del prototipo padre
  const infoPadre = Persona.prototype.obtenerInfo.call(this);
  return \`\${infoPadre}, Lenguaje: \${this.lenguaje}\`;
};

// USO DE LA HERENCIA
const dev1 = new Desarrollador("Ana", 30, "JavaScript");
console.log(dev1.presentarse());     // "Hola, soy Ana, tengo 30 años y soy Desarrollador"
console.log(dev1.programar());       // "Ana está programando en JavaScript"
console.log(dev1.obtenerInfo());     // "Nombre: Ana, Edad: 30, Profesión: Desarrollador, Lenguaje: JavaScript"
console.log(dev1 instanceof Desarrollador); // true
console.log(dev1 instanceof Persona);       // true

// MÉTODOS ESTÁTICOS
Persona.compararEdad = function(personaA, personaB) {
  if (personaA.edad > personaB.edad) {
    return \`\${personaA.nombre} es mayor\`;
  } else if (personaA.edad < personaB.edad) {
    return \`\${personaB.nombre} es mayor\`;
  } else {
    return "Tienen la misma edad";
  }
};

console.log(Persona.compararEdad(persona1, persona2)); // "María es mayor"`,

    // EJEMPLO 4: CLASES ES6
    clasesES6: `// CLASES ES6 - Sintaxis moderna para POO

// CLASE BASE
class Animal {
  // Constructor (se ejecuta al crear instancia)
  constructor(nombre, edad, especie) {
    this.nombre = nombre;
    this.edad = edad;
    this.especie = especie;
    this.creadoEn = new Date();
  }
  
  // Métodos de instancia
  describir() {
    return \`\${this.nombre} es un \${this.especie} de \${this.edad} años\`;
  }
  
  hacerSonido() {
    return "\`\${this.nombre} hace un sonido\`";
  }
  
  // Getter (accede como propiedad)
  get infoCompleta() {
    return \`\${this.describir()} - Creado: \${this.creadoEn.toLocaleDateString()}\`;
  }
  
  // Setter (modifica como propiedad)
  set nuevaEdad(edad) {
    if (edad > 0 && edad < 100) {
      this.edad = edad;
    } else {
      console.log("Edad no válida");
    }
  }
  
  // Método estático (pertenece a la clase, no a las instancias)
  static esAnimal(obj) {
    return obj instanceof Animal;
  }
  
  // Propiedad estática
  static reino = "Animalia";
}

// HERENCIA CON EXTENDS
class Perro extends Animal {
  constructor(nombre, edad, raza) {
    // Llamar al constructor del padre
    super(nombre, edad, "Perro");
    this.raza = raza;
  }
  
  // Sobrescribir método del padre
  hacerSonido() {
    return "\`\${this.nombre} dice: ¡Guau guau!\`";
  }
  
  // Método específico de Perro
  moverCola() {
    return \`\${this.nombre} está moviendo la cola felizmente\`;
  }
  
  // Getter específico
  get descripcionCompleta() {
    return \`\${this.describir()}, Raza: \${this.raza}\`;
  }
}

// CLASE CON MÉTODOS PRIVADOS (ES2022)
class CuentaBancaria {
  // Campos privados (con #)
  #saldo;
  #movimientos = [];
  
  constructor(titular, saldoInicial = 0) {
    this.titular = titular;
    this.#saldo = saldoInicial;
    this.numeroCuenta = this.#generarNumeroCuenta();
  }
  
  // Método privado
  #generarNumeroCuenta() {
    return 'CB-' + Math.random().toString(36).substr(2, 8).toUpperCase();
  }
  
  // Métodos públicos
  depositar(cantidad) {
    if (cantidad > 0) {
      this.#saldo += cantidad;
      this.#movimientos.push({
        tipo: 'DEPOSITO',
        cantidad,
        fecha: new Date(),
        saldo: this.#saldo
      });
      return \`Depositado $\${cantidad}. Nuevo saldo: $\${this.#saldo}\`;
    }
    return "Cantidad debe ser positiva";
  }
  
  retirar(cantidad) {
    if (cantidad > 0 && cantidad <= this.#saldo) {
      this.#saldo -= cantidad;
      this.#movimientos.push({
        tipo: 'RETIRO',
        cantidad,
        fecha: new Date(),
        saldo: this.#saldo
      });
      return \`Retirado $\${cantidad}. Nuevo saldo: $\${this.#saldo}\`;
    }
    return cantidad <= 0 ? "Cantidad debe ser positiva" : "Fondos insuficientes";
  }
  
  // Getter para saldo (solo lectura)
  get saldo() {
    return this.#saldo;
  }
  
  // Getter para movimientos (solo lectura)
  get movimientos() {
    return [...this.#movimientos]; // Copia para evitar modificación externa
  }
  
  // Método estático
  static validarCantidad(cantidad) {
    return typeof cantidad === 'number' && cantidad > 0 && Number.isFinite(cantidad);
  }
}

// USO DE LAS CLASES
const miAnimal = new Animal("Simba", 5, "León");
const miPerro = new Perro("Max", 3, "Labrador");
const miCuenta = new CuentaBancaria("Juan Pérez", 1000);

console.log(miAnimal.describir());      // "Simba es un León de 5 años"
console.log(miPerro.hacerSonido());     // "Max dice: ¡Guau guau!"
console.log(miPerro.moverCola());       // "Max está moviendo la cola felizmente"
console.log(miPerro.descripcionCompleta); // "Max es un Perro de 3 años, Raza: Labrador"

// Usando getters y setters
console.log(miAnimal.infoCompleta);     // Información completa con fecha
miAnimal.nuevaEdad = 6;                 // Usando setter
console.log(miAnimal.edad);             // 6

// Métodos estáticos
console.log(Animal.esAnimal(miPerro));  // true
console.log(Animal.reino);              // "Animalia"

// Cuenta bancaria
console.log(miCuenta.depositar(500));   // "Depositado $500. Nuevo saldo: $1500"
console.log(miCuenta.retirar(200));     // "Retirado $200. Nuevo saldo: $1300"
console.log(miCuenta.saldo);            // 1300 (solo lectura)
console.log(CuentaBancaria.validarCantidad(100)); // true

// VERIFICACIONES
console.log(miPerro instanceof Perro);  // true
console.log(miPerro instanceof Animal); // true
console.log(Object.getPrototypeOf(miPerro) === Perro.prototype); // true`,

    // EJEMPLO 5: OBJETOS AVANZADOS Y MÉTODOS
    objetosAvanzados: `// MÉTODOS AVANZADOS DE OBJECT

const producto = {
  nombre: "Laptop",
  precio: 1200,
  categoria: "Electrónicos",
  stock: 15,
  fabricante: "TechCorp"
};

const cliente = {
  nombre: "Ana Martínez",
  email: "ana@email.com",
  premium: true,
  historialCompras: []
};

// 1. Object.assign() - Copiar y fusionar objetos
const productoConDescuento = Object.assign({}, producto, {
  precio: 1000,
  descuento: "20%"
});

console.log(productoConDescuento);
// { nombre: "Laptop", precio: 1000, categoria: "Electrónicos", ... }

// 2. Spread operator para objetos (ES2018)
const clienteActualizado = {
  ...cliente,
  telefono: "+123456789",
  premium: false  // Sobrescribe propiedad existente
};

console.log(clienteActualizado);

// 3. Object.freeze() - Hacer objeto inmutable
const configuracion = {
  tema: "oscuro",
  idioma: "es",
  notificaciones: true
};

Object.freeze(configuracion);
// configuracion.tema = "claro"; // Error en modo estricto, silencioso en modo normal
console.log(Object.isFrozen(configuracion)); // true

// 4. Object.seal() - Permite modificar propiedades existentes pero no añadir/eliminar
const usuario = {
  nombre: "Carlos",
  edad: 30
};

Object.seal(usuario);
usuario.edad = 31; // Permitido
// usuario.ciudad = "Madrid"; // No permitido
console.log(Object.isSealed(usuario)); // true

// 5. Object.defineProperty() - Definir propiedades con atributos específicos
const libro = {};

Object.defineProperty(libro, 'titulo', {
  value: "JavaScript Moderno",
  writable: false,        // No se puede modificar
  enumerable: true,       // Aparece en for...in
  configurable: false     // No se puede eliminar ni redefinir
});

Object.defineProperty(libro, 'precio', {
  get() {
    return this._precio || 0;
  },
  set(valor) {
    if (valor >= 0) {
      this._precio = valor;
    }
  },
  enumerable: true,
  configurable: true
});

libro.precio = 29.99;
console.log(libro.titulo); // "JavaScript Moderno"
console.log(libro.precio); // 29.99

// 6. Object.defineProperties() - Definir múltiples propiedades
const vehiculo = {};

Object.defineProperties(vehiculo, {
  marca: {
    value: "Toyota",
    writable: false,
    enumerable: true
  },
  modelo: {
    value: "Corolla",
    writable: true,
    enumerable: true
  },
  año: {
    get() {
      return this._año;
    },
    set(valor) {
      if (valor >= 1900 && valor <= new Date().getFullYear()) {
        this._año = valor;
      }
    },
    enumerable: true
  }
});

vehiculo.año = 2022;
console.log(vehiculo.marca); // "Toyota"
console.log(vehiculo.año);   // 2022

// 7. PROXY - Interceptar operaciones en objetos
const personaHandler = {
  get(target, propiedad) {
    if (propiedad in target) {
      console.log(\`Leyendo propiedad: \${propiedad}\`);
      return target[propiedad];
    }
    return \`Propiedad "\${propiedad}" no existe\`;
  },
  
  set(target, propiedad, valor) {
    if (propiedad === 'edad' && (typeof valor !== 'number' || valor < 0)) {
      throw new Error("Edad debe ser un número positivo");
    }
    console.log(\`Estableciendo \${propiedad} a \${valor}\`);
    target[propiedad] = valor;
    return true;
  },
  
  has(target, propiedad) {
    return propiedad in target;
  }
};

const personaProxy = new Proxy({ nombre: "Laura" }, personaHandler);

console.log(personaProxy.nombre); // "Laura" + log
personaProxy.edad = 25;           // Log + establece edad
// personaProxy.edad = -5;        // Error

// 8. REFLECT - Métodos para operaciones de objetos
const empleado = {
  nombre: "Pedro",
  salario: 50000
};

// Reflect.apply()
console.log(Reflect.apply(Object.prototype.toString, empleado, []));

// Reflect.construct() - similar a new
function Departamento(nombre) {
  this.nombre = nombre;
}
const depto = Reflect.construct(Departamento, ["Ventas"]);
console.log(depto.nombre); // "Ventas"

// Reflect.defineProperty()
Reflect.defineProperty(empleado, 'id', {
  value: 'EMP001',
  writable: false
});

// Reflect.get() y Reflect.set()
console.log(Reflect.get(empleado, 'nombre')); // "Pedro"
Reflect.set(empleado, 'salario', 55000);

console.log(empleado);`,

    // EJEMPLO 6: PATRONES DE DISEÑO CON OBJETOS
    patronesDisenio: `// PATRONES DE DISEÑO COMUNES CON OBJETOS

// 1. FACTORY PATTERN - Crear objetos sin usar new
class UsuarioFactory {
  static crearUsuario(tipo, datos) {
    switch(tipo) {
      case 'cliente':
        return new Cliente(datos);
      case 'admin':
        return new Administrador(datos);
      case 'vendedor':
        return new Vendedor(datos);
      default:
        throw new Error('Tipo de usuario no válido');
    }
  }
}

class Cliente {
  constructor({ nombre, email, telefono }) {
    this.nombre = nombre;
    this.email = email;
    this.telefono = telefono;
    this.tipo = 'cliente';
    this.fechaRegistro = new Date();
  }
  
  comprar(producto) {
    return \`\${this.nombre} compró \${producto}\`;
  }
}

class Administrador {
  constructor({ nombre, email, nivelAcceso }) {
    this.nombre = nombre;
    this.email = email;
    this.nivelAcceso = nivelAcceso;
    this.tipo = 'admin';
  }
  
  gestionarSistema() {
    return \`\${this.nombre} está gestionando el sistema\`;
  }
}

// Uso del Factory
const cliente1 = UsuarioFactory.crearUsuario('cliente', {
  nombre: "Ana López",
  email: "ana@email.com",
  telefono: "+123456789"
});

const admin1 = UsuarioFactory.crearUsuario('admin', {
  nombre: "Carlos Admin",
  email: "carlos@empresa.com",
  nivelAcceso: "alto"
});

console.log(cliente1.comprar("Laptop"));
console.log(admin1.gestionarSistema());

// 2. SINGLETON PATTERN - Una única instancia
class ConfiguracionSistema {
  constructor() {
    if (ConfiguracionSistema.instance) {
      return ConfiguracionSistema.instance;
    }
    
    this.apiUrl = 'https://api.misistema.com';
    this.timeout = 5000;
    this.modoDebug = false;
    this.versione = '1.0.0';
    
    ConfiguracionSistema.instance = this;
  }
  
  static getInstance() {
    if (!ConfiguracionSistema.instance) {
      ConfiguracionSistema.instance = new ConfiguracionSistema();
    }
    return ConfiguracionSistema.instance;
  }
  
  setModoDebug(activo) {
    this.modoDebug = activo;
  }
  
  getConfig() {
    return {
      apiUrl: this.apiUrl,
      timeout: this.timeout,
      modoDebug: this.modoDebug,
      version: this.version
    };
  }
}

// Uso del Singleton
const config1 = ConfiguracionSistema.getInstance();
const config2 = ConfiguracionSistema.getInstance();

console.log(config1 === config2); // true - Misma instancia

config1.setModoDebug(true);
console.log(config2.getConfig().modoDebug); // true

// 3. MODULE PATTERN - Namespacing y encapsulación
const MiAplicacion = (function() {
  // Variables privadas
  let contador = 0;
  const config = {
    tema: 'oscuro',
    idioma: 'es'
  };
  
  // Métodos privados
  function incrementarContador() {
    contador++;
    console.log(\`Contador: \${contador}\`);
  }
  
  function obtenerConfiguracion() {
    return { ...config }; // Copia para evitar modificación externa
  }
  
  // API pública
  return {
    inicializar: function() {
      incrementarContador();
      console.log('Aplicación inicializada');
    },
    
    cambiarTema: function(nuevoTema) {
      if (['oscuro', 'claro'].includes(nuevoTema)) {
        config.tema = nuevoTema;
        console.log(\`Tema cambiado a: \${nuevoTema}\`);
      }
    },
    
    getConfig: obtenerConfiguracion,
    
    getContador: function() {
      return contador;
    }
  };
})();

// Uso del Module Pattern
MiAplicacion.inicializar(); // "Contador: 1", "Aplicación inicializada"
MiAplicacion.cambiarTema('claro');
console.log(MiAplicacion.getConfig()); // { tema: 'claro', idioma: 'es' }
console.log(MiAplicacion.getContador()); // 1

// 4. OBSERVER PATTERN - Suscripción y notificación
class Observable {
  constructor() {
    this.observadores = [];
  }
  
  suscribir(observador) {
    this.observadores.push(observador);
  }
  
  desuscribir(observador) {
    this.observadores = this.observadores.filter(obs => obs !== observador);
  }
  
  notificar(datos) {
    this.observadores.forEach(observador => {
      if (typeof observador.actualizar === 'function') {
        observador.actualizar(datos);
      }
    });
  }
}

class Tienda extends Observable {
  constructor() {
    super();
    this.productos = [];
    this.promociones = [];
  }
  
  agregarProducto(producto) {
    this.productos.push(producto);
    this.notificar({
      tipo: 'NUEVO_PRODUCTO',
      producto: producto
    });
  }
  
  agregarPromocion(promocion) {
    this.promociones.push(promocion);
    this.notificar({
      tipo: 'NUEVA_PROMOCION', 
      promocion: promocion
    });
  }
}

class ClienteObservador {
  constructor(nombre) {
    this.nombre = nombre;
  }
  
  actualizar(evento) {
    switch(evento.tipo) {
      case 'NUEVO_PRODUCTO':
        console.log(\`[\${this.nombre}] Nuevo producto: \${evento.producto.nombre}\`);
        break;
      case 'NUEVA_PROMOCION':
        console.log(\`[\${this.nombre}] Nueva promoción: \${evento.promocion}\`);
        break;
    }
  }
}

// Uso del Observer Pattern
const tienda = new Tienda();
const cliente1 = new ClienteObservador("Ana");
const cliente2 = new ClienteObservador("Carlos");

tienda.suscribir(cliente1);
tienda.suscribir(cliente2);

tienda.agregarProducto({ nombre: "iPhone 15", precio: 999 });
tienda.agregarPromocion("20% de descuento en electrónicos");`,

    // EJEMPLO 7: SISTEMA COMPLETO E-COMMERCE
    ejemploCompleto: `// === SISTEMA E-COMMERCE CON POO ===

// CLASE BASE PARA PRODUCTOS
class Producto {
  constructor(id, nombre, precio, categoria, stock = 0) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria;
    this.stock = stock;
    this.fechaCreacion = new Date();
  }
  
  // Getter para precio con formato
  get precioFormateado() {
    return \`$\${this.precio.toFixed(2)}\`;
  }
  
  // Getter para disponibilidad
  get disponible() {
    return this.stock > 0;
  }
  
  // Método para actualizar stock
  actualizarStock(cantidad) {
    const nuevoStock = this.stock + cantidad;
    if (nuevoStock >= 0) {
      this.stock = nuevoStock;
      return true;
    }
    return false;
  }
  
  // Método para aplicar descuento
  aplicarDescuento(porcentaje) {
    if (porcentaje > 0 && porcentaje <= 100) {
      this.precio = this.precio * (1 - porcentaje / 100);
      return \`Descuento aplicado: \${porcentaje}%. Nuevo precio: \${this.precioFormateado}\`;
    }
    return "Porcentaje de descuento no válido";
  }
  
  // Método para obtener información del producto
  obtenerInfo() {
    return \`\${this.nombre} - \${this.precioFormateado} (\${this.categoria}) - Stock: \${this.stock}\`;
  }
}

// CLASE PARA PRODUCTO FÍSICO (HERENCIA)
class ProductoFisico extends Producto {
  constructor(id, nombre, precio, categoria, stock, peso, dimensiones) {
    super(id, nombre, precio, categoria, stock);
    this.peso = peso; // en kg
    this.dimensiones = dimensiones; // { ancho, alto, profundidad }
    this.tipo = 'fisico';
  }
  
  calcularEnvio() {
    const costoBase = 5;
    const costoPorKg = 2;
    return costoBase + (this.peso * costoPorKg);
  }
  
  obtenerInfo() {
    return \`\${super.obtenerInfo()} - Peso: \${this.peso}kg - Envío: $\${this.calcularEnvio().toFixed(2)}\`;
  }
}

// CLASE PARA PRODUCTO DIGITAL (HERENCIA)
class ProductoDigital extends Producto {
  constructor(id, nombre, precio, categoria, formato, tamañoMB) {
    super(id, nombre, precio, categoria, 9999); // Stock ilimitado
    this.formato = formato;
    this.tamañoMB = tamañoMB;
    this.tipo = 'digital';
    this.fechaDescarga = null;
  }
  
  descargar() {
    this.fechaDescarga = new Date();
    return \`Producto \${this.nombre} descargado exitosamente (\${this.tamañoMB}MB)\`;
  }
  
  obtenerInfo() {
    return \`\${super.obtenerInfo()} - Formato: \${this.formato} - Tamaño: \${this.tamañoMB}MB\`;
  }
}

// CLASE PARA EL CARRITO DE COMPRAS
class CarritoCompras {
  constructor() {
    this.items = [];
    this.descuento = 0;
    this.impuesto = 0.21; // 21% IVA
  }
  
  agregarProducto(producto, cantidad = 1) {
    if (!producto.disponible) {
      return "Producto no disponible";
    }
    
    if (cantidad > producto.stock && producto.tipo === 'fisico') {
      return "Stock insuficiente";
    }
    
    const itemExistente = this.items.find(item => item.producto.id === producto.id);
    
    if (itemExistente) {
      itemExistente.cantidad += cantidad;
    } else {
      this.items.push({
        producto: producto,
        cantidad: cantidad,
        agregadoEn: new Date()
      });
    }
    
    if (producto.tipo === 'fisico') {
      producto.actualizarStock(-cantidad);
    }
    
    return \`\${cantidad} x \${producto.nombre} agregado al carrito\`;
  }
  
  eliminarProducto(productoId) {
    const itemIndex = this.items.findIndex(item => item.producto.id === productoId);
    
    if (itemIndex !== -1) {
      const item = this.items[itemIndex];
      
      // Devolver stock si es producto físico
      if (item.producto.tipo === 'fisico') {
        item.producto.actualizarStock(item.cantidad);
      }
      
      this.items.splice(itemIndex, 1);
      return "Producto eliminado del carrito";
    }
    
    return "Producto no encontrado en el carrito";
  }
  
  actualizarCantidad(productoId, nuevaCantidad) {
    const item = this.items.find(item => item.producto.id === productoId);
    
    if (item) {
      if (nuevaCantidad <= 0) {
        return this.eliminarProducto(productoId);
      }
      
      if (item.producto.tipo === 'fisico') {
        const diferencia = nuevaCantidad - item.cantidad;
        if (!item.producto.actualizarStock(-diferencia)) {
          return "Stock insuficiente";
        }
      }
      
      item.cantidad = nuevaCantidad;
      return "Cantidad actualizada";
    }
    
    return "Producto no encontrado en el carrito";
  }
  
  // Getter para subtotal
  get subtotal() {
    return this.items.reduce((total, item) => {
      return total + (item.producto.precio * item.cantidad);
    }, 0);
  }
  
  // Getter para total con impuestos y descuento
  get total() {
    const subtotalConDescuento = this.subtotal * (1 - this.descuento / 100);
    return subtotalConDescuento * (1 + this.impuesto);
  }
  
  aplicarDescuento(porcentaje) {
    if (porcentaje >= 0 && porcentaje <= 100) {
      this.descuento = porcentaje;
      return \`Descuento del \${porcentaje}% aplicado\`;
    }
    return "Porcentaje de descuento no válido";
  }
  
  vaciarCarrito() {
    // Devolver stock de productos físicos
    this.items.forEach(item => {
      if (item.producto.tipo === 'fisico') {
        item.producto.actualizarStock(item.cantidad);
      }
    });
    
    this.items = [];
    this.descuento = 0;
    return "Carrito vaciado";
  }
  
  obtenerResumen() {
    if (this.items.length === 0) {
      return "El carrito está vacío";
    }
    
    let resumen = "=== RESUMEN DEL CARRITO ===\\n";
    resumen += \`Items: \${this.items.length}\\n\`;
    
    this.items.forEach((item, index) => {
      resumen += \`\${index + 1}. \${item.producto.nombre} x\${item.cantidad} - $\${(item.producto.precio * item.cantidad).toFixed(2)}\\n\`;
    });
    
    resumen += \`\\nSubtotal: $\${this.subtotal.toFixed(2)}\\\n\`;
    resumen += \`Descuento: \${this.descuento}%\\n\`;
    resumen += \`Impuesto: \${(this.impuesto * 100)}%\\n\`;
    resumen += \`TOTAL: $\${this.total.toFixed(2)}\`;
    
    return resumen;
  }
}

// CLASE PARA LA ORDEN DE COMPRA
class Orden {
  static ultimoId = 0;
  
  constructor(carrito, cliente) {
    Orden.ultimoId++;
    this.id = Orden.ultimoId;
    this.carrito = carrito;
    this.cliente = cliente;
    this.fechaCreacion = new Date();
    this.estado = 'pendiente'; // pendiente, procesando, enviado, completado, cancelado
    this.numeroSeguimiento = null;
    this.direccionEnvio = null;
  }
  
  procesarPago() {
    if (this.estado !== 'pendiente') {
      return "La orden ya ha sido procesada";
    }
    
    // Simular procesamiento de pago
    this.estado = 'procesando';
    
    // Generar número de seguimiento para productos físicos
    const tieneProductosFisicos = this.carrito.items.some(item => 
      item.producto.tipo === 'fisico'
    );
    
    if (tieneProductosFisicos) {
      this.numeroSeguimiento = 'SEG' + Math.random().toString(36).substr(2, 8).toUpperCase();
    }
    
    setTimeout(() => {
      this.estado = tieneProductosFisicos ? 'enviado' : 'completado';
      console.log(\`Orden \${this.id} procesada exitosamente\`);
    }, 2000);
    
    return \`Orden \${this.id} en proceso...\`;
  }
  
  obtenerDetalles() {
    let detalles = \`=== ORDEN #\${this.id} ===\\n\`;
    detalles += \`Cliente: \${this.cliente.nombre}\\n\`;
    detalles += \`Fecha: \${this.fechaCreacion.toLocaleString()}\\n\`;
    detalles += \`Estado: \${this.estado.toUpperCase()}\\n\`;
    
    if (this.numeroSeguimiento) {
      detalles += \`Número de seguimiento: \${this.numeroSeguimiento}\\n\`;
    }
    
    detalles += "\\n" + this.carrito.obtenerResumen();
    
    return detalles;
  }
}

// CLASE PARA EL CLIENTE
class Cliente {
  constructor(id, nombre, email, direccion = null) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.direccion = direccion;
    this.fechaRegistro = new Date();
    this.historialOrdenes = [];
    this.esPremium = false;
  }
  
  hacerPremium() {
    this.esPremium = true;
    return \`\${this.nombre} ahora es cliente premium\`;
  }
  
  agregarOrden(orden) {
    this.historialOrdenes.push(orden);
  }
  
  obtenerHistorial() {
    return \`\${this.nombre} tiene \${this.historialOrdenes.length} orden(es) en su historial\`;
  }
}

// === DEMOSTRACIÓN DEL SISTEMA ===
console.log("=== SISTEMA E-COMMERCE CON POO ===\\n");

// Crear productos
const laptop = new ProductoFisico(1, "Laptop Gaming", 1200, "Tecnología", 10, 2.5, { ancho: 35, alto: 25, profundidad: 5 });
const ebook = new ProductoDigital(2, "JavaScript Eloquente", 29.99, "Educación", "PDF", 15);
const mouse = new ProductoFisico(3, "Mouse Inalámbrico", 45.99, "Tecnología", 25, 0.2, { ancho: 12, alto: 6, profundidad: 4 });

console.log("PRODUCTOS CREADOS:");
console.log(laptop.obtenerInfo());
console.log(ebook.obtenerInfo());
console.log(mouse.obtenerInfo());

// Crear cliente
const cliente = new Cliente(1, "Ana García", "ana@email.com", "Calle Principal 123");
cliente.hacerPremium();
console.log(\`\\nCLIENTE: \${cliente.nombre} (\${cliente.esPremium ? 'Premium' : 'Standard'})\`);

// Crear carrito y agregar productos
const carrito = new CarritoCompras();
console.log("\\nAGREGANDO PRODUCTOS AL CARRITO:");
console.log(carrito.agregarProducto(laptop, 1));
console.log(carrito.agregarProducto(ebook, 1));
console.log(carrito.agregarProducto(mouse, 2));

// Aplicar descuento
console.log(carrito.aplicarDescuento(10));

// Mostrar resumen del carrito
console.log("\\n" + carrito.obtenerResumen());

// Crear y procesar orden
console.log("\\nPROCESANDO ORDEN:");
const orden = new Orden(carrito, cliente);
console.log(orden.procesarPago());

// Mostrar detalles de la orden después de procesar
setTimeout(() => {
  console.log("\\n" + orden.obtenerDetalles());
  
  // Agregar orden al historial del cliente
  cliente.agregarOrden(orden);
  console.log("\\n" + cliente.obtenerHistorial());
  
  // Demostrar herencia y polimorfismo
  console.log("\\n=== DEMOSTRACIÓN DE HERENCIA ===");
  console.log(\`laptop instanceof ProductoFisico: \${laptop instanceof ProductoFisico}\`);
  console.log(\`laptop instanceof Producto: \${laptop instanceof Producto}\`);
  console.log(\`ebook instanceof ProductoDigital: \${ebook instanceof ProductoDigital}\`);
  console.log(\`ebook instanceof Producto: \${ebook instanceof Producto}\`);
  
}, 3000);`
  };

  return (
    <div className="guia-contenido">
      <header className="guia-header">
        <h1>Objetos y Programación Orientada a Objetos en JavaScript</h1>
        <div className="guia-meta">
          <span className="nivel">Intermedio-Avanzado</span>
          <span className="tiempo">80-100 minutos</span>
          <span className="temas">7 temas principales</span>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <div className="guia-contenido-principal">
        
        {/* SECCIÓN 1: INTRODUCCIÓN A OBJETOS */}
        <section className="guia-seccion">
          <h2>¿Qué son los Objetos en JavaScript?</h2>
          
          <div className="concepto-card">
            <div className="concepto-content">
              <h3>🏗️ Estructuras Fundamentales de Datos</h3>
              <p>Los objetos son la estructura de datos más importante en JavaScript. Son colecciones de propiedades que consisten en pares clave-valor, donde las claves son strings (o Symbols) y los valores pueden ser de cualquier tipo, incluyendo otros objetos y funciones.</p>
              
              <div className="lista-conceptos">
                <h4>🔧 Características Clave de los Objetos:</h4>
                <ul>
                  <li><strong>Propiedades:</strong> Pares clave-valor que almacenan datos</li>
                  <li><strong>Métodos:</strong> Funciones que son propiedades de un objeto</li>
                  <li><strong>Prototipos:</strong> Mecanismo de herencia para compartir propiedades</li>
                  <li><strong>Dinámicos:</strong> Se pueden agregar, modificar y eliminar propiedades en tiempo de ejecución</li>
                  <li><strong>Referencias:</strong> Se pasan por referencia, no por valor</li>
                  <li><strong>Encapsulación:</strong> Agrupan datos y comportamientos relacionados</li>
                </ul>
              </div>

              <div className="analogia">
                <h4>🏢 Analogía de un Edificio</h4>
                <div className="analogia-grid">
                  <div className="analogia-item">
                    <span className="emoji">🏢</span>
                    <strong>Edificio</strong>
                    <span>Objeto</span>
                  </div>
                  <div className="analogia-item">
                    <span className="emoji">🚪</span>
                    <strong>Departamentos</strong>
                    <span>Propiedades</span>
                  </div>
                  <div className="analogia-item">
                    <span className="emoji">🔑</span>
                    <strong>Llaves</strong>
                    <span>Claves</span>
                  </div>
                  <div className="analogia-item">
                    <span className="emoji">👨‍💼</span>
                    <strong>Residentes</strong>
                    <span>Valores</span>
                  </div>
                  <div className="analogia-item">
                    <span className="emoji">🛠️</span>
                    <strong>Servicios</strong>
                    <span>Métodos</span>
                  </div>
                  <div className="analogia-item">
                    <span className="emoji">🏗️</span>
                    <strong>Planos</strong>
                    <span>Prototipos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="codigo-contenedor">
            <div className="codigo-header">
              <span>Ejemplo 1: Introducción a Objetos - Creación, Acceso y Métodos</span>
              <button 
                className={`btn-copiar ${copiado === 'introduccionObjetos' ? 'copiado' : ''}`}
                onClick={() => copiarCodigo(ejemplosCodigo.introduccionObjetos, 'introduccionObjetos')}
              >
                {copiado === 'introduccionObjetos' ? '✓ Copiado' : '📋 Copiar'}
              </button>
            </div>
            <pre className="codigo-ejemplo">
              <code>{ejemplosCodigo.introduccionObjetos}</code>
            </pre>
          </div>

          <div className="beneficios-grid">
            <div className="beneficio-card">
              <div className="beneficio-icono">🧩</div>
              <h4>Organización</h4>
              <p>Agrupan datos y comportamientos relacionados lógicamente</p>
            </div>
            <div className="beneficio-card">
              <div className="beneficio-icono">🔄</div>
              <h4>Reutilización</h4>
              <p>Permiten crear múltiples instancias con la misma estructura</p>
            </div>
            <div className="beneficio-card">
              <div className="beneficio-icono">🔒</div>
              <h4>Encapsulación</h4>
              <p>Ocultan detalles de implementación y exponen interfaces claras</p>
            </div>
            <div className="beneficio-card">
              <div className="beneficio-icono">🏗️</div>
              <h4>Extensibilidad</h4>
              <p>Fáciles de extender y modificar sin afectar código existente</p>
            </div>
            <div className="beneficio-card">
              <div className="beneficio-icono">🎯</div>
              <h4>Modelado</h4>
              <p>Representan entidades del mundo real de manera natural</p>
            </div>
            <div className="beneficio-card">
              <div className="beneficio-icono">⚡</div>
              <h4>Performance</h4>
              <p>Acceso rápido a propiedades mediante tablas hash internas</p>
            </div>
          </div>

          <div className="nota-importante">
            <h4>💡 Objetos vs Arrays vs Map</h4>
            <p><strong>Objetos:</strong> Ideales para estructuras con propiedades nombradas, herencia prototipal y métodos. <strong>Arrays:</strong> Mejores para colecciones ordenadas con acceso por índice. <strong>Map:</strong> Superiores cuando necesitas claves de cualquier tipo, preservar orden de inserción o iteración frecuente.</p>
          </div>
        </section>

        {/* SECCIÓN 3: CONSTRUCTORES Y PROTOTIPOS */}
        <section className="guia-seccion">
          <h2>Constructores y Prototipos</h2>
          
          <div className="concepto-card">
            <div className="concepto-content">
              <h3>🏗️ Sistema de Herencia Prototipal</h3>
              <p>Antes de ES6, JavaScript usaba funciones constructoras y prototipos para implementar la programación orientada a objetos. Este sistema es fundamental para entender cómo funciona JavaScript internamente.</p>

              <h4>🎯 Conceptos Clave del Sistema Prototipal:</h4>
              <ul>
                <li><strong>Función Constructora:</strong> Función que crea objetos con <code>new</code></li>
                <li><strong>Prototipo:</strong> Objeto del que heredan todas las instancias</li>
                <li><strong>Cadena Prototipal:</strong> Mecanismo de búsqueda de propiedades</li>
                <li><strong>Herencia Prototipal:</strong> Un objeto hereda de otro objeto</li>
                <li><strong>Métodos de Instancia vs Prototipo:</strong> Eficiencia en uso de memoria</li>
              </ul>

              <h4>🔧 Ventajas del Sistema Prototipal:</h4>
              <ul>
                <li><strong>Flexibilidad:</strong> Los objetos pueden cambiar en tiempo de ejecución</li>
                <li><strong>Eficiencia de Memoria:</strong> Métodos compartidos entre instancias</li>
                <li><strong>Dinamismo:</strong> Se puede modificar el prototipo en cualquier momento</li>
                <li><strong>Compatibilidad:</strong> Funciona en todos los navegadores, incluso antiguos</li>
              </ul>
            </div>
          </div>

          <div className="codigo-contenedor">
            <div className="codigo-header">
              <span>Ejemplo 3: Constructores y Prototipos - Herencia Prototipal</span>
              <button 
                className={`btn-copiar ${copiado === 'constructoresPrototipos' ? 'copiado' : ''}`}
                onClick={() => copiarCodigo(ejemplosCodigo.constructoresPrototipos, 'constructoresPrototipos')}
              >
                {copiado === 'constructoresPrototipos' ? '✓ Copiado' : '📋 Copiar'}
              </button>
            </div>
            <pre className="codigo-ejemplo">
              <code>{ejemplosCodigo.constructoresPrototipos}</code>
            </pre>
          </div>

          <div className="tabla-contenedor">
            <h4>📊 Comparación: Métodos de Instancia vs Prototipo</h4>
            <table className="tabla-guia">
              <thead>
                <tr>
                  <th>Aspecto</th>
                  <th>Métodos de Instancia</th>
                  <th>Métodos de Prototipo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Memoria</strong></td>
                  <td>Cada instancia tiene su copia</td>
                  <td>Compartido entre todas las instancias</td>
                </tr>
                <tr>
                  <td><strong>Rendimiento</strong></td>
                  <td>Ligeramente más rápido acceso</td>
                  <td>Búsqueda en cadena prototipal</td>
                </tr>
                <tr>
                  <td><strong>Flexibilidad</strong></td>
                  <td>Puede variar por instancia</td>
                  <td>Afecta a todas las instancias</td>
                </tr>
                <tr>
                  <td><strong>Uso Recomendado</strong></td>
                  <td>Datos específicos por instancia</td>
                  <td>Comportamiento compartido</td>
                </tr>
                <tr>
                  <td><strong>Ejemplo</strong></td>
                  <td><code>this.metodo = function() {}</code></td>
                  <td><code>Constructor.prototype.metodo = function() {}</code></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="patrones-avanzados">
            <h4>🔧 Patrones Avanzados con Prototipos</h4>
            
            <div className="patron-grid">
              <div className="patron-card">
                <h5>Mixins con Prototipos</h5>
                <pre><code>{`function MixinLoggable(Base) {
  return function(...args) {
    const instance = new Base(...args);
    instance.log = function(mensaje) {
      console.log(\`[\${this.constructor.name}] \${mensaje}\`);
    };
    return instance;
  };
}

const UsuarioConLog = MixinLoggable(Usuario);
const user = new UsuarioConLog("Ana");
user.log("Usuario creado");`}</code></pre>
                <p>Añade funcionalidad a clases existentes.</p>
              </div>
              
              <div className="patron-card">
                <h5>Herencia Múltiple Simulada</h5>
                <pre><code>{`function HerenciaMultiple(...constructores) {
  function ClaseCombinada() {
    constructores.forEach(Constructor => {
      Constructor.apply(this, arguments);
    });
  }
  
  constructores.forEach(Constructor => {
    Object.getOwnPropertyNames(Constructor.prototype)
      .forEach(prop => {
        if (prop !== 'constructor') {
          ClaseCombinada.prototype[prop] = Constructor.prototype[prop];
        }
      });
  });
  
  return ClaseCombinada;
}`}</code></pre>
                <p>Combina múltiples constructores en uno.</p>
              </div>
              
              <div className="patron-card">
                <h5>Decoradores de Prototipos</h5>
                <pre><code>{`function decorarConValidacion(Constructor) {
  const proto = Constructor.prototype;
  const original = proto.guardar;
  
  proto.guardar = function() {
    if (this.validar()) {
      return original.call(this);
    }
    throw new Error("Validación fallida");
  };
  return Constructor;
}`}</code></pre>
                <p>Añade validación automática a métodos.</p>
              </div>
            </div>
          </div>

          <div className="nota-advertencia">
            <h4>⚠️ Consideraciones Importantes con Prototipos</h4>
            <ul>
              <li><strong>No modifiques <code>Object.prototype</code>:</strong> Afecta a todos los objetos del sistema</li>
              <li><strong>Usa <code>hasOwnProperty</code>:</strong> Para distinguir propiedades propias de heredadas</li>
              <li><strong>Cuidado con <code>__proto__</code>:</strong> Es deprecated, usa <code>Object.getPrototypeOf()</code></li>
              <li><strong>Performance:</strong> La cadena prototipal muy larga puede afectar rendimiento</li>
              <li><strong>Constructor property:</strong> Siempre establece correctamente <code>prototype.constructor</code></li>
            </ul>
          </div>

          <div className="resumen-practicas">
            <h4>🎯 Mejores Prácticas con Constructores</h4>
            <ul>
              <li><strong>Nombres en PascalCase:</strong> <code>function Persona()</code> no <code>function persona()</code></li>
              <li><strong>Usa <code>new</code>:</strong> Siempre llama constructores con <code>new</code></li>
              <li><strong>Validación opcional:</strong> Puedes verificar si se usó <code>new</code> con <code>instanceof</code></li>
              <li><strong>Métodos en prototipo:</strong> Para eficiencia de memoria</li>
              <li><strong>Propiedades en constructor:</strong> Para datos específicos por instancia</li>
              <li><strong>Herencia con <code>Object.create()</code>:</strong> Método moderno y seguro</li>
            </ul>
          </div>
        </section>

        {/* SECCIÓN 4: CLASES ES6 */}
        <section className="guia-seccion">
          <h2>Clases ES6 - Programación Orientada a Objetos Moderna</h2>
          
          <div className="concepto-card">
            <div className="concepto-content">
              <h3>🎭 Sintaxis Azucarada para POO</h3>
              <p>Las clases en ES6 son una sintaxis más clara y familiar para trabajar con el sistema de prototipos de JavaScript. No introducen un nuevo modelo de herencia, sino que proporcionan una sintaxis más limpia para el modelo existente.</p>

              <h4>🎯 Características de las Clases ES6:</h4>
              <ul>
                <li><strong>Constructor:</strong> Método especial para inicializar instancias</li>
                <li><strong>Métodos de Instancia:</strong> Funciones disponibles en cada instancia</li>
                <li><strong>Getters/Setters:</strong> Control de acceso a propiedades</li>
                <li><strong>Métodos Estáticos:</strong> Funciones de la clase, no de las instancias</li>
                <li><strong>Herencia:</strong> Con <code>extends</code> y <code>super</code></li>
                <li><strong>Campos Privados:</strong> Propiedades y métodos privados (ES2022)</li>
              </ul>

              <h4>🚀 Ventajas sobre Constructores Tradicionales:</h4>
              <ul>
                <li><strong>Sintaxis más limpia:</strong> Más familiar para desarrolladores de otros lenguajes</li>
                <li><strong>Mejor legibilidad:</strong> Estructura clara y organizada</li>
                <li><strong>Herencia más simple:</strong> <code>extends</code> y <code>super</code> en lugar de manipulación manual de prototipos</li>
                <li><strong>Módulos nativos:</strong> Integración perfecta con ES6 modules</li>
                <li><strong>Tooling mejorado:</strong> Mejor soporte en IDEs y herramientas de desarrollo</li>
              </ul>
            </div>
          </div>

          <div className="codigo-contenedor">
            <div className="codigo-header">
              <span>Ejemplo 4: Clases ES6 - Sintaxis Moderna, Herencia y Campos Privados</span>
              <button 
                className={`btn-copiar ${copiado === 'clasesES6' ? 'copiado' : ''}`}
                onClick={() => copiarCodigo(ejemplosCodigo.clasesES6, 'clasesES6')}
              >
                {copiado === 'clasesES6' ? '✓ Copiado' : '📋 Copiar'}
              </button>
            </div>
            <pre className="codigo-ejemplo">
              <code>{ejemplosCodigo.clasesES6}</code>
            </pre>
          </div>

          <div className="tabla-contenedor">
            <h4>📊 Comparación: Clases ES6 vs Constructores Tradicionales</h4>
            <table className="tabla-guia">
              <thead>
                <tr>
                  <th>Característica</th>
                  <th>Clases ES6</th>
                  <th>Constructores ES5</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Sintaxis</strong></td>
                  <td><code>class MiClase { }</code></td>
                  <td><code>function MiClase() { }</code></td>
                </tr>
                <tr>
                  <td><strong>Constructor</strong></td>
                  <td><code>constructor() { }</code></td>
                  <td><code>function MiClase() { }</code></td>
                </tr>
                <tr>
                  <td><strong>Métodos</strong></td>
                  <td><code>metodo() { }</code></td>
                  <td><code>MiClase.prototype.metodo = function() { }</code></td>
                </tr>
                <tr>
                  <td><strong>Herencia</strong></td>
                  <td><code>extends</code> + <code>super</code></td>
                  <td><code>Object.create()</code> + manipulación manual</td>
                </tr>
                <tr>
                  <td><strong>Getters/Setters</strong></td>
                  <td><code>get prop()</code> / <code>set prop()</code></td>
                  <td><code>Object.defineProperty()</code></td>
                </tr>
                <tr>
                  <td><strong>Métodos Estáticos</strong></td>
                  <td><code>static metodo() { }</code></td>
                  <td><code>MiClase.metodo = function() { }</code></td>
                </tr>
                <tr>
                  <td><strong>Hoisting</strong></td>
                  <td>No hoisted</td>
                  <td>Hoisted (declaración de función)</td>
                </tr>
                <tr>
                  <td><strong>Campos Privados</strong></td>
                  <td><code>#campo</code> (ES2022)</td>
                  <td>Convenciones (<code>_campo</code>) o closures</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="patrones-avanzados">
            <h4>🔧 Patrones Avanzados con Clases</h4>
            
            <div className="patron-grid">
              <div className="patron-card">
                <h5>Class Mixins</h5>
                <pre><code>{`const Loggable = (Base) => class extends Base {
  log(mensaje) {
    console.log(\`[\${this.constructor.name}] \${mensaje}\`);
  }
};

const Serializable = (Base) => class extends Base {
  serializar() {
    return JSON.stringify(this);
  }
};

class Usuario extends Loggable(Serializable(Object)) {
  constructor(nombre) {
    super();
    this.nombre = nombre;
  }
}`}</code></pre>
                <p>Composición de funcionalidades con mixins.</p>
              </div>
              
              <div className="patron-card">
                <h5>Singleton con Clase</h5>
                <pre><code>{`class DatabaseConnection {
  static #instancia;
  
  constructor() {
    if (DatabaseConnection.#instancia) {
      return DatabaseConnection.#instancia;
    }
    this.conexion = this.#conectar();
    DatabaseConnection.#instancia = this;
  }
  
  static getInstance() {
    if (!this.#instancia) {
      this.#instancia = new DatabaseConnection();
    }
    return this.#instancia;
  }
  
  #conectar() {
    return "Conexión establecida";
  }
}`}</code></pre>
                <p>Garantiza una única instancia.</p>
              </div>
              
              <div className="patron-card">
                <h5>Builder Pattern</h5>
                <pre><code>{`class QueryBuilder {
  constructor() {
    this.query = {};
  }
  
  select(campos) {
    this.query.select = campos;
    return this;
  }
  
  where(condiciones) {
    this.query.where = condiciones;
    return this;
  }
  
  limit(numero) {
    this.query.limit = numero;
    return this;
  }
  
  build() {
    return this.query;
  }
}

// Uso fluido
const query = new QueryBuilder()
  .select(['nombre', 'email'])
  .where({ edad: { $gt: 18 } })
  .limit(10)
  .build();`}</code></pre>
                <p>Construcción compleja paso a paso.</p>
              </div>
            </div>
          </div>

          <div className="nota-importante">
            <h4>💡 Diferencias Clave entre Clases y Objetos Literales</h4>
            <ul>
              <li><strong>Clases:</strong> Para crear múltiples instancias con mismo comportamiento, herencia, encapsulación</li>
              <li><strong>Objetos Literales:</strong> Para estructuras de datos únicas, configuración, namespacing</li>
              <li><strong>Cuándo usar clases:</strong> Cuando necesitas crear muchas instancias similares</li>
              <li><strong>Cuándo usar objetos literales:</strong> Para datos de configuración, opciones, estructuras únicas</li>
              <li><strong>Performance:</strong> Las clases son ligeramente más eficientes para muchas instancias</li>
            </ul>
          </div>

          <div className="resumen-practicas">
            <h4>🎯 Mejores Prácticas con Clases ES6</h4>
            <ul>
              <li><strong>Usa <code>class</code> para herencia:</strong> Es más claro que la manipulación manual de prototipos</li>
              <li><strong>Nombres en PascalCase:</strong> <code>class MiClase</code> no <code>class miClase</code></li>
              <li><strong>Llama <code>super()</code> en constructores heredados:</strong> Antes de usar <code>this</code></li>
              <li><strong>Usa campos privados para estado interno:</strong> <code>#campoPrivado</code> en lugar de <code>_convencion</code></li>
              <li><strong>Métodos estáticos para utilidades:</strong> No dependen del estado de instancia</li>
              <li><strong>Getters para propiedades calculadas:</strong> Encapsulan lógica de cálculo</li>
              <li><strong>Evita métodos arrow en clases:</strong> Problemas con <code>this</code> y herencia</li>
            </ul>
          </div>

          <div className="nota-advertencia">
            <h4>⚠️ Limitaciones y Consideraciones de las Clases</h4>
            <ul>
              <li><strong>No son "realmente clases":</strong> Son azúcar sintáctico sobre prototipos</li>
              <li><strong>No hay propiedades de instancia en la declaración:</strong> Solo en constructor</li>
              <li><strong>No hay métodos privados "reales" antes de ES2022:</strong> Solo convenciones</li>
              <li><strong>No hay sobrecarga de métodos:</strong> JavaScript no soporta sobrecarga</li>
              <li><strong>Herencia múltiple no nativa:</strong> Se simula con mixins o composición</li>
              <li><strong>No hoisting:</strong> Las clases no se elevan como las funciones</li>
            </ul>
          </div>
        </section>

        {/* SECCIÓN 5: OBJETOS AVANZADOS Y MÉTODOS */}
        <section className="guia-seccion">
          <h2>Objetos Avanzados y Métodos de Object</h2>
          
          <div className="concepto-card">
            <div className="concepto-content">
              <h3>🔧 Herramientas Poderosas para Manipulación de Objetos</h3>
              <p>JavaScript proporciona un conjunto completo de métodos estáticos en el objeto <code>Object</code> que permiten realizar operaciones avanzadas de inspección, manipulación y control sobre objetos.</p>

              <h4>🎯 Categorías de Métodos de Object:</h4>
              <ul>
                <li><strong>Creación y Clonación:</strong> <code>create()</code>, <code>assign()</code>, spread operator</li>
                <li><strong>Inmutabilidad:</strong> <code>freeze()</code>, <code>seal()</code>, <code>preventExtensions()</code></li>
                <li><strong>Definición de Propiedades:</strong> <code>defineProperty()</code>, <code>defineProperties()</code></li>
                <li><strong>Inspección:</strong> <code>keys()</code>, <code>values()</code>, <code>entries()</code></li>
                <li><strong>Control Avanzado:</strong> <code>Proxy</code>, <code>Reflect</code></li>
                <li><strong>Verificación:</strong> <code>is()</code>, <code>hasOwn()</code>, <code>getPrototypeOf()</code></li>
              </ul>

              <h4>🚀 Casos de Uso Avanzados:</h4>
              <ul>
                <li><strong>Validación de Datos:</strong> Con Proxy para interceptar asignaciones</li>
                <li><strong>Observables:</strong> Para reaccionar a cambios en objetos</li>
                <li><strong>Inmutabilidad:</strong> Para programación funcional y estado predecible</li>
                <li><strong>Metaprogramación:</strong> Programar el comportamiento del programa</li>
                <li><strong>Seguridad:</strong> Prevenir modificaciones no deseadas</li>
              </ul>
            </div>
          </div>

          <div className="codigo-contenedor">
            <div className="codigo-header">
              <span>Ejemplo 5: Objetos Avanzados - Métodos de Object, Proxy, Reflect</span>
              <button 
                className={`btn-copiar ${copiado === 'objetosAvanzados' ? 'copiado' : ''}`}
                onClick={() => copiarCodigo(ejemplosCodigo.objetosAvanzados, 'objetosAvanzados')}
              >
                {copiado === 'objetosAvanzados' ? '✓ Copiado' : '📋 Copiar'}
              </button>
            </div>
            <pre className="codigo-ejemplo">
              <code>{ejemplosCodigo.objetosAvanzados}</code>
            </pre>
          </div>

          <div className="tabla-contenedor">
            <h4>📊 Métodos de Inmutabilidad: freeze vs seal vs preventExtensions</h4>
            <table className="tabla-guia">
              <thead>
                <tr>
                  <th>Operación</th>
                  <th><code>Object.freeze()</code></th>
                  <th><code>Object.seal()</code></th>
                  <th><code>Object.preventExtensions()</code></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Agregar propiedades</strong></td>
                  <td>❌ No permitido</td>
                  <td>❌ No permitido</td>
                  <td>❌ No permitido</td>
                </tr>
                <tr>
                  <td><strong>Eliminar propiedades</strong></td>
                  <td>❌ No permitido</td>
                  <td>❌ No permitido</td>
                  <td>✅ Permitido</td>
                </tr>
                <tr>
                  <td><strong>Modificar propiedades existentes</strong></td>
                  <td>❌ No permitido</td>
                  <td>✅ Permitido</td>
                  <td>✅ Permitido</td>
                </tr>
                <tr>
                  <td><strong>Reconfigurar propiedades</strong></td>
                  <td>❌ No permitido</td>
                  <td>❌ No permitido</td>
                  <td>✅ Permitido</td>
                </tr>
                <tr>
                  <td><strong>Uso común</strong></td>
                  <td>Constantes, configuración</td>
                  <td>Objetos con estructura fija</td>
                  <td>Objetos que pueden cambiar pero no crecer</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="patrones-avanzados">
            <h4>🔧 Patrones con Proxy y Reflect</h4>
            
            <div className="patron-grid">
              <div className="patron-card">
                <h5>Validation Proxy</h5>
                <pre><code>{`function crearValidador(esquema) {
  return new Proxy({}, {
    set(target, prop, value) {
      if (esquema[prop]) {
        const valido = esquema[prop](value);
        if (!valido) throw new Error(\`\${prop} no válido: \${value}\`);
      }
      target[prop] = value;
      return true;
    }
  });
}

const usuarioValidador = crearValidador({
  edad: v => v >= 0 && v <= 150,
  email: v => v.includes('@'),
  nombre: v => v.length >= 2
});`}</code></pre>
                <p>Validación automática de propiedades.</p>
              </div>
              
              <div className="patron-card">
                <h5>Observable con Proxy</h5>
                <pre><code>{`function observable(obj, callback) {
  return new Proxy(obj, {
    set(target, prop, value) {
      const oldValue = target[prop];
      target[prop] = value;
      callback(prop, oldValue, value);
      return true;
    }
  });
}

const estado = observable({ contador: 0 }, (prop, viejo, nuevo) => {
  console.log(\`\${prop} cambió de \${viejo} a \${nuevo}\`);
});`}</code></pre>
                <p>Reaccionar a cambios en objetos.</p>
              </div>
              
              <div className="patron-card">
                <h5>Lazy Loading Proxy</h5>
                <pre><code>{`function lazy(obj, cargador) {
  return new Proxy(obj, {
    get(target, prop) {
      if (!(prop in target) && cargador[prop]) {
        target[prop] = cargador[prop]();
      }
      return target[prop];
    }
  });
}

const datos = lazy({}, {
  usuarios: () => fetch('/api/usuarios').then(r => r.json()),
  productos: () => fetch('/api/productos').then(r => r.json())
});`}</code></pre>
                <p>Carga perezosa de propiedades.</p>
              </div>
            </div>
          </div>

          <div className="nota-importante">
            <h4>💡 Cuándo Usar Proxy vs Getters/Setters</h4>
            <ul>
              <li><strong>Usa Proxy cuando:</strong> Necesitas interceptar muchas operaciones, crear comportamientos complejos, o trabajar con objetos dinámicos</li>
              <li><strong>Usa Getters/Setters cuando:</strong> Solo necesitas controlar acceso a propiedades específicas, el comportamiento es simple, o necesitas compatibilidad con navegadores antiguos</li>
              <li><strong>Performance:</strong> Los getters/setters son más rápidos que Proxy</li>
              <li><strong>Flexibilidad:</strong> Proxy puede interceptar más operaciones (has, delete, etc.)</li>
              <li><strong>Compatibilidad:</strong> Getters/setters tienen mejor soporte en navegadores antiguos</li>
            </ul>
          </div>

          <div className="resumen-practicas">
            <h4>🎯 Mejores Prácticas con Métodos Avanzados</h4>
            <ul>
              <li><strong>Usa <code>Object.assign()</code> para merging simple:</strong> Pero considera spread operator para inmutabilidad</li>
              <li><strong><code>Object.freeze()</code> para configuración:</strong> Previene cambios accidentales</li>
              <li><strong>Proxy para metaprogramación compleja:</strong> Validación, logging, observables</li>
              <li><strong>Reflect para operaciones reflexivas:</strong> Cuando necesites control fino sobre operaciones de objetos</li>
              <li><strong>Verifica inmutabilidad:</strong> Con <code>Object.isFrozen()</code>, <code>isSealed()</code>, etc.</li>
              <li><strong>Considera performance:</strong> Algunos métodos avanzados pueden tener impacto</li>
            </ul>
          </div>
        </section>

        {/* SECCIÓN 6: PATRONES DE DISEÑO CON OBJETOS */}
        <section className="guia-seccion">
          <h2>Patrones de Diseño con Objetos</h2>
          
          <div className="concepto-card">
            <div className="concepto-content">
              <h3>🎨 Soluciones Probadas para Problemas Comunes</h3>
              <p>Los patrones de diseño son soluciones reutilizables para problemas comunes en el diseño de software. En JavaScript, muchos de estos patrones se implementan naturalmente usando objetos y funciones.</p>

              <h4>🎯 Patrones Creacionales:</h4>
              <ul>
                <li><strong>Factory:</strong> Crear objetos sin especificar la clase exacta</li>
                <li><strong>Singleton:</strong> Garantizar una única instancia</li>
                <li><strong>Builder:</strong> Construir objetos complejos paso a paso</li>
                <li><strong>Prototype:</strong> Crear nuevos objetos clonando existentes</li>
              </ul>

              <h4>🎯 Patrones Estructurales:</h4>
              <ul>
                <li><strong>Module:</strong> Encapsular código en módulos independientes</li>
                <li><strong>Decorator:</strong> Añadir funcionalidad dinámicamente</li>
                <li><strong>Facade:</strong> Proporcionar una interfaz simplificada</li>
                <li><strong>Proxy:</strong> Controlar acceso a objetos</li>
              </ul>

              <h4>🎯 Patrones de Comportamiento:</h4>
              <ul>
                <li><strong>Observer:</strong> Notificar cambios a múltiples objetos</li>
                <li><strong>Strategy:</strong> Definir familia de algoritmos intercambiables</li>
                <li><strong>Command:</strong> Encapsular requests como objetos</li>
                <li><strong>State:</strong> Cambiar comportamiento según estado interno</li>
              </ul>
            </div>
          </div>

          <div className="codigo-contenedor">
            <div className="codigo-header">
              <span>Ejemplo 6: Patrones de Diseño - Factory, Singleton, Module, Observer</span>
              <button 
                className={`btn-copiar ${copiado === 'patronesDisenio' ? 'copiado' : ''}`}
                onClick={() => copiarCodigo(ejemplosCodigo.patronesDisenio, 'patronesDisenio')}
              >
                {copiado === 'patronesDisenio' ? '✓ Copiado' : '📋 Copiar'}
              </button>
            </div>
            <pre className="codigo-ejemplo">
              <code>{ejemplosCodigo.patronesDisenio}</code>
            </pre>
          </div>

          <div className="tabla-contenedor">
            <h4>📊 Comparación de Patrones Creacionales</h4>
            <table className="tabla-guia">
              <thead>
                <tr>
                  <th>Patrón</th>
                  <th>Propósito</th>
                  <th>Cuándo Usar</th>
                  <th>Ventajas</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Factory</strong></td>
                  <td>Crear objetos sin especificar clase exacta</td>
                  <td>Cuando el tipo de objeto depende de condiciones en runtime</td>
                  <td>Acoplamiento bajo, fácil extensión</td>
                </tr>
                <tr>
                  <td><strong>Singleton</strong></td>
                  <td>Una única instancia global</td>
                  <td>Cuando solo debe existir una instancia (config, conexiones)</td>
                  <td>Acceso global controlado</td>
                </tr>
                <tr>
                  <td><strong>Builder</strong></td>
                  <td>Construir objetos complejos paso a paso</td>
                  <td>Objetos con muchos parámetros opcionales</td>
                  <td>Código más legible, parámetros opcionales</td>
                </tr>
                <tr>
                  <td><strong>Prototype</strong></td>
                  <td>Crear objetos clonando prototipos</td>
                  <td>Cuando crear desde cero es costoso</td>
                  <td>Performance, flexibilidad</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="patrones-avanzados">
            <h4>🔧 Más Patrones Comunes en JavaScript</h4>
            
            <div className="patron-grid">
              <div className="patron-card">
                <h5>Strategy Pattern</h5>
                <pre><code>{`class ProcesadorPagos {
  constructor(estrategia) {
    this.estrategia = estrategia;
  }
  
  procesarPago(monto) {
    return this.estrategia.procesar(monto);
  }
  
  cambiarEstrategia(nuevaEstrategia) {
    this.estrategia = nuevaEstrategia;
  }
}

const tarjetaCredito = {
  procesar(monto) {
    return \`Procesando $\${monto} con tarjeta de crédito\`;
  }
};

const paypal = {
  procesar(monto) {
    return \`Procesando $\${monto} con PayPal\`;
  }
};`}</code></pre>
                <p>Algoritmos intercambiables.</p>
              </div>
              
              <div className="patron-card">
                <h5>Decorator Pattern</h5>
                <pre><code>{`function conLogging(funcion) {
  return function(...args) {
    console.log(\`Llamando \${funcion.name} con:\`, args);
    const resultado = funcion.apply(this, args);
    console.log(\`Resultado:\`, resultado);
    return resultado;
  };
}

function conMedicionTiempo(funcion) {
  return function(...args) {
    const inicio = performance.now();
    const resultado = funcion.apply(this, args);
    const fin = performance.now();
    console.log(\`Tiempo: \${fin - inicio}ms\`);
    return resultado;
  };
}

const servicioConDecoradores = conMedicionTiempo(conLogging(servicio));`}</code></pre>
                <p>Añadir funcionalidad dinámicamente.</p>
              </div>
              
              <div className="patron-card">
                <h5>State Pattern</h5>
                <pre><code>{`class MaquinaEstado {
  constructor() {
    this.estado = new EstadoInactivo();
  }
  
  cambiarEstado(estado) {
    this.estado = estado;
  }
  
  ejecutar() {
    this.estado.ejecutar(this);
  }
}

class EstadoActivo {
  ejecutar(maquina) {
    console.log("Ejecutando en estado activo");
    maquina.cambiarEstado(new EstadoInactivo());
  }
}

class EstadoInactivo {
  ejecutar(maquina) {
    console.log("Ejecutando en estado inactivo");
    maquina.cambiarEstado(new EstadoActivo());
  }
}`}</code></pre>
                <p>Comportamiento cambia con estado.</p>
              </div>
            </div>
          </div>

          <div className="nota-importante">
            <h4>💡 Cuándo Usar Cada Patrón</h4>
            <ul>
              <li><strong>Factory:</strong> Cuando no sabes de antemano qué tipo exacto de objeto necesitas</li>
              <li><strong>Singleton:</strong> Para recursos compartidos como configuración, logging, conexiones a BD</li>
              <li><strong>Observer:</strong> Cuando múltiples objetos necesitan reaccionar a cambios en otro objeto</li>
              <li><strong>Strategy:</strong> Cuando tienes múltiples algoritmos para una tarea y quieres poder cambiarlos</li>
              <li><strong>Module:</strong> Para organizar código en namespaces lógicos y evitar contaminación global</li>
              <li><strong>Decorator:</strong> Para añadir funcionalidad a objetos existentes sin modificar su código</li>
            </ul>
          </div>

          <div className="resumen-practicas">
            <h4>🎯 Mejores Prácticas con Patrones</h4>
            <ul>
              <li><strong>No forces patrones:</strong> Usa patrones cuando resuelvan problemas reales, no porque suenen bien</li>
              <li><strong>Mantén la simplicidad:</strong> A veces una función simple es mejor que un patrón complejo</li>
              <li><strong>Considera el contexto de JavaScript:</strong> Algunos patrones de otros lenguajes no son necesarios en JS</li>
              <li><strong>Documenta los patrones usados:</strong> Ayuda a otros desarrolladores a entender la arquitectura</li>
              <li><strong>Prueba los patrones:</strong> Asegúrate de que los patrones no complican el testing</li>
              <li><strong>Evoluciona los patrones:</strong> No tengas miedo de refactorizar patrones que ya no sirven</li>
            </ul>
          </div>
        </section>

        {/* SECCIÓN 7: SISTEMA COMPLETO E-COMMERCE */}
        <section className="guia-seccion">
          <h2>Sistema Completo: E-commerce con POO</h2>
          
          <div className="concepto-card">
            <div className="concepto-content">
              <h3>🛒 Aplicación Real con Todos los Conceptos</h3>
              <p>Este sistema integra todos los conceptos de objetos y POO vistos en la guía: herencia, encapsulación, polimorfismo, patrones de diseño y métodos avanzados en una aplicación de e-commerce completa.</p>

              <h4>🎯 Características del Sistema:</h4>
              <ul>
                <li><strong>Arquitectura Escalable:</strong> Diseñada para crecer con funcionalidades adicionales</li>
                <li><strong>Principios SOLID:</strong> Aplicación de buenas prácticas de diseño</li>
                <li><strong>Patrones Aplicados:</strong> Factory, Observer, Strategy en acción</li>
                <li><strong>Encapsulación:</strong> Estado interno protegido con métodos controlados</li>
                <li><strong>Polimorfismo:</strong> Diferentes tipos de productos con comportamientos específicos</li>
                <li><strong>Manejo de Estado:</strong> Gestión compleja de inventario y órdenes</li>
              </ul>

              <h4>🔧 Conceptos POO Aplicados:</h4>
              <ul>
                <li><strong>Herencia:</strong> ProductoFisico y ProductoDigital heredan de Producto</li>
                <li><strong>Encapsulación:</strong> Métodos getter/setter para control de acceso</li>
                <li><strong>Polimorfismo:</strong> Métodos <code>obtenerInfo()</code> con comportamientos diferentes</li>
                <li><strong>Abstracción:</strong> Interfaces claras para cada componente</li>
                <li><strong>Composición:</strong> Carrito contiene Items, Orden contiene Carrito</li>
              </ul>
            </div>
          </div>

          <div className="codigo-contenedor">
            <div className="codigo-header">
              <span>Ejemplo 7: Sistema Completo E-commerce - Integración de Todos los Conceptos</span>
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

          <div className="tabla-contenedor">
            <h4>📊 Análisis de las Clases del Sistema</h4>
            <table className="tabla-guia">
              <thead>
                <tr>
                  <th>Clase</th>
                  <th>Responsabilidad</th>
                  <th>Patrones Usados</th>
                  <th>Conceptos POO</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Producto</strong></td>
                  <td>Base para todos los productos</td>
                  <td>Template Method</td>
                  <td>Herencia, Encapsulación</td>
                </tr>
                <tr>
                  <td><strong>ProductoFisico</strong></td>
                  <td>Productos tangibles con envío</td>
                  <td>Strategy (cálculo envío)</td>
                  <td>Herencia, Polimorfismo</td>
                </tr>
                <tr>
                  <td><strong>ProductoDigital</strong></td>
                  <td>Productos descargables</td>
                  <td>Null Object (stock ilimitado)</td>
                  <td>Herencia, Polimorfismo</td>
                </tr>
                <tr>
                  <td><strong>CarritoCompras</strong></td>
                  <td>Gestión de items y cálculos</td>
                  <td>Composite (items)</td>
                  <td>Encapsulación, Composición</td>
                </tr>
                <tr>
                  <td><strong>Orden</strong></td>
                  <td>Procesamiento de compras</td>
                  <td>Command (procesar pago)</td>
                  <td>Estado, Encapsulación</td>
                </tr>
                <tr>
                  <td><strong>Cliente</strong></td>
                  <td>Información del comprador</td>
                  <td>Observer (historial)</td>
                  <td>Composición, Estado</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="patrones-avanzados">
            <h4>🔧 Extensiones Posibles del Sistema</h4>
            
            <div className="patron-grid">
              <div className="patron-card">
                <h5>Sistema de Descuentos</h5>
                <pre><code>{`class DescuentoStrategy {
  aplicar(carrito) { }
}

class DescuentoPorcentaje extends DescuentoStrategy {
  constructor(porcentaje) {
    super();
    this.porcentaje = porcentaje;
  }
  
  aplicar(carrito) {
    return carrito.subtotal * (this.porcentaje / 100);
  }
}

class DescuentoCantidad extends DescuentoStrategy {
  constructor(umbral, descuento) {
    super();
    this.umbral = umbral;
    this.descuento = descuento;
  }
  
  aplicar(carrito) {
    return carrito.subtotal > this.umbral ? this.descuento : 0;
  }
}`}</code></pre>
                <p>Múltiples estrategias de descuento.</p>
              </div>
              
              <div className="patron-card">
                <h5>Sistema de Notificaciones</h5>
                <pre><code>{`class SistemaNotificaciones {
  constructor() {
    this.observadores = [];
  }
  
  suscribir(observador) {
    this.observadores.push(observador);
  }
  
  notificar(evento, datos) {
    this.observadores.forEach(obs => obs.notificar(evento, datos));
  }
}

class NotificadorEmail {
  notificar(evento, datos) {
    if (evento === 'ORDEN_COMPLETADA') {
      this.enviarEmail(datos.cliente.email, 'Orden completada');
    }
  }
}`}</code></pre>
                <p>Notificaciones automáticas por eventos.</p>
              </div>
              
              <div className="patron-card">
                <h5>Sistema de Inventario</h5>
                <pre><code>{`class GestorInventario {
  constructor() {
    this.productos = new Map();
    this.alertas = [];
  }
  
  agregarAlerta(producto, umbral, callback) {
    this.alertas.push({ producto, umbral, callback });
  }
  
  verificarAlertas() {
    this.alertas.forEach(alerta => {
      if (alerta.producto.stock <= alerta.umbral) {
        alerta.callback(alerta.producto);
      }
    });
  }
}`}</code></pre>
                <p>Gestión avanzada de inventario.</p>
              </div>
            </div>
          </div>

          <div className="nota-exito">
            <h4>🎯 Lecciones Aprendidas del Sistema</h4>
            <ul>
              <li><strong>Diseño para Extensión:</strong> Las clases están diseñadas para ser fácilmente extendibles</li>
              <li><strong>Separación de Responsabilidades:</strong> Cada clase tiene una responsabilidad única y clara</li>
              <li><strong>Interfaces Claras:</strong> Los métodos públicos forman contratos claros</li>
              <li><strong>Manejo de Estado:</strong> El estado se gestiona de manera controlada y predecible</li>
              <li><strong>Pruebas Facilitadas:</strong> La arquitectura permite testing unitario fácil</li>
              <li><strong>Mantenibilidad:</strong> El código es fácil de entender y modificar</li>
            </ul>
          </div>

          <div className="resumen-practicas">
            <h4>📋 Resumen de Objetos y POO en JavaScript</h4>
            <ul>
              <li><strong>Objetos Literales:</strong> Para estructuras de datos simples y únicas</li>
              <li><strong>Constructores y Prototipos:</strong> Para herencia y creación múltiple de instancias</li>
              <li><strong>Clases ES6:</strong> Sintaxis moderna y clara para POO</li>
              <li><strong>Métodos Avanzados:</strong> <code>Object</code>, <code>Proxy</code>, <code>Reflect</code> para control fino</li>
              <li><strong>Patrones de Diseño:</strong> Soluciones probadas para problemas comunes</li>
              <li><strong>Principios SOLID:</strong> Buenas prácticas para diseño mantenible</li>
              <li><strong>Encapsulación:</strong> Proteger estado interno con interfaces controladas</li>
              <li><strong>Herencia vs Composición:</strong> Elegir la relación correcta entre objetos</li>
            </ul>
          </div>

          <div className="nota-importante">
            <h4>💡 Próximos Pasos Recomendados</h4>
            <p>Después de dominar objetos y POO en JavaScript, considera explorar:</p>
            <ul>
              <li><strong>Programación Funcional:</strong> Inmutabilidad, funciones puras, composición</li>
              <li><strong>Patrones Arquitectónicos:</strong> MVC, MVVM, Clean Architecture</li>
              <li><strong>Testing:</strong> Jest, Unit Testing, Integration Testing</li>
              <li><strong>Frameworks Modernos:</strong> React, Vue, Angular y su uso de objetos</li>
              <li><strong>Performance:</strong> Optimización de objetos y estructuras de datos</li>
              <li><strong>TypeScript:</strong> Tipado estático para mayor seguridad en POO</li>
            </ul>
          </div>
        </section>

        {/* RESUMEN FINAL Y PRÓXIMOS PASOS */}
        <section className="guia-seccion">
          <h2>Próximos Pasos</h2>
          <div className="proximos-pasos">
            <div className="paso-aprendizaje">
              <div className="paso-numero">8</div>
              <div className="paso-info">
                <h4>DOM Manipulation</h4>
                <p>Aprenderás a manipular el Document Object Model usando objetos y métodos para crear interfaces web dinámicas e interactivas.</p>
              </div>
            </div>
            <div className="paso-aprendizaje">
              <div className="paso-numero">9</div>
              <div className="paso-info">
                <h4>Eventos</h4>
                <p>Profundizarás en el manejo de eventos del usuario, event listeners, delegation y patrones para aplicaciones interactivas.</p>
              </div>
            </div>
            <div className="paso-aprendizaje">
              <div className="paso-numero">10</div>
              <div className="paso-info">
                <h4>ES6+ Features</h4>
                <p>Explorarás características modernas de JavaScript como destructuring, template literals, modules y más.</p>
              </div>
            </div>
          </div>

          <div className="resumen-practicas">
            <h4>📋 Resumen de Objetos y POO en JavaScript</h4>
            <ul>
              <li><strong>Fundamentos:</strong> Objetos literales, propiedades, métodos, <code>this</code></li>
              <li><strong>Constructores:</strong> Funciones constructoras, prototipos, herencia prototipal</li>
              <li><strong>Clases ES6:</strong> Sintaxis moderna, herencia con <code>extends</code>, getters/setters</li>
              <li><strong>Métodos Avanzados:</strong> <code>Object</code> methods, <code>Proxy</code>, <code>Reflect</code>, inmutabilidad</li>
              <li><strong>Patrones:</strong> Factory, Singleton, Module, Observer, Strategy</li>
              <li><strong>Sistema Completo:</strong> Aplicación de e-commerce con todos los conceptos integrados</li>
              <li><strong>Mejores Prácticas:</strong> Encapsulación, principios SOLID, diseño para extensión</li>
            </ul>
          </div>
        </section>

        
      </div>
    </div>
  );
};

export default Guia_7;