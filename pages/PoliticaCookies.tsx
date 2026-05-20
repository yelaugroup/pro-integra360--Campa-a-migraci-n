import React from 'react';
import { CONFIG } from '../constants';

const PoliticaCookies: React.FC = () => {
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
          <p className="text-gray-700 leading-relaxed mb-1">
            Son aquellas cookies tratadas por nosotros o por terceros (como herramientas de analítica web) para cuantificar y auditar el número de visitas recibidas, el comportamiento de clics de los usuarios sobre las opciones de descarga del "Kit de Migración", el tiempo medio que dedican a evaluar los bloques estratégicos de consultoría y las tasas de clics de rebote. Esto nos ayuda a pulir y refinar el contenido que ofrecemos a los talleres mecánicos.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">3. Gestión, Bloqueo y Desactivación de Cookies</h2>
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
