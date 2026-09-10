
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CONFIG, FormSubmissionPayload } from '../constants';
import { trackTikTokSubmitForm } from '../services/tiktokPixel';

const MigrationForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    taller: '',
    email: '',
    telefono: '',
    consentPrivacidad: false,
    consentMarketing: false,
    consentContactoDirecto: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (error) setError(null);
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);

    // Basic validation
    if (formData.nombre.trim().length < 2) {
      setError("Por favor, introduce un nombre válido.");
      setLoading(false);
      return;
    }

    if (formData.taller.trim().length < 2) {
      setError("Por favor, introduce el nombre de tu taller.");
      setLoading(false);
      return;
    }

    if (!formData.email.trim()) {
      setError("Por favor, introduce tu email profesional.");
      setLoading(false);
      return;
    }

    if (!formData.consentPrivacidad) {
      setError("Debes aceptar la Política de Privacidad para continuar.");
      setLoading(false);
      return;
    }

    if (!formData.telefono.trim()) {
      setError("Indica un teléfono de contacto.");
      setLoading(false);
      return;
    }

    const utmParams = new URLSearchParams(window.location.search);
    
    const payload: FormSubmissionPayload = {
      nombre: formData.nombre.trim(),
      apellidos: "",
      taller: formData.taller.trim(),
      provincia: "",
      ciudad: "",
      telefono: formData.telefono.trim(),
      email: formData.email.trim(),
      preocupacion: "",
      consents: {
        privacidad: formData.consentPrivacidad,
        marketing: formData.consentMarketing,
        contactoDirecto: formData.consentContactoDirecto,
      },
      metadata: {
        timestamp: new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' }),
        page_url: window.location.href,
        user_agent: navigator.userAgent,
        ip: "unknown",
        utm: {
          source: utmParams.get('utm_source'),
          medium: utmParams.get('utm_medium'),
          campaign: utmParams.get('utm_campaign'),
          content: utmParams.get('utm_content'),
          term: utmParams.get('utm_term'),
        }
      }
    };

    try {
      const response = await fetch(CONFIG.FORM_SUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Error al enviar los datos");
      
      // Registrar evento de conversión de TikTok (SubmitForm) solo en envío exitoso
      trackTikTokSubmitForm();

      // Save email for later tracking in the Kit page
      localStorage.setItem('proi360_user_email', formData.email.trim());
      
      navigate('/kit-migracion');
    } catch (err) {
      console.error(err);
      setError("No hemos podido procesar tu solicitud en este momento. Tus datos no se han perdido. Por favor, inténtalo de nuevo en unos instantes.");
    } finally {
      setLoading(false);
    }
  };

  // Common classes for inputs to ensure white text and dark-friendly backgrounds
  const inputClasses = "w-full px-4 py-2 rounded-lg border border-gray-400 bg-brand-anthracite text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-yellow focus:border-transparent outline-none transition";
  const labelClasses = "block text-sm font-semibold text-brand-anthracite mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <p className="text-sm text-gray-600 font-medium">
        Recibirás gratuitamente la guía, checklist y plantilla de migración.
      </p>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-100 text-sm">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className={labelClasses}>Nombre *</label>
          <input
            required
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            type="text"
            className={inputClasses}
            placeholder="Tu nombre"
          />
        </div>
        <div>
          <label className={labelClasses}>Nombre del taller *</label>
          <input
            required
            name="taller"
            value={formData.taller}
            onChange={handleChange}
            type="text"
            className={inputClasses}
            placeholder="Ej: Talleres Martínez"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className={labelClasses}>Email profesional *</label>
          <input
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            className={inputClasses}
            placeholder="email@taller.com"
          />
        </div>
        <div>
          <label className={labelClasses}>Teléfono / WhatsApp *</label>
          <input
            required
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            type="tel"
            className={inputClasses}
            placeholder="600 000 000"
          />
          {error === "Indica un teléfono de contacto." && (
            <p className="mt-1 text-xs text-red-600 font-medium">
              Indica un teléfono de contacto.
            </p>
          )}
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-gray-200">
        <div>
          <label className="flex items-start cursor-pointer group">
            <input
              required
              name="consentPrivacidad"
              type="checkbox"
              checked={formData.consentPrivacidad}
              onChange={handleChange}
              className="mt-1 w-4 h-4 text-brand-anthracite border-gray-300 rounded focus:ring-brand-yellow accent-brand"
            />
            <span className="ml-3 text-sm text-gray-600 group-hover:text-brand-anthracite transition">
              He leído y acepto la <Link to="/politica-privacidad" className="text-brand-anthracite font-semibold underline">Política de Privacidad</Link>. *
            </span>
          </label>
          {error === "Debes aceptar la Política de Privacidad para continuar." && (
            <p className="mt-1 ml-7 text-xs text-red-600 font-medium">
              Debes aceptar la Política de Privacidad para continuar.
            </p>
          )}
        </div>

        <div className="pt-2">
          <p className="text-sm font-semibold text-brand-anthracite mb-3">
            ¿Quieres que te ayudemos también después de descargar el Kit?
          </p>

          <div className="space-y-3">
            <label className="flex items-start cursor-pointer group">
              <input
                name="consentMarketing"
                type="checkbox"
                checked={formData.consentMarketing}
                onChange={handleChange}
                className="mt-1 w-4 h-4 text-brand-anthracite border-gray-300 rounded focus:ring-brand-yellow accent-brand"
              />
              <span className="ml-3 text-sm text-gray-600 group-hover:text-brand-anthracite transition">
                Sí, quiero recibir por email una breve serie de consejos prácticos para migrar de software sin perder datos ni frenar el taller. Puedo darme de baja cuando quiera.
              </span>
            </label>

            <label className="flex items-start cursor-pointer group">
              <input
                name="consentContactoDirecto"
                type="checkbox"
                checked={formData.consentContactoDirecto}
                onChange={handleChange}
                className="mt-1 w-4 h-4 text-brand-anthracite border-gray-300 rounded focus:ring-brand-yellow accent-brand"
              />
              <span className="ml-3 text-sm text-gray-600 group-hover:text-brand-anthracite transition">
                Sí, quiero que un especialista de PRO Integra360 revise mi caso y me contacte por teléfono o WhatsApp para orientarme, sin compromiso.
              </span>
            </label>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-4 px-8 rounded-xl text-brand-anthracite font-bold text-lg shadow-lg transition transform active:scale-95 ${loading ? 'bg-brand-yellow/50 cursor-not-allowed' : 'bg-brand-yellow hover:opacity-90'}`}
      >
        {loading ? 'Procesando...' : '¡Quiero el Kit de Migración!'}
      </button>

      <p className="text-center text-xs text-gray-400">
        Tus datos están seguros. No compartimos información con terceros. Cumplimos con el RGPD.
      </p>
    </form>
  );
};

export default MigrationForm;
