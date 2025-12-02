import React, { useState, useEffect, useCallback, useRef } from 'react';
import Editor from '@monaco-editor/react';
import './EditorPanel.css';

// Ejemplos de código para diferentes lenguajes
const EJEMPLOS_CODIGO = {
  html: `<!DOCTYPE html>
<html>
<head>
    <title>Mi Página</title>
    <style>
        body { font-family: Arial; margin: 40px; }
        .container { max-width: 800px; margin: 0 auto; }
    </style>
</head>
<body>
    <div class="container">
        <h1>¡Hola Mundo!</h1>
        <p>Este es un ejemplo de HTML.</p>
        <button onclick="alert('¡Hola!')">Haz clic</button>
    </div>
</body>
</html>`,

  css: `/* Estilos CSS de ejemplo */
body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    max-width: 500px;
    text-align: center;
}

h1 {
    color: #333;
    margin-bottom: 1rem;
}

.button {
    background: #667eea;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.3s;
}

.button:hover {
    background: #764ba2;
}`,

  javascript: `// Ejemplo de JavaScript
class Persona {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }
    
    saludar() {
        console.log(\`Hola, soy \${this.nombre} y tengo \${this.edad} años\`);
    }
}

// Crear instancia
const persona1 = new Persona("Ana", 25);
persona1.saludar();

// Funciones modernas
const numeros = [1, 2, 3, 4, 5];
const duplicados = numeros.map(n => n * 2);
console.log("Números duplicados:", duplicados);

// Async/Await ejemplo
async function obtenerDatos() {
    try {
        const respuesta = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const datos = await respuesta.json();
        console.log("Datos obtenidos:", datos.name);
    } catch (error) {
        console.error("Error:", error);
    }
}

// Llamar función asíncrona
obtenerDatos();`,

  typescript: `// Ejemplo de TypeScript
interface Usuario {
    id: number;
    nombre: string;
    email: string;
    activo: boolean;
}

class GestorUsuarios {
    private usuarios: Usuario[] = [];
    
    agregarUsuario(usuario: Usuario): void {
        this.usuarios.push(usuario);
    }
    
    obtenerUsuarioPorId(id: number): Usuario | undefined {
        return this.usuarios.find(usuario => usuario.id === id);
    }
    
    listarUsuariosActivos(): Usuario[] {
        return this.usuarios.filter(usuario => usuario.activo);
    }
}

// Uso de la clase
const gestor = new GestorUsuarios();
gestor.agregarUsuario({
    id: 1,
    nombre: "Carlos",
    email: "carlos@ejemplo.com",
    activo: true
});

const usuariosActivos = gestor.listarUsuariosActivos();
console.log("Usuarios activos:", usuariosActivos);`,

  json: `{
    "curso": "JavaScript Moderno",
    "instructor": "Ana García",
    "duracion": "40 horas",
    "modulos": [
        {
            "titulo": "Fundamentos",
            "lecciones": [
                "Variables y tipos de datos",
                "Funciones y scope",
                "Arrays y objetos"
            ],
            "duracion": "8 horas"
        },
        {
            "titulo": "JavaScript Avanzado",
            "lecciones": [
                "Async/Await",
                "Programación orientada a objetos",
                "Módulos ES6"
            ],
            "duracion": "12 horas"
        }
    ],
    "requisitos": [
        "Conocimientos básicos de programación",
        "Editor de código instalado",
        "Navegador web actualizado"
    ]
}`,

  python: `# Ejemplo de Python
def calcular_fibonacci(n):
    """Calcula la secuencia de Fibonacci hasta n términos"""
    secuencia = []
    a, b = 0, 1
    for _ in range(n):
        secuencia.append(a)
        a, b = b, a + b
    return secuencia

# Uso de la función
print("Secuencia de Fibonacci:")
fib = calcular_fibonacci(10)
for i, num in enumerate(fib):
    print(f"Término {i + 1}: {num}")

# Ejemplo con list comprehension
cuadrados = [x**2 for x in range(1, 6)]
print("\\nCuadrados del 1 al 5:", cuadrados)

# Manejo de excepciones
try:
    resultado = 10 / 0
except ZeroDivisionError:
    print("\\nError: No se puede dividir por cero")`
};

// Lista de lenguajes disponibles en Monaco Editor
const LENGUAJES_DISPONIBLES = [
  { id: 'javascript', nombre: 'JavaScript', activo: true, soportado: true },
  { id: 'typescript', nombre: 'TypeScript', activo: false, soportado: true },
  { id: 'html', nombre: 'HTML', activo: true, soportado: true },
  { id: 'css', nombre: 'CSS', activo: true, soportado: true },
  { id: 'json', nombre: 'JSON', activo: true, soportado: true },
  { id: 'python', nombre: 'Python', activo: false, soportado: false },
  { id: 'java', nombre: 'Java', activo: false, soportado: false },
  { id: 'cpp', nombre: 'C++', activo: false, soportado: false },
  { id: 'csharp', nombre: 'C#', activo: false, soportado: false },
  { id: 'php', nombre: 'PHP', activo: false, soportado: false },
  { id: 'ruby', nombre: 'Ruby', activo: false, soportado: false },
  { id: 'go', nombre: 'Go', activo: false, soportado: false },
  { id: 'rust', nombre: 'Rust', activo: false, soportado: false },
  { id: 'sql', nombre: 'SQL', activo: false, soportado: false },
  { id: 'markdown', nombre: 'Markdown', activo: false, soportado: true }
];

const EditorPanel = ({
  altura,
  temaActual,
  modoOscuro,
  codigoInicial,
  onCodigoChange,
  onEjecutarCodigo,
  onLimpiarCodigo
}) => {
  const [codigo, setCodigo] = useState(codigoInicial || '// Escribe tu código aquí\nconsole.log("Hola Mundo!");');
  const [lenguajeActual, setLenguajeActual] = useState('javascript');
  const [menuIzquierdoAbierto, setMenuIzquierdoAbierto] = useState(false);
  const [menuDerechoAbierto, setMenuDerechoAbierto] = useState(false);
  const [lenguajesDisponibles, setLenguajesDisponibles] = useState(LENGUAJES_DISPONIBLES);
  const [cargando, setCargando] = useState(false);
  const [tamanoFuente, setTamanoFuente] = useState(14); // Tamaño de fuente inicial
  const menuIzquierdoRef = useRef(null);
  const menuDerechoRef = useRef(null);
  const editorRef = useRef(null);

  // ========== EFECTOS SECUNDARIOS ==========

  // Sincronizar el código cuando cambia codigoInicial
  useEffect(() => {
    if (codigoInicial && codigoInicial !== codigo) {
      setCodigo(codigoInicial);
    }
  }, [codigoInicial]);

  // Persistencia del código y tamaño de fuente
  useEffect(() => {
    localStorage.setItem('cursoJSCodigo', codigo);
  }, [codigo]);

  // Cargar tamaño de fuente guardado
  useEffect(() => {
    const tamanoGuardado = localStorage.getItem('editorFontSize');
    if (tamanoGuardado) {
      setTamanoFuente(parseInt(tamanoGuardado));
    }
  }, []);

  // Guardar tamaño de fuente cuando cambia
  useEffect(() => {
    localStorage.setItem('editorFontSize', tamanoFuente.toString());
  }, [tamanoFuente]);

  // Notificar a MainContent sobre el cambio de código inicial
  useEffect(() => {
    if (onCodigoChange && codigo) {
      onCodigoChange(codigo);
    }
  }, []);

  // Cerrar menús al hacer clic fuera
  useEffect(() => {
    const manejarClicExterno = (event) => {
      if (menuIzquierdoRef.current && !menuIzquierdoRef.current.contains(event.target)) {
        setMenuIzquierdoAbierto(false);
      }
      if (menuDerechoRef.current && !menuDerechoRef.current.contains(event.target)) {
        setMenuDerechoAbierto(false);
      }
    };

    document.addEventListener('mousedown', manejarClicExterno);
    return () => document.removeEventListener('mousedown', manejarClicExterno);
  }, []);

  // Atajos de teclado para zoom
  useEffect(() => {
    const manejarTeclaPresionada = (event) => {
      // Ctrl+ para aumentar tamaño de fuente
      if ((event.ctrlKey || event.metaKey) && event.key === '=') {
        event.preventDefault();
        aumentarTamanoFuente();
      }
      // Ctrl- para disminuir tamaño de fuente
      if ((event.ctrlKey || event.metaKey) && event.key === '-') {
        event.preventDefault();
        disminuirTamanoFuente();
      }
      // Ctrl+0 para resetear tamaño de fuente
      if ((event.ctrlKey || event.metaKey) && event.key === '0') {
        event.preventDefault();
        resetearTamanoFuente();
      }
    };

    document.addEventListener('keydown', manejarTeclaPresionada);
    return () => document.removeEventListener('keydown', manejarTeclaPresionada);
  }, [tamanoFuente]);

  // ========== FUNCIONES DE MANEJO ==========

  // Manejar cambio de código
  const manejarCambioCodigo = useCallback((nuevoCodigo) => {
    setCodigo(nuevoCodigo || '');
    if (onCodigoChange) {
      onCodigoChange(nuevoCodigo || '');
    }
  }, [onCodigoChange]);

  // Limpiar editor
  const limpiarEditor = useCallback(() => {
    const codigoLimpio = '// Escribe tu código aquí\n';
    setCodigo(codigoLimpio);
    if (onCodigoChange) {
      onCodigoChange(codigoLimpio);
    }
    if (onLimpiarCodigo) {
      onLimpiarCodigo();
    }
  }, [onCodigoChange, onLimpiarCodigo]);

  // Ejecutar código
  const manejarEjecutarCodigo = useCallback(() => {
    if (onEjecutarCodigo && codigo.trim()) {
      // Mostrar loading si el lenguaje no está soportado en terminal
      const lenguaje = lenguajesDisponibles.find(l => l.id === lenguajeActual);
      if (lenguaje && !lenguaje.soportado) {
        setCargando(true);
        setTimeout(() => setCargando(false), 1000);
      }
      onEjecutarCodigo(codigo);
    }
  }, [codigo, onEjecutarCodigo, lenguajeActual, lenguajesDisponibles]);

  // Pegar desde portapapeles
  const pegarDesdePortapapeles = useCallback(async () => {
    try {
      // Limpiar el editor primero
      limpiarEditor();
      
      // Intentar leer del portapapeles
      const texto = await navigator.clipboard.readText();
      if (texto && texto.trim()) {
        setCodigo(texto);
        if (onCodigoChange) {
          onCodigoChange(texto);
        }
      }
    } catch (error) {
      console.error('Error al pegar desde el portapapeles:', error);
      // Fallback: mostrar un prompt para pegar manualmente
      const textoManual = window.prompt(
        'No se pudo acceder al portapapeles automáticamente. Por favor, pega tu código aquí:'
      );
      if (textoManual && textoManual.trim()) {
        setCodigo(textoManual);
        if (onCodigoChange) {
          onCodigoChange(textoManual);
        }
      }
    }
  }, [limpiarEditor, onCodigoChange]);

  // Alternar estado de lenguaje
  const alternarLenguaje = useCallback((idLenguaje) => {
    setLenguajesDisponibles(prev => 
      prev.map(lenguaje => 
        lenguaje.id === idLenguaje 
          ? { ...lenguaje, activo: !lenguaje.activo }
          : lenguaje
      )
    );
  }, []);

  // Cargar ejemplo de lenguaje
  const cargarEjemplo = useCallback((idLenguaje) => {
    const ejemplo = EJEMPLOS_CODIGO[idLenguaje];
    if (ejemplo) {
      setCodigo(ejemplo);
      setLenguajeActual(idLenguaje);
      if (onCodigoChange) {
        onCodigoChange(ejemplo);
      }
      setMenuIzquierdoAbierto(false);
    }
  }, [onCodigoChange]);

  // Funciones de zoom
  const aumentarTamanoFuente = useCallback(() => {
    setTamanoFuente(prev => Math.min(prev + 1, 24)); // Máximo 24px
  }, []);

  const disminuirTamanoFuente = useCallback(() => {
    setTamanoFuente(prev => Math.max(prev - 1, 10)); // Mínimo 10px
  }, []);

  const resetearTamanoFuente = useCallback(() => {
    setTamanoFuente(14); // Tamaño por defecto
  }, []);

  // Obtener lenguajes activos
  const lenguajesActivos = lenguajesDisponibles.filter(lenguaje => lenguaje.activo);

  // Verificar si el lenguaje actual está soportado para ejecución
  const lenguajeSoportado = lenguajesDisponibles.find(l => l.id === lenguajeActual)?.soportado;

  // ========== RENDERIZADO ==========

  return (
    <div 
      className="panel panel-editor" 
      style={{ height: altura }}
    >
      <div className="encabezado-panel">
        {/* Menú Izquierdo - Lenguajes Cargados */}
        <div className="contenedor-menu-izquierdo" ref={menuIzquierdoRef}>
          <button 
            className="boton-menu"
            onClick={() => setMenuIzquierdoAbierto(!menuIzquierdoAbierto)}
            title="Lenguajes cargados"
          >
            ⋮
          </button>
          
          {menuIzquierdoAbierto && (
            <div className="menu-emergente menu-izquierdo">
              <div className="encabezado-menu">
                <h4>Lenguajes Cargados</h4>
                <span className="contador">{lenguajesActivos.length} activos</span>
              </div>
              <div className="lista-lenguajes">
                {lenguajesActivos.map(lenguaje => (
                  <button
                    key={lenguaje.id}
                    className={`item-lenguaje ${lenguajeActual === lenguaje.id ? 'activo' : ''}`}
                    onClick={() => cargarEjemplo(lenguaje.id)}
                    title={`Cargar ejemplo de ${lenguaje.nombre}`}
                  >
                    <span className="nombre-lenguaje">{lenguaje.nombre}</span>
                    <span className="badge-ejemplo">Ejemplo</span>
                    {!lenguaje.soportado && (
                      <span className="badge-no-soportado" title="No ejecutable en terminal">⚠️</span>
                    )}
                  </button>
                ))}
                {lenguajesActivos.length === 0 && (
                  <div className="sin-lenguajes">
                    No hay lenguajes activos
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="titulo-editor">
          <h3>💻</h3>
          <div className="info-lenguaje">
            <span className="lenguaje-actual">{lenguajeActual.toUpperCase()}</span>
            {!lenguajeSoportado && (
              <span className="advertencia-ejecucion" title="Este lenguaje no se puede ejecutar en la terminal">
                ⚠️ Solo vista previa
              </span>
            )}
          </div>
        </div>

        <div className="acciones-editor">
          {cargando && (
            <div className="loading-ejecucion">
              <div className="spinner"></div>
              <span>Procesando...</span>
            </div>
          )}
          
          {/* Botón para pegar desde portapapeles */}
          <button 
            className="boton-pegar-portapapeles"
            onClick={pegarDesdePortapapeles}
            title="Pegar desde portapapeles (limpia el editor primero)"
            disabled={cargando}
          >
            📋 Pegar
          </button>
          
          <div className="controles-zoom">
            <button 
              className="boton-zoom"
              onClick={disminuirTamanoFuente}
              title="Disminuir tamaño de fuente (Ctrl-)"
            >
              A-
            </button>
            <button 
              className="boton-zoom"
              onClick={resetearTamanoFuente}
              title="Tamaño de fuente por defecto (Ctrl+0)"
            >
              {tamanoFuente}px
            </button>
            <button 
              className="boton-zoom"
              onClick={aumentarTamanoFuente}
              title="Aumentar tamaño de fuente (Ctrl+)"
            >
              A+
            </button>
          </div>
          
          <button 
            className="boton-limpiar-editor"
            onClick={limpiarEditor}
            title="Limpiar editor (Ctrl+X)"
            disabled={cargando}
          >
            🗑️ 
          </button>
          <button 
            className={`boton-ejecutar ${!lenguajeSoportado ? 'no-soportado' : ''}`}
            onClick={manejarEjecutarCodigo}
            title={
              lenguajeSoportado 
                ? "Ejecutar código (Ctrl+S)" 
                : "Este lenguaje solo puede verse en el visor, no ejecutarse en terminal"
            }
            disabled={cargando || !lenguajeSoportado}
          >
            {cargando ? '⏳' : '🚀'} 
            {lenguajeSoportado ? 'Ejecutar' : ' Solo visor'}
          </button>
        </div>

        {/* Menú Derecho - Lenguajes Instalados */}
        <div className="contenedor-menu-derecho" ref={menuDerechoRef}>
          <button 
            className="boton-menu"
            onClick={() => setMenuDerechoAbierto(!menuDerechoAbierto)}
            title="Lenguajes disponibles"
          >
            ⋮
          </button>
          
          {menuDerechoAbierto && (
            <div className="menu-emergente menu-derecho">
              <div className="encabezado-menu">
                <h4>Lenguajes Disponibles</h4>
                <span className="contador">{lenguajesActivos.length}/{lenguajesDisponibles.length}</span>
              </div>
              <div className="lista-lenguajes-con-scroll">
                {lenguajesDisponibles.map(lenguaje => (
                  <div
                    key={lenguaje.id}
                    className="item-lenguaje-con-checkbox"
                  >
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={lenguaje.activo}
                        onChange={() => alternarLenguaje(lenguaje.id)}
                        disabled={lenguaje.id === 'javascript'} // JavaScript siempre activo
                      />
                      <span className="checkmark"></span>
                      <span className="nombre-lenguaje">
                        {lenguaje.nombre}
                        {lenguaje.id === 'javascript' && <span className="obligatorio"> *</span>}
                      </span>
                    </label>
                    <div className="estados-lenguaje">
                      {lenguaje.activo && (
                        <span className="badge-activo">✓</span>
                      )}
                      {!lenguaje.soportado && (
                        <span className="badge-no-soportado" title="No ejecutable en terminal">⚠️</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="leyenda-menu">
                <div className="leyenda-item">
                  <span className="badge-activo">✓</span>
                  <span>Activado</span>
                </div>
                <div className="leyenda-item">
                  <span className="badge-no-soportado">⚠️</span>
                  <span>Solo editor</span>
                </div>
                <div className="leyenda-item">
                  <span className="obligatorio">*</span>
                  <span>Obligatorio</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="contenido-panel">
        <Editor
          height="100%"
          language={lenguajeActual}
          value={codigo}
          onChange={manejarCambioCodigo}
          theme={modoOscuro ? "vs-dark" : "vs"}
          loading={cargando ? <div className="editor-loading">Cargando editor...</div> : null}
          options={{
            minimap: { enabled: false },
            fontSize: tamanoFuente, // Tamaño de fuente dinámico
            automaticLayout: true,
            scrollBeyondLastLine: false,
            suggestOnTriggerCharacters: true,
            wordBasedSuggestions: true,
            tabSize: 2,
            insertSpaces: true,
            detectIndentation: true,
            trimAutoWhitespace: true,
            formatOnPaste: true,
            formatOnType: true,
            folding: true,
            foldingHighlight: true,
            showFoldingControls: 'mouseover',
            matchBrackets: 'always',
            occurrencesHighlight: true,
            selectionHighlight: true,
            renderLineHighlight: 'all',
            wordWrap: 'on',
            lineNumbers: 'on',
            glyphMargin: true,
            readOnly: cargando
          }}
          onMount={(editor, monaco) => {
            editor.focus();
            editorRef.current = editor;
            monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
          }}
        />
      </div>
    </div>
  );
};

export default EditorPanel;