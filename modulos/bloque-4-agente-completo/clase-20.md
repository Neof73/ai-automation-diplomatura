# Clase 20 — Demo Day: tu negocio automatizado, en vivo

**Bloque 4: Agente completo · Semana 20 de 20**
**Duración:** 2 horas · **Tipo:** Demo Day · **Nivel:** Avanzado

---

## Objetivo de la clase

Que cada participante presente en vivo el sistema completo de automatización + IA que construyó durante el programa — con demo funcionando en tiempo real, métricas de impacto reales y una narrativa clara de qué cambió en su negocio. Al terminar, el grupo habrá visto una colección de sistemas reales aplicados a distintos tipos de negocio, y cada participante se lleva un sistema funcionando y el conocimiento para seguir construyendo.

---

## Agenda

| Tiempo | Bloque | Descripción |
|---|---|---|
| 0:00 – 0:10 | Apertura | El cierre del programa: de dónde venimos y a dónde llegamos |
| 0:10 – 1:30 | Presentaciones | Demo Day (10 min por participante) |
| 1:30 – 1:45 | Síntesis | El docente cierra con los patrones del grupo |
| 1:45 – 1:55 | Comunidad y siguientes pasos | Qué hacer después del programa |
| 1:55 – 2:00 | Cierre | Palabras finales |

---

## Apertura (0:00 – 0:10)

### El recorrido de 20 semanas

El docente recorre en pantalla, clase por clase, lo que construyó el grupo:

**Bloque 1 — Fundamentos:**
Aprendieron a identificar qué automatizar, a hablarle a la IA con prompts estructurados, a organizar datos en tablas, a construir el primer flujo con Zapier y a mapear los procesos del propio negocio.

**Bloque 2 — Automatizaciones:**
Construyeron flujos de múltiples pasos en n8n, agregaron lógica condicional, conectaron herramientas de comunicación de equipo, hicieron flujos resilientes con manejo de errores y entregaron el primer pipeline operativo funcionando.

**Bloque 3 — IA en tu negocio:**
Conectaron la API de OpenAI al flujo, reemplazaron reglas fijas por comprensión del lenguaje, generaron respuestas automáticas que suenan humanas, detectaron clientes insatisfechos antes de que escalaran y automatizaron los reportes ejecutivos semanales.

**Bloque 4 — Agente completo:**
Construyeron el agente con razonamiento y herramientas, lo adaptaron al propio negocio, calcularon el ROI real del sistema y llegaron al Demo Day con un sistema probado y una narrativa de impacto.

### El único criterio del Demo Day

> No importa si el sistema es perfecto. Importa que funciona, que resuelve un problema real y que podés explicar cuánto vale.

---

## Presentaciones (0:10 – 1:30)

Cada participante tiene **10 minutos exactos**. El docente mantiene el tiempo con una señal a los 8 minutos y una señal de cierre a los 10.

### Formato de la presentación

**1 minuto — El antes:**
Describir el proceso antes de la automatización. ¿Cuánto tiempo llevaba? ¿Quién lo hacía? ¿Qué problemas tenía?

**1 minuto — El sistema en una oración:**
Explicar qué hace el sistema en palabras que cualquier persona del grupo puede entender, sin vocabulario técnico.

**4 minutos — La demo en vivo:**
Activar el sistema en tiempo real. El grupo observa en pantalla. El participante narra brevemente lo que está pasando en cada paso sin detenerse a explicar la tecnología.

Si la demo demora más de 30 segundos en un paso, preparar una pantalla de "mientras espera" mostrando el log de la semana o el dashboard.

**2 minutos — Los números:**
Citar los números de impacto de memoria (no leerlos de la pantalla):
- Mensajes procesados esta semana
- Tasa de resolución automática
- Tiempo ahorrado en horas
- ROI del sistema

**2 minutos — El siguiente paso:**
¿Qué haría si tuviera 3 meses más para seguir desarrollando este sistema? ¿Qué herramienta agregaría al agente? ¿Qué proceso automatizaría a continuación?

---

### Ronda de preguntas del grupo

Después de cada presentación, el grupo tiene **2 minutos** para preguntas. El docente modera con esta estructura:

- Primera pregunta: "¿Qué fue lo más difícil de construir?"
- Segunda pregunta: libre del grupo

---

### Tabla de sistemas del Demo Day

El docente completa en pantalla durante las presentaciones. Esta tabla queda como documento del grupo.

| Participante | Negocio | Proceso automatizado | ROI / impacto principal | Próximo paso |
|---|---|---|---|---|
| | | | | |
| | | | | |
| | | | | |
| | | | | |

---

## Síntesis del docente (1:30 – 1:45)

### Los patrones que emergieron del grupo

Después de todas las presentaciones, el docente señala los patrones que observó:

**Qué tipos de procesos se automatizaron más:**
El docente anota en pantalla los tres procesos más frecuentes. Típicamente: atención al cliente, registro de leads o consultas, y reportes.

**Qué herramientas aparecieron más:**
Gmail, Google Sheets, Slack, OpenAI. Eso muestra que el stack de herramientas del programa cubre el 80% de los casos reales de negocio.

**Qué aprendizajes fueron los más mencionados:**
El docente pregunta al grupo: ¿cuál fue la clase que más cambió la forma en que piensan la automatización? Las respuestas revelan qué fue más difícil de incorporar conceptualmente.

**El error más común:**
El docente comparte cuál fue el error técnico más frecuente que vio durante el programa (típicamente: prompts demasiado vagos, o no manejar el caso de "dato no encontrado") y explica la lección general.

---

### Lo que el programa no enseñó (a propósito)

El docente nombra tres cosas que el programa dejó afuera deliberadamente, para que el grupo sepa que existen:

**1. Agentes más avanzados con memoria persistente**
Los agentes que construyeron hoy tienen memoria de la sesión. Hay arquitecturas donde el agente recuerda el historial de cada cliente entre conversaciones — útil para negocios de alto volumen o relaciones de largo plazo. Herramientas: Langchain, Pinecone (base de datos vectorial), o la API de Assistants de OpenAI.

**2. Fine-tuning del modelo**
En lugar de instructar al modelo con un system prompt, se puede entrenar un modelo específico con ejemplos del propio negocio. Esto mejora la precisión para casos muy específicos. Es más costoso y complejo, pero existe y vale explorar cuando el volumen lo justifica.

**3. Agentes multi-paso con planificación**
El agente de n8n resuelve una tarea a la vez. Hay arquitecturas de agentes que pueden descomponer una tarea compleja en sub-tareas, asignar cada una a un sub-agente especializado y coordinar los resultados. Ejemplo: un agente de ventas que busca prospectos, investiga cada uno, redacta un email personalizado y decide el mejor momento para enviarlo.

---

## Comunidad y siguientes pasos (1:45 – 1:55)

### Lo que continúa después del programa

**El sistema que construyeron sigue corriendo.**
No es un proyecto de fin de curso que se archiva — es infraestructura activa del negocio. La tarea inmediata después del programa es mantenerlo funcionando y monitoreando.

**El sistema va a mejorar con el uso.**
Los primeros errores que aparecen con datos reales son los más valiosos. Cada ajuste al prompt o a las herramientas hace al sistema mejor. No hay un estado "terminado" — hay iteraciones.

### Recursos para seguir creciendo

**Para profundizar en n8n:**
- Comunidad oficial de n8n (community.n8n.io): miles de flujos compartidos, preguntas frecuentes, novedades
- Canal de YouTube de n8n: tutoriales actualizados con las últimas versiones

**Para profundizar en agentes:**
- Documentación de LangChain: el framework de referencia para agentes con Python
- Cookbook de OpenAI: ejemplos de agentes con la API de Assistants
- Anthropic Docs: documentación de la API de Claude, incluyendo tool use y agentes

**Para seguir con la comunidad del programa:**
- El grupo de WhatsApp / Slack del programa continúa activo
- Los participantes que quieran mentorear a la próxima cohorte son bienvenidos

### Tres cosas que hacer en los próximos 7 días

El docente da estas tres instrucciones concretas:

**1. Revisar el sistema el lunes a las 9**
El mismo horario que el reporte automático. Abrir n8n, revisar el historial de la semana, leer el reporte generado. Si hay algo raro, investigar.

**2. Compartir el sistema con alguien externo al programa**
Un cliente, un empleado, un socio. Mostrarles qué hace. La reacción de alguien que no lo vio crecer es el feedback más valioso — a veces preguntan cosas que el sistema no puede responder todavía, y eso define el siguiente paso.

**3. Documentar el sistema en una página**
En VS Code o Notion, escribir una descripción de una página del sistema: qué hace, cómo funciona en términos generales, qué herramientas usa, qué procesos reemplaza y cómo monitorearlo. Esto es para la próxima persona que necesite entenderlo — que puede ser uno mismo en 6 meses.

---

## Cierre (1:55 – 2:00)

### Las palabras finales del docente

> Cuando empezamos hace 20 semanas, la automatización era algo que pasa en empresas grandes con equipos de ingeniería. Hoy cada uno de los negocios de esta sala tiene un sistema de IA funcionando. No un prototipo — un sistema real, con datos reales, resolviendo problemas reales.
>
> Lo que cambió no es solo el negocio — es la forma en que piensan los procesos. Ahora cuando ven una tarea repetitiva, piensan "¿esto se puede automatizar?". Cuando ven un mensaje de cliente, piensan "¿la IA podría clasificarlo?". Ese cambio en la forma de ver el trabajo es más valioso que cualquier herramienta que usamos en el programa.
>
> El sistema que construyeron va a cambiar. Van a agregar herramientas, van a ajustar prompts, van a conectar sistemas nuevos. Y van a saber hacerlo porque lo aprendieron construyendo, no leyendo. Eso no se olvida.

---

## Resumen del Bloque 4

**Lo que sabés hacer ahora:**
- Diseñar y construir un agente de IA con razonamiento y herramientas en n8n
- Adaptar el sistema al contexto específico de cualquier negocio
- Medir el ROI real de un sistema de automatización + IA
- Testear un sistema de IA de forma estructurada antes de ponerlo en producción
- Presentar el sistema a cualquier audiencia con demo en vivo y métricas de impacto

**Lo que construiste:**
- Agente post-venta con razonamiento y múltiples herramientas
- Dashboard de métricas e impacto del sistema
- Sistema completo de automatización + IA adaptado al propio negocio
- Narrativa de ROI con datos reales y supuestos documentados

---

## Resumen del programa completo

**Las 20 semanas en una tabla:**

| Bloque | Semanas | Lo que construiste |
|---|---|---|
| 1 — Fundamentos | 1–5 | Mapa de automatización, prompts, primer flujo con Zapier |
| 2 — Automatizaciones | 6–10 | Pipeline operativo con n8n: captura, condiciones, notificaciones, manejo de errores |
| 3 — IA en tu negocio | 11–15 | Clasificación IA, respuestas personalizadas, detección de insatisfacción, reportes automáticos |
| 4 — Agente completo | 16–20 | Agente con razonamiento y herramientas, ROI calculado, Demo Day |

**El stack que dominas:**

| Capa | Herramientas |
|---|---|
| Automatización visual | n8n, Zapier |
| Comunicación | Gmail, Slack, WhatsApp Business |
| Datos | Google Sheets, Airtable |
| IA | OpenAI GPT-4o, Google Gemini |
| Agentes | n8n AI Agent |
| Edición y versionado | VS Code, Git |

---

*AI Automation — Diplomatura No-Code · Bloque 4: Agente completo · Clase 20 de 20*

---

*Fin del programa — AI Automation Diplomatura No-Code · 20 semanas · 40 horas de clase*
