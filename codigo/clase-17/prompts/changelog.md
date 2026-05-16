# Changelog del System Prompt del Agente

Registrar TODOS los cambios al system prompt aquí.
Formato: fecha, problema observado, cambio realizado, resultado.

---

## Template para cada entrada

```markdown
## YYYY-MM-DD — [descripción en una frase]

### Problema observado
[Qué comportamiento incorrecto se vio en el agente]
[Ejemplo concreto del mensaje y la respuesta incorrecta]

### Cambio realizado
[Exactamente qué se cambió en el prompt]
[Texto anterior vs. texto nuevo si es relevante]

### Resultado
[Cómo mejoró (o no) el comportamiento después del cambio]
[Casos de prueba que confirman la mejora]

### Versión del prompt
v[X.Y]
```

---

## Ejemplo de entrada

```markdown
## 2025-05-12 — Agente busca pedido para preguntas de catálogo

### Problema observado
Cuando el cliente pregunta "¿tienen la remera slim en rojo?", el agente
llama a buscar_pedido aunque el cliente no tiene un pedido asociado.
Genera un error o una respuesta sin sentido.

### Cambio realizado
Agregué a la descripción de buscar_pedido:
ANTES: "Busca el pedido de un cliente."
DESPUÉS: "Busca el pedido de un cliente cuando pregunta por el ESTADO de
una compra que ya realizó. NO usar si el cliente pregunta sobre productos
del catálogo o disponibilidad."

### Resultado
El agente ahora responde preguntas de catálogo sin llamar a buscar_pedido.
Probado con 5 preguntas de productos — todas resueltas correctamente.

### Versión del prompt
v1.1
```

---

## Mis cambios (completar durante el programa)

<!-- Agregar las entradas acá -->
