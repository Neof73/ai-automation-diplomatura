# Clase 11 — Integrar ChatGPT en tu flujo: la IA como empleado del proceso

**Bloque 3: IA en tu negocio · Semana 11 de 20**
**Duración:** 2 horas · **Tipo:** Práctica · **Nivel:** Intermedio-Avanzado

---

## Objetivo de la clase

Que cada participante conecte la API de OpenAI a su flujo de n8n y reemplace la lógica de palabras clave por clasificación inteligente con IA. Al terminar, el flujo tiene que leer el texto libre de un mensaje, entender de qué se trata y enrutar el caso al camino correcto — sin reglas fijas.

---

## Agenda

| Tiempo | Bloque | Descripción |
|---|---|---|
| 0:00 – 0:10 | Apertura | El salto del Bloque 2 al Bloque 3 |
| 0:10 – 0:35 | Bloque 1 | Cómo funciona la IA dentro de un flujo |
| 0:35 – 1:00 | Bloque 2 | El nodo AI en n8n: configuración y pruebas |
| 1:00 – 1:20 | Bloque 3 | El clasificador de Lumina — construido en vivo |
| 1:20 – 1:45 | Ejercicio | Cada participante conecta la IA a su flujo |
| 1:45 – 1:55 | Cierre | Comparación: palabras clave vs IA |
| 1:55 – 2:00 | Tarea | Explicación de la tarea de la semana |

---

## Apertura (0:00 – 0:10)

### El límite que llegamos a ver en el Bloque 2

El flujo de Lumina del Bloque 2 clasifica mensajes buscando palabras clave: "roto", "dañado", "devolver". Funciona bien para los casos que anticipamos. Pero qué pasa con:

- *"El producto que recibí no es lo que pedí"*
- *"Quiero hacer un cambio"*
- *"La caja llegó aplastada"*
- *"Necesito hablar con alguien urgente"*

Ninguna de esas frases contiene las palabras de la lista — el flujo las clasificaría como consulta normal. Un humano las reconocería como reclamos de inmediato.

La diferencia es que el humano *entiende el significado*, no solo busca palabras. Eso es lo que agrega la IA al flujo.

### Lo que cambia en el Bloque 3

En el Bloque 2 el flujo toma decisiones con reglas que nosotros definimos. En el Bloque 3 el flujo toma decisiones con comprensión del lenguaje — y nosotros le decimos *qué tiene que decidir*, no *cómo decidirlo*.

---

## Bloque 1 — Cómo funciona la IA dentro de un flujo (0:10 – 0:35)

### La IA como un colaborador dentro del proceso

La forma más útil de pensar la IA en automatización es como un colaborador que puede hacer cosas que los nodos comunes no pueden:

| Nodo común | Puede hacer | No puede hacer |
|---|---|---|
| IF / Switch | Comparar valores exactos | Interpretar lenguaje natural |
| Set | Transformar datos estructurados | Resumir o reformular texto |
| HTTP Request | Llamar a una API | Entender el contexto de lo que dice esa API |

| Nodo IA | Puede hacer |
|---|---|
| OpenAI / ChatGPT | Leer texto, entender su significado, clasificar, resumir, redactar, transformar |

La IA no reemplaza todos los nodos — se agrega al flujo en los puntos donde hace falta comprensión o generación de lenguaje natural.

### La estructura de una llamada a la IA

Cuando el nodo AI se ejecuta, le manda a ChatGPT dos cosas:

**System prompt** — las instrucciones permanentes: quién es la IA, qué tiene que hacer, qué formato tiene que usar para responder.

**User message** — el contenido variable: el texto del mensaje del cliente, los datos del contexto, lo que el flujo obtuvo en los nodos anteriores.

```
System prompt:
"Sos un clasificador de mensajes de clientes para una tienda online.
Analizá el mensaje y respondé con UNA SOLA PALABRA:
CONSULTA si el cliente quiere información sobre su pedido,
RECLAMO si reporta un problema o quiere devolver algo,
OTRO en cualquier otro caso."

User message:
"La caja llegó toda aplastada y el producto adentro está roto.
¿Qué hago?"

Respuesta de la IA:
"RECLAMO"
```

El nodo siguiente en el flujo lee esa respuesta ("RECLAMO") y la usa para tomar la decisión del IF.

### Por qué el formato de la respuesta importa

La IA puede responder de cualquier manera — una sola palabra, un JSON, un párrafo. Pero el flujo necesita procesar esa respuesta de forma predecible.

**Buena práctica:** pedirle a la IA que responda en un formato exacto y bien definido. Si el flujo espera la palabra "RECLAMO" o "CONSULTA", el system prompt tiene que especificarlo. Si el flujo espera un JSON, el system prompt tiene que pedir JSON.

### Variables dinámicas en el prompt

Los datos del flujo se pueden insertar en el prompt usando las mismas referencias que en otros nodos:

```
"Clasificá este mensaje de cliente:
---
{{ $json.mensaje }}
---
Respondé solo con: CONSULTA, RECLAMO u OTRO."
```

Así, cada vez que el flujo se ejecuta, el nodo IA recibe el mensaje real de ese cliente específico — no un mensaje de ejemplo.

---

## Bloque 2 — El nodo AI en n8n (0:35 – 1:00)

El docente abre n8n en pantalla y configura el nodo AI paso a paso.

### Agregar el nodo OpenAI

1. En el lienzo de n8n, hacer clic en "+"
2. Buscar "OpenAI" en el buscador de nodos
3. Seleccionar **OpenAI** → operación: **Message a Model**

### Configurar la credencial de OpenAI

1. En "Credential", hacer clic en "Create new credential"
2. Pegar la API key generada en platform.openai.com
3. Hacer clic en "Save" — la credencial queda disponible para todos los flujos

**Dónde obtener la API key:**
- Ir a platform.openai.com → Sign in → API keys → "Create new secret key"
- Copiar la key inmediatamente (no se puede ver de nuevo)
- Guardarla en un lugar seguro

### Configurar el nodo

| Campo | Qué poner |
|---|---|
| **Model** | `gpt-4o` (más capaz) o `gpt-4o-mini` (más económico, muy bueno para clasificación) |
| **System Prompt** | Las instrucciones permanentes para la IA |
| **User Message** | El texto variable, con referencias `{{ $json.campo }}` |
| **Max Tokens** | 50–100 para clasificación (respuestas cortas), 500–1000 para redacción |
| **Temperature** | 0 para clasificación (respuestas deterministas), 0.7 para redacción (más creatividad) |

### Probar el nodo

El docente prueba el nodo en modo test con tres mensajes distintos:
1. "¿En qué estado está mi pedido?" → debe responder CONSULTA
2. "Me llegó el producto equivocado" → debe responder RECLAMO
3. "¿Tienen local físico en Buenos Aires?" → debe responder OTRO

El docente muestra el panel de datos del nodo: la respuesta de la IA aparece en el campo `message.content`.

### Costos: cuánto cuesta una llamada a la API

El docente muestra la calculadora de costos de OpenAI con números reales para el caso Lumina:

| Escenario | Tokens por llamada | Costo por llamada | Costo mensual (500 mensajes) |
|---|---|---|---|
| Clasificación (gpt-4o-mini) | ~200 tokens | ~$0.00006 | ~$0.03 |
| Clasificación (gpt-4o) | ~200 tokens | ~$0.001 | ~$0.50 |
| Respuesta larga (gpt-4o) | ~800 tokens | ~$0.004 | ~$2.00 |

Para la escala de la mayoría de los negocios del programa, el costo es marginal. Lo importante es no desperdiciar tokens con prompts demasiado largos cuando el objetivo es simple.

---

## Bloque 3 — El clasificador de Lumina, construido en vivo (1:00 – 1:20)

### El objetivo

Reemplazar el nodo IF con palabras clave del Bloque 2 por un nodo OpenAI que clasifica con comprensión del lenguaje.

### El flujo

```
[Gmail Trigger]
      ↓
[Set: extraer campos]
      ↓
[Google Sheets: registrar consulta]
      ↓
[OpenAI: clasificar el mensaje]
      ↓
[IF: ¿la respuesta de la IA es "RECLAMO"?]
   /                              \
[TRUE: es un reclamo]          [FALSE: no es reclamo]
      ↓                                ↓
[Gmail: alerta al equipo]    [IF: ¿la respuesta es "CONSULTA"?]
                                /                       \
                           [TRUE: consulta]          [FALSE: otro]
                                ↓                         ↓
                        [Google Sheets:           [Gmail: respuesta
                         buscar pedido             genérica]
                         + Gmail: responder]
```

### Construcción paso a paso

**Nodo OpenAI — Clasificador**

- Model: `gpt-4o-mini`
- Temperature: `0`
- Max Tokens: `10`
- System Prompt:
  ```
  Sos un clasificador de mensajes de clientes para una tienda de indumentaria online llamada Lumina.

  Tu única tarea es clasificar el mensaje que te dan.

  Respondé con UNA SOLA PALABRA, sin explicación, sin puntuación:
  - CONSULTA → el cliente quiere saber el estado de su pedido, dónde está, cuándo llega
  - RECLAMO → el cliente reporta un problema: producto defectuoso, equivocado, dañado, quiere devolver o cambiar
  - OTRO → cualquier otra consulta (dudas sobre productos, pedidos futuros, horarios, etc.)
  ```
- User Message:
  ```
  {{ $json.mensaje }}
  ```

**Nodo IF — Leer la respuesta de la IA**
- Condición: `{{ $json.message.content }}` es igual a `RECLAMO`

El docente prueba el flujo con los mismos emails de prueba del Bloque 2 más casos nuevos que antes no funcionaban.

**Comparación en vivo:**

| Mensaje | Con palabras clave | Con IA |
|---|---|---|
| "producto roto" | RECLAMO ✅ | RECLAMO ✅ |
| "la caja llegó aplastada" | CONSULTA ❌ | RECLAMO ✅ |
| "me mandaron la talla incorrecta" | CONSULTA ❌ | RECLAMO ✅ |
| "¿cuándo llega mi pedido?" | CONSULTA ✅ | CONSULTA ✅ |
| "¿tienen local en Córdoba?" | CONSULTA ❌ | OTRO ✅ |

---

## Ejercicio práctico (1:20 – 1:45)

> Cada participante reemplaza la lógica de palabras clave de su flujo por clasificación con IA.

### Paso 1 — Definir las categorías de tu negocio (5 min)

¿Qué tipos de mensajes recibís? Definí entre 2 y 4 categorías con nombres en mayúsculas:

| Tipo de negocio | Categorías posibles |
|---|---|
| E-commerce | CONSULTA_PEDIDO, RECLAMO, CONSULTA_PRODUCTO, OTRO |
| Consultora | URGENTE, NORMAL, ADMINISTRATIVO |
| Servicio con turnos | CANCELACION, REPROGRAMACION, CONSULTA, OTRO |
| Tienda local | STOCK, PRECIO, RECLAMO, OTRO |

---

### Paso 2 — Escribir el system prompt (10 min)

Escribir el system prompt siguiendo este esquema:

```
Sos un clasificador de mensajes de clientes para [descripción de tu negocio].

Tu única tarea es clasificar el mensaje que te dan.

Respondé con UNA SOLA PALABRA, sin explicación:
- [CATEGORIA_1] → [cuándo aplicarla]
- [CATEGORIA_2] → [cuándo aplicarla]
- [CATEGORIA_3] → [cuándo aplicarla]
```

**Regla de oro:** si dudás si un mensaje entra en una categoría, describí ese caso en el prompt. La IA va a seguir las instrucciones que le das.

---

### Paso 3 — Conectar el nodo OpenAI al flujo (15 min)

1. Abrir el flujo en n8n
2. Agregar el nodo OpenAI después del nodo de registro en Sheets
3. Configurar con el system prompt y el campo `{{ $json.mensaje }}` como user message
4. Ajustar el nodo IF siguiente para leer `{{ $json.message.content }}`
5. Probar con al menos 3 mensajes: uno por categoría

---

## Cierre (1:45 – 1:55)

Dos participantes muestran en pantalla el antes y el después: el flujo con palabras clave vs. el flujo con IA.

El docente cierra con la diferencia conceptual:

> Con palabras clave, vos le enseñás al flujo a reconocer casos específicos que ya viste. Con IA, el flujo puede reconocer casos que nunca viste — porque entiende el significado, no solo la forma. Esa es la diferencia entre una regla y comprensión.

---

## Tarea de la semana

1. **Flujo con IA activo** durante toda la semana, clasificando mensajes reales.
2. **Registrar los resultados:** revisar el historial de ejecuciones en n8n. ¿Clasificó bien todos los casos? ¿Hubo alguno incorrecto?
3. **Ajustar el prompt** si hubo clasificaciones incorrectas: agregar más descripción para los casos que confundió.
4. **Anotar los ejemplos difíciles:** mensajes ambiguos que la IA clasificó de una forma y vos hubieras elegido otra. La semana que viene vemos cómo mejorar la precisión del prompt.

---

## Recursos y herramientas

| Herramienta | Para qué | Cómo acceder |
|---|---|---|
| n8n Cloud | Flujos con nodo OpenAI | cloud.n8n.io |
| OpenAI Platform | API key y créditos | platform.openai.com |
| OpenAI Pricing | Calculadora de costos | openai.com/api/pricing |
| Google Gemini API | Alternativa gratuita a OpenAI | aistudio.google.com |

---

*AI Automation — Diplomatura No-Code · Bloque 3: IA en tu negocio · Clase 11 de 20*
