# Clase 08 — Conectar WhatsApp, Slack y Notion al flujo

**Bloque 2: Automatizaciones · Semana 8 de 20**
**Duración:** 2 horas · **Tipo:** Práctica · **Nivel:** Intermedio

---

## Objetivo de la clase

Que cada participante extienda su flujo para que los avisos y registros lleguen a los canales que el equipo realmente usa — WhatsApp, Slack o Notion — en lugar de solo al email. Al terminar, el flujo tiene que notificar al canal correcto según el tipo de evento.

---

## Agenda

| Tiempo | Bloque | Descripción |
|---|---|---|
| 0:00 – 0:10 | Apertura | Revisión de la semana anterior y contexto |
| 0:10 – 0:30 | Bloque 1 | Por qué importa notificar en el canal correcto |
| 0:30 – 0:55 | Bloque 2 | Conectar Slack, WhatsApp y Notion a n8n |
| 0:55 – 1:20 | Bloque 3 | Flujo de alertas de Lumina — construido en vivo |
| 1:20 – 1:45 | Ejercicio | Cada participante conecta su canal de equipo |
| 1:45 – 1:55 | Cierre | Pruebas y revisión |
| 1:55 – 2:00 | Tarea | Explicación de la tarea de la semana |

---

## Apertura (0:00 – 0:10)

### Revisión de la semana anterior

¿Cuántos mensajes procesó el flujo? ¿Cuántos cayeron en cada rama? ¿Hubo mensajes mal clasificados que obligaron a ajustar las condiciones?

El docente recoge los datos del grupo y señala un patrón común: las primeras versiones de las condiciones siempre necesitan ajustes. Eso es normal y esperado — los flujos se refinan con el uso real.

### El problema que resolvemos hoy

Los flujos de las semanas anteriores envían avisos por email. Pero el email tiene un problema: no es el canal donde los equipos trabajan en tiempo real. Un reclamo que llega a las 10am puede no verse hasta la tarde si el responsable no abre el email.

Los equipos modernos trabajan en Slack, WhatsApp o herramientas como Notion. Los avisos tienen que llegar donde está la atención, no donde debería estar.

---

## Bloque 1 — Por qué importa notificar en el canal correcto (0:10 – 0:30)

### El problema de la latencia de atención

Un sistema automático puede procesar un reclamo en segundos. Pero si el aviso al equipo llega por un canal que nadie revisa en tiempo real, el tiempo de respuesta sigue siendo alto — no por culpa del sistema, sino por culpa del canal.

La regla es simple: **el aviso tiene que llegar donde la persona ya está mirando**.

- Si el equipo usa Slack para coordinarse → los avisos urgentes van a Slack
- Si el responsable de atención usa WhatsApp → las alertas van a WhatsApp
- Si el proceso requiere que alguien complete una tarea → va a Notion como una tarea asignada

### Cuándo usar cada canal

| Canal | Mejor para | Consideraciones |
|---|---|---|
| **Slack** | Equipos que ya usan Slack para comunicación interna | Requiere workspace de Slack activo |
| **WhatsApp** | Negocios pequeños donde el responsable usa WhatsApp como canal principal | Requiere WhatsApp Business API o servicio intermediario |
| **Notion** | Registrar tareas, documentar procesos, bases de conocimiento | Ideal cuando el aviso requiere seguimiento y documentación |
| **Email** | Comunicaciones formales, registros que necesitan un hilo de conversación | Siempre disponible como respaldo |
| **Telegram** | Alternativa a WhatsApp con API más accesible | Buena opción para notificaciones internas |

### La arquitectura de notificaciones de un negocio

Un negocio bien automatizado tiene una arquitectura de notificaciones clara:

```
Evento → Severidad → Canal

Reclamo urgente          → Alta    → WhatsApp del responsable + Slack #urgente
Consulta nueva           → Media   → Slack #consultas
Reporte semanal          → Baja    → Email del dueño
Pedido nuevo             → Info    → Slack #ventas
Error en el flujo        → Crítica → Email + WhatsApp del administrador
```

Definir esta arquitectura antes de conectar los canales evita el problema opuesto: que todo llegue a todos los canales y nadie sepa qué requiere acción.

---

## Bloque 2 — Conectar Slack, WhatsApp y Notion a n8n (0:30 – 0:55)

### Conectar Slack

**Prerequisito:** tener un workspace de Slack y un canal donde llegar. Si no tenés Slack, es el momento de crearlo — es gratuito para equipos pequeños.

**Pasos en n8n:**
1. Agregar nodo Slack
2. En Credentials: "Add credential" → OAuth2
3. Autorizar la app de n8n en tu workspace de Slack
4. Elegir el canal de destino (puede ser un canal existente o crear uno nuevo)

**Configuración del mensaje:**
- El nodo Slack permite texto plano y formato Markdown
- Se pueden incluir datos del flujo con `{{ $json.campo }}`
- Para mensajes urgentes, usar el prefijo `⚠️` o `🚨` para destacarlos visualmente

**Ejemplo de mensaje:**
```
🚨 *Reclamo recibido*

*De:* {{ $json.email_cliente }}
*Fecha:* {{ $json.fecha }}
*Mensaje:* {{ $json.mensaje }}

Requiere atención inmediata.
```

---

### Conectar WhatsApp

WhatsApp Business API tiene restricciones de uso para mensajes automáticos. Las opciones más accesibles para este programa son:

**Opción A — Twilio (recomendada para aprender)**
- Twilio provee un número de WhatsApp Sandbox para pruebas gratuitas
- Pasos: crear cuenta en twilio.com → activar WhatsApp Sandbox → en n8n agregar nodo HTTP Request apuntando a la API de Twilio

**Opción B — WhatsApp Business API directa**
- Requiere verificación del negocio por Meta
- Más compleja de configurar pero más robusta para producción
- Recomendada si el negocio ya tiene WhatsApp Business activo

**Opción C — Telegram como alternativa**
- Telegram tiene una API mucho más accesible y gratuita
- Funciona muy bien para notificaciones internas del equipo
- El docente muestra la configuración del bot de Telegram como alternativa práctica

**Pasos para Telegram:**
1. Hablar con @BotFather en Telegram → crear un bot → obtener el token
2. En n8n: agregar nodo Telegram → ingresar el token → elegir el chat de destino
3. Configurar el mensaje con los datos del flujo

---

### Conectar Notion

Notion es ideal cuando el aviso requiere seguimiento: crear una tarea, documentar una incidencia o agregar un registro a una base de datos interna.

**Pasos en n8n:**
1. Agregar nodo Notion
2. En Credentials: ingresar el Integration Token de Notion
   - En Notion: Settings → Integrations → Create integration → copiar el token
   - Compartir la base de datos de Notion con la integración
3. Operación: "Create Page" (crear una página en una base de datos)
4. Mapear los campos del flujo a las propiedades de la base de datos de Notion

**Ejemplo de uso:** cuando llega un reclamo, crear automáticamente una tarjeta en la base de datos "Reclamos" de Notion con el nombre del cliente, el mensaje, la fecha y el estado "Pendiente".

---

## Bloque 3 — Flujo de alertas de Lumina, construido en vivo (0:55 – 1:20)

### El caso

Lumina tiene un equipo de tres personas. Cuando llega un reclamo, el responsable de atención necesita saberlo de inmediato — no puede esperar a revisar el email. El equipo usa Slack para coordinarse internamente.

Además, todos los reclamos tienen que quedar documentados en Notion para hacer seguimiento y no perder ninguno.

### El flujo extendido

```
[Gmail Trigger]
      ↓
[Set: extraer campos]
      ↓
[Google Sheets: registrar consulta]
      ↓
[IF: ¿es un reclamo?]
   /                    \
[TRUE]                [FALSE]
  ↓                      ↓
[Slack: alerta        [Google Sheets:
 en #reclamos]         buscar pedido]
  ↓                      ↓
[Notion: crear        [Gmail: responder
 tarjeta en base       al cliente]
 "Reclamos"]
```

### Construcción en vivo

**Nodo Slack — Alerta de reclamo**
- Canal: `#reclamos`
- Mensaje:
  ```
  🚨 *Nuevo reclamo recibido*

  *Cliente:* {{ $json.email_cliente }}
  *Fecha:* {{ $json.fecha }}
  *Mensaje:*
  {{ $json.mensaje }}

  Revisar y responder a la brevedad.
  ```

**Nodo Notion — Crear tarjeta de reclamo**
- Base de datos: "Reclamos y seguimiento"
- Propiedades:
  - Título: `Reclamo — {{ $json.email_cliente }}`
  - Cliente: `{{ $json.email_cliente }}`
  - Fecha: `{{ $json.fecha }}`
  - Mensaje: `{{ $json.mensaje }}`
  - Estado: "Pendiente" (valor fijo)
  - Asignado a: vacío (el equipo lo completa manualmente)

**Prueba en vivo:**
El docente envía un email con la palabra "roto" y el grupo observa cómo:
1. El email llega a n8n
2. Se registra en Google Sheets
3. La condición detecta que es un reclamo
4. Llega la alerta en Slack (visible en pantalla)
5. Aparece la tarjeta en Notion (visible en pantalla)

Todo en menos de 10 segundos desde que llegó el email.

---

## Ejercicio práctico (1:20 – 1:45)

### Paso 1 — Elegir el canal de tu equipo (3 min)

¿Dónde trabaja y se comunica tu equipo en tiempo real?

- Si usás Slack → configurar Slack
- Si usás WhatsApp como canal interno → configurar Telegram como alternativa práctica
- Si trabajás solo → configurar Telegram o email como notificación a tu propio teléfono
- Si querés documentar → configurar Notion

---

### Paso 2 — Conectar la credencial en n8n (10 min)

Según el canal elegido, seguir los pasos de conexión del Bloque 2. El docente ayuda a quien tenga problemas con las credenciales.

---

### Paso 3 — Agregar el nodo de notificación al flujo (15 min)

1. Abrir el flujo de la semana anterior
2. En la rama que corresponda (TRUE para reclamos/urgentes o FALSE para casos normales), agregar el nodo de notificación
3. Configurar el mensaje con los datos del flujo
4. Testear: enviar un mensaje de prueba y verificar que llega al canal correcto

---

### Paso 4 — Ajustar el formato del mensaje (5 min)

El primer mensaje que genera el flujo rara vez tiene el formato ideal. Ajustar:
- ¿La información es suficiente para que quien recibe el aviso pueda actuar?
- ¿Hay datos que sobran y hacen el mensaje difícil de leer rápido?
- ¿El tono es el adecuado para el canal (Slack informal vs email formal)?

---

## Cierre (1:45 – 1:55)

Dos participantes muestran su flujo con la notificación activa. El grupo observa los mensajes llegar en tiempo real al canal elegido.

El docente introduce el concepto de la semana siguiente:

> Hasta ahora construimos flujos que funcionan bien cuando todo va bien. La semana que viene aprendemos qué hacer cuando algo sale mal — porque en producción, siempre hay algo que sale mal eventualmente.

---

## Tarea de la semana

1. **Flujo con notificaciones activo** toda la semana procesando eventos reales.
2. **Evaluar la utilidad del canal:** ¿los avisos llegan en el momento correcto? ¿el mensaje tiene toda la información que necesitás para actuar?
3. **Ajustar si es necesario:** formato del mensaje, criterios de la condición, canal de destino.
4. **Bonus — agregar un segundo canal:** para eventos muy urgentes, notificar en dos lugares (Slack + WhatsApp, por ejemplo). Agregar un segundo nodo de notificación en paralelo a la misma rama.

---

## Recursos y herramientas

| Herramienta | Para qué | Cómo acceder |
|---|---|---|
| Slack | Notificaciones de equipo | slack.com — plan gratuito |
| Telegram | Alternativa a WhatsApp para notificaciones | telegram.org — gratuito |
| Notion | Registro y seguimiento de casos | notion.so — plan gratuito |
| Twilio | WhatsApp Business API para pruebas | twilio.com — Sandbox gratuito |

---

*AI Automation — Diplomatura No-Code · Bloque 2: Automatizaciones · Clase 08 de 20*
