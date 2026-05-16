/**
 * Clase 13 — Parsear la respuesta JSON del análisis de sentimiento
 * Nodo: Code (JavaScript)
 *
 * Propósito: convertir el texto JSON que devuelve OpenAI en campos
 * separados que el nodo IF siguiente puede usar directamente.
 *
 * Input esperado: $input.item.json.message.content
 * (el texto JSON que devuelve el nodo OpenAI)
 *
 * Output: campos planos listos para usar en el IF y en Google Sheets
 */

const respuestaTexto = $input.item.json.message.content || '';

// Limpiar el texto por si la IA agregó markdown (```json ... ```)
const jsonLimpio = respuestaTexto
  .replace(/```json\s*/gi, '')
  .replace(/```\s*/g, '')
  .trim();

// Parsear el JSON
let analisis;
try {
  analisis = JSON.parse(jsonLimpio);
} catch (error) {
  // Si el JSON es inválido, devolver valores por defecto seguros
  // y marcar para revisión humana
  return [{
    json: {
      sentimiento:             'neutro',
      urgencia:                'baja',
      senales:                 'Error al parsear respuesta de IA: ' + error.message,
      requiere_atencion:       true,
      resumen:                 'Error en análisis automático — requiere revisión',
      _error_parseo:           true,
      _respuesta_raw:          respuestaTexto.slice(0, 500)
    }
  }];
}

// Validar que los campos requeridos existen
const SENTIMIENTOS_VALIDOS = ['positivo', 'neutro', 'negativo_leve', 'negativo_fuerte', 'critico'];
const URGENCIAS_VALIDAS    = ['baja', 'media', 'alta', 'critica'];

const sentimiento = SENTIMIENTOS_VALIDOS.includes(analisis.sentimiento)
  ? analisis.sentimiento
  : 'neutro';

const urgencia = URGENCIAS_VALIDAS.includes(analisis.urgencia)
  ? analisis.urgencia
  : 'baja';

// Convertir el array de señales a string para Google Sheets
const senalesString = Array.isArray(analisis.senales)
  ? analisis.senales.join(' | ')
  : String(analisis.senales || '');

return [{
  json: {
    // Campos del análisis
    sentimiento,
    urgencia,
    senales:             senalesString,
    requiere_atencion:   Boolean(analisis.requiere_atencion_humana),
    resumen:             analisis.resumen || '',

    // Campos derivados para el IF (facilitan las condiciones)
    es_urgente:          urgencia === 'alta' || urgencia === 'critica',
    es_critico:          sentimiento === 'critico' || urgencia === 'critica',
    escalar_prioridad:   sentimiento === 'critico' && urgencia === 'critica',

    // Mantener contexto del cliente (del nodo anterior)
    email_cliente:       $('Set: Unificar datos + clasificación').item.json.email_cliente,
    nombre_cliente:      $('Set: Unificar datos + clasificación').item.json.nombre_cliente,
    asunto:              $('Set: Unificar datos + clasificación').item.json.asunto,
    mensaje:             $('Set: Unificar datos + clasificación').item.json.mensaje,
    fecha:               $('Set: Unificar datos + clasificación').item.json.fecha,

    // Metadatos
    _error_parseo:       false,
    _timestamp:          new Date().toISOString()
  }
}];
