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
        <nav className="hidden lg:flex space-x-8">
          <a 
            href="#potencia-operativa" 
            onClick={(e) => handleNavClick(e, 'potencia-operativa')}
            className="text-xs font-bold text-gray-500 hover:text-brand-anthracite transition uppercase tracking-wider"
          >
            Beneficios
          </a>
          <a 
            href="#formulario-kit" 
            onClick={(e) => handleNavClick(e, 'formulario-kit')}
            className="text-xs font-bold text-gray-500 hover:text-brand-anthracite transition uppercase tracking-wider"
          >
            El Kit
          </a>
          <Link 
            to="/dashboard"
            className="text-xs font-bold text-brand-anthracite bg-brand-yellow/10 px-3 py-1 rounded border border-brand-yellow transition uppercase tracking-wider"
          >
            Demo Live
          </Link>
          <a 
            href="#preguntas-frecuentes" 
            onClick={(e) => handleNavClick(e, 'preguntas-frecuentes')}
            className="text-xs font-bold text-gray-500 hover:text-brand-anthracite transition uppercase tracking-wider"
          >
            FAQ
          </a>
        </nav>
        <div className="flex items-center space-x-4">
          <Link 
            to="/dashboard"
            className="hidden sm:inline-block text-xs font-black text-brand-anthracite hover:underline uppercase"
          >
            Login
          </Link>
          <a 
            href="#formulario-kit" 
            onClick={(e) => handleNavClick(e, 'formulario-kit')}
            className="bg-brand-yellow text-brand-anthracite px-6 py-2 rounded-full text-sm font-black hover:opacity-90 transition shadow-md border-2 border-brand-anthracite/10 uppercase tracking-tight"
          >
            Obtener Kit
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;