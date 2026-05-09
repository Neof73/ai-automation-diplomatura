# Clase 25 — De sistema a producto: monetizar y escalar tu automatización

**Bloque 5: Sistemas avanzados · Semana 25 de 25**
**Duración:** 2 horas · **Tipo:** Workshop · **Nivel:** Avanzado

---

## Objetivo de la clase

Que cada participante comprenda la diferencia estructural entre un sistema de automatización personal y un producto vendible, defina el modelo de negocio más apropiado para su sistema, construya los elementos mínimos para empezar a ofrecerlo como servicio y diseñe el roadmap de las próximas 12 semanas de desarrollo. Al terminar, el participante tiene un sistema funcionando, una propuesta de valor clara y un plan concreto para monetizarlo — ya sea como servicio para otros negocios, como mejora interna del propio, o como base de un producto SaaS.

---

## Agenda

| Tiempo | Bloque | Descripción |
|---|---|---|
| 0:00 – 0:15 | Apertura | El cierre del círculo: de la idea al producto |
| 0:15 – 0:50 | Bloque 1 | De sistema a producto: qué cambia y cómo se hace |
| 0:50 – 1:20 | Bloque 2 | Modelos de monetización y cómo elegir el correcto |
| 1:20 – 1:40 | Bloque 3 | El roadmap de las próximas 12 semanas |
| 1:40 – 1:55 | Workshop | Cada participante define su modelo y su primer cliente |
| 1:55 – 2:00 | Cierre final del programa |

---

## Apertura (0:00 – 0:15)

### El recorrido completo en cinco bloques

En el Bloque 1 identificamos qué automatizar y construimos el primer Zap. En el Bloque 2 construimos flujos de múltiples pasos con n8n. En el Bloque 3 conectamos IA para que el sistema comprenda en lugar de solo procesar. En el Bloque 4 construimos el agente que razona y usa herramientas. En el Bloque 5 le dimos memoria persistente, múltiples agentes especializados, capacidades multimodales y lo blindamos para producción.

Ahora el sistema existe y funciona. La pregunta que cierra el programa es la más práctica de todas: **¿a quién más le sirve y cuánto vale?**

### Por qué hay que pensar en esto hoy

Muchos sistemas de automatización excelentes mueren en el escritorio de quien los construyó porque:
- El creador piensa que "todavía no está listo"
- No hay un modelo claro de cómo transferirlo a otro contexto
- El sistema fue construido para el negocio propio y no se pensó para otros
- El mantenimiento requiere tiempo y no hay incentivo económico para darlo

La clase de hoy cierra esa brecha: convierte el sistema de un proyecto en un activo.

---

## Bloque 1 — De sistema a producto: qué cambia y cómo se hace (0:15 – 0:50)

### Las cuatro diferencias entre un sistema y un producto

**Diferencia 1: Configurabilidad**

Un sistema personal tiene los valores hardcodeados en el código:
- El nombre del negocio está en el system prompt
- La URL de Google Sheets es una constante
- Las reglas de negocio específicas están en el flujo

Un producto tiene esos valores como configuración:
- El nombre del negocio es un parámetro de entrada
- La planilla es una variable que el cliente configura
- Las reglas de negocio se configuran en una interfaz, no en el código

**Diferencia 2: Onboarding**

Un sistema personal se entiende porque fue construido por quien lo usa. Un producto necesita un proceso de incorporación que permita a un nuevo cliente empezarlo a usar sin ayuda del creador.

El onboarding mínimo de un sistema de automatización incluye:
1. Guía de instalación (conectar credenciales, configurar herramientas)
2. Guía de configuración (adaptar el sistema al negocio del cliente)
3. Guía de operación (cómo monitorear, qué hacer cuando algo falla)
4. Guía de ajuste (cómo personalizar los prompts para el caso específico)

**Diferencia 3: Soporte**

Un sistema personal no necesita soporte — si algo falla, el creador lo arregla. Un producto necesita un canal de soporte y SLAs (Service Level Agreements): compromisos de tiempo de respuesta y resolución.

Un SLA mínimo para un producto de automatización:
- Tiempo de respuesta ante incidentes críticos: 4 horas hábiles
- Tiempo de resolución de bugs: 5 días hábiles
- Disponibilidad del sistema: 99% mensual (equivale a ~7 horas de downtime)

**Diferencia 4: Documentación**

Un sistema personal puede ser documentado de forma mínima — el creador recuerda cómo funciona. Un producto necesita documentación que permita a cualquier persona entenderlo, operarlo y modificarlo sin depender del creador.

La documentación mínima de un producto de automatización:

```
📁 docs/
  📄 arquitectura.md        — cómo está construido el sistema
  📄 configuracion.md       — cómo configurarlo para un nuevo cliente
  📄 operacion.md           — cómo monitorearlo y operarlo
  📄 troubleshooting.md     — los errores más comunes y cómo resolverlos
  📄 changelog.md           — historial de versiones y cambios
  📄 prompts/               — todos los system prompts con explicación
```

---

### El Mínimo Producto Viable de un sistema de automatización

No hace falta que el sistema esté perfecto para ofrecerlo. Hace falta que resuelva el problema central con suficiente calidad.

**El MVP de un sistema de atención al cliente con IA:**

| Funcionalidad | Incluir en MVP | Dejar para después |
|---|---|---|
| Clasificación de mensajes por tipo | Sí | — |
| Respuesta automática a consultas simples | Sí | — |
| Alerta al equipo para casos urgentes | Sí | — |
| Registro en planilla | Sí | — |
| Reporte semanal | Sí | — |
| Base de conocimiento con RAG | Opcional en MVP | Sí, en v2 |
| Sistema multiagente | No en MVP | Sí, en v2 |
| Procesamiento de imágenes | No en MVP | Sí, según necesidad |
| Dashboard de ROI avanzado | No en MVP | Sí, en v2 |

La regla: el MVP resuelve el 80% del problema para el 80% de los clientes. El 20% restante viene después, cuando hay feedback real.

---

### Cómo hacer el sistema configurable sin programar

El desafío técnico de convertir un sistema en un producto es hacerlo configurable. Hay tres enfoques según la complejidad:

**Enfoque 1 — Configuración en Google Sheets (más simple)**

Crear una hoja "Configuración" en la planilla del sistema con todas las variables que cambian por cliente:

```
A1: Nombre del negocio         | B1: Lumina
A2: Email de alertas           | B2: equipo@lumina.com
A3: Canal de Slack             | B3: #alertas-clientes
A4: Tono de las respuestas     | B4: cálido y directo
A5: Máximo de tokens           | B5: 400
A6: Umbral de escalada         | B6: negativo_fuerte
```

En n8n, el primer nodo del flujo lee esta hoja y expone las variables para el resto del flujo:

```javascript
// Nodo Code: cargar configuración
const config = {};
$input.all().forEach(row => {
  config[row.json['Variable']] = row.json['Valor'];
});
return [{ json: { config } }];
```

Todos los nodos siguientes usan `{{ $json.config.nombre_negocio }}` en lugar de valores hardcodeados.

**Enfoque 2 — Formulario de onboarding con Typeform o Google Forms**

Crear un formulario que el nuevo cliente completa con la información de su negocio. Las respuestas llenan automáticamente la planilla de configuración. El flujo se activa y el sistema queda configurado.

Este es el patrón que usan muchos productos SaaS para el onboarding: el cliente configura el producto respondiendo preguntas, no editando código.

**Enfoque 3 — Panel de administración con n8n Form (avanzado)**

n8n tiene nodos de formulario que permiten construir interfaces de configuración sin código adicional. El cliente accede a un formulario en n8n, completa su configuración y el flujo la aplica automáticamente.

---

## Bloque 2 — Modelos de monetización y cómo elegir el correcto (0:50 – 1:20)

### Los cinco modelos de monetización para automatización con IA

**Modelo 1 — Implementación puntual (proyecto)**

El creador implementa el sistema para un cliente específico, lo configura y lo entrega. El cliente paga una vez.

```
Propuesta de valor: "Te construyo e instalo el sistema de atención con IA adaptado
a tu negocio. En 2-4 semanas tenés el sistema funcionando."

Precio típico: $200.000 a $800.000 ARS (o $500 a $2.000 USD)
Según: complejidad, cantidad de herramientas, tiempo de personalización.

Ventajas: ingreso inmediato, sin compromisos de largo plazo.
Desventajas: no hay ingreso recurrente, el cliente puede requerir ajustes futuros.
```

**Modelo 2 — Implementación + mantenimiento mensual**

El creador implementa el sistema y cobra una cuota mensual por mantenerlo, actualizarlo y dar soporte.

```
Propuesta de valor: "Implemento el sistema y me ocupo de mantenerlo funcionando.
Actualizo los prompts cuando cambia el negocio, monitoreo errores y ajusto
el sistema según el feedback."

Precio típico:
  Implementación: $300.000 a $600.000 ARS (cobro único)
  Mantenimiento: $30.000 a $80.000 ARS/mes

Ventajas: ingreso recurrente predecible.
Desventajas: el cliente puede cancelar, hay trabajo mensual continuo.
```

**Modelo 3 — SaaS (Software as a Service)**

Construir un sistema multi-tenant donde múltiples clientes pagan una cuota mensual por acceder a la misma infraestructura, configurada para cada uno.

```
Propuesta de valor: "Acceso al sistema de atención con IA para tu tienda online.
Configuración en 30 minutos. Sin contratos, cancelá cuando quieras."

Precio típico: $15.000 a $50.000 ARS/mes por cliente

Ventajas: escala sin aumentar proporcional el trabajo; ingreso predecible.
Desventajas: requiere más infraestructura técnica; la configuración multi-tenant
es más compleja; el soporte puede escalar con el volumen de clientes.
```

**Modelo 4 — Consultoría de automatización**

Usar el sistema como demostración de capacidades y vender servicios de consultoría para diseñar e implementar sistemas de automatización más amplios.

```
Propuesta de valor: "Analizamos los procesos de tu negocio, identificamos
las oportunidades de automatización y las implementamos en 4-8 semanas."

Precio típico: $150 a $500 USD por hora de consultoría + implementación

Ventajas: proyectos grandes y bien pagados, relaciones de largo plazo.
Desventajas: alta inversión de tiempo por proyecto, no escala fácilmente.
```

**Modelo 5 — Producto vertical específico**

Construir un sistema específico para un tipo de negocio particular y ofrecerlo como un producto vertical: "sistema de atención con IA para peluquerías", "para clínicas veterinarias", "para estudios contables".

```
Propuesta de valor: "El sistema de atención automatizada diseñado
específicamente para [tipo de negocio]. Instalación en 1 hora.
Conoce los términos y procesos de tu industria."

Precio típico: $20.000 a $60.000 ARS/mes

Ventajas: el sistema se reutiliza en múltiples clientes del mismo sector;
menor tiempo de personalización por cliente; se puede especializar el
sistema profundamente en un sector.
Desventajas: el mercado es más pequeño; riesgo de sobre-especialización.
```

### Cómo elegir el modelo correcto

El docente guía al grupo con estas preguntas:

**1. ¿Cuántos clientes potenciales hay?**
- Si el mercado es amplio (todas las tiendas online), SaaS o vertical
- Si el mercado es nicho (despachos de abogados especializados), proyecto + mantenimiento o consultoría

**2. ¿Cuánto tiempo tenés para dedicarle?**
- Si es adicional al negocio propio: proyectos puntuales o SaaS con mínimo soporte
- Si es el negocio principal: cualquier modelo, con foco en escala

**3. ¿Qué experiencia de venta tenés?**
- Sin experiencia comercial: empezar con 1-2 clientes piloto y modelo de mantenimiento
- Con experiencia en ventas: SaaS o consultoría son más escalables

**4. ¿Qué necesita tu primer cliente?**
- El primer cliente siempre enseña más que cualquier análisis. Encontrarlo primero y adaptar el modelo después es más efectivo que diseñar el modelo en el aire.

---

### Cómo calcular el precio

El precio de un sistema de automatización se puede calcular de tres formas. Idealmente se usan las tres y se elige el precio que tenga sentido en el contexto.

**Método 1 — Costo + margen**

```
Tiempo de implementación (horas) × valor hora = costo de implementación
Costo mensual de herramientas (n8n, OpenAI, Supabase)
Tiempo de mantenimiento mensual × valor hora

Precio = costo total × margen (2x a 5x según el valor percibido)
```

**Método 2 — Valor generado**

```
El sistema ahorra X horas/mes al cliente.
Esas horas valen $Y para el cliente (costo del empleado o del dueño).
El precio debería ser una fracción de ese valor: 20% a 40%.

Ejemplo:
Sistema ahorra 10 horas/mes × $2.500/hora = $25.000/mes de valor
Precio del sistema: $5.000 a $10.000/mes (20-40% del valor generado)
```

**Método 3 — Precio de mercado (benchmarking)**

Investigar qué cobran otros proveedores de automatización similares en Argentina y el mundo. Ajustar según la diferenciación y el valor específico del propio sistema.

---

## Bloque 3 — El roadmap de las próximas 12 semanas (1:20 – 1:40)

### Por qué el roadmap importa más que el plan perfecto

La tentación al terminar el programa es seguir mejorando el sistema indefinidamente antes de ofrecerlo. Eso es procrastinación disfrazada de perfeccionismo.

La realidad del desarrollo de productos: el feedback de un cliente real en semana 4 vale más que 8 semanas de mejoras sin feedback. El sistema no va a ser perfecto cuando lo ofrezcan por primera vez — y no tiene que serlo.

### El roadmap de 12 semanas

**Semanas 1-2 — Convertir el sistema en producto**

| Tarea | Resultado esperado |
|---|---|
| Hacer el sistema configurable (Enfoque 1 o 2) | La configuración se puede cambiar sin tocar el flujo de n8n |
| Escribir la guía de configuración (1 página) | Un nuevo cliente puede configurarlo solo |
| Definir el modelo de monetización | Precio claro y propuesta de valor en 2 oraciones |
| Hacer el primer commit de producción en Git | El código está versionado y documentado |

**Semanas 3-4 — Conseguir el primer cliente (piloto)**

| Tarea | Resultado esperado |
|---|---|
| Identificar 5 negocios que tendrían el problema que el sistema resuelve | Lista de 5 candidatos con nombre y contacto |
| Contactar los 5 (email, WhatsApp, reunión) | Al menos 1 reunión o llamada agendada |
| Ofrecer el sistema a precio de piloto (50-70% de descuento) a cambio de feedback | 1 cliente piloto acordado |
| Implementar el sistema para el cliente piloto | Sistema corriendo en el negocio del cliente |

El precio de piloto no es caridad — es inversión en feedback y en un caso de éxito que se puede usar como referencia.

**Semanas 5-8 — Iterar con el piloto**

| Tarea | Resultado esperado |
|---|---|
| Reunión semanal de 30 min con el cliente piloto | Feedback estructurado sobre qué funciona y qué no |
| Ajustar el sistema según el feedback real | Al menos 3 mejoras concretas implementadas |
| Documentar los ajustes en el changelog | Registro de por qué cada cambio se hizo |
| Calcular el ROI real para el cliente piloto | Número concreto de valor generado (horas, pesos) |

**Semanas 9-12 — Escalar**

| Tarea | Resultado esperado |
|---|---|
| Usar el caso del piloto como referencia comercial | "Implementamos este sistema para [negocio], logramos X resultado" |
| Contactar 10 negocios más con la referencia del piloto | Al menos 2-3 reuniones |
| Cerrar el segundo cliente a precio completo | Primer ingreso sin descuento de piloto |
| Evaluar si escalar: ¿el modelo actual es sostenible? | Decisión informada sobre el siguiente paso |

---

## Workshop — Cada participante define su modelo y su primer cliente (1:40 – 1:55)

> 15 minutos de trabajo individual intenso. El docente y asistentes circulan para ayudar con las decisiones.

### Los tres entregables del workshop

**Entregable 1 — La propuesta de valor en 2 oraciones (3 min)**

Completar:

```
Mi sistema [nombre o descripción breve] ayuda a [tipo de negocio]
a [resultado concreto medible] sin necesidad de [lo que reemplaza].

Lo construí durante [nombre del programa] y ya está procesando
[X mensajes / tareas / eventos] por semana en mi propio negocio
con un ROI de [porcentaje o número].
```

Escribir esto en VS Code (`producto/propuesta-valor.md`). Leerlo en voz alta. Si lleva más de 15 segundos decirlo, es demasiado largo.

---

**Entregable 2 — El modelo de monetización elegido (5 min)**

Completar en VS Code (`producto/modelo-negocio.md`):

```markdown
## Modelo elegido
[Proyecto / Proyecto+Mantenimiento / SaaS / Consultoría / Vertical]

## Por qué este modelo
[2-3 razones concretas basadas en el mercado, el tiempo disponible
y la experiencia comercial]

## Precio
Implementación: $[X] (si aplica)
Cuota mensual: $[X]/mes (si aplica)
Cómo lo calculé: [costo+margen / valor generado / benchmarking]

## Mi primer cliente ideal
Tipo de negocio: [descripción]
Problema específico que resuelve el sistema: [descripción]
Cómo voy a contactarlo: [email / WhatsApp / LinkedIn / referencia]
```

---

**Entregable 3 — El nombre del primer prospecto (2 min)**

Escribir el nombre de una persona o negocio específico que podría ser el primer cliente piloto. No tiene que ser la persona perfecta — tiene que ser real y accesible.

Si no se ocurre ninguno ahora, escribir el tipo de negocio y el canal de contacto preferido. El primer prospecto se puede encontrar en los próximos 7 días.

---

## Cierre final del programa (1:55 – 2:00)

### Lo que el programa no puede darte

El programa enseñó las herramientas, los conceptos y los patrones. Lo que el programa no puede dar son los tres factores que determinan si el sistema se convierte en un negocio:

**1. El primer cliente.** Nadie más lo puede conseguir por vos. El sistema más sofisticado del mundo no vale nada si no hay un cliente que lo use y lo pague.

**2. La persistencia.** El primer intento de vender va a ser imperfecto. El primer cliente va a encontrar bugs. El sistema va a fallar en algún momento. La diferencia entre quien construye un negocio y quien construye un proyecto está en qué pasa después de esos primeros fallos.

**3. El tiempo.** Los sistemas de automatización mejoran con uso. Un sistema que lleva 6 meses procesando eventos reales y ajustándose según el feedback es incomparablemente mejor que uno recién salido del programa. El tiempo en producción es irreemplazable.

### Las tres preguntas para las próximas 12 semanas

El docente termina el programa con tres preguntas que cada participante debería poder responder en 90 días:

1. **¿A quién ayudaste a ahorrar tiempo con tu sistema?** (el nombre de un cliente real, no del negocio propio)
2. **¿Cuánto mejoró el sistema desde que terminaste el programa?** (en métricas concretas)
3. **¿Cuánto cobraste por eso?** (puede ser $0 en el piloto — pero tiene que ser un número)

### La última frase del programa

> Un sistema de IA que nadie usa no vale nada. Un sistema mediocre que resuelve el problema real de diez negocios vale todo. No busquen el sistema perfecto — busquen el primer cliente que lo necesite hoy.

---

## Resumen del Bloque 5 completo

**Lo que sabés hacer ahora:**

- Construir una base de conocimiento con RAG usando Supabase y embeddings de OpenAI, y conectarla al agente para respuestas basadas en documentos del negocio
- Diseñar e implementar sistemas multiagente con orquestador y trabajadores especializados, con contratos de datos y manejo de errores
- Procesar imágenes con GPT-4o Vision, extraer datos de PDFs digitales y escaneados, y transcribir audio con Whisper en flujos de n8n
- Identificar y mitigar los vectores de ataque específicos de sistemas con IA (prompt injection, jailbreak, indirect injection)
- Manejar credenciales de forma segura con VS Code, `.env` y `.gitignore`
- Configurar límites de costo y monitoreo en producción
- Definir un modelo de monetización y una propuesta de valor para convertir el sistema en un producto o servicio

**Lo que construiste:**

- Base de conocimiento indexada con fragmentos del catálogo, políticas y FAQs del negocio
- Sistema multiagente con orquestador y al menos dos agentes especializados
- Flujo con al menos una capacidad multimodal: imagen, PDF o audio
- Sistema auditado con la checklist de seguridad y producción
- Propuesta de valor, modelo de monetización y roadmap de 12 semanas

---

## Recursos para seguir creciendo después del programa

### Comunidades

| Comunidad | Foco | Dónde |
|---|---|---|
| n8n Community | Flujos, herramientas, problemas técnicos | community.n8n.io |
| OpenAI Developer Forum | API, modelos, casos de uso | community.openai.com |
| r/nocode | No-code en general | reddit.com/r/nocode |
| Latam Automation (WhatsApp/Slack) | Automatización en español | Por referencia del programa |

### Herramientas para el siguiente nivel

| Herramienta | Para qué | Cuándo aprender |
|---|---|---|
| **LangChain** | Framework Python para agentes avanzados | Cuando n8n sea insuficiente |
| **LangGraph** | Agentes con estado y grafos de razonamiento | Para sistemas muy complejos |
| **Pinecone** | Base de datos vectorial de alto rendimiento | Cuando Supabase no escale |
| **Flowise** | Constructor visual de agentes LangChain | Alternativa más visual a n8n para IA |
| **Dify** | Plataforma para construir apps con LLMs | Para productos SaaS rápidos |
| **Retell AI** | Agentes de voz para llamadas | Si el caso es atención telefónica |

### Certificaciones relevantes

- **n8n Certified Integration Specialist** — certifica conocimiento de n8n
- **OpenAI API Usage Certification** — en desarrollo (verificar disponibilidad)
- **Google Cloud Professional ML Engineer** — para quien quiera profundizar en infraestructura

---

*AI Automation — Diplomatura No-Code · Bloque 5: Sistemas avanzados · Clase 25 de 25*

---

*Fin del programa completo — AI Automation Diplomatura No-Code · 25 semanas · 50 horas de clase*
