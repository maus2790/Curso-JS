import React, { useState, useEffect, useCallback } from 'react';
import './Sidebar.css';
import datosCurso from './datosCurso.json'; // Importar desde JSON

const Sidebar = ({ 
  sidebarAbierto, 
  temaActual, 
  onTemaChange, 
  onDatosCursoChange 
}) => {
  // Estado local para los temas del curso
  const [temas, setTemas] = useState(() => {
    // Cargar temas desde localStorage o usar datos por defecto
    const temasGuardados = localStorage.getItem('cursoJSProgreso');
    
    if (temasGuardados) {
      const temasParseados = JSON.parse(temasGuardados);
      // Filtrar solo los temas que existen en datosCurso.json (IDs 1, 2, 3)
      return temasParseados.filter(tema => 
        datosCurso.temas.some(temaJson => temaJson.id === tema.id)
      );
    }
    
    return datosCurso.temas;
  });

  // Memoizar la función de callback para evitar recreaciones innecesarias
  const datosCursoCompleto = useCallback(() => {
    return {
      temas
    };
  }, [temas]);

  // Efecto para notificar cambios en los datos del curso al componente padre
  // SOLO cuando cambien los temas
  useEffect(() => {
    if (onDatosCursoChange) {
      onDatosCursoChange(datosCursoCompleto());
    }
  }, [temas, onDatosCursoChange, datosCursoCompleto]); // Solo se ejecuta cuando 'temas' cambia

  // Efecto para persistir cambios en localStorage
  useEffect(() => {
    localStorage.setItem('cursoJSProgreso', JSON.stringify(temas));
  }, [temas]);

  // Función para obtener el ícono de progreso
  const obtenerIconoProgreso = (progreso) => {
    switch (progreso) {
      case 'completado': return '✅';
      case 'en-progreso': return '🔄';
      case 'pendiente': return '⏳';
      default: return '📝';
    }
  };

  // Función para obtener la clase CSS de progreso
  const obtenerClaseProgreso = (progreso) => {
    switch (progreso) {
      case 'completado': return 'tema-completado';
      case 'en-progreso': return 'tema-en-progreso';
      case 'pendiente': return 'tema-pendiente';
      default: return '';
    }
  };

  // Manejar clic en tema
  const manejarClicTema = (tema) => {
    if (tema.progreso === 'pendiente' && tema.id !== 1) {
      return; // No permite cambiar a temas bloqueados
    }
    
    // Notificar al componente padre sobre el cambio de tema
    if (onTemaChange) {
      onTemaChange(tema.id);
    }
    
    // Marcar como en progreso si era pendiente
    if (tema.progreso === 'pendiente') {
      const temasActualizados = temas.map(t => 
        t.id === tema.id ? { ...t, progreso: 'en-progreso' } : t
      );
      setTemas(temasActualizados);
    }
  };

  return (
    <div className={`sidebar ${sidebarAbierto ? 'sidebar-abierto' : 'sidebar-cerrado'}`}>
      <div className="encabezado-sidebar">
        <h3>📚 Temas del Curso</h3>
        <div className="resumen-progreso">
          <span className="texto-progreso">
            {temas.filter(t => t.progreso === 'completado').length} / {temas.length} completados
          </span>
        </div>
      </div>
      <div className="lista-temas">
        {temas.map(tema => (
          <div 
            key={tema.id} 
            className={`elemento-tema ${obtenerClaseProgreso(tema.progreso)} ${
              tema.id === temaActual ? 'tema-activo' : ''
            } ${tema.progreso === 'pendiente' && tema.id !== 1 ? 'tema-bloqueado' : ''}`}
            onClick={() => manejarClicTema(tema)}
          >
            <div className="icono-tema">
              {obtenerIconoProgreso(tema.progreso)}
            </div>
            <div className="contenido-tema">
              <div className="nombre-tema">{tema.nombre}</div>
              <div className="meta-tema">
                <span className="duracion-tema">{tema.duracion}</span>
                <span className="estado-tema">
                  {tema.progreso === 'completado' ? 'Completado' : 
                   tema.progreso === 'en-progreso' ? 'En Progreso' : 
                   tema.id === 1 ? 'Disponible' : 'Bloqueado'}
                </span>
              </div>
            </div>
            {tema.progreso === 'pendiente' && tema.id !== 1 && (
              <div className="candado-tema">🔒</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export { datosCurso };
export default Sidebar;