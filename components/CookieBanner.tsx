import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getCookieConsent, setCookieConsent, COOKIE_CONSENT_EVENT } from '../services/cookieConsent';
import { enableTikTokPixel, revokeTikTokConsent } from '../services/tiktokPixel';

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const currentConsent = getCookieConsent();
    if (currentConsent === null) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    const handleConsentChange = () => {
      const updated = getCookieConsent();
      setIsVisible(updated === null);
    };

    window.addEventListener(COOKIE_CONSENT_EVENT, handleConsentChange);
    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, handleConsentChange);
    };
  }, []);

  const handleAcceptAll = () => {
    setCookieConsent('accepted');
    enableTikTokPixel(location.pathname);
    setIsVisible(false);
  };

  const handleRejectNonEssential = () => {
    setCookieConsent('rejected');
    revokeTikTokConsent();
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <aside
      aria-label="Aviso de cookies"
      className="fixed bottom-0 inset-x-0 z-50 p-3 sm:p-4 md:p-6 transition-all duration-300 pointer-events-auto"
    >
      <div className="max-w-5xl mx-auto bg-brand-anthracite text-white rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.5)] p-5 md:p-6 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="text-sm leading-relaxed text-gray-300 pr-0 md:pr-4">
          <p className="font-semibold text-white mb-1">Tu privacidad es importante para nosotros</p>
          <p>
            Utilizamos cookies técnicas necesarias para el funcionamiento del sitio web y el envío seguro de formularios. Con tu consentimiento, también usamos cookies de marketing (como TikTok Pixel) para medir el rendimiento de nuestras campañas. Puedes aceptar todas las cookies o rechazar las no necesarias.{' '}
            <Link
              to="/politica-cookies"
              className="text-brand-yellow underline hover:text-white transition font-medium"
            >
              Más información en nuestra Política de Cookies
            </Link>.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto flex-shrink-0">
          <button
            type="button"
            onClick={handleRejectNonEssential}
            className="px-5 py-2.5 rounded-lg border border-gray-400 text-gray-200 hover:text-white hover:border-white font-medium text-sm transition text-center whitespace-nowrap"
          >
            Solo necesarias
          </button>
          <button
            type="button"
            onClick={handleAcceptAll}
            className="px-6 py-2.5 rounded-lg bg-brand-yellow text-brand-anthracite font-bold text-sm hover:opacity-90 transition shadow-md text-center whitespace-nowrap"
          >
            Aceptar todas
          </button>
        </div>
      </div>
    </aside>
  );
};

export default CookieBanner;
