import React, { useState, useRef, useEffect } from 'react';
import './PanelControlMenu.css';

const PanelControlMenu = ({ 
  panelesVisibles, 
  togglePanel, 
  restablecerDisposicion,
  setPanelesVisibles
}) => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const menuRef = useRef(null);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const manejarClicExterno = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAbierto(false);
      }
    };

    if (menuAbierto) {
      document.addEventListener('mousedown', manejarClicExterno);
    }

    return () => {
      document.removeEventListener('mousedown', manejarClicExterno);
    };
  }, [menuAbierto]);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const manejarTogglePanel = (panel) => {
    togglePanel(panel);
  };

  const manejarRestablecerDisposicion = () => {
    // Mostrar todos los paneles primero
    setPanelesVisibles({
      video: true,
      content: true,
      editor: true,
      terminal: true
    });
    
    // Luego restablecer la disposición
    restablecerDisposicion();
    setMenuAbierto(false);
  };

  return (
    <div className="panel-control-menu" ref={menuRef}>
      <button 
        className={`icono-encabezado ${menuAbierto ? 'activo' : ''}`}
        onClick={toggleMenu}
        title="Control de paneles"
      >
        <span className="icono">📊</span>
      </button>

      {menuAbierto && (
        <div className="menu-paneles">
          <div className="menu-paneles-contenido">
            <h4>Control de Paneles</h4>
            
            <div className="grupos-paneles">
              <div className="grupo-paneles">
                <span className="grupo-titulo">Columna Izquierda</span>
                <button 
                  className={`opcion-panel ${panelesVisibles.video ? 'activo' : ''}`}
                  onClick={() => manejarTogglePanel('video')}
                >
                  <span className="estado-panel">{panelesVisibles.video ? '●' : '○'}</span>
                  Video Panel
                </button>
                <button 
                  className={`opcion-panel ${panelesVisibles.content ? 'activo' : ''}`}
                  onClick={() => manejarTogglePanel('content')}
                >
                  <span className="estado-panel">{panelesVisibles.content ? '●' : '○'}</span>
                  Content Panel
                </button>
              </div>
              
              <div className="grupo-paneles">
                <span className="grupo-titulo">Columna Derecha</span>
                <button 
                  className={`opcion-panel ${panelesVisibles.editor ? 'activo' : ''}`}
                  onClick={() => manejarTogglePanel('editor')}
                >
                  <span className="estado-panel">{panelesVisibles.editor ? '●' : '○'}</span>
                  Editor Panel
                </button>
                <button 
                  className={`opcion-panel ${panelesVisibles.terminal ? 'activo' : ''}`}
                  onClick={() => manejarTogglePanel('terminal')}
                >
                  <span className="estado-panel">{panelesVisibles.terminal ? '●' : '○'}</span>
                  Terminal Panel
                </button>
              </div>
            </div>

            <div className="menu-acciones">
              <button 
                className="accion-panel"
                onClick={() => {
                  togglePanel('all');
                  setMenuAbierto(false);
                }}
              >
                Mostrar/Ocultar Todos
              </button>
              
              <button 
                className="accion-panel accion-restablecer"
                onClick={manejarRestablecerDisposicion}
              >
                <span className="icono-accion">🔄</span>
                Restablecer Diseño
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PanelControlMenu;