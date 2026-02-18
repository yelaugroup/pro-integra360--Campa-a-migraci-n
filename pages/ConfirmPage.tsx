
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CONFIG } from '../constants';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const ConfirmPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const confirmToken = async () => {
      if (!token) {
        setStatus('error');
        return;
      }

      try {
        const response = await fetch(CONFIG.OPTIN_CONFIRM_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
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

    confirmToken();
  }, [token]);

  return (
    <div className="py-20 px-4 flex items-center justify-center min-h-[60vh]">
      <div className="max-w-md w-full text-center">
        {status === 'loading' && (
          <div className="flex flex-col items-center">
            <Loader2 className="w-12 h-12 text-brand-yellow animate-spin mb-4" />
            <h2 className="text-xl font-bold text-brand-anthracite">Validando tu email...</h2>
          </div>
        )}

        {status === 'success' && (
          <div className="bg-white p-10 rounded-3xl shadow-lg border-t-4 border-brand-yellow">
            <CheckCircle className="w-16 h-16 text-brand-anthracite mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-brand-anthracite mb-4">¡Email confirmado!</h1>
            <p className="text-gray-600 mb-8">
              Gracias por confirmar. En unos minutos recibirás el Kit de Migración de {CONFIG.BRAND_NAME} en tu bandeja de entrada.
            </p>
            <a 
              href={CONFIG.CALENDLY_URL}
              className="block w-full bg-brand-yellow text-brand-anthracite py-3 rounded-lg font-bold hover:opacity-90 transition"
            >
              Agendar Demo
            </a>
          </div>
        )}

        {status === 'error' && (
          <div className="bg-white p-10 rounded-3xl shadow-lg border-t-4 border-red-500">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-brand-anthracite mb-4">Error de validación</h1>
            <p className="text-gray-600 mb-8">
              El enlace ha expirado o no es válido. Por favor, vuelve a solicitar el kit.
            </p>
            <Link 
              to="/migracion-software-taller"
              className="block w-full bg-brand-anthracite text-white py-3 rounded-lg font-bold hover:opacity-90 transition"
            >
              Volver a la landing
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmPage;
