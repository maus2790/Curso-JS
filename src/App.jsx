import React, { useState, useEffect, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Star, Coins, Diamond, BookOpen, Trophy } from 'lucide-react';
import Header from './components/Header/Header';
import Sidebar, { datosCurso } from './components/Sidebar/Sidebar';
import RightSidebar from './components/RightSidebar/RightSidebar';
import MainContent from './components/MainContent/MainContent';
import Messenger from './components/Messenger/Messenger';
import './App.css';

const App = () => {
  // Estados principales de la aplicación
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

  // Estado para estadísticas del usuario (XP, Monedas, Diamantes)
  const [stats, setStats] = useState(() => {
    const guardado = localStorage.getItem('cursoJSStats');
    return guardado ? JSON.parse(guardado) : { xp: 0, coins: 0, diamonds: 0 };
  });
  
  // Estado para el tema actual
  const [temaActual, setTemaActual] = useState(1);
  
  // Estados para datos del curso que vienen del Sidebar
  const [datosCursoApp, setDatosCursoApp] = useState({
    temas: []
  });

  // Estados de UI
  const [messengerAbierto, setMessengerAbierto] = useState(false);

  // Estado para controlar paneles visibles (con persistencia en localStorage)
  const [panelesVisibles, setPanelesVisibles] = useState(() => {
    const guardado = localStorage.getItem('cursoJSPaneles');
    return guardado ? JSON.parse(guardado) : { video: true, content: true, editor: true, terminal: true };
  });

  // ========== EFECTOS SECUNDARIOS ==========

  // Cargar datos iniciales del curso
  useEffect(() => {
    const temasGuardados = localStorage.getItem('cursoJSProgreso');
    
    let temasIniciales;
    if (temasGuardados) {
      const temasParseados = JSON.parse(temasGuardados);
      temasIniciales = temasParseados.filter(tema => 
        datosCurso.temas.some(temaJson => temaJson.id === tema.id)
      );
    } else {
      temasIniciales = datosCurso.temas;
    }
    
    setDatosCursoApp({
      temas: temasIniciales,
    });
  }, []);

  // Persistencia del modo oscuro
  useEffect(() => {
    localStorage.setItem('cursoJSModoOscuro', JSON.stringify(modoOscuro));
  }, [modoOscuro]);

  // Persistencia de estadísticas
  useEffect(() => {
    localStorage.setItem('cursoJSStats', JSON.stringify(stats));
  }, [stats]);

  // Persistencia de paneles visibles
  useEffect(() => {
    localStorage.setItem('cursoJSPaneles', JSON.stringify(panelesVisibles));
  }, [panelesVisibles]);

  // ========== NOTIFICACIONES TOAST ==========
  const mostrarToastRecompensa = useCallback(({ xpGanado, monedasGanadas, diamantesGanados, esNuevaCompletitud }) => {
    // Toast de XP siempre
    if (xpGanado > 0) {
      toast.custom((t) => (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          background: '#1e3a5f', color: '#93c5fd',
          padding: '12px 18px', borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          border: '1px solid #3b82f6',
          opacity: t.visible ? 1 : 0,
          transition: 'opacity 0.3s ease',
          fontWeight: 600, fontSize: '0.95rem'
        }}>
          <span style={{ fontSize: '1.2rem' }}>⭐</span>
          <span>+{xpGanado} XP ganados</span>
        </div>
      ), { duration: 3000 });
    }

    // Toast de monedas (solo primera vez)
    if (monedasGanadas > 0 && esNuevaCompletitud) {
      setTimeout(() => {
        toast.custom((t) => (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            background: '#3b2800', color: '#fcd34d',
            padding: '12px 18px', borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
            border: '1px solid #f59e0b',
            opacity: t.visible ? 1 : 0,
            transition: 'opacity 0.3s ease',
            fontWeight: 600, fontSize: '0.95rem'
          }}>
            <span style={{ fontSize: '1.2rem' }}>🪙</span>
            <span>¡+{monedasGanadas} Monedas recibidas!</span>
          </div>
        ), { duration: 3500 });
      }, 600);
    }

    // Toast de diamantes (solo primera vez y buen puntaje)
    if (diamantesGanados > 0 && esNuevaCompletitud) {
      setTimeout(() => {
        toast.custom((t) => (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            background: '#0f172a', color: '#a78bfa',
            padding: '12px 18px', borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(139,92,246,0.5)',
            border: '1px solid #8b5cf6',
            opacity: t.visible ? 1 : 0,
            transition: 'opacity 0.3s ease',
            fontWeight: 600, fontSize: '0.95rem'
          }}>
            <span style={{ fontSize: '1.2rem' }}>💎</span>
            <span>¡+{diamantesGanados} Diamante obtenido!</span>
          </div>
        ), { duration: 4000 });
      }, 1200);
    }
  }, []);

  // Listener para recompensas y navegación
  useEffect(() => {
    const manejarRecompensa = (e) => {
      const { tipo, aciertos, temaId, esNuevaCompletitud } = e.detail;

      let xpGanado = 0;
      let monedasGanadas = 0;
      let diamantesGanados = 0;
      
      setStats(prev => {
        const nuevosStats = { ...prev };
        
        // XP se suma siempre por aciertos
        xpGanado = aciertos * 10;
        nuevosStats.xp += xpGanado;

        // Monedas y Diamantes solo si es la primera vez (esNuevaCompletitud)
        if (tipo === 'evaluacion' && esNuevaCompletitud) {
          monedasGanadas = aciertos * 5;
          nuevosStats.coins += monedasGanadas;
          if (aciertos >= 5) {
            diamantesGanados = 1;
            nuevosStats.diamonds += diamantesGanados;
          }
        }
        
        return nuevosStats;
      });

      // Mostrar notificaciones toast
      setTimeout(() => {
        mostrarToastRecompensa({ xpGanado, monedasGanadas, diamantesGanados, esNuevaCompletitud });
      }, 100);
    };

    const manejarAvanceTema = (e) => {
      // Cuando se avanza de tema, volver a la pestaña guía
      setPestañaActiva('guia');
      // Toast de avance de tema
      toast.custom((t) => (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          background: '#052e16', color: '#86efac',
          padding: '12px 18px', borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          border: '1px solid #22c55e',
          opacity: t.visible ? 1 : 0,
          transition: 'opacity 0.3s ease',
          fontWeight: 600, fontSize: '0.95rem'
        }}>
          <span style={{ fontSize: '1.2rem' }}>🏆</span>
          <span>¡Tema completado! Avanzando al siguiente...</span>
        </div>
      ), { duration: 4000 });
    };

    window.addEventListener('recompensa-usuario', manejarRecompensa);
    window.addEventListener('avanzar-tema', manejarAvanceTema);
    
    return () => {
      window.removeEventListener('recompensa-usuario', manejarRecompensa);
      window.removeEventListener('avanzar-tema', manejarAvanceTema);
    };
  }, [mostrarToastRecompensa]);

  // ========== FUNCIONES DE MANEJO ==========

  // Obtener tema actual desde los datos del curso
  const obtenerTemaActual = () => datosCursoApp.temas.find(tema => tema.id === temaActual);

  // Manejar cambio de tema desde el Sidebar
  const manejarCambioTema = useCallback((nuevoTemaId) => {
    setTemaActual(nuevoTemaId);
  }, []);

  // Manejar actualización de datos del curso desde el Sidebar
  const manejarCambioDatosCurso = useCallback((nuevosDatos) => {
    setDatosCursoApp(nuevosDatos);
  }, []);

  // Función para alternar paneles
  const togglePanel = useCallback((panel) => {
    if (panel === 'all') {
      const todosVisibles = Object.values(panelesVisibles).every(v => v);
      setPanelesVisibles({
        video: !todosVisibles,
        content: !todosVisibles,
        editor: !todosVisibles,
        terminal: !todosVisibles
      });
    } else {
      setPanelesVisibles(prev => ({
        ...prev,
        [panel]: !prev[panel]
      }));
    }
  }, [panelesVisibles]);

  const abrirMessenger = () => {
    setMessengerAbierto(true);
  };

  const cerrarMessenger = () => {
    setMessengerAbierto(false);
  };

  // Restablecer layout
  const restablecerDisposicion = () => {
    setDisposicion({ col1: 50, col2: 50, fila1: 50, fila2: 50 });
  };

  // ========== RENDERIZADO PRINCIPAL ==========

  return (
    <div className={`aplicacion ${modoOscuro ? 'modo-oscuro' : 'modo-claro'}`}>
      <Toaster
        position="bottom-right"
        toastOptions={{ style: { background: 'transparent', boxShadow: 'none', padding: 0 } }}
      />
<Header
  sidebarAbierto={sidebarAbierto}
  setSidebarAbierto={setSidebarAbierto}
  rightSidebarAbierto={rightSidebarAbierto}
  setRightSidebarAbierto={setRightSidebarAbierto}
  temaActual={obtenerTemaActual()}
  restablecerDisposicion={restablecerDisposicion}
  abrirMessenger={abrirMessenger}
  panelesVisibles={panelesVisibles}
  togglePanel={togglePanel}
  setPanelesVisibles={setPanelesVisibles}
  modoOscuro={modoOscuro}
  setModoOscuro={setModoOscuro}
  stats={stats}
/>

      <div className="contenedor-principal">
        <Sidebar
          sidebarAbierto={sidebarAbierto}
          temaActual={temaActual}
          onTemaChange={manejarCambioTema}
          onDatosCursoChange={manejarCambioDatosCurso}
        />

        <MainContent
          sidebarAbierto={sidebarAbierto}
          rightSidebarAbierto={rightSidebarAbierto}
          disposicion={disposicion}
          setDisposicion={setDisposicion}
          temaActual={obtenerTemaActual()}
          pestañaActiva={pestañaActiva}
          setPestañaActiva={setPestañaActiva}
          modoOscuro={modoOscuro}
          panelesVisibles={panelesVisibles}
        />

        <RightSidebar
          rightSidebarAbierto={rightSidebarAbierto}
          modoOscuro={modoOscuro}
          setModoOscuro={setModoOscuro}
        />

        <Messenger
          messengerAbierto={messengerAbierto}
          cerrarMessenger={cerrarMessenger}
        />
      </div>
    </div>
  );
};

export default App;