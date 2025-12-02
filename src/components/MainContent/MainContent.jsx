import React, { useState, useEffect, useCallback } from 'react';
import VideoPanel from '../VideoPanel/VideoPanel';
import ContentPanel from '../ContentPanel/ContentPanel';
import EditorPanel from '../EditorPanel/EditorPanel';
import TerminalPanel from '../TerminalPanel/TerminalPanel';
import Resizer from '../Resizer/Resizer';
import './MainContent.css';

const MainContent = ({
  sidebarAbierto,
  rightSidebarAbierto,
  disposicion,
  setDisposicion,
  temaActual,
  pestañaActiva,
  setPestañaActiva,
  modoOscuro,
  panelesVisibles
}) => {
  const [codigoActual, setCodigoActual] = useState(() => {
    // Cargar el código inicial desde localStorage o usar el valor por defecto
    const codigoGuardado = localStorage.getItem('cursoJSCodigo');
    return codigoGuardado || '// Escribe tu código aquí\nconsole.log("Hola Mundo!");';
  });
  const [solicitarEjecucion, setSolicitarEjecucion] = useState(false);

  // Actualizar variables CSS para las posiciones de los resizers
  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--posicion-col', `${disposicion.col1}%`);
    root.style.setProperty('--posicion-fila1', `${disposicion.fila1}%`);
    root.style.setProperty('--posicion-fila2', `${disposicion.fila2}%`);
  }, [disposicion]);

  // Atajos de teclado globales (funcionan en cualquier parte de la aplicación)
  useEffect(() => {
    const manejarTeclaPresionada = (e) => {
      // Ctrl+S para ejecutar código
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (codigoActual && codigoActual.trim()) {
          manejarSolicitarEjecucion();
        }
      }
      // Ctrl+X para limpiar editor
      if ((e.ctrlKey || e.metaKey) && e.key === 'x') {
        e.preventDefault();
        manejarLimpiarCodigo();
      }
    };

    document.addEventListener('keydown', manejarTeclaPresionada);
    return () => document.removeEventListener('keydown', manejarTeclaPresionada);
  }, [codigoActual]);

  // Manejar cambio de código
  const manejarCambioCodigo = useCallback((nuevoCodigo) => {
    setCodigoActual(nuevoCodigo || '');
  }, []);

  // Manejar solicitud de ejecución de código
  const manejarSolicitarEjecucion = useCallback(() => {
    // Activar la bandera para ejecutar
    setSolicitarEjecucion(true);
  }, []);

  // Resetear la bandera de ejecución después de que TerminalPanel la procese
  const manejarEjecucionProcesada = useCallback(() => {
    setSolicitarEjecucion(false);
  }, []);

  // Manejar limpieza de código
  const manejarLimpiarCodigo = useCallback(() => {
    const codigoLimpio = '// Escribe tu código aquí\n';
    setCodigoActual(codigoLimpio);
  }, []);

  // Calcular distribución automática cuando cambia la visibilidad de paneles
  useEffect(() => {
    const { video, content, editor, terminal } = panelesVisibles;
    
    let nuevaDisposicion = { ...disposicion };
    
    // Ajustar distribución de columnas
    if ((video || content) && (editor || terminal)) {
      // Ambas columnas tienen paneles visibles - distribución equilibrada
      nuevaDisposicion.col1 = 50;
      nuevaDisposicion.col2 = 50;
    } else if (video || content) {
      // Solo columna 1 visible
      nuevaDisposicion.col1 = 100;
      nuevaDisposicion.col2 = 0;
    } else if (editor || terminal) {
      // Solo columna 2 visible
      nuevaDisposicion.col1 = 0;
      nuevaDisposicion.col2 = 100;
    }
    
    // Ajustar distribución de filas en columna 1
    if (video && content) {
      nuevaDisposicion.fila1 = 50;
    } else if (video) {
      nuevaDisposicion.fila1 = 100;
    } else if (content) {
      nuevaDisposicion.fila1 = 0;
    }
    
    // Ajustar distribución de filas en columna 2
    if (editor && terminal) {
      nuevaDisposicion.fila2 = 50;
    } else if (editor) {
      nuevaDisposicion.fila2 = 100;
    } else if (terminal) {
      nuevaDisposicion.fila2 = 0;
    }
    
    setDisposicion(nuevaDisposicion);
  }, [panelesVisibles]);

  return (
    <div 
      className="contenido-principal" 
      style={{ 
        marginLeft: sidebarAbierto ? '300px' : '0',
        marginRight: rightSidebarAbierto ? '350px' : '0'
      }}
    >
      <div className="contenedor-principal-interno">
        {/* Columna 1: Video y Contenido - Solo renderizar si hay paneles visibles */}
        {(panelesVisibles.video || panelesVisibles.content) && (
          <div 
            className="columna columna-1" 
            style={{ 
              width: (panelesVisibles.editor || panelesVisibles.terminal) ? `${disposicion.col1}%` : '100%'
            }}
          >
            {panelesVisibles.video && (
              <VideoPanel 
                temaActual={temaActual}
                altura={panelesVisibles.content ? `${disposicion.fila1}%` : '100%'}
              />
            )}

            {/* Resizer horizontal en columna 1 - Solo si ambos paneles están visibles */}
            {panelesVisibles.video && panelesVisibles.content && (
              <Resizer 
                tipo="fila1"
                clase="redimensionador-fila1"
                disposicion={disposicion}
                setDisposicion={setDisposicion}
                panelesVisibles={panelesVisibles}
              />
            )}

            {panelesVisibles.content && (
              <ContentPanel 
                altura={panelesVisibles.video ? `${100 - disposicion.fila1}%` : '100%'}
                temaActual={temaActual}
                pestañaActiva={pestañaActiva}
                setPestañaActiva={setPestañaActiva}
                disposicion={disposicion}
              />
            )}
          </div>
        )}

        {/* Resizer vertical entre columnas - Solo si hay paneles en ambas columnas */}
        {(panelesVisibles.video || panelesVisibles.content) && (panelesVisibles.editor || panelesVisibles.terminal) && (
          <Resizer 
            tipo="col"
            clase="redimensionador-col"
            disposicion={disposicion}
            setDisposicion={setDisposicion}
            panelesVisibles={panelesVisibles}
          />
        )}

        {/* Columna 2: Editor y Terminal - Solo renderizar si hay paneles visibles */}
        {(panelesVisibles.editor || panelesVisibles.terminal) && (
          <div 
            className="columna columna-2" 
            style={{ 
              width: (panelesVisibles.video || panelesVisibles.content) ? `${disposicion.col2}%` : '100%'
            }}
          >
            {panelesVisibles.editor && (
              <EditorPanel 
                altura={panelesVisibles.terminal ? `${disposicion.fila2}%` : '100%'}
                temaActual={temaActual}
                modoOscuro={modoOscuro}
                codigoInicial={codigoActual}
                onCodigoChange={manejarCambioCodigo}
                onEjecutarCodigo={manejarSolicitarEjecucion}
                onLimpiarCodigo={manejarLimpiarCodigo}
              />
            )}

            {/* Resizer horizontal en columna 2 - Solo si ambos paneles están visibles */}
            {panelesVisibles.editor && panelesVisibles.terminal && (
              <Resizer 
                tipo="fila2"
                clase="redimensionador-fila2"
                disposicion={disposicion}
                setDisposicion={setDisposicion}
                panelesVisibles={panelesVisibles}
              />
            )}

            {panelesVisibles.terminal && (
              <TerminalPanel 
                altura={panelesVisibles.editor ? `${100 - disposicion.fila2}%` : '100%'}
                codigo={codigoActual}
                solicitarEjecucion={solicitarEjecucion}
                onEjecucionProcesada={manejarEjecucionProcesada}
                modoOscuro={modoOscuro}
              />
            )}
          </div>
        )}

        {/* Mensaje cuando no hay paneles visibles */}
        {!panelesVisibles.video && !panelesVisibles.content && !panelesVisibles.editor && !panelesVisibles.terminal && (
          <div className="sin-paneles-mensaje">
            <h3>No hay paneles visibles</h3>
            <p>Usa el menú de control de paneles en el header para mostrar algunos paneles.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;