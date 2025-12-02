import React, { useState } from 'react';
import './Practica.css';

const PracticaTema1 = () => {
  const [codigo, setCodigo] = useState(`// Escribe tu código aquí
console.log("¡Hola JavaScript!");`);

  return (
    <div className="practica-container">
      <header className="practica-header">
        <h1>Práctica: Introducción a JavaScript</h1>
        <div className="practica-meta">
          <span className="dificultad">Fácil</span>
          <span className="puntos">10 puntos</span>
        </div>
      </header>

      <div className="practica-content">
        <section className="instrucciones">
          <h2>Instrucciones</h2>
          <div className="instrucciones-lista">
            <div className="instruccion">
              <span className="numero">1</span>
              <p>Escribe un programa que muestre un mensaje de bienvenida en la consola</p>
            </div>
            <div className="instruccion">
              <span className="numero">2</span>
              <p>Agrega una variable con tu nombre y muéstrala</p>
            </div>
            <div className="instruccion">
              <span className="numero">3</span>
              <p>Ejecuta el código para ver los resultados</p>
            </div>
          </div>
        </section>

        <section className="editor-area">
          <div className="editor-header">
            <h3>Editor de Código</h3>
            <div className="editor-actions">
              <button className="btn-ejecutar">▶ Ejecutar</button>
              <button className="btn-limpiar">Limpiar</button>
            </div>
          </div>
          <textarea
            className="editor-codigo"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Escribe tu código JavaScript aquí..."
          />
        </section>

        <section className="resultado-area">
          <h3>Resultado</h3>
          <div className="consola-output">
            <pre>{`> ¡Hola JavaScript!\n> Bienvenido al curso`}</pre>
          </div>
        </section>
      </div>
    </div>
  );
};

const PracticaTema2 = () => (
  <div className="practica-container">
    <header className="practica-header">
      <h1>Práctica: Variables y Tipos de Datos</h1>
      <div className="practica-meta">
        <span className="dificultad">Fácil</span>
        <span className="puntos">15 puntos</span>
      </div>
    </header>
    <div className="mensaje-construccion">
      <h3>🔧 Práctica en Desarrollo</h3>
      <p>Esta práctica estará disponible pronto.</p>
    </div>
  </div>
);

const PracticaTema3 = () => (
  <div className="practica-container">
    <header className="practica-header">
      <h1>Práctica: Operadores y Expresiones</h1>
      <div className="practica-meta">
        <span className="dificultad">Intermedio</span>
        <span className="puntos">20 puntos</span>
      </div>
    </header>
    <div className="mensaje-construccion">
      <h3>🔧 Práctica en Desarrollo</h3>
      <p>Esta práctica estará disponible pronto.</p>
    </div>
  </div>
);

const Practica = ({ temaId }) => {
  const practicasComponentes = {
    1: <PracticaTema1 />,
    2: <PracticaTema2 />,
    3: <PracticaTema3 />
  };

  return (
    <div className="practica-wrapper">
      {practicasComponentes[temaId] || <div>Práctica no disponible.</div>}
    </div>
  );
};

export default Practica;