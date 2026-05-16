# Clase 10 — Entregable 2: Pipeline operativo de tu negocio

## Archivos de esta clase

| Archivo | Descripción |
|---|---|
| `workflow-pipeline-completo.json` | ✅ Pipeline completo de Lumina — Bloque 2 integrado |
| `checklist-entregable-2.md` | Criterios de evaluación del entregable |
| `guia-demo-5-minutos.md` | Cómo estructurar la demo en vivo |
| `rubrica.md` | Rúbrica de evaluación detallada |

## El pipeline completo de Lumina (Bloque 2)

```
Gmail Trigger
  → Validar campos (Code)
  → Google Sheets: Registrar consulta
  → IF: ¿Es reclamo? (palabras clave)
      TRUE  → Gmail: Alerta equipo
              → Slack: Alerta #alertas-clientes
              → Notion: Crear página de reclamo
      FALSE → Sheets: Buscar pedido por email
              → IF: ¿Pedido encontrado?
                  TRUE  → IF: ¿Tiene tracking?
                            TRUE  → Gmail: Respuesta con tracking
                            FALSE → Gmail: Respuesta sin tracking
                  FALSE → Gmail: Pedir confirmación de email
  → Sheets: Actualizar estado del registro
```

## Qué presentar en el entregable

1. El flujo activo en n8n (toggle "Active" encendido)
2. Demo en vivo: enviar un email de prueba y mostrar el resultado
3. El historial de ejecuciones de la última semana
4. Los números: cuántos emails procesó, cuánto tiempo ahorró

## Tarea para la semana 11: preparar para el Bloque 3

- Crear cuenta en platform.openai.com y generar una API key
- Guardar la API key en el archivo `.env` del proyecto en VS Code
- Revisar los prompts de la clase 2 y ajustarlos con lo aprendido
