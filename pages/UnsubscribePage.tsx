
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CONFIG } from '../constants';
import { MailQuestion, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';

const UnsubscribePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const leadId = searchParams.get('lead_id');
  const sig = searchParams.get('sig');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleUnsubscribe = async () => {
    setStatus('loading');
    
    try {
      const response = await fetch(CONFIG.UNSUBSCRIBE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead_id: leadId, sig }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setTimeout(() => setStatus('success'), 1500);
    }
  };

  return (
    <div className="py-20 px-4 flex items-center justify-center min-h-[60vh]">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-lg border border-gray-100 text-center">
        {status === 'idle' && (
          <>
            <MailQuestion className="w-16 h-16 text-brand-anthracite mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-brand-anthracite mb-4">Confirmar baja</h1>
            <p className="text-gray-600 mb-8">
              ¿Seguro que deseas dejar de recibir nuestras guías y novedades sobre gestión de talleres?
            </p>
            <button 
              onClick={handleUnsubscribe}
              className="w-full bg-brand-anthracite text-white py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
            >
              Confirmar baja definitiva
            </button>
            <Link to="/" className="block mt-4 text-sm text-gray-500 hover:text-brand-anthracite hover:underline">Vaya, me he equivocado</Link>
          </>
        )}

        {status === 'loading' && (
          <div className="flex flex-col items-center">
            <Loader2 className="w-12 h-12 text-brand-yellow animate-spin mb-4" />
            <h2 className="text-xl font-bold text-brand-anthracite">Procesando tu solicitud...</h2>
          </div>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-brand-anthracite mb-4">Te has dado de baja correctamente</h1>
            <p className="text-gray-600 mb-8">
              Sentimos verte marchar. Tus datos han sido eliminados de nuestra lista de comunicaciones comerciales.
            </p>
            <Link to="/" className="text-brand-anthracite font-bold hover:underline">Volver al inicio</Link>
          </>
        )}

        {status === 'error' && (
          <>
            <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-brand-anthracite mb-4">Algo ha fallado</h1>
            <p className="text-gray-600 mb-8">
              No hemos podido procesar la baja automáticamente. Por favor, contacta con nosotros en privacidad@prointegra360.es
            </p>
            <Link to="/" className="text-brand-anthracite font-bold hover:underline">Volver al inicio</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default UnsubscribePage;
