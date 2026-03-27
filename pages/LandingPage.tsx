
import React from 'react';
import MigrationForm from '../components/MigrationForm';
import { CheckCircle, AlertCircle, Package, ArrowRight, Zap, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const problems = [
    "Falta de soporte técnico en el software actual.",
    "Lentitud en los procesos de facturación y recepción.",
    "Dificultad para gestionar citas y recambios.",
    "Poca visibilidad de la rentabilidad real del taller.",
    "Sistemas obsoletos no adaptados a la normativa actual."
  ];

  const benefits = [
    "Migración asistida: Importamos tus datos sin errores.",
    "Multi-dispositivo: Accede desde PC, tablet o móvil.",
    "Facturación electrónica integrada y automática.",
    "Control de stock a tiempo real con alertas de reposición.",
    "Comunicación automática con el cliente (WhatsApp/SMS).",
    "Informes financieros avanzados de rentabilidad."
  ];

  const kitIncludes = [
    "Guía Paso a Paso: El éxito de tu migración.",
    "Checklist de Auditoría de Datos Actuales.",
    "Plantilla de Importación de Clientes y Vehículos.",
    "Sesión de Consultoría de 15 min (gratuita)."
  ];

  const powerPoints = [
    "Digitalización 100% de la recepción del vehículo",
    "Gestión de recambios con conexión directa a proveedores",
    "Cuadro de mando en tiempo real (KPIs de rentabilidad)",
    "Facturación electrónica y contabilidad integrada",
    "Historial clínico del vehículo compartido en la red",
    "Multi-dispositivo: Accede desde tablet en el taller o PC"
  ];

  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('formulario-kit')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:w-2/3">
            <h1 className="text-4xl md:text-5xl font-extrabold text-brand-anthracite leading-tight mb-6">
              Moderniza tu taller sin miedos ni parones operativos
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl border-l-4 border-brand-yellow pl-4">
              Descarga el <span className="font-bold text-brand-anthracite">Kit Estratégico de Migración</span> y descubre cómo pasar de tu viejo sistema a PRO Integra360 de forma segura.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a 
                href="#formulario-kit" 
                onClick={scrollToForm}
                className="inline-flex items-center justify-center bg-brand-yellow text-brand-anthracite px-8 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition transform hover:scale-105 shadow-md"
              >
                Recibir Kit de Migración <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-yellow/10 hidden lg:block skew-x-12 transform translate-x-20"></div>
      </section>

      {/* Problems Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-anthracite">¿Sientes que tu software te está frenando?</h2>
            <p className="text-gray-600 mt-4">Cambiar de software asusta, pero quedarse atrás sale caro.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {problems.map((p, i) => (
              <div key={i} className="flex items-start p-6 bg-white rounded-xl border-l-4 border-brand-anthracite shadow-sm">
                <AlertCircle className="w-6 h-6 text-brand-anthracite mr-4 flex-shrink-0 mt-1" />
                <p className="text-slate-700 font-medium">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Preview */}
      <section className="py-20 bg-brand-anthracite text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-brand-yellow uppercase tracking-tight">Por qué los talleres eligen PRO Integra360</h2>
              <div className="grid gap-6">
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-center group">
                    <CheckCircle className="w-6 h-6 text-brand-yellow mr-4 flex-shrink-0 group-hover:scale-110 transition" />
                    <span className="text-lg text-gray-300 group-hover:text-white transition">{b}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
               <div className="absolute inset-0 bg-brand-yellow/20 blur-[100px] -z-10"></div>
               <div className="block relative bg-[#2a2a2a] p-2 rounded-3xl border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform lg:rotate-2">
                 <img 
                   src="https://mentorias.ivannieto.com/wp-content/uploads/2025/10/Screenshot_139-1536x736.png" 
                   alt="Interfaz PRO Integra 360" 
                   className="rounded-2xl w-full h-auto shadow-2xl opacity-90" 
                 />
                 <div className="absolute bottom-6 left-6">
                    <div className="bg-brand-yellow text-brand-anthracite px-4 py-1 rounded text-xs font-black uppercase tracking-widest shadow-lg">Interfaz de Usuario Oficial</div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kit Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Package className="w-16 h-16 text-brand-anthracite mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-brand-anthracite mb-6 uppercase">¿Qué incluye el Kit de Migración?</h2>
            <p className="text-gray-600 mb-12">Herramientas profesionales diseñadas por expertos para que tu cambio sea un éxito desde el primer día.</p>
            <div className="bg-white p-8 rounded-2xl shadow-xl text-left border-t-4 border-brand-yellow max-w-2xl mx-auto">
              <ul className="space-y-4">
                {kitIncludes.map((item, i) => (
                  <li key={i} className="flex items-center text-slate-700 text-lg">
                    <div className="w-3 h-3 bg-brand-yellow rounded-full mr-4 border border-brand-anthracite/20"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FORMULARIO: ID "formulario-kit" */}
      <section id="formulario-kit" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-anthracite uppercase tracking-tight">Solicita tu Kit Gratuito</h2>
            <p className="text-gray-600 mt-4 italic">Rellena el formulario y recibe los materiales en tu email.</p>
          </div>
          <div className="bg-gray-100 p-8 md:p-12 rounded-3xl border border-gray-200 shadow-sm">
            <MigrationForm />
          </div>
        </div>
      </section>

      {/* POTENCIA OPERATIVA: ID "potencia-operativa" */}
      <section id="potencia-operativa" className="py-20 bg-brand-anthracite text-white overflow-hidden scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-12">
              <Zap className="w-12 h-12 text-brand-yellow mr-4 animate-pulse" />
              <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter">Potencia Operativa</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
              {powerPoints.map((item, i) => (
                <div key={i} className="flex items-start group">
                  <div className="mt-1 bg-brand-yellow/10 p-2 rounded-lg mr-4 group-hover:bg-brand-yellow/20 transition">
                    <CheckCircle className="w-5 h-5 text-brand-yellow" />
                  </div>
                  <p className="text-lg text-gray-300 group-hover:text-white transition duration-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ: ID "preguntas-frecuentes" */}
      <section id="preguntas-frecuentes" className="py-20 border-t border-gray-100 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-brand-anthracite mb-16 underline decoration-brand-yellow decoration-4 underline-offset-8 uppercase">Preguntas Frecuentes</h2>
          <div className="space-y-8">
            <div>
              <h4 className="font-bold text-lg mb-2 text-brand-anthracite">¿Perderé el histórico de mis clientes?</h4>
              <p className="text-gray-600">En absoluto. Nuestro kit incluye una plantilla de migración y nuestro equipo técnico valida la importación para asegurar que no se recibe ni un dato erróneo.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2 text-brand-anthracite">¿Es difícil de aprender?</h4>
              <p className="text-gray-600">PRO Integra360 tiene una curva de aprendizaje mínima. La mayoría de los operarios dominan el sistema en menos de 2 días.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2 text-brand-anthracite">¿Tengo permanencia?</h4>
              <p className="text-gray-600">No. Creemos tanto en nuestra herramienta que no necesitamos contratos de permanencia para retenerte.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2 text-brand-anthracite">¿El kit es realmente gratis?</h4>
              <p className="text-gray-600">Sí, es un material educativo que compartimos para ayudar a profesionalizar el sector en España.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2 text-brand-anthracite">¿Funciona en Mac?</h4>
              <p className="text-gray-600">Sí, al ser una solución cloud moderna, funciona perfectamente en cualquier sistema operativo a través del navegador.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
