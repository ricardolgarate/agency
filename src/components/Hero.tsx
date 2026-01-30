import { Play, TrendingUp, Clock, Zap } from 'lucide-react';

interface HeroProps {
  onCTAClick: () => void;
}

export default function Hero({ onCTAClick }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 text-blue-400 text-sm font-medium">
              <Zap className="w-4 h-4" />
              <span>Transform Your Content, Transform Your Business</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Stop Losing Customers to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Boring Videos
              </span>
            </h1>

            <p className="text-xl text-slate-300 leading-relaxed">
              We turn your raw footage into scroll-stopping content that attracts customers, builds trust, and drives sales—without you spending hours learning editing software.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 pt-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-500/10 p-2 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="font-semibold text-lg">3x Engagement</div>
                  <div className="text-sm text-slate-400">Average increase</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-cyan-500/10 p-2 rounded-lg">
                  <Clock className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="font-semibold text-lg">48-Hour</div>
                  <div className="text-sm text-slate-400">Turnaround</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-purple-500/10 p-2 rounded-lg">
                  <Play className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="font-semibold text-lg">100%</div>
                  <div className="text-sm text-slate-400">Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={onCTAClick}
                className="group bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
              >
                Get Your Free Strategy Session
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <button
                onClick={() => document.getElementById('proof')?.scrollIntoView({ behavior: 'smooth' })}
                className="border border-slate-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-800 transition-all duration-300"
              >
                See Our Work
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center relative overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
                <Play className="w-20 h-20 text-white relative z-10 group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all"></div>
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                    JD
                  </div>
                  <div>
                    <div className="font-semibold">Jessica Davis</div>
                    <div className="text-sm text-slate-400">Fitness Coach</div>
                  </div>
                </div>
                <p className="text-slate-300 italic">
                  "My client inquiries tripled after using their edited videos. Worth every penny!"
                </p>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-cyan-500/30 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
