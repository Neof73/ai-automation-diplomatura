# Clase 15 — Entregable 3: Sistema de atención con IA para tu negocio

**Bloque 3: IA en tu negocio · Semana 15 de 20**
**Duración:** 2 horas · **Tipo:** Entregable · **Nivel:** Intermedio-Avanzado

---

## Objetivo de la clase

Que cada participante presente en vivo un sistema completo de atención al cliente potenciado por IA — que captura mensajes entrantes, los clasifica con comprensión del lenguaje, responde automáticamente los simples, detecta casos urgentes y genera reportes sin intervención humana. Al terminar, el grupo tiene una colección de sistemas reales aplicados a distintos tipos de negocio.

---

## Agenda

| Tiempo | Bloque | Descripción |
|---|---|---|
| 0:00 – 0:15 | Apertura | Contexto del entregable y criterios de evaluación |
| 0:15 – 0:35 | Trabajo individual | Tiempo final para pulir y preparar la demo |
| 0:35 – 1:40 | Presentaciones | Demos en vivo (7–8 min cada participante) |
| 1:40 – 1:50 | Cierre del bloque | Síntesis y preview del Bloque 4 |
| 1:50 – 2:00 | Tarea | Preparación para el sprint final |

---

## Apertura (0:00 – 0:15)

### Lo que presentamos hoy

Un **sistema de atención con IA** es un conjunto integrado de flujos automatizados que gestiona la comunicación con clientes desde que llega el mensaje hasta que se resuelve el caso o se escala al equipo — con inteligencia artificial en cada etapa que lo necesita.

A diferencia del Entregable 2 (un pipeline operativo), el Entregable 3 no solo mueve datos: *interpreta lenguaje, genera texto y toma decisiones que antes requerían juicio humano*.

### Los cinco componentes del sistema

Un sistema completo tiene estos cinco componentes. No todos tienen que estar perfectamente construidos — el criterio es que el sistema como conjunto funcione y tenga impacto real.

**Componente 1 — Captura y registro**
El sistema captura todos los mensajes entrantes y los registra en una base de datos estructurada. Ningún mensaje queda sin procesar.

**Componente 2 — Clasificación inteligente**
La IA lee el mensaje y determina de qué se trata — sin reglas fijas de palabras clave.

**Componente 3 — Respuesta automática**
Para los casos que el sistema puede resolver (consultas de pedido, preguntas frecuentes), la IA redacta y envía la respuesta sin intervención humana.

**Componente 4 — Detección y escalada**
Para los casos urgentes o que requieren atención humana, el sistema detecta las señales de insatisfacción o urgencia y alerta al equipo con contexto suficiente para actuar.

**Componente 5 — Reporte agregado**
El sistema genera automáticamente un resumen ejecutivo periódico con las métricas de la semana.

### Criterios de evaluación

| Criterio | Descripción |
|---|---|
| **Funciona en vivo** | Al menos un mensaje se procesa durante la presentación, en tiempo real |
| **La IA toma decisiones reales** | El flujo usa la API de OpenAI (u otro modelo) para clasificar o redactar, no solo palabras clave |
| **El impacto está medido** | Hay números concretos: mensajes procesados, tiempo ahorrado, casos detectados |
| **Está adaptado al negocio** | El sistema resuelve un problema real del negocio del participante, no un caso genérico |
| **Se entiende cómo funciona** | Cualquier persona del grupo puede seguir la lógica del flujo |

---

## Trabajo individual (0:15 – 0:35)

20 minutos para terminar de preparar la demo. El docente y los asistentes ayudan a resolver los últimos problemas.

### Lista de verificación antes de presentar

**El flujo:**
- [ ] El flujo de entrada está activo y procesó eventos reales esta semana
- [ ] El nodo OpenAI de clasificación está configurado y funciona correctamente
- [ ] Hay al menos una respuesta automática que se envía sin intervención humana
- [ ] Hay al menos una ruta de escalada con alerta al equipo
- [ ] El análisis de sentimiento o urgencia está integrado (aunque sea de forma básica)
- [ ] El reporte semanal se generó al menos una vez (puede ser ejecución manual)

**Los números:**
- [ ] ¿Cuántos mensajes procesó el sistema esta semana?
- [ ] ¿Cuántos clasificó correctamente? (estimado si no hay registro exacto)
- [ ] ¿Cuántos casos urgentes detectó antes de que el cliente escalara?
- [ ] ¿Cuántos mensajes respondió automáticamente sin intervención?
- [ ] ¿Cuánto tiempo hubiera llevado hacer todo esto a mano?

**La demo:**
- [ ] n8n con el flujo abierto y visible en pantalla
- [ ] La planilla o base de datos abierta para mostrar los registros
- [ ] El canal de Slack o Gmail con las alertas
- [ ] Un mensaje o email listo para enviar durante la presentación

---

### Cómo mostrar el sistema en 7-8 minutos

**El guión sugerido:**

*1 minuto — El problema:*
"El proceso que automaticé es [nombre]. Antes, para gestionar estos mensajes había que [descripción manual]. Recibimos [X] mensajes por semana y llevaba [Y] horas gestionarlos. El equipo los atendía manualmente y los casos urgentes no siempre recibían prioridad."

*1 minuto — El sistema:*
"Lo que construí tiene estos componentes: [mostrar el flujo en n8n y describir brevemente cada sección]."

*3 minutos — Demo en vivo:*
Enviar un mensaje o email y mostrar en tiempo real:
- El trigger se activa
- La IA clasifica el mensaje (mostrar el resultado en el panel de datos)
- La respuesta se envía o la alerta llega al canal
- El registro aparece en la planilla

Si el flujo tarda más de 30 segundos, preparar un segundo tab con el resultado de una ejecución reciente como respaldo.

*1 minuto — El reporte:*
Mostrar el reporte generado automáticamente. Leer las recomendaciones que generó la IA.

*2 minutos — El impacto:*
"Esta semana el sistema procesó [X] mensajes. Respondió automáticamente [Y] sin que nadie interviniera. Detectó [Z] casos urgentes antes de que el cliente escribiera de nuevo. A [minutos] por mensaje manual, eso equivale a [horas] ahorradas."

---

## Presentaciones (0:35 – 1:40)

Cada participante tiene **7 a 8 minutos** para presentar. El docente mantiene el tiempo.

### Ronda de preguntas y feedback

Después de cada presentación, el grupo tiene 1–2 minutos para una observación:
- ¿Cuál es el componente del sistema que más les impresionó?
- ¿Qué agregarían como siguiente iteración del sistema?
- ¿Qué parte de su propio negocio se parecería más a esto?

---

### Tabla de sistemas presentados

El docente completa en pantalla durante las presentaciones:

| Participante | Negocio | Clasificación IA | Respuesta automática | Detección urgencia | Reporte |
|---|---|---|---|---|---|
| | | ✅ / ⚠️ | ✅ / ⚠️ | ✅ / ⚠️ | ✅ / ⚠️ |

Leyenda: ✅ funcionando · ⚠️ en construcción

---

## Cierre del Bloque 3 (1:40 – 1:50)

### Lo que construimos en estas 5 semanas

| Clase | Lo que aprendiste | Lo que construiste |
|---|---|---|
| 11 | Conectar la IA a un flujo y clasificar con lenguaje natural | Clasificador inteligente de mensajes con OpenAI |
| 12 | Generar respuestas personalizadas con datos reales del pedido | Nodo de redacción automática con contexto del cliente |
| 13 | Analizar sentimiento y urgencia para detectar casos críticos | Detector de insatisfacción con alertas diferenciadas |
| 14 | Generar reportes y documentos automáticos a partir de datos acumulados | Reporte semanal ejecutivo generado sin intervención |
| 15 | Integrar todos los componentes en un sistema cohesivo | Sistema completo de atención con IA |

### El estado del agente de Lumina después del Bloque 3

El agente de Lumina, hasta ahora, puede:

- ✅ Capturar todos los emails entrantes automáticamente
- ✅ Registrarlos en Google Sheets con fecha y canal
- ✅ **Clasificar el tipo de mensaje con IA** (no con palabras clave)
- ✅ **Redactar respuestas personalizadas** con los datos reales del pedido
- ✅ **Detectar clientes insatisfechos** antes de que escalen, con análisis de sentimiento y urgencia
- ✅ **Alertar al equipo** con dos niveles de prioridad según la urgencia del caso
- ✅ **Generar el reporte ejecutivo semanal** automáticamente cada lunes

Lo que le falta: ser un agente verdadero. Hoy el sistema responde a eventos y genera documentos, pero no toma decisiones de varias etapas ni navega sistemas externos por sí solo. En el Bloque 4 construimos eso: el agente que razona, planifica y ejecuta secuencias de acciones complejas.

### La diferencia conceptual entre automatización e IA

> En el Bloque 2 construimos sistemas que siguen reglas. En el Bloque 3 construimos sistemas que comprenden. La diferencia es enorme: un sistema con reglas solo puede hacer lo que anticipamos; un sistema con comprensión puede manejar lo que no anticipamos. Eso es lo que hace que el sistema de atención que construyeron hoy sea cualitativamente distinto de lo que tenían antes.

### El mensaje para llevarse del Bloque 3

> Cada uno de los sistemas que presentaron hoy hace algo que antes solo podía hacer una persona. No perfectamente — ningún sistema lo hace desde el primer día. Pero funcionalmente: lee el mensaje, entiende de qué se trata, responde o alerta, y reporta. Eso es IA en un negocio real. No en un laboratorio, no en una demo preparada — en el negocio, con los datos del negocio, resolviendo los problemas del negocio.

---

## Tarea para la semana 16 (1:50 – 2:00)

### Preparación para el Bloque 4: El agente completo

El Bloque 4 es el sprint final del programa. Construimos el agente autónomo: un sistema que no solo responde a eventos, sino que puede razonar, usar herramientas y ejecutar secuencias de acciones complejas.

Para llegar preparado a la semana 16:

**1. Mantener el sistema del Bloque 3 funcionando**
El sistema de atención tiene que seguir operando durante el Bloque 4. Es la base sobre la que se construye el agente.

**2. Identificar el proceso más complejo del negocio**
De todos los procesos del mapa de automatización del Bloque 1, ¿cuál requiere más pasos, más decisiones intermedias, o el acceso a más sistemas distintos? Ese es el candidato para el Bloque 4.

**3. Crear cuenta en la herramienta de agentes (según la que se use en el programa)**
El docente confirma qué herramienta se va a usar en el Bloque 4 (opciones: n8n con AI Agent node, Make + GPT, Flowise, o desarrollo propio con la API de Anthropic).

---

## Recursos para el Bloque 4

| Herramienta | Para qué | Cómo acceder |
|---|---|---|
| n8n AI Agent node | Agente con razonamiento y herramientas | Disponible en n8n Cloud (plan gratuito) |
| Anthropic Claude API | Modelo con capacidad de razonamiento extendido | console.anthropic.com |
| OpenAI Assistants API | Agentes con memoria y herramientas | platform.openai.com |

---

## Resumen del Bloque 3

**Lo que sabés hacer ahora:**
- Conectar un modelo de IA (OpenAI GPT-4o, Gemini) a cualquier flujo en n8n
- Diseñar prompts de clasificación, redacción y análisis que producen resultados consistentes
- Parsear respuestas JSON de la IA y usarlas como datos estructurados en el flujo
- Detectar sentimiento y urgencia en texto libre para priorizar la atención
- Generar documentos y reportes automáticos a partir de datos acumulados
- Integrar múltiples componentes de IA en un sistema cohesivo

**Lo que construiste:**
- Clasificador inteligente de mensajes con comprensión del lenguaje natural
- Sistema de respuestas automáticas personalizadas con los datos reales del cliente
- Detector de insatisfacción con alertas diferenciadas por prioridad
- Reporte ejecutivo semanal generado automáticamente
- Sistema completo de atención con IA adaptado al propio negocio

**Lo que viene:**
- Bloque 4: el agente autónomo — un sistema que razona, planifica y ejecuta secuencias de acciones complejas para resolver problemas de punta a punta

---

*AI Automation — Diplomatura No-Code · Bloque 3: IA en tu negocio · Clase 15 de 20*
