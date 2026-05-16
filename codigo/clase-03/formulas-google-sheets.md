# Fórmulas de Google Sheets para el Dashboard de Lumina

Crear una hoja "Dashboard" en la planilla y agregar estas fórmulas.
Las fórmulas asumen que los datos están en las hojas "Pedidos" y "Consultas".

---

## Métricas de pedidos

```
// Total de pedidos
=COUNTA(Pedidos!A:A)-1

// Pedidos por estado
=COUNTIF(Pedidos!H:H,"En camino")
=COUNTIF(Pedidos!H:H,"Pendiente")
=COUNTIF(Pedidos!H:H,"Entregado")
=COUNTIF(Pedidos!H:H,"Devuelto")

// Porcentaje de pedidos entregados
=COUNTIF(Pedidos!H:H,"Entregado")/(COUNTA(Pedidos!A:A)-1)
// Formatear como % en Formato > Número > Porcentaje

// Ingreso total (precio × 1 unidad por pedido, simplificado)
=SUMIF(Pedidos!H:H,"<>Devuelto",Pedidos!G:G)

// Pedidos de la semana actual
=COUNTIFS(Pedidos!J:J,">="&HOY()-7)

// Ticket promedio
=AVERAGEIF(Pedidos!H:H,"<>Devuelto",Pedidos!G:G)
```

---

## Métricas de consultas (log del flujo)

```
// Total de consultas registradas
=COUNTA(Consultas!A:A)-1

// Por tipo
=COUNTIF(Consultas!E:E,"CONSULTA")
=COUNTIF(Consultas!E:E,"RECLAMO")
=COUNTIF(Consultas!E:E,"OTRO")

// Resueltas automáticamente vs. humano
=COUNTIF(Consultas!J:J,"Resuelto_Auto")
=COUNTIF(Consultas!J:J,"Resuelto_Humano")

// Tasa de resolución automática
=COUNTIF(Consultas!J:J,"Resuelto_Auto")/(COUNTA(Consultas!A:A)-1)

// Tiempo promedio de respuesta automática (en minutos)
=AVERAGEIF(Consultas!L:L,"IA",Consultas!K:K)

// Consultas urgentes o críticas
=COUNTIF(Consultas!G:G,"alta")+COUNTIF(Consultas!G:G,"critica")

// Consultas de esta semana
=COUNTIFS(Consultas!B:B,">="&HOY()-7)
```

---

## Fórmulas de búsqueda (útiles en el flujo)

```
// Buscar pedido por email de cliente (devuelve el estado)
// En una celda: email a buscar en A1
=IFERROR(
  INDEX(Pedidos!H:H, MATCH(A1, Pedidos!C:C, 0)),
  "No encontrado"
)

// Buscar nombre del cliente por email
=IFERROR(
  INDEX(Pedidos!C:C, MATCH(A1, Pedidos!B:B, 0)),
  "No encontrado"
)

// Buscar todos los pedidos de un cliente (fórmula de array)
=FILTER(Pedidos!A:K, Pedidos!B:B=A1)
// Requiere Google Sheets moderno (función FILTER)
```

---

## Formato condicional para el dashboard

Seleccionar la columna de estado de pedidos y aplicar estas reglas:

| Condición | Color de fondo | Color texto |
|---|---|---|
| El texto es "Entregado" | Verde claro (#d9ead3) | Verde oscuro (#38761d) |
| El texto es "En camino" | Azul claro (#cfe2f3) | Azul oscuro (#1c4587) |
| El texto es "Pendiente" | Amarillo claro (#fff2cc) | Naranja (#b45f06) |
| El texto es "Devuelto" | Rojo claro (#f4cccc) | Rojo oscuro (#cc0000) |

Menú: Formato → Formato condicional → Añadir otra regla

---

## Tabla dinámica: consultas por día de la semana

1. Seleccionar el rango de la hoja Consultas
2. Insertar → Tabla dinámica
3. Filas: columna Fecha (agrupar por día de la semana)
4. Valores: COUNTA de la columna ID
5. Filtro: Tipo (para ver solo RECLAMO o CONSULTA)
