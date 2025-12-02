import React from 'react';
import './Sidebar.css';

const Sidebar = ({ sidebarAbierto, temas, temaActual, manejarClicTema }) => {
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

export default Sidebar;