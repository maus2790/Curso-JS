import React, { useState, useEffect, useCallback } from 'react';
import './Cuestionarios.css';

const Evaluacion_2 = () => {
  const [respuestas, setRespuestas] = useState({});
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [puntaje, setPuntaje] = useState(0);
  const [tiempoInicio, setTiempoInicio] = useState(Date.now());
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState(0);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [modoRevision, setModoRevision] = useState(false);
  const [modoPractica, setModoPractica] = useState(false);

  // Actualizar tiempo transcurrido
  useEffect(() => {
    const intervalo = setInterval(() => {
      if (!mostrarResultados && !modoPractica) {
        setTiempoTranscurrido(Date.now() - tiempoInicio);
      }
    }, 1000);

    return () => clearInterval(intervalo);
  }, [tiempoInicio, mostrarResultados, modoPractica]);

  const formatearTiempo = (ms) => {
    const minutos = Math.floor(ms / 60000);
    const segundos = Math.floor((ms % 60000) / 1000);
    return `${minutos}:${segundos.toString().padStart(2, '0')}`;
  };

  const obtenerTipoTexto = (tipo) => {
    const tipos = {
      'opcion-multiple': 'Opción múltiple',
      'seleccion-multiple': 'Selección múltiple',
      'pregunta-codigo': 'Código',
      'output-codigo': 'Output',
      'completar-codigo': 'Completar código',
      'texto-corto': 'Texto corto',
      'verdadero-falso': 'Verdadero/Falso',
      'relacionar-columnas': 'Relacionar',
      'rellenar-espacios': 'Rellenar espacios',
      'entrada-numerica': 'Número'
    };
    return tipos[tipo] || tipo;
  };

  const preguntas = [
    {
      id: 1,
      tipo: 'opcion-multiple',
      pregunta: '¿Cuál de las siguientes formas es la correcta para declarar una constante en JavaScript?',
      opciones: [
        'var PI = 3.1416;',
        'let PI = 3.1416;',
        'const PI = 3.1416;',
        'constant PI = 3.1416;'
      ],
      respuestaCorrecta: 2,
      explicacion: 'La palabra clave "const" se usa para declarar constantes en JavaScript.',
      dificultad: 'facil'
    },
    {
      id: 2,
      tipo: 'seleccion-multiple',
      pregunta: '¿Cuáles de los siguientes son tipos de datos primitivos en JavaScript?',
      opciones: [
        'String',
        'Array',
        'Boolean',
        'Object',
        'Number',
        'Null'
      ],
      respuestasCorrectas: [0, 2, 4, 5],
      explicacion: 'Los tipos primitivos en JavaScript son: String, Number, Boolean, Null, Undefined, Symbol y BigInt.',
      dificultad: 'medio'
    },
    {
      id: 3,
      tipo: 'pregunta-codigo',
      pregunta: 'Completa el código para declarar una variable que almacene el nombre de un usuario:',
      codigo: `let ___ = "Ana";\nconsole.log(___);`,
      respuestaCorrecta: ['nombre', 'nombre'],
      explicacion: 'Se debe usar un nombre descriptivo como "nombre" para la variable.',
      dificultad: 'facil'
    },
    {
      id: 4,
      tipo: 'output-codigo',
      pregunta: '¿Qué mostrará en consola el siguiente código?',
      codigo: `let a = 5;\nlet b = "5";\nconsole.log(a === b);\nconsole.log(a == b);`,
      opciones: [
        'true, true',
        'false, true',
        'true, false',
        'false, false'
      ],
      respuestaCorrecta: 1,
      explicacion: '=== es comparación estricta (diferentes tipos), == es comparación débil (conversión automática).',
      dificultad: 'medio'
    },
    {
      id: 5,
      tipo: 'completar-codigo',
      pregunta: 'Completa el código para crear un array de frutas:',
      codigo: `let frutas = ["__", "__", "__"];\nfrutas.__("manzana");`,
      espacios: 4,
      respuestasCorrectas: ['banana', 'naranja', 'uva', 'push'],
      explicacion: 'Los arrays se crean con [] y push() agrega elementos al final.',
      dificultad: 'medio'
    },
    {
      id: 6,
      tipo: 'texto-corto',
      pregunta: '¿Qué palabra clave se usa para declarar una variable que puede ser reasignada?',
      respuestaCorrecta: 'let',
      explicacion: 'La palabra clave "let" permite reasignar valores a la variable.',
      dificultad: 'facil'
    },
    {
      id: 7,
      tipo: 'verdadero-falso',
      pregunta: 'En JavaScript, "null" y "undefined" representan exactamente lo mismo.',
      opciones: ['Verdadero', 'Falso'],
      respuestaCorrecta: 1,
      explicacion: 'null es un valor asignado intencionalmente, mientras que undefined significa que no se ha asignado ningún valor.',
      dificultad: 'medio'
    },
    {
      id: 8,
      tipo: 'relacionar-columnas',
      pregunta: 'Relaciona cada tipo de dato con su descripción correspondiente:',
      columnas: {
        izquierda: ['String', 'Number', 'Boolean', 'Array'],
        derecha: [
          'Representa valores verdadero/falso',
          'Almacena una colección de elementos',
          'Representa datos numéricos',
          'Representa datos de texto'
        ]
      },
      relacionesCorrectas: {
        0: 3, // String -> Representa datos de texto
        1: 2, // Number -> Representa datos numéricos
        2: 0, // Boolean -> Representa valores verdadero/falso
        3: 1  // Array -> Almacena una colección de elementos
      },
      explicacion: 'Cada tipo de dato tiene un propósito específico en JavaScript.',
      dificultad: 'medio'
    },
    {
      id: 9,
      tipo: 'rellenar-espacios',
      pregunta: 'Completa las siguientes declaraciones:',
      texto: `Para declarar una constante usamos la palabra clave ___. \nLos valores ___ y ___ representan la ausencia de valor. \nEl operador ___ se usa para concatenar strings.`,
      respuestasCorrectas: ['const', 'null', 'undefined', '+'],
      explicacion: 'const para constantes, null y undefined para ausencia de valor, + para concatenar strings.',
      dificultad: 'facil'
    },
    {
      id: 10,
      tipo: 'entrada-numerica',
      pregunta: '¿Cuál es la longitud del siguiente string: "JavaScript"?',
      respuestaCorrecta: 10,
      tolerancia: 0,
      explicacion: 'El string "JavaScript" tiene 10 caracteres: J-a-v-a-S-c-r-i-p-t',
      dificultad: 'facil'
    }
  ];

  const manejarRespuesta = useCallback((preguntaId, respuesta) => {
    setRespuestas(prev => ({
      ...prev,
      [preguntaId]: respuesta
    }));
  }, []);

  const calcularPuntaje = useCallback(() => {
    let puntajeTotal = 0;
    
    preguntas.forEach(pregunta => {
      const respuestaUsuario = respuestas[pregunta.id];
      
      if (!respuestaUsuario) return;

      switch (pregunta.tipo) {
        case 'opcion-multiple':
        case 'verdadero-falso':
          if (respuestaUsuario === pregunta.respuestaCorrecta) {
            puntajeTotal += 10;
          }
          break;

        case 'seleccion-multiple':
          const seleccionCorrecta = JSON.stringify(pregunta.respuestasCorrectas.sort());
          const seleccionUsuario = JSON.stringify(respuestaUsuario.sort());
          if (seleccionCorrecta === seleccionUsuario) {
            puntajeTotal += 10;
          }
          break;

        case 'pregunta-codigo':
          if (JSON.stringify(respuestaUsuario) === JSON.stringify(pregunta.respuestaCorrecta)) {
            puntajeTotal += 10;
          }
          break;

        case 'output-codigo':
          if (respuestaUsuario === pregunta.respuestaCorrecta) {
            puntajeTotal += 10;
          }
          break;

        case 'completar-codigo':
          const todasCorrectas = pregunta.respuestasCorrectas.every((correcta, index) => {
            const respuesta = respuestaUsuario[index];
            return correcta.toLowerCase().includes(respuesta.toLowerCase()) || 
                   respuesta.toLowerCase().includes(correcta.toLowerCase());
          });
          if (todasCorrectas) {
            puntajeTotal += 10;
          }
          break;

        case 'texto-corto':
          if (respuestaUsuario.toLowerCase().trim() === pregunta.respuestaCorrecta.toLowerCase()) {
            puntajeTotal += 10;
          }
          break;

        case 'relacionar-columnas':
          const relacionesCorrectas = Object.entries(pregunta.relacionesCorrectas)
            .every(([izquierda, derecha]) => respuestaUsuario[izquierda] === derecha);
          if (relacionesCorrectas) {
            puntajeTotal += 10;
          }
          break;

        case 'rellenar-espacios':
          const espaciosCorrectos = pregunta.respuestasCorrectas.every((correcta, index) => {
            const respuesta = respuestaUsuario[index];
            return respuesta && respuesta.toLowerCase().includes(correcta.toLowerCase());
          });
          if (espaciosCorrectos) {
            puntajeTotal += 10;
          }
          break;

        case 'entrada-numerica':
          if (parseInt(respuestaUsuario) === pregunta.respuestaCorrecta) {
            puntajeTotal += 10;
          }
          break;
      }
    });

    return puntajeTotal;
  }, [respuestas, preguntas]);

  const enviarEvaluacion = useCallback(() => {
    const puntajeFinal = calcularPuntaje();
    setPuntaje(puntajeFinal);
    setMostrarResultados(true);
    setModoPractica(false);
  }, [calcularPuntaje]);

  const reiniciarEvaluacion = useCallback(() => {
    setRespuestas({});
    setMostrarResultados(false);
    setPuntaje(0);
    setTiempoInicio(Date.now());
    setTiempoTranscurrido(0);
    setPreguntaActual(0);
    setModoRevision(false);
    setModoPractica(false);
  }, []);

  const iniciarModoPractica = () => {
    setModoPractica(true);
    setRespuestas({});
    setMostrarResultados(false);
    setPuntaje(0);
    setTiempoInicio(Date.now());
    setTiempoTranscurrido(0);
    setPreguntaActual(0);
    setModoRevision(false);
  };

  const salirModoPractica = () => {
    if (window.confirm('¿Estás seguro de que quieres salir del modo práctica? Se perderá tu progreso actual.')) {
      setModoPractica(false);
      setRespuestas({});
      setMostrarResultados(false);
      setPuntaje(0);
      setTiempoTranscurrido(0);
      setPreguntaActual(0);
    }
  };

  const siguientePregunta = () => {
    if (preguntaActual < preguntas.length - 1) {
      setPreguntaActual(prev => prev + 1);
    }
  };

  const preguntaAnterior = () => {
    if (preguntaActual > 0) {
      setPreguntaActual(prev => prev - 1);
    }
  };

  const irAPregunta = (index) => {
    setPreguntaActual(index);
  };

  const renderizarPregunta = useCallback((pregunta, modoRespuestas = false) => {
    const respuestaUsuario = respuestas[pregunta.id];
    const esCorrecta = mostrarResultados && calcularPuntajeIndividual(pregunta);

    switch (pregunta.tipo) {
      case 'opcion-multiple':
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
            <div className="opciones-lista">
              {pregunta.opciones.map((opcion, index) => (
                <label key={index} className={`opcion-item ${respuestaUsuario === index ? 'seleccionada' : ''} ${(modoRespuestas || modoPractica) && index === pregunta.respuestaCorrecta ? 'respuesta-correcta' : ''}`}>
                  <input
                    type="radio"
                    name={`pregunta-${pregunta.id}`}
                    value={index}
                    checked={respuestaUsuario === index}
                    onChange={(e) => manejarRespuesta(pregunta.id, parseInt(e.target.value))}
                    disabled={mostrarResultados || modoRespuestas}
                  />
                  <span className="opcion-texto">{opcion}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'seleccion-multiple':
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
            <div className="opciones-lista">
              {pregunta.opciones.map((opcion, index) => (
                <label key={index} className={`opcion-item ${respuestaUsuario?.includes(index) ? 'seleccionada' : ''} ${(modoRespuestas || modoPractica) && pregunta.respuestasCorrectas.includes(index) ? 'respuesta-correcta' : ''}`}>
                  <input
                    type="checkbox"
                    checked={respuestaUsuario?.includes(index) || false}
                    onChange={(e) => {
                      const nuevasSelecciones = respuestaUsuario ? [...respuestaUsuario] : [];
                      if (e.target.checked) {
                        nuevasSelecciones.push(index);
                      } else {
                        const indexToRemove = nuevasSelecciones.indexOf(index);
                        if (indexToRemove > -1) {
                          nuevasSelecciones.splice(indexToRemove, 1);
                        }
                      }
                      manejarRespuesta(pregunta.id, nuevasSelecciones);
                    }}
                    disabled={mostrarResultados || modoRespuestas}
                  />
                  <span className="opcion-texto">{opcion}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'pregunta-codigo':
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
            <pre className="codigo-pregunta"><code>{pregunta.codigo}</code></pre>
            <div className="entradas-codigo">
              {pregunta.respuestaCorrecta.map((_, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Respuesta ${index + 1}`}
                  value={modoRespuestas ? pregunta.respuestaCorrecta[index] : (respuestaUsuario?.[index] || '')}
                  onChange={(e) => {
                    const nuevasRespuestas = respuestaUsuario ? [...respuestaUsuario] : Array(pregunta.respuestaCorrecta.length).fill('');
                    nuevasRespuestas[index] = e.target.value;
                    manejarRespuesta(pregunta.id, nuevasRespuestas);
                  }}
                  disabled={mostrarResultados || modoRespuestas}
                  className="entrada-codigo"
                />
              ))}
            </div>
          </div>
        );

      case 'output-codigo':
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
            <pre className="codigo-pregunta"><code>{pregunta.codigo}</code></pre>
            <div className="opciones-lista">
              {pregunta.opciones.map((opcion, index) => (
                <label key={index} className={`opcion-item ${respuestaUsuario === index ? 'seleccionada' : ''} ${(modoRespuestas || modoPractica) && index === pregunta.respuestaCorrecta ? 'respuesta-correcta' : ''}`}>
                  <input
                    type="radio"
                    name={`output-${pregunta.id}`}
                    value={index}
                    checked={respuestaUsuario === index}
                    onChange={(e) => manejarRespuesta(pregunta.id, parseInt(e.target.value))}
                    disabled={mostrarResultados || modoRespuestas}
                  />
                  <span className="opcion-texto">{opcion}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'completar-codigo':
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
            <div className="codigo-completar">
              {pregunta.codigo.split('__').map((parte, index) => (
                <React.Fragment key={index}>
                  <span>{parte}</span>
                  {index < pregunta.espacios && (
                    <input
                      type="text"
                      placeholder={`Fruta ${index + 1}`}
                      value={modoRespuestas ? pregunta.respuestasCorrectas[index] : (respuestaUsuario?.[index] || '')}
                      onChange={(e) => {
                        const nuevasRespuestas = respuestaUsuario ? [...respuestaUsuario] : Array(pregunta.espacios).fill('');
                        nuevasRespuestas[index] = e.target.value;
                        manejarRespuesta(pregunta.id, nuevasRespuestas);
                      }}
                      disabled={mostrarResultados || modoRespuestas}
                      className="entrada-espacio"
                    />
                  )}
                </React.Fragment>
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
            <input
              type="text"
              placeholder="Escribe tu respuesta..."
              value={modoRespuestas ? pregunta.respuestaCorrecta : (respuestaUsuario || '')}
              onChange={(e) => manejarRespuesta(pregunta.id, e.target.value)}
              disabled={mostrarResultados || modoRespuestas}
              className="entrada-texto-corto"
            />
          </div>
        );

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
            <div className="opciones-lista">
              {pregunta.opciones.map((opcion, index) => (
                <label key={index} className={`opcion-item ${respuestaUsuario === index ? 'seleccionada' : ''} ${(modoRespuestas || modoPractica) && index === pregunta.respuestaCorrecta ? 'respuesta-correcta' : ''}`}>
                  <input
                    type="radio"
                    name={`vf-${pregunta.id}`}
                    value={index}
                    checked={respuestaUsuario === index}
                    onChange={(e) => manejarRespuesta(pregunta.id, parseInt(e.target.value))}
                    disabled={mostrarResultados || modoRespuestas}
                  />
                  <span className="opcion-texto">{opcion}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'relacionar-columnas':
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
            <div className="columnas-relacionar">
              <div className="columna izquierda">
                <h4>Tipo de Dato</h4>
                {pregunta.columnas.izquierda.map((item, index) => (
                  <div key={index} className="fila-relacion">
                    <div className="item-columna izquierda">
                      {item}
                    </div>
                    <span className="flecha">→</span>
                    <select
                      value={modoRespuestas ? pregunta.relacionesCorrectas[index] : (respuestaUsuario?.[index] !== undefined ? respuestaUsuario[index] : '')}
                      onChange={(e) => {
                        const nuevasRelaciones = respuestaUsuario ? { ...respuestaUsuario } : {};
                        nuevasRelaciones[index] = e.target.value ? parseInt(e.target.value) : undefined;
                        manejarRespuesta(pregunta.id, nuevasRelaciones);
                      }}
                      disabled={mostrarResultados || modoRespuestas}
                    >
                      <option value="">Selecciona...</option>
                      {pregunta.columnas.derecha.map((_, rightIndex) => (
                        <option key={rightIndex} value={rightIndex}>
                          {pregunta.columnas.derecha[rightIndex]}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'rellenar-espacios':
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
            <div className="texto-espacios">
              {pregunta.texto.split('___').map((parte, index) => (
                <React.Fragment key={index}>
                  <span>{parte}</span>
                  {index < pregunta.respuestasCorrectas.length && (
                    <input
                      type="text"
                      placeholder={`Palabra ${index + 1}`}
                      value={modoRespuestas ? pregunta.respuestasCorrectas[index] : (respuestaUsuario?.[index] || '')}
                      onChange={(e) => {
                        const nuevasRespuestas = respuestaUsuario ? [...respuestaUsuario] : Array(pregunta.respuestasCorrectas.length).fill('');
                        nuevasRespuestas[index] = e.target.value;
                        manejarRespuesta(pregunta.id, nuevasRespuestas);
                      }}
                      disabled={mostrarResultados || modoRespuestas}
                      className="entrada-espacio"
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        );

      case 'entrada-numerica':
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
            <input
              type="number"
              placeholder="Escribe el número..."
              value={modoRespuestas ? pregunta.respuestaCorrecta : (respuestaUsuario || '')}
              onChange={(e) => manejarRespuesta(pregunta.id, e.target.value)}
              disabled={mostrarResultados || modoRespuestas}
              className="entrada-numerica"
            />
          </div>
        );

      default:
        return null;
    }
  }, [mostrarResultados, respuestas, manejarRespuesta, modoPractica]);

  const calcularPuntajeIndividual = useCallback((pregunta) => {
    const respuestaUsuario = respuestas[pregunta.id];
    if (!respuestaUsuario) return false;

    switch (pregunta.tipo) {
      case 'opcion-multiple':
      case 'verdadero-falso':
        return respuestaUsuario === pregunta.respuestaCorrecta;

      case 'seleccion-multiple':
        return JSON.stringify(pregunta.respuestasCorrectas.sort()) === JSON.stringify(respuestaUsuario.sort());

      case 'pregunta-codigo':
        return JSON.stringify(respuestaUsuario) === JSON.stringify(pregunta.respuestaCorrecta);

      case 'output-codigo':
        return respuestaUsuario === pregunta.respuestaCorrecta;

      case 'completar-codigo':
        return pregunta.respuestasCorrectas.every((correcta, index) => {
          const respuesta = respuestaUsuario[index];
          return correcta.toLowerCase().includes(respuesta.toLowerCase()) || 
                 respuesta.toLowerCase().includes(correcta.toLowerCase());
        });

      case 'texto-corto':
        return respuestaUsuario.toLowerCase().trim() === pregunta.respuestaCorrecta.toLowerCase();

      case 'relacionar-columnas':
        return Object.entries(pregunta.relacionesCorrectas)
          .every(([izquierda, derecha]) => respuestaUsuario[izquierda] === derecha);

      case 'rellenar-espacios':
        return pregunta.respuestasCorrectas.every((correcta, index) => {
          const respuesta = respuestaUsuario[index];
          return respuesta && respuesta.toLowerCase().includes(correcta.toLowerCase());
        });

      case 'entrada-numerica':
        return parseInt(respuestaUsuario) === pregunta.respuestaCorrecta;

      default:
        return false;
    }
  }, [respuestas]);

  const obtenerEstadisticas = () => {
    const total = preguntas.length;
    const respondidas = Object.keys(respuestas).length;
    const correctas = preguntas.filter(p => calcularPuntajeIndividual(p)).length;
    const incorrectas = respondidas - correctas;

    return {
      total,
      respondidas,
      correctas,
      incorrectas,
      sinResponder: total - respondidas,
      porcentajeCompletado: Math.round((respondidas / total) * 100)
    };
  };

  const estadisticas = obtenerEstadisticas();

  if (mostrarResultados) {
    return (
      <div className="evaluacion-contenido resultados-modo">
        <div className="pantalla-resultados">
          <div className="encabezado-resultados">
            <h1>📊 Resultados de la Evaluación</h1>
            <div className="info-resultados">
              <div className="tarjeta-resultado tiempo">
                <span>⏱️ {formatearTiempo(tiempoTranscurrido)}</span>
              </div>
              <div className="tarjeta-resultado preguntas-respondidas">
                <span>📝 {estadisticas.respondidas}/{estadisticas.total}</span>
              </div>
            </div>
          </div>

          <div className="puntaje-final">
            <div className="circulo-puntaje">
              <div className="puntaje-numero">{puntaje}</div>
              <div className="puntaje-maximo">/ 100</div>
            </div>
            <div className="puntaje-porcentaje">{Math.round((puntaje / 100) * 100)}%</div>
            
            {puntaje >= 70 ? (
              <div className="mensaje-exito">¡Excelente trabajo! 🎉</div>
            ) : puntaje >= 50 ? (
              <div className="mensaje-regular">Buen intento, sigue practicando 👍</div>
            ) : (
              <div className="mensaje-bajo">Revisa el material y vuelve a intentarlo 💪</div>
            )}
          </div>

          <div className="resumen-preguntas">
            <h3>📋 Revisión de Respuestas</h3>
            <div className="preguntas-lista-revision">
              {preguntas.map((pregunta) => {
                const esCorrecta = calcularPuntajeIndividual(pregunta);
                return (
                  <div key={pregunta.id} className="pregunta-revision">
                    {renderizarPregunta(pregunta, true)}
                    <div className="explicacion-pregunta">
                      <div className={`estado-pregunta ${esCorrecta ? 'correcta' : 'incorrecta'}`}>
                        {esCorrecta ? '✓ Correcta' : '✗ Incorrecta'} - {pregunta.dificultad}
                      </div>
                      <p><strong>Explicación:</strong> {pregunta.explicacion}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="acciones-resultados">
            <button className="btn-reiniciar" onClick={reiniciarEvaluacion}>
              🔄 Intentar Nuevamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (modoPractica) {
    return (
      <div className="evaluacion-contenido modo-practica-evaluacion">
        <header className="practica-header-evaluacion">
          <div className="practica-titulo-evaluacion">
            <h1>Práctica: Variables y Tipos de Datos</h1>
            <button 
              className="btn-salir-practica-evaluacion"
              onClick={salirModoPractica}
              title="Salir del modo práctica"
            >
              🚪 Salir de Práctica
            </button>
          </div>
          <div className="practica-meta-evaluacion">
            <span className="preguntas-total">{preguntas.length} preguntas</span>
            <span className="dificultad-promedio">Nivel: Mixto</span>
            <span className="puntos-totales">100 puntos</span>
          </div>
        </header>

        <div className="practica-lista-evaluacion">
          {preguntas.map((pregunta, index) => (
            <div key={pregunta.id} className="pregunta-completa-evaluacion">
              <div className="pregunta-info-evaluacion">
                <div className="pregunta-header-evaluacion">
                  <div className="pregunta-titulo-evaluacion">
                    <span className="pregunta-numero-evaluacion">#{pregunta.id}</span>
                    <h3>{pregunta.pregunta}</h3>
                    <span className={`dificultad-evaluacion ${pregunta.dificultad}`}>
                      {pregunta.dificultad}
                    </span>
                  </div>
                  <div className="pregunta-puntos-evaluacion">
                    <span className="puntos-texto">10 puntos</span>
                  </div>
                </div>
                <div className="pregunta-tipo-evaluacion">
                  <span className="tipo-badge">{obtenerTipoTexto(pregunta.tipo)}</span>
                </div>
              </div>

              <div className="pregunta-contenido-evaluacion">
                {renderizarPregunta(pregunta)}
                
                {/* Explicación siempre visible en modo práctica */}
                <div className="explicacion-practica">
                  <div className="explicacion-header">
                    <span className="explicacion-icono">💡</span>
                    <strong>Explicación:</strong>
                  </div>
                  <p>{pregunta.explicacion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="practica-info-general-evaluacion">
          <div className="instrucciones-practica-evaluacion">
            <h3>💡 Instrucciones del Modo Práctica</h3>
            <ul>
              <li>Responde cada pregunta a tu propio ritmo</li>
              <li>Las respuestas correctas se muestran automáticamente</li>
              <li>Lee las explicaciones para entender cada concepto</li>
              <li>Usa este modo para aprender y prepararte para la evaluación</li>
              <li>Puedes salir en cualquier momento y volver a la evaluación</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="evaluacion-contenido">
      <header className="evaluacion-header">
        <div className="encabezado-principal">
          <h1>Evaluación: Variables y Tipos de Datos</h1>
          <div className="tiempo-transcurrido">
            ⏱️ {formatearTiempo(tiempoTranscurrido)}
          </div>
        </div>
        
        <div className="barra-progreso">
          <div className="progreso-texto">
            <span>Progreso: {estadisticas.respondidas} de {estadisticas.total}</span>
            <span>{estadisticas.porcentajeCompletado}%</span>
          </div>
          <div className="barra">
            <div 
              className="progreso-relleno" 
              style={{ width: `${estadisticas.porcentajeCompletado}%` }}
            ></div>
          </div>
        </div>

        <div className="indicadores-preguntas">
          {preguntas.map((pregunta, index) => {
            const respondida = respuestas[pregunta.id] !== undefined;
            return (
              <button
                key={pregunta.id}
                className={`indicador-pregunta ${
                  respondida ? 'respondida' : ''
                } ${
                  index === preguntaActual ? 'activo' : ''
                }`}
                onClick={() => setPreguntaActual(index)}
              >
                {pregunta.id}
              </button>
            );
          })}
        </div>

        <div className="modo-acciones">
          <button className="btn-modo-practica" onClick={iniciarModoPractica}>
            💡 Ir al Modo Práctica
          </button>
        </div>
      </header>

      <div className="preguntas-lista">
        {preguntas.map((pregunta, index) => (
          <div 
            key={pregunta.id} 
            className={`pregunta-item ${
              index === preguntaActual ? 'activa' : 'oculta'
            }`}
          >
            {renderizarPregunta(pregunta)}
          </div>
        ))}
      </div>

      <div className="evaluacion-acciones">
        <div className="navegacion-preguntas">
          <button 
            className="btn-nav" 
            onClick={preguntaAnterior}
            disabled={preguntaActual === 0}
          >
            ← Anterior
          </button>
          
          <div className="info-pregunta">
            {preguntaActual + 1} / {preguntas.length}
          </div>

          <button 
            className="btn-nav" 
            onClick={siguientePregunta}
            disabled={preguntaActual === preguntas.length - 1}
          >
            Siguiente →
          </button>
        </div>

        <button 
          className="btn-enviar"
          onClick={enviarEvaluacion}
          disabled={estadisticas.respondidas === 0}
        >
          📨 Enviar Evaluación
        </button>
      </div>
    </div>
  );
};

export default Evaluacion_2;