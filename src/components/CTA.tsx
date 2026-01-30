import { Rocket, CheckCircle } from 'lucide-react';

interface CTAProps {
  onCTAClick: () => void;
}

export default function CTA({ onCTAClick }: CTAProps) {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-700 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white text-sm font-medium mb-6">
          <Rocket className="w-4 h-4" />
          <span>Limited Availability</span>
        </div>

        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          Ready to Transform Your Video Content?
        </h2>

        <p className="text-xl text-blue-100 mb-8 leading-relaxed">
          Book a free strategy session and we'll show you exactly how we can help you attract more customers, save time, and stand out from your competition.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <div className="flex items-center gap-2 text-white">
            <CheckCircle className="w-5 h-5" />
            <span>No obligations</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <CheckCircle className="w-5 h-5" />
            <span>Free consultation</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <CheckCircle className="w-5 h-5" />
            <span>Instant clarity</span>
          </div>
        </div>

        <button
          onClick={onCTAClick}
          className="group bg-white text-blue-600 px-10 py-5 rounded-lg font-bold text-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
        >
          Book Your Free Strategy Session
          <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
        </button>

        <p className="text-blue-100 text-sm mt-6">
          Only 5 spots available this week
        </p>
      </div>
    </section>
  );
}
