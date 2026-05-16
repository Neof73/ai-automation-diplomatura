# Supuestos del cálculo de ROI — [Nombre del negocio]

Completar este documento ANTES de presentar el ROI.
Los supuestos tienen que ser defendibles si alguien pregunta "¿cómo calculaste eso?".

---

## Supuesto 1: Tiempo por tarea manual

**Tarea:** [nombre del proceso que se automatizó]
**Tiempo medido:** [X] minutos por ejecución
**Cómo se midió:** [cronometrado con el celular / estimado / promedio de N mediciones]
**Fecha de la medición:** [fecha]

**Nota:** si el tiempo varía, usar el promedio de al menos 5 mediciones.

---

## Supuesto 2: Frecuencia semanal

**Cantidad de eventos reales procesados:**
- Semana 1: [X] eventos
- Semana 2: [X] eventos
- Semana 3: [X] eventos
- Semana 4: [X] eventos
- **Promedio:** [X] eventos/semana

**Fuente:** historial de ejecuciones de n8n / log en Google Sheets

---

## Supuesto 3: Tasa de resolución automática

**Mensajes resueltos sin intervención humana:** [X]%
**Fuente:** columna "Estado" del log de Google Sheets
**Período de medición:** [del XX/XX al XX/XX]

**Nota:** ser honesto con este número. Si el sistema resuelve el 60%, decir 60%.

---

## Supuesto 4: Costo hora de trabajo

**Sueldo mensual del operador:** $[X] ARS
**Horas de trabajo mensual:** [X] horas (días laborales × horas por día)
**Costo por hora:** $[X] ARS
**Cómo se calculó:** sueldo / horas_mes = $[X] / [X] = $[X/hora]

*Alternativa: si el dueño hace el trabajo, usar el valor hora de oportunidad
(cuánto cobraría por hora de consultoría o trabajo alternativo).*

---

## Supuesto 5: Costo del sistema

| Componente | Costo mensual |
|---|---|
| n8n Cloud (plan de pago) | $[X] USD = $[X] ARS |
| OpenAI API | $[X] USD = $[X] ARS |
| Supabase (si aplica) | $[X] USD = $[X] ARS |
| Mantenimiento ([X] hs/mes × $[X]/hs) | $[X] ARS |
| **Total mensual** | **$[X] ARS** |
| **Total anual** | **$[X] ARS** |

**Tipo de cambio usado:** $[X] ARS/USD al [fecha]

---

## Resultado del cálculo

```
Valor generado anualmente:
  [X] eventos/semana × [X]% automático × [X] min/evento
  × $[X]/hora × 52 semanas = $[X] ARS/año

Costo anual del sistema:
  $[X] ARS/mes × 12 = $[X] ARS/año

ROI:
  ($[X] - $[X]) / $[X] × 100 = [X]%
```

---

## Notas y aclaraciones

*(Agregar cualquier supuesto adicional, caso especial o limitación del cálculo)*
