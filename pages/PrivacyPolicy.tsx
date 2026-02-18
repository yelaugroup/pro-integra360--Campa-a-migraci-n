
import React from 'react';
import { CONFIG } from '../constants';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Política de Privacidad</h1>
        
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">1. Responsable del Tratamiento</h2>
          <p>
            El responsable del tratamiento de sus datos es {CONFIG.BRAND_NAME} (en adelante, la Empresa), con domicilio en España. 
            Puede contactar con nuestro Delegado de Protección de Datos a través del email: privacidad@prointegra360.es
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">2. Finalidades del Tratamiento</h2>
          <p>Sus datos serán tratados para:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Gestionar su solicitud de descarga del "Kit de Migración".</li>
            <li>En caso de consentimiento explícito, enviarle comunicaciones comerciales relacionadas con nuestro software.</li>
            <li>Gestionar la solicitud de demos personalizadas y contacto telefónico/WhatsApp.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">3. Base Jurídica</h2>
          <p>
            La base legal para el tratamiento de sus datos es su consentimiento otorgado de forma libre, específica e informada 
            al marcar las casillas correspondientes en nuestro formulario.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">4. Destinatarios</h2>
          <p>
            No se cederán datos a terceros salvo obligación legal. Los datos son gestionados mediante herramientas de terceros 
            para la automatización del marketing y almacenamiento seguro (Airtable y sistemas de envío de terceros), 
            cumpliendo con los estándares de seguridad requeridos.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">5. Conservación de datos</h2>
          <p>
            Los datos se conservarán mientras exista un interés mutuo para mantener el fin del tratamiento o hasta que usted 
            solicite su supresión.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">6. Derechos del Usuario</h2>
          <p>Usted tiene derecho a:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Acceso, rectificación y supresión de sus datos.</li>
            <li>Limitación u oposición al tratamiento.</li>
            <li>Portabilidad de los datos.</li>
            <li>Retirar su consentimiento en cualquier momento.</li>
          </ul>
          <p className="mt-4">
            Puede ejercer estos derechos enviando un email a privacidad@prointegra360.es adjuntando copia de su DNI o documento equivalente.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
