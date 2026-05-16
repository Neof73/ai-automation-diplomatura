# Clase 17 — Adaptá el agente de Lumina a tu propio negocio

## Archivos de esta clase

| Archivo | Descripción |
|---|---|
| `schemas/contrato-entrada.json` | Esquema JSON de lo que recibe cada agente trabajador |
| `schemas/contrato-salida.json` | Esquema JSON de lo que devuelve cada agente trabajador |
| `prompts/plantilla-agente.txt` | Template de system prompt para adaptar al negocio propio |
| `arquitectura/diseno-template.md` | Template para diseñar el sistema en VS Code |
| `prompts/changelog.md` | Registro de cambios al system prompt (empezar desde aquí) |

## El flujo de trabajo de hoy

1. Abrir `arquitectura/diseno-template.md` en VS Code y completar el diseño
2. Usar `prompts/plantilla-agente.txt` como base para el system prompt propio
3. Configurar el agente en n8n con las herramientas del negocio propio
4. Testear con mensajes reales del negocio
5. Registrar los cambios en `prompts/changelog.md`

## Regla de los ajustes incrementales

Cambiar UNA SOLA COSA por vez en el prompt.
Probar. Ver si mejoró.
Registrar en changelog.md qué cambió y por qué.

Si se cambian muchas cosas a la vez, no se sabe qué causó el cambio.
