# Clase 18 — ¿Cuánto vale lo que construiste? Medir el ROI real

**Bloque 4: Agente completo · Semana 18 de 20**
**Duración:** 2 horas · **Tipo:** Práctica · **Nivel:** Avanzado

---

## Objetivo de la clase

Que cada participante calcule el impacto real del sistema de automatización + IA que construyó en el programa, construya un dashboard de métricas en Google Sheets y genere una narrativa del ROI que pueda presentar a cualquier interlocutor — cliente, jefe, socio o inversor. Al terminar, cada uno tiene un número concreto y defendible de lo que vale su sistema.

---

## Agenda

| Tiempo | Bloque | Descripción |
|---|---|---|
| 0:00 – 0:10 | Apertura | Por qué el ROI importa más allá del Demo Day |
| 0:10 – 0:40 | Bloque 1 | Marco conceptual: cómo se mide el valor de la automatización |
| 0:40 – 1:05 | Bloque 2 | El dashboard de impacto de Lumina — construido en vivo |
| 1:05 – 1:45 | Ejercicio | Cada participante construye su dashboard |
| 1:45 – 1:55 | Cierre | Qué hacer con los números |
| 1:55 – 2:00 | Tarea | Preparación para el taller final |

---

## Apertura (0:00 – 0:10)

### Por qué los números importan

Construir el sistema fue el trabajo técnico. Pero la automatización solo tiene valor cuando alguien puede ver y entender ese valor. Un flujo que ahorra dos horas por semana es invisible si nadie lo sabe. Un dashboard que muestra 96 horas ahorradas en el año — con el costo evitado en pesos y el porcentaje de consultas resueltas sin intervención — es una decisión de negocio.

Hay cuatro razones concretas por las que calcular el ROI importa:

1. **Para seguir invirtiendo:** si no sabés cuánto vale el sistema, no podés decidir si vale la pena seguir mejorándolo.
2. **Para venderlo:** si sos consultor o querés automatizar el negocio de otro, necesitás mostrar el valor en números.
3. **Para mejorar el sistema:** las métricas muestran dónde el sistema falla y dónde conviene invertir más.
4. **Para el Demo Day:** la presentación con números reales es cualitativamente más convincente que la que solo muestra el flujo funcionando.

---

## Bloque 1 — Marco conceptual: cómo se mide el valor de la automatización (0:10 – 0:40)

### Los tres tipos de valor que genera la automatización

**Tipo 1 — Valor de tiempo ahorrado**
El más fácil de calcular. ¿Cuántas horas de trabajo manual reemplaza el sistema?

```
Valor de tiempo = Tiempo por tarea × Frecuencia × Costo hora de trabajo
```

Ejemplo de Lumina:
- Tiempo de responder un email manualmente: 4 minutos
- Frecuencia: 60 emails por semana
- Porcentaje que el agente responde automáticamente: 75% = 45 emails
- Tiempo ahorrado por semana: 45 × 4 min = 180 minutos = 3 horas
- Costo hora del operador: $2.500/hora
- **Valor semanal: 3 horas × $2.500 = $7.500/semana → $390.000/año**

**Tipo 2 — Valor de velocidad de respuesta**
El más difícil de cuantificar, pero potencialmente el mayor. ¿Cuánto vale responder en 30 segundos en lugar de 4 horas?

Indicadores proxy:
- Tasa de abandono antes vs. después (clientes que no esperan respuesta y compran en otro lado)
- NPS (Net Promoter Score) antes vs. después
- Tasa de resolución en primer contacto antes vs. después

Si el negocio tiene estos datos, el cálculo es potente:

```
Valor de velocidad = Clientes retenidos × Ticket promedio de compra
```

Ejemplo: si antes el 8% de los clientes que escribían no compraban por demora en respuesta, y ahora ese número bajó al 2%, con 200 consultas mensuales y ticket promedio de $15.000:

```
Clientes recuperados = (8% - 2%) × 200 = 12 clientes/mes
Valor mensual = 12 × $15.000 = $180.000/mes → $2.160.000/año
```

**Tipo 3 — Valor de escala sin costo adicional**
El sistema puede manejar el doble de consultas sin contratar a nadie más. ¿Cuánto costaría contratar esa capacidad adicional?

```
Valor de escala = Costo de contratar capacidad equivalente
```

Ejemplo: si el sistema maneja 200 consultas/mes automáticamente y contratar a alguien para hacerlo costaría $120.000/mes, ese es el valor de escala mensual.

### El costo del sistema

Para calcular el ROI real, hay que contabilizar los costos del sistema:

| Costo | Estimación para un sistema típico del programa |
|---|---|
| n8n Cloud (plan de pago) | $20-$50 USD/mes |
| API de OpenAI | $5-$30 USD/mes según volumen |
| Airtable (si se usa) | $10-$20 USD/mes |
| Tiempo de mantenimiento | 1-2 horas/mes |
| **Total típico** | **$35-$100 USD/mes** |

Para la mayoría de los negocios del programa, el costo mensual del sistema es menor que el valor de una sola hora de trabajo del operador que reemplaza.

### La fórmula del ROI

```
ROI = (Valor generado - Costo del sistema) / Costo del sistema × 100
```

Si el sistema genera $390.000/año en tiempo ahorrado y cuesta $60 USD/mes (~$60.000/año al tipo de cambio):

```
ROI = ($390.000 - $60.000) / $60.000 × 100 = 550%
```

O dicho de otra forma: por cada peso invertido en el sistema, el negocio recupera $5,50.

### Las cuatro métricas que todo dashboard debe tener

| Métrica | Cómo medirla | Por qué importa |
|---|---|---|
| **Volumen procesado** | Filas en la planilla de log | Muestra la escala del sistema |
| **Tasa de resolución automática** | % de casos resueltos sin intervención humana | Muestra la autonomía del agente |
| **Tiempo promedio de respuesta** | Diferencia entre timestamp del email y timestamp de la respuesta | Muestra el impacto en la experiencia del cliente |
| **Casos derivados al equipo** | Filas con estado "Escalado" | Muestra el límite del sistema y la calidad del filtro |

Métricas adicionales si están disponibles:
- Sentimiento promedio de los mensajes (del análisis de la clase 13)
- Casos urgentes detectados vs. semana anterior
- Tasa de clasificación correcta (si se tiene feedback del equipo)

---

## Bloque 2 — El dashboard de impacto de Lumina, construido en vivo (0:40 – 1:05)

### La estructura del dashboard

El docente construye el dashboard en Google Sheets en pantalla. El dashboard tiene tres hojas:

**Hoja 1 — Datos (automatizada)**
Los registros que el flujo va llenando automáticamente: fecha, email, tipo, sentimiento, urgencia, estado, timestamp de respuesta.

Esta hoja ya existe — es el log que construimos desde el Bloque 2.

**Hoja 2 — Métricas (con fórmulas)**
Celdas con fórmulas que calculan las métricas en tiempo real, sin intervención manual.

**Hoja 3 — Narrativa (con IA)**
Un resumen ejecutivo generado automáticamente cada semana, usando el flujo de reporte del Bloque 3.

### Las fórmulas del dashboard (Hoja 2)

El docente escribe estas fórmulas en vivo y explica cada una:

**Total de mensajes procesados:**
```
=COUNTA(Datos!A:A)-1
```

**Total esta semana:**
```
=COUNTIFS(Datos!A:A,">"&HOY()-7)
```

**Consultas por tipo:**
```
=COUNTIF(Datos!C:C,"CONSULTA")
=COUNTIF(Datos!C:C,"RECLAMO")
=COUNTIF(Datos!C:C,"OTRO")
```

**Tasa de resolución automática:**
```
=COUNTIF(Datos!F:F,"Resuelto_Auto")/COUNTA(Datos!A:A)-1
```
*(Formateada como porcentaje)*

**Casos urgentes:**
```
=COUNTIF(Datos!E:E,"critica")+COUNTIF(Datos!E:E,"alta")
```

**Tiempo promedio de respuesta (en minutos):**
```
=PROMEDIO(SI(Datos!G:G<>"",Datos!G:G-Datos!A:A))*24*60
```
*(Fórmula de array — confirmar con Ctrl+Shift+Enter)*

**Tiempo ahorrado esta semana (en horas):**
```
=(COUNTIF(Datos!F:F,"Resuelto_Auto")*4)/60
```
*(Asume 4 minutos por respuesta manual)*

**Valor económico del tiempo ahorrado (esta semana):**
```
=((COUNTIF(Datos!F:F,"Resuelto_Auto")*4)/60)*C5
```
*(C5 = costo hora del operador, configurable)*

### El gráfico de evolución semanal

El docente agrega un gráfico de barras que muestra el volumen semanal de mensajes procesados a lo largo del programa. Esto permite ver si el sistema escaló con el tiempo.

Pasos:
1. Crear una tabla auxiliar con semana y cantidad
2. Seleccionar los datos
3. Insertar → Gráfico → Tipo: Barras apiladas
4. Personalizar colores: azul para consultas, rojo para reclamos, gris para otros

### Automatizar la actualización del dashboard

El docente agrega un nodo al flujo de reporte del Bloque 3 que actualiza las celdas de resumen del dashboard cada semana:

- Nodo: Google Sheets (operación: Update Cell)
- Celda destino: la celda de "Última actualización"
- Valor: `{{ $now.format('DD/MM/YYYY HH:mm') }}`

---

## Ejercicio práctico (1:05 – 1:45)

> Cada participante construye su dashboard con los datos reales del negocio propio.

### Paso 1 — Auditar la planilla de log (10 min)

Abrir la planilla de Google Sheets que el flujo viene llenando desde el Bloque 2. Verificar:

- ¿Tiene una columna de timestamp de entrada?
- ¿Tiene una columna de tipo (CONSULTA / RECLAMO / OTRO)?
- ¿Tiene una columna de estado (Resuelto_Auto / Escalado / Pendiente)?
- ¿Tiene una columna de timestamp de respuesta?

Si faltan columnas, agregarlas ahora y ajustar el flujo en n8n para llenarlas.

---

### Paso 2 — Crear la hoja de métricas (15 min)

En la misma planilla, agregar una hoja nueva llamada "Dashboard".

Crear una tabla con estas filas, usando las fórmulas mostradas en clase:

| Métrica | Esta semana | Total acumulado |
|---|---|---|
| Mensajes procesados | [fórmula] | [fórmula] |
| Resueltos automáticamente | [fórmula] | [fórmula] |
| Tasa de resolución automática | [fórmula] | [fórmula] |
| Reclamos detectados | [fórmula] | [fórmula] |
| Casos urgentes | [fórmula] | [fórmula] |
| Tiempo ahorrado (horas) | [fórmula] | [fórmula] |
| Valor económico ahorrado | [fórmula] | [fórmula] |

---

### Paso 3 — Calcular el ROI del sistema completo (10 min)

En una sección separada del dashboard, completar:

```
CÁLCULO DE ROI

Tiempo ahorrado por semana:         ___ horas
Costo hora de trabajo en mi negocio: $___
Valor semanal del tiempo ahorrado:   $___
Valor anual proyectado:              $___

Costo mensual del sistema:           $___
Costo anual del sistema:             $___

ROI anual:                           ____%
```

---

### Paso 4 — Conectar la narrativa automática (10 min)

Ajustar el flujo de reporte del Bloque 3 para que incluya en el resumen semanal los números del dashboard:

En el user message del nodo OpenAI de reporte, agregar los campos del dashboard:

```
Datos de la semana:
- Mensajes procesados: {{ $json.total }}
- Resueltos automáticamente: {{ $json.resueltos_auto }} ({{ $json.tasa_auto }}%)
- Reclamos detectados: {{ $json.reclamos }}
- Casos urgentes: {{ $json.urgentes }}
- Tiempo ahorrado: {{ $json.horas_ahorradas }} horas
- Valor económico: ${{ $json.valor_economico }}

Generá un párrafo ejecutivo de 4-5 oraciones que resuma la semana,
destaque el impacto principal y mencione si hay alguna tendencia a observar.
```

---

## Cierre (1:45 – 1:55)

Dos participantes muestran su dashboard en pantalla y comparten su número de ROI.

El docente señala algo importante:

> Un número de ROI no es definitivo — es la mejor estimación con los datos disponibles. Lo que importa no es que sea exacto al último centavo, sino que sea honesto en sus supuestos y defendible en una conversación. Si alguien pregunta "¿cómo calculaste eso?", tenés que poder explicarlo paso a paso. Eso es lo que convierte un número en un argumento.

### Qué hacer con el dashboard después del programa

El dashboard no es solo para el Demo Day — es una herramienta de gestión continua:
- Revisarlo cada lunes junto con el reporte automático
- Ajustar el sistema cuando la tasa de resolución automática baje
- Usar los números para justificar inversión en mejoras (nuevas herramientas, mejor modelo)
- Compartirlo con el equipo para que todos vean el impacto del sistema

---

## Tarea de la semana — Preparación para el taller final

La semana que viene es el taller de pulido y preparación de la demo. Para llegar con el sistema listo:

**1. Completar el dashboard con al menos 3 semanas de datos reales**
Si el sistema lleva menos tiempo activo, completar con estimaciones basadas en el volumen actual.

**2. Preparar los supuestos del cálculo de ROI**
Documentar en VS Code exactamente cómo se calculó cada número:
- ¿De dónde viene el "tiempo por tarea manual"? (cronometrado, estimado, estándar del sector)
- ¿Cuál es el costo hora de trabajo? (sueldo mensual / horas mensuales)
- ¿Qué porcentaje de resolución automática se midió realmente?

**3. Verificar que el sistema completo funciona de punta a punta**
Probar el camino completo: enviar un email → captura → clasificación IA → respuesta agente → registro → reporte semanal. Todo tiene que funcionar sin intervención manual.

**4. Documentar los tres momentos donde el sistema falló**
Para el Demo Day, mostrar que el sistema fue probado es más convincente que mostrar que es perfecto. Documentar: qué falló, qué se hizo y si se resolvió.

---

## Recursos y herramientas

| Herramienta | Para qué | Cómo acceder |
|---|---|---|
| Google Sheets | Dashboard con fórmulas de métricas | sheets.google.com |
| VS Code | Documentar supuestos del ROI | code.visualstudio.com |
| n8n Cloud | Flujo de reporte con métricas del dashboard | cloud.n8n.io |

### Plantilla de supuestos del ROI para documentar en VS Code

Crear el archivo `metricas/supuestos-roi.md`:

```markdown
# Supuestos del cálculo de ROI

## Tiempo por tarea manual
- Tiempo para responder un email de consulta: X minutos
- Fuente: cronometrado durante la semana del [fecha]

## Frecuencia
- Mensajes por semana promedio (últimas 4 semanas): X
- Fuente: historial de ejecuciones de n8n

## Tasa de resolución automática
- Porcentaje de mensajes resueltos sin intervención: X%
- Fuente: columna "Estado" del log de Sheets — calculado el [fecha]

## Costo hora de trabajo
- Sueldo mensual del operador (o valor hora propio): $X
- Horas de trabajo mensual: X
- Costo por hora: $X
- Fuente: [descripción]

## Costo del sistema
- n8n: $X USD/mes
- OpenAI API: $X USD/mes
- Tipo de cambio usado: $X/USD al [fecha]
- Total mensual en pesos: $X
```

Documentar los supuestos ahora evita preguntas difíciles en el Demo Day.

---

*AI Automation — Diplomatura No-Code · Bloque 4: Agente completo · Clase 18 de 20*
