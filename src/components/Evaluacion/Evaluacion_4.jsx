import React, { useState, useEffect, useCallback } from 'react';
import './Evaluacion.css';

const Evaluacion_4 = () => {
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
            'completar-codigo': 'Completar código'
        };
        return tipos[tipo] || tipo;
    };

    const preguntas = [
        {
            id: 1,
            tipo: 'opcion-multiple',
            pregunta: '¿Qué estructura de control usarías para ejecutar un bloque de código 10 veces?',
            opciones: [
                'if-else',
                'switch',
                'for',
                'do-while'
            ],
            respuestaCorrecta: 2,
            explicacion: 'El bucle for es ideal cuando sabes exactamente cuántas veces necesitas repetir un bloque de código.',
            dificultad: 'facil'
        },
        {
            id: 2,
            tipo: 'output-codigo',
            pregunta: '¿Qué mostrará en consola el siguiente código?',
            codigo: `let contador = 1;
while (contador <= 3) {
    console.log(contador);
    contador++;
}`,
            opciones: [
                '1, 2, 3',
                '1, 2, 3, 4',
                '0, 1, 2, 3',
                '3, 2, 1'
            ],
            respuestaCorrecta: 0,
            explicacion: 'El bucle while se ejecuta mientras contador sea ≤ 3. Comienza en 1, imprime 1,2,3 y luego termina.',
            dificultad: 'facil'
        },
        {
            id: 3,
            tipo: 'verdadero-falso',
            pregunta: 'La palabra clave "break" se usa para salir completamente de un bucle.',
            opciones: ['Verdadero', 'Falso'],
            respuestaCorrecta: 0,
            explicacion: 'break termina el bucle completamente y continúa con la ejecución después del bucle.',
            dificultad: 'facil'
        },
        {
            id: 4,
            tipo: 'opcion-multiple',
            pregunta: '¿Cuál es la sintaxis correcta de un bucle for?',
            opciones: [
                'for (i < 10; i++) { }',
                'for (let i = 0; i < 10; i++) { }',
                'for (i = 0; i < 10) { }',
                'for i in range(10) { }'
            ],
            respuestaCorrecta: 1,
            explicacion: 'La sintaxis correcta es: for (inicialización; condición; incremento) { código }',
            dificultad: 'facil'
        },
        {
            id: 5,
            tipo: 'texto-corto',
            pregunta: '¿Qué palabra clave se usa en un switch para manejar casos no contemplados?',
            respuestaCorrecta: 'default',
            explicacion: 'default se ejecuta cuando ningún case coincide con el valor evaluado.',
            dificultad: 'facil'
        },
        {
            id: 6,
            tipo: 'completar-codigo',
            pregunta: 'Completa el código para crear un bucle que muestre números del 1 al 5:',
            codigo: `for (let i = 1; i ___ 5; i___) {
    console.log(i);
}`,
            espacios: 2,
            respuestasCorrectas: ['<=', '++'],
            explicacion: 'La condición debe ser i <= 5 para incluir el 5, y el incremento i++ para avanzar.',
            dificultad: 'facil'
        },
        {
            id: 7,
            tipo: 'output-codigo',
            pregunta: '¿Qué mostrará en consola este código?',
            codigo: `let dia = 3;
let nombreDia;
switch(dia) {
    case 1: nombreDia = "Lunes"; break;
    case 2: nombreDia = "Martes"; break;
    case 3: nombreDia = "Miércoles"; break;
    case 4: nombreDia = "Jueves"; break;
    default: nombreDia = "Día inválido";
}
console.log(nombreDia);`,
            opciones: [
                '"Lunes"',
                '"Martes"',
                '"Miércoles"',
                '"Día inválido"'
            ],
            respuestaCorrecta: 2,
            explicacion: 'dia = 3, por lo tanto el case 3 se ejecuta y asigna "Miércoles" a nombreDia.',
            dificultad: 'facil'
        },
        {
            id: 8,
            tipo: 'verdadero-falso',
            pregunta: 'El bucle do-while siempre ejecuta su bloque de código al menos una vez.',
            opciones: ['Verdadero', 'Falso'],
            respuestaCorrecta: 0,
            explicacion: 'do-while primero ejecuta el código y luego verifica la condición, garantizando al menos una ejecución.',
            dificultad: 'facil'
        },
        {
            id: 9,
            tipo: 'opcion-multiple',
            pregunta: '¿Qué hace la palabra clave "continue" dentro de un bucle?',
            opciones: [
                'Termina el bucle completamente',
                'Salta a la siguiente iteración del bucle',
                'Reinicia el bucle desde el principio',
                'Sale de la función actual'
            ],
            respuestaCorrecta: 1,
            explicacion: 'continue salta el resto del código en la iteración actual y continúa con la siguiente iteración.',
            dificultad: 'facil'
        },
        {
            id: 10,
            tipo: 'texto-corto',
            pregunta: '¿Qué estructura de control usarías para evaluar una variable contra múltiples valores específicos?',
            respuestaCorrecta: 'switch',
            explicacion: 'switch es ideal cuando necesitas comparar una variable contra múltiples valores específicos.',
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

    const irAPregunta = (index) => {
        setPreguntaActual(index);
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
                                <label key={index} className={`opcion-item ${respuestaUsuario === index ? 'seleccionada' : ''} ${modoRespuestas && index === pregunta.respuestaCorrecta ? 'respuesta-correcta' : ''}`}>
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
                                        <input
                                            type="text"
                                            placeholder={`Respuesta ${index + 1}`}
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
                        {puntaje >= 70 ? (
                            <div className="mensaje-exito">¡Excelente trabajo! Dominas las estructuras de control 🎉</div>
                        ) : puntaje >= 50 ? (
                            <div className="mensaje-regular">Buen intento, practica más los bucles y condicionales 👍</div>
                        ) : (
                            <div className="mensaje-bajo">Revisa el material de "Estructuras de Control" y vuelve a intentarlo 💪</div>
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
                    <div className="acciones-resultados"><button className="btn-reiniciar" onClick={reiniciarEvaluacion}>🔄 Intentar Nuevamente</button></div>
                </div>
            </div>
        );
    }

    return (
        <div className="evaluacion-contenido">
            <header className="evaluacion-header">
                <div className="encabezado-principal">
                    <h1>🔄 Evaluación: Estructuras de Control en JavaScript</h1>
                    <div className="tiempo-transcurrido">⏱️ {formatearTiempo(tiempoTranscurrido)}</div>
                </div>
                <div className="barra-progreso">
                    <div className="progreso-texto"><span>Progreso: {estadisticas.respondidas} de {estadisticas.total}</span><span>{estadisticas.porcentajeCompletado}%</span></div>
                    <div className="barra"><div className="progreso-relleno" style={{ width: `${estadisticas.porcentajeCompletado}%` }}></div></div>
                </div>
                <div className="indicadores-preguntas">
                    {preguntas.map((pregunta, index) => (
                        <button
                            key={pregunta.id}
                            className={`indicador-pregunta ${respuestas[pregunta.id] !== undefined ? 'respondida' : ''} ${index === preguntaActual ? 'activo' : ''}`}
                            onClick={() => irAPregunta(index)}
                        >
                            {pregunta.id}
                        </button>
                    ))}
                </div>
            </header>
            <div className="preguntas-lista">
                {preguntas.map((pregunta, index) => (
                    <div key={pregunta.id} className={`pregunta-item ${index === preguntaActual ? 'activa' : 'oculta'}`}>
                        {renderizarPregunta(pregunta)}
                    </div>
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

export default Evaluacion_4;
