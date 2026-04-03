import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { 
  CheckCircle, 
  Lightbulb, 
  Copy, 
  Eye, 
  EyeOff, 
  Send, 
  AlertTriangle,
  Trophy,
  BookOpen,
  Info,
  ChevronRight,
  Code
} from 'lucide-react';
import './Practicas.css';

const Practica_1 = ({ onCargarCodigoAlEditor }) => {
    const TEMA_ID = 1;
    const ejercicios = [
        {
            id: 1,
            titulo: "Hola Mundo",
            descripcion: "Escribe tu primer programa en JavaScript",
            puntos: 10,
            codigo: `// Escribe un programa que muestre "¡Hola, Mundo!" en la consola\nconsole.log("___");`,
            solucion: `// Escribe un programa que muestre "¡Hola, Mundo!" en la consola\nconsole.log("¡Hola, Mundo!");`,
            tipo: 'completar-codigo',
            espacios: 1,
            respuestasCorrectas: ['¡Hola, Mundo!'],
            explicacion: 'El método console.log() muestra mensajes en la consola.',
            dificultad: 'facil'
        },
        {
            id: 2,
            titulo: "Comentarios",
            descripcion: "Agrega comentarios a tu código",
            puntos: 10,
            codigo: `// Este es un comentario de una línea\n\n/* \n   Agrega un comentario multilínea aquí\n*/`,
            solucion: `// Este es un comentario de una línea\n\n/* \n   Este es un comentario multilínea\n*/`,
            tipo: 'completar-codigo',
            espacios: 1,
            respuestasCorrectas: ['Este es un comentario multilínea'],
            explicacion: 'Los comentarios no afectan la ejecución del código pero son útiles para documentarlo.',
            dificultad: 'facil'
        },
        {
            id: 3,
            titulo: "Interacción con el Usuario",
            descripcion: "Muestra un mensaje emergente usando alert()",
            puntos: 15,
            codigo: `// Muestra un mensaje de bienvenida al usuario\nalert("___");`,
            solucion: `// Muestra un mensaje de bienvenida al usuario\nalert("Bienvenido a JavaScript");`,
            tipo: 'completar-codigo',
            espacios: 1,
            respuestasCorrectas: ['Bienvenido a JavaScript'],
            explicacion: 'La función alert() muestra un cuadro de diálogo emergente en el navegador.',
            dificultad: 'facil'
        },
        {
            id: 4,
            titulo: "Manipulación del DOM",
            descripcion: "Cambia el texto de un elemento HTML",
            puntos: 20,
            codigo: `// Cambia el texto del elemento con ID "titulo" a "Nuevo Título"\ndocument.getElementById("___").textContent = "___";`,
            solucion: `// Cambia el texto del elemento con ID "titulo" a "Nuevo Título"\ndocument.getElementById("titulo").textContent = "Nuevo Título";`,
            tipo: 'completar-codigo',
            espacios: 2,
            respuestasCorrectas: ['titulo', 'Nuevo Título'],
            explicacion: 'El DOM permite modificar dinámicamente el contenido de una página web.',
            dificultad: 'medio'
        },
        {
            id: 5,
            titulo: "Cambiar Estilos CSS",
            descripcion: "Modifica el color de fondo de la página",
            puntos: 15,
            codigo: `// Cambia el color de fondo del body a "lightblue"\ndocument.___.style.___ = "___";`,
            solucion: `// Cambia el color de fondo del body a "lightblue"\ndocument.body.style.backgroundColor = "lightblue";`,
            tipo: 'completar-codigo',
            espacios: 3,
            respuestasCorrectas: ['body', 'backgroundColor', 'lightblue'],
            explicacion: 'JavaScript puede modificar estilos CSS directamente.',
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
        setRespuestas(prev => ({ ...prev, [ejercicioId]: respuesta }));
    }, [respuestasEnviadas, solucionConfirmada]);

    const enviarRespuesta = useCallback((ejercicio) => {
        if (respuestasEnviadas[ejercicio.id]) return;

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
            setRespuestasEnviadas(prev => ({ ...prev, [ejercicio.id]: true }));
            toast.success(`¡Correcto! +${ejercicio.puntos} puntos`, { duration: 3000 });
            
            // Despachar recompensa (XP)
            window.dispatchEvent(new CustomEvent('recompensa-usuario', {
                detail: {
                    tipo: 'practica',
                    aciertos: 1,
                    temaId: TEMA_ID,
                    esNuevaCompletitud: false
                }
            }));

        } else {
            toast.error('Respuesta incorrecta. Intenta nuevamente.');
        }
    }, [respuestas, respuestasEnviadas, solucionConfirmada]);

    const mostrarSolucionConAlerta = useCallback((ejercicioId) => {
        if (respuestasEnviadas[ejercicioId]) {
            setMostrarSoluciones(prev => ({ ...prev, [ejercicioId]: true }));
            return;
        }
        if (solucionConfirmada[ejercicioId]) {
            setMostrarSoluciones(prev => ({ ...prev, [ejercicioId]: true }));
            return;
        }
        const confirmar = window.confirm('⚠️ Si muestras la solución, este ejercicio ya no será calificado.\n\n¿Estás seguro?');
        if (confirmar) {
            setSolucionConfirmada(prev => ({ ...prev, [ejercicioId]: true }));
            setMostrarSoluciones(prev => ({ ...prev, [ejercicioId]: true }));
        }
    }, [respuestasEnviadas, solucionConfirmada]);

    const copiarCodigo = (codigo, id) => {
        navigator.clipboard.writeText(codigo);
        setCopiado(id);
        setTimeout(() => setCopiado(null), 2000);
    };

    const totalPuntos = ejercicios.reduce((sum, ej) => sum + ej.puntos, 0);
    const porcentajeCompletado = Math.round((puntajeAcumulado / totalPuntos) * 100) || 0;

    return (
        <div className="practica-contenido">
            <header className="practica-header">
                <div className="practica-header-principal">
                    <h1><BookOpen size={24} /> Práctica: Introducción a JavaScript</h1>
                </div>
                <div className="practica-meta">
                    <span className="ejercicios">{ejercicios.length} ejercicios</span>
                    <span className="dificultad">Principiante</span>
                    <div className="practica-puntaje-header">
                        <Trophy size={18} className="icono-trofeo" />
                        <span className="puntaje-actual">{puntajeAcumulado}</span>
                        <span className="puntaje-total">/{totalPuntos} pts</span>
                        <div className="puntaje-barra">
                            <div className="puntaje-barra-relleno" style={{ width: `${porcentajeCompletado}%` }}></div>
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
                                        {estaCompletado && <span className="completado-badge"><CheckCircle size={14} /> Completado</span>}
                                        {solucionMostrada && !estaCompletado && <span className="solucion-badge"><AlertTriangle size={14} /> Solución vista</span>}
                                    </div>
                                    <div className="ejercicio-puntos">{ejercicio.puntos} puntos</div>
                                </div>
                                <p className="ejercicio-descripcion">{ejercicio.descripcion}</p>
                            </div>

                            <div className="ejercicio-codigo">
                                <div className="codigo-header">
                                    <span><Code size={16} /> Código del Ejercicio</span>
                                    <div className="codigo-acciones">
                                        <button className={`btn-copiar ${copiado === `ej-${ejercicio.id}` ? 'copiado' : ''}`} onClick={() => copiarCodigo(ejercicio.codigo, `ej-${ejercicio.id}`)}>
                                            {copiado === `ej-${ejercicio.id}` ? <CheckCircle size={14} /> : <Copy size={14} />} Copiar
                                        </button>
                                        <button className={`btn-solucion ${mostrarSoluciones[ejercicio.id] ? 'activo' : ''}`} onClick={() => alternarSolucion(ejercicio.id)}>
                                            {mostrarSoluciones[ejercicio.id] ? <EyeOff size={14} /> : <Lightbulb size={14} />} {mostrarSoluciones[ejercicio.id] ? 'Ocultar' : 'Mostrar'} Solución
                                        </button>
                                        {!estaCompletado && !solucionMostrada && (
                                            <button className="btn-enviar-respuesta-header" onClick={() => enviarRespuesta(ejercicio)}>
                                                <Send size={14} /> Enviar
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="contenedor-codigo">
                                    {mostrarSoluciones[ejercicio.id] ? (
                                        <pre className="codigo-ejercicio solucion"><code>{ejercicio.solucion}</code></pre>
                                    ) : (
                                        <div className="codigo-completar">
                                            {ejercicio.codigo.split('___').map((parte, index) => (
                                                <React.Fragment key={index}>
                                                    <span>{parte}</span>
                                                    {index < ejercicio.espacios && (
                                                        <input type="text" placeholder="___" value={respuestaUsuario?.[index] || ''} onChange={(e) => {
                                                            const nuevasRespuestas = respuestaUsuario ? [...respuestaUsuario] : Array(ejercicio.espacios).fill('');
                                                            nuevasRespuestas[index] = e.target.value;
                                                            manejarRespuesta(ejercicio.id, nuevasRespuestas);
                                                        }} disabled={estaCompletado || solucionMostrada} className="entrada-espacio" />
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
                    <h3><Info size={18} /> Instrucciones Generales</h3>
                    <ol>
                        <li>Revisa cada ejercicio y su descripción</li>
                        <li>Completa los espacios marcados con <code>___</code> en el código</li>
                        <li>Haz clic en <strong>"Enviar"</strong> para verificar tu respuesta</li>
                        <li>Si la respuesta es correcta, ganarás los puntos del ejercicio</li>
                        <li>Usa <strong>"Mostrar Solución"</strong> si necesitas ayuda</li>
                    </ol>
                </div>
            </div>
        </div>
    );
    
    function alternarSolucion(ejercicioId) {
        if (!mostrarSoluciones[ejercicioId]) {
            mostrarSolucionConAlerta(ejercicioId);
        } else {
            setMostrarSoluciones(prev => ({ ...prev, [ejercicioId]: false }));
        }
    }
};

export default Practica_1;