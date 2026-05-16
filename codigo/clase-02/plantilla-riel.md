# El Framework RIEL para construir prompts

RIEL es un acrónimo para los cuatro componentes de un prompt bien estructurado:

---

## R — Rol
Define quién es la IA. Le da contexto sobre desde qué perspectiva debe responder.

**Sin rol:**
```
Respondé este email de cliente.
```

**Con rol:**
```
Sos el asistente de atención al cliente de Lumina, una tienda de indumentaria
online argentina. Respondés en nombre del equipo con un tono cálido y directo.
```

**Regla:** el rol tiene que ser específico al dominio. "Sos un asistente útil" no ayuda.
"Sos un clasificador de emails de clientes para una tienda de ropa" sí ayuda.

---

## I — Instrucción
Define exactamente qué tiene que hacer la IA. La instrucción más efectiva es una sola
tarea clara. Si necesitás varias tareas, separarlas en pasos numerados.

**Instrucción vaga:**
```
Ayudame con este email.
```

**Instrucción clara:**
```
Leé el mensaje del cliente y clasificalo en una de estas tres categorías:
CONSULTA, RECLAMO u OTRO. Respondé con una sola palabra.
```

**Regla:** si la instrucción tiene más de 3 oraciones, probablemente está tratando de
hacer demasiadas cosas a la vez. Dividir en pasos numerados.

---

## E — Ejemplos (opcional pero muy efectivo)
Mostrar a la IA qué tipo de output se espera. Los ejemplos son el mecanismo más
efectivo para calibrar el formato y el tono de la respuesta.

```
Ejemplos:
Mensaje: "¿Cuándo llega mi pedido?"  → CONSULTA
Mensaje: "Me llegó el producto dañado" → RECLAMO
Mensaje: "¿Tienen local físico?"      → OTRO
```

**Regla:** incluir al menos un ejemplo para cada categoría o caso posible.

---

## L — Límites
Define qué NO debe hacer la IA. Los límites evitan respuestas largas, inventadas
o fuera de tema.

```
Límites:
- Respondé SOLO con la categoría (una palabra). No expliques.
- Si el mensaje no está claro, elegí la categoría más probable.
- No inventes información sobre pedidos que no tenés en los datos.
```

**Regla:** los límites son especialmente importantes para:
- Controlar el largo de la respuesta
- Evitar que la IA invente datos
- Asegurar el formato exacto que necesita el flujo

---

## Plantilla completa RIEL

```
[ROL]
Sos [quién es la IA] para [nombre del negocio/contexto].
[Descripción del contexto relevante en 1-2 oraciones].

[INSTRUCCIÓN]
Tu tarea: [descripción clara de qué hacer].
[Pasos numerados si hay múltiples acciones].

[EJEMPLOS - opcional]
Ejemplos:
[Entrada 1] → [Output esperado]
[Entrada 2] → [Output esperado]

[LÍMITES]
Reglas:
- [Límite 1]
- [Límite 2]
- [Límite 3]
```

---

## Variables dinámicas: `{{campo}}`

Las variables permiten que el mismo prompt se use con datos distintos cada vez.

```
Hola {{nombre_cliente}},

Tu pedido #{{numero_pedido}} está actualmente en estado {{estado}}.
La fecha estimada de entrega es el {{fecha_estimada}}.

{{#if tracking}}
Podés seguirlo con el código: {{tracking}}
{{/if}}

Equipo Lumina
```

En n8n, las variables se escriben con la sintaxis `{{ $json.campo }}`.
En Zapier, con `{{campo}}`.
En los prompts de clase, usamos `{{campo}}` como placeholder genérico.
