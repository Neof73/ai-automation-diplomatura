# Clase 04 — Tu primera automatización: cuando pasa X, hacé Y

**Bloque 1: Fundamentos · Semana 4 de 20**
**Duración:** 2 horas · **Tipo:** Práctica · **Nivel:** Introductorio

---

## Objetivo de la clase

Que cada participante construya y active su primera automatización real durante la clase — un flujo que conecta dos herramientas y ejecuta una acción automática sin intervención humana. Al terminar, el flujo tiene que estar funcionando en su negocio.

---

## Agenda

| Tiempo | Bloque | Descripción |
|---|---|---|
| 0:00 – 0:10 | Apertura | Revisión de tablas y contexto de la clase |
| 0:10 – 0:30 | Bloque 1 | Cómo funciona un flujo de automatización |
| 0:30 – 0:50 | Bloque 2 | Zapier: la interfaz visual para conectar herramientas |
| 0:50 – 1:10 | Bloque 3 | El primer flujo de Lumina — construido en vivo |
| 1:10 – 1:45 | Ejercicio | Cada participante construye su propio flujo |
| 1:45 – 1:55 | Cierre | Pruebas en vivo y resolución de problemas |
| 1:55 – 2:00 | Tarea | Explicación de la tarea de la semana |

---

## Apertura (0:00 – 0:10)

### Revisión de la tarea anterior

Ronda rápida: cada participante muestra su tabla de datos y confirma que tiene la cuenta de Zapier activa.

El docente verifica dos cosas en cada tabla:
- ¿Tiene un campo de email o teléfono que sirva para identificar al cliente?
- ¿Los campos de tipo lista usan valores consistentes?

Si alguna tabla tiene problemas de estructura, se resuelven en los primeros minutos antes de avanzar.

### El momento que venimos construyendo

Las tres clases anteriores fueron preparación. Identificamos qué automatizar, aprendimos a darle instrucciones a la IA y organizamos los datos. Hoy conectamos todo eso por primera vez.

La automatización que vamos a construir es simple — un trigger y una acción. Pero el principio que la sostiene es el mismo que va a usar el agente completo de Lumina en la semana 16.

---

## Bloque 1 — Cómo funciona un flujo de automatización (0:10 – 0:30)

### La lógica que ya conocemos

Desde la clase 1 trabajamos con esta fórmula:

> **Cuando pasa X → hacé Y**

Un flujo de automatización es esa fórmula hecha realidad en una herramienta. Tiene tres partes:

**1. Trigger (disparador):** el evento que activa el flujo. Algo que pasa en una aplicación — un email que llega, una fila que se agrega a una planilla, un formulario que se completa, una hora del día.

**2. Acción:** lo que el sistema hace cuando se activa. Mandar un email, crear un registro, notificar por Slack, actualizar un dato.

**3. Condición (opcional):** un filtro entre el trigger y la acción. "Solo ejecutá la acción si el campo Estado dice 'Nuevo'". Sin condiciones, el flujo actúa siempre que se dispara. Con condiciones, actúa solo cuando corresponde.

### Los flujos se encadenan

Los flujos más simples tienen un trigger y una acción. Pero se pueden encadenar:

```
Trigger → Acción 1 → Condición → Acción 2 → Acción 3
```

Por ejemplo:
- Llega un email (trigger)
- Se guarda en la planilla (acción 1)
- ¿Es un reclamo? (condición)
- Si sí → se notifica al responsable por Slack (acción 2)
- Si no → se manda respuesta automática al cliente (acción 3)

Hoy construimos la versión más simple: un trigger y una acción. En las semanas 6 al 9 vamos a agregar condiciones y encadenar acciones.

### Qué herramientas conectan los flujos

Las herramientas de automatización actúan como intermediarias entre aplicaciones que, por sí solas, no se hablan entre sí. Gmail no le avisa a Slack. Google Sheets no le manda emails a nadie. Zapier y n8n son los que hacen esa conexión posible.

Hoy usamos **Zapier** porque tiene la curva de aprendizaje más baja y está optimizado para este tipo de flujos simples. A partir de la semana 6 vamos a pasar a **n8n**, que es más potente y permite flujos más complejos.

---

## Bloque 2 — Zapier: la interfaz visual para conectar herramientas (0:30 – 0:50)

### Qué es Zapier

Zapier es una plataforma que conecta más de 6.000 aplicaciones. Vos elegís el trigger (de qué app y qué evento) y la acción (en qué app y qué hace), y Zapier se encarga del resto.

No requiere programar. La configuración es visual: elegís opciones de menú, completás campos, y Zapier construye el conector por vos.

### Vocabulario de Zapier

| Término | Qué significa |
|---|---|
| **Zap** | Un flujo completo de automatización (trigger + acciones) |
| **Trigger** | El evento que inicia el Zap |
| **Action** | Lo que el Zap hace cuando se activa |
| **Test** | La prueba que confirma que el Zap funciona antes de activarlo |
| **Zap activo** | Un flujo que está corriendo y escuchando eventos reales |

### Recorrido por la interfaz — en vivo

El docente abre Zapier en pantalla y recorre:

1. **Dashboard:** dónde se ven todos los Zaps creados y su estado (activo/pausado)
2. **Crear un Zap:** el botón naranja "Create Zap" o "+ Create"
3. **Elegir el trigger:** buscar la app, elegir el evento
4. **Conectar la cuenta:** autorizar a Zapier a acceder a la app
5. **Configurar el trigger:** qué hoja, qué condición, qué columna
6. **Elegir la acción:** buscar la app de destino, elegir qué hacer
7. **Mapear los campos:** arrastrar los datos del trigger a los campos de la acción
8. **Testear:** probar que funciona con un dato real
9. **Activar:** prender el Zap

### El plan gratuito de Zapier

El plan gratuito permite:
- Hasta 5 Zaps activos al mismo tiempo
- 100 ejecuciones por mes
- Solo Zaps de un paso (un trigger + una acción)
- Actualización cada 15 minutos

Para el programa y para empezar en el negocio propio, el plan gratuito es suficiente. Los planes pagos agregan más pasos, más ejecuciones y actualización en tiempo real.

---

## Bloque 3 — El primer flujo de Lumina, construido en vivo (0:50 – 1:10)

### El caso

Lumina quiere recibir un aviso automático cada vez que entra un pedido nuevo en su planilla de Google Sheets. Hoy, alguien del equipo revisa la planilla manualmente cada tanto para ver si hay pedidos nuevos. Con esta automatización, el aviso llega solo.

**Flujo:**
```
Nueva fila en Google Sheets (Hoja "Pedidos")
              ↓
Enviar email al equipo de Lumina con el resumen del pedido
```

### Construcción paso a paso en pantalla

**Paso 1 — Crear el Zap**
- Clic en "Create Zap"
- Nombre: "Lumina — Aviso pedido nuevo"

**Paso 2 — Configurar el trigger**
- App: Google Sheets
- Evento: "New Spreadsheet Row" (nueva fila en planilla)
- Conectar cuenta de Google
- Elegir la planilla y la hoja correcta

**Paso 3 — Testear el trigger**
- Zapier busca las últimas filas de la planilla para confirmar que puede leerla
- El docente muestra cómo Zapier "ve" los datos: cada columna se convierte en una variable disponible para usar en las acciones

**Paso 4 — Configurar la acción**
- App: Gmail
- Evento: "Send Email" (enviar email)
- Conectar cuenta de Gmail
- Completar los campos:
  - **Para:** email del equipo de Lumina
  - **Asunto:** `Nuevo pedido: {{ID}} — {{Nombre Cliente}}`
  - **Cuerpo:**
    ```
    Nuevo pedido registrado en Lumina.

    Cliente: {{Nombre Cliente}}
    Email: {{Email}}
    Producto: {{Producto}}
    Estado: {{Estado}}
    Fecha estimada: {{Fecha Estimada}}

    Revisar en la planilla para más detalles.
    ```

**Paso 5 — Testear la acción**
- Zapier envía un email de prueba con los datos de la última fila de la planilla
- Se verifica que el email llegó y que los datos están correctos

**Paso 6 — Activar el Zap**
- Clic en "Publish" o "Turn on"
- El flujo queda activo y escuchando

**Resultado:** desde este momento, cada vez que se agrega una fila nueva a la planilla de Lumina, el equipo recibe un email automático con el resumen del pedido. Sin que nadie tenga que revisar nada.

### Lo que muestra este flujo

- Zapier lee los datos de la planilla como variables `{{campo}}`
- Las variables se insertan en el email exactamente donde las pusimos
- Es el mismo principio que vamos a usar en las semanas siguientes con prompts de IA: datos de una tabla → insertados en una instrucción → resultado personalizado

---

## Ejercicio práctico (1:10 – 1:45)

> Cada participante construye su propio primer Zap. El docente circula y ayuda con la configuración.

### Paso 1 — Elegir el flujo a construir (5 min)

Usando tu tabla de la clase anterior y los procesos que identificaste en la clase 1, elegí uno de estos flujos para construir hoy:

**Opción A — Aviso de nuevo registro (recomendada para empezar)**
- Trigger: nueva fila en Google Sheets
- Acción: enviar email a vos mismo con el resumen

**Opción B — Aviso por email cuando cambia un estado**
- Trigger: fila actualizada en Google Sheets (columna "Estado" cambia a "Listo" o "Completado")
- Acción: enviar email al cliente con la confirmación

**Opción C — Registrar automáticamente desde un formulario**
- Trigger: nueva respuesta en Google Forms
- Acción: agregar una fila en Google Sheets con los datos del formulario

Si ninguna aplica directamente a tu negocio, usá la Opción A con tu propia tabla — es la más didáctica para entender la mecánica.

---

### Paso 2 — Construir el Zap (25 min)

Seguí los mismos pasos que hizo el docente con Lumina:

1. Crear el Zap y ponerle nombre
2. Configurar el trigger (conectar la app, elegir el evento, conectar la cuenta)
3. Testear el trigger — verificar que Zapier ve tus datos correctamente
4. Configurar la acción (conectar la app, elegir el evento, mapear los campos)
5. Testear la acción — verificar que funciona con datos reales
6. Activar el Zap

**Problemas comunes y soluciones:**

| Problema | Solución |
|---|---|
| Zapier no encuentra mi planilla | Verificar que la planilla tenga al menos una fila de datos (además del encabezado) |
| Los campos salen vacíos en el email | La primera fila de la planilla tiene que ser el encabezado; la segunda, datos reales |
| El trigger no detecta nuevas filas | El plan gratuito actualiza cada 15 minutos — hay que esperar o usar el botón "Test trigger" |
| La cuenta de Google no conecta | Verificar que estás usando el mismo email en Zapier y en Google Sheets |
| El email no llega | Revisar la carpeta de spam y verificar el email de destino en la configuración |

---

### Paso 3 — Probar en condiciones reales (5 min)

Con el Zap activo, agregá una fila nueva a tu planilla de forma manual y esperá el resultado. Si el Zap está en el plan gratuito, puede tardar hasta 15 minutos — el docente puede mostrar cómo forzar la ejecución desde el panel de Zapier.

---

## Cierre: pruebas en vivo (1:45 – 1:55)

Dos o tres participantes muestran su Zap funcionando. El grupo observa:
- ¿El trigger se disparó correctamente?
- ¿Los datos se mapearon bien en la acción?
- ¿El resultado final (email, notificación) tiene el formato esperado?

El docente señala el momento clave:

> **Acabamos de hacer que dos herramientas que no se conocen entre sí empiecen a trabajar juntas — sin tocar una sola línea de código.** Esto es la base de todo lo que construimos de aquí en adelante. La complejidad que viene no es de otro tipo — es más de lo mismo, encadenado.

---

## Tarea de la semana (1:55 – 2:00)

### Primer flujo funcionando en el negocio real

Esta semana, el Zap que construiste en clase tiene que procesar al menos 5 eventos reales de tu negocio:

1. **Activalo en condiciones reales:** si construiste el flujo de aviso de nuevo pedido, dejalo encendido y procesá los pedidos de la semana a través de la planilla.

2. **Observá el comportamiento:** ¿llegan los avisos? ¿los datos están completos y bien formateados? ¿hay algo que no funciona como esperabas?

3. **Documentá los problemas:** anotá cualquier cosa que no funcionó como esperabas — datos que llegaron vacíos, emails con formato raro, triggers que no se dispararon.

4. **Pensá en el siguiente paso:** ¿qué acción agregarías a este flujo si pudieras? Por ejemplo, además de enviarte el email, también guardar el registro en otra hoja. Eso es lo que vamos a hacer en las semanas 6 al 9.

5. **Bonus — probá un segundo Zap:** si el primero funcionó bien, construí uno más. Zapier permite hasta 5 Zaps activos en el plan gratuito.

**Para la próxima clase:** es la semana del primer entregable. Vas a presentar el mapa de automatización completo de tu negocio con los 3 procesos prioritarios. Traé todo lo que construiste en estas 4 semanas: el mapa, los prompts y la tabla de datos.

---

## Recursos y herramientas necesarias

| Herramienta | Para qué | Cómo acceder |
|---|---|---|
| Zapier | Construir y activar flujos | zapier.com — plan gratuito |
| Google Sheets | Tabla de datos del negocio | sheets.google.com — gratuito |
| Gmail | Enviar emails automáticos | Cuenta de Gmail existente |
| Google Forms (opcional) | Trigger de formulario | forms.google.com — gratuito |

### Integraciones disponibles en el plan gratuito de Zapier

Además de Google Sheets + Gmail, estas combinaciones funcionan en el plan gratuito y son útiles para distintos tipos de negocio:

- **Google Forms → Google Sheets** — Registrar respuestas de formularios automáticamente
- **Typeform → Gmail** — Notificar cuando alguien completa un formulario de contacto
- **Google Sheets → Slack** — Avisar al equipo cuando hay un registro nuevo
- **Calendly → Gmail** — Confirmar turnos automáticamente cuando alguien agenda
- **WooCommerce → Google Sheets** — Registrar pedidos de tienda online en una planilla

---

## Vista previa: Clase 05

La semana que viene cerramos el Bloque 1 con el primer entregable del programa: el mapa de automatización de tu negocio. No es un flujo técnico — es un documento estratégico que define qué vas a automatizar, en qué orden y cuánto tiempo vas a recuperar. Es la hoja de ruta de los próximos 3 meses de tu negocio. Y lo presentás al grupo.

---

*AI Automation — Diplomatura No-Code · Bloque 1: Fundamentos · Clase 04 de 20*
