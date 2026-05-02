# Clase 02 — Hablarle bien a la IA: prompting para dueños de negocio

**Bloque 1: Fundamentos · Semana 2 de 20**
**Duración:** 2 horas · **Tipo:** Práctica · **Nivel:** Introductorio

---

## Objetivo de la clase

Que cada participante sepa escribir instrucciones claras para ChatGPT o Gemini y obtener respuestas útiles para su negocio — sin depender de nadie técnico. Al terminar, cada uno tiene al menos un prompt funcional listo para usar con los procesos que identificó la semana anterior.

---

## Agenda

| Tiempo | Bloque | Descripción |
|---|---|---|
| 0:00 – 0:10 | Apertura | Revisión de la tarea y contexto de la clase |
| 0:10 – 0:35 | Bloque 1 | Qué es un prompt y por qué importa cómo escribirlo |
| 0:35 – 1:00 | Bloque 2 | La fórmula del prompt efectivo para negocios |
| 1:00 – 1:15 | Bloque 3 | Prompts para el caso Lumina — en vivo |
| 1:15 – 1:45 | Ejercicio | Cada participante escribe y prueba sus propios prompts |
| 1:45 – 1:55 | Cierre | Comparación de resultados y ajustes |
| 1:55 – 2:00 | Tarea | Explicación de la tarea de la semana |

---

## Apertura (0:00 – 0:10)

### Revisión de la tarea de la semana anterior

Ronda rápida: cada participante comparte el resultado de su mapa de automatización.
- ¿Cuáles fueron sus 3 procesos prioritarios?
- ¿Cuánto tiempo semanal representan en total?
- ¿Cómo quedó la frase "cuando X → el sistema debería Y"?

El docente anota en pantalla los procesos más comunes del grupo. Esos ejemplos reales van a alimentar los ejercicios de hoy.

### Conexión con la clase anterior

La semana pasada identificamos *qué* automatizar. Esta semana aprendemos a usar la herramienta más poderosa que tenemos para hacerlo: **el lenguaje natural**.

Antes de conectar ninguna herramienta, antes de configurar ningún flujo, la IA necesita entender exactamente qué queremos. Eso se logra con un buen prompt. Y escribir un buen prompt no es una habilidad técnica — es una habilidad comunicativa.

---

## Bloque 1 — Qué es un prompt y por qué importa (0:10 – 0:35)

### La definición simple

Un **prompt** es la instrucción que le das a la IA. Es lo que escribís en el chat de ChatGPT o Gemini antes de apretar Enter.

La calidad del resultado depende casi por completo de la calidad de la instrucción. La IA no adivina lo que querés — hace lo que le pedís. Si el pedido es vago, el resultado es vago. Si el pedido es específico, el resultado es específico.

> La IA es como un colaborador muy capaz que acaba de entrar al trabajo. Sabe mucho, pero no conoce tu negocio ni tu contexto. Cuanto más le explicás, mejor trabaja.

### El error más común

La mayoría de las personas le pide a la IA lo mismo que le pediría a Google: una o dos palabras.

- ❌ *"Email para cliente"*
- ❌ *"Respuesta reclamo"*
- ❌ *"Reporte ventas"*

Eso genera respuestas genéricas que no sirven para nada. Hay que hacer el trabajo inverso: darle contexto, darle formato, darle restricciones.

### La diferencia entre prompt malo y prompt bueno

**Prompt malo:**
> *"Escribí un email para un cliente que pregunta por su pedido"*

**Resultado:** un email genérico, sin datos del pedido, con un tono que no tiene nada que ver con tu marca.

**Prompt bueno:**
> *"Sos el asistente de atención al cliente de Lumina, una tienda de productos para el hogar con un tono amigable y cercano. Un cliente llamado Marcos escribió preguntando cuándo llega su pedido #4821. El pedido está en camino y llega entre el 3 y el 5 de mayo. Escribí una respuesta breve, en primera persona del plural (nosotros), que confirme la fecha de entrega y le dé el número de seguimiento XT-9921. Máximo 5 líneas."*

**Resultado:** un email que se puede enviar directamente, sin editar.

La diferencia no es técnica. Es el nivel de detalle en la instrucción.

### Por qué esto importa para automatizar

En las próximas semanas, cuando conectemos ChatGPT a los flujos automáticos, los prompts van a ser el cerebro del sistema. El flujo va a tomar el mensaje de un cliente, insertarlo en un prompt, y la IA va a generar la respuesta. Si el prompt está bien escrito, el sistema funciona. Si está mal escrito, el sistema falla — aunque todo lo demás esté perfecto.

Aprender a escribir prompts hoy es aprender a programar el comportamiento del agente que vamos a construir.

---

## Bloque 2 — La fórmula del prompt efectivo para negocios (0:35 – 1:00)

Todo prompt útil para un negocio tiene cuatro componentes. No hace falta incluirlos todos siempre, pero cuantos más incluyas, mejor el resultado.

### Componente 1 — Rol

Le decís a la IA quién es en este contexto.

> *"Sos el asistente de atención al cliente de [nombre del negocio]..."*
> *"Actuás como redactor de emails para una tienda de indumentaria..."*
> *"Sos el asistente administrativo de [nombre]..."*

**Por qué funciona:** la IA adapta su tono, vocabulario y estilo al rol que le asignás. Un asistente de atención al cliente responde diferente a un redactor de marketing.

---

### Componente 2 — Contexto

Le explicás la situación específica que tiene que resolver.

> *"...Un cliente llamado [nombre] escribió este mensaje: [mensaje del cliente]..."*
> *"...El pedido tiene el número [número], está en estado [estado] y llega el [fecha]..."*
> *"...Esta semana tuvimos [N] consultas, de las cuales [N] fueron reclamos..."*

**Por qué funciona:** sin contexto, la IA inventa. Con contexto, la IA trabaja con información real y el resultado es directamente utilizable.

---

### Componente 3 — Tarea

Le decís exactamente qué tiene que hacer.

> *"...Escribí una respuesta al email del cliente..."*
> *"...Clasificá este mensaje como: consulta de envío / reclamo / pregunta de producto / otro..."*
> *"...Resumí estos datos en un párrafo de 3 líneas para enviar al dueño del negocio..."*

**Por qué funciona:** la IA puede hacer muchas cosas con un mismo contexto. Si no le decís exactamente qué querés, elige por su cuenta — y no siempre elige bien.

---

### Componente 4 — Restricciones

Le ponés límites al resultado: formato, extensión, tono, cosas que no debe hacer.

> *"...Máximo 4 líneas. Tono amigable, sin tecnicismos. No ofrezcas descuentos ni beneficios adicionales. Usá el nombre del cliente al inicio."*
> *"...Respondé solo con una de estas opciones: ENVÍO / RECLAMO / PRODUCTO / OTRO. Sin explicación."*
> *"...No uses palabras en inglés. No uses signos de exclamación. Escribí en español rioplatense."*

**Por qué funciona:** sin restricciones, la IA tiende a extenderse, a agregar información que no pediste, o a usar un tono que no coincide con tu marca. Las restricciones cortan eso de raíz.

---

### La fórmula completa

```
ROL + CONTEXTO + TAREA + RESTRICCIONES
```

No siempre van en ese orden exacto. No siempre los cuatro son necesarios. Pero si un prompt no funciona, lo primero que hay que revisar es cuál de los cuatro falta o está incompleto.

### Tipos de prompts más útiles para negocios

| Tipo de prompt | Para qué sirve |
|---|---|
| **Redacción** | Generar emails, mensajes, respuestas personalizadas |
| **Clasificación** | Categorizar mensajes, leads, consultas, reseñas |
| **Resumen** | Condensar información larga en puntos clave |
| **Extracción** | Sacar datos específicos de un texto (nombre, número, fecha) |
| **Análisis de tono** | Detectar si un mensaje es positivo, neutro, urgente o negativo |
| **Decisión** | Indicar qué acción tomar según el contenido de un mensaje |

Estos seis tipos cubren el 90% de los usos en automatización de negocios. En las próximas semanas vamos a construir flujos con cada uno de ellos.

---

## Bloque 3 — Prompts para el caso Lumina, en vivo (1:00 – 1:15)

El docente abre ChatGPT o Gemini en pantalla y construye los prompts de Lumina en tiempo real, mostrando el proceso de escritura, prueba y ajuste.

### Prompt 1 — Respuesta a consulta de estado de pedido

**Situación:** llega este email de un cliente:
> *"Hola, hice un pedido hace 5 días y todavía no recibí nada. El número de pedido es 4821. ¿Pueden decirme cuándo llega?"*

**Prompt construido en clase:**

```
Sos el asistente de atención al cliente de Lumina, una tienda de productos
para el hogar. El tono de Lumina es amigable, cercano y eficiente.

Un cliente escribió este mensaje:
"Hola, hice un pedido hace 5 días y todavía no recibí nada. El número de
pedido es 4821. ¿Pueden decirme cuándo llega?"

Datos del pedido:
- Número: 4821
- Estado: en camino
- Fecha estimada de entrega: 3 al 5 de mayo
- Número de seguimiento: XT-9921 (OCA)

Escribí una respuesta para enviarle al cliente por email. Debe:
- Comenzar saludando al cliente por su nombre si está disponible
- Confirmar que el pedido está en camino
- Dar la fecha estimada y el número de seguimiento
- Terminar con una frase amigable de cierre
- Máximo 6 líneas. Sin tecnicismos. En español rioplatense.
```

**Se prueba en vivo y se muestra el resultado. Se ajusta si es necesario.**

---

### Prompt 2 — Clasificador de consultas

**Situación:** Lumina recibe muchos tipos de mensajes y necesita saber rápido de qué se trata cada uno para derivarlo al proceso correcto.

**Prompt construido en clase:**

```
Sos un clasificador de mensajes para Lumina, una tienda de productos
para el hogar.

Leé el siguiente mensaje de un cliente y clasificalo en UNA de estas
categorías:
- ENVIO: pregunta por el estado, fecha o seguimiento de un pedido
- DEVOLUCION: quiere devolver o cambiar un producto
- RECLAMO: reporta un problema, producto dañado o insatisfacción
- PRODUCTO: pregunta sobre características, precio o disponibilidad
- OTRO: cualquier cosa que no entre en las categorías anteriores

Respondé SOLO con la categoría en mayúsculas. Sin explicación.

Mensaje del cliente:
"Me llegó la lámpara rota. Necesito que me manden una nueva o me devuelvan
la plata."
```

**Se prueba con 3 mensajes distintos para mostrar consistencia.**

---

### Prompt 3 — Detección de urgencia

**Situación:** no todos los reclamos tienen la misma urgencia. Lumina necesita identificar cuáles requieren atención inmediata.

**Prompt construido en clase:**

```
Analizá el siguiente mensaje de un cliente y determiná su nivel de urgencia.

Niveles posibles:
- ALTA: el cliente está muy molesto, amenaza con no volver, pide reembolso
  inmediato o usa lenguaje agresivo
- MEDIA: hay un problema claro pero el cliente está tranquilo y espera solución
- BAJA: es una consulta o duda sin urgencia aparente

Respondé con el nivel de urgencia (ALTA / MEDIA / BAJA) y una sola línea
explicando por qué.

Mensaje:
"Esto es una vergüenza. Llevo dos semanas esperando y nadie me da respuestas.
Si no me solucionan esto hoy cancelo todo y hago una reseña en Google."
```

---

### Lo que muestra este ejercicio en vivo

- Los prompts no quedan perfectos a la primera — hay que probarlos y ajustarlos
- Cambiar una palabra puede cambiar completamente el resultado
- La IA sigue las instrucciones con precisión cuando las instrucciones son precisas
- No hace falta saber nada técnico para construir esto

---

## Ejercicio práctico (1:15 – 1:45)

> Cada participante trabaja con los procesos que trajo de la tarea de la semana anterior. El docente circula y ayuda.

### Paso 1 — Elegir un proceso (3 min)

De tus 3 procesos prioritarios, elegí el que involucra texto: un email que respondés siempre, un mensaje que mandás, una clasificación que hacés a mano.

Si ninguno involucra texto todavía, usá este caso genérico:
> *"Un cliente escribe preguntando si tienen disponible [producto o servicio de tu negocio] y cuál es el precio."*

---

### Paso 2 — Construir el prompt (10 min)

Usando la fórmula ROL + CONTEXTO + TAREA + RESTRICCIONES, escribí un prompt para ese proceso.

**Guía de escritura:**

1. **Rol:** ¿Quién es la IA en tu negocio? ¿Cómo es el tono de tu marca?
   > *"Sos el asistente de [nombre de tu negocio], una [tipo de negocio]. El tono es [adjetivos]..."*

2. **Contexto:** ¿Cuál es la situación específica? ¿Qué datos tiene disponibles?
   > *"Un cliente escribió: [mensaje]. Los datos relevantes son: [datos]..."*

3. **Tarea:** ¿Qué tiene que hacer exactamente?
   > *"Escribí una respuesta / Clasificá el mensaje / Resumí los datos..."*

4. **Restricciones:** ¿Qué límites le ponés?
   > *"Máximo X líneas. Tono [X]. No menciones [Y]. Respondé solo con [Z]."*

---

### Paso 3 — Probar en ChatGPT o Gemini (10 min)

Copiá tu prompt y pegalo en chat.openai.com o gemini.google.com.

Evaluá el resultado:
- ¿El tono coincide con tu marca?
- ¿La extensión es la adecuada?
- ¿Usó bien los datos que le diste?
- ¿Hay algo que sobra o falta?

---

### Paso 4 — Ajustar (7 min)

Si el resultado no fue el esperado, identificá qué componente falló y reescribilo.

**Problemas comunes y soluciones:**

| Problema | Causa probable | Solución |
|---|---|---|
| La respuesta es demasiado larga | Falta restricción de extensión | Agregá "Máximo X líneas" |
| El tono no es el correcto | El rol está poco definido | Describí mejor cómo habla tu marca |
| Inventó información | Faltó contexto con datos reales | Agregá los datos específicos |
| No siguió el formato pedido | La tarea no fue clara | Reescribí la tarea con más precisión |
| La clasificación fue incorrecta | Las categorías se superponen | Revisá y redefiní las categorías |

---

## Cierre y comparación de resultados (1:45 – 1:55)

Ronda rápida: dos o tres participantes comparten su prompt y el resultado que obtuvieron.

El grupo analiza:
- ¿Qué funcionó?
- ¿Qué tuvieron que ajustar?
- ¿Qué aprendió cada uno sobre cómo describe su propio negocio?

El docente señala el patrón más importante: **los mejores prompts son los que describen el negocio con más precisión**. No los más largos, no los más complejos — los más específicos.

---

## Tarea de la semana (1:55 – 2:00)

### Tres prompts listos para usar

Esta semana, usando los procesos de tu mapa de automatización, construí y probá tres prompts:

**Prompt 1 — Redacción:** un mensaje o email que mandás regularmente a clientes. El prompt tiene que generar una respuesta que puedas enviar directamente, sin editar.

**Prompt 2 — Clasificación:** un tipo de mensaje que recibís y que necesitás categorizar. El prompt tiene que responder con una categoría sola, sin explicaciones adicionales.

**Prompt 3 — Decisión:** una situación en la que el sistema tiene que decidir qué hacer a continuación. Por ejemplo: si el cliente menciona "devolver" o "roto" → escalar. Si menciona "fecha" o "cuándo" → responder con estado de pedido.

**Formato para traer:**
Para cada prompt, traé:
- El texto del prompt que escribiste
- El mensaje de prueba que usaste
- El resultado que te dio la IA
- Un comentario de una línea: ¿necesitó ajustes? ¿por qué?

**Para la próxima clase:** vamos a usar estos prompts como el cerebro de nuestra primera base de datos. Sin datos bien organizados, la IA no puede hacer nada útil — eso es lo que construimos la semana que viene.

---

## Recursos y herramientas necesarias

| Herramienta | Para qué | Cómo acceder |
|---|---|---|
| ChatGPT | Probar y ajustar los prompts | chat.openai.com — plan gratuito |
| Google Gemini | Alternativa gratuita a ChatGPT | gemini.google.com — plan gratuito |
| Google Docs o Notion | Guardar los prompts que funcionan | Cualquiera que ya uses |

**Nota sobre qué herramienta usar:** ChatGPT y Gemini dan resultados muy similares para estos usos. Podés usar cualquiera de los dos o probar el mismo prompt en ambas para comparar. No hay una respuesta correcta — elegí la que te resulte más cómoda.

**Importante:** guardá los prompts que funcionan. Van a ser la base de los flujos automáticos que construimos a partir de la semana 6.

---

## Vista previa: Clase 03

La semana que viene organizamos la información de tu negocio para que la IA pueda usarla. Sin datos ordenados, los prompts que escribiste esta semana solo pueden trabajar con lo que vos les pegás a mano. Para que el sistema funcione solo, los datos tienen que estar estructurados en un lugar accesible. Eso es Airtable y Google Sheets — y es más sencillo de lo que parece.

---

*AI Automation — Diplomatura No-Code · Bloque 1: Fundamentos · Clase 02 de 20*
