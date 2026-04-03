import React, { useState, useEffect, useCallback } from 'react';
import { 
  Timer, 
  ClipboardList, 
  CheckCircle, 
  XCircle, 
  Send, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight,
  Award,
  HelpCircle,
  CheckCircle2,
  XCircle as XIcon
} from 'lucide-react';
import './Evaluacion.css';

const Evaluacion_1 = () => {
  const [respuestas, setRespuestas] = useState({});
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [puntaje, setPuntaje] = useState(0);
  const [tiempoInicio, setTiempoInicio] = useState(Date.now());
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState(0);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [modoRevision, setModoRevision] = useState(false);

  const TEMA_ID = 1;

  useEffect(() => {
    const intervalo = setInterval(() => {
      if (!mostrarResultados) {
        setTiempoTranscurrido(Date.now() - tiempoInicio);
      }
    }, 1000);
    return () => clearInterval(intervalo);
  }, [tiempoInicio, mostrarResultados]);

  const formatearTiempo = (ms) => {
    const minutos = Math.floor(ms / 60000);
    const segundos = Math.floor((ms % 60000) / 1000);
    return `${minutos}:${segundos.toString().padStart(2, '0')}`;
  };

  const obtenerTipoTexto = (tipo) => {
    const tipos = {
      'opcion-multiple': 'Opción múltiple',
      'verdadero-falso': 'Verdadero/Falso',
      'output-codigo': 'Output',
      'texto-corto': 'Texto corto'
    };
    return tipos[tipo] || tipo;
  };

  const preguntas = [
    {
      id: 1,
      tipo: 'opcion-multiple',
      pregunta: '¿Cuál de los siguientes NO es uno de los tres pilares fundamentales del desarrollo web?',
      opciones: ['HTML', 'CSS', 'Python', 'JavaScript'],
      respuestaCorrecta: 2,
      explicacion: 'Los tres pilares son HTML (estructura), CSS (estilo) y JavaScript (interactividad).',
      dificultad: 'facil'
    },
    {
      id: 2,
      tipo: 'verdadero-falso',
      pregunta: 'JavaScript es el único lenguaje que funciona en todos los navegadores web sin necesidad de plugins.',
      opciones: ['Verdadero', 'Falso'],
      respuestaCorrecta: 0,
      explicacion: 'JavaScript es el lenguaje nativo de los navegadores y funciona en todos ellos.',
      dificultad: 'facil'
    },
    {
      id: 3,
      tipo: 'output-codigo',
      pregunta: '¿Qué mostrará en consola el siguiente código?',
      codigo: `console.log("¡Hola, Mundo!");
alert("Bienvenido a JavaScript");`,
      opciones: [
        'Solo "¡Hola, Mundo!" en consola',
        'Solo el alert',
        'Ambos: mensaje en consola y alert',
        'Ninguno, hay error'
      ],
      respuestaCorrecta: 2,
      explicacion: 'console.log() muestra en consola, alert() muestra un cuadro de diálogo.',
      dificultad: 'facil'
    },
    {
      id: 4,
      tipo: 'texto-corto',
      pregunta: '¿Qué método se usa para mostrar mensajes en la consola del navegador?',
      respuestaCorrecta: 'console.log',
      explicacion: 'console.log() es el método estándar para mostrar mensajes en consola.',
      dificultad: 'facil'
    },
    {
      id: 5,
      tipo: 'verdadero-falso',
      pregunta: 'En JavaScript, los comentarios de una sola línea se escriben con /* */',
      opciones: ['Verdadero', 'Falso'],
      respuestaCorrecta: 1,
      explicacion: 'Los comentarios de una línea se escriben con //. /* */ es para múltiples líneas.',
      dificultad: 'facil'
    },
    {
      id: 6,
      tipo: 'opcion-multiple',
      pregunta: '¿Qué método se usa para agregar un evento de clic a un elemento?',
      opciones: ['document.click()', 'addEventListener("click")', 'onClick()', 'element.click()'],
      respuestaCorrecta: 1,
      explicacion: 'addEventListener("click", funcion) es el método estándar para eventos de clic.',
      dificultad: 'medio'
    },
    {
      id: 7,
      tipo: 'output-codigo',
      pregunta: '¿Qué mostrará este código si hay un botón con id "miBoton"?',
      codigo: `document.getElementById("miBoton").addEventListener("click", function() {
    alert("¡Botón clickeado!");
});`,
      opciones: [
        'Un error',
        'Nada, el código no hace nada',
        'Muestra el mensaje al cargar la página',
        'Muestra el mensaje al hacer clic en el botón'
      ],
      respuestaCorrecta: 3,
      explicacion: 'addEventListener ejecuta la función cuando ocurre el evento "click".',
      dificultad: 'medio'
    },
    {
      id: 8,
      tipo: 'texto-corto',
      pregunta: '¿Qué palabra clave se usa para crear una función en JavaScript?',
      respuestaCorrecta: 'function',
      explicacion: 'La palabra clave "function" se usa para declarar funciones.',
      dificultad: 'facil'
    },
    {
      id: 9,
      tipo: 'opcion-multiple',
      pregunta: '¿Cuál es la forma correcta de cambiar el texto de un elemento con id "titulo"?',
      opciones: [
        'document.getElementById("titulo").innerHTML = "Nuevo título"',
        'document.getElementById("titulo").textContent = "Nuevo título"',
        'Ambas son correctas',
        'Ninguna es correcta'
      ],
      respuestaCorrecta: 2,
      explicacion: 'Tanto innerHTML como textContent pueden usarse para cambiar el texto.',
      dificultad: 'medio'
    },
    {
      id: 10,
      tipo: 'verdadero-falso',
      pregunta: 'El método setInterval() ejecuta una función una sola vez después de un tiempo determinado.',
      opciones: ['Verdadero', 'Falso'],
      respuestaCorrecta: 1,
      explicacion: 'setInterval() ejecuta repetidamente. setTimeout() ejecuta una sola vez.',
      dificultad: 'dificil'
    }
  ];

  const manejarRespuesta = useCallback((preguntaId, respuesta) => {
    setRespuestas(prev => ({ ...prev, [preguntaId]: respuesta }));
  }, []);

  const calcularPuntajeIndividual = useCallback((pregunta) => {
    const respuestaUsuario = respuestas[pregunta.id];
    if (respuestaUsuario === undefined || respuestaUsuario === null) return false;
    switch (pregunta.tipo) {
      case 'opcion-multiple':
      case 'verdadero-falso':
      case 'output-codigo':
        return respuestaUsuario === pregunta.respuestaCorrecta;
      case 'texto-corto':
        return respuestaUsuario.toLowerCase().trim() === pregunta.respuestaCorrecta.toLowerCase();
      default: return false;
    }
  }, [respuestas]);

  const calcularAciertos = useCallback(() => {
    let aciertos = 0;
    preguntas.forEach(pregunta => {
      if (calcularPuntajeIndividual(pregunta)) aciertos++;
    });
    return aciertos;
  }, [preguntas, calcularPuntajeIndividual]);

  const enviarEvaluacion = useCallback(() => {
    const preguntasSinResponder = preguntas.filter(p => respuestas[p.id] === undefined).length;
    if (preguntasSinResponder > 0) {
      const confirmar = window.confirm(`⚠️ Tienes ${preguntasSinResponder} pregunta(s) sin responder. ¿Enviar de todas formas?`);
      if (!confirmar) return;
    }
    
    const aciertos = calcularAciertos();
    const puntajeFinal = aciertos * 10;
    setPuntaje(puntajeFinal);
    setMostrarResultados(true);

    // Obtener progreso actual
    const progresoGuardado = JSON.parse(localStorage.getItem('cursoJSProgreso') || '{}');
    const estabaCompletado = progresoGuardado[TEMA_ID] === 'completado';

    // Despachar evento de recompensa
    window.dispatchEvent(new CustomEvent('recompensa-usuario', {
      detail: {
        tipo: 'evaluacion',
        aciertos: aciertos,
        temaId: TEMA_ID,
        esNuevaCompletitud: !estabaCompletado
      }
    }));

    // Despachar evento de avance (progresión)
    window.dispatchEvent(new CustomEvent('evaluacion-completada', {
      detail: { temaId: TEMA_ID }
    }));
  }, [calcularAciertos, respuestas, preguntas]);

  const reiniciarEvaluacion = useCallback(() => {
    setRespuestas({});
    setMostrarResultados(false);
    setPuntaje(0);
    setTiempoInicio(Date.now());
    setTiempoTranscurrido(0);
    setPreguntaActual(0);
  }, []);

  const siguientePregunta = () => {
    if (preguntaActual < preguntas.length - 1) setPreguntaActual(prev => prev + 1);
  };

  const preguntaAnterior = () => {
    if (preguntaActual > 0) setPreguntaActual(prev => prev - 1);
  };

  const renderizarPregunta = useCallback((pregunta, modoRevisionManual = false) => {
    const respuestaUsuario = respuestas[pregunta.id];
    const esCorrecta = mostrarResultados && calcularPuntajeIndividual(pregunta);

    switch (pregunta.tipo) {
      case 'opcion-multiple':
      case 'output-codigo':
      case 'verdadero-falso':
        return (
          <div className={`pregunta-contenedor ${mostrarResultados ? (esCorrecta ? 'correcta' : 'incorrecta') : ''}`}>
            <div className="pregunta-header">
              <div className="pregunta-info">
                <span className="pregunta-numero">#{pregunta.id}</span>
                <span className="tipo-pregunta">{obtenerTipoTexto(pregunta.tipo)}</span>
                <span className={`dificultad ${pregunta.dificultad}`}>{pregunta.dificultad}</span>
              </div>
            </div>
            <h3>{pregunta.pregunta}</h3>
            {pregunta.codigo && <pre className="codigo-pregunta"><code>{pregunta.codigo}</code></pre>}
            <div className="opciones-lista">
              {pregunta.opciones.map((opcion, index) => (
                <label key={index} className={`opcion-item ${respuestaUsuario === index ? 'seleccionada' : ''} ${modoRevisionManual && index === pregunta.respuestaCorrecta ? 'respuesta-correcta' : ''}`}>
                  <input type="radio" name={`pregunta-${pregunta.id}`} value={index} checked={respuestaUsuario === index} onChange={(e) => manejarRespuesta(pregunta.id, parseInt(e.target.value))} disabled={mostrarResultados || modoRevisionManual} />
                  <span className="opcion-texto">{opcion}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 'texto-corto':
        return (
          <div className={`pregunta-contenedor ${mostrarResultados ? (esCorrecta ? 'correcta' : 'incorrecta') : ''}`}>
            <div className="pregunta-header">
              <div className="pregunta-info">
                <span className="pregunta-numero">#{pregunta.id}</span>
                <span className="tipo-pregunta">{obtenerTipoTexto(pregunta.tipo)}</span>
                <span className={`dificultad ${pregunta.dificultad}`}>{pregunta.dificultad}</span>
              </div>
            </div>
            <h3>{pregunta.pregunta}</h3>
            <input type="text" placeholder="Escribe tu respuesta..." value={modoRevisionManual ? pregunta.respuestaCorrecta : (respuestaUsuario || '')} onChange={(e) => manejarRespuesta(pregunta.id, e.target.value)} disabled={mostrarResultados || modoRevisionManual} className="entrada-texto-corto" />
          </div>
        );
      default: return null;
    }
  }, [mostrarResultados, respuestas, manejarRespuesta, calcularPuntajeIndividual]);

  const estadisticas = {
    total: preguntas.length,
    respondidas: Object.keys(respuestas).length,
    porcentajeCompletado: Math.round((Object.keys(respuestas).length / preguntas.length) * 100)
  };

  if (mostrarResultados) {
    return (
      <div className="evaluacion-contenido resultados-modo">
        <div className="pantalla-resultados">
          <div className="encabezado-resultados">
            <h1><Award size={32} /> Resultados de la Evaluación</h1>
            <div className="info-resultados">
              <div className="tarjeta-resultado tiempo"><span><Timer size={18} /> {formatearTiempo(tiempoTranscurrido)}</span></div>
              <div className="tarjeta-resultado preguntas-respondidas"><span><ClipboardList size={18} /> {estadisticas.respondidas}/{estadisticas.total}</span></div>
            </div>
          </div>
          <div className="puntaje-final">
            <div className="circulo-puntaje"><div className="puntaje-numero">{puntaje}</div><div className="puntaje-maximo">/ 100</div></div>
            <div className="puntaje-porcentaje">{Math.round((puntaje / 100) * 100)}%</div>
            {puntaje >= 70 ? <div className="mensaje-exito">¡Excelente trabajo! 🎉</div> : puntaje >= 50 ? <div className="mensaje-regular">Buen intento, sigue practicando 👍</div> : <div className="mensaje-bajo">Revisa el material y vuelve a intentarlo 💪</div>}
          </div>
          <div className="resumen-preguntas">
            <h3><ClipboardList size={22} /> Revisión de Respuestas</h3>
            <div className="preguntas-lista-revision">
              {preguntas.map((pregunta) => {
                const esCorrecta = calcularPuntajeIndividual(pregunta);
                return (
                  <div key={pregunta.id} className="pregunta-revision">
                    {renderizarPregunta(pregunta, true)}
                    <div className="explicacion-pregunta">
                      <div className={`estado-pregunta ${esCorrecta ? 'correcta' : 'incorrecta'}`}>
                        {esCorrecta ? <CheckCircle2 size={16} /> : <XIcon size={16} />}
                        {esCorrecta ? 'Correcta' : 'Incorrecta'} - {pregunta.dificultad}
                      </div>
                      <p><strong>Explicación:</strong> {pregunta.explicacion}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="acciones-resultados"><button className="btn-reiniciar" onClick={reiniciarEvaluacion}><RotateCcw size={18} /> Intentar Nuevamente</button></div>
        </div>
      </div>
    );
  }

  return (
    <div className="evaluacion-contenido">
      <header className="evaluacion-header">
        <div className="encabezado-principal">
          <h1><ClipboardList size={24} /> Evaluación: Introducción a JavaScript</h1>
          <div className="tiempo-transcurrido"><Timer size={18} /> {formatearTiempo(tiempoTranscurrido)}</div>
        </div>
        <div className="barra-progreso">
          <div className="progreso-texto"><span>Progreso: {estadisticas.respondidas} de {estadisticas.total}</span><span>{estadisticas.porcentajeCompletado}%</span></div>
          <div className="barra"><div className="progreso-relleno" style={{ width: `${estadisticas.porcentajeCompletado}%` }}></div></div>
        </div>
        <div className="indicadores-preguntas">
          {preguntas.map((pregunta, index) => (
            <button key={pregunta.id} className={`indicador-pregunta ${respuestas[pregunta.id] !== undefined ? 'respondida' : ''} ${index === preguntaActual ? 'activo' : ''}`} onClick={() => setPreguntaActual(index)}>{pregunta.id}</button>
          ))}
        </div>
      </header>
      <div className="preguntas-lista">
        {preguntas.map((pregunta, index) => (
          <div key={pregunta.id} className={`pregunta-item ${index === preguntaActual ? 'activa' : 'oculta'}`}>{renderizarPregunta(pregunta)}</div>
        ))}
      </div>
      <div className="evaluacion-acciones">
        <div className="navegacion-preguntas">
          <button className="btn-nav" onClick={preguntaAnterior} disabled={preguntaActual === 0}><ChevronLeft size={18} /> Anterior</button>
          <div className="info-pregunta">{preguntaActual + 1} / {preguntas.length}</div>
          <button className="btn-nav" onClick={siguientePregunta} disabled={preguntaActual === preguntas.length - 1}>Siguiente <ChevronRight size={18} /></button>
        </div>
        <button className="btn-enviar" onClick={enviarEvaluacion} disabled={estadisticas.respondidas === 0}><Send size={18} /> Enviar Evaluación</button>
      </div>
    </div>
  );
};

export default Evaluacion_1;
