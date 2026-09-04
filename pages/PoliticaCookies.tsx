import React, { useState, useEffect } from 'react';
import { CONFIG } from '../constants';
import { getCookieConsent, setCookieConsent, CookieConsentStatus, COOKIE_CONSENT_EVENT } from '../services/cookieConsent';
import { enableTikTokPixel, revokeTikTokConsent } from '../services/tiktokPixel';

const PoliticaCookies: React.FC = () => {
  const [consentStatus, setConsentStatus] = useState<CookieConsentStatus>(null);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    setConsentStatus(getCookieConsent());

    const handleConsentChange = () => {
      setConsentStatus(getCookieConsent());
    };

    window.addEventListener(COOKIE_CONSENT_EVENT, handleConsentChange);
    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, handleConsentChange);
    };
  }, []);

  const handleUpdateConsent = (newStatus: 'accepted' | 'rejected') => {
    setCookieConsent(newStatus);
    setConsentStatus(newStatus);
    if (newStatus === 'accepted') {
      enableTikTokPixel(window.location.pathname);
      setNotification('Has aceptado las cookies de marketing. Se ha activado la medición publicitaria.');
    } else {
      revokeTikTokConsent();
      setNotification('Has rechazado las cookies no necesarias. Se ha revocado el consentimiento de marketing.');
    }
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };
  return (
    <div className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate select-none">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Política de Cookies</h1>
        
        <p className="text-gray-600 mb-6 text-sm">
          Última actualización: Mayo de 2026.
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">1. ¿Qué es una Cookie?</h2>
          <p className="text-gray-700 leading-relaxed">
            Una cookie es un pequeño archivo de texto que un sitio web descarga en su navegador u ordenador cuando usted accede a determinadas páginas. Las cookies permiten a las páginas web almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo, lo que facilita y optimiza la navegación.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">2. Cookies Utilizadas en este Sitio Web</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Nuestro sitio emplea cookies de carácter técnico y analítico, orientadas tanto al correcto funcionamiento técnico del formulario de inscripción como al seguimiento inteligente de eventos de conversión (descargas de recursos digitales, etc.):
          </p>

          <h3 className="text-lg font-bold text-slate-800 mb-2">Cookies Técnicas e Imprescindibles</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Son aquellas cookies estrictamente necesarias para el uso adecuado de la plataforma, el envío seguro de los formularios de captación de leads que se sincronizan con n8n y Airtable, y la conservación de estados de la sesión lógica del usuario. Sin ellas, utilidades básicas del sitio o el propio formulario podrían no comportarse correctamente.
          </p>

          <h3 className="text-lg font-bold text-slate-800 mb-2">Cookies Analíticas y de Seguimiento de Eventos</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Son aquellas cookies tratadas por nosotros o por terceros (como TikTok Pixel o herramientas de analítica web) para cuantificar visitas, medir el rendimiento de campañas y evaluar el comportamiento de los usuarios sobre las opciones de descarga del "Kit de Migración". Estas cookies únicamente se activan cuando el usuario otorga expresamente su consentimiento.
          </p>
        </section>

        {/* Panel interactivo de gestión de preferencias */}
        <section className="mb-10 bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-3">Tus Preferencias de Cookies Actuales</h2>
          <p className="text-gray-700 text-sm mb-4 leading-relaxed">
            Puedes cambiar o revocar tu consentimiento sobre las cookies no necesarias y de marketing en cualquier momento utilizando los siguientes controles:
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-white rounded-xl border border-gray-200 mb-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Estado actual</p>
              <p className="font-bold text-base text-brand-anthracite mt-0.5">
                {consentStatus === 'accepted' && <span className="text-green-600">✓ Cookies de marketing: ACEPTADAS</span>}
                {consentStatus === 'rejected' && <span className="text-slate-600">✗ Cookies de marketing: RECHAZADAS (Solo necesarias)</span>}
                {consentStatus === null && <span className="text-amber-600">⚠ No configurado (Pendiente de elección)</span>}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleUpdateConsent('rejected')}
                className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Rechazar no necesarias
              </button>
              <button
                type="button"
                onClick={() => handleUpdateConsent('accepted')}
                className="px-4 py-2 text-sm font-bold rounded-lg bg-brand-yellow text-brand-anthracite hover:opacity-90 transition shadow-sm"
              >
                Aceptar cookies de marketing
              </button>
            </div>
          </div>
          {notification && (
            <p className="text-xs text-green-700 bg-green-50 border border-green-200 rounded-lg p-2.5 font-medium animate-fadeIn">
              {notification}
            </p>
          )}
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">3. Gestión, Bloqueo y Desactivación de Cookies en el Navegador</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            El usuario tiene la total potestad de permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración manual de las opciones del navegador que utilice en cada momento:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li><strong>Google Chrome:</strong> Diríjase a Configuración &gt; Privacidad y Seguridad &gt; Cookies y otros datos de sitios.</li>
            <li><strong>Mozilla Firefox:</strong> Vaya a Opciones &gt; Privacidad y Seguridad &gt; Bloqueo de contenido / Cookies.</li>
            <li><strong>Safari:</strong> Seleccione Preferencias &gt; Privacidad &gt; Cookies y datos de sitios web.</li>
            <li><strong>Microsoft Edge:</strong> Diríjase a Configuración &gt; Cookies y permisos del sitio &gt; Administrar y eliminar cookies.</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            Tenga en cuenta que si decide desactivar por completo determinadas cookies técnicas necesarias, la funcionalidad general de envío e inscripción digital en los recursos de {CONFIG.BRAND_NAME} podría verse mermada o presentar errores imprevistos.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PoliticaCookies;
