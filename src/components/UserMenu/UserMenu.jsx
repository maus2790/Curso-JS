import React, { useState, useRef, useEffect } from 'react';
import { 
  User, 
  Star, 
  Diamond, 
  Coins, 
  Home, 
  Monitor, 
  Moon, 
  Sun, 
  LogOut 
} from 'lucide-react';
import './UserMenu.css';

const UserMenu = ({ alternarPantallaCompleta, darkMode, setDarkMode, stats }) => {
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

  const alternarTema = () => {
    setDarkMode(!darkMode);
    setMenuUsuarioAbierto(false);
  };

  return (
    <div className="contenedor-avatar-usuario" ref={menuUsuarioRef}>
      <button
        className={`avatar-usuario ${menuUsuarioAbierto ? 'activo' : ''}`}
        onClick={alternarMenuUsuario}
        title="Menú de usuario"
      >
        <User size={20} />
      </button>

      {menuUsuarioAbierto && (
        <div className="menu-usuario">
          <div className="encabezado-menu-usuario">
            <div className="avatar-usuario-grande">
              <User size={32} />
            </div>
            <div className="info-usuario">
              <div className="nombre-usuario">Estudiante</div>
              <div className="rol-usuario">Nivel {Math.floor(stats.xp / 500) + 1} - Programador</div>
            </div>
          </div>
          <div className="fila-estadisticas-usuario">
            <div className="elemento-estadistica" title="Experiencia">
              <Star size={16} className="icono-xp" />
              <span className="valor-estadistica">{stats.xp.toLocaleString()} XP</span>
            </div>
            <div className="elemento-estadistica" title="Diamantes">
              <Diamond size={16} className="icono-diamante" />
              <span className="valor-estadistica">{stats.diamonds}</span>
            </div>
            <div className="elemento-estadistica" title="Monedas">
              <Coins size={16} className="icono-moneda" />
              <span className="valor-estadistica">{stats.coins}</span>
            </div>
          </div>
          <hr className="divisor-menu" />
          <div className="elementos-menu-usuario">
            <button
              className="elemento-menu-usuario"
              onClick={() => manejarNavegacion('home')}
            >
              <Home size={18} />
              <span>Home</span>
            </button>
            <button
              className="elemento-menu-usuario"
              onClick={() => manejarNavegacion('perfil')}
            >
              <User size={18} />
              <span>Perfil</span>
            </button>
            <button
              className="elemento-menu-usuario"
              onClick={alternarPantallaCompleta}
            >
              <Monitor size={18} />
              <span>Pantalla Completa</span>
            </button>
            <button
              className="elemento-menu-usuario tema-toggle"
              onClick={alternarTema}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              <span>{darkMode ? 'Modo Claro' : 'Modo Oscuro'}</span>
            </button>
            <button
              className="elemento-menu-usuario cerrar-sesion"
              onClick={manejarCerrarSesion}
            >
              <LogOut size={18} />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;