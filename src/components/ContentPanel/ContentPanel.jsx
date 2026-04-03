import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  BookOpen,
  Wrench,
  GraduationCap,
  FileText,
  File,
  MoreVertical,
  AlertCircle
} from 'lucide-react';
import './ContentPanel.css';
import html2pdf from 'html2pdf.js';

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

// Importaciones dinámicas de componentes de Evaluación
const EvaluacionTema1 = React.lazy(() => import('../Evaluacion/Evaluacion_1'));
const EvaluacionTema2 = React.lazy(() => import('../Evaluacion/Evaluacion_2'));
const EvaluacionTema3 = React.lazy(() => import('../Evaluacion/Evaluacion_3'));
// Continuar con los demás temas hasta 45...
const EvaluacionTema4 = React.lazy(() => import('../Evaluacion/Evaluacion_4'));
const EvaluacionTema5 = React.lazy(() => import('../Evaluacion/Evaluacion_5'));
const EvaluacionTema6 = React.lazy(() => import('../Evaluacion/Evaluacion_6'));
const EvaluacionTema7 = React.lazy(() => import('../Evaluacion/Evaluacion_7'));
const EvaluacionTema8 = React.lazy(() => import('../Evaluacion/Evaluacion_8'));
const EvaluacionTema9 = React.lazy(() => import('../Evaluacion/Evaluacion_9'));
const EvaluacionTema10 = React.lazy(() => import('../Evaluacion/Evaluacion_10'));
const EvaluacionTema11 = React.lazy(() => import('../Evaluacion/Evaluacion_11'));
const EvaluacionTema12 = React.lazy(() => import('../Evaluacion/Evaluacion_12'));
const EvaluacionTema13 = React.lazy(() => import('../Evaluacion/Evaluacion_13'));
const EvaluacionTema14 = React.lazy(() => import('../Evaluacion/Evaluacion_14'));
const EvaluacionTema15 = React.lazy(() => import('../Evaluacion/Evaluacion_15'));
const EvaluacionTema16 = React.lazy(() => import('../Evaluacion/Evaluacion_16'));
const EvaluacionTema17 = React.lazy(() => import('../Evaluacion/Evaluacion_17'));
const EvaluacionTema18 = React.lazy(() => import('../Evaluacion/Evaluacion_18'));
const EvaluacionTema19 = React.lazy(() => import('../Evaluacion/Evaluacion_19'));
const EvaluacionTema20 = React.lazy(() => import('../Evaluacion/Evaluacion_20'));
const EvaluacionTema21 = React.lazy(() => import('../Evaluacion/Evaluacion_21'));
const EvaluacionTema22 = React.lazy(() => import('../Evaluacion/Evaluacion_22'));
const EvaluacionTema23 = React.lazy(() => import('../Evaluacion/Evaluacion_23'));
const EvaluacionTema24 = React.lazy(() => import('../Evaluacion/Evaluacion_24'));
const EvaluacionTema25 = React.lazy(() => import('../Evaluacion/Evaluacion_25'));
const EvaluacionTema26 = React.lazy(() => import('../Evaluacion/Evaluacion_26'));
const EvaluacionTema27 = React.lazy(() => import('../Evaluacion/Evaluacion_27'));
const EvaluacionTema28 = React.lazy(() => import('../Evaluacion/Evaluacion_28'));
const EvaluacionTema29 = React.lazy(() => import('../Evaluacion/Evaluacion_29'));
const EvaluacionTema30 = React.lazy(() => import('../Evaluacion/Evaluacion_30'));
const EvaluacionTema31 = React.lazy(() => import('../Evaluacion/Evaluacion_31'));
const EvaluacionTema32 = React.lazy(() => import('../Evaluacion/Evaluacion_32'));
const EvaluacionTema33 = React.lazy(() => import('../Evaluacion/Evaluacion_33'));
const EvaluacionTema34 = React.lazy(() => import('../Evaluacion/Evaluacion_34'));
const EvaluacionTema35 = React.lazy(() => import('../Evaluacion/Evaluacion_35'));
const EvaluacionTema36 = React.lazy(() => import('../Evaluacion/Evaluacion_36'));
const EvaluacionTema37 = React.lazy(() => import('../Evaluacion/Evaluacion_37'));
const EvaluacionTema38 = React.lazy(() => import('../Evaluacion/Evaluacion_38'));
const EvaluacionTema39 = React.lazy(() => import('../Evaluacion/Evaluacion_39'));
const EvaluacionTema40 = React.lazy(() => import('../Evaluacion/Evaluacion_40'));
const EvaluacionTema41 = React.lazy(() => import('../Evaluacion/Evaluacion_41'));
const EvaluacionTema42 = React.lazy(() => import('../Evaluacion/Evaluacion_42'));
const EvaluacionTema43 = React.lazy(() => import('../Evaluacion/Evaluacion_43'));
const EvaluacionTema44 = React.lazy(() => import('../Evaluacion/Evaluacion_44'));
const EvaluacionTema45 = React.lazy(() => import('../Evaluacion/Evaluacion_45'));

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

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidUpdate(prevProps) {
    if (this.props.resetKey !== prevProps.resetKey) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

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

  // Mapeo de componentes de Evaluación por temaId
  const componentesEvaluacion = {
    1: EvaluacionTema1,
    2: EvaluacionTema2,
    3: EvaluacionTema3,
    4: EvaluacionTema4,
    5: EvaluacionTema5,
    6: EvaluacionTema6,
    7: EvaluacionTema7,
    8: EvaluacionTema8,
    9: EvaluacionTema9,
    10: EvaluacionTema10,
    11: EvaluacionTema11,
    12: EvaluacionTema12,
    13: EvaluacionTema13,
    14: EvaluacionTema14,
    15: EvaluacionTema15,
    16: EvaluacionTema16,
    17: EvaluacionTema17,
    18: EvaluacionTema18,
    19: EvaluacionTema19,
    20: EvaluacionTema20,
    21: EvaluacionTema21,
    22: EvaluacionTema22,
    23: EvaluacionTema23,
    24: EvaluacionTema24,
    25: EvaluacionTema25,
    26: EvaluacionTema26,
    27: EvaluacionTema27,
    28: EvaluacionTema28,
    29: EvaluacionTema29,
    30: EvaluacionTema30,
    31: EvaluacionTema31,
    32: EvaluacionTema32,
    33: EvaluacionTema33,
    34: EvaluacionTema34,
    35: EvaluacionTema35,
    36: EvaluacionTema36,
    37: EvaluacionTema37,
    38: EvaluacionTema38,
    39: EvaluacionTema39,
    40: EvaluacionTema40,
    41: EvaluacionTema41,
    42: EvaluacionTema42,
    43: EvaluacionTema43,
    44: EvaluacionTema44,
    45: EvaluacionTema45
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
  const [exportandoPDF, setExportandoPDF] = useState(false);
  const [derechaWidth, setDerechaWidth] = useState(1000); // Por defecto un ancho amplio
  const contenedorPestañasRef = useRef(null);
  const areaContenidoRef = useRef(null);

  // Efecto para verificar el espacio disponible con ResizeObserver
  useEffect(() => {
    const contenedor = contenedorPestañasRef.current;
    if (!contenedor) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDerechaWidth(entry.contentRect.width);
      }
    });

    observer.observe(contenedor);

    return () => {
      observer.disconnect();
    };
  }, []);

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

  const pestañasGrupales = [
    { id: 'guia', label: 'Guía', minWidth: 65 },
    { id: 'practica', label: 'Práctica', minWidth: 80 },
    { id: 'evaluacion', label: 'Evaluacion', minWidth: 90 },
  ];

  if (temaActual) {
    pestañasGrupales.push({ id: 'pdf', label: 'PDF', minWidth: 60 });
  }

  // Calcular pestañas visibles dinámicamente según derechaWidth
  const numTabs = pestañasGrupales.length;
  let visibleCount = 0;

  for (let i = numTabs; i >= 0; i--) {
    let requiredWidth = 0;

    // Sumar anchos de las pestañas a mostrar
    for (let j = 0; j < i; j++) {
      requiredWidth += pestañasGrupales[j].minWidth;
    }

    // Ancho estimado del botón de Menú (si no caben todas)
    if (i < numTabs) {
      requiredWidth += 32;
    }

    // Calcular e incluir los gaps de flexbox (0.5rem = 8px)
    let totalElements = i + (i < numTabs ? 1 : 0);
    let totalGaps = Math.max(0, totalElements - 1) * 8;

    requiredWidth += totalGaps;

    if (derechaWidth >= requiredWidth) {
      visibleCount = i;
      break;
    }
  }

  const pestañasArrayVisibles = pestañasGrupales.slice(0, visibleCount);
  const pestañasArrayOcultas = pestañasGrupales.slice(visibleCount);

  const manejarCambioPestaña = (pestañaId) => {
    setPestañaActiva(pestañaId);
    setMenuAbierto(false);
  };

  // Listener global para evaluaciones completadas
  useEffect(() => {
    const handleEvaluacionCompletada = () => {
      if (temaActual) {
        window.dispatchEvent(new CustomEvent('avanzar-tema', { detail: { temaIdActual: temaActual.id } }));
      }
    };

    window.addEventListener('evaluacion-completada', handleEvaluacionCompletada);
    return () => window.removeEventListener('evaluacion-completada', handleEvaluacionCompletada);
  }, [temaActual]);

  // Exportar a PDF visual con html2pdf.js
  const exportarAPDF = async () => {
    if (!temaActual || !areaContenidoRef.current || exportandoPDF) return;

    try {
      setExportandoPDF(true);

      const tipoContenido = pestañaActiva === 'guia' ? 'Guia' :
        pestañaActiva === 'evaluacion' ? 'Evaluacion' : 'Practica';

      // Limpiar el nombre para el archivo
      const nombreLimpio = temaActual.nombre.replace(/[^a-zA-Z0-9]/g, '-');
      const nombreArchivo = `${nombreLimpio}-${tipoContenido}.pdf`;

      const elemento = areaContenidoRef.current;

      // Buscar el color de fondo real iterando hacia los padres para heredar el modo Claro/Oscuro
      let nodoActivo = elemento;
      let colorFondoTema = '#ffffff';
      while (nodoActivo && nodoActivo !== document) {
        const bg = window.getComputedStyle(nodoActivo).backgroundColor;
        if (bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
          colorFondoTema = bg;
          break;
        }
        nodoActivo = nodoActivo.parentNode;
      }

      const opciones = {
        margin: 0.3,
        filename: nombreArchivo,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 3,
          useCORS: true,
          letterRendering: true,
          scrollY: 0,
          backgroundColor: colorFondoTema,
          onclone: (clonedDoc) => {
            // Transfiere las clases principales ('modo-claro' / 'modo-oscuro') 
            // que residen en el elemento .aplicacion hacia el body del clon
            const appElement = document.querySelector('.aplicacion');
            if (appElement) {
              clonedDoc.body.className = appElement.className;
            }
          }
        },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        pagebreak: {
          mode: ['css', 'legacy'],
          avoid: ['.ejemplo-codigo', 'h4', 'h5', '.seccion-ejercicio', '.elemento-evaluacion', '.consejos-practica']
        }
      };

      // Iniciar exportación
      await html2pdf().set(opciones).from(elemento).save();
      toast.success('PDF generado exitosamente', { icon: '📄', duration: 3000 });

    } catch (error) {
      console.error("Error al exportar PDF:", error);
      toast.error('Hubo un error al generar el PDF.');
    } finally {
      setExportandoPDF(false);
    }
  };

  // Componente para estados no disponibles (Fallback)
  const ComponenteNoDisponible = ({ tipo }) => (
    <div className="contenido-no-disponible">
      <div className="icono-no-disponible"><AlertCircle size={48} /></div>
      <h3>{tipo} no disponible</h3>
      <p>El contenido {tipo.toLowerCase()} para este tema aún no está disponible.</p>

      <button
        className="boton-cargar-ejercicio"
        onClick={() => {
          if (temaActual) {
            window.dispatchEvent(new CustomEvent('avanzar-tema', { detail: { temaIdActual: temaActual.id } }));
          }
        }}
        style={{ marginTop: '20px', padding: '10px 20px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        Marcar como completado y Continuar <Rocket size={18} />
      </button>
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
          <BookOpen size={48} className="icono-vacio" />
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
          <ErrorBoundary resetKey={`${temaId}-guia`} fallback={<ComponenteNoDisponible tipo="Guía" />}>
            <React.Suspense fallback={<LoadingComponent />}>
              <ComponenteGuia />
            </React.Suspense>
          </ErrorBoundary>
        ) : (
          <ComponenteNoDisponible tipo="Guía" />
        );

      case 'evaluacion':
        const ComponenteEvaluacion = componentesEvaluacion[temaId];
        return ComponenteEvaluacion ? (
          <ErrorBoundary resetKey={`${temaId}-evaluacion`} fallback={<ComponenteNoDisponible tipo="Evaluación" />}>
            <React.Suspense fallback={<LoadingComponent />}>
              <ComponenteEvaluacion />
            </React.Suspense>
          </ErrorBoundary>
        ) : (
          <ComponenteNoDisponible tipo="Evaluación" />
        );

      case 'practica':
        const ComponentePractica = componentesPractica[temaId];
        return ComponentePractica ? (
          <ErrorBoundary resetKey={`${temaId}-practica`} fallback={<ComponenteNoDisponible tipo="Práctica" />}>
            <React.Suspense fallback={<LoadingComponent />}>
              <ComponentePractica />
            </React.Suspense>
          </ErrorBoundary>
        ) : (
          <ComponenteNoDisponible tipo="Práctica" />
        );

      default:
        const ComponenteDefault = componentesGuia[temaId];
        return ComponenteDefault ? (
          <ErrorBoundary resetKey={`${temaId}-default`} fallback={<ComponenteNoDisponible tipo="Guía" />}>
            <React.Suspense fallback={<LoadingComponent />}>
              <ComponenteDefault />
            </React.Suspense>
          </ErrorBoundary>
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
          <h3><BookOpen size={20} /></h3>
          {temaActual && (
            <span className="nombre-tema-activo">{temaActual.nombre}</span>
          )}
        </div>

        <div className="derecha-encabezado-panel" ref={contenedorPestañasRef}>
          {/* Pestañas normales visibles dinámicamente */}
          {pestañasArrayVisibles.length > 0 && (
            <div className="pestañas-contenido">
              {pestañasArrayVisibles.map(pestaña => {
                const Icono = pestaña.id === 'guia' ? BookOpen :
                  pestaña.id === 'practica' ? Wrench :
                    pestaña.id === 'evaluacion' ? GraduationCap : FileText;

                if (pestaña.id === 'pdf') {
                  return (
                    <button
                      key={pestaña.id}
                      className="boton-exportar-pdf"
                      onClick={exportarAPDF}
                      title="Exportar a PDF"
                      disabled={exportandoPDF}
                    >
                      {exportandoPDF ? <RefreshCw size={16} className="icono-progreso-anim" /> : <FileText size={16} />}
                      {pestaña.label}
                    </button>
                  );
                }

                return (
                  <button
                    key={pestaña.id}
                    className={`pestaña ${pestañaActiva === pestaña.id ? 'activa' : ''}`}
                    onClick={() => manejarCambioPestaña(pestaña.id)}
                  >
                    <Icono size={16} />
                    {pestaña.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Menú desplegable para pestañas ocultas */}
          {pestañasArrayOcultas.length > 0 && (
            <div className="contenedor-menu-pestañas">
              <button
                className="boton-menu"
                onClick={() => setMenuAbierto(!menuAbierto)}
                title="Menú de pestañas"
              >
                <MoreVertical size={20} />
              </button>

              {menuAbierto && (
                <div className="menu-desplegable-pestañas">
                  {pestañasArrayOcultas.map(pestaña => {
                    if (pestaña.id === 'pdf') {
                      return (
                        <button
                          key={pestaña.id}
                          className="opcion-menu"
                          onClick={() => {
                            exportarAPDF();
                            setMenuAbierto(false);
                          }}
                          disabled={exportandoPDF}
                        >
                          {exportandoPDF ? '⏳ Generando PDF...' : pestaña.label}
                        </button>
                      );
                    }
                    return (
                      <button
                        key={pestaña.id}
                        className={`opcion-menu ${pestañaActiva === pestaña.id ? 'activa' : ''}`}
                        onClick={() => manejarCambioPestaña(pestaña.id)}
                      >
                        {pestaña.label}
                      </button>
                    );
                  })}
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