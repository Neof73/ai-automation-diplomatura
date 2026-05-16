# Checklist de calidad de datos antes de conectar al flujo

Antes de conectar Google Sheets al flujo de n8n, verificar estos puntos.
Un flujo conectado a datos de baja calidad va a producir resultados incorrectos.

---

## Estructura

- [ ] La primera fila de cada hoja son los **encabezados** (nombres de columnas)
- [ ] Los encabezados no tienen espacios al inicio o al final
- [ ] No hay filas completamente vacías en el medio de los datos
- [ ] No hay columnas ocultas con datos que el flujo necesita
- [ ] El nombre de cada hoja coincide exactamente con el que se usará en n8n

---

## Emails (columna clave para buscar clientes)

- [ ] Todos los emails están en minúsculas (usar `=LOWER(A1)` para normalizar)
- [ ] Ningún email tiene espacios al inicio o al final (`=TRIM(A1)`)
- [ ] No hay emails duplicados en la hoja de Clientes
- [ ] El formato es correcto: `usuario@dominio.com` (verificar con `=ISNUMBER(FIND("@",A1))`)

---

## Fechas

- [ ] Todas las fechas están en formato reconocido por Sheets: `DD/MM/AAAA` o `AAAA-MM-DD`
- [ ] No hay fechas escritas como texto ("15 de mayo")
- [ ] La columna de fechas no tiene celdas con texto en lugar de fechas

---

## Números

- [ ] Los precios son números, no texto con símbolos ("$3.500" → 3500)
- [ ] No hay números con puntos como separadores de miles en la celda raw
- [ ] Las cantidades no tienen texto adicional ("5 unidades" → 5)

---

## Consistencia de valores en listas

Para columnas con valores predefinidos (Estado, Canal, Tipo, Segmento):

- [ ] Verificar que no hay variantes: "en camino" ≠ "En camino" ≠ "EN CAMINO"
- [ ] Usar COUNTIF para detectar variantes:
  ```
  =COUNTIF(I:I,"en camino")  // debería dar 0 si la normalización es correcta
  ```
- [ ] Aplicar validación de datos para evitar errores futuros

---

## Test final antes de conectar

Ejecutar estas fórmulas en una celda vacía. Si todas dan el valor correcto,
los datos están listos:

```
// Test 1: buscar un pedido por email conocido
=INDEX(Pedidos!I:I, MATCH("maria.gonzalez@gmail.com", Pedidos!B:B, 0))
// Debe devolver: "Entregado"

// Test 2: contar registros válidos
=COUNTA(Pedidos!A:A)-1
// Debe devolver el número exacto de pedidos (sin contar el encabezado)

// Test 3: verificar que no hay emails vacíos
=COUNTBLANK(Pedidos!B:B)
// Debe devolver: 0
```
