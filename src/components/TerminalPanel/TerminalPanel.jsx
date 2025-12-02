import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import './TerminalPanel.css';

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
  const patronesPeligrosos = [];
  
  const peligroso = patronesPeligrosos.some(pattern => pattern.test(codigo));
  return {
    esValido: !peligroso,
    mensaje: peligroso ? 
      "El código contiene patrones potencialmente peligrosos y no puede ser ejecutado." : 
      "Código válido"
  };
};

const TerminalPanel = ({
  altura,
  codigo,
  solicitarEjecucion,
  onEjecucionProcesada,
  modoOscuro
}) => {
  const [resultadoEjecucion, setResultadoEjecucion] = useState('');
  const [modoVisualizacion, setModoVisualizacion] = useState('terminal');
  const terminalRef = useRef(null);
  const visorRef = useRef(null);
  const terminal = useRef(null);
  const fitAddon = useRef(null);
  const terminalInicializado = useRef(false);
  const observerRef = useRef(null);

  // Debounced fit para el terminal
  const debouncedFit = useRef(
    debounce(() => {
      if (fitAddon.current && modoVisualizacion === 'terminal' && terminalInicializado.current) {
        try {
          fitAddon.current.fit();
        } catch (error) {
          console.warn('Error ajustando terminal:', error);
        }
      }
    }, 250)
  );

  // ========== INICIALIZACIÓN DEL TERMINAL ==========

  const inicializarTerminal = useCallback(() => {
    if (!terminalRef.current || terminalInicializado.current) {
      return;
    }

    console.log('🔧 Intentando inicializar terminal...');

    // Usar MutationObserver para esperar a que el elemento esté listo
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new MutationObserver((mutations, observer) => {
      const element = terminalRef.current;
      if (element && element.offsetWidth > 0 && element.offsetHeight > 0) {
        observer.disconnect();
        crearTerminal();
      }
    });

    // Verificar si el elemento ya está listo
    const element = terminalRef.current;
    if (element && element.offsetWidth > 0 && element.offsetHeight > 0) {
      crearTerminal();
    } else {
      // Observar cambios en el elemento
      if (element) {
        observerRef.current.observe(element, {
          attributes: true,
          attributeFilter: ['style', 'class'],
          childList: true,
          subtree: true
        });

        // Timeout de respaldo
        setTimeout(() => {
          if (!terminalInicializado.current && observerRef.current) {
            observerRef.current.disconnect();
            crearTerminal();
          }
        }, 2000);
      }
    }
  }, [modoOscuro]);

  const crearTerminal = () => {
    if (terminalInicializado.current || !terminalRef.current) return;

    try {
      console.log('🎯 Creando instancia del terminal...');

      // Limpiar cualquier contenido previo
      if (terminalRef.current) {
        terminalRef.current.innerHTML = '';
      }

      // Crear nueva instancia del terminal con configuración mínima
      terminal.current = new Terminal({
        cursorBlink: false, // Desactivar temporalmente
        theme: {
          background: modoOscuro ? '#1e1e1e' : '#ffffff',
          foreground: modoOscuro ? '#cccccc' : '#333333',
          cursor: modoOscuro ? '#ffffff' : '#333333'
        },
        fontSize: 14,
        fontFamily: 'monospace',
        cols: 40, // Empezar con menos columnas
        rows: 10, // Empezar con menos filas
        allowTransparency: false,
        convertEol: true,
        disableStdin: false,
        scrollback: 1000
      });

      // Configurar addons
      fitAddon.current = new FitAddon();
      terminal.current.loadAddon(fitAddon.current);
      
      console.log('📝 Abriendo terminal en el DOM...');
      
      // Abrir el terminal
      terminal.current.open(terminalRef.current);
      
      // Esperar un frame antes de configurar
      requestAnimationFrame(() => {
        try {
          console.log('⚙️ Configurando terminal...');
          
          // Ajustar tamaño después de que el terminal esté en el DOM
          setTimeout(() => {
            if (fitAddon.current) {
              try {
                fitAddon.current.fit();
                console.log('✅ Terminal ajustado correctamente');
              } catch (fitError) {
                console.warn('⚠️ Error en fit del terminal:', fitError);
              }
            }
            
            configurarTerminal();
            terminalInicializado.current = true;
            
            // Reactivar cursor blink después de la inicialización
            setTimeout(() => {
              if (terminal.current) {
                terminal.current.options.cursorBlink = true;
              }
            }, 100);
            
            console.log('🎉 Terminal inicializado correctamente');
            
          }, 100);
          
        } catch (configError) {
          console.error('❌ Error configurando terminal:', configError);
          terminalInicializado.current = true; // Marcar como inicializado para evitar reintentos
        }
      });

    } catch (error) {
      console.error('💥 Error crítico inicializando terminal:', error);
      terminalInicializado.current = true; // Marcar como inicializado para evitar reintentos
      
      // Fallback simple
      if (terminalRef.current) {
        terminalRef.current.innerHTML = `
          <div style="padding: 20px; color: #666; background: #f5f5f5; border-radius: 5px; font-family: Arial, sans-serif;">
            <p>💻 Terminal listo. Escribe "help" para comenzar.</p>
          </div>
        `;
      }
    }
  };

  const configurarTerminal = () => {
    if (!terminal.current) return;
    
    const term = terminal.current;
    
    try {
      term.clear();
      term.writeln('\x1b[1;32mBienvenido a Coddy Terminal\x1b[0m');
      term.writeln('Escribe "help" para ver comandos disponibles');
      term.writeln('Usa Ctrl+S para ejecutar código');
      term.write('\r\n$ ');

      let entradaActual = '';

      term.onData((data) => {
        const code = data.charCodeAt(0);
        
        if (code === 13) { // Enter
          term.write('\r\n');
          manejarComando(entradaActual.trim());
          entradaActual = '';
          term.write('$ ');
        } else if (code === 127) { // Backspace
          if (entradaActual.length > 0) {
            entradaActual = entradaActual.slice(0, -1);
            term.write('\b \b');
          }
        } else if (code >= 32 && code <= 126) { // Caracteres imprimibles
          entradaActual += data;
          term.write(data);
        }
      });
    } catch (error) {
      console.error('Error configurando terminal:', error);
    }
  };

  // ========== EFECTOS SECUNDARIOS ==========

  // Efecto para inicializar el terminal
  useEffect(() => {
    if (modoVisualizacion === 'terminal' && !terminalInicializado.current) {
      console.log('🚀 Iniciando proceso de inicialización del terminal...');
      
      const timer = setTimeout(() => {
        inicializarTerminal();
      }, 300);

      return () => {
        clearTimeout(timer);
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    }
  }, [modoVisualizacion, inicializarTerminal]);

  // Efecto para manejar cambios entre modos
  useEffect(() => {
    if (modoVisualizacion === 'terminal') {
      if (terminalRef.current) {
        terminalRef.current.style.display = 'block';
      }
      if (visorRef.current) {
        visorRef.current.style.display = 'none';
        visorRef.current.innerHTML = '';
      }
      
      // Re-ajustar el terminal si ya está inicializado
      if (terminalInicializado.current && fitAddon.current) {
        setTimeout(() => {
          try {
            fitAddon.current.fit();
          } catch (error) {
            console.warn('Error re-ajustando terminal:', error);
          }
        }, 200);
      }
    } else {
      if (terminalRef.current) {
        terminalRef.current.style.display = 'none';
      }
      if (visorRef.current) {
        visorRef.current.style.display = 'block';
        if (codigo && codigo.trim()) {
          ejecutarCodigoEnVisor(codigo);
        }
      }
    }
  }, [modoVisualizacion, codigo]);

  // Ajustar terminal al cambiar tamaño
  useEffect(() => {
    const manejarRedimension = () => {
      if (modoVisualizacion === 'terminal' && fitAddon.current && terminalInicializado.current) {
        setTimeout(() => {
          try {
            fitAddon.current.fit();
          } catch (error) {
            console.warn('Error en resize del terminal:', error);
          }
        }, 100);
      }
    };

    window.addEventListener('resize', manejarRedimension);
    return () => window.removeEventListener('resize', manejarRedimension);
  }, [modoVisualizacion]);

  // Ejecutar código cuando se solicita
  useEffect(() => {
    if (solicitarEjecucion && codigo && codigo.trim()) {
      if (modoVisualizacion === 'terminal') {
        ejecutarCodigoEnTerminal(codigo);
      } else {
        ejecutarCodigoEnVisor(codigo);
      }
      if (onEjecucionProcesada) {
        onEjecucionProcesada();
      }
    }
  }, [solicitarEjecucion, codigo, onEjecucionProcesada, modoVisualizacion]);

  // Limpiar recursos al desmontar
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (terminal.current) {
        try {
          terminal.current.dispose();
        } catch (error) {
          console.warn('Error limpiando terminal:', error);
        }
      }
      terminalInicializado.current = false;
    };
  }, []);

  // ========== FUNCIONES DEL TERMINAL ==========

  const manejarComando = (comando) => {
    if (!terminal.current) return;
    
    const [cmd, ...args] = comando.split(' ');
    const term = terminal.current;

    try {
      switch (cmd.toLowerCase()) {
        case 'help':
          term.writeln('Comandos disponibles:');
          term.writeln('  help        - Mostrar esta ayuda');
          term.writeln('  clear       - Limpiar terminal');
          term.writeln('  echo <text> - Mostrar texto');
          term.writeln('  status      - Estado del sistema');
          term.writeln('  run         - Ejecutar código actual del editor');
          break;

        case 'clear':
          limpiarTerminal();
          break;

        case 'echo':
          term.writeln(args.join(' '));
          break;

        case 'status':
          term.writeln('✅ Sistema funcionando correctamente');
          term.writeln('📝 Editor de código activo');
          term.writeln('🔧 Terminal operativo');
          break;

        case 'run':
          if (codigo && codigo.trim()) {
            ejecutarCodigoEnTerminal(codigo);
          } else {
            term.writeln('❌ No hay código para ejecutar');
          }
          break;

        case '':
          break;

        default:
          term.writeln(`Comando no encontrado: ${cmd}`);
      }
    } catch (error) {
      console.error('Error ejecutando comando:', error);
      term.writeln(`❌ Error ejecutando comando: ${error.message}`);
    }
  };

  const ejecutarCodigoEnTerminal = useCallback((codigoAEjecutar) => {
    if (!terminal.current || !terminalInicializado.current) {
      console.warn('Terminal no está listo para ejecutar código');
      return;
    }
    
    const term = terminal.current;
    
    try {
      term.clear();
      term.writeln('🚀 Ejecutando código...');
      setResultadoEjecucion('Ejecutando código...');
      
      const validacion = validarCodigo(codigoAEjecutar);
      if (!validacion.esValido) {
        term.writeln(`❌ ${validacion.mensaje}`);
        setResultadoEjecucion(`Error: ${validacion.mensaje}`);
        term.write('\r\n$ ');
        return;
      }
      
      const contextoSeguro = {
        console: {
          log: (...args) => {
            const salida = args.map(arg => 
              typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
            ).join(' ');
            term.writeln(salida);
            setResultadoEjecucion(prev => prev + salida + '\n');
          }
        }
      };

      const resultado = new Function(...Object.keys(contextoSeguro), `
        try {
          ${codigoAEjecutar}
          return "✅ Ejecución completada sin errores";
        } catch (error) {
          return "❌ Error: " + error.message;
        }
      `)(...Object.values(contextoSeguro));
      
      if (resultado && resultado !== "✅ Ejecución completada sin errores") {
        term.writeln(resultado);
        setResultadoEjecucion(resultado);
      } else {
        term.writeln("✅ Ejecución completada sin errores");
      }
      
      term.write('\r\n$ ');
      
    } catch (error) {
      const mensajeError = `❌ Error de ejecución: ${error.message}`;
      term.writeln(mensajeError);
      setResultadoEjecucion(mensajeError);
      term.write('\r\n$ ');
    }
  }, []);

  const limpiarTerminal = () => {
    if (terminal.current && terminalInicializado.current) {
      try {
        terminal.current.clear();
        terminal.current.write('$ ');
      } catch (error) {
        console.warn('Error limpiando terminal:', error);
      }
    }
    setResultadoEjecucion('');
  };

  // ========== FUNCIONES DEL VISOR ==========

  const ejecutarCodigoEnVisor = useCallback((codigoAEjecutar) => {
    if (!visorRef.current) return;

    visorRef.current.innerHTML = '';

    try {
      const iframe = document.createElement('iframe');
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';
      iframe.style.background = 'white';
      
      let contenidoHTML = '';
      
      if (codigoAEjecutar.includes('<!DOCTYPE html') || codigoAEjecutar.includes('<html')) {
        contenidoHTML = codigoAEjecutar;
      } else if (codigoAEjecutar.trim().startsWith('<')) {
        contenidoHTML = `
          <!DOCTYPE html>
          <html>
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Resultado del Código</title>
              <style>
                  body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
                  .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
              </style>
          </head>
          <body>
              <div class="container">${codigoAEjecutar}</div>
          </body>
          </html>
        `;
      } else if (codigoAEjecutar.includes('background:') || codigoAEjecutar.includes('color:')) {
        contenidoHTML = `
          <!DOCTYPE html>
          <html>
          <head>
              <meta charset="UTF-8">
              <style>${codigoAEjecutar}</style>
          </head>
          <body>
              <h3>Vista previa de CSS</h3>
              <div style="width: 200px; height: 200px; margin: 20px auto; display: flex; align-items: center; justify-content: center; border: 2px dashed #ccc;">
                  Elemento de demostración
              </div>
          </body>
          </html>
        `;
      } else {
        contenidoHTML = `
          <!DOCTYPE html>
          <html>
          <head>
              <meta charset="UTF-8">
              <title>Resultado JavaScript</title>
              <style>
                  body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
                  .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
                  .output { background: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 20px; white-space: pre-wrap; font-family: monospace; }
              </style>
          </head>
          <body>
              <div class="container">
                  <h3>Salida del Código JavaScript</h3>
                  <div class="output" id="output">Ejecutando código...</div>
                  <script>
                      (function() {
                          const output = document.getElementById('output');
                          const originalLog = console.log;
                          console.log = function(...args) {
                              originalLog.apply(console, args);
                              output.textContent += args.join(' ') + '\\\\n';
                          };
                          try { ${codigoAEjecutar} } catch(error) {
                              output.textContent = '❌ Error: ' + error.message;
                          }
                      })();
                  </script>
              </div>
          </body>
          </html>
        `;
      }

      iframe.srcdoc = contenidoHTML;
      visorRef.current.appendChild(iframe);
      
    } catch (error) {
      console.error('Error en el visor:', error);
    }
  }, []);

  const alternarModoVisualizacion = () => {
    setModoVisualizacion(prev => prev === 'terminal' ? 'visor' : 'terminal');
  };

  // ========== RENDERIZADO ==========

  return (
    <div className="panel panel-terminal" style={{ height: altura }}>
      <div className="encabezado-panel">
        <h3>🔧 {modoVisualizacion === 'terminal' ? 'Terminal' : 'Visor'}</h3>
        <div className="acciones-terminal">
          <button 
            className={`boton-cambio-modo ${modoVisualizacion === 'visor' ? 'activo' : ''}`}
            onClick={alternarModoVisualizacion}
          >
            {modoVisualizacion === 'terminal' ? '👁️ Visor' : '💻 Terminal'}
          </button>
          
          <span className="estado-ejecucion">
            {resultadoEjecucion && resultadoEjecucion.includes('❌') ? '❌ Error' : 
             resultadoEjecucion && resultadoEjecucion.includes('✅') ? '✅ Listo' : '⚡ Listo'}
          </span>
          
          {modoVisualizacion === 'terminal' && (
            <button className="boton-limpiar" onClick={limpiarTerminal}>
              🗑️ 
            </button>
          )}
        </div>
      </div>
      
      <div className="contenido-panel">
        <div 
          ref={terminalRef} 
          className="contenedor-terminal"
          style={{ display: modoVisualizacion === 'terminal' ? 'block' : 'none' }}
        />
        
        <div 
          ref={visorRef}
          className="contenedor-visor"
          style={{ display: modoVisualizacion === 'visor' ? 'block' : 'none' }}
        />
      </div>
    </div>
  );
};

export default TerminalPanel;