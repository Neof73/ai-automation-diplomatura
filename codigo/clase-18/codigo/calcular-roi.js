/**
 * Clase 18 — Calcular ROI del sistema de automatización
 * Nodo: Code (JavaScript)
 *
 * Propósito: calcular el ROI en tiempo real basándose en las métricas
 * reales del sistema y los parámetros de costo configurados.
 *
 * Cómo usar:
 * 1. Agregar este nodo Code después del nodo de métricas (calcular-metricas.js)
 * 2. Ajustar las CONSTANTES de configuración según el negocio propio
 * 3. El output se usa en el reporte ejecutivo y en el dashboard
 */

// ============================================================
// CONSTANTES DE CONFIGURACIÓN
// Ajustar según el negocio propio antes de usar
// ============================================================

const CONFIG = {
  // Tiempo que tarda un operador en manejar un email manualmente (en minutos)
  MINUTOS_POR_RESPUESTA_MANUAL: 5,

  // Costo de una hora de trabajo del operador (en ARS)
  COSTO_HORA_OPERADOR_ARS: 2500,

  // Porcentaje del tiempo que el operador está en otras tareas cuando no
  // está manejando emails (para no sobreestimar el ahorro)
  FACTOR_DISPONIBILIDAD: 0.8,

  // Costos mensuales del sistema (en ARS al tipo de cambio actual)
  COSTO_N8N_MENSUAL_ARS: 15000,
  COSTO_OPENAI_MENSUAL_ARS: 8000,
  COSTO_SUPABASE_MENSUAL_ARS: 0,    // plan gratuito
  COSTO_MANTENIMIENTO_HRS_MES: 2,   // horas dedicadas al sistema por mes
};

// ============================================================
// OBTENER MÉTRICAS DE LA SEMANA (del nodo anterior)
// ============================================================

const metricas = $input.item.json;

const totalSemana       = metricas.total          || 0;
const resueltosAutoSem  = metricas.resueltos_auto || 0;
const reclamos          = metricas.reclamos        || 0;

// ============================================================
// CALCULAR VALOR AHORRADO
// ============================================================

// Tiempo ahorrado esta semana (solo las respuestas automáticas)
const minutosAhorradosSemana = resueltosAutoSem * CONFIG.MINUTOS_POR_RESPUESTA_MANUAL;
const horasAhorradasSemana   = minutosAhorradosSemana / 60;

// Valor económico del tiempo ahorrado esta semana
const valorAhorradoSemanaARS = horasAhorradasSemana
  * CONFIG.COSTO_HORA_OPERADOR_ARS
  * CONFIG.FACTOR_DISPONIBILIDAD;

// Proyecciones anuales (52 semanas)
const horasAhorradasAnio     = horasAhorradasSemana * 52;
const valorAhorradoAnioARS   = valorAhorradoSemanaARS * 52;

// ============================================================
// CALCULAR COSTO DEL SISTEMA
// ============================================================

const costoMantenimientoMensualARS = CONFIG.COSTO_MANTENIMIENTO_HRS_MES
  * CONFIG.COSTO_HORA_OPERADOR_ARS;

const costoSistemaMensualARS = CONFIG.COSTO_N8N_MENSUAL_ARS
  + CONFIG.COSTO_OPENAI_MENSUAL_ARS
  + CONFIG.COSTO_SUPABASE_MENSUAL_ARS
  + costoMantenimientoMensualARS;

const costoSistemaAnioARS = costoSistemaMensualARS * 12;

// ============================================================
// CALCULAR ROI
// ============================================================

const gananciaNeta = valorAhorradoAnioARS - costoSistemaAnioARS;
const roi = costoSistemaAnioARS > 0
  ? Math.round((gananciaNeta / costoSistemaAnioARS) * 100)
  : 0;

// Costo por mensaje procesado
const costoPorMensajeARS = resueltosAutoSem > 0
  ? costoSistemaMensualARS / (resueltosAutoSem * 4.33)  // 4.33 semanas por mes
  : 0;

// ============================================================
// FORMATEAR PARA PRESENTACIÓN
// ============================================================

function formatearARS(numero) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0
  }).format(numero);
}

// ============================================================
// DEVOLVER TODOS LOS DATOS
// ============================================================

return [{
  json: {
    // Métricas originales (pasar todo a través)
    ...metricas,

    // Ahorro calculado
    horas_ahorradas_semana:     Math.round(horasAhorradasSemana * 10) / 10,
    horas_ahorradas_anio:       Math.round(horasAhorradasAnio),
    valor_ahorrado_semana_ars:  Math.round(valorAhorradoSemanaARS),
    valor_ahorrado_anio_ars:    Math.round(valorAhorradoAnioARS),

    // Costos del sistema
    costo_sistema_mensual_ars:  Math.round(costoSistemaMensualARS),
    costo_sistema_anio_ars:     Math.round(costoSistemaAnioARS),
    costo_por_mensaje_ars:      Math.round(costoPorMensajeARS * 100) / 100,

    // ROI
    roi_porcentaje:             roi,
    ganancia_neta_anio_ars:     Math.round(gananciaNeta),

    // Versiones formateadas para el reporte y el dashboard
    roi_formateado:             roi + '%',
    valor_ahorrado_semana_fmt:  formatearARS(valorAhorradoSemanaARS),
    valor_ahorrado_anio_fmt:    formatearARS(valorAhorradoAnioARS),
    costo_sistema_mensual_fmt:  formatearARS(costoSistemaMensualARS),

    // Interpretación del ROI
    interpretacion_roi: roi < 0   ? 'Negativo: el sistema cuesta más de lo que ahorra'
                      : roi < 50  ? 'Positivo bajo: considerar optimizar costos'
                      : roi < 200 ? 'Positivo: el sistema genera valor'
                      : roi < 500 ? 'Excelente: alta rentabilidad de la inversión'
                      : 'Excepcional: retorno extraordinario sobre la inversión',

    _config_usada: CONFIG
  }
}];
