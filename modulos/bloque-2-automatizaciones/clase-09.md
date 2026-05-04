# Clase 09 — Qué hacer cuando algo falla: manejo de errores

**Bloque 2: Automatizaciones · Semana 9 de 20**
**Duración:** 2 horas · **Tipo:** Práctica · **Nivel:** Intermedio

---

## Objetivo de la clase

Que cada participante haga su flujo resiliente: capaz de detectar y manejar errores sin romperse en silencio, y de alertar cuando algo necesita atención humana. Al terminar, el flujo tiene que tener al menos una ruta de manejo de errores y un mecanismo de alerta cuando falla.

---

## Agenda

| Tiempo | Bloque | Descripción |
|---|---|---|
| 0:00 – 0:10 | Apertura | Revisión de la semana anterior |
| 0:10 – 0:35 | Bloque 1 | Por qué los flujos fallan y cómo prevenirlo |
| 0:35 – 1:00 | Bloque 2 | Herramientas de manejo de errores en n8n |
| 1:00 – 1:20 | Bloque 3 | El flujo robusto de Lumina — construido en vivo |
| 1:20 – 1:45 | Ejercicio | Cada participante agrega manejo de errores a su flujo |
| 1:45 – 1:55 | Cierre | Testing de fallas y revisión |
| 1:55 – 2:00 | Tarea | Preparación para el entregable |

---

## Apertura (0:00 – 0:10)

### Revisión de la semana anterior

¿Cómo funcionaron las notificaciones? ¿Llegaron al canal correcto? ¿Hubo algún momento en que el flujo no se comportó como se esperaba?

El docente introduce la paradoja de la automatización:

> Un flujo que funciona bien se vuelve invisible — nadie lo ve porque no requiere atención. Pero cuando algo falla, si no hay un mecanismo de alerta, tampoco se ve. El flujo sigue "corriendo" pero no está haciendo nada útil.

Eso es el error silencioso: el peor tipo de falla en automatización.

---

## Bloque 1 — Por qué los flujos fallan y cómo prevenirlo (0:10 – 0:35)

### Las 5 causas más comunes de falla

**1. Credenciales vencidas o revocadas**
Los tokens de acceso a Gmail, Sheets o Slack tienen fecha de vencimiento o pueden revocarse si el usuario cambia la contraseña. El flujo intenta conectarse y falla porque el acceso ya no es válido.

*Solución:* alertas cuando una credencial falla, y revisar credenciales periódicamente.

**2. Datos que no llegan en el formato esperado**
El flujo espera un email con el número de pedido en el cuerpo, pero el cliente escribe "pedido: 4821" en lugar de solo "4821". La extracción de datos falla y el campo queda vacío.

*Solución:* validar los datos antes de usarlos y tener un camino alternativo cuando faltan.

**3. Registros que no existen en la base de datos**
El flujo busca el pedido por email del cliente, pero ese email no está en la planilla. El nodo de búsqueda devuelve vacío y el siguiente nodo falla al intentar usar un dato que no existe.

*Solución:* verificar si la búsqueda devolvió resultado antes de continuar.

**4. Límites de la API o del servicio**
Gmail tiene un límite de emails por día. Google Sheets tiene un límite de llamadas por minuto. Si el flujo procesa un volumen alto, puede superar esos límites y fallar.

*Solución:* agregar esperas entre nodos de alto volumen y monitorear el uso de la API.

**5. Cambios en la estructura de los datos**
Alguien cambia el nombre de una columna en Google Sheets, o el formato de los emails cambia. El flujo sigue corriendo pero los datos van al lugar equivocado.

*Solución:* no renombrar columnas que usa el flujo sin actualizar el flujo, y documentar las dependencias.

### La diferencia entre error con alerta y error silencioso

| Error con alerta | Error silencioso |
|---|---|
| El flujo falla y avisa | El flujo "corre" pero no hace nada útil |
| Alguien puede intervenir | Nadie sabe que hay un problema |
| Se puede corregir rápido | El daño acumula sin que nadie lo vea |

El error silencioso es el más peligroso porque da una falsa sensación de que todo funciona. Un flujo bien construido tiene que fallar de forma ruidosa — o mejor aún, no fallar, sino tomar una ruta alternativa.

### La filosofía del flujo resiliente

Un flujo resiliente no es un flujo que nunca falla. Es un flujo que:
1. **Detecta** cuando algo no salió como esperaba
2. **Actúa** de forma diferente en ese caso (ruta alternativa)
3. **Avisa** cuando necesita atención humana
4. **Registra** lo que pasó para poder revisarlo después

---

## Bloque 2 — Herramientas de manejo de errores en n8n (0:35 – 1:00)

El docente recorre cada herramienta en la interfaz de n8n.

### 1. Error Trigger (nodo de trigger de error)

n8n tiene un nodo especial llamado **Error Trigger** que se activa cuando cualquier otro nodo del workflow falla. Se usa para construir un workflow separado de manejo de errores.

**Cómo usarlo:**
1. Crear un nuevo workflow llamado "Manejo de errores global"
2. Agregar el nodo Error Trigger como primer nodo
3. Agregar acciones: enviar email o mensaje de Slack con los detalles del error
4. En la configuración del workflow principal: Settings → Error Workflow → seleccionar el workflow de errores

El Error Trigger recibe automáticamente:
- El nombre del workflow que falló
- El nombre del nodo que falló
- El mensaje de error
- El timestamp de cuándo ocurrió

---

### 2. Try/Catch con el nodo IF

Para errores esperables (como "no encontré el pedido"), se usa un nodo IF después del nodo que puede fallar:

```
[Google Sheets: buscar pedido]
        ↓
[IF: ¿se encontró el pedido?]
   /                  \
[Sí: continuar]    [No: ruta alternativa]
                        ↓
                   [Gmail: responder al
                    cliente que no encontramos
                    su pedido]
```

**Cómo verificar si una búsqueda devolvió resultado:**
- `{{ $json.id }}` no está vacío → encontró el registro
- O usar la condición "is not empty" sobre cualquier campo obligatorio

---

### 3. Nodo "Stop and Error"

Este nodo detiene el flujo en un punto específico y genera un error controlado. Se usa cuando se detecta una situación que no debería seguir procesándose.

**Ejemplo:** si el email del cliente está vacío, es mejor detener el flujo y alertar que continuar con un dato faltante que va a causar problemas más adelante.

---

### 4. Notas en el flujo (documentación)

n8n permite agregar notas de texto en el lienzo. No afectan la ejecución pero son esenciales para saber qué hace cada parte del flujo sin tener que abrir cada nodo.

**Buena práctica:** agregar una nota al lado de cada nodo que puede fallar, explicando qué hacer si falla.

---

### 5. Historial de ejecuciones

En el panel "Executions" de n8n, cada ejecución muestra:
- Estado: Success / Error / Waiting
- Duración
- Los datos que entraron y salieron de cada nodo

Cuando algo falla, el historial de ejecuciones es la primera herramienta de diagnóstico. El docente muestra cómo leer una ejecución con error y encontrar el nodo que falló.

---

## Bloque 3 — El flujo robusto de Lumina, construido en vivo (1:00 – 1:20)

### El problema

El flujo de Lumina busca el pedido del cliente en Google Sheets por email. ¿Qué pasa si:
- El cliente escribe desde un email distinto al que usó para comprar?
- El pedido no está en la planilla porque fue una compra en el local físico?
- El campo de tracking está vacío porque el pedido aún no fue despachado?

Sin manejo de errores, el flujo falla o envía una respuesta con datos vacíos. Con manejo de errores, actúa de forma diferente en cada caso.

### El flujo con manejo de errores

```
[Gmail Trigger]
      ↓
[Set: extraer campos]
      ↓
[Google Sheets: registrar consulta]
      ↓
[IF: ¿es un reclamo?]
   /                    \
[TRUE: reclamo]        [FALSE: consulta normal]
      ↓                       ↓
[Slack + Notion]        [Google Sheets: buscar pedido]
                               ↓
                    [IF: ¿se encontró el pedido?]
                       /                  \
                    [Sí]                 [No]
                      ↓                    ↓
              [IF: ¿tiene tracking?]  [Gmail: "No encontramos
                  /          \         tu pedido, ¿podés
                [Sí]        [No]       confirmar el email?"]
                  ↓            ↓
           [Gmail: respuesta  [Gmail: respuesta
            con tracking]      sin tracking, con
                               fecha estimada]
```

### Construcción de los casos de error

**Caso 1 — Pedido no encontrado:**
- Condición: el campo `ID` de la búsqueda está vacío
- Acción: responder al cliente pidiendo que confirme el email de compra
- Mensaje:
  ```
  Hola, buscamos tu pedido con el email {{ $json.email_cliente }}
  pero no lo encontramos en nuestro sistema.

  ¿Podrías confirmar que es el mismo email con el que realizaste
  la compra? Así podemos darte la información correcta.

  Equipo Lumina
  ```

**Caso 2 — Pedido sin tracking:**
- Condición: el campo `Tracking` está vacío
- Acción: responder con la fecha estimada pero sin número de seguimiento
- Mensaje:
  ```
  Hola {{ $('BuscarPedido').item.json['Nombre Cliente'] }},

  Tu pedido está en estado {{ $('BuscarPedido').item.json.Estado }}
  y tiene fecha estimada de entrega: {{ $('BuscarPedido').item.json['Fecha Estimada'] }}.

  El número de seguimiento estará disponible cuando el pedido
  sea despachado. Te avisaremos.

  Equipo Lumina
  ```

**Workflow de errores globales:**
El docente crea el workflow de Error Trigger que envía un mensaje a Slack cuando cualquier nodo falla con un error técnico inesperado.

---

## Ejercicio práctico (1:20 – 1:45)

### Paso 1 — Identificar los puntos de falla de tu flujo (5 min)

Mirá tu flujo y respondé para cada nodo que podría fallar:
- ¿Qué pasa si este nodo no devuelve datos?
- ¿Qué pasa si el dato que espera está vacío?
- ¿Qué pasa si la conexión a la herramienta falla?

---

### Paso 2 — Agregar al menos dos rutas de manejo de errores (20 min)

**Manejo de error 1 — Registro no encontrado:**
Si tu flujo busca datos en una planilla o base de datos, agregar un IF que verifique si la búsqueda devolvió resultado y definir qué hacer cuando no lo hay.

**Manejo de error 2 — Workflow de errores global:**
Crear un workflow separado con el Error Trigger y configurarlo como el manejador de errores del workflow principal.

---

### Paso 3 — Probar los errores intencionalmente (10 min)

La única forma de saber si el manejo de errores funciona es provocar los errores:

1. Enviar un mensaje desde un email que no está en la planilla → verificar que la ruta de "no encontrado" se activa
2. Borrar temporalmente una credencial → verificar que el Error Workflow se dispara y llega el aviso
3. Dejar vacío un campo requerido → verificar que el flujo no continúa y avisa

---

## Cierre (1:45 – 1:55)

El docente provoca un error en el flujo de Lumina en vivo y el grupo observa cómo el sistema lo detecta, toma la ruta alternativa y envía la alerta.

Mensaje clave para el cierre:

> Un flujo en producción no es el mismo que el flujo que probamos en clase. En producción hay datos raros, conexiones que fallan, formatos inesperados. Un flujo sin manejo de errores es un flujo que va a romperse silenciosamente. Un flujo con manejo de errores es un flujo que puede vivir solo.

---

## Tarea de la semana — Preparación para el Entregable 2

La semana que viene presentás el pipeline operativo de tu negocio. Esta semana es de pulido y preparación:

1. **Revisar que el flujo tenga al menos una ruta de manejo de errores activa**
2. **Activar el workflow de errores global** y verificar que funciona
3. **Documentar el flujo** con notas en n8n explicando qué hace cada sección
4. **Preparar la demo:** el flujo tiene que funcionar en vivo durante la presentación
5. **Calcular el impacto:** ¿cuántos eventos procesó esta semana? ¿cuánto tiempo hubiera llevado hacerlo a mano?

**Formato del entregable:** demo en vivo del flujo funcionando + 2 minutos de explicación del impacto en números.

---

## Recursos y herramientas

| Herramienta | Para qué | Cómo acceder |
|---|---|---|
| n8n Cloud | Flujos con manejo de errores | cloud.n8n.io |
| n8n Docs — Error Handling | Documentación oficial | docs.n8n.io/flow-logic/error-handling |

---

*AI Automation — Diplomatura No-Code · Bloque 2: Automatizaciones · Clase 09 de 20*
