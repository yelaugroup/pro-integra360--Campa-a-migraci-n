
import React, { useState } from 'react';
import { FileText, Eye, CheckSquare, FileSpreadsheet, PlayCircle, Calendar, Lock } from 'lucide-react';
import { CONFIG } from '../constants';

const MigrationKit: React.FC = () => {
  const [loadingPdf, setLoadingPdf] = useState(false);
  
  const handlePdfDownload = async (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setLoadingPdf(true);
    
    const email = localStorage.getItem('proi360_user_email') || 'unknown@taller.com';
    
    const payload = {
      email: email,
      evento: "descarga_pdf",
      recurso: "pdf_estrategico",
      page_url: window.location.href,
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch(CONFIG.EVENT_TRACK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error("Error en el webhook de seguimiento:", response.statusText);
      }
    } catch (err) {
      console.error("Fallo al enviar evento al webhook:", err);
    } finally {
      setLoadingPdf(false);
      // Abrir el PDF de todas formas
      if (href && href !== '#') {
        window.open(href, '_blank');
      } else {
        // Si es #, al menos mostramos un mensaje o simulamos la apertura
        console.log("Abriendo PDF estratégico (simulado)...");
        alert("El PDF estratégico se está abriendo en una nueva pestaña.");
      }
    }
  };

  const kitItems = [
    {
      id: 1,
      title: "Descarga el PDF estratégico",
      icon: <FileText className="w-6 h-6" />,
      actionText: "Descargar y empezar ahora",
      href: "#", // Placeholder
    },
    {
      id: 2,
      title: "Checklist de migración",
      icon: <CheckSquare className="w-6 h-6" />,
      actionText: "Descargar y empezar ahora",
      href: "#", // Placeholder
    },
    {
      id: 3,
      title: "Plantilla de importación",
      icon: <FileSpreadsheet className="w-6 h-6" />,
      actionText: "Descargar plantilla y empezar",
      href: "#", // Placeholder
    },
    {
      id: 4,
      title: "Visualiza el kit visual",
      icon: <Eye className="w-6 h-6" />,
      actionText: "Ver guía estratégica",
      href: "#", // Placeholder
      isSpecial: true,
    },
    {
      id: 5,
      title: "(Opcional) Vídeo explicativo",
      icon: <PlayCircle className="w-6 h-6" />,
      actionText: "Ver explicación rápida",
      href: "#", // Placeholder
    },
  ];

  return (
    <div className="py-12 md:py-20 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Header Section */}
          <div className="bg-brand-anthracite p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-yellow rounded-full mb-6 shadow-lg">
              <Lock className="w-8 h-8 text-brand-anthracite" />
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
              Tu Kit de Migración <span className="text-brand-yellow">PRO Integra360</span>
            </h1>
            <p className="text-gray-300 text-sm md:text-base">
              Solo disponible para talleres que estén valorando cambiar de sistema en este momento.
            </p>
          </div>

          {/* Resources List */}
          <div className="p-6 md:p-10 space-y-4">
            {kitItems.map((item, index) => (
              <div 
                key={item.id} 
                className="flex flex-col md:flex-row items-center justify-between p-5 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md transition group"
              >
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="w-12 h-12 bg-brand-anthracite/5 rounded-xl flex items-center justify-center text-brand-anthracite mr-4 group-hover:bg-brand-yellow transition">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Paso 0{index + 1}</span>
                    <h3 className="font-bold text-brand-anthracite text-lg">{item.title}</h3>
                  </div>
                </div>
                {item.isSpecial ? (
                  <button 
                    onClick={(e) => handlePdfDownload(e, item.href)}
                    disabled={loadingPdf}
                    className="w-full md:w-auto px-6 py-2.5 bg-brand-anthracite text-white rounded-lg font-semibold text-sm hover:bg-brand-anthracite/90 transition text-center shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loadingPdf ? "Preparando descarga..." : item.actionText}
                  </button>
                ) : (
                  <a 
                    href={item.href}
                    className="w-full md:w-auto px-6 py-2.5 bg-brand-anthracite text-white rounded-lg font-semibold text-sm hover:bg-brand-anthracite/90 transition text-center shadow-sm"
                  >
                    {item.actionText}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-gray-50 p-8 md:p-10 border-t border-gray-200 text-center">
            <p className="text-gray-500 text-sm mb-6 italic">Cada vez más talleres ya están utilizando este sistema para mejorar su rentabilidad.</p>
            <div className="mb-10 text-center space-y-2">
              <p className="text-brand-anthracite font-bold text-lg">⚠️ Si no aplicas esto, no cambia nada.</p>
              <p className="text-gray-600">Este kit no funciona solo.<br />Funciona cuando lo implementas en tu taller.</p>
              <p className="text-gray-600 pt-4">👇 Siguiente paso:</p>
            </div>
            
            <div className="bg-brand-yellow p-8 rounded-3xl shadow-xl transform hover:scale-[1.02] transition">
              <h3 className="text-2xl font-bold text-brand-anthracite mb-4">
                Te enseñamos cómo aplicarlo en tu taller
              </h3>
              <div className="text-brand-anthracite/80 mb-8 max-w-md mx-auto text-left md:text-center inline-block">
                <p className="font-bold mb-2">En 15 minutos vas a ver:</p>
                <ul className="space-y-1 inline-block text-left">
                  <li>✔ dónde estás perdiendo dinero</li>
                  <li>✔ qué cambiar primero</li>
                  <li>✔ cómo aplicarlo en tu caso real</li>
                </ul>
              </div>
              <a 
                href={CONFIG.CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-brand-anthracite text-white px-10 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition shadow-lg group w-full"
              >
                <Calendar className="mr-2 w-5 h-5" />
                Quiero ver cómo aplicarlo en mi taller
              </a>
            </div>
          </div>
        </div>
        
        <p className="text-center mt-8 text-gray-400 text-sm">
          ¿Tienes problemas con las descargas? Contacta con soporte@prointegra360.com
        </p>
      </div>
    </div>
  );
};

export default MigrationKit;
