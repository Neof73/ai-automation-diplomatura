# Clase 06 — n8n: el tablero de control de tu negocio

**Bloque 2: Automatizaciones · Semana 6 de 20**
**Duración:** 2 horas · **Tipo:** Práctica · **Nivel:** Intermedio

---

## Objetivo de la clase

Que cada participante construya su primer flujo en n8n conectando Gmail con Google Sheets — capturando automáticamente las consultas entrantes de clientes sin intervención manual. Al terminar, el flujo tiene que estar activo y procesando emails reales.

---

## Agenda

| Tiempo | Bloque | Descripción |
|---|---|---|
| 0:00 – 0:10 | Apertura | Bienvenida al Bloque 2 y diferencias con Zapier |
| 0:10 – 0:35 | Bloque 1 | n8n: qué es, cómo funciona y por qué lo usamos |
| 0:35 – 1:00 | Bloque 2 | Recorrido por la interfaz de n8n |
| 1:00 – 1:20 | Bloque 3 | El flujo de captura de Lumina — construido en vivo |
| 1:20 – 1:45 | Ejercicio | Cada participante construye su propio flujo de captura |
| 1:45 – 1:55 | Cierre | Pruebas en vivo y resolución de problemas |
| 1:55 – 2:00 | Tarea | Explicación de la tarea de la semana |

---

## Apertura (0:00 – 0:10)

### Bienvenida al Bloque 2

En el Bloque 1 aprendimos la lógica. Identificamos qué automatizar, cómo hablarle a la IA y cómo organizar los datos. Construimos el primer flujo con Zapier.

El Bloque 2 es donde esa lógica se convierte en un sistema real. Vamos a construir flujos más complejos, con múltiples pasos, condiciones y conexiones a las herramientas que tu negocio ya usa.

La herramienta central del bloque es **n8n**. Es más poderosa que Zapier, permite flujos de muchos pasos, es gratuita y, a partir de la semana 11, va a ser el motor del agente con IA.

### Zapier vs n8n: cuándo usar cada uno

No es que uno sea mejor que el otro — son herramientas para contextos distintos:

| | Zapier | n8n |
|---|---|---|
| **Mejor para** | Flujos simples de 1–2 pasos | Flujos complejos de múltiples pasos |
| **Curva de aprendizaje** | Muy baja | Media |
| **Lógica condicional** | Limitada en el plan gratuito | Completa y visual |
| **Integración con IA** | Básica | Nodos nativos de IA (semana 11) |
| **Plan gratuito** | 100 ejecuciones/mes, 5 Zaps | Ilimitado en self-hosted, generoso en cloud |
| **Ejecución** | En la nube, siempre activo | Cloud o instalación propia |

Para el programa usamos n8n porque vamos a necesitar toda su potencia en el Bloque 3. Pero los Zaps del Bloque 1 siguen siendo válidos para flujos simples.

---

## Bloque 1 — n8n: qué es y cómo funciona (0:10 – 0:35)

### La metáfora del tablero de control

Si Zapier es como un interruptor de luz — lo encendés y hace una cosa — n8n es como el tablero de control de un negocio. Podés ver todos los flujos en un lugar, entender qué hace cada uno, ajustar la lógica, conectar decenas de herramientas y construir procesos que toman decisiones.

### Los conceptos clave de n8n

**Workflow (flujo):** el equivalente al "Zap" de Zapier. Es el conjunto de nodos conectados que definen qué pasa cuando se activa el flujo.

**Nodo:** cada bloque dentro del flujo. Un nodo puede ser un trigger, una acción, una condición, una transformación de datos o una conexión a una herramienta.

**Conexión:** la flecha entre nodos. Indica que los datos pasan de un nodo al siguiente.

**Ejecución:** cada vez que el flujo corre. n8n guarda el historial de ejecuciones y muestra qué pasó en cada una, incluyendo los datos que se procesaron en cada nodo.

### Tipos de nodos más usados

| Tipo | Para qué sirve | Ejemplos |
|---|---|---|
| **Trigger** | Iniciar el flujo | Email llegó, hora programada, webhook |
| **App** | Conectar una herramienta | Gmail, Google Sheets, Slack, Airtable |
| **IF** | Tomar una decisión | Si el campo Estado = "Reclamo" → hacer X |
| **Set** | Crear o modificar variables | Formatear una fecha, combinar dos campos |
| **HTTP Request** | Llamar a cualquier API | Consultar el estado de un envío externo |
| **AI** | Conectar modelos de IA | ChatGPT, Gemini (se usa desde la semana 11) |
| **Code** | Escribir lógica personalizada | Solo si los nodos estándar no alcanzan |

Para el 90% de los flujos de negocio, se usan los primeros cuatro. El nodo AI entra en el Bloque 3.

### Cómo fluyen los datos en n8n

Esta es la diferencia más importante respecto a Zapier: en n8n, cada nodo recibe los datos del nodo anterior y puede transformarlos antes de pasarlos al siguiente.

```
[Gmail: email entrante]
  → {de, asunto, cuerpo, fecha}
      ↓
[Set: extraer campos]
  → {email_cliente, texto_mensaje, fecha_hora}
      ↓
[Google Sheets: agregar fila]
  → guarda los tres campos en la planilla
```

Los datos viajan como un paquete que cada nodo puede leer, modificar y pasar al siguiente. Esto es lo que permite construir flujos sofisticados sin programar.

---

## Bloque 2 — Recorrido por la interfaz de n8n (0:35 – 1:00)

El docente abre n8n Cloud en pantalla y recorre cada sección con el grupo.

### Panel principal

- **Workflows:** lista de todos los flujos creados. Muestra nombre, estado (activo/inactivo) y última ejecución.
- **Executions:** historial de todas las ejecuciones, con estado (éxito/error) y datos procesados.
- **Credentials:** las conexiones a cuentas externas (Gmail, Sheets, Slack, etc.). Se configuran una vez y se reusan en todos los flujos.

### El editor de flujos

Al crear o abrir un workflow, se abre el editor. El docente muestra:

1. **El lienzo:** el espacio en blanco donde se construye el flujo arrastrando nodos
2. **Agregar un nodo:** hacer clic en el botón "+" o arrastrar desde el panel lateral
3. **Buscar nodos:** escribir el nombre de la herramienta en el buscador
4. **Conectar nodos:** arrastrar desde el punto de salida de un nodo al punto de entrada del siguiente
5. **Configurar un nodo:** hacer clic en él para abrir el panel de configuración
6. **El panel de datos:** cuando se ejecuta un nodo en modo test, muestra exactamente qué datos recibió y qué datos produjo
7. **Ejecución manual:** el botón "Test workflow" para probar el flujo sin activarlo

### Conectar una cuenta (Credentials)

El docente muestra cómo conectar Gmail:
1. En la configuración de un nodo de Gmail, clic en "Credential"
2. "Create new credential"
3. Autorizar con la cuenta de Google
4. La credencial queda guardada y disponible para todos los flujos

**Importante:** las credenciales se guardan una sola vez. Si en 5 flujos distintos usás Gmail, todos usan la misma credencial — no hace falta reconectar.

---

## Bloque 3 — El flujo de captura de Lumina, construido en vivo (1:00 – 1:20)

### El problema

Lumina recibe entre 40 y 80 emails por día de clientes. Hoy, alguien del equipo los lee, decide si es una consulta de pedido, y la registra manualmente en la planilla de seguimiento. Eso lleva 100 minutos por semana (proceso 2 del mapa de Lumina).

### El flujo a construir

```
[Gmail Trigger: llega email nuevo con etiqueta "clientes"]
              ↓
[Set: extraer email del remitente, asunto y cuerpo]
              ↓
[Google Sheets: agregar fila en hoja "Consultas"]
```

### Construcción paso a paso en pantalla

**Nodo 1 — Gmail Trigger**
- Tipo: Trigger
- App: Gmail
- Evento: "Email Received" (email recibido)
- Configuración:
  - Credencial: cuenta de Gmail de Lumina
  - Filtro: solo emails con la etiqueta "clientes" (o sin filtro para capturar todos)
  - Campos a extraer: `from`, `subject`, `text`, `date`
- Test: el docente envía un email de prueba y muestra cómo n8n lo captura en tiempo real, mostrando todos los campos disponibles

**Nodo 2 — Set**
- Tipo: Set (transformación de datos)
- Objetivo: limpiar y renombrar los campos para que coincidan con las columnas de la planilla
- Configuración:
  ```
  email_cliente  ← {{ $json.from }}
  asunto         ← {{ $json.subject }}
  mensaje        ← {{ $json.text }}
  fecha          ← {{ $now.format('YYYY-MM-DD HH:mm') }}
  canal          ← "Email"
  estado         ← "Abierta"
  ```
- El docente explica la sintaxis `{{ $json.campo }}`: es la forma en que n8n accede a los datos del nodo anterior. No es código — es una referencia.

**Nodo 3 — Google Sheets**
- Tipo: Action
- App: Google Sheets
- Evento: "Append Row" (agregar fila)
- Configuración:
  - Credencial: cuenta de Google
  - Spreadsheet: planilla de Lumina
  - Sheet: hoja "Consultas"
  - Mapeo de columnas:
    - Columna "Email Cliente" ← `{{ $json.email_cliente }}`
    - Columna "Asunto" ← `{{ $json.asunto }}`
    - Columna "Mensaje" ← `{{ $json.mensaje }}`
    - Columna "Fecha" ← `{{ $json.fecha }}`
    - Columna "Canal" ← `{{ $json.canal }}`
    - Columna "Estado" ← `{{ $json.estado }}`

**Activar el flujo**
- Clic en el toggle "Active" en la esquina superior derecha
- El flujo queda escuchando emails en tiempo real

**Resultado:** desde este momento, cada email que llega a la cuenta de Lumina se registra automáticamente en la planilla, con fecha, remitente y contenido. Nadie tiene que hacer nada.

---

## Ejercicio práctico (1:20 – 1:45)

> Cada participante construye su propio flujo de captura. El docente circula y ayuda.

### El flujo a construir

Adaptá el flujo de Lumina a tu negocio. Elegí la combinación que mejor se ajusta:

**Opción A — Email → Google Sheets**
Capturar emails entrantes de clientes y registrarlos en tu tabla de consultas.

**Opción B — Google Forms → Google Sheets**
Capturar respuestas de un formulario de contacto y registrarlas en la tabla.

**Opción C — Webhook → Google Sheets**
Si tenés un sistema externo (tienda online, CRM), capturar los eventos que manda y registrarlos. El docente ayuda con la configuración del webhook.

---

### Pasos

1. **Crear un nuevo workflow** en n8n y nombrarlo descriptivamente
2. **Agregar el trigger** correspondiente a tu opción
3. **Conectar la credencial** de la cuenta (Gmail o Google)
4. **Testear el trigger** — verificar que n8n recibe los datos correctamente
5. **Agregar el nodo Set** para mapear los campos a los nombres de tu planilla
6. **Agregar el nodo Google Sheets** con la operación "Append Row"
7. **Mapear las columnas** usando las referencias `{{ $json.campo }}`
8. **Testear el flujo completo** — verificar que la fila aparece en la planilla
9. **Activar el flujo**

---

### Problemas comunes

| Problema | Causa probable | Solución |
|---|---|---|
| El trigger no detecta emails | El flujo no está activo o el filtro es muy restrictivo | Activar el flujo y probar sin filtros |
| Los campos salen vacíos en Sheets | El nombre del campo en `{{ $json.X }}` no coincide | Revisar el panel de datos del nodo trigger para ver los nombres exactos |
| Error de credenciales | La cuenta no está autorizada correctamente | Volver a Credentials y reconectar |
| La fila se agrega pero con datos incorrectos | El mapeo de columnas es incorrecto | Revisar el nodo Set y el nodo Sheets |

---

## Cierre (1:45 – 1:55)

Dos o tres participantes muestran su flujo en pantalla y agregan una fila de prueba en tiempo real.

El docente señala el avance respecto al Bloque 1:

> Con Zapier construimos un trigger y una acción. Con n8n ya construimos trigger + transformación + acción. El flujo de la semana que viene agrega un cuarto nodo: la condición IF. Eso es lo que permite que el sistema tome decisiones distintas según el contenido de cada mensaje.

---

## Tarea de la semana

### Flujo de captura activo y procesando datos reales

1. **Dejá el flujo activo** durante toda la semana y dejá que procese los emails o formularios reales de tu negocio.
2. **Revisá el historial de ejecuciones** en n8n cada día — ¿todos los registros llegaron bien? ¿hay alguno con error?
3. **Revisá la planilla** — ¿los datos se ven limpios? ¿hay columnas vacías que deberían tener datos?
4. **Anotá el volumen real:** al final de la semana, ¿cuántas filas se agregaron automáticamente? Ese número es la primera métrica real de tu automatización.
5. **Pensá en el siguiente paso:** la semana que viene el flujo va a tomar decisiones según el contenido del mensaje — ¿qué condición querés agregar primero?

---

## Recursos y herramientas

| Herramienta | Para qué | Cómo acceder |
|---|---|---|
| n8n Cloud | Motor de automatizaciones | cloud.n8n.io — plan gratuito |
| Google Sheets | Tabla de destino de los datos | sheets.google.com |
| Gmail | Trigger de emails entrantes | Cuenta existente |

---

*AI Automation — Diplomatura No-Code · Bloque 2: Automatizaciones · Clase 06 de 20*
