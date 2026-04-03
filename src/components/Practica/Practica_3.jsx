import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import './Practicas.css';

const Practica_3 = ({ onCargarCodigoAlEditor }) => {
    const TEMA_ID = 3;
    const ejercicios = [
        {
            id: 1,
            titulo: "Operadores Aritméticos",
            descripcion: "Completa las operaciones matemáticas básicas",
            puntos: 15,
            codigo: `// Completa las siguientes operaciones aritméticas\nlet suma = 10 ___ 5;       // Suma\nlet resta = 20 ___ 8;      // Resta\nlet multiplicacion = 6 ___ 7; // Multiplicación\nlet division = 45 ___ 9;   // División\nlet modulo = 17 ___ 5;     // Módulo`,
            solucion: `// Completa las siguientes operaciones aritméticas\nlet suma = 10 + 5;         // Suma\nlet resta = 20 - 8;        // Resta\nlet multiplicacion = 6 * 7; // Multiplicación\nlet division = 45 / 9;     // División\nlet modulo = 17 % 5;       // Módulo`,
            tipo: 'completar-codigo',
            espacios: 5,
            respuestasCorrectas: ['+', '-', '*', '/', '%'],
            explicacion: 'Los operadores aritméticos realizan operaciones matemáticas básicas.',
            dificultad: 'facil'
        },
        {
            id: 2,
            titulo: "Operadores de Comparación",
            descripcion: "Compara valores usando operadores de igualdad y relación",
            puntos: 20,
            codigo: `// Compara los siguientes valores\nlet esIgualDebil = 10 ___ "10"; // Igualdad débil\nlet esIgualEstricto = 10 ___ "10"; // Igualdad estricta\nlet esMayor = 15 ___ 10; // Mayor que\nlet esMenorIgual = 8 ___ 8; // Menor o igual que`,
            solucion: `// Compara los siguientes valores\nlet esIgualDebil = 10 == "10"; // Igualdad débil\nlet esIgualEstricto = 10 === "10"; // Igualdad estricta\nlet esMayor = 15 > 10; // Mayor que\nlet esMenorIgual = 8 <= 8; // Menor o igual que`,
            tipo: 'completar-codigo',
            espacios: 4,
            respuestasCorrectas: ['==', '===', '>', '<='],
            explicacion: 'Los operadores de comparación evalúan relaciones entre valores.',
            dificultad: 'medio'
        },
        {
            id: 3,
            titulo: "Operadores Lógicos",
            descripcion: "Combina condiciones usando operadores lógicos",
            puntos: 20,
            codigo: `// Combina las siguientes condiciones\nlet edad = 25;\nlet tieneLicencia = true;\n\nlet puedeConducir = edad ___ 18 ___ tieneLicencia; // AND lógico\nlet accesoAlternativo = tieneLicencia ___ false;   // OR lógico\nlet noTieneLicencia = ___tieneLicencia;           // NOT lógico`,
            solucion: `// Combina las siguientes condiciones\nlet edad = 25;\nlet tieneLicencia = true;\n\nlet puedeConducir = edad >= 18 && tieneLicencia; // AND lógico\nlet accesoAlternativo = tieneLicencia || false;  // OR lógico\nlet noTieneLicencia = !tieneLicencia;            // NOT lógico`,
            tipo: 'completar-codigo',
            espacios: 3,
            respuestasCorrectas: ['>=', '&&', '!'],
            explicacion: 'Los operadores lógicos combinan múltiples condiciones.',
            dificultad: 'medio'
        },
        {
            id: 4,
            titulo: "Operador Ternario",
            descripcion: "Usa el operador ternario para asignar un valor condicional",
            puntos: 15,
            codigo: `// Usa el operador ternario para determinar si es mayor de edad\nlet edad = 20;\nlet estado = edad ___ 18 ? "Mayor de edad" : "Menor de edad";`,
            solucion: `// Usa el operador ternario para determinar si es mayor de edad\nlet edad = 20;\nlet estado = edad >= 18 ? "Mayor de edad" : "Menor de edad";`,
            tipo: 'completar-codigo',
            espacios: 1,
            respuestasCorrectas: ['>='],
            explicacion: 'El operador ternario es una forma concisa de escribir condicionales simples.',
            dificultad: 'facil'
        },
        {
            id: 5,
            titulo: "Operadores con Strings",
            descripcion: "Concatena strings y usa template literals",
            puntos: 15,
            codigo: `// Concatena strings y usa template literals\nlet nombre = "Carlos";\nlet saludo = "Hola" ___ nombre ___ "!"; // Concatenación con +\nlet mensaje = \`Bienvenido, \${___}!\`; // Template literal`,
            solucion: `// Concatena strings y usa template literals\nlet nombre = "Carlos";\nlet saludo = "Hola" + nombre + "!"; // Concatenación con +\nlet mensaje = \`Bienvenido, \${nombre}!\`; // Template literal`,
            tipo: 'completar-codigo',
            espacios: 3,
            respuestasCorrectas: ['+', '+', 'nombre'],
            explicacion: 'JavaScript permite trabajar con strings usando concatenación y template literals.',
            dificultad: 'facil'
        },
        {
            id: 6,
            titulo: "Operadores Bit a Bit",
            descripcion: "Realiza operaciones a nivel de bits",
            puntos: 25,
            codigo: `// Realiza operaciones bit a bit\nlet a = 5;  // 0101 en binario\nlet b = 3;  // 0011 en binario\n\nlet andBit = a ___ b; // AND a nivel de bit\nlet orBit = a ___ b;  // OR a nivel de bit\nlet xorBit = a ___ b; // XOR a nivel de bit`,
            solucion: `// Realiza operaciones bit a bit\nlet a = 5;  // 0101 en binario\nlet b = 3;  // 0011 en binario\n\nlet andBit = a & b; // AND a nivel de bit\nlet orBit = a | b;  // OR a nivel de bit\nlet xorBit = a ^ b; // XOR a nivel de bit`,
            tipo: 'completar-codigo',
            espacios: 3,
            respuestasCorrectas: ['&', '|', '^'],
            explicacion: 'Los operadores bit a bit manipulan representaciones binarias de números.',
            dificultad: 'avanzado'
        },
        {
            id: 7,
            titulo: "Precedencia de Operadores",
            descripcion: "Evalúa expresiones considerando la precedencia de operadores",
            puntos: 20,
            codigo: `// Evalúa la siguiente expresión\nlet resultado = 10 ___ 5 ___ 2; // ¿Qué operador va primero?`,
            solucion: `// Evalúa la siguiente expresión\nlet resultado = 10 + 5 * 2; // La multiplicación tiene mayor precedencia`,
            tipo: 'completar-codigo',
            espacios: 2,
            respuestasCorrectas: ['+', '*'],
            explicacion: 'La precedencia de operadores determina el orden de evaluación en expresiones.',
            dificultad: 'medio'
        }
    ];

    const [mostrarSoluciones, setMostrarSoluciones] = useState({});
    const [solucionConfirmada, setSolucionConfirmada] = useState({});
    const [copiado, setCopiado] = useState(null);
    const [respuestas, setRespuestas] = useState({});
    const [respuestasEnviadas, setRespuestasEnviadas] = useState({});
    const [puntajeAcumulado, setPuntajeAcumulado] = useState(0);

    useEffect(() => {
        let puntajeTotal = 0;

        ejercicios.forEach(ejercicio => {
            if (respuestasEnviadas[ejercicio.id] && !solucionConfirmada[ejercicio.id]) {
                puntajeTotal += ejercicio.puntos;
            }
        });

        setPuntajeAcumulado(puntajeTotal);
    }, [respuestasEnviadas, solucionConfirmada, ejercicios]);

    const manejarRespuesta = useCallback((ejercicioId, respuesta) => {
        if (respuestasEnviadas[ejercicioId] || solucionConfirmada[ejercicioId]) return;

        setRespuestas(prev => ({
            ...prev,
            [ejercicioId]: respuesta
        }));
    }, [respuestasEnviadas, solucionConfirmada]);

    const enviarRespuesta = useCallback((ejercicio) => {
        if (respuestasEnviadas[ejercicio.id]) {
            toast('¡Ya completaste este ejercicio correctamente!', { icon: '✅' });
            return;
        }

        if (solucionConfirmada[ejercicio.id]) {
            toast('Este ejercicio ya no será calificado porque se mostró la solución.', { icon: '⚠️' });
            return;
        }

        const respuestaUsuario = respuestas[ejercicio.id];

        if (!respuestaUsuario || respuestaUsuario.some(r => !r || r.trim() === '')) {
            toast.error('Por favor, completa todos los espacios antes de enviar.');
            return;
        }

        const todasCorrectas = ejercicio.respuestasCorrectas.every((correcta, index) => {
            const respuesta = respuestaUsuario[index];
            return respuesta &&
                (correcta.toLowerCase().includes(respuesta.toLowerCase()) ||
                    respuesta.toLowerCase().includes(correcta.toLowerCase()));
        });

        if (todasCorrectas) {
            setRespuestasEnviadas(prev => ({
                ...prev,
                [ejercicio.id]: true
            }));
            toast.success(`¡Correcto! +${ejercicio.puntos} puntos`, { duration: 3000 });
            window.dispatchEvent(new CustomEvent('recompensa-usuario', {
                detail: { tipo: 'practica', aciertos: 1, temaId: TEMA_ID, esNuevaCompletitud: false }
            }));
        } else {
            toast.error('Respuesta incorrecta. Intenta nuevamente.');
        }
    }, [respuestas, respuestasEnviadas, solucionConfirmada]);

    const mostrarSolucionConAlerta = useCallback((ejercicioId) => {
        if (respuestasEnviadas[ejercicioId]) {
            toast('¡Ya completaste este ejercicio! La solución está disponible para revisión.', { icon: '✅' });
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

        toast((t) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontWeight: 600 }}>⚠️ ¿Mostrar solución?</span>
            <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>Este ejercicio ya no será calificado.</span>
            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  setSolucionConfirmada(prev => ({ ...prev, [ejercicioId]: true }));
                  setMostrarSoluciones(prev => ({ ...prev, [ejercicioId]: true }));
                  toast('Solución mostrada. El ejercicio ya no suma puntos.', { icon: '📚', duration: 2500 });
                }}
                style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', padding: '6px 12px', cursor: 'pointer', fontWeight: 600 }}
              >Ver solución</button>
              <button
                onClick={() => toast.dismiss(t.id)}
                style={{ background: 'transparent', border: '1px solid currentColor', borderRadius: '6px', padding: '6px 12px', cursor: 'pointer' }}
              >Cancelar</button>
            </div>
          </div>
        ), { duration: 8000 });
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
    const porcentajeCompletado = Math.round((puntajeAcumulado / totalPuntos) * 100) || 0;

    return (
        <div className="practica-contenido">
            <header className="practica-header">
                <div className="practica-header-principal">
                    <h1>Práctica: Operadores y Expresiones</h1>
                </div>

                <div className="practica-meta">
                    <span className="ejercicios">{ejercicios.length} ejercicios</span>
                    <span className="dificultad">Intermedio</span>
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
                                            {copiado === `ej-${ejercicio.id}` ? '✓' : '📋'} Copiar
                                        </button>
                                        <button
                                            className={`btn-solucion ${mostrarSoluciones[ejercicio.id] ? 'activo' : ''}`}
                                            onClick={() => alternarSolucion(ejercicio.id)}
                                        >
                                            {mostrarSoluciones[ejercicio.id] ? '👁️' : '💡'} {mostrarSoluciones[ejercicio.id] ? 'Ocultar' : 'Mostrar'} Solución
                                        </button>
                                        {!estaCompletado && !solucionMostrada && (
                                            <button
                                                className="btn-enviar-respuesta-header"
                                                onClick={() => enviarRespuesta(ejercicio)}
                                            >
                                                📨 Enviar
                                            </button>
                                        )}
                                        {estaCompletado && (
                                            <button className="btn-completado" disabled>
                                                ✓ Completado
                                            </button>
                                        )}
                                        {solucionMostrada && !estaCompletado && (
                                            <button className="btn-solucion-mostrada" disabled>
                                                ⚠️ Solución vista
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="contenedor-codigo">
                                    {mostrarSoluciones[ejercicio.id] ? (
                                        <pre className="codigo-ejemplo solucion">
                                            <code>{ejercicio.solucion.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code>
                                        </pre>
                                    ) : (
                                        <div className="codigo-completar">
                                            {ejercicio.codigo.split('___').map((parte, index) => (
                                                <React.Fragment key={index}>
                                                    <span dangerouslySetInnerHTML={{ __html: parte.replace(/</g, '&lt;').replace(/>/g, '&gt;') }} />
                                                    {index < ejercicio.espacios && (
                                                        <input
                                                            type="text"
                                                            placeholder="___"
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
                        <li>Haz clic en <strong>{"'📨 Enviar'"}</strong> para verificar tu respuesta</li>
                        <li>Si la respuesta es correcta, ganarás los puntos del ejercicio</li>
                        <li>Usa <strong>{"'💡 Mostrar Solución'"}</strong> si necesitas ayuda (perderás los puntos de ese ejercicio)</li>
                        <li>Los puntos se acumulan en tiempo real en la parte superior</li>
                    </ol>
                </div>

                <div className="consejos-generales">
                    <h3>🔑 Consejos de JavaScript</h3>
                    <div className="consejos-grid">
                        <div className="consejo-item">
                            <strong>Aritméticos</strong>
                            <span><code>{'+ - * / % **'}</code></span>
                        </div>
                        <div className="consejo-item">
                            <strong>Comparación</strong>
                            <span><code>{'== === != !== &gt; &lt; &gt;= &lt;='}</code></span>
                        </div>
                        <div className="consejo-item">
                            <strong>Lógicos</strong>
                            <span><code>{'&& || ! ??'}</code></span>
                        </div>
                        <div className="consejo-item">
                            <strong>Ternario</strong>
                            <span><code>{'condición ? valor1 : valor2'}</code></span>
                        </div>
                        <div className="consejo-item">
                            <strong>Strings</strong>
                            <span><code>{'+ += ``'}</code></span>
                        </div>
                        <div className="consejo-item">
                            <strong>Bit a Bit</strong>
                            <span><code>{'&amp; | ^ ~ &lt;&lt; &gt;&gt; &gt;&gt;&gt;'}</code></span>
                        </div>
                        <div className="consejo-item">
                            <strong>Precedencia</strong>
                            <span>Paréntesis tienen mayor prioridad</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Practica_3;