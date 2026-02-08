import { Target, Award, Clock, Sparkles, RefreshCw, Users } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

export default function Benefits() {
  const ref = useReveal();

  const benefits = [
    {
      icon: Target,
      title: "More leads from your content",
      description: "Edits designed to stop the scroll and turn attention into action.",
      gradient: "from-blue-500 to-blue-600",
      glow: "group-hover:shadow-blue-500/20"
    },
    {
      icon: Award,
      title: "A brand that looks established",
      description: "Polished videos that make your business look bigger and more trustworthy.",
      gradient: "from-cyan-500 to-cyan-600",
      glow: "group-hover:shadow-cyan-500/20"
    },
    {
      icon: Clock,
      title: "20+ hours back every week",
      description: "No software. No back-and-forth. No bottlenecks.",
      gradient: "from-violet-500 to-violet-600",
      glow: "group-hover:shadow-violet-500/20"
    },
    {
      icon: Sparkles,
      title: "Fully done-for-you",
      description: "You send footage. We edit. You post.",
      gradient: "from-pink-500 to-pink-600",
      glow: "group-hover:shadow-pink-500/20"
    },
    {
      icon: RefreshCw,
      title: "Unlimited revisions",
      description: "We keep refining until it's right — no extra fees.",
      gradient: "from-emerald-500 to-emerald-600",
      glow: "group-hover:shadow-emerald-500/20"
    },
    {
      icon: Users,
      title: "Built for small teams",
      description: "Simple pricing for businesses doing $10K–$1M/month.",
      gradient: "from-orange-500 to-orange-600",
      glow: "group-hover:shadow-orange-500/20"
    }
  ];

  return (
    <section id="benefits" className="relative py-20 sm:py-28 bg-slate-950 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal text-center mb-14 sm:mb-16">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-3">
            What you get
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-white tracking-tight">
            Everything included. Zero friction.
          </h2>
        </div>

        <div className="reveal-children grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className={`group relative bg-white/[0.02] backdrop-blur-sm rounded-2xl p-6 sm:p-7 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 hover:shadow-xl ${benefit.glow}`}
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-5 shadow-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
