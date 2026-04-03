import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Rocket,
  MessageSquare,
  Toolbox,
  X
} from 'lucide-react';
import Notifications from '../Notifications/Notifications';
import UserMenu from '../UserMenu/UserMenu';
import PanelControlMenu from '../PanelControlMenu/PanelControlMenu';
import './Header.css';

const Header = ({
  sidebarAbierto,
  setSidebarAbierto,
  rightSidebarAbierto,
  setRightSidebarAbierto,
  temaActual,
  restablecerDisposicion,
  abrirMessenger,
  panelesVisibles,
  togglePanel,
  setPanelesVisibles, // Nueva prop
  modoOscuro,
  setModoOscuro,
  stats
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
          {sidebarAbierto ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
        <div className="titulo-encabezado">
          <h1><Rocket className="icono-cohete" size={24} /> Curso de JavaScript</h1>
          <p>Domina JavaScript desde cero - {temaActual?.nombre}</p>
        </div>
      </div>
      <div className="derecha-encabezado">
        {/* Menú de control de paneles */}
        <PanelControlMenu
          panelesVisibles={panelesVisibles}
          togglePanel={togglePanel}
          restablecerDisposicion={restablecerDisposicion}
          setPanelesVisibles={setPanelesVisibles} // Pasar la nueva prop
        />

        <button
          className="icono-encabezado"
          onClick={abrirMessenger}
          title="Abrir Messenger"
        >
          <MessageSquare size={20} />
          <span className="insignia-notificacion">1</span>
        </button>

        {/* Componente Notifications integrado */}
        <Notifications />

        <button
          className={`icono-encabezado ${rightSidebarAbierto ? 'activo' : ''}`}
          onClick={() => setRightSidebarAbierto(!rightSidebarAbierto)}
          title={rightSidebarAbierto ? "Ocultar herramientas" : "Mostrar herramientas"}
        >
          {rightSidebarAbierto ? <X size={20} /> : <Toolbox size={20} />}
        </button>

        {/* Componente UserMenu integrado */}
        <UserMenu
          alternarPantallaCompleta={alternarPantallaCompleta}
          darkMode={modoOscuro}
          setDarkMode={setModoOscuro}
          stats={stats}
        />
      </div>
    </header>
  );
};

export default Header;