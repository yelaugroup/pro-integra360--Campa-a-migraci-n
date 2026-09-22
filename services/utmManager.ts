/**
 * Gestión de persistencia de parámetros UTM en sessionStorage.
 * 
 * Reglas:
 * 1. Al cargar cualquier página/landing: si una UTM está en window.location.search, se almacena en sessionStorage.
 * 2. Si el usuario vuelve sin UTMs (ej. tras visitar Política de Privacidad), se recuperan de sessionStorage.
 * 3. Nuevas visitas con nuevas UTMs sobrescriben los valores de la sesión.
 * 4. Únicamente se utiliza sessionStorage (no localStorage).
 */

export interface UtmParameters {
  source: string | null;
  medium: string | null;
  campaign: string | null;
  content: string | null;
  term: string | null;
}

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const;

/**
 * Inspecciona window.location.search y guarda en sessionStorage cualquier UTM presente.
 * Devuelve el objeto de UTMs consolidadas (URL prioritario sobre sessionStorage).
 */
export const captureAndStoreUtms = (): UtmParameters => {
  if (typeof window === 'undefined') {
    return { source: null, medium: null, campaign: null, content: null, term: null };
  }

  try {
    const urlParams = new URLSearchParams(window.location.search);

    // Actualizar sessionStorage con cualquier UTM que venga en la URL actual
    UTM_KEYS.forEach((key) => {
      const val = urlParams.get(key);
      if (val !== null && val.trim() !== '') {
        sessionStorage.setItem(key, val.trim());
      }
    });
  } catch (e) {
    console.error('Error accediendo a sessionStorage para UTMs:', e);
  }

  return getResolvedUtms();
};

/**
 * Obtiene las UTMs resueltas:
 * 1. Prioridad: valor presente en window.location.search
 * 2. Segunda opción: valor guardado en sessionStorage
 * 3. Fallback: null
 */
export const getResolvedUtms = (): UtmParameters => {
  if (typeof window === 'undefined') {
    return { source: null, medium: null, campaign: null, content: null, term: null };
  }

  const getParam = (key: string): string | null => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlVal = urlParams.get(key);
      if (urlVal !== null && urlVal.trim() !== '') {
        return urlVal.trim();
      }

      const storedVal = sessionStorage.getItem(key);
      if (storedVal !== null && storedVal.trim() !== '') {
        return storedVal.trim();
      }
    } catch (e) {
      console.error('Error leyendo UTMs:', e);
    }
    return null;
  };

  return {
    source: getParam('utm_source'),
    medium: getParam('utm_medium'),
    campaign: getParam('utm_campaign'),
    content: getParam('utm_content'),
    term: getParam('utm_term'),
  };
};
