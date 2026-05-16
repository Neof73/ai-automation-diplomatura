# Clase 13 — La IA detecta clientes insatisfechos antes de que escalen

## Archivos de esta clase

| Archivo | Descripción |
|---|---|
| `prompts/analisis-sentimiento.txt` | System prompt del análisis de sentimiento + urgencia |
| `codigo/parsear-sentimiento.js` | Script del nodo Code para procesar la respuesta JSON |
| `mensajes-sentimiento.csv` | 15 mensajes etiquetados para testear el análisis |
| `workflow-clase-13.json` | ✅ Workflow n8n con análisis de sentimiento integrado |

## Qué agrega este workflow

Integra el análisis de sentimiento en la rama de reclamos:

```
Reclamo detectado (IA) →
  OpenAI: Analizar sentimiento y urgencia →
  Code: Parsear JSON de la IA →
  IF: ¿Requiere atención humana?
    TRUE →
      IF: ¿Es crítico? (sentimiento=critico AND urgencia=critica)
        TRUE  → Slack: Alerta 🔴 PRIORITARIA
                Gmail: Respuesta de acuse de recibo urgente
        FALSE → Slack: Alerta 🟡 estándar
                Gmail: Respuesta de acuse de recibo
    FALSE → Registrar reclamo simple para seguimiento
  → Sheets: Actualizar con sentimiento y urgencia detectados
```

## El nodo Code: por qué es necesario

El nodo OpenAI devuelve el JSON como texto plano. El nodo IF no puede leer
directamente los campos de un JSON en texto — necesita que sean campos
separados. El script `parsear-sentimiento.js` hace esa conversión.

## Testear el análisis con mensajes reales

Usar los mensajes de `mensajes-sentimiento.csv` para verificar que el sistema
clasifica correctamente. Si hay clasificaciones incorrectas, ajustar el prompt
agregando más ejemplos o clarificando los criterios.
