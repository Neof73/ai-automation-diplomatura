# Clase 07 — Flujos con condiciones: distintas respuestas según el caso

## Archivos de esta clase

| Archivo | Descripción |
|---|---|
| `workflow-clase-07.json` | ✅ Workflow n8n importable — condicional IF con dos ramas |
| `emails-prueba.csv` | 10 emails de prueba para testear las dos ramas |
| `palabras-clave-reclamos.txt` | Lista de palabras clave para detectar reclamos |

## Este workflow extiende el de la clase 06

El workflow de la clase 07 agrega después del nodo de registro en Sheets:

```
IF: ¿el mensaje contiene alguna palabra de reclamo?
  TRUE  → Gmail: enviar alerta al equipo de Lumina
  FALSE → Sheets: buscar el pedido → Gmail: responder al cliente
```

## Cómo importar y configurar

1. Importar `workflow-clase-07.json` en n8n
2. Reemplazar TODAS las instancias de `REEMPLAZAR` con las credenciales propias
3. Actualizar `YOUR_SPREADSHEET_ID` con el ID de la planilla real
4. Cambiar `equipo@lumina.com` por el email del equipo propio
5. Testear con los emails de `emails-prueba.csv`

## Cómo probar las dos ramas

**Probar rama TRUE (reclamo):**
Enviar un email con el texto: "Me llegó el producto dañado, quiero la devolución"
→ Debe llegar una alerta al email del equipo

**Probar rama FALSE (consulta):**
Enviar un email con el texto: "¿Cuándo llega mi pedido 4821?"
→ Debe llegar una respuesta automática al cliente con el estado del pedido

## El límite de este approach

Las palabras clave funcionan para los casos que anticipamos.
Mensajes como "la caja llegó aplastada" o "no es lo que pedí" no serán detectados.
En la clase 11 reemplazamos las palabras clave por clasificación con IA.
