import React, { useState, useEffect, useCallback } from 'react';
import './Practicas.css';

const Practica_2 = ({ onCargarCodigoAlEditor }) => {
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

  const [mostrarSoluciones, setMostrarSoluciones] = useState({});
  const [solucionConfirmada, setSolucionConfirmada] = useState({});
  const [copiado, setCopiado] = useState(null);
  const [respuestas, setRespuestas] = useState({});
  const [respuestasEnviadas, setRespuestasEnviadas] = useState({});
  const [puntajeAcumulado, setPuntajeAcumulado] = useState(0);

  // Calcular puntaje acumulado cuando cambian las respuestas enviadas
  useEffect(() => {
    let puntajeTotal = 0;

    ejercicios.forEach(ejercicio => {
      // Solo sumar puntos si el ejercicio fue enviado correctamente y no se mostró la solución
      if (respuestasEnviadas[ejercicio.id] && !solucionConfirmada[ejercicio.id]) {
        puntajeTotal += ejercicio.puntos;
      }
    });

    setPuntajeAcumulado(puntajeTotal);
  }, [respuestasEnviadas, solucionConfirmada, ejercicios]);

  const manejarRespuesta = useCallback((ejercicioId, respuesta) => {
    // No permitir cambios si ya se envió correctamente o se mostró la solución
    if (respuestasEnviadas[ejercicioId] || solucionConfirmada[ejercicioId]) return;

    setRespuestas(prev => ({
      ...prev,
      [ejercicioId]: respuesta
    }));
  }, [respuestasEnviadas, solucionConfirmada]);

  const enviarRespuesta = useCallback((ejercicio) => {
    // No evaluar si ya se envió correctamente
    if (respuestasEnviadas[ejercicio.id]) {
      alert('✅ Ya has completado este ejercicio correctamente.');
      return;
    }

    // No evaluar si ya se mostró la solución
    if (solucionConfirmada[ejercicio.id]) {
      alert('⚠️ Este ejercicio ya no será calificado porque se mostró la solución.');
      return;
    }

    const respuestaUsuario = respuestas[ejercicio.id];

    if (!respuestaUsuario || respuestaUsuario.some(r => !r || r.trim() === '')) {
      alert('Por favor, completa todos los espacios antes de enviar.');
      return;
    }

    const todasCorrectas = ejercicio.respuestasCorrectas.every((correcta, index) => {
      const respuesta = respuestaUsuario[index];
      return respuesta &&
        (correcta.toLowerCase().includes(respuesta.toLowerCase()) ||
          respuesta.toLowerCase().includes(correcta.toLowerCase()));
    });

    if (todasCorrectas) {
      // Marcar como enviado correctamente
      setRespuestasEnviadas(prev => ({
        ...prev,
        [ejercicio.id]: true
      }));
      alert(`✅ ¡Correcto! Has ganado ${ejercicio.puntos} puntos.`);
    } else {
      alert(`❌ Respuesta incorrecta. Intenta nuevamente.`);
    }
  }, [respuestas, respuestasEnviadas, solucionConfirmada]);

  const mostrarSolucionConAlerta = useCallback((ejercicioId) => {
    // Si ya se envió correctamente, no permitir mostrar solución
    if (respuestasEnviadas[ejercicioId]) {
      alert('✅ Ya has completado este ejercicio correctamente. La solución está disponible para revisión.');
      setMostrarSoluciones(prev => ({
        ...prev,
        [ejercicioId]: true
      }));
      return;
    }

    if (solucionConfirmada[ejercicioId]) {
      setMostrarSoluciones(prev => ({
        ...prev,
        [ejercicioId]: true
      }));
      return;
    }

    const confirmar = window.confirm(
      '⚠️ Si muestras la solución, este ejercicio ya no será calificado.\n\n¿Estás seguro de que quieres ver la solución?'
    );

    if (confirmar) {
      setSolucionConfirmada(prev => ({
        ...prev,
        [ejercicioId]: true
      }));
      setMostrarSoluciones(prev => ({
        ...prev,
        [ejercicioId]: true
      }));
      alert('La solución se ha mostrado. Este ejercicio ya no suma puntos.');
    }
  }, [respuestasEnviadas, solucionConfirmada]);

  const copiarCodigo = (codigo, id) => {
    navigator.clipboard.writeText(codigo);
    setCopiado(id);
    setTimeout(() => setCopiado(null), 2000);
  };

  const alternarSolucion = (ejercicioId) => {
    if (!mostrarSoluciones[ejercicioId]) {
      mostrarSolucionConAlerta(ejercicioId);
    } else {
      setMostrarSoluciones(prev => ({
        ...prev,
        [ejercicioId]: false
      }));
    }
  };

  const totalPuntos = ejercicios.reduce((sum, ej) => sum + ej.puntos, 0);
  const porcentajeCompletado = Math.round((puntajeAcumulado / totalPuntos) * 100);

  return (
    <div className="practica-contenido">
      <header className="practica-header">
        {/* Primera fila - solo h1 */}
        <div className="practica-header-principal">
          <h1>Práctica: Variables y Tipos de Datos</h1>
        </div>

        {/* Segunda fila - todo lo demás */}
        <div className="practica-meta">
          <span className="ejercicios">{ejercicios.length} ejercicios</span>
          <span className="dificultad">Principiante</span>
          <span className="puntos">{totalPuntos} puntos totales</span>
          <div className="practica-puntaje-header">
            <span className="puntaje-icon">🏆</span>
            <span className="puntaje-actual">{puntajeAcumulado}</span>
            <span className="puntaje-total">/{totalPuntos} pts</span>
            <div className="puntaje-barra">
              <div
                className="puntaje-barra-relleno"
                style={{ width: `${porcentajeCompletado}%` }}
              ></div>
            </div>
            <span className="puntaje-porcentaje">{porcentajeCompletado}%</span>
          </div>
        </div>
      </header>

      <div className="practica-lista">
        {ejercicios.map((ejercicio) => {
          const estaCompletado = respuestasEnviadas[ejercicio.id];
          const solucionMostrada = solucionConfirmada[ejercicio.id];
          const respuestaUsuario = respuestas[ejercicio.id];

          return (
            <div key={ejercicio.id} className={`ejercicio-completo ${estaCompletado ? 'completado' : ''} ${solucionMostrada ? 'solucion-mostrada' : ''}`}>
              <div className="ejercicio-info">
                <div className="ejercicio-header">
                  <div className="ejercicio-titulo">
                    <span className="ejercicio-numero">#{ejercicio.id}</span>
                    <h3>{ejercicio.titulo}</h3>
                    <span className={`dificultad ${ejercicio.dificultad}`}>{ejercicio.dificultad}</span>
                    {estaCompletado && <span className="completado-badge">✓ Completado</span>}
                    {solucionMostrada && !estaCompletado && <span className="solucion-badge">⚠️ Solución vista</span>}
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
                  {mostrarSoluciones[ejercicio.id] ? (
                    <pre className="codigo-ejercicio solucion">
                      <code>{ejercicio.solucion}</code>
                    </pre>
                  ) : (
                    <div className="codigo-completar">
                      {ejercicio.codigo.split('___').map((parte, index) => (
                        <React.Fragment key={index}>
                          <span>{parte}</span>
                          {index < ejercicio.espacios && (
                            <input
                              type="text"
                              placeholder={`Respuesta ${index + 1}`}
                              value={respuestaUsuario?.[index] || ''}
                              onChange={(e) => {
                                const nuevasRespuestas = respuestaUsuario ? [...respuestaUsuario] : Array(ejercicio.espacios).fill('');
                                nuevasRespuestas[index] = e.target.value;
                                manejarRespuesta(ejercicio.id, nuevasRespuestas);
                              }}
                              disabled={estaCompletado || solucionMostrada}
                              className="entrada-espacio"
                            />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </div>

                {!mostrarSoluciones[ejercicio.id] && !estaCompletado && !solucionMostrada && (
                  <div className="botones-accion-ejercicio">
                    <button
                      className="btn-enviar-respuesta"
                      onClick={() => enviarRespuesta(ejercicio)}
                    >
                      📨 Enviar respuesta
                    </button>
                  </div>
                )}

                {solucionMostrada && !estaCompletado && (
                  <div className="mensaje-solucion-mostrada">
                    ⚠️ La solución fue mostrada. Este ejercicio ya no suma puntos.
                  </div>
                )}

                {estaCompletado && (
                  <div className="mensaje-completado">
                    ✅ ¡Respuesta correcta! Has ganado {ejercicio.puntos} puntos.
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="practica-info-general">
        <div className="instrucciones-generales">
          <h3>💡 Instrucciones Generales</h3>
          <ol>
            <li>Revisa cada ejercicio y su descripción</li>
            <li>Completa los espacios marcados con <code>___</code> en el código</li>
            <li>Haz clic en <strong>"📨 Enviar respuesta"</strong> para verificar tu respuesta</li>
            <li>Si la respuesta es correcta, ganarás los puntos del ejercicio</li>
            <li>Usa <strong>"💡 Mostrar Solución"</strong> si necesitas ayuda (pero perderás los puntos de ese ejercicio)</li>
            <li>Los puntos se acumulan en tiempo real en la parte superior</li>
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