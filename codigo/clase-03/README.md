# Clase 03 — Los datos son el combustible: estructurar la información del negocio

## Archivos de esta clase

| Archivo | Descripción |
|---|---|
| `lumina-sheets-estructura.md` | Diseño de las 4 hojas de Google Sheets de Lumina |
| `formulas-google-sheets.md` | Fórmulas esenciales para el dashboard de Lumina |
| `limpieza-datos.md` | Técnicas para limpiar y normalizar datos antes de automatizar |
| `checklist-calidad-datos.md` | Lista de verificación de calidad de datos antes de conectar al flujo |

## Los datos de Lumina ya disponibles

En `../datos-compartidos/` encontrás los CSVs de Lumina que se importan a Google Sheets:
- `lumina-pedidos.csv` → hoja "Pedidos"
- `lumina-clientes.csv` → hoja "Clientes"
- `lumina-productos.csv` → hoja "Productos"
- `lumina-consultas.csv` → hoja "Consultas" (el log que llena el flujo)

## Qué hacer en esta clase

1. Crear una nueva planilla en Google Sheets
2. Importar los 4 CSVs como hojas separadas (Archivo → Importar)
3. Aplicar las fórmulas de `formulas-google-sheets.md` en una quinta hoja "Dashboard"
4. Completar la checklist de calidad de datos

## Tarea para la semana

Replicar la estructura de Lumina para el negocio propio:
- Identificar qué tablas de datos tiene el negocio
- Limpiar y normalizar los datos según `limpieza-datos.md`
- Crear la planilla con al menos 2 hojas de datos reales del negocio
