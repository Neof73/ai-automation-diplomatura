# Clase 12 — Respuestas automáticas que suenan humanas

## Archivos de esta clase

| Archivo | Descripción |
|---|---|
| `workflow-clase-12.json` | ✅ Workflow n8n con nodo OpenAI para redacción de respuestas |
| `prompts/redaccion-respuesta.txt` | System prompt para responder consultas de pedido |
| `prompts/pedido-no-encontrado.txt` | System prompt para cuando el pedido no existe |
| `casos-respuesta.md` | 6 casos de prueba con mensaje de entrada y respuesta esperada |

## Qué agrega este workflow

Extiende el workflow de la clase 11 reemplazando los templates fijos por
redacción inteligente con IA:

```
Rama FALSE (consulta) del IF:
  → Sheets: Buscar pedido
  → IF: ¿Pedido encontrado?
      TRUE  → OpenAI: Redactar respuesta personalizada con datos del pedido
              → Gmail: Enviar respuesta al cliente
      FALSE → OpenAI: Redactar respuesta pidiendo confirmación de email
              → Gmail: Enviar respuesta al cliente
```

## La diferencia clave respecto a los templates fijos

**Template fijo (clase 07):**
```
Hola, tu pedido #{{ID}} está en {{Estado}}. Tracking: {{Tracking}}.
```
❌ Suena robótico
❌ Si el tracking está vacío, queda "Tracking: "
❌ No responde lo que el cliente preguntó específicamente

**Con IA (clase 12):**
La IA lee el mensaje original del cliente, los datos del pedido y genera
una respuesta que responde a la pregunta específica y maneja los casos
especiales (sin tracking, entregado, devuelto) de forma natural.

## Configuración del nodo OpenAI de redacción

```
Model:       gpt-4o
Temperature: 0.4  (algo de variación sin perder precisión)
Max tokens:  400  (suficiente para 3 párrafos, evita respuestas largas)
```

El user message que recibe la IA:
```
El cliente escribió:
---
{{ $json.mensaje_cliente }}
---

Datos del pedido:
- Nombre: {{ $json['Nombre Cliente'] }}
- Pedido #{{ $json['ID'] }}
- Estado: {{ $json['Estado'] }}
- Fecha estimada: {{ $json['Fecha Estimada'] }}
- Tracking: {{ $json['Tracking'] }}

Redactá la respuesta al cliente.
```
