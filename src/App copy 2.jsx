import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import RightSidebar from './components/RightSidebar/RightSidebar';
import MainContent from './components/MainContent/MainContent';
import Messenger from './components/Messenger/Messenger';
import './App.css';

// Función debounce para optimización
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Validación de código para seguridad
const validarCodigo = (codigo) => {
  const patronesPeligrosos = [
    /document\.cookie/i,
    /localStorage/i,
    /fetch\(/i,
    /XMLHttpRequest/i,
    /eval\(/i,
    /setTimeout\(/i,
    /setInterval\(/i,
    /window\./i,
    /process\./i,
    /require\(/i,
    /import\(/i,
    /fetch\(/i,
    /XMLHttpRequest/i
  ];
  
  const peligroso = patronesPeligrosos.some(pattern => pattern.test(codigo));
  return {
    esValido: !peligroso,
    mensaje: peligroso ? 
      "El código contiene patrones potencialmente peligrosos y no puede ser ejecutado." : 
      "Código válido"
  };
};

const App = () => {
  // Estados
  const [codigo, setCodigo] = useState('// Escribe tu código aquí\nconsole.log("Hola Mundo!");');
  const [disposicion, setDisposicion] = useState({
    col1: 50,
    col2: 50,  
    fila1: 50,
    fila2: 50
  });
  const [pestañaActiva, setPestañaActiva] = useState('guia');
  const [sidebarAbierto, setSidebarAbierto] = useState(false);
  const [rightSidebarAbierto, setRightSidebarAbierto] = useState(false);
  const [modoOscuro, setModoOscuro] = useState(() => {
    const guardado = localStorage.getItem('cursoJSModoOscuro');
    return guardado ? JSON.parse(guardado) : true;
  });
  const [temaActual, setTemaActual] = useState(4);
  const [menuUsuarioAbierto, setMenuUsuarioAbierto] = useState(false);
  const [mensajesIA, setMensajesIA] = useState([]);
  const [entradaIA, setEntradaIA] = useState('');
  const [pestañaRightSidebar, setPestañaRightSidebar] = useState('ia');
  const [resultadoEjecucion, setResultadoEjecucion] = useState('');
  const [notificacionesAbiertas, setNotificacionesAbiertas] = useState(false);
  const [mensajesAbiertos, setMensajesAbiertos] = useState(false);
  const [messengerAbierto, setMessengerAbierto] = useState(false);
  const [chatActivo, setChatActivo] = useState(null);

  // Refs
  const terminalRef = useRef(null);
  const terminal = useRef(null);
  const fitAddon = useRef(null);
  const estaRedimensionando = useRef(false);
  const tipoRedimension = useRef('');
  const inicioX = useRef(0);
  const inicioY = useRef(0);
  const disposicionInicio = useRef({});
  const menuUsuarioRef = useRef(null);
  const notificacionesRef = useRef(null);
  const mensajesRef = useRef(null);

  // Cerrar menús al hacer clic fuera
  useEffect(() => {
    const manejarClicExterior = (evento) => {
      if (menuUsuarioRef.current && !menuUsuarioRef.current.contains(evento.target)) {
        setMenuUsuarioAbierto(false);
      }
      if (notificacionesRef.current && !notificacionesRef.current.contains(evento.target)) {
        setNotificacionesAbiertas(false);
      }
      if (mensajesRef.current && !mensajesRef.current.contains(evento.target)) {
        setMensajesAbiertos(false);
      }
    };

    document.addEventListener('mousedown', manejarClicExterior);
    return () => {
      document.removeEventListener('mousedown', manejarClicExterior);
    };
  }, []);

  // Persistencia del modo oscuro
  useEffect(() => {
    localStorage.setItem('cursoJSModoOscuro', JSON.stringify(modoOscuro));
  }, [modoOscuro]);

  // Temas de JavaScript con progreso y contenido
  const [temas, setTemas] = useState([
    { 
      id: 1, 
      nombre: "Introducción a JavaScript", 
      progreso: "completado", 
      duracion: "30 min",
      videoId: "EfAl9bwzVZk",
      contenido: {
        guia: "Guía completa para empezar con JavaScript. Aprenderás los conceptos básicos, configuración del entorno y tu primer 'Hola Mundo'.",
        cuestionario: "Preguntas sobre introducción a JS",
        practica: "Ejercicios prácticos de introducción a JavaScript"
      }
    },
    { 
      id: 2, 
      nombre: "Variables y Tipos de Datos", 
      progreso: "completado", 
      duracion: "45 min",
      videoId: "W6NZfCO5SIk",
      contenido: {
        guia: "Guía sobre variables y tipos de datos. Aprenderás a declarar variables con let, const y var, y los diferentes tipos de datos en JavaScript.",
        cuestionario: "Ejercicios de variables",
        practica: "Práctica con variables y tipos de datos"
      }
    },
    { 
      id: 3, 
      nombre: "Operadores y Expresiones", 
      progreso: "completado", 
      duracion: "40 min",
      videoId: "qGwR_PBf-HU",
      contenido: {
        guia: "Guía de operadores en JavaScript. Cubriremos operadores aritméticos, de comparación, lógicos y de asignación.",
        cuestionario: "Práctica con operadores",
        practica: "Ejercicios con operadores y expresiones"
      }
    },
    { 
      id: 4, 
      nombre: "Estructuras de Control", 
      progreso: "en-progreso", 
      duracion: "60 min",
      videoId: "S1ZXSoAxEBg",
      contenido: {
        guia: "Guía de estructuras de control if/else, switch, bucles for, while y do-while. Aprenderás a controlar el flujo de tu código.",
        cuestionario: "Ejercicios de estructuras de control",
        practica: "Práctica con estructuras de control"
      }
    },
    { 
      id: 5, 
      nombre: "Funciones", 
      progreso: "pendiente", 
      duracion: "75 min",
      videoId: "XgNhf-ULYyE",
      contenido: {
        guia: "Guía de funciones en JavaScript. Aprenderás a declarar funciones, usar parámetros, valores de retorno y funciones flecha.",
        cuestionario: "Práctica con funciones",
        practica: "Ejercicios prácticos con funciones"
      }
    },
    { 
      id: 6, 
      nombre: "Arrays y Métodos", 
      progreso: "pendiente", 
      duracion: "65 min",
      videoId: "q8SHaDQdul0",
      contenido: {
        guia: "Guía de arrays y métodos. Aprenderás a crear arrays, acceder a elementos y usar métodos como map, filter, reduce, etc.",
        cuestionario: "Ejercicios con arrays",
        practica: "Práctica con arrays y métodos"
      }
    },
    { 
      id: 7, 
      nombre: "Objetos y POO", 
      progreso: "pendiente", 
      duracion: "80 min",
      videoId: "PFmuCDHHpwk",
      contenido: {
        guia: "Guía de objetos y programación orientada a objetos. Aprenderás a crear objetos, usar propiedades y métodos, y conceptos de POO.",
        cuestionario: "Práctica con objetos",
        practica: "Ejercicios con objetos y POO"
      }
    },
    { 
      id: 8, 
      nombre: "DOM Manipulation", 
      progreso: "pendiente", 
      duracion: "90 min",
      videoId: "y17RuWkWdn8",
      contenido: {
        guia: "Guía de manipulación del DOM. Aprenderás a seleccionar elementos, modificar contenido, estilos y manejar eventos del DOM.",
        cuestionario: "Ejercicios de DOM",
        practica: "Práctica con manipulación del DOM"
      }
    },
    { 
      id: 9, 
      nombre: "Eventos", 
      progreso: "pendiente", 
      duracion: "55 min",
      videoId: "W67jef-7aYw",
      contenido: {
        guia: "Guía de manejo de eventos. Aprenderás a escuchar y responder a eventos del usuario como clicks, teclas, movimientos del mouse, etc.",
        cuestionario: "Práctica con eventos",
        practica: "Ejercicios con manejo de eventos"
      }
    },
    { 
      id: 10, 
      nombre: "ES6+ Features", 
      progreso: "pendiente", 
      duracion: "70 min",
      videoId: "NCwa_xi0Uuc",
      contenido: {
        guia: "Guía de características ES6+. Cubriremos arrow functions, template literals, destructuring, spread operator, y más características modernas.",
        cuestionario: "Ejercicios ES6+",
        practica: "Práctica con características ES6+"
      }
    },
    { 
      id: 11, 
      nombre: "Async/Await y Promesas", 
      progreso: "pendiente", 
      duracion: "85 min",
      videoId: "vn3tm0quoqE",
      contenido: {
        guia: "Guía de programación asíncrona. Aprenderás sobre callbacks, promesas y async/await para manejar operaciones asíncronas.",
        cuestionario: "Práctica con async/await",
        practica: "Ejercicios con programación asíncrona"
      }
    },
    { 
      id: 12, 
      nombre: "Módulos y Import/Export", 
      progreso: "pendiente", 
      duracion: "40 min",
      videoId: "cRHQNNcYqXY",
      contenido: {
        guia: "Guía de módulos en JavaScript. Aprenderás a dividir tu código en módulos y usar import/export para organizar tu aplicación.",
        cuestionario: "Ejercicios con módulos",
        practica: "Práctica con módulos y import/export"
      }
    },
    { 
      id: 13, 
      nombre: "Error Handling", 
      progreso: "pendiente", 
      duracion: "35 min",
      videoId: "YeFzkC2awTM",
      contenido: {
        guia: "Guía de manejo de errores. Aprenderás a usar try/catch, throw y crear errores personalizados para manejar situaciones excepcionales.",
        cuestionario: "Práctica con errores",
        practica: "Ejercicios con manejo de errores"
      }
    },
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

  // Ejercicios prácticos por tema
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

  // Sistema de logros
  const [logros, setLogros] = useState([
    { id: 1, nombre: "Primer Código", descripcion: "Ejecuta tu primer código", desbloqueado: true, icono: "🎯" },
    { id: 2, nombre: "Completista", descripcion: "Completa todos los temas", desbloqueado: false, icono: "🏆" },
    { id: 3, nombre: "Programador Novato", descripcion: "Completa 5 temas", desbloqueado: false, icono: "⭐" },
    { id: 4, nombre: "Ejecutor", descripcion: "Ejecuta código 10 veces", desbloqueado: false, icono: "⚡" }
  ]);

  // Datos de ejemplo para notificaciones y mensajes
  const datosNotificaciones = [
    {
      id: 1,
      titulo: "Nuevo ejercicio disponible",
      mensaje: "Se ha agregado un nuevo ejercicio práctico al tema de Funciones",
      tiempo: "Hace 5 minutos",
      leido: false,
      tipo: "info"
    },
    {
      id: 2,
      titulo: "Recordatorio de progreso",
      mensaje: "Completa el tema actual para desbloquear el siguiente",
      tiempo: "Hace 1 hora",
      leido: false,
      tipo: "warning"
    },
    {
      id: 3,
      titulo: "Logro desbloqueado",
      mensaje: "¡Felicidades! Has desbloqueado el logro 'Primer Código'",
      tiempo: "Ayer",
      leido: true,
      tipo: "success"
    }
  ];

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
    {
      id: 2,
      remitente: "Soporte Técnico",
      mensaje: "Tu problema con el terminal ha sido resuelto",
      tiempo: "09:15 AM",
      noLeido: false,
      avatar: "🔧",
      enLinea: false
    },
    {
      id: 3,
      remitente: "Comunidad JS",
      mensaje: "Nueva discusión sobre closures en JavaScript",
      tiempo: "Ayer",
      noLeido: false,
      avatar: "👥",
      enLinea: true
    }
  ];

  // Datos de chat para el messenger
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
        {
          id: 2,
          texto: "Estoy bien, gracias. Tengo una duda sobre las estructuras de control",
          tiempo: "10:32 AM",
          remitente: "yo"
        },
        {
          id: 3,
          texto: "Perfecto, ¿en qué específicamente necesitas ayuda?",
          tiempo: "10:33 AM",
          remitente: "ellos"
        }
      ]
    },
    2: {
      id: 2,
      remitente: "Soporte Técnico",
      avatar: "🔧",
      enLinea: false,
      mensajes: [
        {
          id: 1,
          texto: "Hemos resuelto el problema que reportaste con el terminal",
          tiempo: "09:15 AM",
          remitente: "ellos"
        },
        {
          id: 2,
          texto: "¡Gracias! ¿Puedo reiniciar la sesión?",
          tiempo: "09:20 AM",
          remitente: "yo"
        },
        {
          id: 3,
          texto: "Sí, reinicia y debería funcionar correctamente",
          tiempo: "09:22 AM",
          remitente: "ellos"
        }
      ]
    },
    3: {
      id: 3,
      remitente: "Comunidad JS",
      avatar: "👥",
      enLinea: true,
      mensajes: [
        {
          id: 1,
          texto: "Nueva discusión sobre closures en JavaScript",
          tiempo: "Ayer",
          remitente: "ellos"
        },
        {
          id: 2,
          texto: "¿Alguien tiene ejemplos prácticos?",
          tiempo: "Ayer",
          remitente: "yo"
        }
      ]
    }
  };

  // Persistencia en localStorage
  useEffect(() => {
    const progresoGuardado = localStorage.getItem('cursoJSProgreso');
    const logrosGuardados = localStorage.getItem('cursoJSLogros');
    const codigoGuardado = localStorage.getItem('cursoJSCodigo');
    
    if (progresoGuardado) {
      setTemas(JSON.parse(progresoGuardado));
    }
    if (logrosGuardados) {
      setLogros(JSON.parse(logrosGuardados));
    }
    if (codigoGuardado) {
      setCodigo(codigoGuardado);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cursoJSProgreso', JSON.stringify(temas));
    localStorage.setItem('cursoJSLogros', JSON.stringify(logros));
    localStorage.setItem('cursoJSCodigo', codigo);
  }, [temas, logros, codigo]);

  // Atajos de teclado
  useEffect(() => {
    const manejarTeclaPresionada = (e) => {
      // Ctrl+Enter o Cmd+Enter para ejecutar código
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        ejecutarCodigo();
      }
      // Ctrl+K o Cmd+K para limpiar terminal
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        limpiarTerminal();
      }
      // Ctrl+L o Cmd+L para limpiar consola
      if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        setResultadoEjecucion('');
      }
    };

    document.addEventListener('keydown', manejarTeclaPresionada);
    return () => document.removeEventListener('keydown', manejarTeclaPresionada);
  }, [codigo]);

  // Obtener tema actual
  const obtenerTemaActual = () => temas.find(tema => tema.id === temaActual);

  // Manejar clic en tema
  const manejarClicTema = (tema) => {
    if (tema.progreso === 'pendiente' && tema.id !== 1) {
      return;
    }
    setTemaActual(tema.id);
    
    // Marcar como en progreso si era pendiente
    if (tema.progreso === 'pendiente') {
      setTemas(prev => prev.map(t => 
        t.id === tema.id ? { ...t, progreso: 'en-progreso' } : t
      ));
    }
  };

  // Manejar envío de mensaje al asistente IA
  const manejarEnvioIA = (e) => {
    e.preventDefault();
    if (!entradaIA.trim()) return;

    const mensajeUsuario = {
      id: Date.now(),
      tipo: 'usuario',
      contenido: entradaIA,
      marcaTiempo: new Date()
    };

    setMensajesIA(prev => [...prev, mensajeUsuario]);
    
    setTimeout(() => {
      const respuestaIA = {
        id: Date.now() + 1,
        tipo: 'asistente',
        contenido: '🤖 El asistente IA estará disponible próximamente. Mientras tanto, puedes consultar el contenido del curso o practicar con los ejercicios disponibles.',
        marcaTiempo: new Date()
      };
      setMensajesIA(prev => [...prev, respuestaIA]);
    }, 1000);

    setEntradaIA('');
  };

  // Cargar ejercicio en el editor
  const cargarEjercicio = () => {
    const ejercicio = ejercicios[temaActual];
    if (ejercicio) {
      setCodigo(ejercicio.solucion);
    }
  };

  // Limpiar editor
  const limpiarEditor = () => {
    setCodigo('// Escribe tu código aquí\n');
  };

  // Exportar a PDF
  const exportarAPDF = () => {
    const tema = obtenerTemaActual();
    if (!tema) return;

    // En una implementación real, aquí se usaría una librería como jsPDF
    // Por ahora simulamos la funcionalidad
    const contenido = `
      ${tema.nombre} - ${pestañaActiva.toUpperCase()}
      
      ${tema.contenido[pestañaActiva]}
      
      ${ejercicios[temaActual] ? `Ejercicio: ${ejercicios[temaActual].descripcion}` : ''}
      
      Exportado el: ${new Date().toLocaleDateString()}
    `;
    
    // Simular descarga
    const blob = new Blob([contenido], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tema.nombre}-${pestañaActiva}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Mostrar mensaje de éxito
    alert(`Contenido de "${pestañaActiva}" exportado como PDF`);
  };

  // Toggle pantalla completa
  const alternarPantallaCompleta = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setMenuUsuarioAbierto(false);
  };

  // Manejar notificaciones y mensajes
  const alternarNotificaciones = () => {
    setNotificacionesAbiertas(!notificacionesAbiertas);
    if (mensajesAbiertos) setMensajesAbiertos(false);
  };

  const alternarMensajes = () => {
    setMensajesAbiertos(!mensajesAbiertos);
    if (notificacionesAbiertas) setNotificacionesAbiertas(false);
  };

  const abrirMessenger = () => {
    setMessengerAbierto(true);
    setMensajesAbiertos(false);
  };

  const cerrarMessenger = () => {
    setMessengerAbierto(false);
    setChatActivo(null);
  };

  const abrirChat = (chatId) => {
    setChatActivo(chatId);
  };

  const marcarTodosComoLeidos = () => {
    // Aquí iría la lógica para marcar todas como leídas
    console.log("Marcando todas las notificaciones como leídas");
  };

  // Inicializar terminal
  useEffect(() => {
    if (!terminalRef.current) return;

    const inicializarTerminal = setTimeout(() => {
      try {
        terminal.current = new Terminal({
          cursorBlink: true,
          theme: {
            background: modoOscuro ? '#1e1e1e' : '#ffffff',
            foreground: modoOscuro ? '#cccccc' : '#333333',
            cursor: modoOscuro ? '#ffffff' : '#333333'
          },
          fontSize: 14,
          cols: 80,
          rows: 15
        });

        fitAddon.current = new FitAddon();
        terminal.current.loadAddon(fitAddon.current);
        terminal.current.open(terminalRef.current);
        
        setTimeout(() => {
          try {
            fitAddon.current?.fit();
            configurarTerminal();
          } catch (error) {
            console.error('Error ajustando terminal:', error);
            configurarTerminal();
          }
        }, 100);

      } catch (error) {
        console.error('Error inicializando terminal:', error);
      }
    }, 100);

    return () => {
      clearTimeout(inicializarTerminal);
      if (terminal.current) {
        terminal.current.dispose();
      }
    };
  }, [modoOscuro]);

  // Debounced fit para el terminal
  const debouncedFit = useRef(
    debounce(() => {
      if (fitAddon.current) {
        fitAddon.current.fit();
      }
    }, 250)
  );

  useEffect(() => {
    window.addEventListener('resize', debouncedFit.current);
    return () => window.removeEventListener('resize', debouncedFit.current);
  }, []);

  // Setup terminal commands
  const configurarTerminal = () => {
    if (!terminal.current) return;
    
    const term = terminal.current;
    term.writeln('Bienvenido a Coddy Terminal');
    term.writeln('Escribe "help" para ver comandos disponibles');
    term.writeln('Usa Ctrl+Enter para ejecutar código o Ctrl+K para limpiar terminal');
    term.write('\r\n$ ');

    let entradaActual = '';

    term.onData((data) => {
      const code = data.charCodeAt(0);
      
      if (code === 13) {
        term.write('\r\n');
        manejarComando(entradaActual.trim());
        entradaActual = '';
        term.write('$ ');
      } else if (code === 127) {
        if (entradaActual.length > 0) {
          entradaActual = entradaActual.slice(0, -1);
          term.write('\b \b');
        }
      } else if (code >= 32 && code <= 126) {
        entradaActual += data;
        term.write(data);
      }
    });
  };

  // Manejar comandos de terminal
  const manejarComando = (comando) => {
    if (!terminal.current) return;
    
    const [cmd, ...args] = comando.split(' ');
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
        term.clear();
        term.write('$ ');
        break;

      case 'run':
        ejecutarCodigo();
        break;

      case 'echo':
        term.writeln(args.join(' '));
        break;

      case 'exercise':
        cargarEjercicio();
        term.writeln('✅ Ejercicio cargado en el editor');
        break;

      case '':
        break;

      default:
        term.writeln(`Comando no encontrado: ${cmd}`);
    }
  };

  // Ejecutar código con validación de seguridad
  const ejecutarCodigo = () => {
    if (!terminal.current) return;
    const term = terminal.current;
    
    // Validar código
    const validacion = validarCodigo(codigo);
    if (!validacion.esValido) {
      term.writeln(`❌ ${validacion.mensaje}`);
      setResultadoEjecucion(`Error: ${validacion.mensaje}`);
      return;
    }

    term.writeln('🚀 Ejecutando código...');
    setResultadoEjecucion('Ejecutando código...');
    
    try {
      // Crear un contexto seguro para ejecución
      const contextoSeguro = {
        console: {
          log: (...args) => {
            const salida = args.map(arg => 
              typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
            ).join(' ');
            term.writeln(salida);
            setResultadoEjecucion(prev => prev + salida + '\n');
          }
        },
        setTimeout: undefined,
        setInterval: undefined,
        fetch: undefined,
        XMLHttpRequest: undefined,
        document: undefined,
        window: undefined
      };

      // Función segura de ejecución
      const resultado = new Function(...Object.keys(contextoSeguro), `
        try {
          ${codigo}
          return "✅ Ejecución completada sin errores";
        } catch (error) {
          return "❌ Error: " + error.message;
        }
      `)(...Object.values(contextoSeguro));
      
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

  // Desbloquear logros
  const desbloquearLogro = (logroId) => {
    setLogros(prev => prev.map(logro => 
      logro.id === logroId ? { ...logro, desbloqueado: true } : logro
    ));
  };

  // Limpiar terminal
  const limpiarTerminal = () => {
    if (terminal.current) {
      terminal.current.clear();
      terminal.current.write('$ ');
    }
    setResultadoEjecucion('');
  };

  // Restablecer layout
  const restablecerDisposicion = () => {
    setDisposicion({ col1: 50, col2: 50, fila1: 50, fila2: 50 });
  };

  // Handlers para redimensionamiento
  const iniciarRedimension = (tipo, evento) => {
    evento.preventDefault();
    evento.stopPropagation();
    estaRedimensionando.current = true;
    tipoRedimension.current = tipo;
    inicioX.current = evento.clientX;
    inicioY.current = evento.clientY;
    disposicionInicio.current = { ...disposicion };
    
    document.addEventListener('mousemove', manejarRedimension);
    document.addEventListener('mouseup', detenerRedimension);
    document.body.style.cursor = tipo.includes('col') ? 'col-resize' : 'row-resize';
    document.body.style.userSelect = 'none';
  };

  const manejarRedimension = (evento) => {
    if (!estaRedimensionando.current) return;

    const deltaX = evento.clientX - inicioX.current;
    const deltaY = evento.clientY - inicioY.current;

    const contenedor = document.querySelector('.contenedor-principal');
    if (!contenedor) return;

    const anchoContenedor = contenedor.offsetWidth;
    const altoContenedor = contenedor.offsetHeight;

    if (tipoRedimension.current === 'col') {
      const deltaPorcentaje = (deltaX / anchoContenedor) * 100;
      const nuevoCol1 = Math.max(20, Math.min(80, disposicionInicio.current.col1 + deltaPorcentaje));
      setDisposicion(prev => ({
        ...prev,
        col1: nuevoCol1,
        col2: 100 - nuevoCol1
      }));
    } else if (tipoRedimension.current === 'fila1') {
      const deltaPorcentaje = (deltaY / altoContenedor) * 100;
      const nuevoFila1 = Math.max(20, Math.min(80, disposicionInicio.current.fila1 + deltaPorcentaje));
      setDisposicion(prev => ({
        ...prev,
        fila1: nuevoFila1
      }));
    } else if (tipoRedimension.current === 'fila2') {
      const deltaPorcentaje = (deltaY / altoContenedor) * 100;
      const nuevoFila2 = Math.max(20, Math.min(80, disposicionInicio.current.fila2 + deltaPorcentaje));
      setDisposicion(prev => ({
        ...prev,
        fila2: nuevoFila2
      }));
    }
  };

  const detenerRedimension = () => {
    estaRedimensionando.current = false;
    document.removeEventListener('mousemove', manejarRedimension);
    document.removeEventListener('mouseup', detenerRedimension);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  // Ajustar terminal al cambiar tamaño
  useEffect(() => {
    const manejarRedimension = () => {
      setTimeout(() => {
        if (fitAddon.current) {
          fitAddon.current.fit();
        }
      }, 100);
    };

    window.addEventListener('resize', manejarRedimension);
    return () => window.removeEventListener('resize', manejarRedimension);
  }, []);

  return (
    <div className={`aplicacion ${modoOscuro ? 'modo-oscuro' : 'modo-claro'}`}>
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
        <Sidebar
          sidebarAbierto={sidebarAbierto}
          temas={temas}
          temaActual={temaActual}
          manejarClicTema={manejarClicTema}
        />

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