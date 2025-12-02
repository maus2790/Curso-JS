import React, { useState, useRef, useEffect } from 'react';
import './Notifications.css';

const Notifications = () => {
  const [notificacionesAbiertas, setNotificacionesAbiertas] = useState(false);
  const notificacionesRef = useRef(null);

  // Datos de ejemplo para notificaciones
  const datosNotificaciones = [
    {
      id: 1,
      titulo: "Nuevo ejercicio disponible",
      mensaje: "Se ha agregado un nuevo ejercicio práctico al tema de Funciones",
      tiempo: "Hace 5 minutos",
      leido: false,
      tipo: "info"
    },
    {
      id: 2,
      titulo: "Recordatorio de progreso",
      mensaje: "Completa el tema actual para desbloquear el siguiente",
      tiempo: "Hace 1 hora",
      leido: false,
      tipo: "warning"
    },
    {
      id: 3,
      titulo: "Logro desbloqueado",
      mensaje: "¡Felicidades! Has desbloqueado el logro 'Primer Código'",
      tiempo: "Ayer",
      leido: true,
      tipo: "success"
    }
  ];

  // Cerrar notificaciones al hacer clic fuera
  useEffect(() => {
    const manejarClicExterior = (evento) => {
      if (notificacionesRef.current && !notificacionesRef.current.contains(evento.target)) {
        setNotificacionesAbiertas(false);
      }
    };

    document.addEventListener('mousedown', manejarClicExterior);
    return () => {
      document.removeEventListener('mousedown', manejarClicExterior);
    };
  }, []);

  const alternarNotificaciones = () => {
    setNotificacionesAbiertas(!notificacionesAbiertas);
  };

  const marcarTodosComoLeidos = () => {
    console.log("Marcando todas las notificaciones como leídas");
  };

  const renderizarContenidoNotificaciones = () => (
    <div className="contenido-notificaciones">
      <div className="encabezado-notificaciones">
        <h4>🔔 Notificaciones</h4>
        <span className="contador-notificaciones">{datosNotificaciones.filter(n => !n.leido).length} sin leer</span>
      </div>
      <div className="lista-notificaciones">
        {datosNotificaciones.map(notificacion => (
          <div key={notificacion.id} className={`elemento-notificacion ${notificacion.leido ? 'leido' : 'no-leido'}`}>
            <div className="icono-notificacion">
              {notificacion.tipo === 'info' && '💡'}
              {notificacion.tipo === 'warning' && '⚠️'}
              {notificacion.tipo === 'success' && '🎉'}
            </div>
            <div className="contenido-notificacion">
              <div className="titulo-notificacion">{notificacion.titulo}</div>
              <div className="mensaje-notificacion">{notificacion.mensaje}</div>
              <div className="tiempo-notificacion">{notificacion.tiempo}</div>
            </div>
            {!notificacion.leido && <div className="punto-notificacion"></div>}
          </div>
        ))}
      </div>
      <div className="pie-notificaciones">
        <button className="boton-marcar-todos-leidos" onClick={marcarTodosComoLeidos}>
          Marcar todas como leídas
        </button>
      </div>
    </div>
  );

  return (
    <div className="contenedor-notificaciones" ref={notificacionesRef}>
      <button 
        className={`icono-encabezado ${notificacionesAbiertas ? 'activo' : ''}`}
        onClick={alternarNotificaciones}
        title="Notificaciones"
      >
        <span className="icono">{notificacionesAbiertas ? '❌' : '🔔'}</span>
        <span className="insignia-notificacion">3</span>
      </button>
      
      {notificacionesAbiertas && (
        <div className="panel-desplegable panel-notificaciones">
          {renderizarContenidoNotificaciones()}
        </div>
      )}
    </div>
  );
};

export default Notifications;