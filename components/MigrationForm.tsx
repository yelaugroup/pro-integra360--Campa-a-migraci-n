
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CONFIG, FormSubmissionPayload } from '../constants';
import { trackTikTokSubmitForm } from '../services/tiktokPixel';
import { trackFunnelEvent } from '../services/eventTracker';
import { captureAndStoreUtms, getResolvedUtms } from '../services/utmManager';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  PhoneCall, 
  Mail, 
  Building2, 
  User, 
  AlertCircle,
  MessageSquare,
  Users,
  Laptop,
  Check
} from 'lucide-react';

declare const fbq: any;

const EXCLUSIVE_RETO = 'Solo quiero evaluar las herramientas del Kit';

const RETOS_TALLER = [
  {
    id: 'dependencia_personas',
    title: 'Todo acaba pasando por mí',
    desc: 'Falta de procesos claros o dependencia excesiva de personas clave.',
  },
  {
    id: 'informacion_dispersa',
    title: 'Información dispersa en el equipo',
    desc: 'Notas, papeles o WhatsApps que provocan olvidos, dudas y errores.',
  },
  {
    id: 'tiempos_muertos',
    title: 'Coches parados y cuellos de botella',
    desc: 'Esperas por recambios, presupuestos sin cerrar o piezas sin asignar.',
  },
  {
    id: 'control_rentabilidad',
    title: 'Falta de control de tiempos y margen',
    desc: 'Mucho volumen de faena pero poca claridad en la rentabilidad mensual.',
  },
  {
    id: 'evaluar_kit',
    title: 'Solo quiero evaluar las herramientas del Kit',
    desc: 'Quiero revisar la guía, el checklist y las plantillas a mi ritmo.',
  },
];

const WORKSHOP_SIZE_OPTIONS: { id: '1-2' | '3-5' | '6-10' | '10+'; label: string }[] = [
  { id: '1-2', label: '1–2 personas' },
  { id: '3-5', label: '3–5 personas' },
  { id: '6-10', label: '6–10 personas' },
  { id: '10+', label: 'Más de 10' },
];

const MigrationForm: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formStartedRef = useRef(false);
  const formElementRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    nombre: '',
    taller: '',
    email: '',
    // Segmentación
    retos_actuales: [] as string[],
    workshop_size: '3-5' as '1-2' | '3-5' | '6-10' | '10+',
    uses_management_software: true as boolean,
    // Contacto personalizado: 'whatsapp' | 'phone' | 'none'
    contact_preference: '' as 'whatsapp' | 'phone' | 'none' | '',
    telefono: '',
    // Consentimientos legales
    consentPrivacidad: true,
    consentMarketing: true,
  });

  // Al montar, capturar y almacenar en sessionStorage cualquier UTM presente en la URL
  useEffect(() => {
    captureAndStoreUtms();
  }, []);

  // Tracking: form_view cuando el formulario entra en viewport
  useEffect(() => {
    const el = formElementRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    let viewed = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !viewed) {
          viewed = true;
          trackFunnelEvent('form_view');
        }
      });
    }, { threshold: 0.2 });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const markFormStarted = () => {
    if (!formStartedRef.current) {
      formStartedRef.current = true;
      trackFunnelEvent('form_start');
    }
  };

  const handleInputChange = (field: string, value: any) => {
    markFormStarted();
    if (error) setError(null);
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Manejo de multiselección con opción exclusiva para los retos del Paso 3
  const handleToggleReto = (title: string) => {
    markFormStarted();
    if (error) setError(null);

    setFormData(prev => {
      const current = prev.retos_actuales;
      const isAlreadySelected = current.includes(title);

      let nextRetos: string[];

      if (title === EXCLUSIVE_RETO) {
        if (isAlreadySelected) {
          // Si hace clic en la exclusiva y ya estaba, se desmarca
          nextRetos = [];
        } else {
          // Si selecciona la exclusiva, desmarca automáticamente todas las demás
          nextRetos = [EXCLUSIVE_RETO];
        }
      } else {
        if (isAlreadySelected) {
          // Desmarcar esta opción normal
          nextRetos = current.filter(r => r !== title);
        } else {
          // Marcar esta opción normal y desmarcar automáticamente la opción exclusiva si estuviera activa
          nextRetos = [...current.filter(r => r !== EXCLUSIVE_RETO), title];
        }
      }

      return {
        ...prev,
        retos_actuales: nextRetos,
      };
    });
  };

  // Validaciones por paso
  const validateStep1 = (): boolean => {
    if (formData.nombre.trim().length < 2) {
      setError("Por favor, introduce tu nombre.");
      return false;
    }
    if (formData.taller.trim().length < 2) {
      setError("Por favor, introduce el nombre de tu taller.");
      return false;
    }
    return true;
  };

  const validateStep2 = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setError("Por favor, introduce una dirección de email válida.");
      return false;
    }
    return true;
  };

  const validateStep3 = (): boolean => {
    if (!formData.retos_actuales || formData.retos_actuales.length === 0) {
      setError("Por favor, selecciona al menos un reto para continuar.");
      return false;
    }
    if (!formData.workshop_size) {
      setError("Por favor, indica cuántas personas trabajan actualmente en tu taller.");
      return false;
    }
    if (formData.uses_management_software === null || formData.uses_management_software === undefined) {
      setError("Por favor, indica si utilizas actualmente algún software de gestión.");
      return false;
    }
    return true;
  };

  const validateStep4 = (): boolean => {
    if (!formData.contact_preference) {
      setError("Por favor, selecciona una opción para continuar.");
      return false;
    }
    if (formData.contact_preference === 'whatsapp' || formData.contact_preference === 'phone') {
      const cleanPhone = formData.telefono.trim().replace(/\s+/g, '');
      if (cleanPhone.length < 8) {
        const tipoContacto = formData.contact_preference === 'whatsapp' ? 'WhatsApp' : 'teléfono';
        setError(`Por favor, introduce un número de ${tipoContacto} válido.`);
        return false;
      }
    }
    return true;
  };

  const validateStep5 = (): boolean => {
    if (!formData.consentPrivacidad) {
      setError("Debes aceptar la Política de Privacidad para continuar.");
      return false;
    }
    return true;
  };

  const handleNextStep = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);

    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    if (currentStep === 3 && !validateStep3()) return;
    if (currentStep === 4 && !validateStep4()) return;

    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
      const container = document.getElementById('formulario-kit');
      if (container) {
        container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  const handlePrevStep = () => {
    setError(null);
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Submit final: se ejecuta de forma exclusiva en el paso 5
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError(null);

    if (!validateStep1() || !validateStep2() || !validateStep3() || !validateStep4() || !validateStep5()) {
      return;
    }

    setLoading(true);

    const resolvedUtms = getResolvedUtms();
    const hasPhoneContact = (formData.contact_preference === 'whatsapp' || formData.contact_preference === 'phone') && formData.telefono.trim().length > 0;
    
    // Payload retrocompatible: mantiene todos los campos previos e incorpora contact_preference, workshop_size y uses_management_software
    const payload: FormSubmissionPayload = {
      nombre: formData.nombre.trim(),
      apellidos: "",
      taller: formData.taller.trim(),
      provincia: "",
      ciudad: "",
      telefono: hasPhoneContact ? formData.telefono.trim() : "",
      email: formData.email.trim(),
      "Retos actuales": formData.retos_actuales,
      retos_actuales: formData.retos_actuales,
      contact_preference: (formData.contact_preference as 'whatsapp' | 'phone' | 'none') || 'none',
      workshop_size: formData.workshop_size,
      uses_management_software: formData.uses_management_software,
      consents: {
        privacidad: formData.consentPrivacidad,
        marketing: formData.consentMarketing,
        contactoDirecto: hasPhoneContact,
      },
      metadata: {
        timestamp: new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' }),
        page_url: window.location.href,
        user_agent: navigator.userAgent,
        ip: "unknown",
        utm: {
          source: resolvedUtms.source,
          medium: resolvedUtms.medium,
          campaign: resolvedUtms.campaign,
          content: resolvedUtms.content,
          term: resolvedUtms.term,
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
      
      // Tracking: form_submit_success (sin datos PII / sin email)
      trackFunnelEvent('form_submit_success');

      // Registrar evento de conversión de TikTok (SubmitForm) solo en envío exitoso
      trackTikTokSubmitForm();

      // Registrar evento CompleteRegistration de Meta Pixel solo en envío exitoso
      if (typeof fbq === 'function') {
        fbq('track', 'CompleteRegistration');
      }

      // Guardar email en localStorage para la página de recursos del Kit
      localStorage.setItem('proi360_user_email', formData.email.trim());
      
      navigate('/kit-migracion');
    } catch (err) {
      console.error(err);
      // Tracking: form_submit_error (sin datos PII / sin email)
      trackFunnelEvent('form_submit_error');
      setError("No hemos podido procesar tu solicitud en este momento. Tus datos no se han perdido. Por favor, inténtalo de nuevo en unos instantes.");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "w-full px-4 py-3.5 rounded-xl border border-gray-400 bg-brand-anthracite text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-yellow focus:border-transparent outline-none transition text-base";
  const labelClasses = "block text-sm font-bold text-brand-anthracite mb-1.5";

  return (
    <div ref={formElementRef} className="space-y-6">
      
      {/* Cabecera del Stepper con indicador de progreso */}
      <div className="border-b border-gray-200/80 pb-5">
        <div className="flex items-center justify-between mb-3">
          <div className="inline-flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-yellow"></span>
            <span className="text-xs font-black uppercase tracking-widest text-brand-anthracite">
              Kit PRO Integra360
            </span>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-brand-anthracite text-white">
            Paso {currentStep} de 5
          </span>
        </div>

        {/* Barra de progreso */}
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-brand-yellow h-full transition-all duration-300 ease-out rounded-full"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Alerta de error global */}
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 text-sm flex items-start gap-2.5 animate-fadeIn">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* ================================================== */}
      {/* PASO 1 — SOBRE TI */}
      {/* ================================================== */}
      {currentStep === 1 && (
        <form onSubmit={handleNextStep} className="space-y-5">
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-black text-brand-anthracite uppercase tracking-tight">
              Empecemos por conocerte
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Solo necesitaremos unos datos para preparar tu acceso al Kit PRO Integra360.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <label className={labelClasses}>
                Tu nombre <span className="text-brand-yellow font-black">*</span>
              </label>
              <div className="relative">
                <input
                  autoFocus
                  required
                  name="nombre"
                  value={formData.nombre}
                  onChange={(e) => handleInputChange('nombre', e.target.value)}
                  type="text"
                  className={inputClasses}
                  placeholder="Tu nombre y primer apellido"
                  autoComplete="given-name"
                />
              </div>
            </div>

            <div>
              <label className={labelClasses}>
                Nombre del taller <span className="text-brand-yellow font-black">*</span>
              </label>
              <div className="relative">
                <input
                  required
                  name="taller"
                  value={formData.taller}
                  onChange={(e) => handleInputChange('taller', e.target.value)}
                  type="text"
                  className={inputClasses}
                  placeholder="Ej: Talleres Mecánicos Gómez"
                  autoComplete="organization"
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-xl bg-brand-yellow text-brand-anthracite font-black text-base sm:text-lg shadow-lg hover:shadow-xl hover:opacity-95 transition transform active:scale-95 uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>Continuar</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
            <p className="text-center text-xs text-gray-500 mt-3 font-medium">
              Paso 1 de 5 · Sin compromiso comercial
            </p>
          </div>
        </form>
      )}

      {/* ================================================== */}
      {/* PASO 2 — ¿DÓNDE TE ENVIAMOS EL KIT? */}
      {/* ================================================== */}
      {currentStep === 2 && (
        <form onSubmit={handleNextStep} className="space-y-5">
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-black text-brand-anthracite uppercase tracking-tight">
              ¿Dónde te enviamos el Kit?
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Te enviaremos el acceso directo a los recursos por correo.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <label className={labelClasses}>
                Email profesional o habitual <span className="text-brand-yellow font-black">*</span>
              </label>
              <div className="relative">
                <input
                  autoFocus
                  required
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  type="email"
                  className={inputClasses}
                  placeholder="email@taller.com"
                  autoComplete="email"
                />
              </div>
              <p className="mt-2 text-xs text-gray-500 leading-normal">
                Te enviaremos el enlace para descargar la guía, el checklist y las plantillas.
              </p>
            </div>
          </div>

          <div className="pt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrevStep}
              className="py-4 px-5 rounded-xl border border-gray-300 bg-white text-gray-700 font-bold hover:bg-gray-50 transition active:scale-95 flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Atrás</span>
            </button>

            <button
              type="submit"
              className="flex-1 py-4 px-6 rounded-xl bg-brand-yellow text-brand-anthracite font-black text-base sm:text-lg shadow-lg hover:shadow-xl hover:opacity-95 transition transform active:scale-95 uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>Continuar</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </form>
      )}

      {/* ================================================== */}
      {/* PASO 3 — SEGMENTACIÓN / SITUACIÓN ACTUAL */}
      {/* ================================================== */}
      {currentStep === 3 && (
        <form onSubmit={handleNextStep} className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-black text-brand-anthracite uppercase tracking-tight">
              ¿Cuál es tu mayor reto hoy?
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Cuéntanos brevemente cómo funciona tu taller para adaptar los ejemplos y plantillas del Kit.
            </p>
          </div>

          {/* Pregunta 1: Principal reto actual en el taller (multiselección con opción exclusiva) */}
          <div className="space-y-2">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-gray-500">
                1. Principal reto actual en el taller:
              </label>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                Puedes seleccionar más de una opción.
              </p>
            </div>
            <div className="space-y-2">
              {RETOS_TALLER.map((item) => {
                const isSelected = formData.retos_actuales.includes(item.title);
                return (
                  <div
                    key={item.id}
                    onClick={() => handleToggleReto(item.title)}
                    className={`p-3.5 rounded-xl border-2 cursor-pointer transition text-left flex items-start gap-3 ${
                      isSelected
                        ? 'border-brand-anthracite bg-white shadow-sm'
                        : 'border-gray-200 bg-gray-50/70 hover:border-gray-400 hover:bg-white'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition ${
                      isSelected
                        ? 'border-brand-anthracite bg-brand-anthracite text-brand-yellow'
                        : 'border-gray-400 bg-white'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 text-brand-yellow stroke-[3.5]" />}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-brand-anthracite leading-tight">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pregunta 2: ¿Cuántas personas trabajan actualmente en tu taller? (workshop_size) */}
          <div className="space-y-2 pt-2 border-t border-gray-150">
            <label className="block text-xs font-black uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-brand-yellow" />
              <span>2. ¿Cuántas personas trabajan actualmente en tu taller?</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {WORKSHOP_SIZE_OPTIONS.map((opt) => {
                const isSelected = formData.workshop_size === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleInputChange('workshop_size', opt.id)}
                    className={`py-3 px-3 rounded-xl border-2 text-center transition font-bold text-sm flex items-center justify-center ${
                      isSelected
                        ? 'border-brand-anthracite bg-brand-anthracite text-brand-yellow shadow'
                        : 'border-gray-200 bg-gray-50/80 text-brand-anthracite hover:border-gray-400 hover:bg-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pregunta 3: ¿Utilizas actualmente algún software de gestión? (uses_management_software) */}
          <div className="space-y-2 pt-2 border-t border-gray-150">
            <label className="block text-xs font-black uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
              <Laptop className="w-3.5 h-3.5 text-brand-yellow" />
              <span>3. ¿Utilizas actualmente algún software de gestión?</span>
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleInputChange('uses_management_software', true)}
                className={`py-3 px-4 rounded-xl border-2 text-center transition font-bold text-sm flex items-center justify-center gap-2 ${
                  formData.uses_management_software === true
                    ? 'border-brand-anthracite bg-brand-anthracite text-brand-yellow shadow'
                    : 'border-gray-200 bg-gray-50/80 text-brand-anthracite hover:border-gray-400 hover:bg-white'
                }`}
              >
                <span>Sí, usamos software</span>
              </button>
              <button
                type="button"
                onClick={() => handleInputChange('uses_management_software', false)}
                className={`py-3 px-4 rounded-xl border-2 text-center transition font-bold text-sm flex items-center justify-center gap-2 ${
                  formData.uses_management_software === false
                    ? 'border-brand-anthracite bg-brand-anthracite text-brand-yellow shadow'
                    : 'border-gray-200 bg-gray-50/80 text-brand-anthracite hover:border-gray-400 hover:bg-white'
                }`}
              >
                <span>No, sin software aún</span>
              </button>
            </div>
          </div>

          <div className="pt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrevStep}
              className="py-4 px-5 rounded-xl border border-gray-300 bg-white text-gray-700 font-bold hover:bg-gray-50 transition active:scale-95 flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Atrás</span>
            </button>

            <button
              type="submit"
              disabled={formData.retos_actuales.length === 0}
              className={`flex-1 py-4 px-6 rounded-xl font-black text-base sm:text-lg uppercase tracking-wider flex items-center justify-center gap-2 transition ${
                formData.retos_actuales.length === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                  : 'bg-brand-yellow text-brand-anthracite shadow-lg hover:shadow-xl hover:opacity-95 transform active:scale-95'
              }`}
            >
              <span>Continuar</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </form>
      )}

      {/* ================================================== */}
      {/* PASO 4 — AYUDA PERSONALIZADA / 3 OPCIONES INDEPENDIENTES */}
      {/* ================================================== */}
      {currentStep === 4 && (
        <form onSubmit={handleNextStep} className="space-y-5">
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-black text-brand-anthracite uppercase tracking-tight">
              ¿Quieres ayuda personalizada?
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Podemos orientarte brevemente según la situación de tu taller. Si prefieres revisar el Kit por tu cuenta, no hay ningún problema.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {/* Opción 1: Sí, prefiero una llamada */}
            <div
              onClick={() => handleInputChange('contact_preference', 'phone')}
              className={`p-4 rounded-xl border-2 cursor-pointer transition text-left flex items-start gap-3.5 ${
                formData.contact_preference === 'phone'
                  ? 'border-brand-anthracite bg-white shadow-md'
                  : 'border-gray-200 bg-gray-50/80 hover:border-gray-400 hover:bg-white'
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                formData.contact_preference === 'phone'
                  ? 'border-brand-anthracite bg-brand-anthracite text-brand-yellow'
                  : 'border-gray-400 bg-white'
              }`}>
                {formData.contact_preference === 'phone' && <div className="w-2 h-2 rounded-full bg-brand-yellow" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-sm sm:text-base text-brand-anthracite leading-tight">
                    Sí, prefiero una llamada
                  </p>
                  <span className="text-[11px] font-black uppercase px-2 py-0.5 rounded bg-brand-yellow/30 text-brand-anthracite border border-brand-yellow/60">
                    Recomendado
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-normal">
                  Un especialista de PRO Integra360 te llamará unos minutos para orientarte sin compromiso.
                </p>
              </div>
            </div>

            {/* Opción 2: Sí, por WhatsApp */}
            <div
              onClick={() => handleInputChange('contact_preference', 'whatsapp')}
              className={`p-4 rounded-xl border-2 cursor-pointer transition text-left flex items-start gap-3.5 ${
                formData.contact_preference === 'whatsapp'
                  ? 'border-brand-anthracite bg-white shadow-md'
                  : 'border-gray-200 bg-gray-50/80 hover:border-gray-400 hover:bg-white'
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                formData.contact_preference === 'whatsapp'
                  ? 'border-brand-anthracite bg-brand-anthracite text-brand-yellow'
                  : 'border-gray-400 bg-white'
              }`}>
                {formData.contact_preference === 'whatsapp' && <div className="w-2 h-2 rounded-full bg-brand-yellow" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-sm sm:text-base text-brand-anthracite leading-tight">
                    Sí, por WhatsApp
                  </p>
                  <span className="text-[11px] font-black uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Rápido
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-normal">
                  Te escribiremos un mensaje breve para resolver dudas sobre tu caso concreto sin llamadas imprevistas.
                </p>
              </div>
            </div>

            {/* Opción 3: No por ahora */}
            <div
              onClick={() => handleInputChange('contact_preference', 'none')}
              className={`p-4 rounded-xl border-2 cursor-pointer transition text-left flex items-start gap-3.5 ${
                formData.contact_preference === 'none'
                  ? 'border-brand-anthracite bg-white shadow-md'
                  : 'border-gray-200 bg-gray-50/80 hover:border-gray-400 hover:bg-white'
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                formData.contact_preference === 'none'
                  ? 'border-brand-anthracite bg-brand-anthracite text-brand-yellow'
                  : 'border-gray-400 bg-white'
              }`}>
                {formData.contact_preference === 'none' && <div className="w-2 h-2 rounded-full bg-brand-yellow" />}
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm sm:text-base text-brand-anthracite leading-tight">
                  No por ahora
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-normal">
                  Descarga libre de la guía, checklist y plantillas para aplicarlos a tu ritmo, sin llamadas ni mensajes.
                </p>
              </div>
            </div>

            {/* Campo condicional para Llamada */}
            {formData.contact_preference === 'phone' && (
              <div className="pt-3 p-4 bg-brand-anthracite/5 rounded-xl border border-brand-anthracite/10 animate-fadeIn space-y-2">
                <label className={labelClasses}>
                  Número de teléfono <span className="text-brand-yellow font-black">*</span>
                </label>
                <input
                  autoFocus
                  required
                  name="telefono"
                  value={formData.telefono}
                  onChange={(e) => handleInputChange('telefono', e.target.value)}
                  type="tel"
                  className={inputClasses}
                  placeholder="600 000 000"
                  autoComplete="tel"
                />
                <p className="text-xs text-gray-500 font-normal">
                  Te llamaremos brevemente en horario comercial para orientarte.
                </p>
              </div>
            )}

            {/* Campo condicional para WhatsApp */}
            {formData.contact_preference === 'whatsapp' && (
              <div className="pt-3 p-4 bg-brand-anthracite/5 rounded-xl border border-brand-anthracite/10 animate-fadeIn space-y-2">
                <label className={labelClasses}>
                  Número de WhatsApp <span className="text-brand-yellow font-black">*</span>
                </label>
                <input
                  autoFocus
                  required
                  name="telefono"
                  value={formData.telefono}
                  onChange={(e) => handleInputChange('telefono', e.target.value)}
                  type="tel"
                  className={inputClasses}
                  placeholder="600 000 000"
                  autoComplete="tel"
                />
                <p className="text-xs text-gray-500 font-normal">
                  Solo te escribiremos por WhatsApp para darte soporte sobre el Kit y tu taller.
                </p>
              </div>
            )}
          </div>

          <div className="pt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrevStep}
              className="py-4 px-5 rounded-xl border border-gray-300 bg-white text-gray-700 font-bold hover:bg-gray-50 transition active:scale-95 flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Atrás</span>
            </button>

            <button
              type="submit"
              disabled={!formData.contact_preference}
              className={`flex-1 py-4 px-6 rounded-xl font-black text-base sm:text-lg uppercase tracking-wider flex items-center justify-center gap-2 transition ${
                !formData.contact_preference
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                  : 'bg-brand-yellow text-brand-anthracite shadow-lg hover:shadow-xl hover:opacity-95 transform active:scale-95'
              }`}
            >
              <span>Continuar</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </form>
      )}

      {/* ================================================== */}
      {/* PASO 5 — CONFIRMACIÓN Y DESCARGA DEL KIT */}
      {/* ================================================== */}
      {currentStep === 5 && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-black text-brand-anthracite uppercase tracking-tight">
              Todo listo para acceder al Kit
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Confirma tus datos para descargar los materiales y enviarte el acceso directo.
            </p>
          </div>

          {/* Resumen limpio de los datos recopilados */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3 text-sm">
            <div className="flex items-center justify-between pb-2.5 border-b border-gray-150">
              <span className="text-gray-500 font-medium">Taller y titular:</span>
              <span className="font-bold text-brand-anthracite text-right">
                {formData.nombre} ({formData.taller})
              </span>
            </div>
            <div className="flex items-center justify-between pb-2.5 border-b border-gray-150">
              <span className="text-gray-500 font-medium">Email de recepción:</span>
              <span className="font-bold text-brand-anthracite text-right break-all">
                {formData.email}
              </span>
            </div>
            <div className="flex items-start justify-between pb-2.5 border-b border-gray-150 gap-4">
              <span className="text-gray-500 font-medium flex-shrink-0">Retos actuales:</span>
              <span className="font-bold text-brand-anthracite text-right break-words text-xs sm:text-sm">
                {formData.retos_actuales.length > 0 ? formData.retos_actuales.join(' · ') : 'Ninguno seleccionado'}
              </span>
            </div>
            <div className="flex items-center justify-between pb-2.5 border-b border-gray-150">
              <span className="text-gray-500 font-medium">Equipo y software:</span>
              <span className="font-bold text-brand-anthracite text-right">
                {formData.workshop_size === '10+' ? 'Más de 10 pers.' : `${formData.workshop_size} pers.`} · {formData.uses_management_software ? 'Con software' : 'Sin software'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500 font-medium">Modalidad:</span>
              <span className="font-bold text-brand-anthracite text-right">
                {formData.contact_preference === 'whatsapp' && formData.telefono.trim()
                  ? `WhatsApp (${formData.telefono.trim()})`
                  : formData.contact_preference === 'phone' && formData.telefono.trim()
                  ? `Llamada (${formData.telefono.trim()})`
                  : 'Descarga libre (sin llamadas)'}
              </span>
            </div>
          </div>

          {/* Consentimientos legales */}
          <div className="space-y-4 pt-2">
            <div>
              <label className="flex items-start cursor-pointer group">
                <input
                  required
                  name="consentPrivacidad"
                  type="checkbox"
                  checked={formData.consentPrivacidad}
                  onChange={(e) => handleInputChange('consentPrivacidad', e.target.checked)}
                  className="mt-1 w-4 h-4 text-brand-anthracite border-gray-300 rounded focus:ring-brand-yellow accent-brand flex-shrink-0"
                />
                <span className="ml-3 text-xs sm:text-sm text-gray-600 group-hover:text-brand-anthracite transition">
                  He leído y acepto la <Link to="/politica-privacidad" target="_blank" className="text-brand-anthracite font-bold underline">Política de Privacidad</Link>. <span className="text-brand-yellow font-black">*</span>
                </span>
              </label>
              {error === "Debes aceptar la Política de Privacidad para continuar." && (
                <p className="mt-1 ml-7 text-xs text-red-600 font-medium">
                  Debes aceptar la Política de Privacidad para continuar.
                </p>
              )}
            </div>

            <div>
              <label className="flex items-start cursor-pointer group">
                <input
                  name="consentMarketing"
                  type="checkbox"
                  checked={formData.consentMarketing}
                  onChange={(e) => handleInputChange('consentMarketing', e.target.checked)}
                  className="mt-1 w-4 h-4 text-brand-anthracite border-gray-300 rounded focus:ring-brand-yellow accent-brand flex-shrink-0"
                />
                <span className="ml-3 text-xs sm:text-sm text-gray-600 group-hover:text-brand-anthracite transition">
                  Sí, quiero recibir por email una breve serie de consejos prácticos para migrar de software sin perder datos ni frenar el taller. Puedo darme de baja cuando quiera.
                </span>
              </label>
            </div>
          </div>

          {/* Botón final de envío: submit exclusivo hacia el webhook */}
          <div className="pt-2 space-y-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={loading}
                className="py-4 px-5 rounded-xl border border-gray-300 bg-white text-gray-700 font-bold hover:bg-gray-50 transition active:scale-95 flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Atrás</span>
              </button>

              <button
                type="submit"
                disabled={loading}
                className={`flex-1 py-4 px-8 rounded-xl text-brand-anthracite font-black text-base sm:text-xl shadow-lg transition transform active:scale-95 uppercase tracking-wide flex items-center justify-center gap-2 ${
                  loading 
                    ? 'bg-brand-yellow/50 cursor-not-allowed' 
                    : 'bg-brand-yellow hover:opacity-90 hover:shadow-xl'
                }`}
              >
                {loading ? (
                  <span>Preparando acceso...</span>
                ) : (
                  <>
                    <span>DESCARGAR EL KIT GRATIS</span>
                    <ArrowRight className="w-5 h-5 stroke-[3]" />
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-xs text-gray-500 font-medium">
              Gratis · Sin compromiso · Analiza primero, decide después.
            </p>
          </div>

          <p className="text-center text-xs text-gray-400">
            Tus datos están seguros. No compartimos información con terceros. Cumplimos con el RGPD.
          </p>
        </form>
      )}

    </div>
  );
};

export default MigrationForm;
