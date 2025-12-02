import React from 'react';
import Notifications from '../Notifications/Notifications';
import UserMenu from '../UserMenu/UserMenu';
import './Header.css';

const Header = ({
  sidebarAbierto,
  setSidebarAbierto,
  rightSidebarAbierto,
  setRightSidebarAbierto,
  temaActual,
  restablecerDisposicion,
  abrirMessenger
}) => {
  // Datos de mensajes de ejemplo para el header
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

  const renderizarContenidoMensajes = () => (
    <div className="contenido-mensajes">
      <div className="encabezado-mensajes">
        <h4>💬 Mensajes</h4>
        <span className="contador-mensajes">{datosMensajes.filter(m => m.noLeido).length} sin leer</span>
      </div>
      <div className="lista-mensajes">
        {datosMensajes.map(mensaje => (
          <div key={mensaje.id} className={`elemento-mensaje ${mensaje.noLeido ? 'no-leido' : 'leido'}`}>
            <div className="avatar-mensaje">
              {mensaje.avatar}
              {mensaje.enLinea && <div className="indicador-en-linea"></div>}
            </div>
            <div className="contenido-mensaje">
              <div className="remitente-mensaje">{mensaje.remitente}</div>
              <div className="vista-previa-mensaje">{mensaje.mensaje}</div>
              <div className="tiempo-mensaje">{mensaje.tiempo}</div>
            </div>
            {mensaje.noLeido && <div className="punto-mensaje"></div>}
            <button 
              className="boton-abrir-chat"
              onClick={abrirMessenger}
              title="Abrir chat completo"
            >
              💬
            </button>
          </div>
        ))}
      </div>
      <div className="pie-mensajes">
        <button className="boton-ver-todos-mensajes" onClick={abrirMessenger}>
          Ver todos los mensajes
        </button>
      </div>
    </div>
  );

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
  };

  return (
    <header className="encabezado-aplicacion">
      <div className="izquierda-encabezado">
        <button 
          className="alternar-sidebar"
          onClick={() => setSidebarAbierto(!sidebarAbierto)}
          title={sidebarAbierto ? "Ocultar sidebar" : "Mostrar sidebar"}
        >
          {sidebarAbierto ? '◀' : '▶'}
        </button>
        <div className="titulo-encabezado">
          <h1>🚀 Curso de JavaScript</h1>
          <p>Domina JavaScript desde cero - {temaActual?.nombre}</p>
        </div>
      </div>
      <div className="derecha-encabezado">
        <button 
          className="icono-encabezado"
          onClick={restablecerDisposicion}
          title="Restablecer diseño"
        >
          <span className="icono">🔄</span>
        </button>

        <button 
          className="icono-encabezado"
          onClick={abrirMessenger}
          title="Abrir Messenger"
        >
          <span className="icono">💬</span>
          <span className="insignia-notificacion">1</span>
        </button>

        {/* Componente Notifications integrado */}
        <Notifications />

        <button 
          className={`icono-encabezado ${rightSidebarAbierto ? 'activo' : ''}`}
          onClick={() => setRightSidebarAbierto(!rightSidebarAbierto)}
          title={rightSidebarAbierto ? "Ocultar herramientas" : "Mostrar herramientas"}
        >
          <span className="icono">{rightSidebarAbierto ? '❌' : '🧰'}</span>
        </button>

        {/* Componente UserMenu integrado */}
        <UserMenu alternarPantallaCompleta={alternarPantallaCompleta} />
      </div>
    </header>
  );
};

export default Header;