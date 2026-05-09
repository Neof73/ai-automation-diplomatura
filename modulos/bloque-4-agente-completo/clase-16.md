# Clase 16 — Del chatbot al agente: la diferencia que cambia todo

**Bloque 4: Agente completo · Semana 16 de 20**
**Duración:** 2 horas · **Tipo:** Práctica · **Nivel:** Avanzado

---

## Objetivo de la clase

Que cada participante comprenda la diferencia arquitectural entre un chatbot y un agente de IA, y construya el primer agente funcional de n8n para Lumina — un sistema que no solo responde, sino que razona sobre qué hacer, elige herramientas y ejecuta secuencias de acciones sin un flujo rígido predefinido. Al terminar, el agente tiene que resolver al menos tres escenarios distintos de post-venta usando el mismo punto de entrada.

---

## Agenda

| Tiempo | Bloque | Descripción |
|---|---|---|
| 0:00 – 0:15 | Apertura | El límite de los flujos: por qué necesitamos agentes |
| 0:15 – 0:45 | Bloque 1 | Qué es un agente de IA: teoría y arquitectura |
| 0:45 – 1:10 | Bloque 2 | El nodo AI Agent en n8n: configuración y herramientas |
| 1:10 – 1:40 | Bloque 3 | El agente post-venta de Lumina — construido en vivo |
| 1:40 – 1:55 | Ejercicio | Primera conversación con el agente |
| 1:55 – 2:00 | Tarea | Configuración para la semana |

---

## Apertura (0:00 – 0:15)

### El problema que los flujos no pueden resolver

Durante tres bloques construimos sistemas que responden a eventos con flujos fijos: trigger → procesar → actuar. Ese modelo tiene un límite muy concreto: **el programador tiene que anticipar todos los caminos posibles antes de que ocurran**.

Pensemos en el caso real de Lumina. Un cliente escribe:

> *"Hola, compré una remera talle M hace dos semanas. Llegó bien pero resulta que me quedó grande. ¿Puedo hacer un cambio? Si no tiene talle S en ese modelo me gustaría ver si hay algo similar. Ah, y también quería preguntar si el pantalón que está en la web se puede pedir en rojo porque en el sitio solo veo negro y azul."*

Este mensaje tiene **tres preguntas distintas**, todas válidas, ninguna cubre exactamente los casos del flujo del Bloque 3. El flujo lo clasificaría como "CONSULTA" o "RECLAMO" y generaría una respuesta genérica. Pero resolver este mensaje requiere:

1. Verificar si el modelo tiene talle S en stock
2. Buscar productos similares si no hay talle S
3. Verificar el catálogo de colores del pantalón mencionado
4. Componer una respuesta que responda las tres preguntas en orden

Eso no es un flujo — es una *tarea de múltiples pasos con decisiones intermedias*. Para eso existen los agentes.

### La diferencia en una oración

> Un **chatbot** sigue un script. Un **agente** razona sobre qué hacer, elige las herramientas que necesita y ejecuta los pasos para resolver la tarea.

---

## Bloque 1 — Qué es un agente de IA: teoría y arquitectura (0:15 – 0:45)

### Los cuatro componentes de un agente

Un agente de IA tiene cuatro componentes que trabajan juntos:

```
┌─────────────────────────────────────────────────────────┐
│                      AGENTE                             │
│                                                         │
│  ┌──────────┐    ┌──────────┐    ┌──────────────────┐   │
│  │  Modelo  │    │Herramien-│    │    Memoria        │   │
│  │  de IA   │◄──►│   tas    │    │  (contexto de    │   │
│  │ (el que  │    │(lo que   │    │   la conversación│   │
│  │ razona)  │    │ puede    │    │   o del negocio) │   │
│  └──────────┘    │  hacer)  │    └──────────────────┘   │
│       ▲          └──────────┘             ▲             │
│       │               ▲                   │             │
│  ┌────┴───────────────┴───────────────────┴────────┐    │
│  │              Bucle de razonamiento              │    │
│  │    Pensar → Elegir herramienta → Actuar →       │    │
│  │    Observar resultado → Pensar de nuevo         │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

**1. Modelo de IA:** el "cerebro" del agente. Recibe el mensaje del usuario y todo el contexto, razona sobre qué hacer y decide el próximo paso. En nuestro caso: GPT-4o o Claude.

**2. Herramientas:** funciones que el agente puede llamar para obtener información o ejecutar acciones. Cada herramienta tiene un nombre, una descripción (el agente la lee para saber cuándo usarla) y parámetros. Ejemplos: buscar un pedido, verificar stock, enviar un email, registrar un caso.

**3. Memoria:** el contexto que el agente mantiene a través de los pasos. En una conversación multi-turno, el agente recuerda lo que dijo el usuario antes. En un flujo de negocio, puede recordar datos que buscó en pasos anteriores.

**4. Bucle de razonamiento:** el ciclo que repite hasta resolver la tarea o decidir que no puede resolverla.

### El patrón ReAct: cómo razona un agente

El nombre "ReAct" viene de *Reasoning + Acting* (razonar + actuar). Es el patrón de razonamiento que usan la mayoría de los agentes modernos.

En cada ciclo, el agente hace tres cosas:

```
THOUGHT (pensamiento interno):
"El cliente pregunta si tiene talle S. Necesito verificar
el stock del modelo 'Remera Básica' en talle S."

ACTION (acción):
Llama a la herramienta buscar_stock con parámetros:
{ "modelo": "Remera Básica", "talle": "S" }

OBSERVATION (resultado de la acción):
{ "disponible": false, "stock": 0, "modelos_similares": ["Remera Slim", "Remera Urban"] }

THOUGHT (siguiente pensamiento):
"No hay talle S en ese modelo. El cliente preguntó si hay
algo similar. Tengo dos opciones: Remera Slim y Remera Urban.
Voy a buscar los detalles de ambas para recomendar la mejor."

ACTION:
Llama a buscar_producto con parámetros:
{ "modelo": "Remera Slim" }
...
```

Este ciclo se repite hasta que el agente tiene toda la información que necesita para responder. Entonces genera la respuesta final.

**Lo que esto significa en la práctica:** el agente puede manejar el mensaje del cliente con tres preguntas porque va resolviendo cada una con las herramientas disponibles, sin que el programador haya definido de antemano ese camino específico.

### ¿Cuándo usar un flujo y cuándo un agente?

Esta distinción es importante. Los agentes no reemplazan a los flujos — los complementan.

| Característica | Flujo (n8n estándar) | Agente |
|---|---|---|
| **Estructura** | Fija, predefinida | Dinámica, determinada en tiempo de ejecución |
| **Mejor para** | Procesos repetibles y predecibles | Tareas con variabilidad y múltiples decisiones |
| **Confiabilidad** | Alta (el flujo siempre hace lo mismo) | Media (depende del razonamiento del modelo) |
| **Costo** | Bajo (pocos tokens) | Más alto (múltiples llamadas al modelo) |
| **Velocidad** | Rápido | Más lento (varios ciclos de razonamiento) |
| **Ejemplos** | Capturar email → registrar → notificar | Responder una consulta compleja de múltiples partes |

**Regla práctica:** si el proceso tiene menos de 4 pasos y el camino está claro, usá un flujo. Si el proceso requiere tomar decisiones sobre qué pasos dar según el contenido de cada caso, usá un agente.

### Cómo el agente "sabe" cuándo usar cada herramienta

Acá está el corazón del sistema: **el agente elige las herramientas leyendo su descripción**. No le decimos "cuando el usuario pregunte X, usá la herramienta Y". Le describimos qué hace cada herramienta y el modelo decide cuándo es relevante.

Ejemplo de descripción de herramienta:

```
Nombre: buscar_pedido
Descripción: Busca el pedido de un cliente en la base de datos de Lumina.
Usar cuando: el cliente menciona su pedido, pregunta por el estado de envío,
quiere saber cuándo llega, o proporciona un número de pedido.
No usar cuando: el cliente hace una pregunta sobre productos o catálogo.
Parámetros:
  - email_cliente (string): el email con el que realizó la compra
  - numero_pedido (string, opcional): el número de pedido si lo proporciona
```

Esta descripción es la que lee el modelo para decidir si usar o no la herramienta en cada paso del razonamiento.

---

## Bloque 2 — El nodo AI Agent en n8n (0:45 – 1:10)

El docente abre n8n en pantalla y recorre el nodo AI Agent desde cero.

### Agregar el nodo AI Agent

1. En el lienzo de n8n, hacer clic en "+"
2. Buscar "AI Agent" en el buscador de nodos
3. Seleccionar **AI Agent**

El nodo AI Agent tiene una estructura diferente a los nodos comunes: en lugar de un panel de configuración simple, tiene secciones para el modelo, las herramientas y la memoria.

### Configurar el modelo

En la sección **Chat Model** del nodo:
- Agregar un nodo **OpenAI Chat Model** conectado al AI Agent
- Configurar:
  - Credencial: la API key de OpenAI (ya configurada en clases anteriores)
  - Model: `gpt-4o` (el más capaz para razonamiento de múltiples pasos)
  - Temperature: `0` a `0.2` (baja para que el agente sea predecible)

### Escribir el system prompt del agente

El system prompt del agente es más complejo que el de los nodos del Bloque 3. Define:
- El rol del agente
- El contexto del negocio
- Las reglas de comportamiento
- Cómo usar las herramientas
- El tono de las respuestas

```
Sos el agente de atención post-venta de Lumina, una tienda de indumentaria online argentina.

TU OBJETIVO: resolver las consultas de clientes de la forma más completa posible,
usando las herramientas disponibles para obtener información real antes de responder.

REGLAS:
1. Siempre buscá el pedido del cliente antes de hablar de él. No inventes datos de pedidos.
2. Si el cliente pregunta por stock, consultá la herramienta de stock. No asumas disponibilidad.
3. Si no podés resolver algo con las herramientas disponibles, decilo claramente
   y ofrecé derivar el caso al equipo humano.
4. Respondé en el mismo idioma en que escribió el cliente.
5. Si el cliente hace varias preguntas, respondelas todas en orden.
6. Usá el nombre del cliente si lo tenés disponible.
7. Nunca inventes datos (precios, fechas, disponibilidad) que no obtuviste de una herramienta.

TONO:
- Cálido pero directo
- Sin frases de relleno ("espero que estés bien", "es un placer ayudarte")
- Sin bullet points en la respuesta final — texto corrido, máximo 4 párrafos

CUÁNDO ESCALAR AL EQUIPO HUMANO:
- Si el cliente expresa frustración severa o amenaza con acciones legales
- Si el caso requiere una decisión que excede tus herramientas (devoluciones de montos altos, etc.)
- Si el mismo cliente ya contactó más de 2 veces sin resolución
```

### Las herramientas del agente en n8n

Las herramientas se conectan al nodo AI Agent como nodos separados. Cada herramienta es un nodo de n8n configurado para hacer una tarea específica.

El docente muestra cómo conectar tres herramientas básicas:

**Herramienta 1 — Buscar pedido**
- Nodo: Google Sheets (operación: Lookup Row)
- Descripción para el agente: "Busca el pedido de un cliente por su email en la planilla de pedidos de Lumina. Retorna el estado, fecha estimada y número de tracking."

**Herramienta 2 — Verificar stock**
- Nodo: Google Sheets (operación: Lookup Row en hoja "Stock")
- Descripción para el agente: "Verifica si un modelo y talle específico tiene stock disponible. Retorna la cantidad disponible y modelos alternativos si no hay stock."

**Herramienta 3 — Registrar caso para equipo**
- Nodo: Google Sheets (operación: Append Row en hoja "Casos Pendientes")
- Descripción para el agente: "Registra un caso que requiere atención del equipo humano. Usar cuando el agente no puede resolver la consulta o cuando el cliente necesita ayuda especializada."

### Configurar la memoria del agente

La memoria permite que el agente recuerde el contexto de la conversación. En n8n hay dos opciones:

**Window Buffer Memory** (para conversaciones multi-turno):
- Guarda los últimos N mensajes de la conversación
- Útil si el cliente escribe varios mensajes seguidos

**Simple Memory** (para el contexto de un solo mensaje):
- Guarda el contexto dentro de la ejecución actual
- Suficiente para mensajes que contienen toda la información necesaria

Para el caso de Lumina (emails que llegan como mensajes únicos), se usa Simple Memory por defecto.

### El trigger del agente

El agente necesita un punto de entrada. Se conecta al Gmail Trigger que ya existe en el flujo del Bloque 3, pero ahora en lugar de pasar a los nodos de clasificación y respuesta del Bloque 3, el mensaje va directamente al agente.

**Configuración del trigger en el nodo AI Agent:**
- **Prompt:** `{{ $json.mensaje }}` — el texto del email del cliente
- **Session ID:** `{{ $json.email_cliente }}` — para separar las sesiones por cliente

---

## Bloque 3 — El agente post-venta de Lumina, construido en vivo (1:10 – 1:40)

### El flujo completo con el agente

```
[Gmail Trigger]
      ↓
[Set: extraer email_cliente, asunto, mensaje]
      ↓
[Google Sheets: registrar en log]
      ↓
[AI Agent]──── Herramienta: Buscar pedido
    │     └─── Herramienta: Verificar stock
    │     └─── Herramienta: Registrar caso pendiente
    ↓
[Gmail: enviar respuesta generada por el agente]
      ↓
[Google Sheets: actualizar estado del registro]
```

### Construcción paso a paso

**Paso 1 — Configurar el nodo AI Agent**

El docente muestra en pantalla cómo el nodo AI Agent se ve diferente en el lienzo: tiene conexiones de entrada adicionales para las herramientas y el modelo.

**Paso 2 — Conectar las herramientas**

Agregar los tres nodos de herramientas y conectarlos al AI Agent. n8n muestra los nodos de herramientas en una sección separada, debajo del agente, con el ícono de una llave inglesa.

**Paso 3 — Probar el agente con casos reales**

El docente envía tres emails distintos y muestra en pantalla el panel de ejecución del AI Agent, que muestra el razonamiento interno (los pasos Thought → Action → Observation) en tiempo real.

**Caso 1 — Consulta de envío simple:**

Email: *"Hola, ¿saben cuándo llega mi pedido? Compré el viernes pasado."*

```
THOUGHT: "El cliente pregunta por su pedido. Voy a buscarlo por su email."
ACTION: buscar_pedido({ email_cliente: "cliente@email.com" })
OBSERVATION: { id: "4821", estado: "En camino", fecha_estimada: "14/05", tracking: "AR123456" }
THOUGHT: "Tengo toda la información para responder. No necesito más herramientas."
FINAL ANSWER: "Hola Martín, tu pedido #4821 ya está en camino. La fecha estimada de entrega es el 14 de mayo y podés seguirlo con el código AR123456 desde el sitio del correo. Equipo Lumina."
```

**Caso 2 — Consulta de cambio de talle con búsqueda de alternativa:**

Email: *"Quiero cambiar la remera talle M que compré por una S, si es que tienen. Si no hay S, ¿qué alternativas me recomendarían?"*

```
THOUGHT: "El cliente quiere cambiar de talle. Primero busco su pedido, luego verifico stock de talle S."
ACTION: buscar_pedido({ email_cliente: "cliente@email.com" })
OBSERVATION: { id: "4821", producto: "Remera Básica Gris", talle: "M", estado: "Entregado" }
THOUGHT: "Pedido encontrado. Ahora verifico stock de talle S del mismo modelo."
ACTION: verificar_stock({ modelo: "Remera Básica Gris", talle: "S" })
OBSERVATION: { disponible: false, stock: 0, alternativas: ["Remera Slim Gris S: 3 unidades", "Remera Urban Gris S: 1 unidad"] }
THOUGHT: "No hay talle S en el mismo modelo. Tengo dos alternativas. Voy a explicarle al cliente las opciones."
FINAL ANSWER: "Hola, entendemos que necesitás un talle S. Lamentablemente el modelo Remera Básica Gris no tiene talle S disponible actualmente. Como alternativas similares, tenemos la Remera Slim Gris (3 unidades en S) y la Remera Urban Gris (1 unidad en S). Para coordinar el cambio, un integrante del equipo te va a contactar esta semana. Equipo Lumina."
```

**Caso 3 — Consulta compleja que requiere escalada:**

Email: *"Ya es la cuarta vez que escribo. Mi pedido llegó incompleto, falta una remera, y nadie me respondió todavía. Esto es inaceptable."*

```
THOUGHT: "El cliente está muy frustrado y menciona que escribió 4 veces. Busco el pedido primero."
ACTION: buscar_pedido({ email_cliente: "cliente@email.com" })
OBSERVATION: { id: "4821", estado: "Entregado", items: ["Remera Azul", "Remera Blanca"], notas: "contacto_previo: 3 veces" }
THOUGHT: "El cliente tiene razón — ya contactó 3 veces antes (lo confirma el registro). Este caso requiere atención humana urgente. Voy a registrarlo como caso prioritario."
ACTION: registrar_caso({ email: "cliente@email.com", tipo: "URGENTE", descripcion: "Pedido 4821 incompleto, cliente contactó 4 veces sin resolución. Falta remera.", prioridad: "alta" })
OBSERVATION: { registrado: true, caso_id: "C-0089" }
THOUGHT: "Caso registrado. Ahora respondo al cliente reconociendo la situación y comprometiéndome a una resolución rápida."
FINAL ANSWER: "Hola, lamentamos profundamente la situación y los inconvenientes que te generó. Registramos tu caso como prioritario (Caso #C-0089) y un integrante del equipo se comunicará con vos en las próximas 2 horas para resolver el tema del pedido incompleto. Equipo Lumina."
```

El docente muestra en pantalla el historial de ejecución del AI Agent, que registra cada paso del razonamiento con los datos exactos que entraron y salieron de cada herramienta.

---

## Ejercicio práctico (1:40 – 1:55)

> Cada participante interactúa con el agente recién construido y observa su razonamiento.

### El ejercicio

1. Abrir el flujo del agente en n8n
2. Ir al nodo AI Agent y hacer clic en "Test workflow"
3. En el campo del prompt del agente, escribir un mensaje de prueba
4. Observar el panel de ejecución: ver el ciclo Thought → Action → Observation
5. Probar al menos dos mensajes distintos:
   - Un mensaje simple con una sola pregunta
   - Un mensaje complejo con dos o tres preguntas o un caso ambiguo

### Qué observar

- ¿El agente eligió la herramienta correcta para cada parte del mensaje?
- ¿Cuántos ciclos de razonamiento necesitó para resolver el caso?
- ¿La respuesta final es completa y apropiada?
- ¿Hay algo en el system prompt que cambiarías después de ver cómo razonó?

---

## Cierre (1:55 – 2:00)

El docente señala el salto arquitectural de la clase:

> En el Bloque 3 el flujo respondía a eventos con caminos predefinidos. Si el caso no encajaba en ningún camino, el flujo fallaba o daba una respuesta genérica. El agente que construimos hoy no tiene caminos predefinidos — tiene herramientas y la capacidad de decidir cuáles usar según lo que necesita en cada momento. Eso es cualitativamente distinto. Y es la base del sistema que van a presentar en el Demo Day.

---

## Tarea de la semana

1. **Mantener el agente activo** procesando emails reales durante la semana.
2. **Revisar el historial de ejecuciones** en n8n todos los días:
   - ¿El agente razonó correctamente?
   - ¿Hubo casos donde eligió la herramienta equivocada?
   - ¿Hubo casos donde respondió sin usar herramientas cuando debería haberlas usado?
3. **Ajustar el system prompt** según los errores observados — anotar exactamente qué cambió y por qué.
4. **Identificar una herramienta que falta:** ¿qué tipo de consulta llegó esta semana que el agente no pudo resolver porque no tenía la herramienta necesaria? Esa es la herramienta a agregar en la semana 17.

### Trabajo en VS Code

Para escribir y versionar los system prompts del agente sin perderlos entre sesiones, crear un archivo de texto en el proyecto:

```
/prompts/
  agente-sistema.txt       → el system prompt principal
  herramienta-pedidos.txt  → la descripción de cada herramienta
  herramienta-stock.txt
  herramienta-casos.txt
  changelog.md             → registro de cambios al prompt y por qué
```

Guardar cada versión del prompt en VS Code permite usar el control de versiones de Git para ver qué cambió entre versiones y poder volver atrás si un ajuste empeoró el comportamiento.

---

## Recursos y herramientas

| Herramienta | Para qué | Cómo acceder |
|---|---|---|
| n8n AI Agent node | Nodo de agente con ReAct | cloud.n8n.io — disponible en el plan gratuito |
| OpenAI API (gpt-4o) | Modelo de razonamiento del agente | platform.openai.com |
| n8n Docs — AI Agents | Documentación oficial del nodo | docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent |
| VS Code | Editor para escribir y versionar prompts | code.visualstudio.com |

---

## Conceptos clave de la clase

| Concepto | Definición |
|---|---|
| **Agente** | Sistema de IA que razona, elige herramientas y ejecuta pasos hasta resolver una tarea |
| **Herramienta (Tool)** | Función que el agente puede llamar para obtener información o ejecutar acciones |
| **ReAct** | Patrón de razonamiento: Thought → Action → Observation, en ciclos hasta resolver la tarea |
| **System prompt del agente** | Las instrucciones permanentes que definen el rol, las reglas y el comportamiento del agente |
| **Memoria** | El contexto que el agente mantiene entre pasos de razonamiento o entre mensajes |
| **Escalada** | Cuando el agente decide que un caso supera sus herramientas y lo deriva al equipo humano |

---

*AI Automation — Diplomatura No-Code · Bloque 4: Agente completo · Clase 16 de 20*
