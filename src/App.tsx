import { useState } from 'react';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
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
      <Hero onCTAClick={handleCTAClick} />
      <Benefits />
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
