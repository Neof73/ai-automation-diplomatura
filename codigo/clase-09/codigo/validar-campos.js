/**
 * Clase 09 — Validar campos antes de procesar
 * Nodo: Code (JavaScript)
 *
 * Propósito: verificar que los datos mínimos necesarios están presentes
 * antes de llamar a APIs o Google Sheets. Evita errores silenciosos.
 *
 * Cómo usar en n8n:
 * 1. Agregar un nodo "Code" después del nodo "Set: Extraer campos"
 * 2. Pegar este código en el editor
 * 3. El nodo devuelve los datos validados o lanza un error descriptivo
 */

// Obtener los datos del nodo anterior
const datos = $input.item.json;

// ============================================================
// VALIDACIONES OBLIGATORIAS
// ============================================================

// 1. Email del cliente — sin esto no podemos responder ni buscar el pedido
if (!datos.email_cliente || datos.email_cliente.trim() === '') {
  throw new Error('VALIDACION_ERROR: email_cliente está vacío. No se puede procesar el mensaje.');
}

// 2. Formato básico del email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(datos.email_cliente)) {
  throw new Error(`VALIDACION_ERROR: email_cliente inválido: "${datos.email_cliente}"`);
}

// 3. Mensaje — sin contenido no hay nada que procesar
if (!datos.mensaje || datos.mensaje.trim().length < 5) {
  throw new Error('VALIDACION_ERROR: mensaje vacío o demasiado corto para procesar.');
}

// ============================================================
// NORMALIZACIONES
// ============================================================

const emailNormalizado = datos.email_cliente.toLowerCase().trim();
const mensajeLimpio    = datos.mensaje.trim().replace(/\s+/g, ' ');
const nombreLimpio     = datos.nombre_cliente
  ? datos.nombre_cliente.trim()
  : emailNormalizado.split('@')[0]; // fallback: usar la parte antes del @

// Truncar el mensaje si es muy largo (evita problemas con APIs que tienen límite)
const LIMITE_MENSAJE = 2000;
const mensajeTruncado = mensajeLimpio.length > LIMITE_MENSAJE
  ? mensajeLimpio.slice(0, LIMITE_MENSAJE) + '... [mensaje truncado]'
  : mensajeLimpio;

// ============================================================
// DEVOLVER DATOS VALIDADOS Y NORMALIZADOS
// ============================================================

return [{
  json: {
    // Campos originales normalizados
    email_cliente:  emailNormalizado,
    nombre_cliente: nombreLimpio,
    asunto:         datos.asunto || '(sin asunto)',
    mensaje:        mensajeTruncado,
    fecha:          datos.fecha || new Date().toISOString().slice(0, 16).replace('T', ' '),
    canal:          datos.canal || 'Email',
    estado:         'Abierta',

    // Metadatos de validación (útiles para debugging)
    _validado:      true,
    _timestamp:     new Date().toISOString(),
    _largo_mensaje: mensajeLimpio.length,
    _truncado:      mensajeLimpio.length > LIMITE_MENSAJE
  }
}];
