# Clase 14 — Generar documentos, reportes y resúmenes automáticos

**Bloque 3: IA en tu negocio · Semana 14 de 20**
**Duración:** 2 horas · **Tipo:** Práctica · **Nivel:** Intermedio-Avanzado

---

## Objetivo de la clase

Que cada participante configure un flujo que toma datos acumulados durante la semana — conversaciones, registros, métricas — y genera automáticamente un resumen ejecutivo, reporte o documento que antes requería trabajo manual. Al terminar, el flujo tiene que producir un documento útil y listo para compartir sin que nadie tenga que redactarlo.

---

## Agenda

| Tiempo | Bloque | Descripción |
|---|---|---|
| 0:00 – 0:10 | Apertura | Revisión del detector de insatisfacción |
| 0:10 – 0:30 | Bloque 1 | De la respuesta individual al documento agregado |
| 0:30 – 1:00 | Bloque 2 | Diseñar el flujo de reporte semanal |
| 1:00 – 1:20 | Bloque 3 | El reporte semanal de Lumina — construido en vivo |
| 1:20 – 1:45 | Ejercicio | Cada participante diseña su reporte automático |
| 1:45 – 1:55 | Cierre | Preview del entregable final |
| 1:55 – 2:00 | Tarea | Preparación para el Entregable 3 |

---

## Apertura (0:00 – 0:10)

### Revisión de la semana anterior

¿El detector de insatisfacción encontró casos reales? ¿Hubo situaciones en que llegó la alerta y el equipo pudo actuar antes de que el cliente escalara?

El docente invita a compartir un caso concreto donde el sistema funcionó — o uno donde no funcionó como se esperaba.

### Una nueva dimensión: el documento agregado

Hasta ahora, la IA respondió a cada mensaje de forma individual. Hoy el flujo hace algo distinto: toma todos los eventos de la semana, los analiza en conjunto y produce un resumen.

Esto es lo que hacen los gerentes cuando preparan el informe semanal de atención al cliente. La diferencia es que lo hacen a mano, llevándoles una o dos horas. El flujo lo hace en segundos.

---

## Bloque 1 — De la respuesta individual al documento agregado (0:10 – 0:30)

### Los dos modos de uso de la IA en automatización

**Modo reactivo** — un evento entra, la IA procesa ese evento y genera una respuesta. Es lo que hicimos en las clases 11, 12 y 13.

**Modo agregado** — el flujo se ejecuta según un horario (cada semana, cada día, cada mes), recolecta múltiples eventos acumulados, y genera un documento de síntesis.

Ambos modos se construyen en n8n. La diferencia es que el modo agregado usa un trigger de horario (Schedule Trigger) en lugar de un trigger de evento (Gmail Trigger, Webhook).

### Qué tipos de documentos se pueden generar

| Tipo de documento | Quién lo usa | Frecuencia típica |
|---|---|---|
| Reporte de atención al cliente | Gerente / dueño | Semanal |
| Resumen de reclamos | Equipo de operaciones | Diario |
| Informe de ventas | Equipo comercial | Semanal / mensual |
| Notas de reunión | Equipo completo | Por reunión |
| Newsletter interno | Toda la empresa | Mensual |
| Resumen de tickets de soporte | Soporte técnico | Diario |

El proceso para construir el flujo es el mismo en todos los casos — cambian los datos de entrada y el formato de salida.

### El problema de pasarle demasiados datos a la IA

Los modelos de IA tienen un límite de texto que pueden procesar en una sola llamada (el "context window"). Para un reporte semanal con muchos registros, no siempre es posible pasar todo de una vez.

**Estrategias para manejar volúmenes grandes:**

1. **Resumir primero, agregar después:** procesar cada registro individualmente para extraer lo esencial, y luego pasar todos los resúmenes juntos a un segundo nodo IA para la síntesis final.

2. **Filtrar antes de procesar:** solo pasar a la IA los registros que cumplen ciertos criterios (solo reclamos, solo urgentes, solo los últimos 50).

3. **Agregar métricas estructuradas:** en lugar de pasar el texto completo de cada mensaje, pasar un resumen numérico (cuántos reclamos, cuántos resueltos, tiempo promedio de respuesta) y pedir a la IA que lo interprete.

4. **Limitar el período:** en lugar de una semana completa, generar el reporte de las últimas 24 horas con mayor frecuencia.

---

## Bloque 2 — Diseñar el flujo de reporte semanal (0:30 – 1:00)

### La estructura del flujo de reporte

```
[Schedule Trigger: todos los lunes a las 9:00]
          ↓
[Google Sheets: obtener todas las filas
 de la semana anterior]
          ↓
[Set: calcular métricas
 (total, reclamos, resueltos, etc.)]
          ↓
[OpenAI: generar el resumen ejecutivo]
          ↓
[Gmail / Slack: enviar el reporte]
```

### El Schedule Trigger en n8n

1. Agregar un nuevo nodo al flujo
2. Buscar "Schedule Trigger"
3. Configurar:
   - **Trigger at:** Every Week
   - **Day of week:** Monday
   - **Hour:** 9
   - **Minute:** 0

El flujo se ejecutará automáticamente todos los lunes a las 9:00 sin que nadie lo active.

### Obtener los datos del período

Para obtener solo las filas de la semana anterior desde Google Sheets:

**Opción A — Filtrar por fecha en el nodo Sheets:**
- Operación: "Get Rows"
- Filter: columna "Fecha" → "is after" → `{{ $now.minus({weeks: 1}).startOf('week').format('YYYY-MM-DD') }}`

**Opción B — Obtener todas las filas y filtrar en un nodo Code:**
```javascript
const unaSemanaAtras = new Date();
unaSemanaAtras.setDate(unaSemanaAtras.getDate() - 7);

return $input.all().filter(item => {
  const fecha = new Date(item.json['Fecha']);
  return fecha >= unaSemanaAtras;
});
```

### Calcular las métricas en el nodo Set

Antes de pasarle los datos a la IA, conviene calcular las métricas básicas en el flujo:

```javascript
// En el nodo Code, después de filtrar:
const items = $input.all();
const total = items.length;
const reclamos = items.filter(i => i.json['Tipo'] === 'RECLAMO').length;
const consultas = items.filter(i => i.json['Tipo'] === 'CONSULTA').length;
const urgentes = items.filter(i => i.json['Atención Humana'] === 'TRUE').length;
const resueltos = items.filter(i => i.json['Estado'] === 'Resuelto').length;

return [{
  json: {
    total,
    reclamos,
    consultas,
    urgentes,
    resueltos,
    tasa_resolucion: Math.round((resueltos / total) * 100) + '%',
    // Pasar los últimos 10 casos urgentes como contexto
    casos_urgentes: items
      .filter(i => i.json['Atención Humana'] === 'TRUE')
      .slice(-10)
      .map(i => `[${i.json['Tipo']}] ${i.json['Resumen IA'] || i.json['Asunto']}`)
      .join('\n')
  }
}];
```

### El prompt de síntesis

Con las métricas calculadas, el prompt de la IA es conciso y efectivo:

```
[System Prompt]
Sos el asistente de reporting de Lumina, una tienda de indumentaria online.
Generás reportes ejecutivos semanales de atención al cliente para el equipo de gestión.

El reporte tiene que ser:
- Concreto: datos antes que interpretaciones
- Accionable: termina con 2-3 recomendaciones específicas
- Breve: máximo 300 palabras
- En formato de texto plano (sin markdown, sin asteriscos)

[User Message]
Datos de la semana del {{ $now.minus({weeks: 1}).startOf('week').format('DD/MM') }}
al {{ $now.minus({weeks: 1}).endOf('week').format('DD/MM/YYYY') }}:

Total de consultas recibidas: {{ $json.total }}
Reclamos: {{ $json.reclamos }} ({{ $json.reclamos_pct }}%)
Consultas de pedidos: {{ $json.consultas }}
Casos que requirieron atención humana: {{ $json.urgentes }}
Casos resueltos: {{ $json.resueltos }} (tasa de resolución: {{ $json.tasa_resolucion }})

Casos urgentes de la semana:
{{ $json.casos_urgentes }}

Generá el reporte ejecutivo semanal.
```

---

## Bloque 3 — El reporte semanal de Lumina, construido en vivo (1:00 – 1:20)

### El flujo completo

El docente construye en vivo el flujo de reporte y lo ejecuta manualmente para mostrar el resultado.

**Ejemplo de reporte generado:**

---

**Reporte de Atención al Cliente — Semana del 5 al 11 de mayo de 2025**

Esta semana se registraron 47 consultas. El 34% correspondieron a reclamos (16 casos), por encima del promedio de las últimas cuatro semanas (28%). De esos reclamos, 9 requirieron atención humana prioritaria, principalmente por demoras en envíos superiores a los 7 días prometidos.

La tasa de resolución automática fue del 68% (32 casos resueltos por el sistema sin intervención del equipo). Los 15 casos restantes fueron gestionados manualmente.

Los 3 casos urgentes más representativos de la semana involucraron clientes con pedidos pendientes de más de 10 días que ya habían escrito más de una vez sin recibir respuesta personalizada.

**Recomendaciones para la semana que viene:**
1. Revisar el estado de los pedidos con más de 7 días en tránsito y enviar una actualización proactiva antes de que el cliente escriba.
2. Revisar la configuración del flujo de búsqueda de pedidos: el 12% de las búsquedas no encontraron el registro, sugiriendo inconsistencias en los emails de registro.
3. Considerar agregar un mensaje automático de confirmación al recibir reclamos para reducir el re-contacto.

---

### Distribución del reporte

**Por email:**
- Nodo Gmail: Send Email
- Para: `gerencia@lumina.com`
- Asunto: `Reporte semanal de atención — {{ $now.minus({weeks: 1}).startOf('week').format('DD/MM') }} al {{ $now.minus({weeks: 1}).endOf('week').format('DD/MM') }}`
- Cuerpo: `{{ $json.message.content }}`

**Por Slack:**
- Nodo Slack: Send Message
- Canal: `#reportes-semanales`
- Mensaje: el texto del reporte

**Guardado en Google Docs:**
Para registros históricos, el docente muestra cómo conectar el nodo Google Docs para crear un documento con el reporte y guardarlo en una carpeta específica de Drive.

---

## Ejercicio práctico (1:20 – 1:45)

> Cada participante diseña y configura su flujo de reporte o resumen automático.

### Paso 1 — Elegir el tipo de documento (5 min)

¿Qué documento produce el negocio regularmente que consume tiempo y sigue siempre la misma estructura?

Opciones:
- Reporte de atención al cliente (semanal)
- Resumen diario de consultas (diario)
- Informe de ventas (semanal o mensual)
- Resumen de conversaciones de soporte
- Otro que identifique el participante

---

### Paso 2 — Definir los datos de entrada (5 min)

¿Dónde están esos datos?
- Google Sheets: qué hoja, qué columnas
- Airtable: qué base y tabla
- Notion: qué base de datos

¿Cuál es el período del reporte?
- Diario: las filas de las últimas 24 horas
- Semanal: las filas de los últimos 7 días
- Mensual: las filas del mes anterior

---

### Paso 3 — Construir el flujo (20 min)

1. Agregar el Schedule Trigger con la frecuencia elegida
2. Agregar el nodo de datos (Google Sheets, Airtable, Notion)
3. Agregar el nodo Code o Set para calcular métricas y preparar el contexto
4. Agregar el nodo OpenAI con el system prompt y user message
5. Agregar el nodo de distribución (Gmail, Slack, Google Docs)
6. Ejecutar manualmente para ver el resultado

---

## Cierre (1:45 – 1:55)

Dos o tres participantes comparten el documento generado por su flujo. El grupo evalúa: ¿es útil? ¿lo usarías en tu negocio? ¿qué le agregarías?

El docente anuncia el Entregable 3 de la semana siguiente:

> La semana que viene presentamos el sistema completo de atención con IA: el flujo que clasifica, responde, detecta insatisfacción y genera el reporte. No son flujos separados — son piezas de un mismo sistema que funciona solo, todo el tiempo, sin que nadie tenga que operar nada.

---

## Tarea de la semana — Preparación para el Entregable 3

El Bloque 3 termina la semana que viene con el entregable del sistema completo. Esta semana es de integración:

**1. Integrar los cuatro flujos en un sistema coherente**

Los flujos de las semanas 11, 12 y 13 pueden ser el mismo flujo con más nodos, o flujos separados que comparten la misma planilla de datos. El objetivo es que funcionen como un sistema:
- Flujo de entrada: captura + clasificación + análisis de sentimiento + respuesta o alerta
- Flujo de reporte: genera el resumen semanal automáticamente

**2. Verificar que todo funciona con datos reales**

El entregable se presenta con datos de la semana real, no de prueba. El sistema tiene que haber procesado eventos reales durante la semana.

**3. Preparar la demo en 7 minutos**

Formato sugerido:
- 1 min: presentación del negocio y el proceso que automatizaste
- 3 min: demo en vivo del flujo de entrada (mandar un email y mostrar todo lo que pasa)
- 1 min: mostrar el reporte generado automáticamente
- 2 min: impacto en números (mensajes procesados, tiempo ahorrado, casos detectados)

**4. Calcular el impacto acumulado del Bloque 3**

Comparar:
- ¿Cuántos mensajes clasificó la IA correctamente esta semana?
- ¿Cuántos casos urgentes detectó antes de que escalaran?
- ¿Cuánto tiempo hubiera llevado hacer todo esto a mano?

---

## Recursos y herramientas

| Herramienta | Para qué | Cómo acceder |
|---|---|---|
| n8n Cloud | Schedule Trigger y flujo de reporte | cloud.n8n.io |
| OpenAI API | Generación de texto del reporte | platform.openai.com |
| Google Docs API | Crear documentos automáticamente | Drive → n8n Google Docs node |
| Slack | Distribución del reporte al equipo | slack.com |

---

*AI Automation — Diplomatura No-Code · Bloque 3: IA en tu negocio · Clase 14 de 20*
