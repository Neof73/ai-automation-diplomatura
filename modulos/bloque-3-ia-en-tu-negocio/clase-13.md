# Clase 13 — La IA detecta clientes insatisfechos antes de que escalen

**Bloque 3: IA en tu negocio · Semana 13 de 20**
**Duración:** 2 horas · **Tipo:** Práctica · **Nivel:** Intermedio-Avanzado

---

## Objetivo de la clase

Que cada participante configure un sistema de detección temprana de insatisfacción: un análisis de sentimiento y urgencia que identifica clientes en riesgo antes de que el problema escale, y alerta al equipo con contexto suficiente para actuar. Al terminar, el flujo tiene que diferenciar entre un cliente que pregunta y uno que está a punto de irse.

---

## Agenda

| Tiempo | Bloque | Descripción |
|---|---|---|
| 0:00 – 0:10 | Apertura | Revisión de las respuestas automáticas de la semana anterior |
| 0:10 – 0:30 | Bloque 1 | Qué es el análisis de sentimiento y por qué importa |
| 0:30 – 1:00 | Bloque 2 | Sentiment + urgencia: el prompt de detección temprana |
| 1:00 – 1:20 | Bloque 3 | El sistema de alertas de Lumina — construido en vivo |
| 1:20 – 1:45 | Ejercicio | Cada participante configura su detector de insatisfacción |
| 1:45 – 1:55 | Cierre | Qué pasa después de la alerta |
| 1:55 – 2:00 | Tarea | Explicación de la tarea de la semana |

---

## Apertura (0:00 – 0:10)

### Revisión de la semana anterior

¿Cómo salieron las respuestas automáticas? El docente pide que compartan una respuesta generada por el flujo que les pareció especialmente buena, y una que no funcionó como esperaban.

Para las que no funcionaron: ¿qué pasó? ¿El prompt era ambiguo? ¿Faltaban datos? ¿La temperatura era muy alta? El docente ajusta en vivo.

### El problema que resolvemos hoy

El flujo actual maneja dos tipos de mensajes:
- **CONSULTA** → respuesta automática con datos del pedido
- **RECLAMO** → alerta al equipo

Pero hay un tercer tipo que es el más valioso de detectar: el cliente que todavía no hizo un reclamo formal, pero está frustrado, tiene un problema, y si nadie actúa en las próximas horas, va a escalar, pedir una devolución o publicar una reseña negativa.

Ese cliente no siempre usa las palabras "reclamo" o "problema". Puede escribir:
- *"No entiendo por qué demora tanto"*
- *"Ya es la tercera vez que escribo"*
- *"Necesito que alguien me llame hoy"*
- *"Si no me responden me tengo que ir a otro lado"*

Detectar esas señales antes de que el cliente explote es atención al cliente preventiva. La IA puede leer esas señales en cualquier mensaje.

---

## Bloque 1 — Qué es el análisis de sentimiento y por qué importa (0:10 – 0:30)

### Sentimiento: cómo se siente el cliente al escribir

El análisis de sentimiento clasifica el tono emocional de un texto. En el contexto de atención al cliente, los niveles que importan son:

| Nivel | Qué señala | Ejemplo |
|---|---|---|
| **Positivo** | El cliente está satisfecho o hace una consulta neutra | "¿Cuándo llega mi pedido? Gracias!" |
| **Neutro** | Consulta sin carga emocional | "Quería saber el estado del envío." |
| **Negativo leve** | Incomodidad o impaciencia | "Ya pasaron 5 días y todavía no llegó." |
| **Negativo fuerte** | Frustración activa, cliente en riesgo | "Esto es una falta de respeto, escribí 3 veces y nadie me respondió." |
| **Crítico** | El cliente está a punto de escalar | "Si no recibo respuesta hoy iniciaré un reclamo formal." |

El sentimiento por sí solo no alcanza — un cliente puede escribir en tono negativo y tener un problema simple de resolver. Por eso se combina con otro indicador.

### Urgencia: qué tan urgente es el caso para el cliente

La urgencia indica si el cliente necesita respuesta inmediata o puede esperar:

| Nivel | Señales | Ejemplo |
|---|---|---|
| **Baja** | Consulta sin indicadores temporales | "¿Me podés dar información sobre el estado?" |
| **Media** | Menciona fechas o expectativas | "Necesito el pedido para la semana que viene." |
| **Alta** | Hay un evento o fecha límite inminente | "Lo necesito para mañana, es un regalo." |
| **Crítica** | El cliente dice que va a actuar si no recibe respuesta | "Si no me responden hoy llamo a defensa del consumidor." |

### Por qué la combinación importa

| Sentimiento | Urgencia | Interpretación | Acción |
|---|---|---|---|
| Neutro | Baja | Consulta normal | Respuesta automática |
| Negativo leve | Media | Cliente con expectativa | Respuesta rápida con disculpa |
| Negativo fuerte | Alta | Cliente en riesgo | Alerta inmediata al equipo |
| Crítico | Crítica | Cliente que está a punto de escalar | Escalada prioritaria |

Esta combinación permite priorizar los casos que necesitan atención humana real, sin que el equipo tenga que leer todos los mensajes.

---

## Bloque 2 — El prompt de detección temprana (0:30 – 1:00)

### Diseño del prompt

Para obtener un análisis de sentimiento y urgencia en formato que el flujo pueda procesar, se pide un JSON con campos específicos:

```
[System Prompt]
Sos un analizador de mensajes de clientes para un negocio de atención al cliente.
Analizás el sentimiento y la urgencia del mensaje.

Respondé SIEMPRE en formato JSON con esta estructura exacta:
{
  "sentimiento": "positivo | neutro | negativo_leve | negativo_fuerte | critico",
  "urgencia": "baja | media | alta | critica",
  "señales": ["lista de frases o elementos del mensaje que justifican la clasificación"],
  "requiere_atencion_humana": true | false,
  "resumen": "una frase que describe la situación del cliente"
}

Criterios para requiere_atencion_humana = true:
- sentimiento negativo_fuerte o critico
- urgencia alta o critica
- el cliente menciona que ya escribió antes sin respuesta
- el cliente amenaza con una acción (reclamo formal, devolución, reseña)
- cualquier combinación que indique riesgo de perder al cliente
```

```
[User Message]
{{ $json.mensaje }}
```

### Parsear el JSON en n8n

Cuando el nodo OpenAI devuelve un JSON, n8n lo recibe como texto. Para acceder a los campos hay que parsearlo:

**Opción A — Nodo "Set" con expresión JSON.parse:**
```
{{ JSON.parse($json.message.content).sentimiento }}
{{ JSON.parse($json.message.content).requiere_atencion_humana }}
```

**Opción B — Nodo "Code" (JavaScript):**
```javascript
const respuesta = JSON.parse($input.item.json.message.content);
return {
  sentimiento: respuesta.sentimiento,
  urgencia: respuesta.urgencia,
  requiere_atencion: respuesta.requiere_atencion_humana,
  resumen: respuesta.resumen,
  señales: respuesta.señales.join(', ')
};
```

El docente muestra ambas opciones y recomienda la opción A para quien no tiene experiencia con código, y la B para quien quiere más control.

### Cómo leer el resultado en el IF

```
[IF: requiere_atencion_humana = true]
   /                    \
[TRUE: alerta urgente]  [FALSE: continuar flujo normal]
```

Y dentro de la alerta, se puede agregar una segunda condición:

```
[IF: sentimiento = "critico" O urgencia = "critica"]
   /                    \
[TRUE: alerta            [FALSE: alerta
PRIORITARIA]              estándar]
```

---

## Bloque 3 — El sistema de alertas de Lumina, construido en vivo (1:00 – 1:20)

### El problema de Lumina

El equipo de atención de Lumina recibe alertas por todos los reclamos. Pero algunos de esos reclamos son urgentes (el cliente tiene fecha límite, ya escribió antes, amenaza con accionar) y otros son rutinarios (el producto llegó en mal estado pero el cliente lo menciona sin apuro).

Con el flujo actual, todos los reclamos generan la misma alerta. El equipo los procesa en orden de llegada — y a veces el caso urgente queda último.

### El flujo con detección de prioridad

```
[Gmail Trigger]
      ↓
[Set: extraer campos]
      ↓
[Google Sheets: registrar]
      ↓
[OpenAI: clasificar tipo]
      ↓
[IF: ¿es RECLAMO?]
   /                \
[TRUE]            [FALSE: continuar a CONSULTA/OTRO]
   ↓
[OpenAI: analizar sentimiento y urgencia]
   ↓
[Set: parsear JSON de la respuesta]
   ↓
[IF: ¿requiere_atencion_humana?]
   /                       \
[TRUE]                   [FALSE: reclamo simple,
   ↓                      registro y seguimiento]
[IF: ¿sentimiento crítico
 o urgencia crítica?]
   /             \
[TRUE:          [FALSE:
 Slack          Slack
 PRIORITARIO]   estándar]
      ↓               ↓
[Google Sheets: actualizar estado a "URGENTE"]
```

### El mensaje de alerta a Slack

**Alerta prioritaria:**
```
🔴 *RECLAMO PRIORITARIO — Atención inmediata*

*Cliente:* {{ $json.email_cliente }}
*Sentimiento:* {{ $json.sentimiento }} | *Urgencia:* {{ $json.urgencia }}
*Resumen:* {{ $json.resumen }}

*Señales detectadas:*
{{ $json.señales }}

*Mensaje completo:*
{{ $('ExtraerCampos').item.json.mensaje }}

⚡ Este cliente requiere respuesta en menos de 1 hora.
```

**Alerta estándar:**
```
🟡 *Reclamo recibido — Atención necesaria*

*Cliente:* {{ $json.email_cliente }}
*Sentimiento:* {{ $json.sentimiento }} | *Urgencia:* {{ $json.urgencia }}
*Resumen:* {{ $json.resumen }}

*Mensaje:*
{{ $('ExtraerCampos').item.json.mensaje }}
```

### Registro en Google Sheets

El docente agrega columnas nuevas a la planilla de Lumina para registrar el análisis de la IA:

| Columna | Dato |
|---|---|
| Sentimiento | `{{ $json.sentimiento }}` |
| Urgencia | `{{ $json.urgencia }}` |
| Atención Humana | `{{ $json.requiere_atencion }}` |
| Resumen IA | `{{ $json.resumen }}` |

Con esos datos en la planilla, se puede filtrar por prioridad y ver el histórico de casos urgentes.

---

## Ejercicio práctico (1:20 – 1:45)

> Cada participante configura el análisis de sentimiento y urgencia para su negocio.

### Paso 1 — Definir qué significa "urgente" en tu negocio (5 min)

Los criterios de urgencia dependen del negocio:

| Negocio | Caso urgente |
|---|---|
| E-commerce | Cliente con evento inminente, amenaza de reclamo formal |
| Consultora | Cliente con deadline de proyecto en días |
| Servicio con turnos | Cliente que canceló y quiere reschedulear para hoy |
| Tienda local | Cliente que no recibió un pedido prometido para hoy |

Escribir 3 a 5 criterios concretos que definen urgencia en el contexto del propio negocio.

---

### Paso 2 — Adaptar el system prompt (10 min)

Tomar el prompt del ejemplo de Lumina y ajustarlo:
- Agregar los criterios de urgencia del negocio propio
- Ajustar las definiciones de sentimiento si hay matices particulares
- Mantener el formato JSON exacto

---

### Paso 3 — Conectar al flujo y configurar las alertas (15 min)

1. Agregar el nodo OpenAI de análisis de sentimiento al flujo
2. Agregar el nodo Set para parsear el JSON
3. Agregar el nodo IF para separar los casos que requieren atención humana
4. Configurar el mensaje de alerta en Slack o email con los datos relevantes
5. Probar con al menos 3 mensajes: uno neutro, uno negativo y uno crítico

---

## Cierre (1:45 – 1:55)

El docente envía en vivo tres mensajes con distintos niveles de sentimiento y el grupo observa cómo el flujo diferencia la alerta para cada caso.

Mensaje clave para el cierre:

> En atención al cliente, el momento más costoso no es cuando el cliente explota — es el momento antes de que explote, cuando todavía hay tiempo de resolver el problema. La IA puede leer las señales de ese momento en cada mensaje que llega. El flujo que construimos hoy detecta esos casos y avisa antes de que sea tarde. Eso no es automatización — es ventaja competitiva.

---

## Tarea de la semana

1. **Flujo con análisis de sentimiento activo** durante toda la semana.
2. **Revisar las alertas recibidas:** ¿el análisis fue correcto? ¿hubo falsos positivos (alertas innecesarias) o falsos negativos (casos urgentes que no se detectaron)?
3. **Ajustar los criterios en el prompt** según los resultados reales.
4. **Calcular la diferencia:** esta semana, ¿cuántos casos urgentes detectó el flujo antes de que el cliente escale? ¿Cuánto tiempo tardaron en recibir respuesta comparado con la semana anterior?

---

## Recursos y herramientas

| Herramienta | Para qué | Cómo acceder |
|---|---|---|
| n8n Cloud | Flujo con análisis de sentimiento | cloud.n8n.io |
| OpenAI API | Modelo de análisis | platform.openai.com |
| Slack | Canal de alertas del equipo | slack.com |
| Airtable | Alternativa a Google Sheets para gestión de casos | airtable.com |

---

*AI Automation — Diplomatura No-Code · Bloque 3: IA en tu negocio · Clase 13 de 20*
