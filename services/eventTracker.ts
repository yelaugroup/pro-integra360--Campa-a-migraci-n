/**
 * ARCHIVO DE TRACKING DE EMBUDO (TEMPORALMENTE DESACTIVADO)
 * 
 * Motivo:
 * La auditoría técnica determinó que CONFIG.EVENT_TRACK_URL requiere validación previa
 * en el workflow n8n antes de emitir los eventos ('hero_cta_click', 'form_view', 'form_start',
 * 'form_submit_success', 'form_submit_error') y evitar el envío de identificadores anónimos.
 * 
 * Estado:
 * Todas las llamadas a trackFunnelEvent quedan en modo NO-OP (no realizan peticiones de red).
 * El histórico de descargas en /pages/MigrationKit.tsx NO se ve afectado porque utiliza
 * su propio fetch directo y probado.
 */

export type FunnelEventType = 
  | 'hero_cta_click'
  | 'form_view'
  | 'form_start'
  | 'form_submit_success'
  | 'form_submit_error';

interface TrackEventOptions {
  email?: string;
  recurso?: string;
  meta?: Record<string, any>;
}

export const trackFunnelEvent = (
  _evento: FunnelEventType | string,
  _options?: TrackEventOptions
): void => {
  // DESACTIVADO TEMPORALMENTE: No emite peticiones HTTP hacia CONFIG.EVENT_TRACK_URL
  // hasta que se realice la prueba controlada contra el workflow n8n.
};
