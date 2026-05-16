/**
 * Clase 14 — Calcular métricas de la semana para el reporte
 * Nodo: Code (JavaScript)
 *
 * Propósito: tomar todas las filas de la hoja "Consultas" de la semana
 * anterior y calcular las métricas que se van a incluir en el reporte.
 *
 * Input: todas las filas de la semana (del nodo Google Sheets anterior)
 * Output: un objeto con las métricas calculadas
 */

// Obtener todas las filas de la semana
const filas = $input.all();

if (filas.length === 0) {
  return [{
    json: {
      total: 0,
      consultas: 0,
      reclamos: 0,
      otros: 0,
      resueltos_auto: 0,
      resueltos_humano: 0,
      escalados: 0,
      tasa_auto: '0%',
      urgentes: 0,
      criticos: 0,
      tiempo_promedio_auto_min: 0,
      casos_urgentes_detalle: 'No hubo consultas esta semana.',
      fecha_inicio: fechaInicioSemana(),
      fecha_fin: fechaFinSemana(),
      _sin_datos: true
    }
  }];
}

// ============================================================
// CONTEOS POR TIPO
// ============================================================
const total    = filas.length;
const consultas = filas.filter(f => f.json['Tipo'] === 'CONSULTA').length;
const reclamos  = filas.filter(f => f.json['Tipo'] === 'RECLAMO').length;
const otros     = filas.filter(f => f.json['Tipo'] === 'OTRO').length;

// ============================================================
// ESTADOS
// ============================================================
const resueltosAuto   = filas.filter(f => f.json['Estado'] === 'Resuelto_Auto').length;
const resueltosHumano = filas.filter(f => f.json['Estado'] === 'Resuelto_Humano').length;
const escalados       = filas.filter(f => f.json['Estado'] === 'Escalado').length;

const tasaAuto = total > 0
  ? Math.round((resueltosAuto / total) * 100) + '%'
  : '0%';

// ============================================================
// URGENCIAS
// ============================================================
const urgentes = filas.filter(f =>
  f.json['Urgencia'] === 'alta' || f.json['Urgencia'] === 'critica'
).length;

const criticos = filas.filter(f => f.json['Urgencia'] === 'critica').length;

// ============================================================
// TIEMPO PROMEDIO DE RESPUESTA AUTOMÁTICA
// ============================================================
const tiemposAuto = filas
  .filter(f => f.json['Agente'] === 'IA' && f.json['Tiempo Respuesta Min'])
  .map(f => parseFloat(f.json['Tiempo Respuesta Min']) || 0)
  .filter(t => t > 0);

const tiempoPromedioAuto = tiemposAuto.length > 0
  ? (tiemposAuto.reduce((a, b) => a + b, 0) / tiemposAuto.length).toFixed(1)
  : 0;

// ============================================================
// DETALLE DE CASOS URGENTES (máx. 5 para el prompt)
// ============================================================
const casosUrgentes = filas
  .filter(f => f.json['Urgencia'] === 'critica' || f.json['Urgencia'] === 'alta')
  .slice(0, 5)
  .map(f => `[${f.json['Tipo']}/${f.json['Urgencia']}] ${f.json['Resumen IA'] || f.json['Asunto'] || '(sin descripción)'}`)
  .join('\n');

// ============================================================
// FUNCIONES AUXILIARES PARA FECHAS
// ============================================================
function fechaInicioSemana() {
  const hoy = new Date();
  const inicio = new Date(hoy);
  inicio.setDate(hoy.getDate() - 7);
  return inicio.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function fechaFinSemana() {
  const hoy = new Date();
  const fin = new Date(hoy);
  fin.setDate(hoy.getDate() - 1);
  return fin.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// ============================================================
// DEVOLVER MÉTRICAS
// ============================================================
return [{
  json: {
    // Volumen
    total,
    consultas,
    reclamos,
    otros,
    reclamos_pct: total > 0 ? Math.round((reclamos / total) * 100) + '%' : '0%',

    // Resolución
    resueltos_auto: resueltosAuto,
    resueltos_humano: resueltosHumano,
    escalados,
    tasa_auto: tasaAuto,

    // Urgencia
    urgentes,
    criticos,

    // Tiempos
    tiempo_promedio_auto_min: parseFloat(tiempoPromedioAuto),

    // Detalle para el prompt de IA
    casos_urgentes_detalle: casosUrgentes || 'Sin casos urgentes esta semana.',

    // Período del reporte
    fecha_inicio: fechaInicioSemana(),
    fecha_fin: fechaFinSemana(),

    // Metadata
    _filas_procesadas: total,
    _timestamp: new Date().toISOString()
  }
}];
