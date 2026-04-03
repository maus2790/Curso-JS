import React, { useState, useEffect, useCallback } from 'react';
import { 
  Book, 
  CheckCircle, 
  RefreshCw, 
  Clock, 
  Lock,
  BookOpen
} from 'lucide-react';
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

  // Listener para avanzar-tema
  useEffect(() => {
    const handleAvanzarTema = (e) => {
      const { temaIdActual } = e.detail;
      
      setTemas(prevTemas => {
        const nuevosTemas = [...prevTemas];
        const indexAct = nuevosTemas.findIndex(t => t.id === temaIdActual);
        if (indexAct >= 0) {
          // Marcar actual como completado
          nuevosTemas[indexAct] = { ...nuevosTemas[indexAct], progreso: 'completado' };
          
          // Avanzar al siguiente si existe
          const nextIndex = indexAct + 1;
          if (nextIndex < nuevosTemas.length) {
            const nextTema = nuevosTemas[nextIndex];
            // Asegurarnos que avanza llamando al onChange delegadamente
            setTimeout(() => {
               if (onTemaChange) onTemaChange(nextTema.id);
            }, 100);
          }
        }
        return nuevosTemas;
      });
    };

    window.addEventListener('avanzar-tema', handleAvanzarTema);
    return () => window.removeEventListener('avanzar-tema', handleAvanzarTema);
  }, [onTemaChange]);

  // Función para obtener el ícono de progreso
  const obtenerIconoProgreso = (progreso) => {
    switch (progreso) {
      case 'completado': return <CheckCircle size={18} className="icono-completado" />;
      case 'en-progreso': return <RefreshCw size={18} className="icono-progreso-anim" />;
      case 'pendiente': return <Clock size={18} className="icono-pendiente" />;
      default: return <BookOpen size={18} />;
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

  // Lógica de validación si un tema está desbloqueado
  const esDesbloqueado = (tema, index) => {
    if (index === 0) return true; // Primer tema siempre activo
    if (tema.progreso === 'completado' || tema.progreso === 'en-progreso') return true;
    const previo = temas[index - 1];
    return previo && previo.progreso === 'completado';
  };

  // Manejar clic en tema
  const manejarClicTema = (tema) => {
    const index = temas.findIndex(t => t.id === tema.id);
    if (!esDesbloqueado(tema, index)) {
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
        <h3><Book size={20} /> Temas del Curso</h3>
        <div className="resumen-progreso">
          <span className="texto-progreso">
            {temas.filter(t => t.progreso === 'completado').length} / {temas.length} completados
          </span>
        </div>
      </div>
      <div className="lista-temas">
        {temas.map((tema, index) => {
          const desbloqueado = esDesbloqueado(tema, index);
          return (
            <div 
              key={tema.id} 
              className={`elemento-tema ${obtenerClaseProgreso(tema.progreso)} ${
                tema.id === temaActual ? 'tema-activo' : ''
              } ${!desbloqueado ? 'tema-bloqueado' : ''}`}
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
                     desbloqueado ? 'Disponible' : 'Bloqueado'}
                  </span>
                </div>
              </div>
              {!desbloqueado && (
                <div className="candado-tema">
                  <Lock size={14} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { datosCurso };
export default Sidebar;