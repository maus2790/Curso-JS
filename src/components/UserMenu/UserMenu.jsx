import React, { useState, useRef, useEffect } from 'react';
import './UserMenu.css';

const UserMenu = ({ alternarPantallaCompleta }) => {
  const [menuUsuarioAbierto, setMenuUsuarioAbierto] = useState(false);
  const menuUsuarioRef = useRef(null);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const manejarClicExterior = (evento) => {
      if (menuUsuarioRef.current && !menuUsuarioRef.current.contains(evento.target)) {
        setMenuUsuarioAbierto(false);
      }
    };

    document.addEventListener('mousedown', manejarClicExterior);
    return () => {
      document.removeEventListener('mousedown', manejarClicExterior);
    };
  }, []);

  const alternarMenuUsuario = () => {
    setMenuUsuarioAbierto(!menuUsuarioAbierto);
  };

  const manejarCerrarSesion = () => {
    console.log("Cerrando sesión...");
    setMenuUsuarioAbierto(false);
  };

  const manejarNavegacion = (destino) => {
    console.log(`Navegando a: ${destino}`);
    setMenuUsuarioAbierto(false);
  };

  return (
    <div className="contenedor-avatar-usuario" ref={menuUsuarioRef}>
      <button 
        className={`avatar-usuario ${menuUsuarioAbierto ? 'activo' : ''}`}
        onClick={alternarMenuUsuario}
        title="Menú de usuario"
      >
        <span className="icono">👤</span>
      </button>
      
      {menuUsuarioAbierto && (
        <div className="menu-usuario">
          <div className="encabezado-menu-usuario">
            <div className="avatar-usuario-grande">
              <span className="icono">👤</span>
            </div>
            <div className="info-usuario">
              <div className="nombre-usuario">Estudiante</div>
              <div className="rol-usuario">Nivel 5 - Programador Novato</div>
            </div>
          </div>
          <div className="fila-estadisticas-usuario">
            <div className="elemento-estadistica">
              <span className="icono-estadistica">⭐</span>
              <span className="valor-estadistica">1,250 XP</span>
            </div>
            <div className="elemento-estadistica">
              <span className="icono-estadistica">💎</span>
              <span className="valor-estadistica">85</span>
            </div>
            <div className="elemento-estadistica">
              <span className="icono-estadistica">🪙</span>
              <span className="valor-estadistica">320</span>
            </div>
          </div> 
          <hr className="divisor-menu" />
          <div className="elementos-menu-usuario">
            <button 
              className="elemento-menu-usuario"
              onClick={() => manejarNavegacion('home')}
            >
              <span className="icono">🏠</span>
              <span>Home</span>
            </button>
            <button 
              className="elemento-menu-usuario"
              onClick={() => manejarNavegacion('perfil')}
            >
              <span className="icono">👤</span>
              <span>Perfil</span>
            </button>
            <button 
              className="elemento-menu-usuario"
              onClick={alternarPantallaCompleta}
            >
              <span className="icono">📺</span>
              <span>Pantalla Completa</span>
            </button>
            <button 
              className="elemento-menu-usuario cerrar-sesion"
              onClick={manejarCerrarSesion}
            >
              <span className="icono">🚪</span>
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;