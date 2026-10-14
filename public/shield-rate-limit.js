/**
 * 🛡️ ESCUDO ANTI-SATURACIÓN, BOTS Y ATAQUES DOS PARA FIREBASE CLIENTES
 * Proyecto: manos-abiertas-jesus-maria
 * Límites: Máximo 30 peticiones/minuto por cliente
 * Bloqueo: 15 minutos en caso de actividad anómala
 */
(function() {
  const MAX_ATTEMPTS = 30;         // Límite de acciones por minuto
  const TIME_WINDOW_MS = 60000;    // Ventana de 1 minuto (60 segundos)
  const BLOCK_TIME_MS = 900000;    // 15 minutos de bloqueo temporal

  const now = Date.now();
  const blockKey = '__shield_blocked_until';
  const attemptsKey = '__shield_attempts';

  // 1. Si ya está bloqueado, redirigir a la pantalla 429
  const blockedUntil = localStorage.getItem(blockKey);
  if (blockedUntil && now < parseInt(blockedUntil, 10)) {
    if (!window.location.pathname.endsWith('error-429.html')) {
      window.location.replace('/error-429.html');
    }
    return;
  }

  // 2. Obtener y limpiar historial de solicitudes recientes
  let attempts = [];
  try {
    attempts = JSON.parse(localStorage.getItem(attemptsKey) || '[]');
  } catch (e) {
    attempts = [];
  }

  // Filtrar solo las peticiones de los últimos 60 segundos
  attempts = attempts.filter(timestamp => now - timestamp < TIME_WINDOW_MS);
  attempts.push(now);

  // 3. Verificar si superó el umbral de seguridad
  if (attempts.length > MAX_ATTEMPTS) {
    localStorage.setItem(blockKey, (now + BLOCK_TIME_MS).toString());
    localStorage.removeItem(attemptsKey);
    console.warn('🚨 [SEGURIDAD] Exceso de peticiones detectado. Bloqueando por 15 minutos para proteger cuota.');
    window.location.replace('/error-429.html');
    return;
  }

  localStorage.setItem(attemptsKey, JSON.stringify(attempts));
})();
