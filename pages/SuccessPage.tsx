
import React from 'react';
import { Mail, Calendar, CheckCircle2 } from 'lucide-react';
import { CONFIG } from '../constants';

const SuccessPage: React.FC = () => {
  return (
    <div className="py-20 px-4 bg-gray-50 flex items-center justify-center min-h-[70vh]">
      <div className="max-w-2xl w-full bg-white p-10 rounded-3xl shadow-xl text-center border border-gray-100">
        <div className="w-20 h-20 bg-brand-yellow/20 rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-brand-yellow">
          <CheckCircle2 className="w-12 h-12 text-brand-anthracite" />
        </div>
        <h1 className="text-3xl font-bold text-brand-anthracite mb-4">¡Solicitud recibida con éxito!</h1>
        <p className="text-lg text-gray-600 mb-10">
          Si aceptaste recibir el kit por email, <span className="font-bold text-brand-anthracite">revisa tu bandeja de entrada</span> (y la carpeta de spam) para confirmar tu suscripción y descargar los materiales.
        </p>

        <div className="bg-brand-anthracite p-8 rounded-2xl mb-8 shadow-inner">
          <h2 className="font-bold text-xl text-brand-yellow mb-4 flex items-center justify-center">
            <Calendar className="mr-2 w-6 h-6" /> ¿Quieres ver el software en acción?
          </h2>
          <p className="text-gray-300 mb-6">
            Ahorra semanas de investigación. Reserva una demo personalizada de 15 minutos y resuelve todas tus dudas técnicas.
          </p>
          <a 
            href={CONFIG.CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-brand-yellow text-brand-anthracite px-8 py-3 rounded-lg font-bold hover:opacity-90 transition shadow-lg"
          >
            Agendar Demo Gratuita
          </a>
        </div>

        <div className="flex flex-col items-center space-y-4 text-sm text-gray-400">
          <p className="flex items-center">
            <Mail className="w-4 h-4 mr-2" /> Un email de confirmación está en camino.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
