# Cómo conectar Gmail y Google Sheets en n8n

## Paso 1: Credencial de Gmail

1. En n8n, ir al menú lateral → "Credentials" → "Add Credential"
2. Buscar "Gmail OAuth2"
3. Hacer clic en "Connect my account"
4. Se abre una ventana de Google → elegir la cuenta de Gmail de Lumina
5. Aceptar los permisos (leer y enviar emails)
6. La credencial queda guardada como "Gmail OAuth2 — [tu cuenta]"
7. **Nombre recomendado:** "Gmail — Lumina"

**Importante:** las credenciales se guardan UNA SOLA VEZ en n8n.
Todos los flujos que usen Gmail usan la misma credencial.

---

## Paso 2: Credencial de Google Sheets

1. En Credentials → "Add Credential"
2. Buscar "Google Sheets OAuth2"
3. "Connect my account" → elegir la cuenta de Google con la planilla
4. Aceptar los permisos
5. **Nombre recomendado:** "Google Sheets — Lumina"

---

## Paso 3: Obtener el ID de la planilla

El ID de la planilla está en la URL de Google Sheets:

```
https://docs.google.com/spreadsheets/d/[ESTE_ES_EL_ID]/edit
                                         ↑
                          Copiar esta parte (es un string largo)
```

Ejemplo: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms`

Reemplazar `YOUR_SPREADSHEET_ID` en el nodo de Google Sheets con este ID.

---

## Paso 4: Verificar el nombre de la hoja

El nodo de Google Sheets tiene configurado `sheetName: "Consultas"`.
Verificar que la hoja en la planilla se llama exactamente "Consultas"
(con mayúscula inicial, sin espacios extra).

Si el nombre es diferente, cambiar el valor en el nodo.

---

## Test de la conexión

1. Abrir el workflow en n8n
2. Hacer clic en el nodo "Gmail Trigger" → "Listen for test event"
3. Enviar un email de prueba a la cuenta de Gmail configurada
4. n8n captura el email y muestra los datos en el panel derecho
5. Verificar que los campos `from`, `subject` y `text` tienen datos
6. Hacer clic en "Execute workflow" para probar el flujo completo
7. Ir a la planilla y verificar que aparece la nueva fila
