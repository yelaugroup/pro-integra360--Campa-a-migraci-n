import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CONFIG } from '../constants';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    
    const scrollToElement = () => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80; // Altura del header sticky
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    };

    if (location.pathname !== '/' && location.pathname !== '/migracion-software-taller') {
      navigate('/');
      // Pequeño delay para asegurar que el componente Landing se ha montado
      setTimeout(scrollToElement, 300);
    } else {
      scrollToElement();
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src="https://mentorias.ivannieto.com/wp-content/uploads/2025/09/PRO-Integra360-logo-transparente-ivannieto-1.png" 
            alt={CONFIG.BRAND_NAME} 
            className="h-12 w-auto object-contain"
          />
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Kit Estratégico Gratuito
          </span>
        </nav>
        <div className="flex items-center space-x-4">
          <a 
            href="#formulario-kit" 
            onClick={(e) => handleNavClick(e, 'formulario-kit')}
            className="bg-brand-yellow text-brand-anthracite px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-black hover:opacity-90 transition shadow-md border border-brand-anthracite/10 uppercase tracking-tight"
          >
            Descargar Kit Gratis
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;