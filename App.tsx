import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SuccessPage from './pages/SuccessPage';
import MigrationKit from './pages/MigrationKit';
import ConfirmPage from './pages/ConfirmPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import UnsubscribePage from './pages/UnsubscribePage';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow w-full">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/gracias-kit" element={<SuccessPage />} />
          <Route path="/kit-migracion" element={<MigrationKit />} />
          <Route path="/confirmar" element={<ConfirmPage />} />
          <Route path="/privacidad" element={<PrivacyPolicy />} />
          <Route path="/baja" element={<UnsubscribePage />} />
          {/* Fallback para URLs antiguas si las hubiera */}
          <Route path="/migracion-software-taller" element={<LandingPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;