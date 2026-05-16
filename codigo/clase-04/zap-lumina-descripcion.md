# Zap de Lumina — Captura de emails a Google Sheets

## El Zap a construir

```
TRIGGER: Gmail — Email nuevo recibido
    ↓
ACTION 1: Google Sheets — Agregar fila en hoja "Consultas"
    ↓
ACTION 2: Gmail — Enviar email de confirmación al cliente
```

---

## Paso 1: Crear el Zap

1. Ir a zapier.com → "Create Zap"
2. Nombre del Zap: "Lumina — Captura de emails"

---

## Paso 2: Configurar el Trigger (Gmail)

**App:** Gmail
**Evento:** New Email Matching Search (email nuevo que coincide con una búsqueda)

**Configuración:**
- Search String: `to:lumina.atencion@gmail.com` (o el email que usen)
  - Si quieren capturar TODOS los emails: dejar en blanco
  - Si quieren filtrar solo los de clientes: agregar etiqueta o dominio

**Conectar la cuenta:** autorizar el Gmail de Lumina

**Campos que devuelve el trigger:**
```
from_email     → email del remitente (el cliente)
from_name      → nombre del remitente
subject        → asunto del email
body_plain     → cuerpo en texto plano
date           → fecha y hora del email
```

**Testear:** Zapier pide que haya un email reciente para usar como datos de prueba.
Si no hay, enviar un email de prueba desde otra cuenta antes de testear.

---

## Paso 3: Configurar Action 1 (Google Sheets)

**App:** Google Sheets
**Evento:** Create Spreadsheet Row (agregar fila)

**Configuración:**
- Drive: Mi unidad
- Spreadsheet: "Lumina — Base de datos"
- Worksheet: "Consultas"

**Mapeo de columnas:**
```
Columna "Email Cliente"  ← from_email (del trigger)
Columna "Nombre"         ← from_name (del trigger)
Columna "Asunto"         ← subject (del trigger)
Columna "Mensaje"        ← body_plain (del trigger)
Columna "Fecha"          ← date (del trigger)
Columna "Canal"          ← "Email" (valor fijo)
Columna "Estado"         ← "Abierta" (valor fijo)
```

**Testear:** Zapier agrega una fila de prueba en la planilla.
Verificar que los campos llegaron correctamente.

---

## Paso 4: Configurar Action 2 (Gmail — confirmación)

**App:** Gmail
**Evento:** Send Email (enviar email)

**Configuración:**
```
To:      from_email (del trigger — al cliente)
From:    lumina.atencion@gmail.com
Subject: Re: [asunto del email del cliente]
Body:    (ver template en email-confirmacion-template.html)
```

**Tip:** en Zapier el body del email acepta HTML básico.
Copiar el contenido del archivo HTML del template.

---

## Paso 5: Activar el Zap

1. Clic en "Publish" o "Turn on Zap"
2. Enviar un email real al Gmail de Lumina
3. Esperar 1-2 minutos (el plan gratuito no es en tiempo real)
4. Verificar: la fila apareció en Google Sheets y llegó el email de confirmación

---

## Datos del email de prueba

Enviar este email para probar:

```
Para: lumina.atencion@gmail.com
Asunto: Consulta sobre pedido 4821

Hola, quería saber cuándo llega mi pedido del 11 de mayo.
El número es el 4821.

Gracias,
Marta Luna
```
