import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onCTAClick: () => void;
}

export default function Hero({ onCTAClick }: HeroProps) {
  return (
    <section id="top" className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.15] mb-6 sm:mb-8">
            Video editing for businesses that want
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"> more leads</span>, not more work
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-4 max-w-3xl mx-auto">
            If video is how you grow — we handle the editing so you can focus on running your business.
          </p>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-8 sm:mb-10 max-w-3xl mx-auto">
            We turn raw footage into scroll-stopping content you can post consistently, without hiring, managing, or learning editing software.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 sm:mb-20">
            <button
              onClick={onCTAClick}
              className="group bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              Book a free 15-min call
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById('proof')?.scrollIntoView({ behavior: 'smooth' })}
              className="border border-slate-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-slate-800/50 transition-all duration-300"
            >
              See examples
            </button>
          </div>

          {/* Trust strip */}
          <div className="border-t border-slate-700/50 pt-10">
            <p className="text-slate-500 text-sm mb-6">Why businesses trust VideoEdits</p>
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                <span className="text-sm sm:text-base">3x more engagement on average</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                <span className="text-sm sm:text-base">48h turnaround</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                <span className="text-sm sm:text-base">500+ videos edited for real businesses</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
