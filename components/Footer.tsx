
import React from 'react';
import { Link } from 'react-router-dom';
import { CONFIG } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">{CONFIG.BRAND_NAME}</h3>
            <p className="text-gray-400 text-sm">
              Soluciones avanzadas de gestión para el taller mecánico moderno. Eficiencia, control y rentabilidad en un solo lugar.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/privacidad" className="hover:text-white">Política de Privacidad</Link></li>
              <li><a href="#" className="hover:text-white">Aviso Legal</a></li>
              <li><a href="#" className="hover:text-white">Política de Cookies</a></li>
              <li><Link to="/baja" className="hover:text-white">Darse de baja</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <p className="text-sm text-gray-400">
              ¿Dudas sobre la migración?<br />
              info@prointegra360.es<br />
              +34 910 202 910
            </p>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} {CONFIG.BRAND_NAME}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
