# Clase 19 — Taller final: pulir, testear y preparar la demo

**Bloque 4: Agente completo · Semana 19 de 20**
**Duración:** 2 horas · **Tipo:** Workshop · **Nivel:** Avanzado

---

## Objetivo de la clase

Que cada participante llegue al Demo Day con un sistema probado, documentado y listo para presentar en vivo sin sorpresas. Al terminar, el sistema tiene que haber pasado por un proceso de testing estructurado, tener una narrativa de presentación clara y funcionar end-to-end en condiciones reales.

---

## Agenda

| Tiempo | Bloque | Descripción |
|---|---|---|
| 0:00 – 0:15 | Apertura | Qué significa "estar listo para el Demo Day" |
| 0:15 – 0:40 | Bloque 1 | Testing estructurado: cómo probar un sistema de IA |
| 0:40 – 1:00 | Bloque 2 | Preparar la narrativa y la demo en 10 minutos |
| 1:00 – 1:45 | Workshop | Taller de pulido individual con ensayos |
| 1:45 – 1:55 | Cierre | Ensayo general con feedback del grupo |
| 1:55 – 2:00 | Tarea | Instrucciones finales para el Demo Day |

---

## Apertura (0:00 – 0:15)

### El sistema terminado vs. el sistema listo para demo

Hay una diferencia entre un sistema que funciona y un sistema listo para mostrar en vivo frente a un grupo. La diferencia no está en el código — está en la preparación.

Un sistema no preparado para demo falla de estas formas:
- La credencial de la API expiró la noche anterior y nadie lo vio
- El email de prueba llega pero el flujo no se activa porque el filtro tiene un typo
- El agente funciona bien pero la respuesta tarda 45 segundos y el silencio se hace incómodo
- El docente hace una pregunta sobre el ROI y el número no estaba calculado

Estas situaciones no tienen nada que ver con si el sistema está bien construido — son fallas de preparación. Hoy cerramos esas brechas.

### La diferencia entre mostrar y demostrar

**Mostrar** es abrir n8n y describir qué hace cada nodo.

**Demostrar** es activar un evento real frente al grupo y mostrar, en tiempo real, cómo el sistema lo procesa de punta a punta.

El Demo Day requiere demostrar, no mostrar. Todo el taller de hoy está orientado a que la demo en vivo funcione sin dudas.

---

## Bloque 1 — Testing estructurado: cómo probar un sistema de IA (0:15 – 0:40)

### Los tres niveles de testing

Un sistema de automatización + IA tiene tres niveles que hay que probar por separado antes de la demo.

**Nivel 1 — Testing de componentes (¿cada parte funciona sola?)**

Probar cada nodo individualmente antes de probar el flujo completo:
- El trigger: ¿recibe el evento correctamente?
- La credencial: ¿la conexión a Gmail / Sheets / Slack sigue activa?
- El nodo de clasificación IA: ¿clasifica correctamente los casos típicos?
- El agente: ¿usa las herramientas correctas para los casos de prueba?
- El nodo de reporte: ¿lee bien los datos de la planilla?

**Cómo probar en n8n:** hacer clic en cada nodo → "Test step" → verificar que los datos de entrada y salida son los esperados.

**Nivel 2 — Testing de flujo (¿el camino completo funciona?)**

Ejecutar el flujo de punta a punta con casos de prueba controlados:

| Tipo de caso | Qué probar | Resultado esperado |
|---|---|---|
| Caso feliz | El caso más común y esperado | El flujo lo resuelve completamente |
| Caso borde | Un caso válido pero inusual | El flujo lo maneja sin romperse |
| Caso de error | Datos faltantes o incorrectos | El flujo maneja el error y notifica |
| Caso de escalada | Un caso que supera al agente | El agente deriva correctamente |

**Nivel 3 — Testing de carga (¿funciona bajo volumen?)**

Enviar varios mensajes seguidos (5-10) y verificar que el flujo los procesa todos correctamente, sin que uno interfiera con el siguiente.

Esto es importante si el flujo usa operaciones de lectura/escritura en Google Sheets — el servicio tiene límites de llamadas por minuto.

### La checklist de testing pre-Demo Day

El docente proyecta esta lista y recomienda completarla hoy durante el workshop:

**Infraestructura:**
- [ ] Las credenciales de Gmail están activas (probar enviando un email y verificar que el trigger lo detecta)
- [ ] La credencial de OpenAI está activa y tiene saldo
- [ ] Las credenciales de Google Sheets están activas
- [ ] El flujo de n8n está en estado "Active"
- [ ] El workflow de errores global está configurado y funciona

**Flujo de entrada:**
- [ ] Enviar un email de consulta → verificar que llega a Sheets y se clasifica correctamente
- [ ] Enviar un email de reclamo → verificar que genera la alerta correcta
- [ ] Enviar un email ambiguo → verificar cómo lo clasifica el agente

**Agente:**
- [ ] Probar el agente con una consulta de un dato que existe en la planilla
- [ ] Probar el agente con una consulta de un dato que NO existe → verificar que el agente lo maneja
- [ ] Probar el agente con una consulta compleja de múltiples partes

**Reporte:**
- [ ] Ejecutar el reporte manualmente → verificar que lee los datos correctos
- [ ] Verificar que el email / Slack del reporte llega al destinatario correcto

**Dashboard:**
- [ ] Abrir el dashboard y verificar que las fórmulas calculan con los datos actuales
- [ ] Verificar que los números del ROI son correctos con los datos de la última semana

### Cómo documentar los bugs encontrados en VS Code

Crear el archivo `testing/pre-demo-bugs.md`:

```markdown
# Bugs encontrados en el testing pre-Demo Day

## Bug 1
- **Descripción:** [qué pasó]
- **Caso de prueba:** [qué mensaje o acción lo reprodujo]
- **Causa:** [por qué pasó]
- **Solución aplicada:** [qué se cambió]
- **Estado:** ✅ Resuelto / ⚠️ Workaround / ❌ Pendiente

## Bug 2
...
```

Para el Demo Day, este archivo muestra que el sistema fue probado sistemáticamente. Es más convincente decir "encontramos 3 bugs y resolvimos 2, el tercero tiene un workaround" que decir "funciona todo".

---

## Bloque 2 — Preparar la narrativa y la demo en 10 minutos (0:40 – 1:00)

### La estructura de la demo de 10 minutos

El Demo Day le da a cada participante 10 minutos. El docente muestra la estructura óptima:

```
┌─────────────────────────────────────────────────────────┐
│ DEMO DAY — ESTRUCTURA DE 10 MINUTOS                     │
│                                                         │
│ 0:00 – 1:00  EL ANTES                                   │
│   "Este es el proceso que automaticé. Antes se hacía    │
│    así, tardaba X tiempo, y tenía estos problemas."      │
│                                                         │
│ 1:00 – 1:30  EL SISTEMA EN DIAGRAMA                     │
│   Mostrar el flujo en n8n 10 segundos — sin explicar    │
│   nodo por nodo. Solo el mapa general.                   │
│                                                         │
│ 2:00 – 6:00  LA DEMO EN VIVO (el corazón)               │
│   Enviar el mensaje de prueba.                          │
│   Mostrar en tiempo real cómo el sistema lo procesa.    │
│   Mostrar el resultado final (respuesta, alerta, log).   │
│   Si es posible, probar un segundo caso distinto.        │
│                                                         │
│ 6:00 – 7:00  EL REPORTE Y EL DASHBOARD                  │
│   Abrir el dashboard. Leer los números en voz alta.     │
│                                                         │
│ 7:00 – 9:00  EL IMPACTO EN NÚMEROS                      │
│   "Esta semana el sistema procesó X mensajes.           │
│    Respondió Y automáticamente. Detectó Z urgentes.     │
│    Tiempo ahorrado: X horas. ROI: X%."                  │
│                                                         │
│ 9:00 – 10:00 EL SIGUIENTE PASO                          │
│   "Lo que haría si siguiera desarrollando este          │
│    sistema en los próximos 3 meses."                    │
└─────────────────────────────────────────────────────────┘
```

### El mensaje de prueba perfecto para la demo

El mensaje de prueba de la demo tiene que cumplir tres criterios:

1. **Ser real** — un mensaje del tipo que realmente llega al negocio
2. **Mostrar el punto fuerte del sistema** — si el agente es bueno manejando casos complejos, el mensaje de prueba tiene que ser complejo
3. **Ser predecible** — saber de antemano exactamente qué va a hacer el sistema con ese mensaje

**Cómo prepararlo:**
- Escribir el mensaje de prueba en VS Code → guardarlo en `demo/mensaje-de-prueba.txt`
- Ejecutar el flujo con ese mensaje exacto al menos 3 veces antes del Demo Day
- Verificar que el sistema responde de la misma forma las 3 veces

**Tener un mensaje de respaldo:** preparar un segundo mensaje por si el primero falla o el flujo tarda demasiado. El mensaje de respaldo debería demostrar un caso distinto al principal.

### Cómo hablar del sistema sin perder al público

El error más común en las demos técnicas es hablar de cómo funciona en lugar de hablar de qué resuelve.

El público (incluyendo el grupo de la diplomatura) no necesita entender cómo n8n conecta los nodos — necesita entender qué problema resuelve y cuánto vale.

**Vocabulario para la demo:**

| En lugar de decir... | Decir... |
|---|---|
| "El trigger de Gmail detecta el webhook..." | "Cuando llega un email, el sistema lo captura automáticamente..." |
| "El nodo OpenAI hace una llamada a la API con el prompt..." | "La IA lee el mensaje y entiende de qué se trata, sin reglas fijas..." |
| "El flujo tiene una condición IF que evalúa el campo sentimiento..." | "El sistema distingue entre una consulta normal y un cliente frustrado..." |
| "Tengo un Schedule Trigger que corre los lunes a las 9..." | "Todos los lunes a las 9, el sistema manda el reporte del equipo solo, sin que nadie haga nada..." |

La tecnología es el medio. El negocio es el mensaje.

---

## Workshop — Taller de pulido y ensayo (1:00 – 1:45)

> 45 minutos de trabajo individual y ensayos en pares. El docente circula para ayudar con bugs específicos.

### Estructura del workshop

**Primeros 25 minutos — Pulido técnico**

Cada participante ejecuta la checklist de testing completa y documenta los resultados en VS Code. Si encuentra bugs, los resuelve ahora.

**Siguientes 10 minutos — Preparar los archivos de la demo**

En VS Code, crear la carpeta `demo/` con:

```
demo/
  mensaje-de-prueba.txt      → el mensaje principal de la demo
  mensaje-respaldo.txt       → el mensaje de respaldo
  numeros-roi.md             → los números de impacto para citar de memoria
  siguiente-paso.md          → 2-3 líneas sobre el futuro del sistema
```

Abrir estos archivos en VS Code durante el Demo Day como referencia rápida si se olvida algún número.

**Últimos 10 minutos — Ensayo en pares**

Cada participante hace un ensayo de 3 minutos para su compañero de par:
- Explica en una oración qué hace el sistema
- Muestra la demo en vivo
- Dice un número de impacto

El compañero da feedback con esta pregunta: *"¿Entendí qué problema resolviste y cuánto vale, sin saber nada de automatización?"*

Si la respuesta es "no", ajustar la narrativa.

---

## Cierre (1:45 – 1:55)

### Ensayo general: dos demos completas frente al grupo

Dos voluntarios hacen la demo completa de 10 minutos frente al grupo. El docente da feedback específico:

- ¿La demo en vivo funcionó sin problemas?
- ¿Los números de impacto fueron claros y defendibles?
- ¿El público entendió qué resolvió el sistema sin background técnico?
- ¿El tiempo se distribuyó bien entre la demo y los números?

### El mantra del Demo Day

> Mostrá el sistema funcionando. Citá un número real. Explicá qué hubiera costado no haberlo construido.

Esas tres cosas, bien hechas, son una presentación exitosa.

---

## Tarea final — Instrucciones para el Demo Day

### Qué traer al Demo Day

**Técnico:**
- Laptop con n8n abierto en el flujo listo
- Pestaña con el dashboard de Google Sheets abierta
- Pestaña con VS Code con los archivos de la demo
- El mensaje de prueba copiado en el portapapeles y en `demo/mensaje-de-prueba.txt`
- Un teléfono o segunda cuenta de email para enviar el email de prueba si el principal falla

**Logístico:**
- Cable HDMI o adaptador para conectar la laptop al proyector
- Verificar que las credenciales de la API no vencen la noche anterior
- Revisar n8n a la mañana del Demo Day: ¿el flujo sigue activo? ¿la última ejecución fue exitosa?

**Narrativo:**
- Los números de ROI memorizados (no leerlos de la pantalla — citarlos)
- El "antes" del proceso en una oración
- El "después" del proceso en una oración
- El siguiente paso en una oración

### La noche antes del Demo Day

1. Ejecutar el flujo completo una vez más con el mensaje de prueba — verificar que funciona
2. Revisar el dashboard — ¿los números están actualizados?
3. Leer en voz alta la narrativa completa una vez
4. Dormir — el sistema ya está construido

---

## Recursos y herramientas

| Herramienta | Para qué en el Demo Day | Cómo verificar que funciona |
|---|---|---|
| n8n Cloud | La demo en vivo del flujo | Ejecutar manualmente la noche anterior |
| Google Sheets | Mostrar el log y el dashboard | Verificar que las fórmulas calculan correctamente |
| VS Code | Archivos de referencia durante la demo | Tener las pestañas abiertas y visibles |
| Gmail | Disparar el evento en vivo | Tener el email de prueba listo para enviar |

### Checklist final para VS Code

Verificar que la carpeta del proyecto tiene estos archivos antes del Demo Day:

```
📁 proyecto/
  📁 prompts/
    agente-sistema.txt         ✅
    changelog.md               ✅
  📁 testing/
    pre-demo-bugs.md           ✅
  📁 metricas/
    supuestos-roi.md           ✅
  📁 demo/
    mensaje-de-prueba.txt      ✅
    mensaje-respaldo.txt       ✅
    numeros-roi.md             ✅
    siguiente-paso.md          ✅
  README.md                    (opcional pero recomendado)
```

Tener el proyecto bien organizado en VS Code también es una forma de demostrar que el sistema fue construido con criterio profesional.

---

*AI Automation — Diplomatura No-Code · Bloque 4: Agente completo · Clase 19 de 20*
