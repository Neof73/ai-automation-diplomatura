# Ejercicios de Prompts — Clase 02

Probar cada ejercicio en ChatGPT (chat.openai.com) o Claude (claude.ai).
Después de cada ejercicio: analizar qué funcionó, qué no, y cómo mejorarlo.

---

## Ejercicio 1 — Prompt vago vs. prompt específico

**Parte A:** Copiar este prompt exacto y ver qué responde la IA:
```
Ayudame a responder un email de un cliente enojado.
```

**Parte B:** Ahora usar el framework RIEL para escribir el mismo prompt correctamente.
Incluir: rol, instrucción clara, ejemplos del tipo de email y límites de tono y largo.

**Pregunta a responder:** ¿cuánto cambió la calidad de la respuesta?

---

## Ejercicio 2 — Control del formato de output

El flujo de n8n necesita que la IA responda SOLO con un número del 1 al 5
representando la prioridad de un reclamo:
- 1 = muy baja
- 3 = media
- 5 = crítica urgente

**Escribir un prompt** que reciba el texto de un reclamo y devuelva
solo el número de prioridad, sin ningún texto adicional.

Probarlo con estos tres reclamos:
- "Hola, ¿podrían decirme cuándo llega mi pedido?"
- "Me mandaron el producto equivocado. Es un regalo para mañana."
- "Ya es la tercera vez que escribo. Nadie me responde. Voy a hacer el reclamo."

**Meta:** los tres deben devolver 1, 4 y 5 respectivamente (o similar).

---

## Ejercicio 3 — Variables dinámicas

Tomar el Prompt 2 de `prompts-lumina-clase.txt` y probarlo con estos datos:

**Caso A — Pedido con tracking:**
```
nombre_cliente: Valentina Ruiz
numero_pedido: 4807
estado: En camino
fecha_estimada: 11 de mayo
tracking: AR9900012307
mensaje_cliente: Hola! Quería saber si ya salió mi pedido, lo hice hace 4 días.
```

**Caso B — Pedido sin tracking:**
```
nombre_cliente: Lucas Fernández
numero_pedido: 4804
estado: Pendiente
fecha_estimada: 12 de mayo
tracking: N/A
mensaje_cliente: Mi pedido todavía no llegó y ya pasó bastante tiempo.
```

**Caso C — Pedido entregado:**
```
nombre_cliente: Diego Sánchez
numero_pedido: 4808
estado: Entregado
fecha_estimada: ya entregado
tracking: AR9900012308
mensaje_cliente: ¿Cuándo llega mi pedido?
```

**Analizar:** ¿el prompt maneja correctamente los tres casos sin instrucciones extras?

---

## Ejercicio 4 — Diseñar el clasificador para tu negocio

Usando el Prompt 1 como base, adaptar el clasificador para el negocio propio:

1. Definir las 3-4 categorías relevantes para tu negocio (no tienen que ser CONSULTA/RECLAMO/OTRO)
2. Escribir 2 ejemplos por categoría
3. Agregar los límites específicos que necesita tu flujo

Probar el clasificador con 5 mensajes reales que llegaron al negocio esta semana.

---

## Ejercicio 5 — Prompt de extracción de datos

El siguiente mensaje de un cliente contiene múltiples datos que hay que extraer
para registrar en la planilla:

> "Hola! Soy Carolina Vega, escribo desde carolina.vega@gmail.com.
> Compré la Campera Denim talle S azul oscuro el 9 de mayo (pedido 4817).
> Cuando llegó me di cuenta que era azul claro, no el oscuro que pedí.
> Quiero hacer el cambio o que me devuelvan el dinero."

**Escribir un prompt** que extraiga y devuelva estos campos en formato JSON:
```json
{
  "nombre": "",
  "email": "",
  "numero_pedido": "",
  "producto": "",
  "problema": "",
  "accion_solicitada": ""
}
```

**Restricción:** la IA debe devolver SOLO el JSON, sin texto adicional.
