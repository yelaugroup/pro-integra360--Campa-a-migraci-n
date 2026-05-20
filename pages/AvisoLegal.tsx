import React from 'react';
import { CONFIG } from '../constants';

const AvisoLegal: React.FC = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate select-none">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Aviso Legal</h1>
        
        <p className="text-gray-600 mb-6 text-sm">
          Última actualización: Mayo de 2026.
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">1. Datos Identificativos</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            En cumplimiento con el deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), a continuación se reflejan los siguientes datos de información general del sitio web:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li><strong>Titular:</strong> {CONFIG.BRAND_NAME}</li>
            <li><strong>Domicilio Social:</strong> Madrid, España</li>
            <li><strong>Email de contacto:</strong> contacto@prointegra360.es</li>
            <li><strong>Actividad principal:</strong> Servicios de consultoría, migración de datos y soluciones de digitalización de software para talleres de automoción.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">2. Objeto y Ámbito de Aplicación</h2>
          <p className="text-gray-700 leading-relaxed">
            Este Aviso Legal regula el uso del presente sitio web, el cual está orientado a la captación de clientes potenciales (leads) para la campaña de migración y optimización de software de gestión en talleres mecánicos. La navegación por el sitio le atribuye la condición de usuario, implicando la aceptación plena de estas condiciones.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">3. Condiciones de Uso y Funcionamiento</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            El usuario se compromete a hacer un uso adecuado y lícito de los contenidos y servicios de este sitio web. Queda prohibida la introducción de datos falsos, inexactos o de terceros en los formularios de registro y contacto.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Para acceder a recursos descargables (como el Kit de Migración) o agendar una sesión estratégica gratuita de 2 horas sobre la operativa de su taller, el usuario debe facilitar sus datos profesionales de manera voluntaria, los cuales serán procesados mediante flujos de automatización integrados con plataformas seguras de terceros.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">4. Propiedad Intelectual e Industrial</h2>
          <p className="text-gray-700 leading-relaxed">
            Todos los derechos de propiedad intelectual del contenido de esta página web, sus recursos descargables, textos, imágenes, logotipos, combinaciones de colores y estructura de navegación pertenecen a {CONFIG.BRAND_NAME} o a sus licenciantes. Queda prohibida cualquier reproducción, distribución o comunicación pública, total o parcial, sin autorización previa y escrita del titular.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">5. Exclusión de Responsabilidad</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            {CONFIG.BRAND_NAME} no se hace responsable de los daños y perjuicios que pudieran derivarse de interferencias, omisiones, interrupciones, virus informáticos o desconexiones en el funcionamiento operativo de este sistema electrónico por causas ajenas.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Asimismo, no se garantiza el perfecto funcionamiento de enlaces a sitios externos, ni se asume responsabilidad alguna sobre las políticas o contenidos de terceros enlazados fuera de este dominio.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">6. Ley Aplicable y Jurisdicción</h2>
          <p className="text-gray-700 leading-relaxed">
            Para la resolución de todas las controversias o cuestiones relacionadas con el presente sitio web o de las actividades en él desarrolladas, será de aplicación la legislación española, a la que se someten expresamente las partes, siendo competentes para la resolución de todos los conflictos derivados o relacionados con su uso los Juzgados y Tribunales de Madrid de conformidad con las normativas vigentes.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AvisoLegal;
