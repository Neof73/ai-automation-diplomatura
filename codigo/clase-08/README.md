# Clase 08 — Conectar WhatsApp, Slack y Notion al flujo

## Archivos de esta clase

| Archivo | Descripción |
|---|---|
| `workflow-clase-08.json` | ✅ Workflow n8n con notificaciones a Slack y Notion |
| `slack-message-templates.json` | Templates de mensajes para distintos tipos de alerta |
| `notion-database-schema.json` | Estructura de la base de datos de Notion para Lumina |
| `setup-slack-notion.md` | Cómo conectar Slack y Notion en n8n |

## Qué agrega este workflow

Extiende el workflow de la clase 07 con notificaciones al equipo:

```
Reclamo detectado (rama TRUE del IF):
  → Slack: alerta en #alertas-clientes
  → Notion: crear página en la DB de reclamos
  → Gmail: respuesta de acuse de recibo al cliente

Consulta normal (rama FALSE):
  → Buscar pedido
  → Gmail: respuesta con estado del pedido
  → Slack: log silencioso en #log-consultas (sin notificación)
```

## Prerrequisitos

- Workspace de Slack (crear uno gratuito en slack.com si no tenés)
- Cuenta de Notion (gratuita en notion.so)
- Credenciales de ambos configuradas en n8n (ver `setup-slack-notion.md`)
