import React, { useState, useRef, useEffect } from 'react';
// Importa React y hooks esenciales para el componente
// useState: para manejar estado local
// useRef: para referencias a elementos DOM y valores persistentes
// useEffect: para efectos secundarios y ciclo de vida

import Editor from '@monaco-editor/react';
// Importa el componente Editor de Monaco Editor para el editor de código

import { Terminal } from 'xterm';
// Importa la clase Terminal de xterm para crear terminales en el navegador

import { FitAddon } from 'xterm-addon-fit';
// Importa el addon Fit para ajustar automáticamente el tamaño del terminal

import 'xterm/css/xterm.css';
// Importa los estilos CSS necesarios para el terminal xterm

// Importa componentes personalizados de la aplicación
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import RightSidebar from './components/RightSidebar/RightSidebar';
import MainContent from './components/MainContent/MainContent';
import Messenger from './components/Messenger/Messenger';

import './App.css';
// Importa los estilos CSS principales de la aplicación

// FUNCIÓN DEBOUCE PARA OPTIMIZACIÓN
// Evita que una función se ejecute demasiadas veces seguidas
const debounce = (func, wait) => {
  let timeout; // Almacena el ID del timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout); // Limpia el timeout anterior
      func(...args); // Ejecuta la función original con los argumentos
    };
    clearTimeout(timeout); // Limpia cualquier timeout existente
    timeout = setTimeout(later, wait); // Establece un nuevo timeout
  };
};

// VALIDACIÓN DE CÓDIGO PARA SEGURIDAD
// Previene la ejecución de código potencialmente peligroso
const validarCodigo = (codigo) => {
  // Array de expresiones regulares que detectan patrones peligrosos
  const patronesPeligrosos = [
    /document\.cookie/i,    // Acceso a cookies
    /localStorage/i,        // Acceso al localStorage
    /fetch\(/i,             // Llamadas fetch
    /XMLHttpRequest/i,      // Peticiones XMLHttpRequest
    /eval\(/i,              // Función eval (muy peligrosa)
    /setTimeout\(/i,        // Temporizadores
    /setInterval\(/i,       // Intervalos
    /window\./i,            // Acceso al objeto window
    /process\./i,           // Acceso a process (Node.js)
    /require\(/i,           // Require de CommonJS
    /import\(/i,            // Import dinámico
    /fetch\(/i,             // Duplicado para mayor seguridad
    /XMLHttpRequest/i       // Duplicado para mayor seguridad
  ];
  
  // Verifica si algún patrón peligroso coincide con el código
  const peligroso = patronesPeligrosos.some(pattern => pattern.test(codigo));
  
  return {
    esValido: !peligroso, // True si no hay patrones peligrosos
    mensaje: peligroso ? 
      "El código contiene patrones potencialmente peligrosos y no puede ser ejecutado." : 
      "Código válido"
  };
};

// COMPONENTE PRINCIPAL DE LA APLICACIÓN
const App = () => {
  // ========== ESTADOS DE LA APLICACIÓN ==========
  
  // Estado para el código en el editor - Trabaja con EditorPanel.jsx
  const [codigo, setCodigo] = useState('// Escribe tu código aquí\nconsole.log("Hola Mundo!");');
  
  // Estado para el layout de la aplicación - Trabaja con MainContent.jsx y Resizer.jsx
  const [disposicion, setDisposicion] = useState({
    col1: 50, // Ancho de la columna 1 en porcentaje
    col2: 50, // Ancho de la columna 2 en porcentaje  
    fila1: 50, // Alto de la fila 1 en porcentaje
    fila2: 50  // Alto de la fila 2 en porcentaje
  });
  
  // Estado para la pestaña activa en el panel de contenido - Trabaja con ContentPanel.jsx
  const [pestañaActiva, setPestañaActiva] = useState('guia');
  
  // Estados para controles de sidebar - Trabajan con Header.jsx, Sidebar.jsx, RightSidebar.jsx
  const [sidebarAbierto, setSidebarAbierto] = useState(false);
  const [rightSidebarAbierto, setRightSidebarAbierto] = useState(false);
  
  // Estado para modo oscuro/claro con persistencia en localStorage
  const [modoOscuro, setModoOscuro] = useState(() => {
    const guardado = localStorage.getItem('cursoJSModoOscuro');
    return guardado ? JSON.parse(guardado) : true; // Valor por defecto: true (modo oscuro)
  });
  
  // Estado para el tema actual del curso - Trabaja con Sidebar.jsx y ContentPanel.jsx
  const [temaActual, setTemaActual] = useState(4);
  
  // Estados para controles de UI - Trabajan con Header.jsx
  const [menuUsuarioAbierto, setMenuUsuarioAbierto] = useState(false);
  const [notificacionesAbiertas, setNotificacionesAbiertas] = useState(false);
  const [mensajesAbiertos, setMensajesAbiertos] = useState(false);
  
  // Estados para el chat con IA - Trabajan con RightSidebar.jsx
  const [mensajesIA, setMensajesIA] = useState([]);
  const [entradaIA, setEntradaIA] = useState('');
  const [pestañaRightSidebar, setPestañaRightSidebar] = useState('ia');
  
  // Estado para resultados de ejecución - Trabaja con TerminalPanel.jsx
  const [resultadoEjecucion, setResultadoEjecucion] = useState('');
  
  // Estados para el sistema de mensajería - Trabajan con Messenger.jsx y Header.jsx
  const [messengerAbierto, setMessengerAbierto] = useState(false);
  const [chatActivo, setChatActivo] = useState(null);

  // ========== REFERENCIAS ==========
  
  const terminalRef = useRef(null);        // Referencia al contenedor del terminal DOM
  const terminal = useRef(null);           // Referencia a la instancia de Terminal
  const fitAddon = useRef(null);           // Referencia al addon Fit de xterm
  
  // Referencias para el sistema de redimensionamiento - Trabajan con Resizer.jsx
  const estaRedimensionando = useRef(false);      // Flag para saber si se está redimensionando
  const tipoRedimension = useRef('');             // Tipo de redimensionamiento (col/fila)
  const inicioX = useRef(0);                      // Posición X inicial del mouse
  const inicioY = useRef(0);                      // Posición Y inicial del mouse
  const disposicionInicio = useRef({});           // Layout inicial antes del redimensionamiento
  
  // Referencias para detectar clics fuera de elementos - Trabajan con Header.jsx
  const menuUsuarioRef = useRef(null);      // Referencia al menú de usuario
  const notificacionesRef = useRef(null);   // Referencia al panel de notificaciones
  const mensajesRef = useRef(null);         // Referencia al panel de mensajes

  // ========== EFECTOS SECUNDARIOS ==========
  
  // Efecto para cerrar menús al hacer clic fuera de ellos
  useEffect(() => {
    const manejarClicExterior = (evento) => {
      // Cierra menú de usuario si el clic fue fuera de él
      if (menuUsuarioRef.current && !menuUsuarioRef.current.contains(evento.target)) {
        setMenuUsuarioAbierto(false);
      }
      // Cierra notificaciones si el clic fue fuera de ellas
      if (notificacionesRef.current && !notificacionesRef.current.contains(evento.target)) {
        setNotificacionesAbiertas(false);
      }
      // Cierra mensajes si el clic fue fuera de ellos
      if (mensajesRef.current && !mensajesRef.current.contains(evento.target)) {
        setMensajesAbiertos(false);
      }
    };

    // Agrega el event listener cuando el componente se monta
    document.addEventListener('mousedown', manejarClicExterior);
    
    // Cleanup: remueve el event listener cuando el componente se desmonta
    return () => {
      document.removeEventListener('mousedown', manejarClicExterior);
    };
  }, []); // Array de dependencias vacío = se ejecuta solo al montar/desmontar

  // Efecto para persistir el modo oscuro en localStorage
  useEffect(() => {
    localStorage.setItem('cursoJSModoOscuro', JSON.stringify(modoOscuro));
  }, [modoOscuro]); // Se ejecuta cada vez que cambia modoOscuro

  // ========== DATOS DEL CURSO ==========
  
  // Estado para los temas del curso - Trabaja con Sidebar.jsx y ContentPanel.jsx
  const [temas, setTemas] = useState([
    { 
      id: 1, 
      nombre: "Introducción a JavaScript", 
      progreso: "completado", 
      duracion: "30 min",
      videoId: "EfAl9bwzVZk", // ID de YouTube para el video
      contenido: {
        guia: "Guía completa para empezar con JavaScript. Aprenderás los conceptos básicos, configuración del entorno y tu primer 'Hola Mundo'.",
        cuestionario: "Preguntas sobre introducción a JS",
        practica: "Ejercicios prácticos de introducción a JavaScript"
      }
    },
    // ... más temas con estructura similar
    { 
      id: 14, 
      nombre: "Proyecto Final", 
      progreso: "pendiente", 
      duracion: "120 min",
      videoId: "GJYMcLus3v0",
      contenido: {
        guia: "Guía del proyecto final. Integrarás todos los conceptos aprendidos para crear una aplicación JavaScript completa.",
        cuestionario: "Evaluación final",
        practica: "Proyecto práctico final"
      }
    }
  ]);

  // Ejercicios prácticos por tema - Trabajan con ContentPanel.jsx y EditorPanel.jsx
  const ejercicios = {
    4: {
      descripcion: "Crea una función que recorra números del 1 al 10 y muestre si son pares o impares",
      solucion: `function verificarNumeros() {
  for (let i = 1; i <= 10; i++) {
    if (i % 2 === 0) {
      console.log(i + " es par");
    } else {
      console.log(i + " es impar");
    }
  }
}`,
      prueba: `// Ejecuta esta función para probar
verificarNumeros();`
    },
    3: {
      descripcion: "Realiza operaciones matemáticas básicas con diferentes operadores",
      solucion: `let a = 10;
let b = 3;

console.log("Suma:", a + b);
console.log("Resta:", a - b);
console.log("Multiplicación:", a * b);
console.log("División:", a / b);
console.log("Módulo:", a % b);`,
      prueba: `// El código se ejecutará directamente`
    }
  };

  // Sistema de logros - Trabaja con RightSidebar.jsx
  const [logros, setLogros] = useState([
    { id: 1, nombre: "Primer Código", descripcion: "Ejecuta tu primer código", desbloqueado: true, icono: "🎯" },
    { id: 2, nombre: "Completista", descripcion: "Completa todos los temas", desbloqueado: false, icono: "🏆" },
    { id: 3, nombre: "Programador Novato", descripcion: "Completa 5 temas", desbloqueado: false, icono: "⭐" },
    { id: 4, nombre: "Ejecutor", descripcion: "Ejecuta código 10 veces", desbloqueado: false, icono: "⚡" }
  ]);

  // Datos de ejemplo para notificaciones - Trabajan con Header.jsx
  const datosNotificaciones = [
    {
      id: 1,
      titulo: "Nuevo ejercicio disponible",
      mensaje: "Se ha agregado un nuevo ejercicio práctico al tema de Funciones",
      tiempo: "Hace 5 minutos",
      leido: false,
      tipo: "info"
    },
    // ... más notificaciones
  ];

  // Datos de ejemplo para mensajes - Trabajan con Header.jsx y Messenger.jsx
  const datosMensajes = [
    {
      id: 1,
      remitente: "Instructor Carlos",
      mensaje: "¿Tienes alguna duda sobre el tema de estructuras de control?",
      tiempo: "10:30 AM",
      noLeido: true,
      avatar: "👨‍🏫",
      enLinea: true
    },
    // ... más mensajes
  ];

  // Datos de chat para el messenger - Trabajan con Messenger.jsx
  const datosChat = {
    1: {
      id: 1,
      remitente: "Instructor Carlos",
      avatar: "👨‍🏫",
      enLinea: true,
      mensajes: [
        {
          id: 1,
          texto: "¡Hola! ¿Cómo vas con el curso?",
          tiempo: "10:30 AM",
          remitente: "ellos"
        },
        // ... más mensajes del chat
      ]
    },
    // ... más chats
  };

  // ========== PERSISTENCIA EN LOCALSTORAGE ==========
  
  // Efecto para cargar datos guardados al inicializar la aplicación
  useEffect(() => {
    const progresoGuardado = localStorage.getItem('cursoJSProgreso');
    const logrosGuardados = localStorage.getItem('cursoJSLogros');
    const codigoGuardado = localStorage.getItem('cursoJSCodigo');
    
    if (progresoGuardado) {
      setTemas(JSON.parse(progresoGuardado)); // Restaura el progreso de temas
    }
    if (logrosGuardados) {
      setLogros(JSON.parse(logrosGuardados)); // Restaura los logros
    }
    if (codigoGuardado) {
      setCodigo(codigoGuardado); // Restaura el código del editor
    }
  }, []); // Solo se ejecuta al montar el componente

  // Efecto para guardar datos cuando cambian
  useEffect(() => {
    localStorage.setItem('cursoJSProgreso', JSON.stringify(temas));
    localStorage.setItem('cursoJSLogros', JSON.stringify(logros));
    localStorage.setItem('cursoJSCodigo', codigo);
  }, [temas, logros, codigo]); // Se ejecuta cuando estos estados cambian

  // ========== ATAJOS DE TECLADO ==========
  
  useEffect(() => {
    const manejarTeclaPresionada = (e) => {
      // Ctrl+Enter o Cmd+Enter para ejecutar código - Trabaja con EditorPanel.jsx
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault(); // Previene el comportamiento por defecto
        ejecutarCodigo();   // Ejecuta la función de ejecución de código
      }
      // Ctrl+K o Cmd+K para limpiar terminal - Trabaja con TerminalPanel.jsx
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        limpiarTerminal(); // Limpia el terminal
      }
      // Ctrl+L o Cmd+L para limpiar consola - Trabaja con TerminalPanel.jsx
      if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        setResultadoEjecucion(''); // Limpia los resultados de ejecución
      }
    };

    // Agrega el event listener para teclas
    document.addEventListener('keydown', manejarTeclaPresionada);
    
    // Cleanup: remueve el event listener
    return () => document.removeEventListener('keydown', manejarTeclaPresionada);
  }, [codigo]); // Depende de codigo para tener la versión más actual

  // ========== FUNCIONES AUXILIARES ==========
  
  // Obtener el tema actual basado en el ID - Trabaja con varios componentes
  const obtenerTemaActual = () => temas.find(tema => tema.id === temaActual);

  // Manejar clic en un tema del sidebar - Trabaja con Sidebar.jsx
  const manejarClicTema = (tema) => {
    // Si el tema está pendiente y no es el primero, no hacer nada
    if (tema.progreso === 'pendiente' && tema.id !== 1) {
      return;
    }
    
    setTemaActual(tema.id); // Establece el tema actual
    
    // Si el tema era pendiente, marcarlo como en progreso
    if (tema.progreso === 'pendiente') {
      setTemas(prev => prev.map(t => 
        t.id === tema.id ? { ...t, progreso: 'en-progreso' } : t
      ));
    }
  };

  // Manejar envío de mensaje al asistente IA - Trabaja con RightSidebar.jsx
  const manejarEnvioIA = (e) => {
    e.preventDefault(); // Previene el envío del formulario
    if (!entradaIA.trim()) return; // No hace nada si el input está vacío

    // Crea el mensaje del usuario
    const mensajeUsuario = {
      id: Date.now(), // ID único basado en timestamp
      tipo: 'usuario',
      contenido: entradaIA,
      marcaTiempo: new Date()
    };

    // Agrega el mensaje del usuario a la lista
    setMensajesIA(prev => [...prev, mensajeUsuario]);
    
    // Simula una respuesta de la IA después de 1 segundo
    setTimeout(() => {
      const respuestaIA = {
        id: Date.now() + 1,
        tipo: 'asistente',
        contenido: '🤖 El asistente IA estará disponible próximamente. Mientras tanto, puedes consultar el contenido del curso o practicar con los ejercicios disponibles.',
        marcaTiempo: new Date()
      };
      setMensajesIA(prev => [...prev, respuestaIA]);
    }, 1000);

    setEntradaIA(''); // Limpia el input
  };

  // Cargar ejercicio en el editor - Trabaja con ContentPanel.jsx y EditorPanel.jsx
  const cargarEjercicio = () => {
    const ejercicio = ejercicios[temaActual];
    if (ejercicio) {
      setCodigo(ejercicio.solucion); // Establece el código de la solución
    }
  };

  // Limpiar editor - Trabaja con EditorPanel.jsx
  const limpiarEditor = () => {
    setCodigo('// Escribe tu código aquí\n'); // Restablece el código por defecto
  };

  // Exportar a PDF - Trabaja con ContentPanel.jsx
  const exportarAPDF = () => {
    const tema = obtenerTemaActual();
    if (!tema) return;

    // Crea el contenido del PDF (simulado)
    const contenido = `
      ${tema.nombre} - ${pestañaActiva.toUpperCase()}
      
      ${tema.contenido[pestañaActiva]}
      
      ${ejercicios[temaActual] ? `Ejercicio: ${ejercicios[temaActual].descripcion}` : ''}
      
      Exportado el: ${new Date().toLocaleDateString()}
    `;
    
    // Simula la descarga de un archivo PDF
    const blob = new Blob([contenido], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tema.nombre}-${pestañaActiva}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Muestra alerta de éxito
    alert(`Contenido de "${pestañaActiva}" exportado como PDF`);
  };

  // Toggle pantalla completa - Trabaja con Header.jsx
  const alternarPantallaCompleta = () => {
    if (!document.fullscreenElement) {
      // Entra en pantalla completa
      document.documentElement.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      // Sale de pantalla completa
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setMenuUsuarioAbierto(false); // Cierra el menú de usuario
  };

  // ========== MANEJO DE NOTIFICACIONES Y MENSAJES ==========
  
  // Alternar visibilidad de notificaciones - Trabaja con Header.jsx
  const alternarNotificaciones = () => {
    setNotificacionesAbiertas(!notificacionesAbiertas);
    if (mensajesAbiertos) setMensajesAbiertos(false); // Cierra mensajes si estaban abiertos
  };

  // Alternar visibilidad de mensajes - Trabaja con Header.jsx
  const alternarMensajes = () => {
    setMensajesAbiertos(!mensajesAbiertos);
    if (notificacionesAbiertas) setNotificacionesAbiertas(false); // Cierra notificaciones si estaban abiertas
  };

  // Abrir messenger - Trabaja con Header.jsx y Messenger.jsx
  const abrirMessenger = () => {
    setMessengerAbierto(true);
    setMensajesAbiertos(false); // Cierra el panel de mensajes
  };

  // Cerrar messenger - Trabaja con Messenger.jsx
  const cerrarMessenger = () => {
    setMessengerAbierto(false);
    setChatActivo(null); // Limpia el chat activo
  };

  // Abrir chat específico - Trabaja con Messenger.jsx
  const abrirChat = (chatId) => {
    setChatActivo(chatId); // Establece el chat activo
  };

  // Marcar todas las notificaciones como leídas - Trabaja con Header.jsx
  const marcarTodosComoLeidos = () => {
    // En una implementación real, aquí se actualizaría el estado de las notificaciones
    console.log("Marcando todas las notificaciones como leídas");
  };

  // ========== SISTEMA DE TERMINAL ==========
  
  // Efecto para inicializar el terminal - Trabaja con TerminalPanel.jsx
  useEffect(() => {
    if (!terminalRef.current) return; // Si no hay referencia, no hacer nada

    const inicializarTerminal = setTimeout(() => {
      try {
        // Crea una nueva instancia de Terminal con configuración
        terminal.current = new Terminal({
          cursorBlink: true, // Cursor parpadeante
          theme: {
            background: modoOscuro ? '#1e1e1e' : '#ffffff', // Fondo según modo
            foreground: modoOscuro ? '#cccccc' : '#333333', // Color de texto
            cursor: modoOscuro ? '#ffffff' : '#333333'      // Color del cursor
          },
          fontSize: 14, // Tamaño de fuente
          cols: 80,     // Columnas
          rows: 15      // Filas
        });

        // Crea e instala el addon Fit para ajuste automático de tamaño
        fitAddon.current = new FitAddon();
        terminal.current.loadAddon(fitAddon.current);
        
        // Abre el terminal en el elemento DOM referenciado
        terminal.current.open(terminalRef.current);
        
        // Ajusta el tamaño después de un breve delay
        setTimeout(() => {
          try {
            fitAddon.current?.fit(); // Ajusta el tamaño si el addon existe
            configurarTerminal();    // Configura los comandos del terminal
          } catch (error) {
            console.error('Error ajustando terminal:', error);
            configurarTerminal(); // Configura incluso si hay error de ajuste
          }
        }, 100);

      } catch (error) {
        console.error('Error inicializando terminal:', error);
      }
    }, 100); // Delay de 100ms para la inicialización

    // Cleanup: limpia el timeout y dispose del terminal
    return () => {
      clearTimeout(inicializarTerminal);
      if (terminal.current) {
        terminal.current.dispose(); // Libera recursos del terminal
      }
    };
  }, [modoOscuro]); // Se re-ejecuta cuando cambia el modo oscuro

  // Debounced fit para el terminal (optimización de rendimiento)
  const debouncedFit = useRef(
    debounce(() => {
      if (fitAddon.current) {
        fitAddon.current.fit(); // Ajusta el tamaño con debounce
      }
    }, 250) // 250ms de delay
  );

  // Efecto para ajustar el terminal al redimensionar la ventana
  useEffect(() => {
    window.addEventListener('resize', debouncedFit.current);
    return () => window.removeEventListener('resize', debouncedFit.current);
  }, []); // Solo se ejecuta al montar/desmontar

  // Configurar comandos del terminal - Trabaja con TerminalPanel.jsx
  const configurarTerminal = () => {
    if (!terminal.current) return;
    
    const term = terminal.current;
    
    // Mensajes de bienvenida
    term.writeln('Bienvenido a Coddy Terminal');
    term.writeln('Escribe "help" para ver comandos disponibles');
    term.writeln('Usa Ctrl+Enter para ejecutar código o Ctrl+K para limpiar terminal');
    term.write('\r\n$ '); // Prompt inicial

    let entradaActual = ''; // Almacena la entrada actual del usuario

    // Event listener para entrada de datos
    term.onData((data) => {
      const code = data.charCodeAt(0); // Obtiene el código del caracter
      
      if (code === 13) { // Enter key
        term.write('\r\n');
        manejarComando(entradaActual.trim()); // Procesa el comando
        entradaActual = ''; // Limpia la entrada
        term.write('$ ');   // Muestra nuevo prompt
      } else if (code === 127) { // Backspace key
        if (entradaActual.length > 0) {
          entradaActual = entradaActual.slice(0, -1); // Elimina último caracter
          term.write('\b \b'); // Borra visualmente en el terminal
        }
      } else if (code >= 32 && code <= 126) { // Caracteres imprimibles
        entradaActual += data; // Agrega el caracter a la entrada
        term.write(data);      // Muestra el caracter en el terminal
      }
    });
  };

  // Manejar comandos del terminal - Trabaja con TerminalPanel.jsx
  const manejarComando = (comando) => {
    if (!terminal.current) return;
    
    const [cmd, ...args] = comando.split(' '); // Separa comando y argumentos
    const term = terminal.current;

    switch (cmd.toLowerCase()) {
      case 'help':
        term.writeln('Comandos disponibles:');
        term.writeln('  help        - Mostrar esta ayuda');
        term.writeln('  clear       - Limpiar terminal');
        term.writeln('  run         - Ejecutar código');
        term.writeln('  echo <text> - Mostrar texto');
        term.writeln('  exercise    - Cargar ejercicio actual');
        break;

      case 'clear':
        term.clear(); // Limpia el terminal
        term.write('$ ');
        break;

      case 'run':
        ejecutarCodigo(); // Ejecuta el código del editor
        break;

      case 'echo':
        term.writeln(args.join(' ')); // Muestra el texto
        break;

      case 'exercise':
        cargarEjercicio(); // Carga el ejercicio actual
        term.writeln('✅ Ejercicio cargado en el editor');
        break;

      case '': // Comando vacío
        break;

      default:
        term.writeln(`Comando no encontrado: ${cmd}`);
    }
  };

  // Ejecutar código con validación de seguridad - Trabaja con EditorPanel.jsx y TerminalPanel.jsx
  const ejecutarCodigo = () => {
    if (!terminal.current) return;
    const term = terminal.current;
    
    // Validar código antes de ejecutar
    const validacion = validarCodigo(codigo);
    if (!validacion.esValido) {
      term.writeln(`❌ ${validacion.mensaje}`);
      setResultadoEjecucion(`Error: ${validacion.mensaje}`);
      return; // Detiene la ejecución si el código es peligroso
    }

    term.writeln('🚀 Ejecutando código...');
    setResultadoEjecucion('Ejecutando código...');
    
    try {
      // Crear un contexto seguro para ejecución (sandbox)
      const contextoSeguro = {
        console: {
          log: (...args) => {
            // Intercepta console.log para mostrar en el terminal
            const salida = args.map(arg => 
              typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
            ).join(' ');
            term.writeln(salida);
            setResultadoEjecucion(prev => prev + salida + '\n');
          }
        },
        // Deshabilita funciones peligrosas
        setTimeout: undefined,
        setInterval: undefined,
        fetch: undefined,
        XMLHttpRequest: undefined,
        document: undefined,
        window: undefined
      };

      // Función segura de ejecución usando Function constructor
      const resultado = new Function(...Object.keys(contextoSeguro), `
        try {
          ${codigo} // Ejecuta el código del usuario
          return "✅ Ejecución completada sin errores";
        } catch (error) {
          return "❌ Error: " + error.message;
        }
      `)(...Object.values(contextoSeguro)); // Pasa el contexto seguro
      
      // Maneja el resultado de la ejecución
      if (resultado && resultado !== "✅ Ejecución completada sin errores") {
        term.writeln(resultado);
        setResultadoEjecucion(resultado);
      }
      
      // Desbloquear logro de ejecución
      desbloquearLogro(4);
      
    } catch (error) {
      const mensajeError = `❌ Error de ejecución: ${error.message}`;
      term.writeln(mensajeError);
      setResultadoEjecucion(mensajeError);
    }
  };

  // Desbloquear logros - Trabaja con RightSidebar.jsx
  const desbloquearLogro = (logroId) => {
    setLogros(prev => prev.map(logro => 
      logro.id === logroId ? { ...logro, desbloqueado: true } : logro
    ));
  };

  // Limpiar terminal - Trabaja con TerminalPanel.jsx
  const limpiarTerminal = () => {
    if (terminal.current) {
      terminal.current.clear(); // Limpia el contenido del terminal
      terminal.current.write('$ '); // Muestra nuevo prompt
    }
    setResultadoEjecucion(''); // Limpia los resultados de ejecución
  };

  // Restablecer layout - Trabaja con Header.jsx
  const restablecerDisposicion = () => {
    setDisposicion({ col1: 50, col2: 50, fila1: 50, fila2: 50 }); // Valores por defecto
  };

  // ========== SISTEMA DE REDIMENSIONAMIENTO ==========
  
  // Iniciar redimensionamiento - Trabaja con Resizer.jsx
  const iniciarRedimension = (tipo, evento) => {
    evento.preventDefault(); // Previene selección de texto
    evento.stopPropagation(); // Evita propagación del evento
    
    // Establece flags y valores iniciales
    estaRedimensionando.current = true;
    tipoRedimension.current = tipo;
    inicioX.current = evento.clientX;
    inicioY.current = evento.clientY;
    disposicionInicio.current = { ...disposicion }; // Copia del layout actual
    
    // Agrega event listeners para el redimensionamiento
    document.addEventListener('mousemove', manejarRedimension);
    document.addEventListener('mouseup', detenerRedimension);
    
    // Cambia el cursor y deshabilita selección de texto
    document.body.style.cursor = tipo.includes('col') ? 'col-resize' : 'row-resize';
    document.body.style.userSelect = 'none';
  };

  // Manejar redimensionamiento en tiempo real - Trabaja con Resizer.jsx
  const manejarRedimension = (evento) => {
    if (!estaRedimensionando.current) return;

    // Calcula el desplazamiento del mouse
    const deltaX = evento.clientX - inicioX.current;
    const deltaY = evento.clientY - inicioY.current;

    const contenedor = document.querySelector('.contenedor-principal');
    if (!contenedor) return;

    // Obtiene dimensiones del contenedor
    const anchoContenedor = contenedor.offsetWidth;
    const altoContenedor = contenedor.offsetHeight;

    if (tipoRedimension.current === 'col') {
      // Redimensionamiento de columnas
      const deltaPorcentaje = (deltaX / anchoContenedor) * 100;
      const nuevoCol1 = Math.max(20, Math.min(80, disposicionInicio.current.col1 + deltaPorcentaje));
      setDisposicion(prev => ({
        ...prev,
        col1: nuevoCol1,
        col2: 100 - nuevoCol1 // Mantiene el total en 100%
      }));
    } else if (tipoRedimension.current === 'fila1') {
      // Redimensionamiento de fila 1
      const deltaPorcentaje = (deltaY / altoContenedor) * 100;
      const nuevoFila1 = Math.max(20, Math.min(80, disposicionInicio.current.fila1 + deltaPorcentaje));
      setDisposicion(prev => ({
        ...prev,
        fila1: nuevoFila1
      }));
    } else if (tipoRedimension.current === 'fila2') {
      // Redimensionamiento de fila 2
      const deltaPorcentaje = (deltaY / altoContenedor) * 100;
      const nuevoFila2 = Math.max(20, Math.min(80, disposicionInicio.current.fila2 + deltaPorcentaje));
      setDisposicion(prev => ({
        ...prev,
        fila2: nuevoFila2
      }));
    }
  };

  // Detener redimensionamiento - Trabaja con Resizer.jsx
  const detenerRedimension = () => {
    estaRedimensionando.current = false; // Resetea el flag
    
    // Remueve los event listeners
    document.removeEventListener('mousemove', manejarRedimension);
    document.removeEventListener('mouseup', detenerRedimension);
    
    // Restaura el cursor y la selección de texto
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  // Ajustar terminal al cambiar tamaño de ventana - Trabaja con TerminalPanel.jsx
  useEffect(() => {
    const manejarRedimension = () => {
      setTimeout(() => {
        if (fitAddon.current) {
          fitAddon.current.fit(); // Ajusta el terminal después del redimensionamiento
        }
      }, 100);
    };

    window.addEventListener('resize', manejarRedimension);
    return () => window.removeEventListener('resize', manejarRedimension);
  }, []); // Solo al montar/desmontar

  // ========== RENDERIZADO PRINCIPAL ==========
  
  return (
    <div className={`aplicacion ${modoOscuro ? 'modo-oscuro' : 'modo-claro'}`}>
      {/* Componente Header - Barra superior de navegación */}
      <Header
        sidebarAbierto={sidebarAbierto}
        setSidebarAbierto={setSidebarAbierto}
        rightSidebarAbierto={rightSidebarAbierto}
        setRightSidebarAbierto={setRightSidebarAbierto}
        menuUsuarioAbierto={menuUsuarioAbierto}
        setMenuUsuarioAbierto={setMenuUsuarioAbierto}
        notificacionesAbiertas={notificacionesAbiertas}
        setNotificacionesAbiertas={setNotificacionesAbiertas}
        mensajesAbiertos={mensajesAbiertos}
        setMensajesAbiertos={setMensajesAbiertos}
        temaActual={obtenerTemaActual()}
        restablecerDisposicion={restablecerDisposicion}
        alternarPantallaCompleta={alternarPantallaCompleta}
        abrirMessenger={abrirMessenger}
        marcarTodosComoLeidos={marcarTodosComoLeidos}
        datosNotificaciones={datosNotificaciones}
        datosMensajes={datosMensajes}
        menuUsuarioRef={menuUsuarioRef}
        notificacionesRef={notificacionesRef}
        mensajesRef={mensajesRef}
      />

      <div className="contenedor-principal">
        {/* Componente Sidebar - Navegación de temas del curso */}
        <Sidebar
          sidebarAbierto={sidebarAbierto}
          temas={temas}
          temaActual={temaActual}
          manejarClicTema={manejarClicTema}
        />

        {/* Componente MainContent - Área principal de trabajo */}
        <MainContent
          sidebarAbierto={sidebarAbierto}
          rightSidebarAbierto={rightSidebarAbierto}
          disposicion={disposicion}
          temaActual={obtenerTemaActual()}
          pestañaActiva={pestañaActiva}
          setPestañaActiva={setPestañaActiva}
          codigo={codigo}
          setCodigo={setCodigo}
          resultadoEjecucion={resultadoEjecucion}
          terminalRef={terminalRef}
          ejercicios={ejercicios}
          cargarEjercicio={cargarEjercicio}
          limpiarEditor={limpiarEditor}
          ejecutarCodigo={ejecutarCodigo}
          limpiarTerminal={limpiarTerminal}
          exportarAPDF={exportarAPDF}
          iniciarRedimension={iniciarRedimension}
          modoOscuro={modoOscuro}
        />

        {/* Componente RightSidebar - Panel de herramientas lateral derecho */}
        <RightSidebar
          rightSidebarAbierto={rightSidebarAbierto}
          pestañaRightSidebar={pestañaRightSidebar}
          setPestañaRightSidebar={setPestañaRightSidebar}
          mensajesIA={mensajesIA}
          entradaIA={entradaIA}
          setEntradaIA={setEntradaIA}
          manejarEnvioIA={manejarEnvioIA}
          logros={logros}
          modoOscuro={modoOscuro}
          setModoOscuro={setModoOscuro}
        />

        {/* Componente Messenger - Sistema de mensajería */}
        <Messenger
          messengerAbierto={messengerAbierto}
          chatActivo={chatActivo}
          setChatActivo={setChatActivo}
          datosChat={datosChat}
          cerrarMessenger={cerrarMessenger}
        />
      </div>
    </div>
  );
};

export default App;
// Exporta el componente App como exportación por defecto