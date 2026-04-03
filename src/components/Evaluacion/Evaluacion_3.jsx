import React, { useState, useEffect, useCallback } from 'react';
import './Evaluacion.css';

const Evaluacion_3 = () => {
    const [respuestas, setRespuestas] = useState({});
    const [mostrarResultados, setMostrarResultados] = useState(false);
    const [puntaje, setPuntaje] = useState(0);
    const [tiempoInicio, setTiempoInicio] = useState(Date.now());
    const [tiempoTranscurrido, setTiempoTranscurrido] = useState(0);
    const [preguntaActual, setPreguntaActual] = useState(0);
    const [modoRevision, setModoRevision] = useState(false);

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
            'texto-corto': 'Texto corto',
            'entrada-numerica': 'Número'
        };
        return tipos[tipo] || tipo;
    };

    const preguntas = [
        {
            id: 1,
            tipo: 'opcion-multiple',
            pregunta: '¿Cuál es el resultado de la siguiente operación? 15 % 4',
            opciones: ['3.75', '3', '4', '1'],
            respuestaCorrecta: 1,
            explicacion: 'El operador % (módulo) devuelve el resto de la división. 15 ÷ 4 = 3 con resto 3.',
            dificultad: 'facil'
        },
        {
            id: 2,
            tipo: 'opcion-multiple',
            pregunta: '¿Qué operador se utiliza para la exponenciación en JavaScript?',
            opciones: ['^', '**', 'exp()', 'pow()'],
            respuestaCorrecta: 1,
            explicacion: 'El operador ** se utiliza para exponenciación. Ejemplo: 2 ** 3 = 8.',
            dificultad: 'facil'
        },
        {
            id: 3,
            tipo: 'output-codigo',
            pregunta: '¿Qué mostrará en consola el siguiente código?',
            codigo: `let a = 5;
let b = "5";
console.log(a == b);
console.log(a === b);`,
            opciones: ['true, true', 'false, false', 'true, false', 'false, true'],
            respuestaCorrecta: 2,
            explicacion: '== compara solo valor (true), === compara valor y tipo (false porque uno es number y otro string).',
            dificultad: 'facil'
        },
        {
            id: 4,
            tipo: 'verdadero-falso',
            pregunta: 'El operador || (OR) devuelve true solo si ambas condiciones son verdaderas.',
            opciones: ['Verdadero', 'Falso'],
            respuestaCorrecta: 1,
            explicacion: 'El operador || devuelve true si AL MENOS UNA condición es verdadera.',
            dificultad: 'facil'
        },
        {
            id: 5,
            tipo: 'texto-corto',
            pregunta: '¿Qué operador se usa para la concatenación de strings?',
            respuestaCorrecta: '+',
            explicacion: 'El operador + se usa para concatenar strings. Ejemplo: "Hola" + " Mundo".',
            dificultad: 'facil'
        },
        {
            id: 6,
            tipo: 'opcion-multiple',
            pregunta: '¿Cuál es el resultado de la siguiente expresión? 10 + 5 * 2',
            opciones: ['30', '20', '15', '25'],
            respuestaCorrecta: 1,
            explicacion: 'Por precedencia, la multiplicación se realiza antes: 5 * 2 = 10, luego 10 + 10 = 20.',
            dificultad: 'facil'
        },
        {
            id: 7,
            tipo: 'output-codigo',
            pregunta: '¿Qué valor tendrá la variable resultado después de ejecutar este código?',
            codigo: `let edad = 16;
let resultado = edad >= 18 ? "Mayor" : "Menor";`,
            opciones: ['"Mayor"', '"Menor"', 'true', 'false'],
            respuestaCorrecta: 1,
            explicacion: 'El operador ternario evalúa: edad >= 18 es false, devuelve "Menor".',
            dificultad: 'facil'
        },
        {
            id: 8,
            tipo: 'entrada-numerica',
            pregunta: '¿Cuál es el resultado de 2 ** 4?',
            respuestaCorrecta: 16,
            tolerancia: 0,
            explicacion: '2 ** 4 = 2 × 2 × 2 × 2 = 16.',
            dificultad: 'facil'
        },
        {
            id: 9,
            tipo: 'verdadero-falso',
            pregunta: 'El operador === compara solo el valor, ignorando el tipo de dato.',
            opciones: ['Verdadero', 'Falso'],
            respuestaCorrecta: 1,
            explicacion: '=== es el operador de igualdad estricta, compara valor Y tipo de dato.',
            dificultad: 'facil'
        },
        {
            id: 10,
            tipo: 'texto-corto',
            pregunta: '¿Qué operador se usa para la negación lógica (invierte un valor booleano)?',
            respuestaCorrecta: '!',
            explicacion: 'El operador ! invierte el valor booleano: !true = false, !false = true.',
            dificultad: 'facil'
        }
    ];

    const manejarRespuesta = useCallback((preguntaId, respuesta) => {
        setRespuestas(prev => ({ ...prev, [preguntaId]: respuesta }));
    }, []);

    const calcularPuntaje = useCallback(() => {
        let puntajeTotal = 0;
        preguntas.forEach(pregunta => {
            const respuestaUsuario = respuestas[pregunta.id];
            if (!respuestaUsuario) return;

            let esCorrecta = false;
            switch (pregunta.tipo) {
                case 'opcion-multiple':
                case 'verdadero-falso':
                    if (respuestaUsuario === pregunta.respuestaCorrecta) esCorrecta = true;
                    break;
                case 'output-codigo':
                    if (respuestaUsuario === pregunta.respuestaCorrecta) esCorrecta = true;
                    break;
                case 'texto-corto':
                    if (respuestaUsuario.toLowerCase().trim() === pregunta.respuestaCorrecta.toLowerCase()) esCorrecta = true;
                    break;
                case 'entrada-numerica':
                    if (parseInt(respuestaUsuario) === pregunta.respuestaCorrecta) esCorrecta = true;
                    break;
            }
            if (esCorrecta) puntajeTotal += 10;
        });
        return puntajeTotal;
    }, [respuestas]);

    const enviarEvaluacion = useCallback(() => {
        const preguntasSinResponder = preguntas.filter(p => !respuestas[p.id]).length;
        if (preguntasSinResponder > 0) {
            const confirmar = window.confirm(`⚠️ Tienes ${preguntasSinResponder} pregunta(s) sin responder. ¿Enviar de todas formas?`);
            if (!confirmar) return;
        }
        const puntajeFinal = calcularPuntaje();
        setPuntaje(puntajeFinal);
        setMostrarResultados(true);
        window.dispatchEvent(new CustomEvent('evaluacion-completada'));
    }, [calcularPuntaje, respuestas]);

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

    const calcularPuntajeIndividual = useCallback((pregunta) => {
        const respuestaUsuario = respuestas[pregunta.id];
        if (!respuestaUsuario) return false;
        switch (pregunta.tipo) {
            case 'opcion-multiple':
            case 'verdadero-falso':
                return respuestaUsuario === pregunta.respuestaCorrecta;
            case 'output-codigo':
                return respuestaUsuario === pregunta.respuestaCorrecta;
            case 'texto-corto':
                return respuestaUsuario.toLowerCase().trim() === pregunta.respuestaCorrecta.toLowerCase();
            case 'entrada-numerica':
                return parseInt(respuestaUsuario) === pregunta.respuestaCorrecta;
            default: return false;
        }
    }, [respuestas]);

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
                                <label key={index} className={`opcion-item ${respuestaUsuario === index ? 'seleccionada' : ''} ${modoRespuestas && index === pregunta.respuestaCorrecta ? 'respuesta-correcta' : ''}`}>
                                    <input type="radio" name={`pregunta-${pregunta.id}`} value={index} checked={respuestaUsuario === index} onChange={(e) => manejarRespuesta(pregunta.id, parseInt(e.target.value))} disabled={mostrarResultados || modoRespuestas} />
                                    <span className="opcion-texto">{opcion}</span>
                                </label>
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
                                <label key={index} className={`opcion-item ${respuestaUsuario === index ? 'seleccionada' : ''} ${modoRespuestas && index === pregunta.respuestaCorrecta ? 'respuesta-correcta' : ''}`}>
                                    <input type="radio" name={`output-${pregunta.id}`} value={index} checked={respuestaUsuario === index} onChange={(e) => manejarRespuesta(pregunta.id, parseInt(e.target.value))} disabled={mostrarResultados || modoRespuestas} />
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
                        <input type="text" placeholder="Escribe tu respuesta..." value={modoRespuestas ? pregunta.respuestaCorrecta : (respuestaUsuario || '')} onChange={(e) => manejarRespuesta(pregunta.id, e.target.value)} disabled={mostrarResultados || modoRespuestas} className="entrada-texto-corto" />
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
                                <label key={index} className={`opcion-item ${respuestaUsuario === index ? 'seleccionada' : ''} ${modoRespuestas && index === pregunta.respuestaCorrecta ? 'respuesta-correcta' : ''}`}>
                                    <input type="radio" name={`vf-${pregunta.id}`} value={index} checked={respuestaUsuario === index} onChange={(e) => manejarRespuesta(pregunta.id, parseInt(e.target.value))} disabled={mostrarResultados || modoRespuestas} />
                                    <span className="opcion-texto">{opcion}</span>
                                </label>
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
                        <input type="number" placeholder="Escribe el número..." value={modoRespuestas ? pregunta.respuestaCorrecta : (respuestaUsuario || '')} onChange={(e) => manejarRespuesta(pregunta.id, e.target.value)} disabled={mostrarResultados || modoRespuestas} className="entrada-numerica" />
                    </div>
                );
            default: return null;
        }
    }, [mostrarResultados, respuestas, manejarRespuesta, calcularPuntajeIndividual]);

    const obtenerEstadisticas = () => {
        const total = preguntas.length;
        const respondidas = Object.keys(respuestas).length;
        return { total, respondidas, porcentajeCompletado: Math.round((respondidas / total) * 100) };
    };

    const estadisticas = obtenerEstadisticas();

    if (mostrarResultados) {
        return (
            <div className="evaluacion-contenido resultados-modo">
                <div className="pantalla-resultados">
                    <div className="encabezado-resultados">
                        <h1>📊 Resultados de la Evaluación</h1>
                        <div className="info-resultados">
                            <div className="tarjeta-resultado tiempo"><span>⏱️ {formatearTiempo(tiempoTranscurrido)}</span></div>
                            <div className="tarjeta-resultado preguntas-respondidas"><span>📝 {estadisticas.respondidas}/{estadisticas.total}</span></div>
                        </div>
                    </div>
                    <div className="puntaje-final">
                        <div className="circulo-puntaje"><div className="puntaje-numero">{puntaje}</div><div className="puntaje-maximo">/ 100</div></div>
                        <div className="puntaje-porcentaje">{Math.round((puntaje / 100) * 100)}%</div>
                        {puntaje >= 70 ? <div className="mensaje-exito">¡Excelente trabajo! Dominas los operadores de JavaScript 🎉</div> : puntaje >= 50 ? <div className="mensaje-regular">Buen intento, practica más los operadores 👍</div> : <div className="mensaje-bajo">Revisa el material de "Operadores y Expresiones" y vuelve a intentarlo 💪</div>}
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
                                            <div className={`estado-pregunta ${esCorrecta ? 'correcta' : 'incorrecta'}`}>{esCorrecta ? '✓ Correcta' : '✗ Incorrecta'} - {pregunta.dificultad}</div>
                                            <p><strong>Explicación:</strong> {pregunta.explicacion}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="acciones-resultados"><button className="btn-reiniciar" onClick={reiniciarEvaluacion}>🔄 Intentar Nuevamente</button></div>
                </div>
            </div>
        );
    }

    return (
        <div className="evaluacion-contenido">
            <header className="evaluacion-header">
                <div className="encabezado-principal">
                    <h1>🔢 Evaluación: Operadores y Expresiones en JavaScript</h1>
                    <div className="tiempo-transcurrido">⏱️ {formatearTiempo(tiempoTranscurrido)}</div>
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
                    <button className="btn-nav" onClick={preguntaAnterior} disabled={preguntaActual === 0}>← Anterior</button>
                    <div className="info-pregunta">{preguntaActual + 1} / {preguntas.length}</div>
                    <button className="btn-nav" onClick={siguientePregunta} disabled={preguntaActual === preguntas.length - 1}>Siguiente →</button>
                </div>
                <button className="btn-enviar" onClick={enviarEvaluacion} disabled={estadisticas.respondidas === 0}>📨 Enviar Evaluación</button>
            </div>
        </div>
    );
};

export default Evaluacion_3;
