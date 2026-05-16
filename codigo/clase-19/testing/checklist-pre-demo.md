# Checklist técnica pre-Demo Day

Completar esta checklist el día anterior al Demo Day.
Un ítem sin check = riesgo en la presentación.

---

## Infraestructura

- [ ] El flujo principal está en estado **Active** en n8n (no solo en modo test)
- [ ] Las credenciales de Gmail no están vencidas — enviar un email de prueba y verificar
- [ ] La credencial de OpenAI está activa y tiene saldo disponible
- [ ] Las credenciales de Google Sheets están activas
- [ ] El workflow de Error Trigger global está configurado y activo

## Flujo de entrada

- [ ] Enviar `mensaje-de-prueba.txt` → verificar que:
  - Aparece en la hoja "Consultas" de Google Sheets
  - Se clasifica correctamente (IA o palabras clave)
  - Se envía la respuesta automática al email de prueba
  - La alerta llega a Slack/email del equipo (si aplica)
- [ ] Enviar `mensaje-respaldo.txt` → verificar que también funciona correctamente

## Agente (si aplica)

- [ ] Probar el agente con el mensaje de prueba — el razonamiento es correcto
- [ ] Probar el agente con una consulta donde el pedido NO existe → maneja bien el error
- [ ] Probar el agente con una consulta de múltiples preguntas → responde todas

## Reporte

- [ ] Ejecutar el reporte manualmente → el email llega con datos correctos
- [ ] El dashboard de Google Sheets tiene las fórmulas calculando correctamente

## Demo en vivo

- [ ] El mensaje de prueba está copiado en el portapapeles y en `demo/mensaje-de-prueba.txt`
- [ ] Las pestañas del navegador están abiertas:
  - n8n con el flujo visible
  - Google Sheets con la hoja de Consultas
  - El email o Slack con las alertas
- [ ] El dashboard está abierto y los números son correctos
- [ ] El VS Code tiene los archivos de referencia abiertos

## Números del ROI

- [ ] Los supuestos están documentados en `supuestos-roi-template.md`
- [ ] Los tres números de memoria:
  - Mensajes procesados la última semana: ___
  - Tasa de resolución automática: ___%
  - ROI anual: ___%

---

## Si algo falla durante la demo

**El agente tarda mucho (>30 segundos):**
→ Mostrar una ejecución reciente exitosa del historial de n8n

**La API de OpenAI da error:**
→ Mostrar la ejecución del día anterior como "así funciona normalmente"
→ Explicar el error como una situación de error que el sistema detectaría

**Google Sheets no carga:**
→ Tener una captura de pantalla del dashboard como respaldo

**El email de prueba no llega:**
→ Mostrar el historial de ejecuciones de n8n como evidencia de que funciona
