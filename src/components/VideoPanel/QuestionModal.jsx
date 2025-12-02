import React from 'react';
import './QuestionModal.css';

const QuestionModal = ({ 
  pregunta, 
  opciones, 
  respuestaCorrecta, 
  explicacion,
  onAnswer, 
  onClose 
}) => {
  const [respuestaSeleccionada, setRespuestaSeleccionada] = React.useState(null);
  const [mostrarResultado, setMostrarResultado] = React.useState(false);

  const manejarSeleccion = (index) => {
    if (!mostrarResultado) {
      setRespuestaSeleccionada(index);
    }
  };

  const manejarEnviar = () => {
    if (respuestaSeleccionada !== null) {
      setMostrarResultado(true);
      onAnswer(respuestaSeleccionada === respuestaCorrecta);
    }
  };

  const manejarContinuar = () => {
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="question-modal">
        <div className="modal-header">
          <h3>📝 Pregunta Interactiva</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-content">
          <div className="pregunta-texto">
            <p>{pregunta}</p>
          </div>
          
          <div className="opciones-container">
            {opciones.map((opcion, index) => (
              <button
                key={index}
                className={`opcion-btn ${
                  respuestaSeleccionada === index ? 'seleccionada' : ''
                } ${
                  mostrarResultado
                    ? index === respuestaCorrecta
                      ? 'correcta'
                      : index === respuestaSeleccionada
                      ? 'incorrecta'
                      : ''
                    : ''
                }`}
                onClick={() => manejarSeleccion(index)}
                disabled={mostrarResultado}
              >
                <span className="opcion-indice">{String.fromCharCode(65 + index)}</span>
                <span className="opcion-texto">{opcion}</span>
              </button>
            ))}
          </div>

          {mostrarResultado && (
            <div className={`resultado ${respuestaSeleccionada === respuestaCorrecta ? 'correcto' : 'incorrecto'}`}>
              <div className="resultado-icono">
                {respuestaSeleccionada === respuestaCorrecta ? '✅' : '❌'}
              </div>
              <div className="resultado-texto">
                <p>
                  {respuestaSeleccionada === respuestaCorrecta
                    ? '¡Correcto!'
                    : 'Respuesta incorrecta'}
                </p>
                <p className="explicacion">{explicacion}</p>
              </div>
            </div>
          )}
        </div>

        <div className="modal-actions">
          {!mostrarResultado ? (
            <button
              className="btn-enviar"
              onClick={manejarEnviar}
              disabled={respuestaSeleccionada === null}
            >
              Enviar Respuesta
            </button>
          ) : (
            <button className="btn-continuar" onClick={manejarContinuar}>
              Continuar Video
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;