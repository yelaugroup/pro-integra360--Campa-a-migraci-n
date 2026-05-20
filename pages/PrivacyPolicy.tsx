import React from 'react';
import { CONFIG } from '../constants';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate select-none">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Política de Privacidad</h1>
        
        <p className="text-gray-600 mb-6 text-sm">
          Última actualización: Mayo de 2026.
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">1. Responsable del Tratamiento</h2>
          <p className="text-gray-700 leading-relaxed">
            El responsable del tratamiento de sus datos personales es <strong>{CONFIG.BRAND_NAME}</strong>, con domicilio en España. Puede ponerse en contacto con nuestro equipo de privacidad y protección de datos enviando un correo electrónico a: <strong>privacidad@prointegra360.es</strong> o por correo postal dirigido a nuestra sede.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">2. Tipo de Datos Tratados</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Únicamente recopilamos y tratamos los datos de carácter profesional que usted nos facilita activamente a través de nuestros formularios en el sitio web (tales como el formulario para obtener el Kit de Migración o el de reserva de sesiones de consultoría). Estos datos incluyen:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Identificación: Nombre y apellidos.</li>
            <li>Datos de contacto profesional: Dirección de correo electrónico y número de teléfono.</li>
            <li>Información corporativa: Nombre de su taller mecánico, provincia y ciudad de ubicación.</li>
            <li>Información adicional: Principales preocupaciones o bloqueos que presenta con su software de gestión actual.</li>
            <li>Datos de navegación: Dirección IP truncada, ID de sesión y eventos de usuario (clics, descargas y páginas visitadas) para análisis de rendimiento.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">3. Finalidades del Tratamiento de Datos</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            En {CONFIG.BRAND_NAME} utilizaremos la información recabada para las siguientes finalidades fundamentales:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li><strong>Gestión de solicitudes y descargas:</strong> Permitirle la descarga del "Kit de Migración PRO" en formato digital (incluyendo plantillas de cálculo, checklists de migración y recursos interactivos).</li>
            <li><strong>Reserva de Sesiones Estratégicas Gratuitas:</strong> Coordinar y agendar la sesión de mentoría en vivo de aproximadamente 2 horas con nuestro equipo especializado en optimización de talleres mecánicos.</li>
            <li><strong>Automatización del servicio con n8n:</strong> Ejecutar los flujos de trabajo internos necesarios para registrar su petición al instante, validar el correo electrónico profesional y desencadenar las respuestas adecuadas.</li>
            <li><strong>Almacenamiento y custodia en Airtable:</strong> Guardar de forma estructurada e impecablemente protegida la base de datos de leads en repositorios en la nube gestionados en la plataforma Airtable.</li>
            <li><strong>Comunicaciones operativas y comerciales:</strong> Contactar con el usuario por teléfono, correo electrónico o canales de mensajería como WhatsApp (bajo consentimiento expreso previo) para configurar demos personalizadas o guías complementarias.</li>
            <li><strong>Seguimiento de comportamiento (Eventos):</strong> Monitorizar los indicadores de descarga de recursos, interacciones con el formulario y tasas globales de conversión para perfeccionar la experiencia del usuario final sobre nuestro portal.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">4. Legitimación para el Tratamiento</h2>
          <p className="text-gray-700 leading-relaxed">
            La base jurídica principal que legitima nuestros tratamientos de datos profesionales es el <strong>consentimiento expreso, libre e inequívoco</strong> manifestado directamente por el usuario al cumplimentar y enviar el formulario de registro y marcar afirmativamente los checkboxes obligatorios de aceptación de esta política. Del mismo modo, conservamos una legitimidad basada en la aplicación de medidas precontractuales al solicitar una sesión estratégica con un consultor.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">5. Destinatarios de sus Datos y Transferencia</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            No vendemos, alquilamos ni cedemos nunca sus datos a terceras partes bajo ningún concepto de marketing externo. Sus datos profesionales son compartidos estrictamente bajo altos estándares de confidencialidad con proveedores integrales de servicios informáticos (encargados del tratamiento), necesarios para la operación ordinaria del sitio:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li><strong>n8n:</strong> Proveedor tecnológico utilizado para automatizar respuestas e integrar de manera encriptada los envíos de los formularios con nuestras herramientas de base de datos.</li>
            <li><strong>Airtable:</strong> Repositorio seguro de bases de datos relacionales en la nube donde se centraliza la información bajo rigurosas claves de cifrado y cumplimiento con las directivas del RGPD.</li>
            <li>Servicios de alojamiento cloud bajo servidores ubicados al completo dentro de la Unión Europea.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">6. Plazo de Conservación de Datos</h2>
          <p className="text-gray-700 leading-relaxed">
            Los datos personales proporcionados se conservarán mientras se mantenga la relación profesional orientada a preparar la migración digital del taller, el usuario no revoque expresamente su consentimiento otorgado, o bien hasta que transcurran los periodos de prescripción de obligaciones legales exigibles tras la finalización de la campaña.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">7. Derechos del Interesado</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Como usuario tiene el derecho inalienable a ejercer el control sobre sus datos de acuerdo al Reglamento General de Protección de Datos (RGPD) mediante las siguientes facultades de acción:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li><strong>Derecho de Acceso:</strong> Conocer con precisión qué datos tratamos en nuestra propiedad.</li>
            <li><strong>Derecho de Rectificación:</strong> Corregir direcciones electrónicas incorrectas, teléfonos errados u otros datos del taller.</li>
            <li><strong>Derecho de Supresión (Derecho al Olvido):</strong> Solicitar el borrado definitivo de su registro en nuestra base de datos relacional de leads.</li>
            <li><strong>Derecho a la Limitación y Oposición:</strong> Restringir el uso que hacemos o impedir el envío de folletos comerciales.</li>
            <li><strong>Derecho de Portabilidad:</strong> Recibir los datos profesionales facilitados en un formato lógico y estructurado habitual.</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            Para ejercer cualquiera de estas acciones o revocar inmediatamente su consentimiento, tan solo debe remitirnos una comunicación escrita al correo electrónico <strong>privacidad@prointegra360.es</strong>, aportando una prueba válida de identidad (fotocopia de DNI o documento similar). Adicionalmente, dispone del derecho a interponer una reclamación formal ante la Agencia Española de Protección de Datos (AEPD).
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
