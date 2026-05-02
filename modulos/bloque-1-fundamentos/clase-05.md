# Clase 05 — Entregable 1: Mapa de automatización de tu negocio

**Bloque 1: Fundamentos · Semana 5 de 20**
**Duración:** 2 horas · **Tipo:** Entregable · **Nivel:** Introductorio

---

## Objetivo de la clase

Que cada participante presente el mapa de automatización de su negocio — un documento estratégico con los 3 procesos prioritarios, el tiempo que recuperan al automatizarlos y la hoja de ruta para las próximas semanas. Es el cierre del Bloque 1 y la base de todo lo que se construye en los bloques 2, 3 y 4.

---

## Agenda

| Tiempo | Bloque | Descripción |
|---|---|---|
| 0:00 – 0:15 | Apertura | Contexto del entregable y criterios de evaluación |
| 0:15 – 0:35 | Bloque 1 | Cómo armar el mapa: estructura y contenido |
| 0:35 – 1:00 | Trabajo individual | Tiempo para terminar y pulir el mapa |
| 1:00 – 1:45 | Presentaciones | Cada participante presenta su mapa (5–7 min cada uno) |
| 1:45 – 1:55 | Cierre del bloque | Síntesis de lo aprendido y preview del Bloque 2 |
| 1:55 – 2:00 | Tarea | Preparación para la semana 6 |

---

## Apertura (0:00 – 0:15)

### ¿Qué es el mapa de automatización?

No es un flujo técnico. No es un diagrama de programación. Es un documento de negocio que responde tres preguntas:

1. **¿Qué procesos de mi negocio voy a automatizar?**
2. **¿En qué orden los voy a atacar?**
3. **¿Cuánto tiempo y dinero recupero si lo hago?**

Es la misma conversación que cualquier dueño de negocio debería tener antes de invertir tiempo en cualquier herramienta nueva. Solo que en este caso, al final de esa conversación, vas a tener las habilidades para ejecutarlo vos mismo.

### Por qué es importante presentarlo

Presentar algo en voz alta tiene un efecto que leer y escribir no tienen: obliga a ser concreto. Cuando tenés que explicarle a otra persona qué proceso querés automatizar y por qué, los detalles vagos se vuelven evidentes y los huecos en el razonamiento aparecen solos.

Además, escuchar los mapas de los demás es una de las partes más valiosas de la clase — cada negocio distinto es una fuente de ideas para el propio.

### Criterios de una buena presentación

Una buena presentación del mapa cubre estos cinco puntos:

| Punto | Descripción |
|---|---|
| **Contexto del negocio** | Qué hace el negocio, cuál es el volumen de operación relevante |
| **Los 3 procesos elegidos** | Nombre, descripción breve, tiempo semanal actual |
| **Justificación de la prioridad** | Por qué estos 3 y no otros |
| **La frase "cuando X → Y"** | Para cada proceso, el disparador y la acción esperada |
| **El impacto estimado** | Horas semanales recuperadas, proyección anual |

No hace falta slides ni formato especial. Puede ser una planilla, un documento o incluso explicado de memoria — lo importante es el contenido.

---

## Bloque 1 — Cómo armar el mapa (0:15 – 0:35)

### Estructura del mapa de automatización

El docente muestra en pantalla el mapa completo de Lumina como ejemplo de referencia.

---

#### Mapa de Automatización — Lumina (ejemplo)

**Negocio:** Lumina — Tienda de productos para el hogar
**Volumen:** 40–80 consultas de clientes por día · 150–200 pedidos por semana

---

**Proceso 1 — Respuesta a consultas de estado de pedido**

- **Descripción:** un cliente escribe por email o WhatsApp preguntando dónde está su pedido. Alguien del equipo busca el pedido manualmente en el sistema y responde.
- **Frecuencia:** 35 veces por semana
- **Tiempo por instancia:** 4 minutos
- **Tiempo total semanal:** 140 minutos (2 horas 20 minutos)
- **Tiempo anual:** ~116 horas
- **Frase:** *"Cuando llega un email preguntando por un pedido → el sistema busca el estado en la planilla y responde automáticamente con la información actualizada."*
- **Herramientas necesarias:** Gmail, Google Sheets, n8n, ChatGPT
- **Se construye en:** Semanas 6, 11, 12

---

**Proceso 2 — Registro de consultas entrantes**

- **Descripción:** cada consulta que llega se anota manualmente en una planilla para hacer seguimiento. Si no se anota, se pierde el historial.
- **Frecuencia:** 50 veces por semana
- **Tiempo por instancia:** 2 minutos
- **Tiempo total semanal:** 100 minutos (1 hora 40 minutos)
- **Tiempo anual:** ~83 horas
- **Frase:** *"Cuando llega cualquier mensaje nuevo → el sistema lo registra automáticamente en la planilla con fecha, canal y contenido."*
- **Herramientas necesarias:** Gmail, Google Sheets, n8n
- **Se construye en:** Semana 6

---

**Proceso 3 — Reporte semanal de atención al cliente**

- **Descripción:** cada lunes, alguien del equipo arma un resumen de las consultas de la semana anterior: cuántas llegaron, de qué tipo, cuántas se resolvieron, cuáles quedaron pendientes.
- **Frecuencia:** 1 vez por semana
- **Tiempo por instancia:** 45 minutos
- **Tiempo total semanal:** 45 minutos
- **Tiempo anual:** ~37 horas
- **Frase:** *"Cada lunes a las 9am → el sistema genera el resumen de la semana y lo envía por email al dueño."*
- **Herramientas necesarias:** Google Sheets, n8n, ChatGPT
- **Se construye en:** Semana 14

---

**Resumen de impacto:**

| | Tiempo semanal | Horas anuales |
|---|---|---|
| Proceso 1 | 140 min | 116 hs |
| Proceso 2 | 100 min | 83 hs |
| Proceso 3 | 45 min | 37 hs |
| **Total** | **285 min (4 hs 45 min)** | **~236 hs** |

> Automatizar estos 3 procesos equivale a recuperar casi 6 semanas de trabajo al año.

---

### Lo que debe tener cada mapa

El docente explica que el mapa no tiene que ser perfecto — tiene que ser honesto y concreto. Dos advertencias frecuentes:

**Advertencia 1 — No sobrestimar el impacto**
Es tentador poner tiempos altos para que el resultado suene impresionante. Pero un mapa con números inflados es inútil — no va a coincidir con la realidad cuando empieces a construir. Medí lo que realmente tardás.

**Advertencia 2 — No elegir procesos por complejidad**
Los procesos más vistosos no son siempre los más valiosos. Un proceso que lleva 3 horas semanales y es fácil de automatizar vale más que uno que lleva 30 minutos y requiere IA compleja. Priorizá impacto real.

---

## Tiempo de trabajo individual (0:35 – 1:00)

25 minutos para que cada participante termine y organice su mapa antes de presentarlo.

El docente y los asistentes del programa circulan y ayudan a quien lo necesite.

**Lista de verificación antes de presentar:**

- [ ] El mapa tiene exactamente 3 procesos (ni más, ni menos)
- [ ] Cada proceso tiene nombre, descripción, frecuencia y tiempo medido
- [ ] Cada proceso tiene la frase "cuando X → el sistema debería Y"
- [ ] El impacto anual está calculado para cada proceso
- [ ] El total de tiempo recuperable está sumado
- [ ] Puedo explicar por qué elegí estos 3 y no otros

---

## Presentaciones (1:00 – 1:45)

Cada participante tiene **5 a 7 minutos** para presentar su mapa. El docente mantiene el tiempo.

### Formato de presentación sugerido

1. **(30 seg) Contexto:** "Tengo [tipo de negocio], manejamos [volumen relevante] por semana/mes."
2. **(3 min) Los 3 procesos:** para cada uno, nombre + tiempo semanal + la frase "cuando X → Y".
3. **(1 min) El impacto:** cuántas horas semanales y anuales recuperan en total.
4. **(1 min) Por qué estos 3:** qué criterio usaron para priorizar.

### Ronda de feedback

Después de cada presentación, el grupo tiene 1 minuto para hacer una observación o pregunta. El docente guía con estas preguntas:

- ¿Le falta algún proceso que vos también tenés y no consideraste?
- ¿El tiempo estimado parece realista?
- ¿La frase "cuando X → Y" describe el proceso con precisión suficiente?

---

## Cierre del Bloque 1 (1:45 – 1:55)

### Lo que construimos en estas 5 semanas

| Clase | Lo que aprendiste | Lo que construiste |
|---|---|---|
| 01 | Qué procesos se pueden automatizar | Lista de procesos con tiempo medido |
| 02 | Cómo darle instrucciones a la IA | 3 prompts funcionales para tu negocio |
| 03 | Cómo organizar los datos para que los use un flujo | Tabla de datos lista para conectar |
| 04 | Cómo construir una automatización real | Primer Zap funcionando en el negocio |
| 05 | Cómo priorizar y presentar una estrategia de automatización | Mapa de automatización completo |

### Lo que viene en el Bloque 2

El Bloque 2 arranca la semana que viene y es donde la cosa se pone práctica en serio. Vamos a construir flujos reales con n8n — una herramienta más poderosa que Zapier que permite flujos de varios pasos, lógica condicional y conexiones más complejas.

El caso Lumina avanza: en la semana 6 construimos el primer flujo completo del agente — el que captura cada consulta entrante y la registra automáticamente.

**Para la semana 6 necesitás:**
- Una cuenta activa en n8n Cloud (cloud.n8n.io — plan gratuito)
- Tu tabla de datos de la clase 3 completa y limpia
- Los prompts de la clase 2 con variables `{{campo}}`

### El mensaje para llevarse del Bloque 1

> Automatizar no es un proyecto de tecnología. Es una decisión de negocio. Las herramientas cambian, las plataformas evolucionan, los precios varían. Lo que no cambia es la lógica: identificar qué tarea repetitiva consume tiempo, entender qué información necesita para funcionar sola, y definir exactamente qué tiene que hacer cuando se activa. Todo lo que vimos en estas 5 semanas es esa lógica — aplicada a herramientas concretas, con ejemplos reales.

---

## Tarea para la semana 6 (1:55 – 2:00)

### Preparación para el Bloque 2

1. **Crear cuenta en n8n Cloud**
   - Ir a cloud.n8n.io
   - Registrarse con email (plan gratuito disponible)
   - No hace falta configurar nada — solo tener la cuenta activa

2. **Revisar y limpiar la tabla de datos**
   - Verificar que tiene al menos 20 registros
   - Confirmar que no hay campos vacíos en las columnas clave (email, estado, fecha)
   - Asegurarse de que las columnas de tipo lista usan valores consistentes

3. **Revisar los prompts con variables**
   - Abrir los 3 prompts de la clase 2
   - Confirmar que los campos de datos están marcados con `{{nombre_del_campo}}`
   - Verificar que los nombres de los campos coinciden con los nombres de columna de la tabla

4. **Leer el mapa de automatización una vez más**
   - ¿El proceso prioritario número 1 sigue siendo el mismo después de 4 semanas de práctica?
   - ¿Hay algo que cambiarías después de haber construido el primer Zap?

---

## Recursos del Bloque 2

| Herramienta | Para qué | Cómo acceder |
|---|---|---|
| n8n Cloud | Motor principal de automatizaciones del Bloque 2 | cloud.n8n.io — plan gratuito |
| Google Sheets | Tabla de datos (ya configurada) | sheets.google.com |
| Gmail | Canal de entrada de consultas | Cuenta existente |

---

## Resumen del Bloque 1

**Lo que sabés hacer ahora:**
- Identificar y priorizar los procesos de tu negocio con mayor potencial de automatización
- Escribir prompts efectivos para ChatGPT y Gemini adaptados a casos reales de tu negocio
- Estructurar datos en Google Sheets o Airtable de forma que un flujo automático pueda leerlos
- Construir y activar un Zap en Zapier que conecta dos herramientas reales
- Presentar una estrategia de automatización con impacto estimado y orden de ejecución

**Lo que construiste:**
- Mapa de automatización con 3 procesos prioritarios y proyección de impacto anual
- 3 prompts funcionales listos para integrar en flujos
- Tabla de datos del negocio lista para conectar
- Primer flujo automatizado activo en el negocio

**Lo que viene:**
- Bloque 2: construir flujos completos con n8n, lógica condicional, conexión a WhatsApp, Slack y Notion

---

*AI Automation — Diplomatura No-Code · Bloque 1: Fundamentos · Clase 05 de 20*
