import React, { useState, useEffect, useCallback } from 'react';
import './Evaluacion.css';

const Evaluacion_6 = () => {
    const [respuestas, setRespuestas] = useState({});
    const [mostrarResultados, setMostrarResultados] = useState(false);
    const [puntaje, setPuntaje] = useState(0);
    const [tiempoInicio, setTiempoInicio] = useState(Date.now());
    const [tiempoTranscurrido, setTiempoTranscurrido] = useState(0);
    const [preguntaActual, setPreguntaActual] = useState(0);

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
            'completar-codigo': 'Completar código'
        };
        return tipos[tipo] || tipo;
    };

    const preguntas = [
        {
            id: 1,
            tipo: 'opcion-multiple',
            pregunta: '¿Qué método de array elimina el último elemento y lo devuelve?',
            opciones: ['push()', 'pop()', 'shift()', 'unshift()'],
            respuestaCorrecta: 1,
            explicacion: 'pop() elimina el último elemento del array y lo devuelve.',
            dificultad: 'facil'
        },
        {
            id: 2,
            tipo: 'output-codigo',
            pregunta: '¿Qué mostrará en consola el siguiente código?',
            codigo: `const numeros = [1, 2, 3, 4];
const duplicados = numeros.map(n => n * 2);
console.log(duplicados);`,
            opciones: ['[1, 2, 3, 4]', '[2, 4, 6, 8]', '[2, 3, 4, 5]', 'undefined'],
            respuestaCorrecta: 1,
            explicacion: 'map() crea un nuevo array con los resultados de aplicar la función a cada elemento.',
            dificultad: 'facil'
        },
        {
            id: 3,
            tipo: 'verdadero-falso',
            pregunta: 'El método filter() modifica el array original.',
            opciones: ['Verdadero', 'Falso'],
            respuestaCorrecta: 1,
            explicacion: 'filter() NO modifica el array original; crea y retorna un nuevo array con los elementos que cumplen la condición.',
            dificultad: 'facil'
        },
        {
            id: 4,
            tipo: 'texto-corto',
            pregunta: '¿Qué método de array se usa para combinar todos los elementos en un solo valor?',
            respuestaCorrecta: 'reduce',
            explicacion: 'reduce() aplica una función acumuladora para reducir el array a un solo valor.',
            dificultad: 'medio'
        },
        {
            id: 5,
            tipo: 'opcion-multiple',
            pregunta: '¿Qué hace el método splice()?',
            opciones: [
                'Crea una copia del array',
                'Modifica el array eliminando o insertando elementos',
                'Convierte el array a string',
                'Ordena los elementos del array'
            ],
            respuestaCorrecta: 1,
            explicacion: 'splice() modifica el array original eliminando, reemplazando o insertando elementos en una posición específica.',
            dificultad: 'medio'
        },
        {
            id: 6,
            tipo: 'completar-codigo',
            pregunta: 'Completa el código para filtrar los números mayores a 5:',
            codigo: `const numeros = [3, 7, 2, 8, 4];
const mayores = numeros.___(num => num > 5);`,
            espacios: 1,
            respuestasCorrectas: ['filter'],
            explicacion: 'filter() crea un nuevo array con los elementos que cumplen la condición.',
            dificultad: 'facil'
        },
        {
            id: 7,
            tipo: 'output-codigo',
            pregunta: '¿Qué mostrará en consola este código?',
            codigo: `const frutas = ['manzana', 'banana', 'naranja'];
console.log(frutas.indexOf('banana'));`,
            opciones: ['0', '1', '2', '-1'],
            respuestaCorrecta: 1,
            explicacion: 'indexOf() retorna el índice de la primera ocurrencia del elemento (banana está en índice 1).',
            dificultad: 'facil'
        },
        {
            id: 8,
            tipo: 'verdadero-falso',
            pregunta: 'El método sort() ordena los números correctamente sin necesidad de una función de comparación.',
            opciones: ['Verdadero', 'Falso'],
            respuestaCorrecta: 1,
            explicacion: 'Falso. sort() ordena como strings por defecto; para números se necesita una función de comparación como (a,b) => a - b.',
            dificultad: 'facil'
        },
        {
            id: 9,
            tipo: 'texto-corto',
            pregunta: '¿Qué método de array verifica si al menos un elemento cumple una condición?',
            respuestaCorrecta: 'some',
            explicacion: 'some() retorna true si al menos un elemento del array cumple la condición especificada.',
            dificultad: 'medio'
        },
        {
            id: 10,
            tipo: 'opcion-multiple',
            pregunta: '¿Cuál es la diferencia entre slice() y splice()?',
            opciones: [
                'slice() modifica el original, splice() no',
                'slice() no modifica el original, splice() sí',
                'Ambos modifican el original',
                'Ninguno modifica el original'
            ],
            respuestaCorrecta: 1,
            explicacion: 'slice() retorna una copia sin modificar el original; splice() modifica el array original.',
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
                case 'completar-codigo':
                    const todasCorrectas = pregunta.respuestasCorrectas.every((correcta, index) => {
                        const respuesta = respuestaUsuario[index];
                        return respuesta && correcta.toLowerCase().includes(respuesta.toLowerCase());
                    });
                    if (todasCorrectas) esCorrecta = true;
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
            case 'completar-codigo':
                return pregunta.respuestasCorrectas.every((correcta, index) => {
                    const respuesta = respuestaUsuario[index];
                    return respuesta && correcta.toLowerCase().includes(respuesta.toLowerCase());
                });
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
                            {pregunta.codigo.split('___').map((parte, index) => (
                                <React.Fragment key={index}>
                                    <span>{parte}</span>
                                    {index < pregunta.espacios && (
                                        <input type="text" placeholder={`Respuesta ${index + 1}`} value={modoRespuestas ? pregunta.respuestasCorrectas[index] : (respuestaUsuario?.[index] || '')} onChange={(e) => {
                                            const nuevasRespuestas = respuestaUsuario ? [...respuestaUsuario] : Array(pregunta.espacios).fill('');
                                            nuevasRespuestas[index] = e.target.value;
                                            manejarRespuesta(pregunta.id, nuevasRespuestas);
                                        }} disabled={mostrarResultados || modoRespuestas} className="entrada-espacio" />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
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
                        {puntaje >= 70 ? <div className="mensaje-exito">¡Excelente trabajo! Dominas los arrays y sus métodos 🎉</div> : puntaje >= 50 ? <div className="mensaje-regular">Buen intento, practica más los métodos de arrays 👍</div> : <div className="mensaje-bajo">Revisa el material de "Arrays y Métodos" y vuelve a intentarlo 💪</div>}
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
                    <h1>📊 Evaluación: Arrays y Métodos en JavaScript</h1>
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

export default Evaluacion_6;
