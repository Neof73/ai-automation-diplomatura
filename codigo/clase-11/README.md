# Clase 11 — Integrar ChatGPT en tu flujo: la IA como empleado del proceso

## Archivos de esta clase

| Archivo | Descripción |
|---|---|
| `workflow-clase-11.json` | ✅ Workflow n8n con nodo OpenAI para clasificación |
| `prompts/clasificador-sistema.txt` | System prompt del clasificador de mensajes |
| `mensajes-prueba-clasificacion.csv` | 20 mensajes de prueba con clasificación esperada |
| `setup-openai-n8n.md` | Cómo configurar la API key de OpenAI en n8n |
| `codigo/parsear-clasificacion.js` | Script para procesar la respuesta del clasificador |

## Qué cambia respecto a la clase 07

| Clase 07 (palabras clave) | Clase 11 (IA) |
|---|---|
| Detecta "roto", "dañado" | Entiende "la caja llegó aplastada" |
| No detecta "no es lo que pedí" | Detecta cualquier variante de reclamo |
| 0% de falsos negativos para casos conocidos | ~95% de precisión en cualquier texto |
| Gratis (sin API) | ~$0.0001 por clasificación |

## Cómo importar y configurar

1. Importar `workflow-clase-11.json` en n8n
2. Configurar la API key de OpenAI en n8n (ver `setup-openai-n8n.md`)
3. Reemplazar `YOUR_SPREADSHEET_ID` con el ID de la planilla real
4. Testear con los mensajes de `mensajes-prueba-clasificacion.csv`

## Resultado esperado del clasificador

El nodo OpenAI devuelve una de estas tres palabras:
- `CONSULTA` → el cliente quiere info sobre su pedido
- `RECLAMO` → el cliente tiene un problema o quiere devolver
- `OTRO` → cualquier otra consulta

El nodo IF siguiente lee `{{ $json.message.content }}` para tomar la decisión.
