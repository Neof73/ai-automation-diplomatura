# Clase 17 — Adaptá el agente de Lumina a tu propio negocio

**Bloque 4: Agente completo · Semana 17 de 20**
**Duración:** 2 horas · **Tipo:** Workshop · **Nivel:** Avanzado

---

## Objetivo de la clase

Que cada participante adapte el agente de Lumina a su propio negocio: redefiniendo el system prompt, identificando y conectando las herramientas que su negocio necesita, y validando el comportamiento del agente con escenarios reales. Al terminar, el agente tiene que estar configurado para el negocio propio y procesando al menos un tipo de consulta real con herramientas reales.

---

## Agenda

| Tiempo | Bloque | Descripción |
|---|---|---|
| 0:00 – 0:15 | Apertura | Revisión del agente de Lumina: qué funcionó y qué no |
| 0:15 – 0:40 | Bloque 1 | Diseñar el agente para tu negocio: mapeo de herramientas |
| 0:40 – 1:00 | Bloque 2 | Escribir el system prompt del agente propio |
| 1:00 – 1:45 | Workshop | Construcción individual con asistencia del docente |
| 1:45 – 1:55 | Cierre | Dos demos rápidas de agentes en negocios distintos |
| 1:55 – 2:00 | Tarea | Configuración para la semana |

---

## Apertura (0:00 – 0:15)

### Revisión de la semana anterior

El docente pide a dos o tres participantes que compartan:
- ¿Qué casos resolvió bien el agente esta semana?
- ¿Qué casos no resolvió correctamente? ¿Por qué?
- ¿Qué cambio hicieron al system prompt y qué efecto tuvo?

El docente toma un ejemplo de prompt que no funcionó bien y lo ajusta en vivo frente al grupo, explicando la decisión detrás de cada cambio.

### El principio de hoy: el agente es una extensión del negocio

El agente de Lumina resuelve problemas de post-venta de una tienda de indumentaria online. Ese contexto específico — los pedidos, los talles, los cambios — está codificado en cada parte del sistema: el system prompt, las herramientas, los datos.

Para que el agente funcione en otro negocio, hay que reconstruir ese contexto desde cero. No alcanza con cambiar el nombre de la empresa en el prompt — hay que pensar en qué tipo de consultas llegan, qué información necesita el agente para resolverlas y qué acciones puede tomar.

Eso es lo que hacemos hoy.

---

## Bloque 1 — Diseñar el agente para tu negocio: mapeo de herramientas (0:15 – 0:40)

### El mapa de herramientas del agente

Antes de escribir una sola línea de configuración, hay que responder tres preguntas:

**1. ¿Qué consultas va a recibir el agente?**

Listar los tipos de mensajes más frecuentes que llegan al negocio. Ser específico — no "consultas de clientes", sino:

- "¿Tengo turno para el próximo jueves?"
- "Quiero cancelar mi suscripción"
- "El producto que recibí está dañado"
- "¿Cuánto cuesta el servicio premium?"

**2. ¿Qué información necesita el agente para responder cada tipo?**

Para cada tipo de consulta, identificar qué datos necesita obtener:

| Consulta | Información necesaria | Dónde está esa información |
|---|---|---|
| Estado de turno | Nombre cliente, fecha, hora, estado | Google Sheets / Airtable de turnos |
| Cancelar suscripción | Estado de la suscripción, fecha de vencimiento | Base de datos de clientes |
| Producto dañado | Número de pedido, estado, historial | Planilla de pedidos |
| Precio de servicio | Lista de precios actualizada | Hoja de precios en Sheets |

**3. ¿Qué acciones puede tomar el agente de forma autónoma?**

Distinguir entre:
- **Acciones de lectura** (el agente solo consulta información): bajo riesgo, habilitarlas por defecto
- **Acciones de escritura** (el agente modifica datos): requieren más cuidado, habilitarlas con condiciones
- **Acciones irreversibles** (el agente cancela, elimina, confirma): siempre requerir confirmación del cliente

Ejemplos por tipo:

| Acción | Tipo | ¿Habilitarla en el agente? |
|---|---|---|
| Buscar turno | Lectura | Sí, sin restricciones |
| Verificar precio | Lectura | Sí, sin restricciones |
| Registrar reclamo | Escritura | Sí, con los datos completos del caso |
| Reprogramar turno | Escritura | Sí, si el cliente confirma explícitamente |
| Cancelar suscripción | Irreversible | No — derivar al equipo humano |
| Emitir reembolso | Irreversible | No — derivar al equipo humano |

### Plantilla de diseño de herramientas

Completar para cada herramienta del agente propio:

```
HERRAMIENTA: [nombre_de_la_herramienta]

Descripción (lo que ve el agente):
[Qué hace esta herramienta, cuándo usarla, cuándo NO usarla]

Nodo de n8n: [Google Sheets / Airtable / HTTP Request / etc.]
Operación: [Lookup Row / Append Row / Get / POST / etc.]
Parámetros que recibe:
  - [parámetro_1]: [tipo] — [descripción]
  - [parámetro_2]: [tipo] — [descripción]

Qué retorna:
  - [campo_1]: [tipo] — [descripción]
  - [campo_2]: [tipo] — [descripción]

Casos de error a manejar:
  - [Si no encuentra resultado: qué debería devolver]
  - [Si la conexión falla: cómo lo maneja el flujo]
```

### Ejemplos de herramientas por tipo de negocio

**E-commerce de ropa (como Lumina):**
- `buscar_pedido(email, numero_pedido)` → estado, tracking, fecha
- `verificar_stock(modelo, talle, color)` → disponibilidad, alternativas
- `registrar_cambio(pedido_id, motivo)` → confirmación de solicitud

**Clínica / consultorio:**
- `buscar_turno(dni, nombre)` → próximo turno, profesional, horario
- `verificar_disponibilidad(profesional, fecha)` → turnos libres
- `registrar_consulta(nombre, motivo, urgencia)` → número de caso

**Agencia de viajes:**
- `buscar_reserva(apellido, numero_reserva)` → vuelos, hotel, estado
- `verificar_disponibilidad_destino(destino, fechas)` → paquetes disponibles
- `registrar_modificacion(reserva_id, tipo_cambio)` → solicitud registrada

**Servicio técnico:**
- `buscar_reparacion(telefono, numero_ticket)` → estado de la reparación
- `verificar_repuesto(modelo_equipo, repuesto)` → disponibilidad y tiempo estimado
- `crear_ticket(nombre, equipo, problema)` → número de ticket asignado

---

## Bloque 2 — Escribir el system prompt del agente propio (0:40 – 1:00)

### La estructura del system prompt de un agente

Un buen system prompt de agente tiene estas secciones en orden:

```
1. ROL Y CONTEXTO
   - Quién sos (el asistente de qué negocio)
   - Qué tipo de negocio es y cómo funciona
   - A quién asistís (clientes, empleados, proveedores)

2. OBJETIVO
   - Qué tenés que lograr en cada conversación
   - Cuál es el resultado exitoso de una interacción

3. HERRAMIENTAS DISPONIBLES Y CUÁNDO USARLAS
   - Lista explícita de las herramientas con sus casos de uso
   - Cuándo NO usarlas (igual de importante)

4. REGLAS DE COMPORTAMIENTO
   - Lo que siempre hacés (buscar datos antes de responder)
   - Lo que nunca hacés (inventar datos, tomar acciones irreversibles)
   - Cómo manejar casos ambiguos

5. LÍMITES Y ESCALADA
   - Qué casos no podés resolver y tenés que derivar
   - Cómo comunicar que derivás a un humano

6. TONO Y FORMATO DE RESPUESTA
   - El estilo de comunicación de la marca
   - El formato de las respuestas (largo, estructura)
```

### Plantilla de system prompt

```
Sos el asistente virtual de [NOMBRE DEL NEGOCIO], [descripción breve del negocio en 1 oración].

TU OBJETIVO: [qué tenés que lograr en cada conversación].

HERRAMIENTAS DISPONIBLES:
- [herramienta_1]: usar cuando [cuándo usarla]. NO usar cuando [cuándo no].
- [herramienta_2]: usar cuando [cuándo usarla]. NO usar cuando [cuándo no].
- [herramienta_3]: usar cuando [cuándo usarla]. NO usar cuando [cuándo no].

REGLAS QUE SIEMPRE SEGUÍS:
1. [Regla 1 — generalmente: buscar datos antes de responder]
2. [Regla 2 — generalmente: no inventar información]
3. [Regla 3 — específica del negocio]
4. [Regla 4 — específica del negocio]
5. Respondés en el mismo idioma en que escribió el cliente.

NUNCA HACÉS:
- [Acción prohibida 1 — generalmente: tomar decisiones irreversibles]
- [Acción prohibida 2]

CUÁNDO DERIVAR AL EQUIPO HUMANO:
- [Caso 1]
- [Caso 2]
- [Caso 3]

Al derivar, siempre: registrar el caso con la herramienta [herramienta_escalada]
y decirle al cliente cuándo puede esperar respuesta.

TONO:
[Descripción del tono de la marca en 2-3 líneas concretas]

FORMATO DE LAS RESPUESTAS:
[Largo máximo, estructura, qué evitar]
```

### Errores frecuentes en el system prompt del agente

El docente muestra cinco errores comunes y cómo corregirlos, usando VS Code abierto en el archivo del prompt para editar en vivo:

**Error 1 — El prompt no menciona cuándo NO usar las herramientas**

Mal:
```
- buscar_cliente: busca información del cliente
```

Bien:
```
- buscar_cliente: busca información del cliente cuando pregunta por su cuenta, pedido o historial.
  NO usar si el cliente solo hace preguntas generales sobre productos o precios.
```

**Error 2 — Las instrucciones son demasiado ambiguas**

Mal:
```
Respondé de forma apropiada según el caso.
```

Bien:
```
Si el cliente expresa frustración, reconocé su situación en la primera oración
antes de dar información. Si el cliente hace una consulta neutra, respondé directamente.
```

**Error 3 — El prompt no define qué hacer cuando no hay datos**

Mal:
```
Buscá el pedido del cliente antes de responder.
```

Bien:
```
Buscá el pedido del cliente antes de responder. Si la búsqueda no devuelve resultados,
preguntá si el email que usó para comprar es el mismo desde el que está escribiendo,
antes de asumir que el pedido no existe.
```

**Error 4 — El prompt no define el límite de herramientas**

El agente puede llamar a herramientas en bucle si el prompt no define cuándo parar.

Bien:
```
Si después de 3 búsquedas no encontrás la información necesaria para responder,
explicá al cliente qué información tenés y qué no, y ofrecé registrar el caso
para que el equipo lo resuelva.
```

**Error 5 — El tono está definido con adjetivos en lugar de reglas**

Mal:
```
Usá un tono amable y profesional.
```

Bien:
```
Tono: directo y cálido. No uses frases de apertura tipo "¡Hola! Espero que estés muy bien."
Comenzá respondiendo directamente a lo que preguntó el cliente. Usá el nombre del cliente
una vez, al inicio. Cerrá siempre con "Equipo [Nombre del negocio]" sin frases largas de despedida.
```

---

## Workshop — Construcción individual (1:00 – 1:45)

> 45 minutos de trabajo individual. El docente y asistentes circulan respondiendo preguntas específicas de cada negocio.

### Guía de construcción paso a paso

El docente proyecta esta guía y la deja visible durante todo el workshop.

---

**PASO 1 — Completar el mapa de herramientas (10 min)**

Abrir un archivo en VS Code y completar la plantilla de diseño de herramientas para el negocio propio. Al menos 2, idealmente 3 herramientas.

Guardar el archivo en: `prompts/diseno-herramientas.md`

---

**PASO 2 — Escribir el system prompt (10 min)**

En VS Code, crear el archivo `prompts/agente-sistema.txt` y escribir el system prompt usando la plantilla de la clase.

**Tip de VS Code:** instalar la extensión **"Markdown All in One"** para previsualizar el archivo mientras escribís. Para los prompts largos, usar la función "Split Editor" (clic derecho en la pestaña → "Split Right") para tener la plantilla en un lado y el prompt propio en el otro.

---

**PASO 3 — Configurar las herramientas en n8n (15 min)**

1. Abrir n8n Cloud en el navegador
2. Crear un nuevo workflow o duplicar el del agente de Lumina
3. Agregar los nodos de herramientas para el negocio propio
4. Conectarlos al nodo AI Agent
5. Escribir la descripción de cada herramienta en el campo "Description" del nodo

**Cómo verificar que la descripción de la herramienta está bien escrita:**
Preguntarse: si solo leyera esta descripción, ¿sabría exactamente cuándo usar esta herramienta y cuándo no? Si la respuesta es "no", la descripción necesita más detalle.

---

**PASO 4 — Pegar el system prompt y probar (10 min)**

1. Copiar el system prompt desde VS Code y pegarlo en el nodo AI Agent de n8n
2. En el campo "Prompt", poner: `{{ $json.mensaje }}`
3. Ejecutar el flujo manualmente con un mensaje de prueba típico del negocio
4. Observar el panel de razonamiento del agente:
   - ¿Interpretó bien el mensaje?
   - ¿Eligió la herramienta correcta?
   - ¿La respuesta final es apropiada?

---

**PASO 5 — Iterar y ajustar (hasta el final del workshop)**

Identificar el error más importante que vieron en la prueba y corregirlo en el system prompt. Probar de nuevo. Repetir.

**Regla de los ajustes incrementales:** cambiar una sola cosa por vez en el prompt y probar. Si se cambian muchas cosas a la vez, no se sabe qué cambio causó la mejora o el empeoramiento.

**Llevar registro en VS Code:** cada vez que se modifica el prompt, agregar una línea al archivo `prompts/changelog.md`:

```markdown
## 2025-05-12 — Clase 17

### Problema observado
El agente buscaba el pedido incluso cuando el cliente preguntaba por precios.

### Cambio realizado
Agregué a la descripción de buscar_pedido: "NO usar si el cliente solo pregunta por precios o catálogo."

### Resultado
El agente ahora responde preguntas de precios directamente sin llamar a buscar_pedido.
```

Este registro es oro para el Demo Day — muestra el proceso de iteración y demuestra que el sistema fue probado y refinado.

---

## Cierre (1:45 – 1:55)

Dos participantes con tipos de negocio distintos muestran brevemente su agente en acción:
- Qué herramientas configuraron
- Un mensaje de prueba y el razonamiento del agente
- Qué cambio hicieron al prompt durante el workshop y por qué

El docente cierra señalando la diferencia entre los agentes de los distintos negocios:

> Aunque todos usamos el mismo nodo de n8n y el mismo modelo de OpenAI, los agentes que construyeron hoy son completamente distintos entre sí. Eso es porque el sistema prompt y las herramientas son el negocio codificado. No hay dos negocios iguales, y no hay dos agentes iguales.

---

## Tarea de la semana

### Semana de prueba real del agente propio

1. **Activar el agente** en el flujo que recibe mensajes reales del negocio (email, formulario, webhook).
2. **Monitorear diariamente** el historial de ejecuciones en n8n. Identificar:
   - Casos resueltos correctamente (anotar qué herramienta usó y si fue la correcta)
   - Casos resueltos incorrectamente (anotar el mensaje original, el razonamiento del agente y por qué fue incorrecto)
   - Casos en los que el agente no pudo resolver y derivó (¿los casos derivados eran realmente irresolubles con las herramientas disponibles?)
3. **Hacer al menos 3 ajustes al system prompt** basados en lo observado, con registro en `changelog.md`.
4. **Identificar si falta alguna herramienta** que el agente necesitaría para resolver casos que hoy no puede.

### Preparar los números para la semana 18

La semana que viene calculamos el ROI del sistema completo. Empezar a recolectar:
- Tiempo promedio de respuesta manual a un mensaje (antes del sistema)
- Tiempo promedio de respuesta del agente (medirlo esta semana)
- Porcentaje de mensajes resueltos automáticamente vs. derivados al equipo

---

## Recursos y herramientas

| Herramienta | Para qué | Cómo acceder |
|---|---|---|
| VS Code | Escribir y versionar prompts, changelog | code.visualstudio.com |
| Extensión "Markdown All in One" | Previsualizar prompts en VS Code | Marketplace de VS Code |
| n8n Cloud | Configurar el agente con herramientas propias | cloud.n8n.io |
| OpenAI Playground | Probar el system prompt antes de usarlo en n8n | platform.openai.com/playground |

### Tip de flujo de trabajo con VS Code + n8n

Una forma eficiente de trabajar con prompts largos:

1. Escribir y editar el prompt en VS Code (`.txt` o `.md`)
2. Cuando está listo para probar, copiar al portapapeles con `Ctrl+A` → `Ctrl+C`
3. Pegar en el nodo de n8n y ejecutar la prueba
4. Volver a VS Code para ajustar según el resultado
5. Git commit del archivo de prompt con un mensaje descriptivo del cambio

Así el historial de Git refleja la evolución del prompt con contexto de por qué cambió cada cosa.

---

*AI Automation — Diplomatura No-Code · Bloque 4: Agente completo · Clase 17 de 20*
