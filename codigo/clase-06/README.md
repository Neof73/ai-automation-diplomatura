# Clase 06 — n8n: el tablero de control de tu negocio

## Archivos de esta clase

| Archivo | Descripción |
|---|---|
| `workflow-clase-06.json` | ✅ Workflow de n8n importable — captura emails a Google Sheets |
| `setup-credenciales.md` | Paso a paso para conectar Gmail y Google Sheets en n8n |
| `estructura-sheets-consultas.csv` | Template de la hoja "Consultas" lista para importar |

## Cómo importar el workflow en n8n

1. Abrir n8n Cloud (cloud.n8n.io)
2. Ir a Workflows → clic en "+" → "Import from File"
3. Seleccionar el archivo `workflow-clase-06.json`
4. El workflow se importa con todos los nodos configurados
5. **Actualizar las credenciales** (Gmail y Google Sheets) con las propias
6. **Actualizar el ID de la planilla** en el nodo de Google Sheets
7. Activar el workflow con el toggle "Active"

## ⚠️ Lo que hay que personalizar después de importar

- [ ] Credencial de Gmail → conectar la cuenta propia
- [ ] Credencial de Google Sheets → conectar la cuenta propia
- [ ] Spreadsheet ID en el nodo Sheets → reemplazar `YOUR_SPREADSHEET_ID`
- [ ] Sheet name → verificar que el nombre coincide con la hoja ("Consultas")

## Qué hace este workflow

```
[Gmail Trigger]  →  [Set: extraer campos]  →  [Google Sheets: agregar fila]
```

Cada email que llega a la cuenta de Gmail se registra automáticamente
en la hoja "Consultas" con: email, nombre, asunto, mensaje, fecha, canal y estado.
