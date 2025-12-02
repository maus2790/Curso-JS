import React, { useState } from 'react';
import './Guias.css';

const Guia_8_1 = () => {
  const [copiado, setCopiado] = useState(null);

  const copiarCodigo = (codigo, id) => {
    navigator.clipboard.writeText(codigo);
    setCopiado(id);
    setTimeout(() => setCopiado(null), 2000);
  };

  const ejemplosCodigo = {
    ejemplo1: `<!DOCTYPE html>
<html>
<head>
    <title>Exploración del DOM</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .container {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .dom-node {
            margin: 10px 0;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background: #f9f9f9;
        }
        .node-info {
            font-family: 'Courier New', monospace;
            background: #2d2d2d;
            color: #f8f8f2;
            padding: 10px;
            border-radius: 4px;
            margin: 10px 0;
            overflow-x: auto;
        }
        button {
            background: #007bff;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 4px;
            cursor: pointer;
            margin: 5px;
        }
        button:hover {
            background: #0056b3;
        }
        .resultado {
            margin-top: 15px;
            padding: 15px;
            background: #e9ecef;
            border-radius: 4px;
            border-left: 4px solid #007bff;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Exploración de la Estructura DOM</h1>
        
        <div class="dom-node">
            <h2>Nodo Document (Raíz)</h2>
            <button onclick="mostrarDocumentInfo()">Mostrar Info del Document</button>
        </div>

        <div class="dom-node">
            <h2>Elemento HTML</h2>
            <button onclick="mostrarHtmlInfo()">Mostrar Info del HTML</button>
        </div>

        <div class="dom-node">
            <h2>Elemento Body</h2>
            <button onclick="mostrarBodyInfo()">Mostrar Info del Body</button>
        </div>

        <div class="dom-node">
            <h2>Tipos de Nodos</h2>
            <button onclick="mostrarTiposNodos()">Mostrar Tipos de Nodos</button>
        </div>

        <div id="resultado" class="resultado">
            <!-- Aquí se mostrarán los resultados -->
        </div>
    </div>
</body>
<script>
    function mostrarDocumentInfo() {
        const resultado = document.getElementById('resultado');
        resultado.innerHTML = \`
            <h3>Información del Document:</h3>
            <div class="node-info">
                document.nodeType: \${document.nodeType}<br>
                document.nodeName: "\${document.nodeName}"<br>
                document.documentElement: \${document.documentElement.tagName}<br>
                document.head: \${document.head.tagName}<br>
                document.body: \${document.body.tagName}<br>
                document.title: "\${document.title}"<br>
                document.URL: "\${document.URL}"<br>
                document.characterSet: "\${document.characterSet}"
            </div>
        \`;
    }

    function mostrarHtmlInfo() {
        const htmlElement = document.documentElement;
        const resultado = document.getElementById('resultado');
        resultado.innerHTML = \`
            <h3>Información del Elemento HTML:</h3>
            <div class="node-info">
                nodeType: \${htmlElement.nodeType} (ELEMENT_NODE)<br>
                nodeName: "\${htmlElement.nodeName}"<br>
                tagName: "\${htmlElement.tagName}"<br>
                parentNode: \${htmlElement.parentNode.nodeName}<br>
                childNodes.length: \${htmlElement.childNodes.length}<br>
                firstChild: \${htmlElement.firstChild.nodeName}<br>
                lastChild: \${htmlElement.lastChild.nodeName}
            </div>
        \`;
    }

    function mostrarBodyInfo() {
        const body = document.body;
        const resultado = document.getElementById('resultado');
        resultado.innerHTML = \`
            <h3>Información del Elemento Body:</h3>
            <div class="node-info">
                nodeType: \${body.nodeType}<br>
                nodeName: "\${body.nodeName}"<br>
                tagName: "\${body.tagName}"<br>
                innerHTML (primeros 200 chars): "\${body.innerHTML.substring(0, 200)}..."<br>
                childNodes.length: \${body.childNodes.length}<br>
                children.length: \${body.children.length}<br>
                className: "\${body.className}"<br>
                id: "\${body.id}"
            </div>
        \`;
    }

    function mostrarTiposNodos() {
        const resultado = document.getElementById('resultado');
        resultado.innerHTML = \`
            <h3>Tipos de Nodos del DOM:</h3>
            <div class="node-info">
                ELEMENT_NODE: \${Node.ELEMENT_NODE} (1)<br>
                ATTRIBUTE_NODE: \${Node.ATTRIBUTE_NODE} (2)<br>
                TEXT_NODE: \${Node.TEXT_NODE} (3)<br>
                CDATA_SECTION_NODE: \${Node.CDATA_SECTION_NODE} (4)<br>
                ENTITY_REFERENCE_NODE: \${Node.ENTITY_REFERENCE_NODE} (5)<br>
                ENTITY_NODE: \${Node.ENTITY_NODE} (6)<br>
                PROCESSING_INSTRUCTION_NODE: \${Node.PROCESSING_INSTRUCTION_NODE} (7)<br>
                COMMENT_NODE: \${Node.COMMENT_NODE} (8)<br>
                DOCUMENT_NODE: \${Node.DOCUMENT_NODE} (9)<br>
                DOCUMENT_TYPE_NODE: \${Node.DOCUMENT_TYPE_NODE} (10)<br>
                DOCUMENT_FRAGMENT_NODE: \${Node.DOCUMENT_FRAGMENT_NODE} (11)
            </div>
        \`;
    }
</script>
</html>`,

    ejemplo2: `<!DOCTYPE html>
<html>
<head>
    <title>Métodos de Selección del DOM</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
            background: #f0f2f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .demo-section {
            margin: 25px 0;
            padding: 20px;
            border: 2px solid #e9ecef;
            border-radius: 8px;
        }
        .elements-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin: 15px 0;
        }
        .element {
            padding: 15px;
            border: 1px solid #dee2e6;
            border-radius: 6px;
            text-align: center;
            background: #f8f9fa;
            transition: all 0.3s ease;
        }
        .element:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
        .element.highlight {
            background: #fff3cd;
            border-color: #ffeaa7;
        }
        .element.selected {
            background: #d1ecf1;
            border-color: #bee5eb;
        }
        button {
            background: #28a745;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin: 5px;
            font-size: 14px;
            transition: background 0.3s ease;
        }
        button:hover {
            background: #218838;
        }
        button.reset {
            background: #dc3545;
        }
        button.reset:hover {
            background: #c82333;
        }
        .code-block {
            background: #2d2d2d;
            color: #f8f8f2;
            padding: 15px;
            border-radius: 6px;
            margin: 15px 0;
            font-family: 'Fira Code', monospace;
            overflow-x: auto;
        }
        .results {
            margin-top: 20px;
            padding: 20px;
            background: #e7f3ff;
            border-radius: 6px;
            border-left: 4px solid #007bff;
        }
        .method-group {
            margin: 20px 0;
        }
        .method-group h4 {
            color: #495057;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Métodos de Selección del DOM</h1>
        <p>Explora los diferentes métodos para seleccionar elementos en el DOM</p>

        <!-- Estructura de prueba -->
        <div class="demo-section">
            <h2>Estructura de Prueba</h2>
            <div class="elements-grid">
                <div id="header" class="element">
                    <h3>Header</h3>
                    <p>ID: header</p>
                </div>
                <div class="main-content element">
                    <h3>Main Content</h3>
                    <p>Class: main-content</p>
                    <div class="nested">
                        <p class="text-item">Texto nested 1</p>
                        <p class="text-item">Texto nested 2</p>
                    </div>
                </div>
                <div class="sidebar element">
                    <h3>Sidebar</h3>
                    <p>Class: sidebar</p>
                </div>
                <div class="footer element" data-category="layout">
                    <h3>Footer</h3>
                    <p>Class: footer + data-category</p>
                </div>
            </div>
        </div>

        <!-- Métodos de Selección -->
        <div class="demo-section">
            <h2>Métodos de Selección</h2>
            
            <div class="method-group">
                <h4>getElementById</h4>
                <button onclick="seleccionarPorId()">Seleccionar #header</button>
                <div class="code-block">
document.getElementById('header')
                </div>
            </div>

            <div class="method-group">
                <h4>getElementsByClassName</h4>
                <button onclick="seleccionarPorClase()">Seleccionar .element</button>
                <div class="code-block">
document.getElementsByClassName('element')
                </div>
            </div>

            <div class="method-group">
                <h4>getElementsByTagName</h4>
                <button onclick="seleccionarPorTag()">Seleccionar &lt;p&gt;</button>
                <div class="code-block">
document.getElementsByTagName('p')
                </div>
            </div>

            <div class="method-group">
                <h4>querySelector</h4>
                <button onclick="seleccionarQueryUno()">Seleccionar .footer</button>
                <button onclick="seleccionarQueryDos()">Seleccionar [data-category]</button>
                <div class="code-block">
document.querySelector('.footer')
document.querySelector('[data-category]')
                </div>
            </div>

            <div class="method-group">
                <h4>querySelectorAll</h4>
                <button onclick="seleccionarQueryAll()">Seleccionar .text-item</button>
                <button onclick="seleccionarQueryComplejo()">Seleccionar h3 + p</button>
                <div class="code-block">
document.querySelectorAll('.text-item')
document.querySelectorAll('h3 + p')
                </div>
            </div>

            <div class="method-group">
                <button class="reset" onclick="resetSeleccion()">Resetear Selección</button>
            </div>
        </div>

        <div id="resultados" class="results">
            <h3>Resultados de Selección:</h3>
            <div id="output">Haz clic en los botones para ver los resultados...</div>
        </div>
    </div>
</body>
<script>
    function seleccionarPorId() {
        resetSeleccion();
        const elemento = document.getElementById('header');
        elemento.classList.add('selected');
        mostrarResultado(\`
            <strong>getElementById('header'):</strong><br>
            Tipo: \${elemento.constructor.name}<br>
            Elemento: \${elemento.outerHTML}<br>
            Cantidad: 1 elemento único
        \`);
    }

    function seleccionarPorClase() {
        resetSeleccion();
        const elementos = document.getElementsByClassName('element');
        Array.from(elementos).forEach(el => el.classList.add('highlight'));
        mostrarResultado(\`
            <strong>getElementsByClassName('element'):</strong><br>
            Tipo: \${elementos.constructor.name} (HTMLCollection)<br>
            Cantidad: \${elementos.length} elementos<br>
            HTMLCollection no tiene forEach nativo<br>
            Se convierte a Array para iterar
        \`);
    }

    function seleccionarPorTag() {
        resetSeleccion();
        const elementos = document.getElementsByTagName('p');
        Array.from(elementos).forEach(el => el.classList.add('highlight'));
        mostrarResultado(\`
            <strong>getElementsByTagName('p'):</strong><br>
            Tipo: \${elementos.constructor.name} (HTMLCollection)<br>
            Cantidad: \${elementos.length} elementos &lt;p&gt;<br>
            Incluye todos los párrafos del documento
        \`);
    }

    function seleccionarQueryUno() {
        resetSeleccion();
        const elemento = document.querySelector('.footer');
        elemento.classList.add('selected');
        mostrarResultado(\`
            <strong>querySelector('.footer'):</strong><br>
            Retorna el PRIMER elemento que coincide<br>
            Elemento: \${elemento.outerHTML}<br>
            Siempre retorna un solo elemento o null
        \`);
    }

    function seleccionarQueryDos() {
        resetSeleccion();
        const elemento = document.querySelector('[data-category]');
        elemento.classList.add('selected');
        mostrarResultado(\`
            <strong>querySelector('[data-category]'):</strong><br>
            Selector por atributo<br>
            Elemento: \${elemento.outerHTML}<br>
            data-category: "\${elemento.dataset.category}"
        \`);
    }

    function seleccionarQueryAll() {
        resetSeleccion();
        const elementos = document.querySelectorAll('.text-item');
        elementos.forEach(el => el.classList.add('highlight'));
        mostrarResultado(\`
            <strong>querySelectorAll('.text-item'):</strong><strong>
            Tipo: \${elementos.constructor.name} (NodeList)<br>
            Cantidad: \${elementos.length} elementos<br>
            NodeList SÍ tiene forEach nativo<br>
            Retorna todos los elementos que coinciden
        \`);
    }

    function seleccionarQueryComplejo() {
        resetSeleccion();
        const elementos = document.querySelectorAll('h3 + p');
        elementos.forEach(el => el.classList.add('highlight'));
        mostrarResultado(\`
            <strong>querySelectorAll('h3 + p'):</strong><br>
            Selector complejo: párrafos inmediatamente después de h3<br>
            Cantidad: \${elementos.length} elementos<br>
            Útil para selecciones específicas
        \`);
    }

    function resetSeleccion() {
        // Remover todas las clases de selección
        document.querySelectorAll('.element, p, h3').forEach(el => {
            el.classList.remove('selected', 'highlight');
        });
    }

    function mostrarResultado(mensaje) {
        document.getElementById('output').innerHTML = mensaje;
    }
</script>
</html>`,

    ejemplo3: `<!DOCTYPE html>
<html>
<head>
    <title>HTMLCollection vs NodeList</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .comparison-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin: 30px 0;
        }
        .collection-type {
            padding: 25px;
            border-radius: 10px;
            border: 2px solid;
            background: #f8f9fa;
        }
        .htmlcollection {
            border-color: #dc3545;
        }
        .nodelist {
            border-color: #28a745;
        }
        .collection-header {
            text-align: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 2px solid;
        }
        .htmlcollection .collection-header {
            color: #dc3545;
            border-bottom-color: #dc3545;
        }
        .nodelist .collection-header {
            color: #28a745;
            border-bottom-color: #28a745;
        }
        .test-buttons {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin: 15px 0;
        }
        button {
            padding: 12px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        .htmlcollection button {
            background: #dc3545;
            color: white;
        }
        .htmlcollection button:hover {
            background: #c82333;
            transform: translateY(-2px);
        }
        .nodelist button {
            background: #28a745;
            color: white;
        }
        .nodelist button:hover {
            background: #218838;
            transform: translateY(-2px);
        }
        .code-display {
            background: #2d2d2d;
            color: #f8f8f2;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
            font-family: 'Fira Code', monospace;
            font-size: 14px;
            min-height: 100px;
        }
        .live-elements {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 10px;
            margin: 20px 0;
        }
        .element-box {
            padding: 15px;
            border: 2px solid #dee2e6;
            border-radius: 8px;
            text-align: center;
            background: white;
            transition: all 0.3s ease;
        }
        .element-box.active {
            border-color: #007bff;
            background: #007bff;
            color: white;
            transform: scale(1.05);
        }
        .results-section {
            margin-top: 30px;
            padding: 25px;
            background: #e7f3ff;
            border-radius: 10px;
            border-left: 5px solid #007bff;
        }
        .method-comparison {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin: 20px 0;
        }
        .comparison-item {
            padding: 15px;
            border-radius: 8px;
            background: white;
            border: 1px solid #dee2e6;
        }
        .info-badge {
            display: inline-block;
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            margin: 5px;
        }
        .badge-live {
            background: #17a2b8;
            color: white;
        }
        .badge-static {
            background: #6c757d;
            color: white;
        }
        .feature-list {
            list-style: none;
            padding: 0;
        }
        .feature-list li {
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }
        .feature-list li:before {
            content: "✓ ";
            color: #28a745;
            font-weight: bold;
            margin-right: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 style="text-align: center; color: #333;">HTMLCollection vs NodeList</h1>
        <p style="text-align: center; color: #666;">Comprendiendo las diferencias entre estas dos colecciones del DOM</p>

        <!-- Elementos de prueba -->
        <div style="margin: 30px 0;">
            <h3>Elementos de Prueba:</h3>
            <div class="live-elements">
                <div class="element-box" data-id="1">Elemento 1</div>
                <div class="element-box" data-id="2">Elemento 2</div>
                <div class="element-box" data-id="3">Elemento 3</div>
                <div class="element-box" data-id="4">Elemento 4</div>
                <div class="element-box" data-id="5">Elemento 5</div>
            </div>
        </div>

        <div class="comparison-grid">
            <!-- HTMLCollection -->
            <div class="collection-type htmlcollection">
                <div class="collection-header">
                    <h2>HTMLCollection</h2>
                    <span class="info-badge badge-live">EN VIVO</span>
                </div>
                
                <div class="test-buttons">
                    <button onclick="probarHTMLCollection()">getElementsByClassName</button>
                    <button onclick="probarHTMLCollectionLive()">Demostrar Live</button>
                </div>

                <div class="code-display" id="htmlcollection-code">
// Ejemplo:
const htmlCollection = document.getElementsByClassName('element-box');
                </div>

                <div>
                    <h4>Características:</h4>
                    <ul class="feature-list">
                        <li>Colección EN VIVO del DOM</li>
                        <li>Se actualiza automáticamente</li>
                        <li>No tiene forEach nativo</li>
                        <li>Solo contiene elementos</li>
                        <li>Más rápido para selecciones simples</li>
                    </ul>
                </div>
            </div>

            <!-- NodeList -->
            <div class="collection-type nodelist">
                <div class="collection-header">
                    <h2>NodeList</h2>
                    <span class="info-badge badge-static">ESTÁTICA</span>
                </div>

                <div class="test-buttons">
                    <button onclick="probarNodeList()">querySelectorAll</button>
                    <button onclick="probarNodeListStatic()">Demostrar Static</button>
                </div>

                <div class="code-display" id="nodelist-code">
// Ejemplo:
const nodeList = document.querySelectorAll('.element-box');
                </div>

                <div>
                    <h4>Características:</h4>
                    <ul class="feature-list">
                        <li>Colección ESTÁTICA (snapshot)</li>
                        <li>No se actualiza automáticamente</li>
                        <li>Tiene forEach nativo</li>
                        <li>Puede contener cualquier nodo</li>
                        <li>Más versátil para iteraciones</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Comparación de Métodos -->
        <div class="method-comparison">
            <div class="comparison-item">
                <h4>Métodos que retornan HTMLCollection:</h4>
                <div class="code-display">
document.getElementsByClassName()<br>
document.getElementsByTagName()<br>
element.children<br>
document.forms<br>
document.images
                </div>
            </div>
            <div class="comparison-item">
                <h4>Métodos que retornan NodeList:</h4>
                <div class="code-display">
document.querySelectorAll()<br>
element.childNodes<br>
document.querySelectorAll('*')<br>
Node.prototype.querySelectorAll()<br>
element.getRootNode()
                </div>
            </div>
        </div>

        <div class="results-section">
            <h3>Resultados de las Pruebas:</h3>
            <div id="comparison-results">
                Haz clic en los botones para ver las diferencias...
            </div>
        </div>
    </div>
</body>
<script>
    let htmlCollection = null;
    let nodeList = null;

    function probarHTMLCollection() {
        htmlCollection = document.getElementsByClassName('element-box');
        mostrarResultado(\`
            <strong>HTMLCollection obtenida:</strong><br>
            Tipo: \${htmlCollection.constructor.name}<br>
            Cantidad inicial: \${htmlCollection.length} elementos<br>
            <br>
            <strong>Probando métodos:</strong><br>
            • htmlCollection.forEach: \${typeof htmlCollection.forEach}<br>
            • htmlCollection[0]: \${htmlCollection[0]?.textContent || 'null'}<br>
            • Array.from(htmlCollection).length: \${Array.from(htmlCollection).length}
        \`);
        
        // Resaltar elementos
        resaltarElementos(Array.from(htmlCollection));
    }

    function probarNodeList() {
        nodeList = document.querySelectorAll('.element-box');
        mostrarResultado(\`
            <strong>NodeList obtenida:</strong><br>
            Tipo: \${nodeList.constructor.name}<br>
            Cantidad inicial: \${nodeList.length} elementos<br>
            <br>
            <strong>Probando métodos:</strong><br>
            • nodeList.forEach: \${typeof nodeList.forEach} (✅ Disponible)<br>
            • nodeList[0]: \${nodeList[0]?.textContent || 'null'}<br>
            • Array.from(nodeList).length: \${Array.from(nodeList).length}
        \`);
        
        // Resaltar elementos
        resaltarElementos(Array.from(nodeList));
    }

    function probarHTMLCollectionLive() {
        if (!htmlCollection) {
            probarHTMLCollection();
        }
        
        const resultadoInicial = htmlCollection.length;
        
        // Agregar un nuevo elemento dinámicamente
        const nuevoElemento = document.createElement('div');
        nuevoElemento.className = 'element-box';
        nuevoElemento.textContent = 'Elemento NUEVO';
        nuevoElemento.setAttribute('data-id', '6');
        document.querySelector('.live-elements').appendChild(nuevoElemento);
        
        const resultadoFinal = htmlCollection.length;
        
        mostrarResultado(\`
            <strong>DEMOSTRACIÓN EN VIVO (HTMLCollection):</strong><br>
            Cantidad inicial: \${resultadoInicial} elementos<br>
            Después de agregar nuevo elemento: \${resultadoFinal} elementos<br>
            <span style="color: #dc3545; font-weight: bold;">¡La colección se actualizó automáticamente!</span><br>
            <br>
            <em>HTMLCollection refleja los cambios en el DOM en tiempo real</em>
        \`);
        
        resaltarElementos(Array.from(htmlCollection));
    }

    function probarNodeListStatic() {
        if (!nodeList) {
            probarNodeList();
        }
        
        const resultadoInicial = nodeList.length;
        
        // Agregar un nuevo elemento dinámicamente
        const nuevoElemento = document.createElement('div');
        nuevoElemento.className = 'element-box';
        nuevoElemento.textContent = 'Elemento NUEVO';
        nuevoElemento.setAttribute('data-id', '7');
        document.querySelector('.live-elements').appendChild(nuevoElemento);
        
        const resultadoFinal = nodeList.length;
        
        mostrarResultado(\`
            <strong>DEMOSTRACIÓN ESTÁTICA (NodeList):</strong><br>
            Cantidad inicial: \${resultadoInicial} elementos<br>
            Después de agregar nuevo elemento: \${resultadoFinal} elementos<br>
            <span style="color: #28a745; font-weight: bold;">¡La colección NO se actualizó!</span><br>
            <br>
            <em>NodeList es un snapshot del momento de la consulta</em><br>
            <em>Para obtener elementos nuevos, debes llamar querySelectorAll again</em>
        \`);
        
        resaltarElementos(Array.from(nodeList));
    }

    function resaltarElementos(elementos) {
        // Limpiar selecciones anteriores
        document.querySelectorAll('.element-box').forEach(el => {
            el.classList.remove('active');
        });
        
        // Resaltar elementos actuales
        elementos.forEach(el => {
            if (el.classList) {
                el.classList.add('active');
            }
        });
    }

    function mostrarResultado(mensaje) {
        document.getElementById('comparison-results').innerHTML = mensaje;
    }

    // Inicialización
    document.addEventListener('DOMContentLoaded', function() {
        probarHTMLCollection();
        probarNodeList();
    });
</script>
</html>`,

    ejemplo4: `<!DOCTYPE html>
<html>
<head>
    <title>Selectores CSS Avanzados</title>
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
            background: #0f0f23;
            color: #cccccc;
        }
        .container {
            background: #1a1a2e;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            border: 1px solid #2d2d4d;
        }
        .selector-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 25px;
            margin: 30px 0;
        }
        .selector-card {
            background: #252547;
            padding: 25px;
            border-radius: 12px;
            border: 1px solid #3d3d6b;
            transition: all 0.3s ease;
            cursor: pointer;
        }
        .selector-card:hover {
            transform: translateY(-5px);
            border-color: #6c63ff;
            box-shadow: 0 10px 25px rgba(108, 99, 255, 0.2);
        }
        .selector-card.active {
            border-color: #6c63ff;
            background: #2d2d5a;
        }
        .selector-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #3d3d6b;
        }
        .selector-type {
            background: #6c63ff;
            color: white;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
        }
        .selector-syntax {
            background: #2d2d2d;
            color: #f8f8f2;
            padding: 15px;
            border-radius: 8px;
            font-family: 'Fira Code', monospace;
            margin: 15px 0;
            border-left: 4px solid #6c63ff;
        }
        .test-area {
            background: #2d2d4d;
            padding: 30px;
            border-radius: 12px;
            margin: 30px 0;
            border: 1px solid #3d3d6b;
        }
        .elements-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        .test-element {
            padding: 20px;
            border: 2px solid #3d3d6b;
            border-radius: 8px;
            background: #1e1e3f;
            text-align: center;
            transition: all 0.3s ease;
        }
        .test-element.matched {
            border-color: #6c63ff;
            background: #352f77;
            transform: scale(1.05);
            box-shadow: 0 5px 15px rgba(108, 99, 255, 0.3);
        }
        button {
            background: linear-gradient(135deg, #6c63ff, #4a44b5);
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            margin: 10px 5px;
            transition: all 0.3s ease;
        }
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(108, 99, 255, 0.4);
        }
        .results-panel {
            background: #252547;
            padding: 25px;
            border-radius: 12px;
            margin-top: 30px;
            border: 1px solid #3d3d6b;
        }
        .result-item {
            padding: 15px;
            margin: 10px 0;
            background: #1e1e3f;
            border-radius: 8px;
            border-left: 4px solid #6c63ff;
        }
        .selector-explanation {
            color: #a0a0c0;
            font-size: 14px;
            margin-top: 10px;
            line-height: 1.5;
        }
        h1 {
            text-align: center;
            background: linear-gradient(135deg, #6c63ff, #ff6b9d);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 10px;
        }
        .subtitle {
            text-align: center;
            color: #a0a0c0;
            margin-bottom: 30px;
        }
        .combinator-demo {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            margin: 20px 0;
        }
        .combinator-item {
            padding: 15px;
            border: 2px solid #3d3d6b;
            border-radius: 8px;
            text-align: center;
            background: #1e1e3f;
        }
        .combinator-item.related {
            border-color: #6c63ff;
            background: #352f77;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Selectores CSS Avanzados</h1>
        <div class="subtitle">Domina los selectores más poderosos para manipulación precisa del DOM</div>

        <!-- Grid de Selectores -->
        <div class="selector-grid">
            <!-- Selectores de Atributo -->
            <div class="selector-card" onclick="probarSelector('[data-role]')">
                <div class="selector-header">
                    <h3>Atributos</h3>
                    <span class="selector-type">[attr]</span>
                </div>
                <div class="selector-syntax">
                    [data-role]<br>
                    [type="text"]<br>
                    [class*="button"]
                </div>
                <div class="selector-explanation">
                    Selecciona elementos basado en atributos y sus valores
                </div>
            </div>

            <!-- Combinadores -->
            <div class="selector-card" onclick="probarSelector('.container > .test-element')">
                <div class="selector-header">
                    <h3>Combinadores</h3>
                    <span class="selector-type">A B</span>
                </div>
                <div class="selector-syntax">
                    A B (descendiente)<br>
                    A > B (hijo directo)<br>
                    A + B (hermano adyacente)<br>
                    A ~ B (hermanos generales)
                </div>
                <div class="selector-explanation">
                    Define relaciones entre elementos en el árbol DOM
                </div>
            </div>

            <!-- Pseudo-clases -->
            <div class="selector-card" onclick="probarSelector('.test-element:nth-child(odd)')">
                <div class="selector-header">
                    <h3>Pseudo-clases</h3>
                    <span class="selector-type">:state</span>
                </div>
                <div class="selector-syntax">
                    :first-child, :last-child<br>
                    :nth-child(n)<br>
                    :not(.class)<br>
                    :hover, :focus
                </div>
                <div class="selector-explanation">
                    Selecciona elementos basado en estado o posición
                </div>
            </div>

            <!-- Pseudo-elementos -->
            <div class="selector-card" onclick="probarSelector('.test-element::before')">
                <div class="selector-header">
                    <h3>Pseudo-elementos</h3>
                    <span class="selector-type">::part</span>
                </div>
                <div class="selector-syntax">
                    ::before, ::after<br>
                    ::first-letter<br>
                    ::selection
                </div>
                <div class="selector-explanation">
                    Selecciona partes específicas de un elemento (no seleccionables)
                </div>
            </div>
        </div>

        <!-- Área de Pruebas -->
        <div class="test-area">
            <h3>Área de Pruebas</h3>
            <div class="elements-container">
                <div class="test-element" data-role="header" data-priority="high">
                    <strong>Header</strong><br>
                    data-role="header"
                </div>
                <div class="test-element" data-role="content" data-priority="medium">
                    <strong>Content</strong><br>
                    data-role="content"
                </div>
                <div class="test-element" data-role="sidebar">
                    <strong>Sidebar</strong><br>
                    data-role="sidebar"
                </div>
                <div class="test-element" data-role="footer" data-priority="low">
                    <strong>Footer</strong><br>
                    data-role="footer"
                </div>
                <div class="test-element special-item" data-category="unique">
                    <strong>Special</strong><br>
                    class="special-item"
                </div>
                <div class="test-element" data-role="navigation">
                    <strong>Navigation</strong><br>
                    data-role="navigation"
                </div>
            </div>

            <!-- Pruebas Específicas -->
            <div style="margin: 25px 0;">
                <h4>Pruebas Rápidas:</h4>
                <button onclick="probarSelector('[data-role=\"header\"]')">[data-role="header"]</button>
                <button onclick="probarSelector('[data-role]')">[data-role]</button>
                <button onclick="probarSelector('[data-priority=\"high\"]')">[data-priority="high"]</button>
                <button onclick="probarSelector('.test-element:first-child')">:first-child</button>
                <button onclick="probarSelector('.test-element:nth-child(2n)')">:nth-child(2n)</button>
                <button onclick="probarSelector('.test-element:not(.special-item)')">:not(.special-item)</button>
                <button onclick="probarSelector('[data-role][data-priority]')">Múltiples atributos</button>
                <button onclick="limpiarSeleccion()">Limpiar</button>
            </div>

            <!-- Demo de Combinadores -->
            <div style="margin: 30px 0;">
                <h4>Demo de Combinadores:</h4>
                <div class="combinator-demo">
                    <div class="combinator-item" id="parent">Parent</div>
                    <div class="combinator-item">Sibling 1</div>
                    <div class="combinator-item">
                        Child
                        <div class="combinator-item">Grandchild</div>
                    </div>
                    <div class="combinator-item">Sibling 2</div>
                </div>
                <div style="margin-top: 15px;">
                    <button onclick="demoCombinador('descendiente')">A B (Descendiente)</button>
                    <button onclick="demoCombinador('hijo')">A > B (Hijo directo)</button>
                    <button onclick="demoCombinador('adyacente')">A + B (Adyacente)</button>
                    <button onclick="demoCombinador('hermanos')">A ~ B (Hermanos)</button>
                </div>
            </div>
        </div>

        <!-- Resultados -->
        <div class="results-panel">
            <h3>Resultados de Selección</h3>
            <div id="selector-results">
                <div class="result-item">
                    Selecciona un selector para ver los resultados...
                </div>
            </div>
        </div>
    </div>
</body>
<script>
    function probarSelector(selector) {
        limpiarSeleccion();
        
        try {
            const elementos = document.querySelectorAll(selector);
            const elementosArray = Array.from(elementos);
            
            // Resaltar elementos coincidentes
            elementosArray.forEach(el => {
                if (el.classList) {
                    el.classList.add('matched');
                }
            });
            
            // Mostrar resultados
            mostrarResultados(selector, elementosArray);
            
        } catch (error) {
            mostrarResultados(selector, [], error.message);
        }
    }

    function demoCombinador(tipo) {
        limpiarSeleccion();
        const parent = document.getElementById('parent');
        let selector = '';
        let elementos = [];
        
        switch(tipo) {
            case 'descendiente':
                selector = '#parent .combinator-item';
                elementos = document.querySelectorAll(selector);
                break;
            case 'hijo':
                selector = '#parent > .combinator-item';
                elementos = document.querySelectorAll(selector);
                break;
            case 'adyacente':
                selector = '#parent + .combinator-item';
                elementos = document.querySelectorAll(selector);
                break;
            case 'hermanos':
                selector = '#parent ~ .combinator-item';
                elementos = document.querySelectorAll(selector);
                break;
        }
        
        // Resaltar elementos
        elementos.forEach(el => el.classList.add('matched'));
        mostrarResultados(selector, Array.from(elementos));
    }

    function mostrarResultados(selector, elementos, error = null) {
        const resultsDiv = document.getElementById('selector-results');
        
        if (error) {
            resultsDiv.innerHTML = \`
                <div class="result-item" style="border-left-color: #dc3545;">
                    <strong>Error con selector: \${selector}</strong><br>
                    <span style="color: #dc3545;">\${error}</span>
                </div>
            \`;
            return;
        }
        
        const elementosHTML = elementos.map((el, index) => \`
            <div style="margin: 5px 0; padding: 8px; background: #1a1a2e; border-radius: 4px;">
                \${index + 1}. \${el.outerHTML.split('>')[0].substring(0, 100)}...>
            </div>
        \`).join('');
        
        resultsDiv.innerHTML = \`
            <div class="result-item">
                <strong>Selector probado:</strong> <code>\${selector}</code><br>
                <strong>Elementos encontrados:</strong> \${elementos.length}<br>
                <strong>NodeList con forEach:</strong> \${typeof elementos.forEach}<br>
                <br>
                <strong>Elementos coincidentes:</strong>
                <div style="max-height: 200px; overflow-y: auto; margin-top: 10px;">
                    \${elementosHTML || 'Ningún elemento coincide'}
                </div>
            </div>
        \`;
    }

    function limpiarSeleccion() {
        // Limpiar todas las selecciones
        document.querySelectorAll('.matched').forEach(el => {
            el.classList.remove('matched');
        });
    }

    // Ejemplos de inicialización
    document.addEventListener('DOMContentLoaded', function() {
        // Probar un selector inicial
        setTimeout(() => probarSelector('[data-role]'), 1000);
    });
</script>
</html>`
  };

  return (
    <div className="guia-contenido">
      <header className="guia-header">
        <h1>DOM Manipulation - Parte 1: Fundamentos y Selección</h1>
        <div className="guia-meta">
          <span className="nivel">Principiante</span>
          <span className="tiempo">25 minutos</span>
          <span className="temas">4 ejemplos prácticos</span>
        </div>
      </header>

      {/* INTRODUCCIÓN */}
      <section className="guia-seccion">
        <h2>Introducción a los Fundamentos del DOM</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>🌳 Comprendiendo la Estructura del DOM</h3>
            <p>El Document Object Model (DOM) es la representación en forma de árbol de la estructura HTML de una página web. Comprender esta estructura es fundamental para manipular elementos eficientemente.</p>
            
            <div className="lista-conceptos">
              <h4>🔧 Conceptos Clave de esta Parte:</h4>
              <ul>
                <li><strong>Estructura de árbol:</strong> Relaciones padre-hijo entre nodos</li>
                <li><strong>Tipos de nodos:</strong> Elementos, texto, comentarios, etc.</li>
                <li><strong>Métodos de selección:</strong> Diferentes formas de acceder a elementos</li>
                <li><strong>HTMLCollection vs NodeList:</strong> Diferencias cruciales</li>
                <li><strong>Selectores CSS:</strong> Poderosas herramientas de selección</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="nota-importante">
          <h4>💡 Por Qué Comenzar con los Fundamentos</h4>
          <p>Antes de manipular el DOM, es esencial entender cómo está estructurado y cómo seleccionar elementos eficientemente. Una base sólida en estos conceptos te evitará errores comunes y te permitirá escribir código más eficiente y mantenible.</p>
        </div>
      </section>

      {/* EJEMPLO 1: ESTRUCTURA DEL DOM */}
      <section className="guia-seccion">
        <h2>1. Exploración de la Estructura del DOM</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>🔍 Conociendo los Nodos del Documento</h3>
            <p>Este ejemplo te permite explorar interactivamente la estructura del DOM y entender las propiedades fundamentales de los diferentes tipos de nodos.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Ejemplo 1: Estructura y Propiedades del DOM</span>
            <button 
              className={`btn-copiar ${copiado === 'ejemplo1' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.ejemplo1, 'ejemplo1')}
            >
              {copiado === 'ejemplo1' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.ejemplo1}</code>
          </pre>
        </div>

        <div className="resumen-practicas">
          <h4>🎯 Lo que Aprendemos en este Ejemplo:</h4>
          <ul>
            <li>El objeto <code>document</code> es el nodo raíz del DOM</li>
            <li>Los elementos HTML tienen propiedades como <code>nodeType</code>, <code>nodeName</code>, y <code>tagName</code></li>
            <li>Existen 12 tipos diferentes de nodos en el DOM estándar</li>
            <li>Las relaciones entre nodos (padre, hijo, hermanos) son fundamentales</li>
            <li>El DOM representa todo el documento, no solo los elementos visibles</li>
          </ul>
        </div>
      </section>

      {/* EJEMPLO 2: MÉTODOS DE SELECCIÓN */}
      <section className="guia-seccion">
        <h2>2. Métodos de Selección de Elementos</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>🎯 Diferentes Formas de Acceder a Elementos</h3>
            <p>JavaScript proporciona múltiples métodos para seleccionar elementos del DOM. Cada método tiene sus ventajas y casos de uso específicos.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Ejemplo 2: Comparación de Métodos de Selección</span>
            <button 
              className={`btn-copiar ${copiado === 'ejemplo2' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.ejemplo2, 'ejemplo2')}
            >
              {copiado === 'ejemplo2' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.ejemplo2}</code>
          </pre>
        </div>

        <div className="tabla-contenedor">
          <h4>📊 Resumen de Métodos de Selección</h4>
          <table className="tabla-guia">
            <thead>
              <tr>
                <th>Método</th>
                <th>Retorna</th>
                <th>Velocidad</th>
                <th>Uso Recomendado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>getElementById()</code></td>
                <td>Elemento único</td>
                <td>🚀 Más rápido</td>
                <td>Cuando tienes un ID específico</td>
              </tr>
              <tr>
                <td><code>getElementsByClassName()</code></td>
                <td>HTMLCollection</td>
                <td>⚡ Rápido</td>
                <td>Múltiples elementos con misma clase</td>
              </tr>
              <tr>
                <td><code>getElementsByTagName()</code></td>
                <td>HTMLCollection</td>
                <td>⚡ Rápido</td>
                <td>Todos los elementos de una etiqueta</td>
              </tr>
              <tr>
                <td><code>querySelector()</code></td>
                <td>Elemento único</td>
                <td>🐢 Más lento</td>
                <td>Selectores CSS complejos (primer elemento)</td>
              </tr>
              <tr>
                <td><code>querySelectorAll()</code></td>
                <td>NodeList</td>
                <td>🐢 Más lento</td>
                <td>Selectores CSS complejos (todos los elementos)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* EJEMPLO 3: HTMLCOLLECTION VS NODELIST */}
      <section className="guia-seccion">
        <h2>3. HTMLCollection vs NodeList: Diferencias Cruciales</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>🔄 Colecciones en Vivo vs Estáticas</h3>
            <p>Comprender la diferencia entre HTMLCollection y NodeList es esencial para evitar errores comunes en la manipulación del DOM.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Ejemplo 3: Comparación HTMLCollection vs NodeList</span>
            <button 
              className={`btn-copiar ${copiado === 'ejemplo3' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.ejemplo3, 'ejemplo3')}
            >
              {copiado === 'ejemplo3' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.ejemplo3}</code>
          </pre>
        </div>

        <div className="nota-advertencia">
          <h4>⚠️ Diferencias Clave que Debes Recordar</h4>
          <ul>
            <li><strong>HTMLCollection es EN VIVO:</strong> Se actualiza automáticamente cuando el DOM cambia</li>
            <li><strong>NodeList es ESTÁTICA:</strong> Es un snapshot del momento de la consulta</li>
            <li><strong>HTMLCollection</strong> no tiene <code>forEach</code> nativo</li>
            <li><strong>NodeList</strong> SÍ tiene <code>forEach</code> nativo (en navegadores modernos)</li>
            <li>Para iterar sobre HTMLCollection, convierte a Array: <code>Array.from(collection)</code></li>
          </ul>
        </div>
      </section>

      {/* EJEMPLO 4: SELECTORES AVANZADOS */}
      <section className="guia-seccion">
        <h2>4. Selectores CSS Avanzados para Selección Precisa</h2>
        
        <div className="concepto-card">
          <div className="concepto-content">
            <h3>🎨 El Poder de los Selectores CSS</h3>
            <p>Los selectores CSS avanzados te permiten realizar selecciones extremadamente específicas y potentes en el DOM.</p>
          </div>
        </div>

        <div className="codigo-contenedor">
          <div className="codigo-header">
            <span>Ejemplo 4: Selectores CSS Avanzados</span>
            <button 
              className={`btn-copiar ${copiado === 'ejemplo4' ? 'copiado' : ''}`}
              onClick={() => copiarCodigo(ejemplosCodigo.ejemplo4, 'ejemplo4')}
            >
              {copiado === 'ejemplo4' ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <pre className="codigo-ejemplo">
            <code>{ejemplosCodigo.ejemplo4}</code>
          </pre>
        </div>

        <div className="resumen-practicas">
          <h4>🎯 Selectores CSS Más Útiles</h4>
          <ul>
            <li><strong>Atributos:</strong> <code>[data-role]</code>, <code>[type="text"]</code>, <code>[class*="btn"]</code></li>
            <li><strong>Combinadores:</strong> <code>A B</code> (descendiente), <code>{`A > B`}</code> (hijo directo)</li>
            <li><strong>Pseudo-clases:</strong> <code>:first-child</code>, <code>:nth-child(n)</code>, <code>:not()</code></li>
            <li><strong>Múltiples condiciones:</strong> <code>.class1.class2</code>, <code>[attr1][attr2]</code></li>
            <li><strong>Selectores de jerarquía:</strong> <code>A + B</code> (hermano adyacente), <code>A ~ B</code> (hermanos generales)</li>
          </ul>
        </div>
      </section>

      {/* RESUMEN DE LA PARTE 1 */}
      <section className="guia-resumen-final">
        <h2>Resumen de la Parte 1</h2>
        
        <div className="resumen-grid">
          <div className="resumen-columna">
            <h4>✅ Lo que Has Aprendido</h4>
            <ul>
              <li>La estructura jerárquica del DOM como árbol de nodos</li>
              <li>Los diferentes tipos de nodos y sus propiedades</li>
              <li>Métodos tradicionales de selección (<code>getElementById</code>, etc.)</li>
              <li>Métodos modernos de selección (<code>querySelector</code>, etc.)</li>
              <li>Diferencias cruciales entre HTMLCollection y NodeList</li>
              <li>Selectores CSS avanzados para selección precisa</li>
              <li>Cuándo usar cada método según el caso específico</li>
            </ul>
          </div>
          
          <div className="resumen-columna">
            <h4>🎯 Próximos Pasos en la Parte 2</h4>
            <div className="proximos-temas">
              <div className="tema-card">
                <div className="tema-numero">2</div>
                <div className="tema-info">
                  <h5>Creación y Modificación</h5>
                  <p>Aprenderás a crear, modificar y eliminar elementos del DOM</p>
                </div>
              </div>
              <div className="tema-card">
                <div className="tema-numero">3</div>
                <div className="tema-info">
                  <h5>Eventos y Atributos</h5>
                  <p>Manejo de interacciones y gestión de datos en elementos</p>
                </div>
              </div>
              <div className="tema-card">
                <div className="tema-numero">4</div>
                <div className="tema-info">
                  <h5>Proyecto Completo</h5>
                  <p>Aplicación Todo List con todos los conceptos integrados</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="llamada-accion">
          <h3>🚀 ¡Practica lo Aprendido!</h3>
          <p>Antes de continuar con la siguiente parte, practica con estos ejercicios:</p>
          <ul>
            <li>Crea una página con diferentes elementos y practica seleccionarlos con todos los métodos</li>
            <li>Experimenta con selectores CSS complejos en la consola del navegador</li>
            <li>Comprueba la diferencia entre HTMLCollection y NodeList agregando elementos dinámicamente</li>
            <li>Intenta seleccionar elementos usando combinaciones de diferentes métodos</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Guia_8_1;