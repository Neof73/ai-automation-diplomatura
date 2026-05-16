# [Nombre del sistema] — Documentación

*Última actualización: [fecha]*

---

## Qué hace este sistema

[Una o dos oraciones. Sin jerga técnica. Describir qué resuelve, no cómo funciona.]

Ejemplo: "Sistema de atención al cliente automatizado que captura mensajes de Gmail,
los clasifica con IA y responde automáticamente las consultas de pedidos, alertando
al equipo cuando hay un reclamo urgente."

---

## Dónde está todo

| Componente | Dónde |
|---|---|
| Flujos de n8n | cloud.n8n.io → [nombre del workspace] |
| Planilla de Google Sheets | [link a la planilla] |
| Base de conocimiento (RAG) | [link a Supabase o N/A] |
| Prompts del sistema | VS Code → `prompts/` |
| Documentación de arquitectura | VS Code → `arquitectura/` |

---

## Flujos activos

| Flujo | Trigger | Estado |
|---|---|---|
| Captura y respuesta | Gmail — email nuevo | ✅ Activo |
| Reporte semanal | Lunes 09:00 | ✅ Activo |
| Error Handler global | Error en cualquier flujo | ✅ Activo |

---

## Cómo operarlo

**Monitoreo diario (5 minutos):**
1. Abrir el historial de ejecuciones en n8n
2. Verificar que no hay ejecuciones con error (ícono rojo)
3. Si hay errores: revisar el email de alerta del Error Handler

**Monitoreo semanal (10 minutos):**
1. Leer el reporte automático del lunes a las 9:00
2. Abrir el dashboard de Google Sheets y revisar las métricas
3. Si la tasa de resolución automática baja de [X]%: revisar los prompts

---

## Qué hacer cuando algo falla

**Error: "Authentication failed" en Gmail o Sheets**
→ Ir a n8n → Credentials → reconectar la credencial afectada

**Error: "Insufficient quota" en OpenAI**
→ Ir a platform.openai.com → Billing → agregar créditos

**El flujo no se activa cuando llega un email**
→ Verificar que el workflow está en estado "Active" (toggle verde)
→ Verificar que el Gmail trigger está configurado con la cuenta correcta

**El agente responde de forma incorrecta**
→ Revisar el system prompt en `prompts/agente-sistema.txt`
→ Agregar el caso problemático como ejemplo al prompt
→ Registrar el cambio en `prompts/changelog.md`

---

## Costos mensuales estimados

| Servicio | Plan | Costo aproximado |
|---|---|---|
| n8n Cloud | [plan] | $[X] USD/mes |
| OpenAI API | Pay-per-use | $[X] USD/mes |
| Google Workspace | [plan o gratuito] | $[X] USD/mes |
| **Total** | | **$[X] USD/mes** |

---

## Historial de cambios importantes

| Fecha | Cambio |
|---|---|
| [fecha] | Versión inicial del sistema |
| [fecha] | [descripción del cambio] |

---

## Contacto

Creado por: [nombre]
Programa: AI Automation Diplomatura — UTN
Contacto para soporte: [email]
