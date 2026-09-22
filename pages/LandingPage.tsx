import React from 'react';
import MigrationForm from '../components/MigrationForm';
import { 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  CheckSquare, 
  Table, 
  ChevronDown, 
  AlertTriangle, 
  HelpCircle,
  Clock,
  UserCheck,
  TrendingDown,
  Layers,
  ArrowDown
} from 'lucide-react';
import { trackFunnelEvent } from '../services/eventTracker';
import { CONFIG } from '../constants';

const LandingPage: React.FC = () => {
  const scrollToForm = (e: React.MouseEvent, ctaSource = 'hero_cta') => {
    e.preventDefault();
    trackFunnelEvent('hero_cta_click', { meta: { cta_source: ctaSource } });
    
    const formSection = document.getElementById('formulario-kit');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-white text-brand-anthracite selection:bg-brand-yellow selection:text-brand-anthracite">
      
      {/* SECCIÓN 1 — HERO */}
      <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-gray-100 via-gray-50 to-white overflow-hidden border-b border-gray-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-anthracite/5 border border-brand-anthracite/10 text-xs font-black uppercase tracking-widest text-brand-anthracite mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-yellow"></span>
              KIT GRATUITO PARA TALLERES
            </div>

            {/* H1 */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-brand-anthracite tracking-tight leading-[1.12] mb-6 uppercase">
              ANTES DE CAMBIAR DE SOFTWARE,<br className="hidden sm:inline" />{' '}
              <span className="bg-brand-yellow px-2 py-0.5 rounded-md inline-block mt-1">
                ENTIENDE QUÉ NECESITAS CAMBIAR.
              </span>
            </h1>

            {/* Subtítulo */}
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-8 max-w-2xl mx-auto font-normal">
              Analiza si tu taller está perdiendo tiempo por falta de información, tareas que dependen de una sola persona, presupuestos sin seguimiento o procesos que se atascan.
            </p>

            {/* CTA Principal */}
            <div className="flex flex-col items-center">
              <a
                href="#formulario-kit"
                onClick={(e) => scrollToForm(e, 'hero_cta_main')}
                className="w-full sm:w-auto inline-flex items-center justify-center bg-brand-yellow text-brand-anthracite px-8 py-4 sm:py-5 rounded-xl font-black text-lg sm:text-xl uppercase tracking-wider hover:opacity-95 transition-all transform hover:scale-[1.02] shadow-xl hover:shadow-2xl active:scale-95 border-2 border-brand-anthracite/10"
              >
                DESCARGAR EL KIT GRATIS
                <ArrowRight className="ml-2.5 w-6 h-6 stroke-[3]" />
              </a>

              {/* Microcopy debajo */}
              <p className="text-xs sm:text-sm text-gray-500 mt-3 font-medium flex items-center justify-center gap-2">
                <span>Gratis</span>
                <span>·</span>
                <span>Sin compromiso</span>
                <span>·</span>
                <span className="font-semibold text-brand-anthracite">Analiza primero, decide después.</span>
              </p>
            </div>

            {/* Indicador sutil de scroll hacia abajo */}
            <div className="mt-10 flex justify-center">
              <a 
                href="#formulario-kit" 
                onClick={(e) => scrollToForm(e, 'hero_scroll_indicator')}
                className="text-gray-400 hover:text-brand-anthracite transition flex flex-col items-center gap-1 text-xs font-semibold uppercase tracking-wider"
                aria-label="Ir al formulario"
              >
                <span>Ir directamente al formulario</span>
                <ChevronDown className="w-5 h-5 animate-bounce" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* SECCIÓN 2 — IDENTIFICACIÓN */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-150">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-anthracite uppercase tracking-tight">
              ¿TE SUENA ALGUNA DE ESTAS SITUACIONES?
            </h2>
            <div className="w-16 h-1.5 bg-brand-yellow mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Cuatro bloques muy sencillos */}
          <div className="grid sm:grid-cols-2 gap-5 md:gap-6 max-w-4xl mx-auto">
            
            {/* Tarjeta 1 */}
            <div className="bg-gray-50 p-6 sm:p-7 rounded-2xl border border-gray-200/80 hover:border-brand-yellow/80 hover:bg-white transition-all shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-anthracite text-brand-yellow flex items-center justify-center flex-shrink-0 font-black text-lg">
                1
              </div>
              <div>
                <p className="text-base sm:text-lg font-bold text-brand-anthracite leading-snug">
                  Todo acaba pasando por ti.
                </p>
                <p className="text-[15px] sm:text-base text-gray-700 mt-1.5 leading-relaxed">
                  Cualquier decisión, duda de un cliente o consulta técnica te interrumpe y frena el ritmo del taller.
                </p>
              </div>
            </div>

            {/* Tarjeta 2 */}
            <div className="bg-gray-50 p-6 sm:p-7 rounded-2xl border border-gray-200/80 hover:border-brand-yellow/80 hover:bg-white transition-all shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-anthracite text-brand-yellow flex items-center justify-center flex-shrink-0 font-black text-lg">
                2
              </div>
              <div>
                <p className="text-base sm:text-lg font-bold text-brand-anthracite leading-snug">
                  El equipo tiene que preguntar porque la información no está donde debería.
                </p>
                <p className="text-[15px] sm:text-base text-gray-700 mt-1.5 leading-relaxed">
                  Notas en papeles, mensajes de WhatsApp o datos dispersos que provocan errores y duplicidad.
                </p>
              </div>
            </div>

            {/* Tarjeta 3 */}
            <div className="bg-gray-50 p-6 sm:p-7 rounded-2xl border border-gray-200/80 hover:border-brand-yellow/80 hover:bg-white transition-all shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-anthracite text-brand-yellow flex items-center justify-center flex-shrink-0 font-black text-lg">
                3
              </div>
              <div>
                <p className="text-base sm:text-lg font-bold text-brand-anthracite leading-snug">
                  Coches, piezas o presupuestos se quedan esperando porque nadie tiene claro cuál es el siguiente paso.
                </p>
                <p className="text-[15px] sm:text-base text-gray-700 mt-1.5 leading-relaxed">
                  Vehículos parados en los boxes esperando recambios o aprobaciones que se demoran sin avisar.
                </p>
              </div>
            </div>

            {/* Tarjeta 4 */}
            <div className="bg-gray-50 p-6 sm:p-7 rounded-2xl border border-gray-200/80 hover:border-brand-yellow/80 hover:bg-white transition-all shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-anthracite text-brand-yellow flex items-center justify-center flex-shrink-0 font-black text-lg">
                4
              </div>
              <div>
                <p className="text-base sm:text-lg font-bold text-brand-anthracite leading-snug">
                  Trabajáis mucho, pero cuesta saber dónde se está perdiendo tiempo o margen.
                </p>
                <p className="text-[15px] sm:text-base text-gray-700 mt-1.5 leading-relaxed">
                  El taller está lleno de faena pero la rentabilidad a final de mes no refleja el esfuerzo real.
                </p>
              </div>
            </div>

          </div>

          {/* Cierre sección 2 */}
          <div className="mt-12 max-w-2xl mx-auto text-center bg-brand-anthracite/5 p-6 rounded-2xl border border-brand-anthracite/10">
            <p className="text-base sm:text-lg font-bold text-brand-anthracite leading-relaxed">
              Si te reconoces en una o varias de estas situaciones, el problema no siempre es el software.
            </p>
            <p className="text-[15px] sm:text-base text-gray-700 mt-1.5 font-medium leading-relaxed">
              Primero hay que entender cómo está funcionando el taller.
            </p>
          </div>

        </div>
      </section>

      {/* FORMULARIO — ORDEN OPTIMIZADO PARA MÓVIL */}
      <section id="formulario-kit" className="py-16 md:py-24 bg-white border-b border-gray-200/80 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-gray-100 p-6 sm:p-10 md:p-12 rounded-3xl border border-gray-300/80 shadow-lg">
            <MigrationForm />
          </div>

        </div>
      </section>

      {/* SECCIÓN 3 — PROPUESTA DE VALOR */}
      <section className="py-16 md:py-24 bg-gray-50 border-b border-gray-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-anthracite uppercase tracking-tight">
              ANTES DE CAMBIAR NADA, MIRA QUÉ ESTÁ PASANDO.
            </h2>
            <p className="text-base sm:text-lg text-gray-700 mt-4 leading-relaxed font-normal">
              El Kit de Migración de PRO Integra360 está pensado para ayudarte a observar tu taller con una visión más empresarial.
            </p>
            <p className="text-[15px] sm:text-base text-gray-700 mt-2.5 leading-relaxed">
              No empieza preguntándote qué software utilizas.<br className="hidden sm:inline" />
              Empieza ayudándote a detectar qué procesos están funcionando, cuáles dependen demasiado de determinadas personas y dónde puede estar perdiéndose tiempo, información o capacidad.
            </p>
          </div>

          {/* Cinco puntos visuales */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-yellow/30 flex items-center justify-center flex-shrink-0 text-brand-anthracite font-bold">
                ✓
              </div>
              <span className="font-extrabold text-sm sm:text-base text-brand-anthracite uppercase tracking-tight">
                DEPENDENCIAS
              </span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-yellow/30 flex items-center justify-center flex-shrink-0 text-brand-anthracite font-bold">
                ✓
              </div>
              <span className="font-extrabold text-sm sm:text-base text-brand-anthracite uppercase tracking-tight">
                PROCESOS BLOQUEADOS
              </span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-yellow/30 flex items-center justify-center flex-shrink-0 text-brand-anthracite font-bold">
                ✓
              </div>
              <span className="font-extrabold text-sm sm:text-base text-brand-anthracite uppercase tracking-tight">
                INFORMACIÓN QUE LLEGA TARDE
              </span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3 sm:col-span-2 lg:col-span-1">
              <div className="w-8 h-8 rounded-lg bg-brand-yellow/30 flex items-center justify-center flex-shrink-0 text-brand-anthracite font-bold">
                ✓
              </div>
              <span className="font-extrabold text-sm sm:text-base text-brand-anthracite uppercase tracking-tight">
                INTERRUPCIONES Y TIEMPOS MUERTOS
              </span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-brand-yellow bg-brand-yellow/5 shadow-sm flex items-center gap-3 sm:col-span-2 lg:col-span-2">
              <div className="w-8 h-8 rounded-lg bg-brand-yellow flex items-center justify-center flex-shrink-0 text-brand-anthracite font-bold">
                ★
              </div>
              <span className="font-extrabold text-sm sm:text-base text-brand-anthracite uppercase tracking-tight">
                PUNTOS A REVISAR ANTES DE MIGRAR
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* SECCIÓN 4 — QUÉ INCLUYE */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-150">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-anthracite uppercase tracking-tight">
              ¿QUÉ RECIBES?
            </h2>
            <div className="w-16 h-1.5 bg-brand-yellow mx-auto mt-4 rounded-full"></div>
            <p className="text-gray-700 text-[15px] sm:text-base mt-4 leading-relaxed">
              Materiales prácticos en formato descargable para descargar y aplicar a tu propio ritmo.
            </p>
          </div>

          {/* Tres bloques */}
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Bloque 1 */}
            <div className="bg-gray-50 rounded-2xl p-7 border border-gray-200 hover:border-brand-yellow hover:bg-white transition shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-anthracite text-brand-yellow flex items-center justify-center mb-6">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-brand-anthracite uppercase tracking-tight mb-2">
                  GUÍA PRÁCTICA
                </h3>
                <p className="text-[15px] sm:text-base text-gray-700 leading-relaxed">
                  Para analizar cómo está funcionando actualmente la gestión del taller.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200/60 text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider">
                Documento PDF
              </div>
            </div>

            {/* Bloque 2 */}
            <div className="bg-gray-50 rounded-2xl p-7 border border-gray-200 hover:border-brand-yellow hover:bg-white transition shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-anthracite text-brand-yellow flex items-center justify-center mb-6">
                  <CheckSquare className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-brand-anthracite uppercase tracking-tight mb-2">
                  CHECKLIST
                </h3>
                <p className="text-[15px] sm:text-base text-gray-700 leading-relaxed">
                  Para revisar los puntos que conviene tener claros antes de plantear cualquier cambio.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200/60 text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider">
                Formato Excel (.xlsx)
              </div>
            </div>

            {/* Bloque 3 */}
            <div className="bg-gray-50 rounded-2xl p-7 border border-gray-200 hover:border-brand-yellow hover:bg-white transition shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-anthracite text-brand-yellow flex items-center justify-center mb-6">
                  <Table className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-brand-anthracite uppercase tracking-tight mb-2">
                  PLANTILLA DE ANÁLISIS / MIGRACIÓN
                </h3>
                <p className="text-[15px] sm:text-base text-gray-700 leading-relaxed">
                  Para ordenar la información y evitar que una posible migración se convierta en improvisación.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200/60 text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider">
                Formato Excel (.xlsx)
              </div>
            </div>

          </div>

          {/* Botón rápido hacia el formulario */}
          <div className="text-center mt-10">
            <a
              href="#formulario-kit"
              onClick={(e) => scrollToForm(e, 'mid_section_cta')}
              className="inline-flex items-center text-[15px] sm:text-base font-bold text-brand-anthracite hover:text-black transition uppercase tracking-wider underline decoration-brand-yellow decoration-2 underline-offset-4"
            >
              Ir directamente al formulario para recibirlo <ArrowRight className="ml-1.5 w-4 h-4" />
            </a>
          </div>

        </div>
      </section>

      {/* SECCIÓN 5 — FRASE DE POSICIONAMIENTO */}
      <section className="py-20 md:py-28 bg-brand-anthracite text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-yellow/5 -skew-y-3 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-tight mb-8">
            PUEDE QUE NO NECESITES CAMBIAR DE SOFTWARE.<br />
            <span className="text-brand-yellow">
              PERO SÍ NECESITAS SABER SI TU FORMA ACTUAL DE TRABAJAR ESTÁ PREPARADA PARA CRECER.
            </span>
          </p>

          <div className="inline-block border-t border-b border-white/20 py-4 px-8 mt-2">
            <p className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide text-gray-200">
              Primero analiza.<br className="sm:hidden" />{' '}
              <span className="text-white">Después decide.</span>
            </p>
          </div>

        </div>
      </section>

      {/* SECCIÓN 7 — PRO INTEGRA360 */}
      <section className="py-16 md:py-20 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <h2 className="text-2xl sm:text-3xl font-black text-brand-anthracite uppercase tracking-tight mb-4">
            ¿Y DESPUÉS?
          </h2>
          
          <div className="max-w-2xl mx-auto space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed mb-8">
            <p>
              Si después de analizar tu taller descubres que necesitas una forma diferente de gestionar información, procesos y equipo, entonces tiene sentido conocer PRO Integra360.
            </p>
            <p className="font-semibold text-brand-anthracite">
              PRO Integra360 no nació simplemente para digitalizar un taller.<br />
              Nació para ayudar a dirigirlo mejor.
            </p>
          </div>

          {/* CTA secundario sutil (nunca compite visualmente con el CTA del kit) */}
          <div className="flex justify-center">
            <a
              href={CONFIG.CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-brand-anthracite text-brand-anthracite font-bold text-sm uppercase tracking-wider hover:bg-brand-anthracite hover:text-white transition-colors duration-200"
            >
              CONOCER PRO INTEGRA360
            </a>
          </div>

        </div>
      </section>

      {/* CIERRE */}
      <section className="py-16 md:py-20 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-anthracite uppercase tracking-tight mb-8">
            UN SOFTWARE NO CAMBIA UN TALLER.<br />
            <span className="bg-brand-yellow px-2 py-0.5 rounded inline-block mt-1">
              LA FORMA DE DIRIGIRLO, SÍ.
            </span>
          </h2>

          <div className="flex flex-col items-center">
            <a
              href="#formulario-kit"
              onClick={(e) => scrollToForm(e, 'footer_cta')}
              className="w-full sm:w-auto inline-flex items-center justify-center bg-brand-yellow text-brand-anthracite px-8 py-4 rounded-xl font-black text-lg uppercase tracking-wider hover:opacity-95 transition-all transform hover:scale-[1.02] shadow-lg active:scale-95 border border-brand-anthracite/10"
            >
              DESCARGAR EL KIT GRATIS
            </a>
            
            <p className="text-xs sm:text-sm text-gray-600 mt-2.5 font-medium">
              Gratis · Sin compromiso · Analiza primero, decide después.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};

export default LandingPage;
