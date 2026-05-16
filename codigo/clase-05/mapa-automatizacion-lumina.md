# Mapa de Automatización — Lumina Indumentaria

## El negocio

**Lumina** es una tienda de indumentaria online con 3 años de antigüedad.
- Canales de venta: web propia, Instagram
- Volumen: 50-80 pedidos semanales, 40-80 emails de clientes por semana
- Equipo: 1 persona de atención al cliente (part-time), 1 administrativo, 2 dueños

---

## Mapa de procesos

### Proceso 1 — Registro de consultas entrantes ⭐ PRIORIDAD 1

**Descripción:** Cuando llega un email de cliente, el operador lo lee, copia el nombre,
email, asunto y mensaje a la planilla de seguimiento y lo marca como "Abierto".

**Datos:**
- Tiempo por ejecución: 3 minutos
- Frecuencia: ~60 emails por semana
- Total: 3 horas por semana
- Costo: $7.500/semana | $390.000/año

**Criterios (4/4):** repetitivo ✅ · datos estructurados ✅ · reglas claras ✅ · alto volumen ✅

**ROI estimado del primer Zap:**
- Tiempo ahorrado: 3 hs/semana × 75% automatizable = 2.25 hs
- Valor semanal: 2.25 × $2.500 = $5.625
- Valor anual: $292.500
- Costo sistema: $15.000/mes = $180.000/año
- **ROI: 62%**

---

### Proceso 2 — Respuesta a consultas de estado de pedido ⭐ PRIORIDAD 2

**Descripción:** El cliente pregunta dónde está su pedido. El operador busca en la
planilla, copia el estado y tracking, y redacta el email de respuesta.

**Datos:**
- Tiempo por ejecución: 5 minutos
- Frecuencia: ~50 consultas de estado por semana
- Total: 4.2 horas por semana
- Costo: $10.400/semana | $540.000/año

**Criterios (4/4):** repetitivo ✅ · datos estructurados ✅ · reglas claras ✅ · alto volumen ✅

**ROI estimado con n8n + IA (Bloque 3):**
- Tiempo ahorrado: 4.2 hs × 80% = 3.36 hs/semana
- Valor anual: $436.800
- **ROI: 143%**

---

### Proceso 3 — Reporte semanal de atención ⭐ PRIORIDAD 3

**Descripción:** El supervisor cuenta las consultas por tipo, calcula tiempos promedio
y redacta el informe semanal para los dueños. Lleva 90 minutos.

**Datos:**
- Tiempo por ejecución: 90 minutos
- Frecuencia: 1 vez por semana
- Total: 1.5 horas por semana
- Costo: $6.000/semana | $312.000/año

**Criterios (2/4):** repetitivo ✅ · datos estructurados ✅ · reglas claras ❌ · bajo volumen ❌

**ROI estimado con IA (Bloque 3):**
- Tiempo ahorrado: 1.5 hs × 90% = 1.35 hs/semana
- Valor anual: $280.800
- **ROI: 56%**

---

### Procesos NO prioritarios (análisis)

| Proceso | Criterios | Motivo de baja prioridad |
|---|---|---|
| Elaborar presupuestos | 2/4 | Requiere juicio, no es repetitivo en formato |
| Negociar con proveedores | 0/4 | No automatizable |
| Diseñar descuentos | 1/4 | Requiere decisión estratégica |

---

## El plan del programa

| Bloque | Proceso que se automatiza |
|---|---|
| Bloque 1 (clase 4) | Primer Zap: registro de emails en Sheets |
| Bloque 2 (clases 6-9) | Pipeline completo: captura + condiciones + notificaciones |
| Bloque 3 (clases 11-14) | IA: clasificación + respuesta automática + reporte |
| Bloque 4 (clases 16-18) | Agente completo: maneja los 3 procesos juntos |

---

## Impacto proyectado al completar el programa

- Tiempo ahorrado por semana: ~8 horas
- Costo evitado por año: ~$1.000.000 ARS
- Costo del sistema: ~$200.000 ARS/año
- **ROI total proyectado: 400%**
