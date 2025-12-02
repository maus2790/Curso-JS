import React, { useState, useRef, useEffect } from 'react';
import './ContentPanel.css';

// Importaciones dinámicas de componentes de Guía
const GuiaTema1 = React.lazy(() => import('../Guia/Guia_1'));
const GuiaTema2 = React.lazy(() => import('../Guia/Guia_2'));
const GuiaTema3 = React.lazy(() => import('../Guia/Guia_3'));
const GuiaTema4 = React.lazy(() => import('../Guia/Guia_4'));
const GuiaTema5 = React.lazy(() => import('../Guia/Guia_5'));
// Continuar con los demás temas hasta 45...
const GuiaTema6 = React.lazy(() => import('../Guia/Guia_6'));
const GuiaTema7 = React.lazy(() => import('../Guia/Guia_7'));
const GuiaTema8 = React.lazy(() => import('../Guia/Guia_8'));
const GuiaTema9 = React.lazy(() => import('../Guia/Guia_9'));
const GuiaTema10 = React.lazy(() => import('../Guia/Guia_10'));
const GuiaTema11 = React.lazy(() => import('../Guia/Guia_11'));
const GuiaTema12 = React.lazy(() => import('../Guia/Guia_12'));
const GuiaTema13 = React.lazy(() => import('../Guia/Guia_13'));
const GuiaTema14 = React.lazy(() => import('../Guia/Guia_14'));
const GuiaTema15 = React.lazy(() => import('../Guia/Guia_15'));
const GuiaTema16 = React.lazy(() => import('../Guia/Guia_16'));
const GuiaTema17 = React.lazy(() => import('../Guia/Guia_17'));
const GuiaTema18 = React.lazy(() => import('../Guia/Guia_18'));
const GuiaTema19 = React.lazy(() => import('../Guia/Guia_19'));
const GuiaTema20 = React.lazy(() => import('../Guia/Guia_20'));
const GuiaTema21 = React.lazy(() => import('../Guia/Guia_21'));
const GuiaTema22 = React.lazy(() => import('../Guia/Guia_22'));
const GuiaTema23 = React.lazy(() => import('../Guia/Guia_23'));
const GuiaTema24 = React.lazy(() => import('../Guia/Guia_24'));
const GuiaTema25 = React.lazy(() => import('../Guia/Guia_25'));
const GuiaTema26 = React.lazy(() => import('../Guia/Guia_26'));
const GuiaTema27 = React.lazy(() => import('../Guia/Guia_27'));
const GuiaTema28 = React.lazy(() => import('../Guia/Guia_28'));
const GuiaTema29 = React.lazy(() => import('../Guia/Guia_29'));
const GuiaTema30 = React.lazy(() => import('../Guia/Guia_30'));
const GuiaTema31 = React.lazy(() => import('../Guia/Guia_31'));
const GuiaTema32 = React.lazy(() => import('../Guia/Guia_32'));
const GuiaTema33 = React.lazy(() => import('../Guia/Guia_33'));
const GuiaTema34 = React.lazy(() => import('../Guia/Guia_34'));
const GuiaTema35 = React.lazy(() => import('../Guia/Guia_35'));
const GuiaTema36 = React.lazy(() => import('../Guia/Guia_36'));
const GuiaTema37 = React.lazy(() => import('../Guia/Guia_37'));
const GuiaTema38 = React.lazy(() => import('../Guia/Guia_38'));
const GuiaTema39 = React.lazy(() => import('../Guia/Guia_39'));
const GuiaTema40 = React.lazy(() => import('../Guia/Guia_40'));
const GuiaTema41 = React.lazy(() => import('../Guia/Guia_41'));
const GuiaTema42 = React.lazy(() => import('../Guia/Guia_42'));
const GuiaTema43 = React.lazy(() => import('../Guia/Guia_43'));
const GuiaTema44 = React.lazy(() => import('../Guia/Guia_44'));
const GuiaTema45 = React.lazy(() => import('../Guia/Guia_45'));

// Importaciones dinámicas de componentes de Cuestionario
const CuestionarioTema1 = React.lazy(() => import('../Cuestionario/Cuestionario_1'));
const CuestionarioTema2 = React.lazy(() => import('../Cuestionario/Cuestionario_2'));
const CuestionarioTema3 = React.lazy(() => import('../Cuestionario/Cuestionario_3'));
// Continuar con los demás temas hasta 45...
const CuestionarioTema4 = React.lazy(() => import('../Cuestionario/Cuestionario_4'));
const CuestionarioTema5 = React.lazy(() => import('../Cuestionario/Cuestionario_5'));
const CuestionarioTema6 = React.lazy(() => import('../Cuestionario/Cuestionario_6'));
const CuestionarioTema7 = React.lazy(() => import('../Cuestionario/Cuestionario_7'));
const CuestionarioTema8 = React.lazy(() => import('../Cuestionario/Cuestionario_8'));
const CuestionarioTema9 = React.lazy(() => import('../Cuestionario/Cuestionario_9'));
const CuestionarioTema10 = React.lazy(() => import('../Cuestionario/Cuestionario_10'));
const CuestionarioTema11 = React.lazy(() => import('../Cuestionario/Cuestionario_11'));
const CuestionarioTema12 = React.lazy(() => import('../Cuestionario/Cuestionario_12'));
const CuestionarioTema13 = React.lazy(() => import('../Cuestionario/Cuestionario_13'));
const CuestionarioTema14 = React.lazy(() => import('../Cuestionario/Cuestionario_14'));
const CuestionarioTema15 = React.lazy(() => import('../Cuestionario/Cuestionario_15'));
const CuestionarioTema16 = React.lazy(() => import('../Cuestionario/Cuestionario_16'));
const CuestionarioTema17 = React.lazy(() => import('../Cuestionario/Cuestionario_17'));
const CuestionarioTema18 = React.lazy(() => import('../Cuestionario/Cuestionario_18'));
const CuestionarioTema19 = React.lazy(() => import('../Cuestionario/Cuestionario_19'));
const CuestionarioTema20 = React.lazy(() => import('../Cuestionario/Cuestionario_20'));
const CuestionarioTema21 = React.lazy(() => import('../Cuestionario/Cuestionario_21'));
const CuestionarioTema22 = React.lazy(() => import('../Cuestionario/Cuestionario_22'));
const CuestionarioTema23 = React.lazy(() => import('../Cuestionario/Cuestionario_23'));
const CuestionarioTema24 = React.lazy(() => import('../Cuestionario/Cuestionario_24'));
const CuestionarioTema25 = React.lazy(() => import('../Cuestionario/Cuestionario_25'));
const CuestionarioTema26 = React.lazy(() => import('../Cuestionario/Cuestionario_26'));
const CuestionarioTema27 = React.lazy(() => import('../Cuestionario/Cuestionario_27'));
const CuestionarioTema28 = React.lazy(() => import('../Cuestionario/Cuestionario_28'));
const CuestionarioTema29 = React.lazy(() => import('../Cuestionario/Cuestionario_29'));
const CuestionarioTema30 = React.lazy(() => import('../Cuestionario/Cuestionario_30'));
const CuestionarioTema31 = React.lazy(() => import('../Cuestionario/Cuestionario_31'));
const CuestionarioTema32 = React.lazy(() => import('../Cuestionario/Cuestionario_32'));
const CuestionarioTema33 = React.lazy(() => import('../Cuestionario/Cuestionario_33'));
const CuestionarioTema34 = React.lazy(() => import('../Cuestionario/Cuestionario_34'));
const CuestionarioTema35 = React.lazy(() => import('../Cuestionario/Cuestionario_35'));
const CuestionarioTema36 = React.lazy(() => import('../Cuestionario/Cuestionario_36'));
const CuestionarioTema37 = React.lazy(() => import('../Cuestionario/Cuestionario_37'));
const CuestionarioTema38 = React.lazy(() => import('../Cuestionario/Cuestionario_38'));
const CuestionarioTema39 = React.lazy(() => import('../Cuestionario/Cuestionario_39'));
const CuestionarioTema40 = React.lazy(() => import('../Cuestionario/Cuestionario_40'));
const CuestionarioTema41 = React.lazy(() => import('../Cuestionario/Cuestionario_41'));
const CuestionarioTema42 = React.lazy(() => import('../Cuestionario/Cuestionario_42'));
const CuestionarioTema43 = React.lazy(() => import('../Cuestionario/Cuestionario_43'));
const CuestionarioTema44 = React.lazy(() => import('../Cuestionario/Cuestionario_44'));
const CuestionarioTema45 = React.lazy(() => import('../Cuestionario/Cuestionario_45'));

// Importaciones dinámicas de componentes de Práctica
const PracticaTema1 = React.lazy(() => import('../Practica/Practica_1'));
const PracticaTema2 = React.lazy(() => import('../Practica/Practica_2'));
const PracticaTema3 = React.lazy(() => import('../Practica/Practica_3'));
// Continuar con los demás temas hasta 45...
const PracticaTema4 = React.lazy(() => import('../Practica/Practica_4'));
const PracticaTema5 = React.lazy(() => import('../Practica/Practica_5'));
const PracticaTema6 = React.lazy(() => import('../Practica/Practica_6'));
const PracticaTema7 = React.lazy(() => import('../Practica/Practica_7'));
const PracticaTema8 = React.lazy(() => import('../Practica/Practica_8'));
const PracticaTema9 = React.lazy(() => import('../Practica/Practica_9'));
const PracticaTema10 = React.lazy(() => import('../Practica/Practica_10'));
const PracticaTema11 = React.lazy(() => import('../Practica/Practica_11'));
const PracticaTema12 = React.lazy(() => import('../Practica/Practica_12'));
const PracticaTema13 = React.lazy(() => import('../Practica/Practica_13'));
const PracticaTema14 = React.lazy(() => import('../Practica/Practica_14'));
const PracticaTema15 = React.lazy(() => import('../Practica/Practica_15'));
const PracticaTema16 = React.lazy(() => import('../Practica/Practica_16'));
const PracticaTema17 = React.lazy(() => import('../Practica/Practica_17'));
const PracticaTema18 = React.lazy(() => import('../Practica/Practica_18'));
const PracticaTema19 = React.lazy(() => import('../Practica/Practica_19'));
const PracticaTema20 = React.lazy(() => import('../Practica/Practica_20'));
const PracticaTema21 = React.lazy(() => import('../Practica/Practica_21'));
const PracticaTema22 = React.lazy(() => import('../Practica/Practica_22'));
const PracticaTema23 = React.lazy(() => import('../Practica/Practica_23'));
const PracticaTema24 = React.lazy(() => import('../Practica/Practica_24'));
const PracticaTema25 = React.lazy(() => import('../Practica/Practica_25'));
const PracticaTema26 = React.lazy(() => import('../Practica/Practica_26'));
const PracticaTema27 = React.lazy(() => import('../Practica/Practica_27'));
const PracticaTema28 = React.lazy(() => import('../Practica/Practica_28'));
const PracticaTema29 = React.lazy(() => import('../Practica/Practica_29'));
const PracticaTema30 = React.lazy(() => import('../Practica/Practica_30'));
const PracticaTema31 = React.lazy(() => import('../Practica/Practica_31'));
const PracticaTema32 = React.lazy(() => import('../Practica/Practica_32'));
const PracticaTema33 = React.lazy(() => import('../Practica/Practica_33'));
const PracticaTema34 = React.lazy(() => import('../Practica/Practica_34'));
const PracticaTema35 = React.lazy(() => import('../Practica/Practica_35'));
const PracticaTema36 = React.lazy(() => import('../Practica/Practica_36'));
const PracticaTema37 = React.lazy(() => import('../Practica/Practica_37'));
const PracticaTema38 = React.lazy(() => import('../Practica/Practica_38'));
const PracticaTema39 = React.lazy(() => import('../Practica/Practica_39'));
const PracticaTema40 = React.lazy(() => import('../Practica/Practica_40'));
const PracticaTema41 = React.lazy(() => import('../Practica/Practica_41'));
const PracticaTema42 = React.lazy(() => import('../Practica/Practica_42'));
const PracticaTema43 = React.lazy(() => import('../Practica/Practica_43'));
const PracticaTema44 = React.lazy(() => import('../Practica/Practica_44'));
const PracticaTema45 = React.lazy(() => import('../Practica/Practica_45'));

const ContentPanel = ({
  altura,
  temaActual,
  pestañaActiva,
  setPestañaActiva,
  disposicion
}) => {
  // Mapeo de componentes de Guía por temaId
  const componentesGuia = {
    1: GuiaTema1,
    2: GuiaTema2,
    3: GuiaTema3,
    4: GuiaTema4,
    5: GuiaTema5,
    6: GuiaTema6,
    7: GuiaTema7,
    8: GuiaTema8,
    9: GuiaTema9,
    10: GuiaTema10,
    11: GuiaTema11,
    12: GuiaTema12,
    13: GuiaTema13,
    14: GuiaTema14,
    15: GuiaTema15,
    16: GuiaTema16,
    17: GuiaTema17,
    18: GuiaTema18,
    19: GuiaTema19,
    20: GuiaTema20,
    21: GuiaTema21,
    22: GuiaTema22,
    23: GuiaTema23,
    24: GuiaTema24,
    25: GuiaTema25,
    26: GuiaTema26,
    27: GuiaTema27,
    28: GuiaTema28,
    29: GuiaTema29,
    30: GuiaTema30,
    31: GuiaTema31,
    32: GuiaTema32,
    33: GuiaTema33,
    34: GuiaTema34,
    35: GuiaTema35,
    36: GuiaTema36,
    37: GuiaTema37,
    38: GuiaTema38,
    39: GuiaTema39,
    40: GuiaTema40,
    41: GuiaTema41,
    42: GuiaTema42,
    43: GuiaTema43,
    44: GuiaTema44,
    45: GuiaTema45
  };

  // Mapeo de componentes de Cuestionario por temaId
  const componentesCuestionario = {
    1: CuestionarioTema1,
    2: CuestionarioTema2,
    3: CuestionarioTema3,
    4: CuestionarioTema4,
    5: CuestionarioTema5,
    6: CuestionarioTema6,
    7: CuestionarioTema7,
    8: CuestionarioTema8,
    9: CuestionarioTema9,
    10: CuestionarioTema10,
    11: CuestionarioTema11,
    12: CuestionarioTema12,
    13: CuestionarioTema13,
    14: CuestionarioTema14,
    15: CuestionarioTema15,
    16: CuestionarioTema16,
    17: CuestionarioTema17,
    18: CuestionarioTema18,
    19: CuestionarioTema19,
    20: CuestionarioTema20,
    21: CuestionarioTema21,
    22: CuestionarioTema22,
    23: CuestionarioTema23,
    24: CuestionarioTema24,
    25: CuestionarioTema25,
    26: CuestionarioTema26,
    27: CuestionarioTema27,
    28: CuestionarioTema28,
    29: CuestionarioTema29,
    30: CuestionarioTema30,
    31: CuestionarioTema31,
    32: CuestionarioTema32,
    33: CuestionarioTema33,
    34: CuestionarioTema34,
    35: CuestionarioTema35,
    36: CuestionarioTema36,
    37: CuestionarioTema37,
    38: CuestionarioTema38,
    39: CuestionarioTema39,
    40: CuestionarioTema40,
    41: CuestionarioTema41,
    42: CuestionarioTema42,
    43: CuestionarioTema43,
    44: CuestionarioTema44,
    45: CuestionarioTema45
  };

  // Mapeo de componentes de Práctica por temaId
  const componentesPractica = {
    1: PracticaTema1,
    2: PracticaTema2,
    3: PracticaTema3,
    4: PracticaTema4,
    5: PracticaTema5,
    6: PracticaTema6,
    7: PracticaTema7,
    8: PracticaTema8,
    9: PracticaTema9,
    10: PracticaTema10,
    11: PracticaTema11,
    12: PracticaTema12,
    13: PracticaTema13,
    14: PracticaTema14,
    15: PracticaTema15,
    16: PracticaTema16,
    17: PracticaTema17,
    18: PracticaTema18,
    19: PracticaTema19,
    20: PracticaTema20,
    21: PracticaTema21,
    22: PracticaTema22,
    23: PracticaTema23,
    24: PracticaTema24,
    25: PracticaTema25,
    26: PracticaTema26,
    27: PracticaTema27,
    28: PracticaTema28,
    29: PracticaTema29,
    30: PracticaTema30,
    31: PracticaTema31,
    32: PracticaTema32,
    33: PracticaTema33,
    34: PracticaTema34,
    35: PracticaTema35,
    36: PracticaTema36,
    37: PracticaTema37,
    38: PracticaTema38,
    39: PracticaTema39,
    40: PracticaTema40,
    41: PracticaTema41,
    42: PracticaTema42,
    43: PracticaTema43,
    44: PracticaTema44,
    45: PracticaTema45
  };

  // Estado para controlar el menú desplegable
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [pestañasVisibles, setPestañasVisibles] = useState(true);
  const contenedorPestañasRef = useRef(null);
  const pestañasRef = useRef(null);
  const areaContenidoRef = useRef(null);

  // Efecto para verificar el espacio disponible
  useEffect(() => {
    const verificarEspacio = () => {
      if (!contenedorPestañasRef.current || !pestañasRef.current) return;

      const anchoContenedor = contenedorPestañasRef.current.offsetWidth;
      const anchoPestañas = pestañasRef.current.scrollWidth;
      const anchoBotonPDF = 80; // Ancho aproximado del botón PDF
      const anchoBotonMenu = 32; // Ancho del botón de menú
      const espacioNecesario = anchoPestañas + anchoBotonPDF + anchoBotonMenu + 30; // +30px de margen

      // Si no hay espacio suficiente, ocultar pestañas y mostrar menú
      setPestañasVisibles(anchoContenedor >= espacioNecesario);
    };

    // Verificar espacio inmediatamente
    verificarEspacio();

    // Agregar un pequeño delay para asegurar que el DOM se haya actualizado
    const timeoutId = setTimeout(verificarEspacio, 100);

    // Event listeners
    window.addEventListener('resize', verificarEspacio);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', verificarEspacio);
    };
  }, [temaActual, disposicion]);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const manejarClicExterior = (evento) => {
      if (menuAbierto && !evento.target.closest('.contenedor-menu-pestañas')) {
        setMenuAbierto(false);
      }
    };

    document.addEventListener('mousedown', manejarClicExterior);
    return () => {
      document.removeEventListener('mousedown', manejarClicExterior);
    };
  }, [menuAbierto]);

  const pestañas = [
    { id: 'guia', label: '📖 Guía' },
    { id: 'evaluacion', label: '📝 Evaluacion' },
    { id: 'practica', label: '🛠️ Práctica' }
  ];

  const manejarCambioPestaña = (pestañaId) => {
    setPestañaActiva(pestañaId);
    setMenuAbierto(false);
  };

  // Exportar a PDF con el contenido actual
  const exportarAPDF = () => {
    if (!temaActual) return;

    const tipoContenido = pestañaActiva === 'guia' ? 'Guía' : 
                         pestañaActiva === 'evaluacion' ? 'evaluacion' : 'Práctica';
    
    // Obtener el contenido del área de contenido
    const contenido = areaContenidoRef.current?.innerText || 
                     `Contenido de ${tipoContenido} para ${temaActual.nombre}`;

    const contenidoCompleto = `
      ${temaActual.nombre} - ${tipoContenido}
      
      ${contenido}
      
      Exportado el: ${new Date().toLocaleDateString()}
      Hora: ${new Date().toLocaleTimeString()}
    `;
    
    // Crear y descargar el archivo
    const blob = new Blob([contenidoCompleto], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${temaActual.nombre}-${tipoContenido}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert(`${tipoContenido} de "${temaActual.nombre}" exportado correctamente`);
  };

  // Componente de contenido no disponible
  const ComponenteNoDisponible = ({ tipo }) => (
    <div className="contenido-no-disponible">
      <div className="icono-no-disponible">📄</div>
      <h3>{tipo} no disponible</h3>
      <p>El contenido {tipo.toLowerCase()} para este tema aún no está disponible.</p>
    </div>
  );

  // Componente de carga
  const LoadingComponent = () => (
    <div className="cargando-contenido">
      <div className="spinner"></div>
      <p>Cargando contenido del tema...</p>
    </div>
  );

  // Renderizar el componente según la pestaña activa y el tema
  const renderizarContenido = () => {
    if (!temaActual) {
      return (
        <div className="contenido-vacio">
          <h3>Selecciona un tema para comenzar</h3>
          <p>Elige un tema del sidebar para ver su contenido educativo.</p>
        </div>
      );
    }

    const temaId = temaActual.id;

    switch (pestañaActiva) {
      case 'guia':
        const ComponenteGuia = componentesGuia[temaId];
        return ComponenteGuia ? (
          <React.Suspense fallback={<LoadingComponent />}>
            <ComponenteGuia />
          </React.Suspense>
        ) : (
          <ComponenteNoDisponible tipo="Guía" />
        );

      case 'evaluacion':
        const ComponenteCuestionario = componentesCuestionario[temaId];
        return ComponenteCuestionario ? (
          <React.Suspense fallback={<LoadingComponent />}>
            <ComponenteCuestionario />
          </React.Suspense>
        ) : (
          <ComponenteNoDisponible tipo="Cuestionario" />
        );

      case 'practica':
        const ComponentePractica = componentesPractica[temaId];
        return ComponentePractica ? (
          <React.Suspense fallback={<LoadingComponent />}>
            <ComponentePractica />
          </React.Suspense>
        ) : (
          <ComponenteNoDisponible tipo="Práctica" />
        );

      default:
        const ComponenteDefault = componentesGuia[temaId];
        return ComponenteDefault ? (
          <React.Suspense fallback={<LoadingComponent />}>
            <ComponenteDefault />
          </React.Suspense>
        ) : (
          <ComponenteNoDisponible tipo="Guía" />
        );
    }
  };

  return (
    <div 
      className="panel panel-contenido" 
      style={{ height: altura }}
    >
      <div className="encabezado-panel">
        <div className="izquierda-encabezado-panel">
          <h3>📚</h3>
          {temaActual && (
            <span className="nombre-tema-activo">{temaActual.nombre}</span>
          )}
        </div>
        
        <div className="derecha-encabezado-panel" ref={contenedorPestañasRef}>
          {/* Pestañas normales (cuando hay espacio) */}
          {pestañasVisibles ? (
            <div className="pestañas-contenido" ref={pestañasRef}>
              {pestañas.map(pestaña => (
                <button 
                  key={pestaña.id}
                  className={`pestaña ${pestañaActiva === pestaña.id ? 'activa' : ''}`}
                  onClick={() => manejarCambioPestaña(pestaña.id)}
                >
                  {pestaña.label}
                </button>
              ))}
            </div>
          ) : null}
          
          {/* Botón PDF siempre visible */}
          {temaActual && (
            <button 
              className="boton-exportar-pdf"
              onClick={exportarAPDF}
              title="Exportar a PDF"
            >
              📄 PDF
            </button>
          )}

          {/* Menú desplegable (cuando no hay espacio) - ahora a la derecha del PDF */}
          {!pestañasVisibles && (
            <div className="contenedor-menu-pestañas">
              <button 
                className="boton-menu"
                onClick={() => setMenuAbierto(!menuAbierto)}
                title="Menú de pestañas"
              >
                ⋮
              </button>
              
              {menuAbierto && (
                <div className="menu-desplegable-pestañas">
                  {pestañas.map(pestaña => (
                    <button 
                      key={pestaña.id}
                      className={`opcion-menu ${pestañaActiva === pestaña.id ? 'activa' : ''}`}
                      onClick={() => manejarCambioPestaña(pestaña.id)}
                    >
                      {pestaña.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="contenido-panel">
        <div className="area-contenido" ref={areaContenidoRef}>
          {renderizarContenido()}
        </div>
      </div>
    </div>
  );
};

export default ContentPanel;