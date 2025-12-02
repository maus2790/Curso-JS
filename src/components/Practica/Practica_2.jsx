import React, { useState, useEffect, useCallback } from 'react';
import './Practicas.css';

const Practica_2 = ({ onCargarCodigoAlEditor }) => {
  const [mostrarSoluciones, setMostrarSoluciones] = useState({});
  const [copiado, setCopiado] = useState(null);
  const [respuestas, setRespuestas] = useState({});
  const [puntaje, setPuntaje] = useState(0);
  const [tiempoInicio, setTiempoInicio] = useState(Date.now());
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState(0);
  const [ejercicioActual, setEjercicioActual] = useState(0);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [modoEvaluacion, setModoEvaluacion] = useState(false);

  // Actualizar tiempo transcurrido
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

  const ejercicios = [
    {
      id: 1,
      titulo: "Declaración de Variables",
      descripcion: "Usa const para nombre y let para edad",
      puntos: 10,
      codigo: `// Ejercicio 1: Declaración de variables
// Declara una constante llamada 'nombre' con tu nombre
const nombre = "___";

// Declara una variable llamada 'edad' con tu edad
let edad = ___;`,
      solucion: `// Ejercicio 1: Declaración de variables
// Declara una constante llamada 'nombre' con tu nombre
const nombre = "Ana";

// Declara una variable llamada 'edad' con tu edad
let edad = 25;`,
      tipo: 'completar-codigo',
      espacios: 2,
      respuestasCorrectas: ['Ana', '25'],
      explicacion: 'Se usa const para valores constantes y let para valores que pueden cambiar.',
      dificultad: 'facil'
    },
    {
      id: 2,
      titulo: "Tipos de Datos",
      descripcion: "Crea variables con String, Number, Boolean y Null",
      puntos: 15,
      codigo: `// Ejercicio 2: Tipos de datos
// Crea variables con los siguientes tipos de datos:
let texto = "___";        // String
let numero = ___;         // Number
let esMayor = ___;        // Boolean
let direccion = ___;      // Null`,
      solucion: `// Ejercicio 2: Tipos de datos
// Crea variables con los siguientes tipos de datos:
let texto = "JavaScript";        // String
let numero = 42;                // Number
let esMayor = true;             // Boolean
let direccion = null;           // Null`,
      tipo: 'completar-codigo',
      espacios: 4,
      respuestasCorrectas: ['JavaScript', '42', 'true', 'null'],
      explicacion: 'Los tipos de datos básicos en JavaScript son String, Number, Boolean y Null.',
      dificultad: 'facil'
    },
    {
      id: 3,
      titulo: "Operaciones con Strings",
      descripcion: "Concatena strings usando el operador +",
      puntos: 10,
      codigo: `// Ejercicio 3: Operaciones con strings
// Crea un saludo concatenando nombre y edad
let saludo = "Hola, me llamo " + ___ + " y tengo " + ___ + " años.";`,
      solucion: `// Ejercicio 3: Operaciones con strings
// Crea un saludo concatenando nombre y edad
let saludo = "Hola, me llamo " + nombre + " y tengo " + edad + " años.";`,
      tipo: 'completar-codigo',
      espacios: 2,
      respuestasCorrectas: ['nombre', 'edad'],
      explicacion: 'El operador + se usa para concatenar strings con variables.',
      dificultad: 'medio'
    },
    {
      id: 4,
      titulo: "Arrays",
      descripcion: "Crea un array con 3 elementos",
      puntos: 10,
      codigo: `// Ejercicio 4: Arrays
// Crea un array llamado 'frutas' con 3 frutas diferentes
let frutas = [___, ___, ___];`,
      solucion: `// Ejercicio 4: Arrays
// Crea un array llamado 'frutas' con 3 frutas diferentes
let frutas = ["manzana", "banana", "naranja"];`,
      tipo: 'completar-codigo',
      espacios: 3,
      respuestasCorrectas: ['"manzana"', '"banana"', '"naranja"'],
      explicacion: 'Los arrays se crean con corchetes y pueden contener múltiples elementos.',
      dificultad: 'facil'
    },
    {
      id: 5,
      titulo: "Objetos",
      descripcion: "Crea un objeto con propiedades nombre, edad y ciudad",
      puntos: 15,
      codigo: `// Ejercicio 5: Objeto persona
// Crea un objeto llamado 'persona' con las propiedades: nombre, edad y ciudad
let persona = {
  nombre: ___,
  edad: ___,
  ciudad: "___"
};`,
      solucion: `// Ejercicio 5: Objeto persona
// Crea un objeto llamado 'persona' con las propiedades: nombre, edad y ciudad
let persona = {
  nombre: nombre,
  edad: edad,
  ciudad: "Madrid"
};`,
      tipo: 'completar-codigo',
      espacios: 3,
      respuestasCorrectas: ['nombre', 'edad', 'Madrid'],
      explicacion: 'Los objetos se crean con llaves y contienen pares clave-valor.',
      dificultad: 'medio'
    },
    {
      id: 6,
      titulo: "Template Literals",
      descripcion: "Usa template literals para interpolar variables",
      puntos: 10,
      codigo: `// Ejercicio 6: Template literals
// Usa template literals para crear un mensaje con los datos de persona
let mensaje = \`Mi nombre es \${___}, tengo \${___} años y vivo en \${___}.\`;`,
      solucion: `// Ejercicio 6: Template literals
// Usa template literals para crear un mensaje con los datos de persona
let mensaje = \`Mi nombre es \${persona.nombre}, tengo \${persona.edad} años y vivo en \${persona.ciudad}.\`;`,
      tipo: 'completar-codigo',
      espacios: 3,
      respuestasCorrectas: ['persona.nombre', 'persona.edad', 'persona.ciudad'],
      explicacion: 'Los template literals permiten interpolar variables usando ${}.',
      dificultad: 'medio'
    },
    {
      id: 7,
      titulo: "Reasignación",
      descripcion: "Reasigna el valor de una variable let",
      puntos: 10,
      codigo: `// Ejercicio 7: Reasignación de variables
// Reasigna el valor de la variable edad
___ = ___;`,
      solucion: `// Ejercicio 7: Reasignación de variables
// Reasigna el valor de la variable edad
edad = 26;`,
      tipo: 'completar-codigo',
      espacios: 2,
      respuestasCorrectas: ['edad', '26'],
      explicacion: 'Las variables declaradas con let pueden ser reasignadas.',
      dificultad: 'facil'
    },
    {
      id: 8,
      titulo: "Métodos de Array",
      descripcion: "Usa push() para agregar un elemento al array",
      puntos: 10,
      codigo: `// Ejercicio 8: Métodos de array
// Agrega una nueva fruta al array frutas
___.___("___");`,
      solucion: `// Ejercicio 8: Métodos de array
// Agrega una nueva fruta al array frutas
frutas.push("uva");`,
      tipo: 'completar-codigo',
      espacios: 3,
      respuestasCorrectas: ['frutas', 'push', 'uva'],
      explicacion: 'El método push() agrega elementos al final de un array.',
      dificultad: 'medio'
    }
  ];

  const manejarRespuesta = useCallback((ejercicioId, respuesta) => {
    setRespuestas(prev => ({
      ...prev,
      [ejercicioId]: respuesta
    }));
  }, []);

  const calcularPuntaje = useCallback(() => {
    let puntajeTotal = 0;
    
    ejercicios.forEach(ejercicio => {
      const respuestaUsuario = respuestas[ejercicio.id];
      
      if (!respuestaUsuario) return;

      const todasCorrectas = ejercicio.respuestasCorrectas.every((correcta, index) => {
        const respuesta = respuestaUsuario[index];
        return respuesta && 
               (correcta.toLowerCase().includes(respuesta.toLowerCase()) || 
                respuesta.toLowerCase().includes(correcta.toLowerCase()));
      });
      
      if (todasCorrectas) {
        puntajeTotal += ejercicio.puntos;
      }
    });

    return puntajeTotal;
  }, [respuestas, ejercicios]);

  const enviarEvaluacion = useCallback(() => {
    const puntajeFinal = calcularPuntaje();
    setPuntaje(puntajeFinal);
    setMostrarResultados(true);
    setModoEvaluacion(false);
  }, [calcularPuntaje]);

  const iniciarModoEvaluacion = () => {
    setModoEvaluacion(true);
    setRespuestas({});
    setMostrarResultados(false);
    setPuntaje(0);
    setTiempoInicio(Date.now());
    setTiempoTranscurrido(0);
    setEjercicioActual(0);
  };

  const salirModoEvaluacion = () => {
    if (window.confirm('¿Estás seguro de que quieres salir del modo evaluación? Se perderá tu progreso actual.')) {
      setModoEvaluacion(false);
      setRespuestas({});
      setMostrarResultados(false);
      setPuntaje(0);
      setTiempoTranscurrido(0);
      setEjercicioActual(0);
    }
  };

  const reiniciarPractica = () => {
    setRespuestas({});
    setMostrarResultados(false);
    setPuntaje(0);
    setTiempoInicio(Date.now());
    setTiempoTranscurrido(0);
    setEjercicioActual(0);
    setModoEvaluacion(false);
    setMostrarSoluciones({});
  };

  const siguienteEjercicio = () => {
    if (ejercicioActual < ejercicios.length - 1) {
      setEjercicioActual(prev => prev + 1);
    }
  };

  const ejercicioAnterior = () => {
    if (ejercicioActual > 0) {
      setEjercicioActual(prev => prev - 1);
    }
  };

  const irAEjercicio = (index) => {
    setEjercicioActual(index);
  };

  const copiarCodigo = (codigo, id) => {
    navigator.clipboard.writeText(codigo);
    setCopiado(id);
    setTimeout(() => setCopiado(null), 2000);
  };

  const cargarAlEditor = (codigo) => {
    if (onCargarCodigoAlEditor) {
      onCargarCodigoAlEditor(codigo);
    } else {
      console.log('Código para cargar al editor:', codigo);
      alert('Código listo para cargar en el editor');
    }
  };

  const alternarSolucion = (ejercicioId) => {
    setMostrarSoluciones(prev => ({
      ...prev,
      [ejercicioId]: !prev[ejercicioId]
    }));
  };

  const renderizarEjercicio = useCallback((ejercicio, modoRespuestas = false) => {
    const respuestaUsuario = respuestas[ejercicio.id];
    const esCorrecta = mostrarResultados && calcularPuntajeIndividual(ejercicio);

    return (
      <div className={`ejercicio-completo-practica ${mostrarResultados ? (esCorrecta ? 'correcta-practica' : 'incorrecta-practica') : ''}`}>
        <div className="ejercicio-info-practica">
          <div className="ejercicio-header-practica">
            <div className="ejercicio-titulo-practica">
              <span className="ejercicio-numero-practica">#{ejercicio.id}</span>
              <h3>{ejercicio.titulo}</h3>
              <span className={`dificultad-practica ${ejercicio.dificultad}`}>{ejercicio.dificultad}</span>
            </div>
            <div className="ejercicio-puntos-practica">{ejercicio.puntos} puntos</div>
          </div>
          <p className="ejercicio-descripcion-practica">{ejercicio.descripcion}</p>
        </div>

        <div className="ejercicio-codigo-practica">
          <div className="codigo-header-practica">
            <span>Código del Ejercicio</span>
            <div className="codigo-acciones-practica">
              <button 
                className="btn-cargar-ejercicio-practica"
                onClick={() => cargarAlEditor(ejercicio.codigo)}
                title="Cargar este ejercicio en el editor"
                disabled={modoEvaluacion}
              >
                ⚡ Cargar
              </button>
              <button 
                className={`btn-copiar-practica ${copiado === `ej-${ejercicio.id}` ? 'copiado-practica' : ''}`}
                onClick={() => copiarCodigo(ejercicio.codigo, `ej-${ejercicio.id}`)}
                disabled={modoEvaluacion}
              >
                {copiado === `ej-${ejercicio.id}` ? '✓ Copiado' : '📋 Copiar'}
              </button>
              {!modoEvaluacion && (
                <button 
                  className={`btn-solucion-practica ${mostrarSoluciones[ejercicio.id] ? 'activo-practica' : ''}`}
                  onClick={() => alternarSolucion(ejercicio.id)}
                >
                  {mostrarSoluciones[ejercicio.id] ? '👁️ Ocultar' : '💡 Mostrar'} Solución
                </button>
              )}
            </div>
          </div>

          <div className="contenedor-codigo-practica">
            <div className="codigo-completar-practica">
              {ejercicio.codigo.split('___').map((parte, index) => (
                <React.Fragment key={index}>
                  <span>{parte}</span>
                  {index < ejercicio.espacios && (
                    <input
                      type="text"
                      placeholder={`Respuesta ${index + 1}`}
                      value={modoRespuestas ? ejercicio.respuestasCorrectas[index] : (respuestaUsuario?.[index] || '')}
                      onChange={(e) => {
                        const nuevasRespuestas = respuestaUsuario ? [...respuestaUsuario] : Array(ejercicio.espacios).fill('');
                        nuevasRespuestas[index] = e.target.value;
                        manejarRespuesta(ejercicio.id, nuevasRespuestas);
                      }}
                      disabled={mostrarResultados || modoRespuestas}
                      className="entrada-espacio-practica"
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {mostrarResultados && (
            <div className="explicacion-pregunta-practica">
              <div className={`estado-pregunta-practica ${esCorrecta ? 'correcta-practica' : 'incorrecta-practica'}`}>
                {esCorrecta ? '✓ Correcta' : '✗ Incorrecta'} - {ejercicio.dificultad}
              </div>
              <p><strong>Explicación:</strong> {ejercicio.explicacion}</p>
            </div>
          )}
        </div>
      </div>
    );
  }, [mostrarResultados, respuestas, manejarRespuesta, mostrarSoluciones, copiado, modoEvaluacion]);

  const calcularPuntajeIndividual = useCallback((ejercicio) => {
    const respuestaUsuario = respuestas[ejercicio.id];
    if (!respuestaUsuario) return false;

    return ejercicio.respuestasCorrectas.every((correcta, index) => {
      const respuesta = respuestaUsuario[index];
      return respuesta && 
             (correcta.toLowerCase().includes(respuesta.toLowerCase()) || 
              respuesta.toLowerCase().includes(correcta.toLowerCase()));
    });
  }, [respuestas]);

  const obtenerEstadisticas = () => {
    const total = ejercicios.length;
    const respondidas = Object.keys(respuestas).length;
    const correctas = ejercicios.filter(e => calcularPuntajeIndividual(e)).length;
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
      <div className="practica-contenido resultados-modo-practica">
        <div className="pantalla-resultados-practica">
          <div className="encabezado-resultados-practica">
            <h1>📊 Resultados de la Práctica</h1>
            <div className="info-resultados-practica">
              <div className="tarjeta-resultado-practica tiempo-practica">
                <span>⏱️ {formatearTiempo(tiempoTranscurrido)}</span>
              </div>
              <div className="tarjeta-resultado-practica ejercicios-completados-practica">
                <span>📝 {estadisticas.respondidas}/{estadisticas.total}</span>
              </div>
            </div>
          </div>

          <div className="puntaje-final-practica">
            <div className="circulo-puntaje-practica">
              <div className="puntaje-numero-practica">{puntaje}</div>
              <div className="puntaje-maximo-practica">/ {ejercicios.reduce((sum, ej) => sum + ej.puntos, 0)}</div>
            </div>
            <div className="puntaje-porcentaje-practica">{Math.round((puntaje / ejercicios.reduce((sum, ej) => sum + ej.puntos, 0)) * 100)}%</div>
            
            {puntaje >= 70 ? (
              <div className="mensaje-exito-practica">¡Excelente trabajo! 🎉</div>
            ) : puntaje >= 50 ? (
              <div className="mensaje-regular-practica">Buen intento, sigue practicando 👍</div>
            ) : (
              <div className="mensaje-bajo-practica">Revisa el material y vuelve a intentarlo 💪</div>
            )}
          </div>

          <div className="resumen-ejercicios-practica">
            <h3>📋 Revisión de Ejercicios</h3>
            <div className="ejercicios-lista-revision-practica">
              {ejercicios.map((ejercicio) => {
                const esCorrecta = calcularPuntajeIndividual(ejercicio);
                return (
                  <div key={ejercicio.id} className="ejercicio-revision-practica">
                    {renderizarEjercicio(ejercicio, true)}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="acciones-resultados-practica">
            <button className="btn-reiniciar-practica" onClick={reiniciarPractica}>
              🔄 Volver a Practicar
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (modoEvaluacion) {
    return (
      <div className="practica-contenido modo-evaluacion-practica">
        <header className="evaluacion-header-practica">
          <div className="encabezado-superior-practica">
            <div className="encabezado-principal-practica">
              <h1>Modo Evaluación: Variables y Tipos de Datos</h1>
              <div className="tiempo-transcurrido-practica">
                ⏱️ {formatearTiempo(tiempoTranscurrido)}
              </div>
            </div>
            <button 
              className="btn-salir-evaluacion-practica"
              onClick={salirModoEvaluacion}
              title="Salir del modo evaluación"
            >
              🚪 Salir
            </button>
          </div>
          
          <div className="barra-progreso-practica">
            <div className="progreso-texto-practica">
              <span>Progreso: {estadisticas.respondidas} de {estadisticas.total}</span>
              <span>{estadisticas.porcentajeCompletado}%</span>
            </div>
            <div className="barra-practica">
              <div 
                className="progreso-relleno-practica" 
                style={{ width: `${estadisticas.porcentajeCompletado}%` }}
              ></div>
            </div>
          </div>

          <div className="indicadores-ejercicios-practica">
            {ejercicios.map((ejercicio, index) => {
              const respondida = respuestas[ejercicio.id] !== undefined;
              return (
                <button
                  key={ejercicio.id}
                  className={`indicador-ejercicio-practica ${
                    respondida ? 'respondida-practica' : ''
                  } ${
                    index === ejercicioActual ? 'activo-practica' : ''
                  }`}
                  onClick={() => irAEjercicio(index)}
                >
                  {ejercicio.id}
                </button>
              );
            })}
          </div>
        </header>

        <div className="ejercicios-lista-practica">
          {ejercicios.map((ejercicio, index) => (
            <div 
              key={ejercicio.id} 
              className={`ejercicio-item-practica ${
                index === ejercicioActual ? 'activa-practica' : 'oculta-practica'
              }`}
            >
              {renderizarEjercicio(ejercicio)}
            </div>
          ))}
        </div>

        <div className="evaluacion-acciones-practica">
          <div className="navegacion-ejercicios-practica">
            <button 
              className="btn-nav-practica" 
              onClick={ejercicioAnterior}
              disabled={ejercicioActual === 0}
            >
              ← Anterior
            </button>
            
            <div className="info-ejercicio-practica">
              {ejercicioActual + 1} / {ejercicios.length}
            </div>

            <button 
              className="btn-nav-practica" 
              onClick={siguienteEjercicio}
              disabled={ejercicioActual === ejercicios.length - 1}
            >
              Siguiente →
            </button>
          </div>

          <div className="acciones-derecha-practica">
            <button 
              className="btn-enviar-practica"
              onClick={enviarEvaluacion}
              disabled={estadisticas.respondidas === 0}
            >
              📨 Enviar Evaluación
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="practica-contenido">
      <header className="practica-header">
        <h1>Práctica: Variables y Tipos de Datos</h1>
        <div className="practica-meta">
          <span className="ejercicios">{ejercicios.length} ejercicios</span>
          <span className="dificultad">Principiante</span>
          <span className="puntos">{ejercicios.reduce((sum, ej) => sum + ej.puntos, 0)} puntos</span>
          <button className="btn-modo-evaluacion-practica" onClick={iniciarModoEvaluacion}>
            🎯 Modo Evaluación
          </button>
        </div>
      </header>

      <div className="practica-lista">
        {ejercicios.map((ejercicio) => (
          <div key={ejercicio.id} className="ejercicio-completo">
            <div className="ejercicio-info">
              <div className="ejercicio-header">
                <div className="ejercicio-titulo">
                  <span className="ejercicio-numero">#{ejercicio.id}</span>
                  <h3>{ejercicio.titulo}</h3>
                  <span className={`dificultad ${ejercicio.dificultad}`}>{ejercicio.dificultad}</span>
                </div>
                <div className="ejercicio-puntos">{ejercicio.puntos} puntos</div>
              </div>
              <p className="ejercicio-descripcion">{ejercicio.descripcion}</p>
            </div>

            <div className="ejercicio-codigo">
              <div className="codigo-header">
                <span>Código del Ejercicio</span>
                <div className="codigo-acciones">
                  <button 
                    className="btn-cargar-ejercicio"
                    onClick={() => cargarAlEditor(ejercicio.codigo)}
                    title="Cargar este ejercicio en el editor"
                  >
                    ⚡ Cargar
                  </button>
                  <button 
                    className={`btn-copiar ${copiado === `ej-${ejercicio.id}` ? 'copiado' : ''}`}
                    onClick={() => copiarCodigo(ejercicio.codigo, `ej-${ejercicio.id}`)}
                  >
                    {copiado === `ej-${ejercicio.id}` ? '✓ Copiado' : '📋 Copiar'}
                  </button>
                  <button 
                    className={`btn-solucion ${mostrarSoluciones[ejercicio.id] ? 'activo' : ''}`}
                    onClick={() => alternarSolucion(ejercicio.id)}
                  >
                    {mostrarSoluciones[ejercicio.id] ? '👁️ Ocultar' : '💡 Mostrar'} Solución
                  </button>
                </div>
              </div>

              <div className="contenedor-codigo">
                <pre className="codigo-ejercicio">
                  <code>
                    {mostrarSoluciones[ejercicio.id] ? ejercicio.solucion : ejercicio.codigo}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="practica-info-general">
        <div className="instrucciones-generales">
          <h3>💡 Instrucciones Generales</h3>
          <ol>
            <li>Revisa cada ejercicio y su descripción</li>
            <li>Usa el botón "⚡ Cargar" para llevar el código al editor</li>
            <li>Completa los espacios marcados con <code>___</code> en el código</li>
            <li>Ejecuta el código en la terminal para verificar los resultados</li>
            <li>Usa "💡 Mostrar Solución" si necesitas ayuda con algún ejercicio</li>
            <li>Prueba el "🎯 Modo Evaluación" para evaluar tu conocimiento</li>
            <li>Practica modificando los valores y experimentando con diferentes tipos de datos</li>
          </ol>
        </div>

        <div className="consejos-generales">
          <h3>🔑 Consejos de JavaScript</h3>
          <div className="consejos-grid">
            <div className="consejo-item">
              <strong>const</strong>
              <span>Para valores constantes que no cambian</span>
            </div>
            <div className="consejo-item">
              <strong>let</strong>
              <span>Para valores que pueden ser reasignados</span>
            </div>
            <div className="consejo-item">
              <strong>Strings</strong>
              <span>Van entre comillas simples o dobles</span>
            </div>
            <div className="consejo-item">
              <strong>Numbers</strong>
              <span>Solo números, sin comillas</span>
            </div>
            <div className="consejo-item">
              <strong>Boolean</strong>
              <span>true o false (sin comillas)</span>
            </div>
            <div className="consejo-item">
              <strong>Arrays</strong>
              <span>Usa corchetes [ ] con elementos separados por comas</span>
            </div>
            <div className="consejo-item">
              <strong>Objetos</strong>
              <span>Usa llaves {`{ }`} con propiedades: valor</span>
            </div>
            <div className="consejo-item">
              <strong>Template Literals</strong>
              <span>Usa backticks ` y ${'{expresión}'} para interpolar variables</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practica_2;