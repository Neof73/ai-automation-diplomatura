# Checklist del Entregable 2 — Pipeline operativo

## Requisitos técnicos

**El flujo DEBE tener:**
- [ ] Al menos 3 herramientas distintas conectadas (Gmail + Sheets + Slack/Notion/WhatsApp)
- [ ] Al menos un nodo IF o Switch con dos ramas diferenciadas
- [ ] Al menos una ruta de manejo de errores (pedido no encontrado, datos vacíos)
- [ ] El workflow de Error Trigger global configurado y activo
- [ ] El flujo en estado "Active" (no solo en modo test)
- [ ] Al menos 5 ejecuciones reales registradas en el historial

**La demo DEBE mostrar:**
- [ ] Un evento real activando el flujo (enviar email en vivo)
- [ ] El resultado en al menos dos herramientas (Sheets + Slack, por ejemplo)
- [ ] Qué pasa cuando los datos no son los esperados (el "caso de error")

**Los números DEBEN incluir:**
- [ ] Cantidad de eventos procesados la última semana
- [ ] Porcentaje de eventos en cada rama (consulta vs. reclamo)
- [ ] Tiempo estimado que hubiera llevado hacer eso a mano

---

## Criterios de evaluación

| Criterio | Puntos |
|---|---|
| El flujo funciona en vivo durante la presentación | 3 |
| Conecta 3 o más herramientas reales | 2 |
| Tiene lógica condicional con al menos 2 ramas | 2 |
| Tiene manejo de errores que se puede demostrar | 1 |
| El impacto está calculado con datos reales | 1 |
| La presentación se entiende sin contexto técnico | 1 |
| **Total** | **10** |

---

## Errores comunes en el Entregable 2

❌ **Presentar en modo test** — el flujo tiene que estar activo y procesando eventos reales.

❌ **No tener datos de la semana** — si el flujo lleva solo 1 día activo, el impacto no es representativo.

❌ **No preparar el caso de error** — el evaluador puede preguntar "¿qué pasa si el cliente no está en la planilla?". Tener la respuesta lista.

❌ **Números demasiado redondos** — "ahorro 3 horas por semana" sin justificación. Cronometrar el proceso manual real y comparar.
