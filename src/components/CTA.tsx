import { ArrowRight, CheckCircle } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

interface CTAProps {
  onCTAClick: () => void;
}

export default function CTA({ onCTAClick }: CTAProps) {
  const ref = useReveal();

  return (
    <section id="cta" className="relative py-20 sm:py-28 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800" />

      {/* Floating orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-cyan-400/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-[100px]" />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="reveal">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight tracking-tight">
            Ready to scale your content{' '}
            <span className="text-cyan-300">without scaling your workload?</span>
          </h2>

          <p className="text-lg sm:text-xl text-blue-100/80 mb-8 max-w-xl mx-auto leading-relaxed">
            Book a free call. We'll review your content and show you exactly how to post more and grow faster.
          </p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-10">
            {['Free 15-minute call', 'No commitment', 'Custom plan'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-white/80">
                <CheckCircle className="w-4 h-4 text-cyan-300" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>

          <button
            onClick={onCTAClick}
            className="group bg-white text-blue-600 px-10 py-5 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-black/20 transition-all duration-300 inline-flex items-center gap-3 hover:scale-[1.02]"
          >
            Book your free call
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-blue-200/60 text-sm mt-6">
            We only take 5 new clients per month
          </p>
        </div>
      </div>
    </section>
  );
}
