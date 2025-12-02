import React, { useState, useRef, useEffect } from 'react';
import './Messenger.css';

const Messenger = ({
  messengerAbierto,
  cerrarMessenger
}) => {
  // Estados para manejar el chat activo y mensajes
  const [chatActivo, setChatActivo] = useState(null);
  const [mensajes, setMensajes] = useState({});
  const [nuevoMensaje, setNuevoMensaje] = useState('');

  // Datos de chat para el messenger - ahora manejados localmente
  const datosChat = {
    1: {
      id: 1,
      remitente: "Instructor Carlos",
      avatar: "👨‍🏫",
      enLinea: true,
      mensajes: [
        {
          id: 1,
          texto: "¡Hola! ¿Cómo vas con el curso?",
          tiempo: "10:30 AM",
          remitente: "ellos"
        },
        {
          id: 2,
          texto: "Estoy bien, gracias. Tengo una duda sobre las estructuras de control",
          tiempo: "10:32 AM",
          remitente: "yo"
        },
        {
          id: 3,
          texto: "Perfecto, ¿en qué específicamente necesitas ayuda?",
          tiempo: "10:33 AM",
          remitente: "ellos"
        }
      ]
    },
    2: {
      id: 2,
      remitente: "Soporte Técnico",
      avatar: "🔧",
      enLinea: false,
      mensajes: [
        {
          id: 1,
          texto: "Hemos resuelto el problema que reportaste con el terminal",
          tiempo: "09:15 AM",
          remitente: "ellos"
        },
        {
          id: 2,
          texto: "¡Gracias! ¿Puedo reiniciar la sesión?",
          tiempo: "09:20 AM",
          remitente: "yo"
        },
        {
          id: 3,
          texto: "Sí, reinicia y debería funcionar correctamente",
          tiempo: "09:22 AM",
          remitente: "ellos"
        }
      ]
    },
    3: {
      id: 3,
      remitente: "Comunidad JS",
      avatar: "👥",
      enLinea: true,
      mensajes: [
        {
          id: 1,
          texto: "Nueva discusión sobre closures en JavaScript",
          tiempo: "Ayer",
          remitente: "ellos"
        },
        {
          id: 2,
          texto: "¿Alguien tiene ejemplos prácticos?",
          tiempo: "Ayer",
          remitente: "yo"
        }
      ]
    }
  };

  // Inicializar mensajes al montar el componente
  useEffect(() => {
    setMensajes(datosChat);
  }, []);

  // Ref para el contenedor de mensajes (auto-scroll)
  const mensajesRef = useRef(null);

  // Función para enviar mensaje
  const enviarMensaje = (e) => {
    e.preventDefault();
    if (!nuevoMensaje.trim() || !chatActivo) return;

    const nuevoMensajeObj = {
      id: Date.now(),
      texto: nuevoMensaje,
      tiempo: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      remitente: 'yo'
    };

    // Actualizar mensajes en el estado
    setMensajes(prev => ({
      ...prev,
      [chatActivo]: {
        ...prev[chatActivo],
        mensajes: [...prev[chatActivo].mensajes, nuevoMensajeObj]
      }
    }));

    // Simular respuesta automática después de 1-3 segundos
    setTimeout(() => {
      const respuestas = [
        "¡Gracias por tu mensaje! ¿En qué más puedo ayudarte?",
        "He recibido tu mensaje. ¿Necesitas ayuda con algún tema específico?",
        "Interesante pregunta. Déjame revisar eso y te respondo.",
        "¿Te gustaría que profundicemos más en este tema?"
      ];
      
      const respuestaAleatoria = respuestas[Math.floor(Math.random() * respuestas.length)];
      
      const respuestaObj = {
        id: Date.now() + 1,
        texto: respuestaAleatoria,
        tiempo: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        remitente: 'ellos'
      };

      setMensajes(prev => ({
        ...prev,
        [chatActivo]: {
          ...prev[chatActivo],
          mensajes: [...prev[chatActivo].mensajes, respuestaObj]
        }
      }));
    }, 1000 + Math.random() * 2000);

    setNuevoMensaje('');
  };

  // Auto-scroll al fondo cuando se agregan mensajes
  useEffect(() => {
    if (mensajesRef.current) {
      mensajesRef.current.scrollTop = mensajesRef.current.scrollHeight;
    }
  }, [mensajes, chatActivo]);

  if (!messengerAbierto) return null;

  const chatActual = chatActivo ? mensajes[chatActivo] : null;

  return (
    <div className="sidebar-messenger">
      <div className="encabezado-messenger">
        <button className="boton-volver" onClick={cerrarMessenger}>
          ←
        </button>
        <h3>💬 Mensajes</h3>
        <button className="cerrar-messenger" onClick={cerrarMessenger}>
          ❌
        </button>
      </div>

      {!chatActivo ? (
        <div className="lista-chats">
          {Object.values(mensajes).map(chat => (
            <div 
              key={chat.id} 
              className={`elemento-chat ${chatActivo === chat.id ? 'activo' : ''}`}
              onClick={() => setChatActivo(chat.id)}
            >
              <div className="avatar-chat">
                {chat.avatar}
                {chat.enLinea && <div className="indicador-en-linea"></div>}
              </div>
              <div className="info-chat">
                <div className="nombre-chat">{chat.remitente}</div>
                <div className="ultimo-mensaje-chat">
                  {chat.mensajes[chat.mensajes.length - 1]?.texto}
                </div>
              </div>
              <div className="tiempo-chat">
                {chat.mensajes[chat.mensajes.length - 1]?.tiempo}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="contenedor-chat">
          <div className="encabezado-chat">
            <button className="volver-a-chats" onClick={() => setChatActivo(null)}>
              ←
            </button>
            <div className="usuario-chat">
              <div className="avatar-usuario-chat">
                {chatActual.avatar}
                {chatActual.enLinea && <div className="indicador-en-linea"></div>}
              </div>
              <div className="info-usuario-chat">
                <div className="nombre-usuario-chat">{chatActual.remitente}</div>
                <div className="estado-usuario-chat">
                  {chatActual.enLinea ? 'En línea' : 'Desconectado'}
                </div>
              </div>
            </div>
          </div>
          <div className="mensajes-chat" ref={mensajesRef}>
            {chatActual.mensajes.map(mensaje => (
              <div key={mensaje.id} className={`mensaje ${mensaje.remitente === 'yo' ? 'enviado' : 'recibido'}`}>
                <div className="burbuja-mensaje">
                  {mensaje.texto}
                </div>
                <div className="tiempo-mensaje">{mensaje.tiempo}</div>
              </div>
            ))}
          </div>
          <form className="contenedor-entrada-chat" onSubmit={enviarMensaje}>
            <input 
              type="text" 
              placeholder="Escribe un mensaje..." 
              className="entrada-chat"
              value={nuevoMensaje}
              onChange={(e) => setNuevoMensaje(e.target.value)}
            />
            <button type="submit" className="boton-enviar">➤</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Messenger;