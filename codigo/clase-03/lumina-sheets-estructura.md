# Estructura de la planilla de Google Sheets de Lumina

La planilla tiene 5 hojas. Cada hoja tiene un propósito específico y columnas
con nombres normalizados (sin espacios, sin acentos donde sea posible).

---

## Hoja 1: Pedidos

**Propósito:** registro de todos los pedidos. La fuente de verdad del estado de cada compra.

| Columna | Nombre en Sheets | Tipo | Ejemplo |
|---|---|---|---|
| A | ID | Número | 4801 |
| B | Email Cliente | Email | maria.gonzalez@gmail.com |
| C | Nombre Cliente | Texto | María González |
| D | Producto | Texto | Remera Básica |
| E | Talle | Texto | M |
| F | Color | Texto | Blanco |
| G | Precio | Número | 3500 |
| H | Fecha Compra | Fecha | 2025-05-01 |
| I | Estado | Lista | En camino |
| J | Tracking | Texto | AR9900012301 |
| K | Fecha Estimada | Fecha | 2025-05-06 |
| L | Canal | Lista | Web |
| M | Notas | Texto | (libre) |

**Validación de datos para columna Estado:**
Datos → Validación de datos → Lista de opciones:
`Pendiente, En camino, Entregado, Devuelto, Cancelado`

---

## Hoja 2: Clientes

**Propósito:** base de clientes con historial de compras y segmento.

| Columna | Nombre en Sheets | Tipo | Ejemplo |
|---|---|---|---|
| A | Email | Email | maria.gonzalez@gmail.com |
| B | Nombre | Texto | María González |
| C | Teléfono | Texto | 11-4521-8832 |
| D | Ciudad | Texto | Buenos Aires |
| E | Canal Preferido | Lista | Web |
| F | Primera Compra | Fecha | 2024-11-15 |
| G | Cantidad Compras | Número | 8 |
| H | Ticket Promedio | Número | 6200 |
| I | Última Compra | Fecha | 2025-05-01 |
| J | Segmento | Lista | VIP |
| K | Notas | Texto | (libre) |

**Segmentos:** Nuevo (1 compra), Regular (2-5 compras), VIP (6+ compras)

---

## Hoja 3: Productos

**Propósito:** catálogo de productos con stock y características.

| Columna | Nombre en Sheets | Tipo |
|---|---|---|
| A | ID | Texto (P001) |
| B | Nombre | Texto |
| C | Categoría | Lista |
| D | Precio | Número |
| E | Talles Disponibles | Texto |
| F | Colores Disponibles | Texto |
| G | Composición | Texto |
| H | Stock Total | Número |
| I | Activo | Checkbox |

---

## Hoja 4: Consultas (el log del flujo)

**Propósito:** registro automático de todas las consultas que llegan al sistema.
**IMPORTANTE:** esta hoja la llena el flujo de n8n automáticamente.
No modificar manualmente las columnas A-L.

| Columna | Nombre en Sheets | Quién lo llena |
|---|---|---|
| A | ID | n8n (auto-incrementado) |
| B | Fecha | n8n |
| C | Email Cliente | n8n (del trigger) |
| D | Asunto | n8n (del email) |
| E | Mensaje | n8n (del email) |
| F | Tipo | n8n (clasificación IA) |
| G | Sentimiento | n8n (análisis IA) |
| H | Urgencia | n8n (análisis IA) |
| I | Estado | n8n / equipo |
| J | Respuesta Enviada | n8n (TRUE/FALSE) |
| K | Tiempo Respuesta Min | n8n |
| L | Agente | n8n (IA / Humano) |
| M | Notas Equipo | Equipo humano |

---

## Hoja 5: Dashboard

**Propósito:** métricas calculadas automáticamente con fórmulas.
Ver `formulas-google-sheets.md` para las fórmulas exactas.

Secciones recomendadas:
1. Resumen de pedidos (total, por estado, ingreso)
2. Resumen de consultas (total, por tipo, tasa auto)
3. Métricas de la semana
4. Indicadores de alerta (reclamos sin resolver, pedidos retrasados)
