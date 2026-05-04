# Clase 10 — Entregable 2: Pipeline operativo de tu negocio

**Bloque 2: Automatizaciones · Semana 10 de 20**
**Duración:** 2 horas · **Tipo:** Entregable · **Nivel:** Intermedio

---

## Objetivo de la clase

Que cada participante demuestre en vivo un flujo funcional que automatiza un proceso real de su negocio — conectando al menos tres herramientas, con lógica condicional y manejo de errores. Al terminar, el grupo tiene una colección de pipelines reales de distintos tipos de negocio.

---

## Agenda

| Tiempo | Bloque | Descripción |
|---|---|---|
| 0:00 – 0:15 | Apertura | Contexto del entregable y criterios |
| 0:15 – 0:35 | Trabajo individual | Tiempo final para pulir y preparar la demo |
| 0:35 – 1:40 | Presentaciones | Demos en vivo (6–7 min cada participante) |
| 1:40 – 1:50 | Cierre del bloque | Síntesis y preview del Bloque 3 |
| 1:50 – 2:00 | Tarea | Preparación para la semana 11 |

---

## Apertura (0:00 – 0:15)

### Qué es el pipeline operativo

Un **pipeline operativo** es un flujo automatizado que reemplaza un proceso manual del negocio. No es un experimento ni una prueba — es algo que ya está corriendo y procesando eventos reales.

El pipeline del Entregable 2 tiene que cumplir estas condiciones:

**1. Conecta al menos 3 herramientas**
Por ejemplo: Gmail → n8n → Google Sheets + Slack. El flujo tiene que cruzar más de una aplicación.

**2. Tiene lógica condicional**
Al menos un nodo IF o Switch que tome decisiones distintas según el contenido de los datos.

**3. Tiene manejo de errores**
Al menos una ruta alternativa cuando los datos no son los esperados, o un workflow de errores global activo.

**4. Procesa eventos reales**
El flujo tiene que haber funcionado con datos reales durante al menos la última semana, no solo en modo test.

**5. El impacto es medible**
Cuántos eventos procesó la última semana y cuánto tiempo hubiera llevado hacerlo a mano.

### Criterios de una buena demo

| Criterio | Descripción |
|---|---|
| **Funciona en vivo** | El flujo se activa durante la presentación con un dato real |
| **Se entiende qué hace** | Cualquier persona del grupo puede explicar el propósito del flujo |
| **El impacto está calculado** | Hay un número concreto de tiempo ahorrado por semana |
| **Los errores están contemplados** | Se muestra qué pasa cuando algo falla |

---

## Trabajo individual (0:15 – 0:35)

20 minutos para terminar de preparar la demo. El docente y los asistentes ayudan a resolver los últimos problemas.

### Lista de verificación antes de presentar

- [ ] El flujo está activo (toggle "Active" encendido en n8n)
- [ ] Tiene al menos 3 nodos de herramientas distintas conectados
- [ ] Tiene al menos un nodo IF o Switch con dos ramas
- [ ] Tiene al menos una ruta de manejo de error o un workflow de errores configurado
- [ ] Se puede demostrar en vivo enviando un email o completando un formulario
- [ ] Tengo calculado cuántos eventos procesó la última semana
- [ ] Tengo calculado cuánto tiempo hubiera llevado hacerlo a mano

### Preparación de la demo en 3 pasos

**Paso 1 — Abrir todo en pestañas:**
- n8n con el flujo abierto y visible
- La planilla o base de datos de destino
- El canal de notificaciones (Slack, email, Notion)

**Paso 2 — Preparar el dato de prueba:**
- Un email de prueba listo para enviar, o
- Un formulario listo para completar, o
- Una fila lista para agregar a la planilla

**Paso 3 — Tener los números a mano:**
- Eventos procesados la última semana
- Tiempo estimado por evento si se hiciera a mano
- Total de tiempo ahorrado

---

## Presentaciones (0:35 – 1:40)

Cada participante tiene **6 a 7 minutos** para presentar. El docente mantiene el tiempo.

### Formato de la demo

**1. (1 min) Contexto:**
*"El proceso que automaticé es [nombre]. Antes, para hacer esto había que [descripción manual]. Tardaba [X minutos] y pasaba [X veces] por semana."*

**2. (3 min) Demo en vivo:**
Activar el evento en tiempo real y mostrar cómo el flujo lo procesa. El grupo observa en pantalla cómo los datos viajan de un nodo al siguiente.

**3. (1 min) Mostrar el manejo de errores:**
Demostrar qué pasa cuando los datos no son los esperados.

**4. (1 min) El impacto:**
*"Esta semana el flujo procesó [X] eventos. A [Y] minutos por evento, eso es [X×Y] minutos, o sea [horas] que no tuve que dedicar a esta tarea."*

---

### Ronda de feedback

Después de cada demo, el grupo tiene 1 minuto para una observación:
- ¿Qué aspecto del flujo les pareció más ingenioso o útil?
- ¿Qué agregarían como siguiente paso?

---

## Cierre del Bloque 2 (1:40 – 1:50)

### Lo que construimos en estas 5 semanas

| Clase | Lo que aprendiste | Lo que construiste |
|---|---|---|
| 06 | n8n y la captura automática de eventos | Flujo de captura de consultas entrantes |
| 07 | Lógica condicional: distintas acciones según el caso | Flujo con bifurcaciones IF/Switch |
| 08 | Conectar canales de equipo: Slack, WhatsApp, Notion | Notificaciones al canal correcto según el evento |
| 09 | Manejo de errores: flujos que no se rompen en silencio | Rutas alternativas y workflow de errores global |
| 10 | Presentar y medir el impacto de una automatización | Pipeline operativo funcionando en el negocio |

### Dónde estamos en el caso Lumina

El agente de Lumina, hasta ahora, puede:
- ✅ Capturar todos los emails entrantes automáticamente
- ✅ Registrarlos en Google Sheets con fecha y canal
- ✅ Detectar si es un reclamo o una consulta normal
- ✅ Enviar alertas al equipo por Slack cuando llega un reclamo
- ✅ Buscar el pedido del cliente y responder con el estado
- ✅ Manejar el caso de pedido no encontrado sin romperse

Lo que le falta: **inteligencia**. Hoy el flujo distingue reclamos de consultas buscando palabras clave fijas. Pero eso no escala — hay miles de formas de escribir un reclamo que no contienen las palabras que definimos.

En el Bloque 3 conectamos la IA al flujo. El sistema va a leer el mensaje completo, entender de qué se trata sin reglas fijas, y generar respuestas personalizadas con los datos reales del pedido.

### El mensaje para llevarse del Bloque 2

> Lo que construimos en estas cinco semanas no es una demo. Es infraestructura. Un sistema que está corriendo en tu negocio ahora mismo, procesando eventos, tomando decisiones, notificando al equipo. No perfecta — ningún sistema lo es desde el primer día. Pero funcional, medible y mejorable. Eso es lo que separa automatizar de experimentar.

---

## Tarea para la semana 11 (1:50 – 2:00)

### Preparación para el Bloque 3: IA en tu negocio

El Bloque 3 agrega IA a los flujos que ya construiste. Para que eso funcione desde el primer día de clase, preparar:

**1. Cuenta activa en OpenAI (para usar ChatGPT via API)**
- Ir a platform.openai.com
- Crear cuenta y generar una API key
- El plan gratuito tiene créditos iniciales suficientes para las primeras semanas
- Guardar la API key en un lugar seguro — se usa desde la clase 11

**2. Revisar los prompts de la clase 2**
- Abrir los 3 prompts que construiste en la semana 2
- Verificar que tienen variables `{{campo}}`
- Ajustar si es necesario ahora que conocés mejor el flujo y los datos disponibles

**3. Identificar el proceso que más se beneficia de IA**
De los 3 procesos del mapa de automatización, ¿cuál requiere interpretar texto libre de clientes? Ese es el candidato para agregar IA en el Bloque 3.

---

## Recursos para el Bloque 3

| Herramienta | Para qué | Cómo acceder |
|---|---|---|
| OpenAI Platform | API de ChatGPT para flujos | platform.openai.com |
| Google Gemini API | Alternativa gratuita | aistudio.google.com |
| n8n AI Nodes | Integración nativa de IA en flujos | Disponible en n8n Cloud |

---

## Resumen del Bloque 2

**Lo que sabés hacer ahora:**
- Construir flujos de múltiples pasos en n8n con triggers, transformaciones y acciones
- Agregar lógica condicional con nodos IF y Switch para que el sistema tome decisiones
- Conectar herramientas de comunicación de equipo: Slack, WhatsApp, Telegram, Notion
- Hacer flujos resilientes con manejo de errores y alertas cuando algo falla
- Medir el impacto de una automatización en tiempo ahorrado por semana

**Lo que construiste:**
- Pipeline operativo funcionando en el negocio con al menos 3 herramientas conectadas
- Lógica condicional que toma decisiones distintas según el contenido de los datos
- Notificaciones al canal correcto del equipo según el tipo de evento
- Sistema de manejo de errores que avisa cuando algo falla en lugar de romperse en silencio

**Lo que viene:**
- Bloque 3: agregar inteligencia artificial a los flujos para clasificar, responder y detectar casos críticos sin reglas fijas

---

*AI Automation — Diplomatura No-Code · Bloque 2: Automatizaciones · Clase 10 de 20*
