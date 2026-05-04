# Clase 07 — Flujos con condiciones: distintas respuestas según el caso

**Bloque 2: Automatizaciones · Semana 7 de 20**
**Duración:** 2 horas · **Tipo:** Práctica · **Nivel:** Intermedio

---

## Objetivo de la clase

Que cada participante agregue lógica condicional a su flujo — haciendo que el sistema tome caminos distintos según el contenido de cada mensaje. Al terminar, el flujo tiene que responder de forma diferente según el estado del pedido o el tipo de consulta, sin intervención humana.

---

## Agenda

| Tiempo | Bloque | Descripción |
|---|---|---|
| 0:00 – 0:10 | Apertura | Revisión del flujo de la semana anterior |
| 0:10 – 0:30 | Bloque 1 | La lógica condicional: cómo un flujo toma decisiones |
| 0:30 – 0:50 | Bloque 2 | El nodo IF en n8n: configuración y uso |
| 0:50 – 1:15 | Bloque 3 | El flujo condicional de Lumina — construido en vivo |
| 1:15 – 1:45 | Ejercicio | Cada participante agrega condiciones a su flujo |
| 1:45 – 1:55 | Cierre | Pruebas con distintos casos y revisión |
| 1:55 – 2:00 | Tarea | Explicación de la tarea de la semana |

---

## Apertura (0:00 – 0:10)

### Revisión de la semana anterior

Ronda rápida: ¿cuántas filas se agregaron automáticamente a la planilla durante la semana? ¿hubo errores? ¿los datos llegaron limpios?

El docente registra los números en pantalla. Esos son los primeros datos reales de automatización de cada negocio.

### El problema que resolvemos hoy

El flujo de la semana pasada captura todos los mensajes y los registra. Pero no hace nada con ellos — solo los guarda. Un cliente que pregunta "¿cuándo llega mi pedido?" recibe exactamente el mismo trato que uno que escribe "me llegó el producto roto, quiero que me devuelvan el dinero".

En el negocio real, esos dos casos requieren respuestas completamente distintas. Hoy enseñamos al flujo a distinguirlos y actuar de forma diferente en cada caso.

---

## Bloque 1 — La lógica condicional: cómo un flujo toma decisiones (0:10 – 0:30)

### De la acción única a la bifurcación

Un flujo sin condiciones siempre hace lo mismo, sin importar qué datos recibe. Útil para capturar y registrar — no suficiente para responder.

Un flujo con condiciones puede tomar caminos distintos:

```
[Mensaje recibido]
        ↓
[¿De qué se trata?]
    /         \
[Consulta]  [Reclamo]
    ↓             ↓
[Respuesta   [Alerta al
automática]    equipo]
```

Esto es exactamente lo que hace un operador humano cuando lee un mensaje: evalúa de qué se trata y decide qué hacer. El nodo IF replica esa evaluación con criterios que vos definís.

### Tipos de condiciones

Una condición compara un valor contra otro y devuelve Verdadero o Falso:

| Tipo | Ejemplo | Cuándo usarlo |
|---|---|---|
| **Igual a** | Estado = "Entregado" | Valores exactos de una lista |
| **Contiene** | Mensaje contiene "devolución" | Palabras clave en texto libre |
| **Mayor que** | Días sin respuesta > 3 | Valores numéricos o fechas |
| **Está vacío** | Tracking = vacío | Campos que pueden no tener dato |
| **Empieza con** | Email empieza con "reclamo" | Prefijos en asuntos de email |

### Condiciones simples y compuestas

Una condición simple evalúa una sola cosa. Una condición compuesta combina varias con AND u OR:

- **AND:** todas las condiciones tienen que ser verdaderas → "Estado = En camino Y Días transcurridos > 5"
- **OR:** al menos una condición tiene que ser verdadera → "Mensaje contiene 'roto' O mensaje contiene 'dañado'"

### El resultado: ramas del flujo

Cuando el nodo IF evalúa la condición, el flujo se divide en dos ramas:
- **Rama TRUE:** lo que pasa cuando la condición se cumple
- **Rama FALSE:** lo que pasa cuando no se cumple

Cada rama puede tener sus propios nodos, acciones y hasta nuevas condiciones. Un flujo puede tener múltiples niveles de bifurcación.

---

## Bloque 2 — El nodo IF en n8n (0:30 – 0:50)

El docente abre n8n en pantalla y recorre el nodo IF con un ejemplo simple.

### Cómo agregar y configurar el nodo IF

1. En el lienzo, hacer clic en "+" después del nodo donde querés agregar la condición
2. Buscar "IF" en el buscador de nodos
3. En la configuración del nodo IF:
   - **Value 1:** el dato que querés evaluar → usar `{{ $json.estado }}` para traer el campo del nodo anterior
   - **Operation:** el tipo de comparación → "is equal to", "contains", "is empty", etc.
   - **Value 2:** el valor contra el que comparás → "Reclamo", "En camino", etc.

### El nodo Switch: cuando hay más de dos opciones

El nodo IF divide en dos ramas (verdadero/falso). Pero a veces hay más de dos casos posibles:

- Estado: Pendiente / En camino / Entregado / Devuelto
- Categoría: Envío / Devolución / Reclamo / Producto / Otro

Para eso existe el nodo **Switch**, que funciona como un menú de opciones:

```
[Switch: campo "categoria"]
  ├── "Envío"      → [Respuesta automática con estado]
  ├── "Devolución" → [Email con instrucciones de devolución]
  ├── "Reclamo"    → [Alerta al equipo]
  └── Otros        → [Registro sin respuesta automática]
```

El docente muestra cómo configurar el Switch con 3–4 opciones.

### Referencias de datos entre nodos

Cuando hay condiciones, los datos pueden venir de nodos que no son el inmediatamente anterior. n8n permite referenciar cualquier nodo del flujo:

- `{{ $json.campo }}` → datos del nodo anterior
- `{{ $('NombreDelNodo').item.json.campo }}` → datos de un nodo específico por nombre

Esto es importante para los flujos con bifurcaciones: en la rama TRUE, los datos del trigger siguen disponibles aunque hayan pasado por varios nodos.

---

## Bloque 3 — El flujo condicional de Lumina, construido en vivo (0:50 – 1:15)

### El caso

Lumina recibe dos tipos de mensajes que requieren tratamiento diferente:
- **Consulta de envío:** el cliente pregunta dónde está su pedido → respuesta automática con el estado
- **Reclamo:** el cliente reporta un problema → alerta al equipo para atención personalizada

El flujo de hoy extiende el de la semana pasada agregando esta lógica.

### El flujo completo

```
[Gmail Trigger]
      ↓
[Set: extraer campos]
      ↓
[Google Sheets: registrar consulta]
      ↓
[IF: ¿el mensaje contiene "reclamo", "roto", "dañado" o "devolver"?]
   /                              \
[TRUE: es un reclamo]          [FALSE: consulta normal]
      ↓                                ↓
[Gmail: enviar alerta      [Google Sheets: buscar pedido
 al equipo con el           por email del cliente]
 mensaje completo]                ↓
                           [Gmail: responder al cliente
                            con el estado del pedido]
```

### Construcción en vivo — paso a paso

**Abrir el flujo de la semana anterior** y agregar los nodos nuevos.

**Nodo IF — Detectar reclamos**
- Condición compuesta (OR):
  - `{{ $json.mensaje }}` contiene "reclamo"
  - `{{ $json.mensaje }}` contiene "roto"
  - `{{ $json.mensaje }}` contiene "dañado"
  - `{{ $json.mensaje }}` contiene "devolver"

**Rama TRUE — Alerta al equipo**
- App: Gmail
- Evento: Send Email
- Para: `equipo@lumina.com`
- Asunto: `⚠️ Reclamo recibido — {{ $json.email_cliente }}`
- Cuerpo:
  ```
  Se recibió un mensaje que puede ser un reclamo.

  De: {{ $json.email_cliente }}
  Fecha: {{ $json.fecha }}
  Mensaje:
  {{ $json.mensaje }}

  Responder a la brevedad.
  ```

**Rama FALSE — Buscar pedido y responder**

Nodo 1: Google Sheets — buscar pedido
- Operación: "Lookup Row" (buscar fila)
- Hoja: "Pedidos"
- Campo de búsqueda: columna "Email"
- Valor a buscar: `{{ $json.email_cliente }}`

Nodo 2: Gmail — responder al cliente
- Para: `{{ $json.email_cliente }}`
- Asunto: `Re: {{ $json.asunto }}`
- Cuerpo:
  ```
  Hola, gracias por escribirnos.

  Tu pedido {{ $('BuscarPedido').item.json.ID }} está actualmente
  en estado: {{ $('BuscarPedido').item.json.Estado }}.

  Fecha estimada de entrega: {{ $('BuscarPedido').item.json['Fecha Estimada'] }}.
  Número de seguimiento: {{ $('BuscarPedido').item.json.Tracking }}.

  Cualquier consulta, estamos disponibles.
  Equipo Lumina
  ```

**Prueba con dos emails distintos:**
1. Email con "¿cuándo llega mi pedido?" → debe buscar el pedido y responder con el estado
2. Email con "me llegó el producto roto" → debe enviar la alerta al equipo

---

## Ejercicio práctico (1:15 – 1:45)

> Cada participante agrega condiciones a su flujo de la semana anterior.

### Paso 1 — Definir las condiciones de tu negocio (5 min)

Pensá en los mensajes que recibís habitualmente. ¿Qué tipos hay? ¿Cuáles requieren respuesta diferente?

Ejemplos por tipo de negocio:

| Negocio | Condición | Rama TRUE | Rama FALSE |
|---|---|---|---|
| E-commerce | Mensaje contiene "devolución" | Alerta al equipo | Respuesta con estado de pedido |
| Consultora | Mensaje contiene "urgente" | Notificación inmediata | Registro normal |
| Servicio con turnos | Mensaje contiene "cancelar" | Alerta + liberación del turno | Confirmación del turno |
| Tienda local | Mensaje contiene "stock" | Respuesta con disponibilidad | Respuesta general |

---

### Paso 2 — Agregar el nodo IF o Switch al flujo (15 min)

1. Abrir el flujo de la semana anterior en n8n
2. Después del nodo de registro en Sheets, agregar un nodo IF o Switch
3. Configurar la condición con los criterios elegidos
4. En la rama TRUE: agregar una acción distinta (alerta por email, notificación, etc.)
5. En la rama FALSE: mantener o ajustar la acción actual

---

### Paso 3 — Probar con casos reales (10 min)

Ejecutar el flujo en modo test con al menos dos mensajes distintos:
- Uno que cumpla la condición (rama TRUE)
- Uno que no la cumpla (rama FALSE)

Verificar que cada caso llega al nodo correcto y ejecuta la acción esperada.

---

## Cierre (1:45 – 1:55)

Dos participantes muestran su flujo con bifurcación en pantalla y lo prueban en vivo con los dos casos.

El docente señala el salto conceptual de la semana:

> Ya no tenemos un flujo que siempre hace lo mismo. Tenemos un flujo que lee el contenido de un mensaje, evalúa una condición y toma una decisión. Eso es exactamente lo que hace un operador humano — solo que ahora lo hace el sistema, las 24 horas, sin cansarse.

---

## Tarea de la semana

1. **Flujo con condición activo** durante toda la semana procesando mensajes reales.
2. **Registrar los resultados:** ¿cuántos mensajes cayeron en cada rama? ¿el sistema clasificó bien?
3. **Ajustar las condiciones** si algún mensaje fue clasificado incorrectamente — agregar palabras clave que faltaban.
4. **Bonus:** agregar una segunda condición encadenada. Por ejemplo: si es reclamo Y el cliente ya compró más de 3 veces → tratamiento prioritario.

---

## Recursos y herramientas

| Herramienta | Para qué | Cómo acceder |
|---|---|---|
| n8n Cloud | Flujos con lógica condicional | cloud.n8n.io |
| Google Sheets | Búsqueda de datos del pedido | sheets.google.com |
| Gmail | Trigger y acciones de email | Cuenta existente |

---

*AI Automation — Diplomatura No-Code · Bloque 2: Automatizaciones · Clase 07 de 20*
