import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Benefits from './components/Benefits';
import HowItWorks from './components/HowItWorks';
import Proof from './components/Proof';
import CTA from './components/CTA';
import BANTModal from './components/BANTModal';
import CalendlyEmbed from './components/CalendlyEmbed';
import Footer from './components/Footer';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import PrivateRoute from './components/admin/PrivateRoute';
import FitnessApp from './components/fitness/FitnessApp';

function LandingPage() {
  const [showBANTModal, setShowBANTModal] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);

  const handleCTAClick = () => {
    setShowBANTModal(true);
  };

  const handleQualified = () => {
    setShowBANTModal(false);
    setShowCalendly(true);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Header onCTAClick={handleCTAClick} />
      <Hero onCTAClick={handleCTAClick} />
      <Problem />
      <Benefits />
      <HowItWorks />
      <Proof />
      <CTA onCTAClick={handleCTAClick} />
      <Footer />

      <BANTModal
        isOpen={showBANTModal}
        onClose={() => setShowBANTModal(false)}
        onQualified={handleQualified}
      />

      <CalendlyEmbed
        isOpen={showCalendly}
        onClose={() => setShowCalendly(false)}
      />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/fitness/*"
          element={
            <PrivateRoute>
              <FitnessApp />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
