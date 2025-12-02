import React, { useRef, useCallback } from 'react';
import './Resizer.css';

const Resizer = ({ 
  tipo, 
  clase, 
  disposicion,
  setDisposicion,
  panelesVisibles
}) => {
  const estaRedimensionando = useRef(false);
  const inicioPos = useRef(0);
  const disposicionInicio = useRef({});

  // Función para verificar si el resizer debe estar activo
  const estaActivo = useCallback(() => {
    const { video, content, editor, terminal } = panelesVisibles;
    
    switch(tipo) {
      case 'col':
        // Resizer vertical activo si hay al menos un panel en cada columna
        const col1Activa = video || content;
        const col2Activa = editor || terminal;
        return col1Activa && col2Activa;
      
      case 'fila1':
        // Resizer horizontal en columna 1 activo si ambos paneles están visibles
        return video && content;
      
      case 'fila2':
        // Resizer horizontal en columna 2 activo si ambos paneles están visibles
        return editor && terminal;
      
      default:
        return false;
    }
  }, [tipo, panelesVisibles]);

  const iniciarRedimension = useCallback((evento) => {
    if (!estaActivo()) return;
    
    evento.preventDefault();
    evento.stopPropagation();
    
    estaRedimensionando.current = true;
    inicioPos.current = tipo === 'col' ? evento.clientX : evento.clientY;
    disposicionInicio.current = { ...disposicion };
    
    document.addEventListener('mousemove', manejarRedimension);
    document.addEventListener('mouseup', detenerRedimension);
    
    document.body.style.userSelect = 'none';
  }, [disposicion, tipo, estaActivo]);

  const manejarRedimension = useCallback((evento) => {
    if (!estaRedimensionando.current || !estaActivo()) return;

    const contenedor = document.querySelector('.contenedor-principal-interno');
    if (!contenedor) return;

    const anchoContenedor = contenedor.offsetWidth;
    const altoContenedor = contenedor.offsetHeight;

    const posActual = tipo === 'col' ? evento.clientX : evento.clientY;
    const delta = posActual - inicioPos.current;

    let nuevaDisposicion = { ...disposicion };

    if (tipo === 'col') {
      // Redimensionamiento entre columnas
      const deltaPorcentaje = (delta / anchoContenedor) * 100;
      const nuevoCol1 = Math.max(20, Math.min(80, disposicionInicio.current.col1 + deltaPorcentaje));
      nuevaDisposicion = {
        ...nuevaDisposicion,
        col1: nuevoCol1,
        col2: 100 - nuevoCol1
      };
    } else if (tipo === 'fila1') {
      // Redimensionamiento en columna 1
      const deltaPorcentaje = (delta / altoContenedor) * 100;
      const nuevoFila1 = Math.max(20, Math.min(80, disposicionInicio.current.fila1 + deltaPorcentaje));
      nuevaDisposicion = {
        ...nuevaDisposicion,
        fila1: nuevoFila1
      };
    } else if (tipo === 'fila2') {
      // Redimensionamiento en columna 2
      const deltaPorcentaje = (delta / altoContenedor) * 100;
      const nuevoFila2 = Math.max(20, Math.min(80, disposicionInicio.current.fila2 + deltaPorcentaje));
      nuevaDisposicion = {
        ...nuevaDisposicion,
        fila2: nuevoFila2
      };
    }

    setDisposicion(nuevaDisposicion);
  }, [disposicion, setDisposicion, tipo, estaActivo]);

  const detenerRedimension = useCallback(() => {
    estaRedimensionando.current = false;
    document.removeEventListener('mousemove', manejarRedimension);
    document.removeEventListener('mouseup', detenerRedimension);
    document.body.style.userSelect = '';
  }, []);

  if (!estaActivo()) {
    return null; // No renderizar el resizer si no está activo
  }

  return (
    <div 
      className={`redimensionador ${clase || ''} ${estaActivo() ? 'activo' : 'inactivo'}`}
      onMouseDown={iniciarRedimension}
    >
      <div className="linea-redimensionador"></div>
    </div>
  );
};

export default Resizer;