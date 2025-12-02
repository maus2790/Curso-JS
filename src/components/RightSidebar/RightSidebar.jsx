import React, { useState, useCallback } from 'react';
import './RightSidebar.css';

const RightSidebar = ({
  rightSidebarAbierto,
  modoOscuro,
  setModoOscuro
  }) => {
  const [pestañaRightSidebar, setPestañaRightSidebar] = useState('ia');
  const [mensajesIA, setMensajesIA] = useState([]);
  const [entradaIA, setEntradaIA] = useState('');

  // ========== FUNCIONES DE MANEJO ==========

  // Manejar envío de mensaje al asistente IA
  const manejarEnvioIA = useCallback((e) => {
    e.preventDefault();
    if (!entradaIA.trim()) return;

    const mensajeUsuario = {
      id: Date.now(),
      tipo: 'usuario',
      contenido: entradaIA,
      marcaTiempo: new Date()
    };

    setMensajesIA(prev => [...prev, mensajeUsuario]);
    
    // Simular respuesta del asistente IA
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
  }, [entradaIA]);

  // ========== RENDERIZADO DE CONTENIDO ==========

  const renderizarContenidoRightSidebar = () => {
    switch (pestañaRightSidebar) {
      case 'ia':
        return (
          <div className="contenedor-chat-ia">
            <div className="mensajes-ia">
              {mensajesIA.length === 0 ? (
                <div className="bienvenida-ia">
                  <div className="icono-bienvenida-ia">🤖</div>
                  <h4>¡Hola! Soy tu asistente de aprendizaje</h4>
                  <p>Pregúntame sobre JavaScript y te ayudaré en tu camino de aprendizaje.</p>
                  <div className="preguntas-ejemplo-ia">
                    <div className="pregunta-ejemplo">"¿Qué es una función en JavaScript?"</div>
                    <div className="pregunta-ejemplo">"Explícame el concepto de closures"</div>
                    <div className="pregunta-ejemplo">"¿Cómo funciona async/await?"</div>
                  </div>
                </div>
              ) : (
                mensajesIA.map(mensaje => (
                  <div key={mensaje.id} className={`mensaje-ia ${mensaje.tipo}`}>
                    <div className="avatar-mensaje">
                      {mensaje.tipo === 'usuario' ? '👤' : '🤖'}
                    </div>
                    <div className="contenido-mensaje">
                      <div className="texto-mensaje">{mensaje.contenido}</div>
                      <div className="tiempo-mensaje">
                        {mensaje.marcaTiempo.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <form className="formulario-entrada-ia" onSubmit={manejarEnvioIA}>
              <div className="contenedor-entrada-ia">
                <input
                  type="text"
                  value={entradaIA}
                  onChange={(e) => setEntradaIA(e.target.value)}
                  placeholder="Escribe tu pregunta sobre JavaScript..."
                  className="entrada-ia"
                  disabled
                />
                <button type="submit" className="boton-enviar-ia" disabled>
                  ➤
                </button>
              </div>
              <div className="advertencia-ia">
                ⚠️ El asistente IA estará disponible en una próxima actualización
              </div>
            </form>
          </div>
        );
      
      case 'notas':
        return (
          <div className="contenido-herramienta">
            <div className="bienvenida-herramienta">
              <div className="icono-herramienta">📝</div>
              <h4>Block de Notas</h4>
              <p>Tus apuntes y notas personales del curso.</p>
              <div className="advertencia-herramienta">
                🔧 Funcionalidad en desarrollo
              </div>
            </div>
          </div>
        );
      
      case 'calculadora':
        return (
          <div className="contenido-herramienta">
            <div className="bienvenida-herramienta">
              <div className="icono-herramienta">🧮</div>
              <h4>Calculadora Programadora</h4>
              <p>Herramientas de cálculo especializadas para desarrolladores.</p>
              <div className="advertencia-herramienta">
                🔧 Funcionalidad en desarrollo
              </div>
            </div>
          </div>
        );
      
      case 'recursos':
        return (
          <div className="contenido-herramienta">
            <div className="bienvenida-herramienta">
              <div className="icono-herramienta">📚</div>
              <h4>Recursos de Aprendizaje</h4>
              <p>Documentación, ejemplos y recursos adicionales.</p>
              <div className="seccion-logros">
                <h5>🏆 Tus Logros</h5>
                <div className="lista-logros">

                </div>
              </div>
            </div>
          </div>
        );
      
      case 'configuracion':
        return (
          <div className="contenido-herramienta">
            <div className="bienvenida-herramienta">
              <div className="icono-herramienta">⚙️</div>
              <h4>Configuración</h4>
              <p>Personaliza tu experiencia de aprendizaje.</p>
              <div className="opciones-configuracion">
                <div className="elemento-configuracion">
                  <label>Modo Oscuro</label>
                  <button 
                    className={`boton-alternar ${modoOscuro ? 'activo' : ''}`}
                    onClick={() => setModoOscuro(!modoOscuro)}
                  >
                    {modoOscuro ? 'ON' : 'OFF'}
                  </button>
                </div>
                <div className="elemento-configuracion">
                  <label>Auto-guardado</label>
                  <span className="estado-configuracion">✅ Activado</span>
                </div>
                <div className="elemento-configuracion">
                  <label>Atajos de teclado</label>
                  <span className="estado-configuracion">✅ Activados</span>
                </div>
              </div>
              <div className="atajos-teclado">
                <h5>⌨️ Atajos de Teclado</h5>
                <div className="elemento-atajo">
                  <kbd>Ctrl</kbd> + <kbd>Enter</kbd> - Ejecutar código
                </div>
                <div className="elemento-atajo">
                  <kbd>Ctrl</kbd> + <kbd>K</kbd> - Limpiar terminal
                </div>
                <div className="elemento-atajo">
                  <kbd>Ctrl</kbd> + <kbd>L</kbd> - Limpiar resultados
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`sidebar-derecho ${rightSidebarAbierto ? 'sidebar-derecho-abierto' : 'sidebar-derecho-cerrado'}`}>
      <div className="encabezado-sidebar-derecho">
        <h3>🧰 Panel de Herramientas</h3>
        <div className="pestañas-herramientas">
          <button 
            className={`pestaña-herramienta ${pestañaRightSidebar === 'ia' ? 'activa' : ''}`}
            onClick={() => setPestañaRightSidebar('ia')}
            title="Asistente IA"
          >
            <span className="icono">🤖</span>
          </button>
          <button 
            className={`pestaña-herramienta ${pestañaRightSidebar === 'notas' ? 'activa' : ''}`}
            onClick={() => setPestañaRightSidebar('notas')}
            title="Block de Notas"
          >
            <span className="icono">📝</span>
          </button>
          <button 
            className={`pestaña-herramienta ${pestañaRightSidebar === 'calculadora' ? 'activa' : ''}`}
            onClick={() => setPestañaRightSidebar('calculadora')}
            title="Calculadora"
          >
            <span className="icono">🧮</span>
          </button>
          <button 
            className={`pestaña-herramienta ${pestañaRightSidebar === 'recursos' ? 'activa' : ''}`}
            onClick={() => setPestañaRightSidebar('recursos')}
            title="Recursos"
          >
            <span className="icono">📚</span>
          </button>
          <button 
            className={`pestaña-herramienta ${pestañaRightSidebar === 'configuracion' ? 'activa' : ''}`}
            onClick={() => setPestañaRightSidebar('configuracion')}
            title="Configuración"
          >
            <span className="icono">⚙️</span>
          </button>
        </div>
      </div>
      
      {renderizarContenidoRightSidebar()}
    </div>
  );
};

export default RightSidebar;