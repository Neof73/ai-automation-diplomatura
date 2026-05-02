# Clase 03 — Ordenar la información de tu negocio para que la IA la use

**Bloque 1: Fundamentos · Semana 3 de 20**
**Duración:** 2 horas · **Tipo:** Práctica · **Nivel:** Introductorio

---

## Objetivo de la clase

Que cada participante tenga una base de datos simple pero bien estructurada de su negocio — en Airtable o Google Sheets — lista para ser usada por los flujos automáticos que vamos a construir a partir de la semana 6.

Sin datos ordenados, la IA solo puede trabajar con lo que le pegás a mano. Con datos ordenados, el sistema puede buscar, leer y responder usando información real de tu negocio, de forma automática.

---

## Agenda

| Tiempo | Bloque | Descripción |
|---|---|---|
| 0:00 – 0:10 | Apertura | Revisión de prompts de la semana anterior |
| 0:10 – 0:30 | Bloque 1 | Por qué los datos son el combustible de la automatización |
| 0:30 – 0:55 | Bloque 2 | Cómo estructurar datos para que los use un flujo automático |
| 0:55 – 1:15 | Bloque 3 | La base de datos de Lumina — en vivo |
| 1:15 – 1:45 | Ejercicio | Cada participante arma la base de datos de su negocio |
| 1:45 – 1:55 | Cierre | Revisión y preguntas |
| 1:55 – 2:00 | Tarea | Explicación de la tarea de la semana |

---

## Apertura (0:00 – 0:10)

### Revisión de la tarea anterior

Ronda rápida: cada participante muestra uno de sus tres prompts — el que mejor resultó y el que más costó ajustar.

El docente registra en pantalla los patrones que aparecen:
- ¿Qué componente de la fórmula fue más difícil de escribir?
- ¿Qué tipo de prompt (redacción, clasificación, decisión) funcionó mejor en cada negocio?
- ¿Qué ajustes tuvieron que hacer entre la primera versión y la que funciona?

### El problema que resolvemos hoy

Los prompts de la semana pasada se probaron pegando información a mano: el nombre del cliente, el número de pedido, la fecha de entrega. Eso funciona para probar, pero no funciona para automatizar.

En un flujo automático, el sistema tiene que encontrar esa información solo. Para eso necesita que los datos estén en un lugar organizado, con una estructura que pueda leer sin ayuda humana.

Hoy creamos ese lugar.

---

## Bloque 1 — Por qué los datos son el combustible de la automatización (0:10 – 0:30)

### La analogía del asistente nuevo

Imaginá que contratás un asistente para atender clientes. El primer día le explicás todo: cómo responder, qué tono usar, qué hacer en cada situación. Ese es el prompt — las instrucciones de comportamiento.

Pero para que el asistente pueda trabajar, también necesita acceso a la información del negocio: quiénes son los clientes, cuál es el estado de cada pedido, cuáles son las políticas de devolución. Sin esa información, aunque sepa perfectamente cómo comportarse, no puede dar respuestas concretas.

Los datos son esa información. Y tienen que estar en un lugar ordenado y accesible para que el asistente — en este caso, el sistema automático — pueda consultarlos.

### Qué pasa cuando los datos están desordenados

En la mayoría de los negocios pequeños, la información está dispersa:
- Los pedidos están en una planilla de ventas que nadie actualiza consistentemente
- Los datos de clientes están en el chat de WhatsApp y en la cabeza de quien atiende
- Las políticas de garantía y devolución están en un documento de Word que se editó por última vez hace dos años
- El stock está en una libreta física o en el sistema de la tienda

Un flujo automático no puede trabajar con eso. No puede leer chats de WhatsApp, no puede interpretar una libreta, no puede acceder a sistemas que no tienen conexión externa.

Para automatizar, los datos tienen que estar en un formato estructurado, digital y accesible.

### El estándar mínimo para automatizar

No hace falta un sistema sofisticado. Hace falta que los datos cumplan tres condiciones:

**1. Digitales:** guardados en una herramienta, no en papel ni en la memoria de alguien.

**2. Estructurados:** organizados en filas y columnas, donde cada columna tiene siempre el mismo tipo de información. No texto libre mezclado.

**3. Accesibles:** en una herramienta que los flujos automáticos puedan conectar. Google Sheets y Airtable son perfectas para esto — tienen integraciones nativas con todas las herramientas que vamos a usar.

---

## Bloque 2 — Cómo estructurar datos para que los use un flujo automático (0:30 – 0:55)

### La unidad básica: la tabla

Toda base de datos se organiza en tablas. Una tabla es exactamente lo que parece: filas y columnas.

- Cada **fila** es un registro: un pedido, un cliente, una consulta, un producto.
- Cada **columna** es un campo: el nombre del cliente, la fecha del pedido, el estado, el monto.

La regla de oro: **una columna = un tipo de información**. Si en una columna mezclás el nombre y el apellido, o el precio y la moneda, el sistema no puede leer eso de forma confiable.

### Los tres tipos de tablas más útiles para negocios

#### Tabla 1 — Clientes

Contiene la información de cada cliente del negocio.

| Campo | Tipo | Ejemplo |
|---|---|---|
| ID cliente | Número único | C-0041 |
| Nombre | Texto | Marcos Romero |
| Email | Email | marcos@email.com |
| Teléfono | Texto | 11-4521-8833 |
| Canal de contacto | Lista | WhatsApp / Email / Formulario |
| Fecha de primer contacto | Fecha | 2025-03-12 |
| Notas | Texto libre | Cliente frecuente, siempre paga en tiempo |

**Para qué sirve en automatización:** cuando llega un mensaje de un cliente, el flujo busca su email en esta tabla y obtiene su nombre, su historial y su canal preferido para personalizar la respuesta.

---

#### Tabla 2 — Pedidos (o servicios, o proyectos)

Contiene el registro de cada venta o servicio.

| Campo | Tipo | Ejemplo |
|---|---|---|
| ID pedido | Número único | P-4821 |
| ID cliente | Referencia | C-0041 |
| Producto/s | Texto | Lámpara de pie modelo Oslo |
| Fecha de compra | Fecha | 2025-04-28 |
| Monto | Número | 18500 |
| Estado | Lista | Pendiente / En camino / Entregado / Devuelto |
| Fecha estimada de entrega | Fecha | 2025-05-03 |
| Número de seguimiento | Texto | XT-9921 |
| Transportista | Lista | OCA / Andreani / CorreoArgentino |

**Para qué sirve en automatización:** cuando un cliente pregunta por su pedido, el flujo busca el número de pedido o el email del cliente en esta tabla, obtiene el estado y la fecha de entrega, y los inserta en el prompt para generar la respuesta personalizada.

---

#### Tabla 3 — Consultas y reclamos

Registra cada interacción con clientes para tener un historial y métricas.

| Campo | Tipo | Ejemplo |
|---|---|---|
| ID consulta | Número único | Q-0892 |
| ID cliente | Referencia | C-0041 |
| Fecha | Fecha | 2025-05-01 |
| Canal | Lista | Email / WhatsApp / Formulario |
| Mensaje original | Texto | "¿Cuándo llega mi pedido?" |
| Categoría | Lista | Envío / Devolución / Reclamo / Producto / Otro |
| Urgencia | Lista | Alta / Media / Baja |
| Respondida por | Lista | Sistema automático / Humano |
| Estado | Lista | Abierta / Resuelta / Escalada |
| Tiempo de respuesta | Número (minutos) | 2 |

**Para qué sirve en automatización:** es el registro de todo lo que el agente hace. Permite medir cuántas consultas se resolvieron solas, cuántas fueron escaladas, cuánto tardó cada respuesta. También sirve para detectar patrones: qué tipo de consulta llega más, en qué días, sobre qué productos.

---

### La diferencia entre Airtable y Google Sheets

Ambas herramientas sirven para este propósito. La elección depende de la preferencia y el uso:

| | Google Sheets | Airtable |
|---|---|---|
| **Curva de aprendizaje** | Muy baja — es como Excel | Baja — requiere una clase de adaptación |
| **Vistas disponibles** | Solo grilla | Grilla, kanban, calendario, galería, formulario |
| **Formularios** | Google Forms (separado) | Formulario integrado |
| **Automatizaciones nativas** | Limitadas | Más completas |
| **Integraciones** | Excelentes | Excelentes |
| **Plan gratuito** | Ilimitado | Hasta 1000 registros por tabla |
| **Mejor para** | Datos simples, reportes, dashboards | Gestión de operaciones, bases relacionales |

**Recomendación para este programa:**
- Si ya usás Google Sheets, quedate ahí para empezar.
- Si estás partiendo de cero, probá Airtable — es más visual y se adapta mejor a la gestión de consultas y clientes.

En la práctica, vamos a usar ambas en distintas partes del programa. Hoy practicamos con las dos.

---

## Bloque 3 — La base de datos de Lumina, en vivo (0:55 – 1:15)

El docente crea en tiempo real la base de datos de Lumina, mostrando las decisiones de diseño mientras las toma.

### Lo que Lumina necesita registrar

Lumina recibe consultas de clientes sobre pedidos. Para que el agente automático pueda responder con información real, necesita tener acceso a:

1. Los datos de cada pedido (estado, fecha, tracking)
2. Los datos de cada cliente (nombre, email, historial)
3. El registro de cada consulta recibida

### Creación en vivo — Google Sheets

**Hoja 1: Pedidos**

El docente crea esta tabla y carga 5 pedidos de ejemplo:

| ID | Cliente Email | Nombre Cliente | Producto | Estado | Fecha Estimada | Tracking | Transportista |
|---|---|---|---|---|---|---|---|
| P-4821 | marcos@email.com | Marcos Romero | Lámpara Oslo | En camino | 2025-05-03 | XT-9921 | OCA |
| P-4822 | sofia@email.com | Sofía Méndez | Silla Nórdica | Entregado | 2025-04-29 | — | Andreani |
| P-4823 | lucas@email.com | Lucas Herrera | Espejo Redondo | Pendiente | 2025-05-06 | — | — |
| P-4824 | ana@email.com | Ana Torres | Lámpara Oslo | En camino | 2025-05-04 | XT-9948 | OCA |
| P-4825 | diego@email.com | Diego Paz | Alfombra Beige | Devuelto | — | — | — |

**Hoja 2: Consultas**

El docente muestra cómo esta tabla se va a ir llenando automáticamente a partir de la semana 6, cuando conectemos el flujo.

| ID | Fecha | Email Cliente | Mensaje | Categoría | Urgencia | Respondida Por | Estado |
|---|---|---|---|---|---|---|---|
| Q-001 | 2025-05-01 | marcos@email.com | ¿Cuándo llega mi pedido 4821? | Envío | Baja | Sistema | Resuelta |
| Q-002 | 2025-05-01 | diego@email.com | Quiero devolver la alfombra... | Devolución | Media | Humano | Escalada |

### La conexión que vamos a construir

El docente muestra el flujo conceptual — sin herramientas todavía, solo el diagrama:

```
[Email del cliente llega]
         ↓
[El flujo lee el email]
         ↓
[Busca el pedido en la tabla "Pedidos" usando el email del cliente]
         ↓
[Toma los datos: estado, fecha, tracking]
         ↓
[Los inserta en el prompt de la clase 2]
         ↓
[La IA genera la respuesta personalizada]
         ↓
[El flujo envía la respuesta al cliente]
```

Esto es exactamente lo que vamos a construir en la semana 6. Hoy estamos preparando la parte del medio: la tabla de pedidos.

---

## Ejercicio práctico (1:15 – 1:45)

> Cada participante crea la base de datos básica de su propio negocio. El docente circula y ayuda con las decisiones de estructura.

### Paso 1 — Identificar qué datos necesita tu flujo (5 min)

Volvé a los 3 procesos prioritarios que identificaste en la clase 1 y los prompts que escribiste en la clase 2.

Preguntate: ¿qué información necesita el sistema para ejecutar esos procesos sin intervención humana?

**Ejemplos según tipo de negocio:**

| Tipo de negocio | Datos clave que necesita el flujo |
|---|---|
| E-commerce | Pedidos: estado, fecha, tracking. Clientes: email, nombre |
| Consultora / freelance | Proyectos: estado, próximos pasos, contacto. Clientes: nombre, empresa, email |
| Servicio con turnos | Agenda: fecha, hora, cliente, servicio, estado. Clientes: nombre, teléfono |
| Local físico con ventas | Productos: precio, stock, descripción. Clientes: email, historial de compra |
| Agencia o estudio | Propuestas: estado, monto, cliente. Proyectos: entregables, fechas, responsable |

---

### Paso 2 — Diseñar la estructura de la tabla (10 min)

En papel o en una nota, escribí:
- Nombre de la tabla (Pedidos / Clientes / Proyectos / Turnos / etc.)
- Una columna por cada tipo de información que necesita el flujo
- Para cada columna: qué tipo de dato es (texto, número, fecha, lista de opciones, sí/no)

**Reglas de diseño:**
- Una columna = un tipo de información. No mezcles nombre y apellido, precio y moneda, estado y comentario.
- Si un dato puede tener valores fijos (como estado: pendiente / en proceso / terminado), usá una lista — no texto libre. Así el flujo puede filtrarlo con precisión.
- Incluí siempre un campo de email o teléfono del cliente — es lo que va a usar el flujo para vincular la consulta con el registro correcto.

---

### Paso 3 — Crear la tabla en Google Sheets o Airtable (15 min)

Con la estructura diseñada, creá la tabla en la herramienta elegida.

Cargá al menos 5 registros reales o realistas de tu negocio. No importa si son perfectos — lo importante es que estén en el formato correcto.

**En Google Sheets:**
- Primer fila: nombres de columnas en negrita
- Una hoja por tabla (Hoja 1: Pedidos, Hoja 2: Clientes, etc.)
- Usá validación de datos para las columnas de tipo lista (Datos → Validación de datos)

**En Airtable:**
- Crear nueva base → tabla en blanco
- Definir el tipo de campo al crear cada columna (texto, número, fecha, lista desplegable)
- Usar la vista de grilla para cargar los datos

---

### Paso 4 — Conectar con el prompt (5 min)

Tomá el prompt de redacción que escribiste la semana pasada y reescribilo para que use variables en lugar de datos fijos.

**Antes (con datos fijos):**
```
El pedido número 4821 está en camino y llega el 3 de mayo.
El número de tracking es XT-9921.
```

**Después (con variables):**
```
El pedido número {{id_pedido}} está en {{estado}} y llega el {{fecha_entrega}}.
El número de tracking es {{tracking}}.
```

Las llaves `{{}}` representan los datos que el flujo va a completar automáticamente buscando en tu tabla. En la semana 6 vamos a conectar esto de verdad — hoy alcanza con que entiendas la lógica.

---

## Cierre y revisión (1:45 – 1:55)

Dos o tres participantes muestran su tabla en pantalla. El grupo analiza:
- ¿Los campos son suficientes para que el flujo pueda trabajar?
- ¿Hay campos que mezclan tipos de información?
- ¿Falta algún campo clave?

El docente hace una observación que suele aparecer en todos los ejercicios:

> **El 80% de los problemas en automatización no son de tecnología — son de datos sucios.** Columnas con formatos inconsistentes, campos vacíos, nombres escritos de formas distintas. Una base de datos limpia desde el principio evita horas de problemas después.

---

## Tarea de la semana (1:55 – 2:00)

### Base de datos lista para conectar

Esta semana, dejá la base de datos de tu negocio en condiciones de ser usada por un flujo automático:

1. **Completá la tabla** con al menos 15–20 registros reales. Más datos reales = mejor prueba cuando conectemos el flujo.

2. **Revisá la limpieza:** ¿todos los emails tienen el mismo formato? ¿los estados usan siempre las mismas palabras? ¿las fechas tienen el mismo formato (AAAA-MM-DD)?

3. **Reescribí tus prompts con variables:** para cada prompt de la clase 2, identificá qué datos vendrían de la tabla y marcalos con `{{nombre_del_campo}}`.

4. **Bonus:** si tu negocio ya tiene datos en una planilla existente, tratá de organizarlos en el formato que diseñaste hoy. La migración de datos desordenados es parte del trabajo real de automatización.

**Para la próxima clase:** vamos a construir la primera automatización real — sin IA todavía, pero conectando herramientas de verdad. Para eso necesitás la tabla lista y una cuenta activa en Zapier (plan gratuito).

---

## Recursos y herramientas necesarias

| Herramienta | Para qué | Cómo acceder |
|---|---|---|
| Google Sheets | Crear y gestionar tablas de datos | sheets.google.com — gratuito |
| Airtable | Alternativa más visual para bases de datos | airtable.com — plan gratuito hasta 1000 registros |
| Zapier | **Crear cuenta esta semana** — se usa en la clase 4 | zapier.com — plan gratuito |

### Cómo crear tu cuenta en Zapier (5 minutos)

1. Ir a zapier.com
2. Hacer clic en "Sign up free"
3. Registrarse con el email de Google o crear cuenta nueva
4. No hace falta configurar nada más — solo tener la cuenta activa

**¿Qué es Zapier?** Es la herramienta que vamos a usar la semana que viene para conectar dos aplicaciones y hacer que cuando pase algo en una, ocurra algo en la otra — sin programar nada.

---

## Vista previa: Clase 04

La semana que viene construís tu primera automatización real. Vamos a conectar Google Sheets con Gmail usando Zapier y crear el flujo más simple: cuando se agrega una fila nueva a la planilla, se envía un email automático. Sin código. Solo conectando bloques visuales. Y al terminar la clase, ese flujo va a estar funcionando en tu negocio.

---

*AI Automation — Diplomatura No-Code · Bloque 1: Fundamentos · Clase 03 de 20*
