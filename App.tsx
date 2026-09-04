import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SuccessPage from './pages/SuccessPage';
import MigrationKit from './pages/MigrationKit';
import ConfirmPage from './pages/ConfirmPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AvisoLegal from './pages/AvisoLegal';
import PoliticaCookies from './pages/PoliticaCookies';
import UnsubscribePage from './pages/UnsubscribePage';
import Header from './components/Header';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import { initTikTokSnippet, enableTikTokPixel, trackTikTokPageView } from './services/tiktokPixel';
import { hasMarketingConsent } from './services/cookieConsent';

const PageTracker: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (hasMarketingConsent()) {
      trackTikTokPageView(pathname);
    }
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  useEffect(() => {
    initTikTokSnippet();
    if (hasMarketingConsent()) {
      enableTikTokPixel(window.location.pathname);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <PageTracker />
      <Header />
      <main className="flex-grow w-full">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/gracias-kit" element={<SuccessPage />} />
          <Route path="/kit-migracion" element={<MigrationKit />} />
          <Route path="/confirmar" element={<ConfirmPage />} />
          <Route path="/privacidad" element={<PrivacyPolicy />} />
          <Route path="/politica-privacidad" element={<PrivacyPolicy />} />
          <Route path="/aviso-legal" element={<AvisoLegal />} />
          <Route path="/politica-cookies" element={<PoliticaCookies />} />
          <Route path="/baja" element={<UnsubscribePage />} />
          {/* Fallback para URLs antiguas si las hubiera */}
          <Route path="/migracion-software-taller" element={<LandingPage />} />
        </Routes>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default App;