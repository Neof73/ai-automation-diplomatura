# Clase 12 — Respuestas automáticas que suenan humanas

**Bloque 3: IA en tu negocio · Semana 12 de 20**
**Duración:** 2 horas · **Tipo:** Práctica · **Nivel:** Intermedio-Avanzado

---

## Objetivo de la clase

Que cada participante configure la IA para redactar respuestas personalizadas a clientes, usando los datos reales del pedido y el contexto del mensaje. Al terminar, el flujo tiene que leer el mensaje de un cliente, buscar su pedido, y responder con un texto que suene natural, completo y adaptado a esa persona — sin intervención humana.

---

## Agenda

| Tiempo | Bloque | Descripción |
|---|---|---|
| 0:00 – 0:10 | Apertura | Revisión del clasificador de la semana anterior |
| 0:10 – 0:35 | Bloque 1 | De la clasificación a la redacción: cómo la IA genera texto |
| 0:35 – 1:00 | Bloque 2 | Técnicas de prompt para respuestas de calidad |
| 1:00 – 1:20 | Bloque 3 | Las respuestas personalizadas de Lumina — construido en vivo |
| 1:20 – 1:45 | Ejercicio | Cada participante configura su nodo de redacción |
| 1:45 – 1:55 | Cierre | Revisión de calidad de las respuestas |
| 1:55 – 2:00 | Tarea | Explicación de la tarea de la semana |

---

## Apertura (0:00 – 0:10)

### Revisión de la semana anterior

Ronda rápida: ¿el clasificador funcionó bien? ¿hubo mensajes que clasificó incorrectamente? ¿tuvieron que ajustar el prompt?

El docente toma uno o dos ejemplos de clasificaciones incorrectas y muestra en vivo cómo ajustar el system prompt para corregirlas.

### El siguiente nivel: no solo clasificar, sino responder

El clasificador de la semana pasada dice *qué tipo* de mensaje es. Hoy el flujo va a *responder* ese mensaje.

La diferencia entre una respuesta automática genérica y una que suena humana está en tres cosas:
- **El nombre** del cliente
- **Los datos reales** del pedido (estado, fecha, número de tracking)
- **El tono** que refleja el contexto del mensaje (no es lo mismo responder a alguien que pregunta que a alguien que está enojado)

---

## Bloque 1 — De la clasificación a la redacción (0:10 – 0:35)

### Por qué los templates fijos no escalan

La solución más obvia para responder automáticamente es un template con campos variables:

```
Hola {{nombre}},

Tu pedido {{id}} está en estado {{estado}}.
Fecha estimada: {{fecha_entrega}}.
Número de seguimiento: {{tracking}}.

Equipo Lumina
```

Funciona para el caso estándar. Pero se rompe en cuanto el pedido no existe, o el tracking está vacío, o el cliente escribe en tono urgente y la respuesta suena indiferente.

La IA resuelve exactamente eso: recibe los datos y el contexto, y genera el texto apropiado para ese caso específico.

### Cómo la IA genera texto de calidad

La calidad de la respuesta depende directamente de lo que le damos a la IA:

**Datos del cliente y su pedido** → respuesta personalizada y precisa
**Contexto del mensaje original** → respuesta que responde a lo que el cliente preguntó
**Instrucciones de tono** → respuesta que suena como la marca, no como un robot
**Instrucciones de formato** → respuesta bien estructurada, ni muy larga ni muy corta

### La estructura de un prompt de redacción

Un prompt de redacción tiene más partes que uno de clasificación:

```
[System Prompt]
Sos el asistente de atención al cliente de Lumina, una tienda de indumentaria online.
Respondés en nombre del equipo con un tono cálido, directo y profesional.
Usás el nombre del cliente si está disponible.
Nunca inventás datos — si un dato no está disponible, lo decís claramente.
Respondés en el mismo idioma en que escribió el cliente.
Máximo 4 párrafos cortos.

[User Message]
El cliente escribió:
---
{{ $json.mensaje }}
---

Datos del pedido:
- Nombre del cliente: {{ $('BuscarPedido').item.json['Nombre Cliente'] }}
- ID del pedido: {{ $('BuscarPedido').item.json['ID'] }}
- Estado: {{ $('BuscarPedido').item.json['Estado'] }}
- Fecha estimada de entrega: {{ $('BuscarPedido').item.json['Fecha Estimada'] }}
- Número de tracking: {{ $('BuscarPedido').item.json['Tracking'] }}

Redactá la respuesta al cliente.
```

### El efecto de los datos vacíos

¿Qué pasa si el campo de tracking está vacío? Con un template fijo, la respuesta diría "Número de tracking: " y nada más. Con la IA, el system prompt incluye la instrucción "si un dato no está disponible, lo decís claramente" y la IA genera algo como:

> *El número de seguimiento estará disponible cuando tu pedido sea despachado. En cuanto tengamos esa información, te avisamos.*

Eso es imposible de lograr con un template.

---

## Bloque 2 — Técnicas de prompt para respuestas de calidad (0:35 – 1:00)

El docente muestra ejemplos concretos de cada técnica en n8n.

### Técnica 1: Dar el contexto del mensaje original

Si la IA solo recibe los datos del pedido pero no el mensaje del cliente, genera una respuesta genérica. Al incluir el mensaje original, la respuesta lo tiene en cuenta:

**Sin mensaje original:**
> Hola María, tu pedido #4821 está en estado "En camino". Fecha estimada: 15 de mayo. Tracking: AR123456.

**Con mensaje original** (el cliente preguntó por la fecha porque tiene un evento):
> Hola María, entiendo que necesitás el pedido para el evento. Tu pedido #4821 está en camino y la fecha estimada de entrega es el 15 de mayo. El número de seguimiento es AR123456 — podés rastrear el estado en tiempo real desde el sitio del correo.

La segunda respuesta responde a lo que el cliente *realmente* preguntó, no solo a los datos del pedido.

### Técnica 2: Instrucciones de tono precisas

"Tono profesional" es vago. Estas instrucciones son más útiles:

- ✅ "No uses jerga ni expresiones informales"
- ✅ "No comiences la respuesta con 'Hola, espero que estés bien'"
- ✅ "Si el cliente expresa frustración, reconocelo antes de dar la información"
- ✅ "Usá el nombre del cliente una sola vez, al inicio"
- ✅ "No te disculpés si no hubo un error de nuestra parte"

### Técnica 3: Limitar la longitud y el formato

La IA tiende a ser más larga de lo necesario cuando no se le indica lo contrario:

- "Máximo 150 palabras"
- "3 párrafos cortos como máximo"
- "Sin bullet points — texto corrido"
- "No agregues frases de cierre tipo 'Quedamos a tu disposición'"

### Técnica 4: Manejar casos especiales en el prompt

En lugar de crear ramas adicionales en el flujo, se pueden manejar dentro del prompt:

```
Si el campo Tracking está vacío, explicá que el número estará disponible
cuando el pedido sea despachado y que se avisará.

Si el Estado es "Entregado", felicitá al cliente por haber recibido
el pedido y preguntá si todo llegó bien.

Si el Estado es "Devuelto", indicá que el equipo de atención se comunicará
en las próximas 24 horas.
```

### Técnica 5: Pedir un JSON en lugar de texto plano

Para flujos donde el nodo siguiente necesita procesar la respuesta (no solo enviarla), conviene pedir un JSON:

```
Respondé en formato JSON con esta estructura:
{
  "asunto": "[asunto sugerido para el email de respuesta]",
  "cuerpo": "[texto completo de la respuesta al cliente]",
  "prioridad": "alta | media | baja"
}
```

n8n puede parsear ese JSON y usar cada campo por separado.

---

## Bloque 3 — Las respuestas personalizadas de Lumina, construidas en vivo (1:00 – 1:20)

### El flujo

El flujo de la semana pasada termina clasificando el mensaje. Hoy se agrega el nodo de redacción en la rama de CONSULTA:

```
[OpenAI: clasificar]
      ↓
[IF: ¿es RECLAMO?]
   /                \
[TRUE: alerta]    [FALSE: continuar]
                        ↓
                  [IF: ¿es CONSULTA?]
                    /             \
                 [TRUE]          [FALSE: OTRO]
                    ↓                ↓
            [Google Sheets:   [OpenAI: respuesta
             buscar pedido]    genérica amable]
                    ↓
            [OpenAI: redactar
             respuesta con
             datos del pedido]
                    ↓
            [Gmail: enviar
             respuesta]
```

### El nodo OpenAI de redacción

- Model: `gpt-4o`
- Temperature: `0.4` (algo de variación para que no suene robotizado, pero sin inventar datos)
- Max Tokens: `400`

**System Prompt:**
```
Sos el asistente de atención al cliente de Lumina, una tienda de indumentaria online argentina.

Respondés en nombre del equipo con un tono cálido, claro y profesional.

Reglas:
- Usá el nombre del cliente al inicio, una sola vez
- Nunca inventés datos: si un campo dice "N/A" o está vacío, mencionalo honestamente
- Si el estado es "Entregado", preguntá si todo llegó en orden
- Máximo 3 párrafos cortos
- Sin fórmulas de cierre largas — solo "Equipo Lumina" al final
- Respondé en el mismo idioma en que escribió el cliente
```

**User Message:**
```
El cliente escribió:
---
{{ $('ExtraerCampos').item.json.mensaje }}
---

Datos del pedido:
- Nombre: {{ $json['Nombre Cliente'] }}
- Pedido #{{ $json['ID'] }}
- Estado: {{ $json['Estado'] }}
- Fecha estimada: {{ $json['Fecha Estimada'] }}
- Tracking: {{ $json['Tracking'] }}

Redactá la respuesta al cliente.
```

### Comparación de respuestas en vivo

El docente envía el mismo email de consulta y muestra tres versiones de respuesta:

**Versión 1 — Template fijo del Bloque 2:**
> Hola, tu pedido #4821 está en estado En camino. Fecha estimada: 15/05. Tracking: AR123456. Equipo Lumina.

**Versión 2 — IA sin contexto del mensaje:**
> Hola María, te informamos que tu pedido #4821 se encuentra en camino. La fecha estimada de entrega es el 15 de mayo. Podés seguir el envío con el número AR123456. Quedamos a disposición.

**Versión 3 — IA con contexto completo:**
> Hola María, gracias por escribirnos. Tu pedido #4821 ya está en camino y debería llegar el 15 de mayo, así que llegará antes del fin de semana. Podés seguir el envío en tiempo real con el código AR123456.
>
> Si necesitás algo más, estamos acá.
> Equipo Lumina

---

## Ejercicio práctico (1:20 – 1:45)

> Cada participante configura el nodo de redacción para su negocio.

### Paso 1 — Definir el tono de tu marca (5 min)

Escribir 3 a 5 reglas de tono específicas para el negocio. Ejemplos:

- "Usamos tuteo, nunca ustedeo"
- "Somos directos y no nos andamos con rodeos"
- "Reconocemos la frustración del cliente antes de dar información"
- "No prometemos fechas que no tenemos confirmadas"

---

### Paso 2 — Construir el system prompt de redacción (10 min)

Usando la estructura del ejemplo de Lumina, escribir el system prompt para el propio negocio. Incluir:
- Quién es la IA (el asistente de qué negocio)
- El tono en reglas concretas
- Los casos especiales a manejar
- El formato de la respuesta

---

### Paso 3 — Configurar el user message con los datos del flujo (15 min)

1. Identificar qué datos tiene disponibles el flujo en ese punto (datos del cliente, del pedido, del mensaje)
2. Construir el user message incluyendo el mensaje original del cliente y los datos relevantes
3. Conectar el nodo OpenAI al flujo en la rama correcta
4. Agregar el nodo Gmail o Slack para enviar la respuesta generada
5. Probar con al menos dos mensajes distintos

---

## Cierre (1:45 – 1:55)

Dos participantes leen en voz alta una respuesta generada por su flujo. El grupo evalúa: ¿suena humana? ¿es precisa? ¿cambiarían algo?

El docente cierra con el criterio de calidad:

> Una buena respuesta automática es la que el cliente no identifica como automática. Eso se logra con tres cosas: datos reales, contexto del mensaje y reglas de tono precisas. Si alguna de las tres falta, se nota.

---

## Tarea de la semana

1. **Flujo con redacción automática activo** durante toda la semana.
2. **Revisar las respuestas generadas:** guardar una copia de las respuestas que envió el flujo y leerlas como si fueran las de un operador. ¿Todas son apropiadas? ¿Hay alguna que no enviarías?
3. **Ajustar el prompt** según lo que encontrás: agregar reglas para los casos que no salieron bien.
4. **Calcular el tiempo ahorrado:** ¿cuántas respuestas generó el flujo esta semana? ¿Cuánto tarda en promedio responder un email manualmente?

---

## Recursos y herramientas

| Herramienta | Para qué | Cómo acceder |
|---|---|---|
| n8n Cloud | Flujo con nodo OpenAI de redacción | cloud.n8n.io |
| OpenAI Platform | API y configuración de modelos | platform.openai.com |
| OpenAI Playground | Probar prompts antes de usarlos en el flujo | platform.openai.com/playground |

---

*AI Automation — Diplomatura No-Code · Bloque 3: IA en tu negocio · Clase 12 de 20*
