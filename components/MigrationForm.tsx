
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CONFIG, FormSubmissionPayload } from '../constants';

const MigrationForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    taller: '',
    provincia: '',
    ciudad: '',
    telefono: '',
    email: '',
    preocupacion: '',
    consentPrivacidad: false,
    consentMarketing: false,
    consentContactoDirecto: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic spam check
    if (formData.nombre.length < 2) {
      setError("Por favor, introduce un nombre válido.");
      setLoading(false);
      return;
    }

    const utmParams = new URLSearchParams(window.location.search);
    
    const payload: FormSubmissionPayload = {
      nombre: formData.nombre,
      apellidos: formData.apellidos,
      taller: formData.taller,
      provincia: formData.provincia,
      ciudad: formData.ciudad,
      telefono: formData.telefono,
      email: formData.email,
      preocupacion: formData.preocupacion,
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
      
      // Save email for later tracking in the Kit page
      localStorage.setItem('proi360_user_email', formData.email);
      
      navigate('/kit-migracion');
    } catch (err) {
      console.error(err);
      navigate('/kit-migracion');
    } finally {
      setLoading(false);
    }
  };

  // Common classes for inputs to ensure white text and dark-friendly backgrounds
  const inputClasses = "w-full px-4 py-2 rounded-lg border border-gray-400 bg-brand-anthracite text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-yellow focus:border-transparent outline-none transition";
  const labelClasses = "block text-sm font-semibold text-brand-anthracite mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
          <label className={labelClasses}>Apellidos *</label>
          <input
            required
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            type="text"
            className={inputClasses}
            placeholder="Tus apellidos"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
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
        <div>
          <label className={labelClasses}>Teléfono *</label>
          <input
            required
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            type="tel"
            className={inputClasses}
            placeholder="600 000 000"
          />
        </div>
      </div>

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

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className={labelClasses}>Provincia *</label>
          <select
            required
            name="provincia"
            value={formData.provincia}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="" className="text-gray-900">Selecciona...</option>
            {CONFIG.PROVINCIAS_ESPANA.map(p => <option key={p} value={p} className="text-gray-900">{p}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClasses}>Ciudad *</label>
          <input
            required
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            type="text"
            className={inputClasses}
            placeholder="Ciudad"
          />
        </div>
      </div>

      <div>
        <label className={labelClasses}>¿Qué te preocupa más del cambio? (Opcional)</label>
        <textarea
          name="preocupacion"
          value={formData.preocupacion}
          onChange={handleChange}
          rows={3}
          className={inputClasses}
          placeholder="Ej: Perder datos, tiempo de formación..."
        />
      </div>

      <div className="space-y-4 pt-4 border-t border-gray-200">
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
            He leído y acepto la <Link to="/privacidad" className="text-brand-anthracite font-semibold underline">Política de Privacidad</Link> *
          </span>
        </label>

        <label className="flex items-start cursor-pointer group">
          <input
            name="consentMarketing"
            type="checkbox"
            checked={formData.consentMarketing}
            onChange={handleChange}
            className="mt-1 w-4 h-4 text-brand-anthracite border-gray-300 rounded focus:ring-brand-yellow accent-brand"
          />
          <span className="ml-3 text-sm text-gray-600 group-hover:text-brand-anthracite transition">
            Quiero recibir por email el Kit y comunicaciones comerciales sobre {CONFIG.BRAND_NAME}. Puedo darme de baja en cualquier momento.
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
            Acepto que me contactéis por teléfono/WhatsApp para coordinar la demo.
          </span>
        </label>
      </div>

      {!formData.consentMarketing && formData.email && (
        <p className="text-xs text-brand-anthracite bg-brand-yellow/20 p-2 rounded border border-brand-yellow/30">
          Nota: Si no marcas la casilla de marketing, no podremos enviarte el Kit por email. Solo te contactaremos por el medio que autorices para la demo.
        </p>
      )}

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
