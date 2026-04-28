# 🏠 Lumina — Caso de negocio del programa

> Este documento es el hilo conductor de todo el programa. A lo largo de las 20 semanas construís el sistema completo de Lumina, y al final lo adaptás a tu propio negocio.

---

## ¿Qué es Lumina?

Lumina es una tienda de productos para el hogar que vende online y físicamente. Es un negocio **genérico y adaptable** — representa cualquier empresa que venda productos o servicios y tenga interacción post-venta con clientes.

**Podés reemplazar Lumina por:**
- Tu tienda de ropa, electrónica o alimentos
- Tu estudio, consultora o agencia
- Tu negocio de servicios (plomería, diseño, logística, etc.)

---

## El problema antes de la automatización

| Indicador | Situación inicial |
|---|---|
| Consultas por día | 40 a 80 mensajes |
| Tiempo manual diario | 4 horas de un empleado |
| Consultas repetitivas | ~80% son siempre las mismas |
| Tiempo de respuesta | 3 días promedio |
| Cobertura | Solo en horario laboral |

**Las consultas más frecuentes:**
1. ¿Dónde está mi pedido?
2. ¿Cuándo llega?
3. Quiero cambiar / devolver un producto
4. Me llegó algo roto o incompleto
5. ¿Tienen garantía?

---

## El sistema construido al final del programa

### Arquitectura del agente post-venta

```
[Cliente escribe] → Gmail / WhatsApp
        ↓
[n8n recibe el mensaje]
        ↓
[IA clasifica la consulta]
   ├── Consulta simple → busca datos → genera respuesta → envía al cliente
   └── Reclamo complejo → alerta al equipo con contexto completo
        ↓
[Airtable registra todo]
        ↓
[Dashboard Google Sheets muestra métricas]
```

### Paso a paso del flujo

**1. Trigger**
El flujo se activa cuando entra un email o mensaje de WhatsApp.
- Herramientas: Gmail, WhatsApp Business, n8n Trigger

**2. Clasificación con IA**
ChatGPT o Gemini lee el mensaje y determina: ¿es una consulta de estado, un reclamo, una devolución, o algo que requiere un humano?
- Herramientas: OpenAI API, Gemini API, n8n AI Node

**3. Búsqueda de datos**
El agente extrae el número de pedido y consulta el estado en Airtable o Google Sheets.
- Herramientas: Airtable, Google Sheets, n8n HTTP Node

**4. Generación de respuesta personalizada**
La IA redacta una respuesta con los datos reales del pedido y el tono de Lumina. No es un template — es un mensaje para esa persona y ese pedido.
- Herramientas: ChatGPT, Gmail Send

**5. Escalada inteligente (si aplica)**
Si detecta un reclamo serio o cliente insatisfecho, envía alerta por Slack con historial y sugerencia de respuesta.
- Herramientas: Slack, Email interno

**6. Registro y métricas**
Cada interacción queda registrada en Airtable. Dashboard automático en Google Sheets muestra el impacto.
- Herramientas: Airtable, Google Sheets Dashboard

---

## Resultados del sistema

| Indicador | Antes | Después |
|---|---|---|
| Consultas resueltas automáticamente | 0% | 92% |
| Tiempo de respuesta promedio | 3 días | < 2 minutos |
| Horas manuales por día | 4 horas | 15 minutos de supervisión |
| Cobertura horaria | Horario laboral | 24/7 |
| Registro de interacciones | Ninguno | 100% documentado |

---

## Cómo adaptar Lumina a tu negocio

Al llegar al Bloque 4 (semana 17), tomás este sistema y cambiás:

1. **La fuente de datos** → tu sistema de pedidos, CRM o hoja de cálculo
2. **El tono de respuesta** → el estilo de comunicación de tu marca
3. **Los criterios de escalada** → qué casos querés que lleguen a vos
4. **Los canales** → email, WhatsApp, formulario web, etc.
5. **Las métricas** → qué querés medir según tu negocio

---

*El sistema de Lumina es el proyecto más complejo del programa — pero lo construís paso a paso, una clase a la vez, durante las 20 semanas.*
