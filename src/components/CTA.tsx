import { ArrowRight, CheckCircle } from 'lucide-react';

interface CTAProps {
  onCTAClick: () => void;
}

export default function CTA({ onCTAClick }: CTAProps) {
  return (
    <section id="cta" className="py-16 sm:py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-700 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-300 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
          Ready to scale your content without scaling your workload?
        </h2>

        <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
          Book a free call. We'll review your content and show you exactly how to post more and grow faster.
        </p>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-10">
          <div className="flex items-center gap-2 text-white/90">
            <CheckCircle className="w-5 h-5" />
            <span>Free 15-minute call</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <CheckCircle className="w-5 h-5" />
            <span>No commitment</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <CheckCircle className="w-5 h-5" />
            <span>Custom plan</span>
          </div>
        </div>

        <button
          onClick={onCTAClick}
          className="group bg-white text-blue-600 px-10 py-5 rounded-xl font-bold text-lg sm:text-xl hover:shadow-2xl hover:shadow-black/20 transition-all duration-300 inline-flex items-center gap-3"
        >
          Book your free call
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="text-blue-200/80 text-sm mt-6">
          We only take 5 new clients per month
        </p>
      </div>
    </section>
  );
}
