# Clase 22 — Sistemas multiagente: orquestar equipos de IA especializados

**Bloque 5: Sistemas avanzados · Semana 22 de 25**
**Duración:** 2 horas · **Tipo:** Práctica · **Nivel:** Avanzado

---

## Objetivo de la clase

Que cada participante comprenda cuándo y por qué un solo agente no es suficiente, diseñe la arquitectura de un sistema de múltiples agentes especializados, y construya en n8n un sistema de tres agentes coordinados que resuelven distintos tipos de consultas de Lumina de forma paralela y coherente. Al terminar, el sistema tiene que orquestar la comunicación entre agentes, manejar los fallos de un sub-agente sin romper el sistema completo, y producir una respuesta unificada al cliente.

---

## Agenda

| Tiempo | Bloque | Descripción |
|---|---|---|
| 0:00 – 0:15 | Apertura | El límite del agente único: dónde se queda corto |
| 0:15 – 0:50 | Bloque 1 | Teoría de sistemas multiagente: patrones y arquitecturas |
| 0:50 – 1:15 | Bloque 2 | Diseño del sistema: cómo dividir responsabilidades |
| 1:15 – 1:40 | Bloque 3 | El sistema de tres agentes de Lumina — construido en vivo |
| 1:40 – 1:55 | Ejercicio | Cada participante diseña su sistema multiagente |
| 1:55 – 2:00 | Tarea | Configuración para la semana |

---

## Apertura (0:00 – 0:15)

### El agente único llega a su límite

El agente del Bloque 4, extendido con RAG en la clase anterior, ya es bastante poderoso. Puede clasificar mensajes, buscar pedidos, verificar stock, consultar la base de conocimiento y escalar casos urgentes. Pero a medida que le agregamos más herramientas y más contexto, aparecen nuevos problemas:

**Problema 1 — El context window se llena**
Cada herramienta que el agente usa, cada fragmento de RAG que recupera, cada paso de razonamiento que da — todo eso consume tokens del context window. Un agente con 15 herramientas y acceso a RAG puede llegar fácilmente a 8.000-10.000 tokens por conversación. Eso es costoso y lento.

**Problema 2 — Un agente generalista hace todo regular**
Un agente que intenta ser experto en post-venta, en recomendaciones de productos, en gestión de reclamos legales y en reportes internos necesita un system prompt gigantesco con instrucciones para todo. El resultado es un agente que hace todo de forma mediocre en lugar de hacer una cosa excelentemente.

**Problema 3 — Un fallo afecta todo el sistema**
Si el agente único se queda sin tokens, falla una herramienta o el modelo da una respuesta incorrecta, todo el proceso falla. No hay forma de aislar el fallo.

**Problema 4 — No se pueden ejecutar tareas en paralelo**
Si una consulta requiere: buscar el pedido del cliente, consultar el stock de una alternativa Y verificar la política de devoluciones al mismo tiempo, el agente único tiene que hacerlo secuencialmente. Tres llamadas a herramientas en serie pueden tomar 15-20 segundos.

La solución a todos estos problemas es la misma: **dividir para conquistar**.

### La analogía del equipo de trabajo

Un negocio no funciona con una sola persona que hace todo — tiene un equipo donde cada persona tiene un rol específico. El director de atención al cliente no sabe todo sobre contabilidad. El encargado de ventas no maneja los reclamos técnicos. Hay un coordinador que sabe a quién derivar cada caso.

Un sistema multiagente funciona exactamente igual:

```
              [ORQUESTADOR]
              / (decide quién atiende) \
             /           |              \
[AGENTE          [AGENTE         [AGENTE
 POST-VENTA]      MARKETING]      RECLAMOS]
(pedidos,         (productos,     (escaladas,
 cambios,          catálogo,       devoluciones,
 tracking)         recomendaciones) casos legales)
```

---

## Bloque 1 — Teoría de sistemas multiagente (0:15 – 0:50)

### Los patrones de arquitectura multiagente

Hay tres patrones principales, y cada uno tiene casos de uso distintos:

---

**Patrón 1 — Orquestador → Trabajadores (el más común)**

Un agente central recibe todas las solicitudes, analiza de qué se trata y delega a agentes especializados. Los trabajadores no se conocen entre sí — solo el orquestador sabe de todos.

```
[Mensaje del cliente]
         ↓
   [ORQUESTADOR]
   Analiza y decide
         ↓
   ┌─────┴─────┐
[Agente A]  [Agente B]  [Agente C]
   ↓              ↓           ↓
[Respuesta A] [Respuesta B] [Respuesta C]
         ↓
   [ORQUESTADOR]
   Combina respuestas
         ↓
[Respuesta unificada al cliente]
```

*Cuándo usarlo:* cuando las consultas son de tipos bien diferenciados y raramente requieren colaboración entre agentes.

---

**Patrón 2 — Pipeline secuencial**

Los agentes se ejecutan en cadena: cada uno toma el output del anterior como input. Cada agente transforma o enriquece la información.

```
[Mensaje]
    ↓
[Agente 1: Clasificador]
    ↓
[Agente 2: Buscador de contexto]
    ↓
[Agente 3: Redactor de respuesta]
    ↓
[Agente 4: Revisor de calidad]
    ↓
[Respuesta final]
```

*Cuándo usarlo:* cuando el proceso tiene pasos claramente ordenados donde cada etapa depende de la anterior.

---

**Patrón 3 — Red de agentes (el más complejo)**

Los agentes pueden comunicarse entre sí libremente, no solo con el orquestador. Un agente puede pedirle ayuda a otro durante su propio razonamiento.

```
[Agente A] ←──── colaboración ────→ [Agente B]
     ↑                                    ↑
     └──────────── [Agente C] ────────────┘
```

*Cuándo usarlo:* tareas muy complejas donde los límites entre responsabilidades no están claros. Alta complejidad de implementación — no recomendado como primer sistema multiagente.

---

### Cómo los agentes se comunican: el contrato de datos

La pieza técnica más importante de un sistema multiagente es el **contrato de datos**: el formato acordado en el que los agentes se intercambian información.

Si el orquestador le manda al Agente Post-Venta un objeto con campos distintos a los que espera, el agente va a fallar o responder incorrectamente.

El contrato se define como un esquema JSON y se documenta antes de construir cualquier agente:

```json
// Formato que el orquestador manda a cualquier agente trabajador
{
  "id_conversacion": "conv_abc123",
  "mensaje_original": "Quiero cambiar la remera que compré...",
  "email_cliente": "cliente@email.com",
  "tipo_detectado": "cambio_producto",
  "datos_extraidos": {
    "producto_mencionado": "remera",
    "accion_solicitada": "cambio",
    "urgencia": "baja"
  },
  "contexto_previo": []
}

// Formato que cada agente trabajador devuelve al orquestador
{
  "id_conversacion": "conv_abc123",
  "agente": "post_venta",
  "estado": "resuelto",
  "respuesta_generada": "Hola...",
  "acciones_tomadas": ["busco_pedido", "verifico_stock"],
  "derivar_a_humano": false,
  "motivo_derivacion": null,
  "confianza": 0.95
}
```

Este contrato se guarda en VS Code como `schemas/contrato-agentes.json` y todos los prompts y nodos del sistema se escriben en función de él.

---

### Manejo de errores en sistemas multiagente

Un sistema multiagente introduce nuevos tipos de fallo que el agente único no tenía:

| Tipo de fallo | Qué causa | Cómo manejarlo |
|---|---|---|
| Agente trabajador falla | Timeout, API caída, respuesta inválida | El orquestador detecta el fallo y puede reintentar o derivar a otro agente |
| Respuesta fuera del contrato | El agente devuelve un JSON con campos incorrectos | Validar el schema antes de procesar la respuesta |
| Contradicción entre agentes | Dos agentes dan información contradictoria | El orquestador detecta la contradicción y pide aclaración |
| Bucle infinito | Un agente delega de vuelta al orquestador | Contador de pasos máximos en el orquestador |
| Timeout global | El sistema tarda más de N segundos | Definir un tiempo límite máximo y responder con lo que se tiene |

**La regla de oro del multiagente:** diseñar para el fallo, no para el éxito. Cada agente debe devolver siempre un objeto válido según el contrato — incluyendo cuando falla.

---

### Paralelismo: ejecutar agentes al mismo tiempo

Una de las ventajas más grandes del multiagente es poder ejecutar tareas en paralelo. En n8n, esto se hace con el nodo **Split in Batches** o enviando múltiples solicitudes HTTP Request en paralelo.

**Sin paralelismo (secuencial):**
```
Buscar pedido (2s) → Verificar stock (2s) → Consultar RAG (1.5s) = 5.5s total
```

**Con paralelismo:**
```
Buscar pedido (2s) ─┐
Verificar stock (2s) ┼─ ejecutan al mismo tiempo → 2s total
Consultar RAG (1.5s)─┘
```

Para tareas independientes, el paralelismo puede reducir el tiempo de respuesta a la mitad o más.

---

### Ejemplos reales de sistemas multiagente en industria

El docente muestra tres casos reales para dar contexto:

**Caso 1 — Soporte técnico de un software (estilo Intercom)**
- Agente Triaje: clasifica el ticket y extrae información del sistema del usuario
- Agente Documentación: busca en la base de conocimiento y responde preguntas frecuentes
- Agente Escalada: si el ticket es crítico, crea un ticket en Jira y notifica al ingeniero de guardia
- Agente Follow-up: 24hs después de resolver, envía email de satisfacción

**Caso 2 — Agencia inmobiliaria**
- Agente Búsqueda: interpreta qué busca el cliente y filtra en la base de propiedades
- Agente Valuación: estima el precio según zona, m² y amenities
- Agente Coordinación: agenda visitas y envía confirmaciones
- Agente Seguimiento: hace follow-up con clientes que no respondieron en 48hs

**Caso 3 — Plataforma de e-learning**
- Agente Diagnóstico: evalúa el nivel del estudiante con preguntas adaptativas
- Agente Tutor: responde dudas del contenido del curso
- Agente Progreso: analiza el avance y genera recomendaciones del próximo módulo
- Agente Soporte: maneja consultas técnicas sobre la plataforma

---

## Bloque 2 — Diseño del sistema: cómo dividir responsabilidades (0:50 – 1:15)

### El proceso de diseño de un sistema multiagente

Antes de abrir n8n, hay que responder estas preguntas en papel (o en VS Code):

**1. ¿Cuáles son los tipos de tareas que necesitan agentes distintos?**

Listar todos los tipos de consultas/tareas del negocio y agruparlos por dominio de conocimiento. Dos tareas van en el mismo agente si comparten: el mismo contexto, las mismas herramientas y las mismas reglas de negocio.

**2. ¿Cuál es el criterio de enrutamiento del orquestador?**

El orquestador tiene que poder decidir adónde va cada solicitud sin razonar demasiado. Si el criterio es complejo, el orquestador se convierte en un agente más caro que los trabajadores.

Criterios simples (recomendados):
- Por tipo de consulta detectado (post-venta, producto, reclamo, otro)
- Por canal de origen (email, WhatsApp, formulario)
- Por estado del cliente (cliente activo, cliente nuevo, cliente en reclamo)

**3. ¿Pueden ejecutarse en paralelo o tienen dependencias?**

Mapear qué agentes necesitan el output de otro para funcionar y cuáles son independientes.

**4. ¿Cuál es el formato del contrato de datos?**

Definir el JSON de entrada y salida de cada agente antes de construirlos.

**5. ¿Qué pasa cuando un agente falla?**

Para cada agente: qué hace el orquestador si ese agente no responde, responde lentamente o responde con error.

---

### Diseño del sistema de Lumina en VS Code

El docente abre VS Code y crea el archivo `arquitectura/sistema-multiagente.md`:

```markdown
# Sistema Multiagente — Lumina

## Agentes del sistema

### ORQUESTADOR
Rol: recibir todos los mensajes entrantes, clasificar el tipo de consulta
y delegar al agente correspondiente.
Herramientas propias: ninguna (solo clasifica y delega)
Modelo: gpt-4o-mini (no necesita el más potente, solo clasifica)
Tiempo máximo: 5 segundos

Tipos que reconoce:
- POST_VENTA → Agente Post-Venta
- PRODUCTO → Agente Productos
- RECLAMO_COMPLEJO → Agente Reclamos
- OTRO → respuesta genérica del orquestador mismo

---

### AGENTE POST-VENTA
Rol: resolver consultas sobre pedidos existentes: estado, cambios, tracking.
Herramientas: buscar_pedido, verificar_stock, registrar_cambio
RAG: NO (usa datos estructurados de Sheets, no documentos)
Modelo: gpt-4o
Tiempo máximo: 15 segundos

---

### AGENTE PRODUCTOS
Rol: responder preguntas sobre productos del catálogo.
Herramientas: consultar_base_de_conocimiento (RAG)
RAG: SÍ — catálogo, composición, talles, cuidados
Modelo: gpt-4o
Tiempo máximo: 10 segundos

---

### AGENTE RECLAMOS
Rol: manejar reclamos complejos: productos dañados, errores de envío,
solicitudes de reembolso.
Herramientas: buscar_pedido, registrar_reclamo_formal, consultar_politicas_RAG
RAG: SÍ — políticas de devolución y excepciones
Modelo: gpt-4o
Tiempo máximo: 20 segundos
Siempre notifica al equipo humano.

---

## Contrato de datos

### Entrada a cada agente trabajador
Ver: schemas/contrato-entrada.json

### Salida de cada agente trabajador
Ver: schemas/contrato-salida.json
```

Este diseño en VS Code es la referencia que se usa durante toda la construcción. Cualquier decisión técnica que cambie el diseño se actualiza aquí primero.

---

## Bloque 3 — El sistema de tres agentes de Lumina, construido en vivo (1:15 – 1:40)

### Estructura del flujo en n8n

```
[Gmail Trigger]
      ↓
[Set: extraer campos básicos]
      ↓
[ORQUESTADOR — OpenAI gpt-4o-mini]
      ↓
[Set: parsear la decisión del orquestador]
      ↓
[Switch: enrutar según tipo]
  │
  ├── POST_VENTA → [AGENTE POST-VENTA]
  │                        ↓
  ├── PRODUCTO   → [AGENTE PRODUCTOS]
  │                        ↓
  └── RECLAMO    → [AGENTE RECLAMOS]
                           ↓
         [Merge: reunir la respuesta del agente que ejecutó]
                           ↓
         [Gmail: enviar la respuesta al cliente]
                           ↓
         [Sheets: registrar con el agente que respondió]
```

### El orquestador: prompt mínimo y salida estrictamente tipada

El orquestador tiene que ser rápido y confiable. Su system prompt es deliberadamente corto:

```
Sos el clasificador de consultas de Lumina.
Analizá el mensaje y respondé SOLO con un JSON:
{
  "tipo": "POST_VENTA | PRODUCTO | RECLAMO | OTRO",
  "razon": "una frase que explica la clasificación",
  "urgencia": "baja | media | alta"
}
No agregues nada fuera del JSON.
```

**Por qué el orquestador usa gpt-4o-mini:** la clasificación no requiere razonamiento profundo. gpt-4o-mini es 20 veces más barato y 2 veces más rápido que gpt-4o. Para el orquestador, eso importa porque es el primer nodo que ejecuta cada mensaje.

### El nodo Switch: enrutamiento limpio

En n8n, el nodo Switch lee el campo `tipo` del JSON del orquestador:

```
Switch: {{ JSON.parse($json.message.content).tipo }}
  Caso "POST_VENTA" → conexión al Agente Post-Venta
  Caso "PRODUCTO"   → conexión al Agente Productos
  Caso "RECLAMO"    → conexión al Agente Reclamos
  Fallback          → respuesta genérica del orquestador
```

### Cada agente trabajador: contexto específico y herramientas propias

**Agente Post-Venta — System Prompt:**

```
Sos el agente de post-venta de Lumina. Solo te ocupás de consultas sobre
pedidos que ya fueron realizados: estado, tracking, cambios de talle/color.

SIEMPRE buscá el pedido antes de responder. No asumas nada.
Si el pedido no existe, preguntá al cliente si el email es el correcto.
Si el cliente quiere hacer un cambio, registralo con la herramienta
registrar_cambio y confirmá al cliente que fue registrado.

HERRAMIENTAS DISPONIBLES:
- buscar_pedido: para ver el estado del pedido del cliente
- verificar_stock: para consultar si hay stock del producto alternativo
- registrar_cambio: para iniciar un proceso de cambio

TONO: eficiente, directo, amable. Máximo 3 párrafos.
```

**Agente Productos — System Prompt:**

```
Sos el especialista en productos de Lumina. Respondés preguntas sobre
el catálogo: características, materiales, talles, cuidados, colores, stocks.

SIEMPRE consultá la base de conocimiento antes de responder sobre un producto.
No inventes características de productos. Si no encontrás información, decilo.

HERRAMIENTA DISPONIBLE:
- consultar_base_de_conocimiento: para buscar en el catálogo y FAQs

TONO: entusiasta con los productos, detallado cuando es necesario. Máximo 4 párrafos.
```

**Agente Reclamos — System Prompt:**

```
Sos el gestor de reclamos de Lumina. Manejás situaciones donde algo salió mal:
producto dañado, envío incorrecto, demora extrema, solicitudes de reembolso.

SIEMPRE:
1. Buscá el pedido para verificar los datos.
2. Consultá las políticas de devolución en la base de conocimiento.
3. Registrá el reclamo formalmente con registrar_reclamo_formal.
4. Notificá al equipo humano (esta herramienta lo hace automáticamente).

NUNCA prometás reembolsos sin verificar que aplica según la política.
NUNCA cierres un reclamo sin haberlo registrado formalmente.

HERRAMIENTAS:
- buscar_pedido
- consultar_base_de_conocimiento (para verificar si aplica la política)
- registrar_reclamo_formal (SIEMPRE usar en esta rama)

TONO: empático, claro en los pasos siguientes, sin burocracia.
```

### El nodo Merge: reunir la respuesta

Después del Switch, los tres agentes están en ramas paralelas. El nodo **Merge** en n8n espera a que una de las ramas complete y unifica el output:

- Modo: "Wait for one input" (espera solo la rama que se ejecutó)
- Campo de salida: `respuesta_agente` del JSON que devuelve el agente

### Construcción en vivo: tres casos en paralelo

El docente demuestra el sistema enviando tres emails simultáneamente (desde tres cuentas distintas) y muestra en n8n cómo cada uno toma un camino diferente en tiempo real:

**Email 1** (→ Agente Post-Venta): "¿Cuándo llega el pedido que hice el viernes?"
**Email 2** (→ Agente Productos): "¿La Remera Urban encoge con el lavarropas?"
**Email 3** (→ Agente Reclamos): "Me llegó una remera completamente diferente a la que pedí."

Los tres se procesan en paralelo y cada uno recibe una respuesta específica y apropiada.

---

## Ejercicio práctico (1:40 – 1:55)

> Cada participante diseña el sistema multiagente para su propio negocio.

### Paso 1 — Mapa de agentes (5 min)

En VS Code, crear `arquitectura/sistema-multiagente.md` y completar:

1. ¿Cuántos tipos distintos de consultas llegan al negocio?
2. ¿Cuáles se pueden agrupar en el mismo agente?
3. ¿Cuántos agentes trabajadores necesita el sistema? (recomendación: empezar con 2, no más de 4)
4. ¿Cuál es el criterio de enrutamiento del orquestador?

### Paso 2 — Definir el contrato de datos (5 min)

En VS Code, crear `schemas/contrato-entrada.json` y `schemas/contrato-salida.json` con los campos que cada agente espera recibir y devolver.

### Paso 3 — Configurar el orquestador en n8n (5 min)

- Duplicar el flujo existente
- Agregar el nodo OpenAI con el system prompt del orquestador
- Agregar el nodo Switch conectado a la clasificación del orquestador
- Probar con un mensaje de cada tipo para verificar el enrutamiento

---

## Cierre (1:55 – 2:00)

> El docente cierra con la distinción más importante de la clase:

> Un sistema multiagente no es simplemente "más agentes". Es una forma de pensar la complejidad: dividir una tarea grande en responsabilidades claras, cada una con su propio contexto, sus propias herramientas y sus propias reglas. El peligro es la sobre-ingeniería: agregar agentes innecesarios que agregan latencia y costo sin resolver un problema real. La pregunta siempre tiene que ser: ¿este agente adicional resuelve un límite real del sistema actual, o lo agrego porque puedo?

---

## Tarea de la semana

1. **Implementar el sistema multiagente** diseñado en el ejercicio de la clase.
2. **Probar con al menos 10 mensajes reales** de distintos tipos y verificar que cada uno es enrutado al agente correcto.
3. **Medir la latencia**: registrar cuánto tarda cada agente en responder y si el sistema completo (orquestador + agente) responde en menos de 30 segundos.
4. **Documentar en VS Code** (`arquitectura/decisiones.md`):
   - ¿Por qué elegiste dividir en estos agentes y no en otros?
   - ¿Hubo algún tipo de mensaje que el orquestador enrutó incorrectamente?
   - ¿Qué haría falta para mejorar la precisión del orquestador?
5. **Git commit** de todos los archivos del proyecto: schemas, arquitectura, prompts y changelog.

---

## Recursos y herramientas

| Herramienta | Para qué | Cómo acceder |
|---|---|---|
| n8n (Switch + Merge) | Enrutamiento entre agentes | cloud.n8n.io |
| OpenAI gpt-4o-mini | Orquestador (clasificación rápida y barata) | platform.openai.com |
| OpenAI gpt-4o | Agentes trabajadores (razonamiento complejo) | platform.openai.com |
| VS Code + Git | Diseño, schemas y versionado del sistema | code.visualstudio.com |
| CrewAI (referencia) | Framework Python para multiagente avanzado | crewai.com |
| LangGraph (referencia) | Framework de grafos de agentes (Python) | langchain-ai.github.io/langgraph |

---

## Glosario de la clase

| Término | Definición |
|---|---|
| **Orquestador** | El agente central que recibe todas las solicitudes y decide a quién delegar |
| **Agente trabajador** | Agente especializado en un dominio específico |
| **Contrato de datos** | Esquema JSON acordado para la comunicación entre agentes |
| **Patrón orquestador-trabajador** | Arquitectura donde un agente central coordina a otros especializados |
| **Pipeline secuencial** | Agentes en cadena donde cada uno procesa el output del anterior |
| **Paralelismo** | Ejecución simultánea de múltiples agentes independientes |
| **Latencia** | Tiempo total desde que llega el mensaje hasta que se envía la respuesta |
| **Sobre-ingeniería** | Agregar complejidad (agentes, herramientas) que no resuelve un problema real |

---

*AI Automation — Diplomatura No-Code · Bloque 5: Sistemas avanzados · Clase 22 de 25*
