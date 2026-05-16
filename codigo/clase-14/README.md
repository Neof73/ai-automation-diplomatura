# Clase 14 — Generar documentos, reportes y resúmenes automáticos

## Archivos de esta clase

| Archivo | Descripción |
|---|---|
| `workflow-reporte-semanal.json` | ✅ Workflow n8n con Schedule Trigger para reporte semanal |
| `prompts/reporte-ejecutivo.txt` | System prompt del generador de reportes |
| `codigo/calcular-metricas.js` | Script del nodo Code para calcular métricas de la semana |
| `formulas-dashboard.md` | Fórmulas de Google Sheets para el dashboard de ROI |

## El flujo del reporte semanal

```
[Schedule Trigger: lunes 09:00]
  → Sheets: Obtener filas de la semana anterior
  → Code: Calcular métricas (total, reclamos, auto, urgentes)
  → OpenAI: Generar resumen ejecutivo con las métricas
  → Gmail: Enviar reporte a equipo@lumina.com
  → Slack: Enviar resumen a #reportes-semanales
```

## Cómo configurar el Schedule Trigger

En n8n, el nodo Schedule Trigger:
- Trigger At: Every Week
- Day of Week: Monday
- Hour: 9
- Minute: 0

El flujo se ejecuta automáticamente cada lunes a las 9:00 sin que nadie haga nada.

## El nodo Code: calcular métricas

El script `calcular-metricas.js` procesa las filas de Google Sheets y devuelve
un objeto con las métricas listas para el prompt de OpenAI.

Ver el script para el detalle de los cálculos.
