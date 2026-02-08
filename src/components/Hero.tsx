import { ArrowRight, Play } from 'lucide-react';

interface HeroProps {
  onCTAClick: () => void;
}

export default function Hero({ onCTAClick }: HeroProps) {
  return (
    <section id="top" className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-950" />

      {/* Gradient orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[100px] animate-float-slow" />
      <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[80px]" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32 relative z-10 w-full">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-blue-400 text-xs sm:text-sm font-medium mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            Now accepting new clients
          </div>

          {/* Headline */}
          <h1 className="text-[2.5rem] sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.08] tracking-tight text-white mb-6 sm:mb-8">
            Video editing for businesses{' '}
            <br className="hidden sm:block" />
            that want{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 animate-shimmer">
              more leads
            </span>
            ,{' '}
            <br className="hidden lg:block" />
            not more work
          </h1>

          {/* Subhead */}
          <p className="text-lg sm:text-xl lg:text-[22px] text-slate-400 leading-relaxed mb-4 max-w-2xl mx-auto">
            We turn raw footage into scroll-stopping content you can post consistently — without hiring, managing, or learning software.
          </p>

          <p className="text-base text-slate-500 mb-10 sm:mb-12 max-w-xl mx-auto">
            If video is how you grow, we handle the editing so you can run your business.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 sm:mb-20">
            <button
              onClick={onCTAClick}
              className="group relative bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 inline-flex items-center justify-center gap-2.5 animate-pulse-ring"
            >
              Book a free 15-min call
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById('proof')?.scrollIntoView({ behavior: 'smooth' })}
              className="group border border-white/10 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/5 hover:border-white/20 transition-all duration-300 inline-flex items-center justify-center gap-2.5"
            >
              <Play className="w-5 h-5" />
              See examples
            </button>
          </div>

          {/* Trust strip */}
          <div className="border-t border-white/5 pt-10 max-w-2xl mx-auto">
            <p className="text-slate-600 text-xs uppercase tracking-widest font-medium mb-6">
              Trusted by growing businesses
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 text-slate-400">
              <div className="flex items-center gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-white">3x</span>
                <span className="text-sm text-left leading-tight">more engagement<br />on average</span>
              </div>
              <div className="hidden sm:block w-px h-8 bg-white/10" />
              <div className="flex items-center gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-white">48h</span>
                <span className="text-sm text-left leading-tight">average<br />turnaround</span>
              </div>
              <div className="hidden sm:block w-px h-8 bg-white/10" />
              <div className="flex items-center gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-white">500+</span>
                <span className="text-sm text-left leading-tight">videos edited<br />for real businesses</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  );
}
