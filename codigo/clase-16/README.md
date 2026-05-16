# Clase 16 — Del chatbot al agente: la diferencia que cambia todo

## Archivos de esta clase

| Archivo | Descripción |
|---|---|
| `workflow-agente-clase-16.json` | ✅ Workflow n8n con nodo AI Agent configurado |
| `prompts/agente-sistema.txt` | System prompt completo del agente post-venta |
| `prompts/herramientas/buscar-pedido.txt` | Descripción de la herramienta de búsqueda de pedidos |
| `prompts/herramientas/verificar-stock.txt` | Descripción de la herramienta de stock |
| `prompts/herramientas/registrar-caso.txt` | Descripción de la herramienta de escalada |
| `casos-agente.md` | 5 conversaciones de prueba para el agente |

## Cómo importar el workflow del agente

1. Importar `workflow-agente-clase-16.json` en n8n
2. En el nodo "AI Agent":
   - Conectar el Chat Model (OpenAI gpt-4o)
   - Copiar el system prompt de `prompts/agente-sistema.txt`
3. Para cada herramienta (3 nodos de Sheets conectados al agente):
   - Copiar la descripción del archivo correspondiente en `prompts/herramientas/`
   - Configurar las credenciales de Google Sheets
   - Configurar el ID de la planilla
4. Probar con los casos de `casos-agente.md`

## La diferencia respecto al Bloque 3

En el Bloque 3, el flujo tiene caminos predefinidos:
- Si es reclamo → alerta
- Si es consulta → buscar pedido → responder

En el Bloque 4 (agente), el sistema **razona** en cada caso:
- Lee el mensaje completo
- Decide qué herramientas usar y en qué orden
- Puede manejar mensajes con múltiples preguntas
- Puede buscar información adicional si la necesita

## Cómo ver el razonamiento del agente

En n8n, al ejecutar el flujo en modo test, el nodo AI Agent muestra
el historial completo de razonamiento:
- THOUGHT: qué está pensando el agente
- ACTION: qué herramienta va a usar
- OBSERVATION: qué devolvió la herramienta
- FINAL ANSWER: la respuesta al cliente
