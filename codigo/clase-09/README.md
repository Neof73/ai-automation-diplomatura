# Clase 09 — Qué hacer cuando algo falla: manejo de errores

## Archivos de esta clase

| Archivo | Descripción |
|---|---|
| `workflow-clase-09.json` | ✅ Workflow n8n con rutas de error y manejo de casos vacíos |
| `workflow-error-global.json` | ✅ Workflow separado de Error Trigger para n8n |
| `escenarios-error.md` | 5 escenarios de error para probar intencionalmente |
| `codigo/validar-campos.js` | Script del nodo Code para validar datos antes de procesarlos |

## Qué agrega este workflow

Extiende el workflow de la clase 07 con manejo robusto de errores:

```
Rama FALSE (consulta) → Buscar pedido
  ↓
IF: ¿Se encontró el pedido?
  TRUE  → IF: ¿Tiene tracking?
    TRUE  → Gmail: respuesta con tracking
    FALSE → Gmail: respuesta sin tracking (fecha estimada solamente)
  FALSE → Gmail: respuesta pidiendo confirmar email de compra
```

Además: workflow de Error Trigger separado que notifica al equipo cuando
cualquier nodo del flujo falla con un error técnico.

## Cómo probar los errores intencionalmente

Ver `escenarios-error.md` para los casos de prueba específicos.

## Importante: flujos que NO se rompen en silencio

Un flujo sin manejo de errores puede dejar de funcionar sin que nadie lo sepa.
El Error Trigger de `workflow-error-global.json` garantiza que el equipo
recibe un aviso cuando algo falla.
