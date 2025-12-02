import React, { useState, useEffect, useCallback } from 'react';
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
  
  // Estado para el tema actual
  const [temaActual, setTemaActual] = useState(1);
  
  // Estados para datos del curso que vienen del Sidebar
  const [datosCursoApp, setDatosCursoApp] = useState({
    temas: []
  });

  // Estados de UI
  const [messengerAbierto, setMessengerAbierto] = useState(false);

  // Estado para controlar paneles visibles
  const [panelesVisibles, setPanelesVisibles] = useState({
    video: true,
    content: true,
    editor: true,
    terminal: true
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
  setPanelesVisibles={setPanelesVisibles} // Nueva prop
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