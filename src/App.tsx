import { useState } from 'react';
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

function App() {
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
    <div className="min-h-screen bg-slate-900">
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

export default App;
