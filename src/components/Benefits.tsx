import { Target, Award, Clock, Sparkles, RefreshCw, Users } from 'lucide-react';

export default function Benefits() {
  const benefits = [
    {
      icon: Target,
      title: "More leads from your content",
      description: "Edits designed to stop the scroll and turn attention into action.",
      color: "blue"
    },
    {
      icon: Award,
      title: "A brand that looks established",
      description: "Polished videos that make your business look bigger and more trustworthy.",
      color: "cyan"
    },
    {
      icon: Clock,
      title: "20+ hours back every week",
      description: "No software. No back-and-forth. No bottlenecks.",
      color: "purple"
    },
    {
      icon: Sparkles,
      title: "Fully done-for-you",
      description: "You send footage. We edit. You post.",
      color: "pink"
    },
    {
      icon: RefreshCw,
      title: "Unlimited revisions",
      description: "We keep refining until it's right — no extra fees.",
      color: "green"
    },
    {
      icon: Users,
      title: "Built for small teams",
      description: "Simple pricing for businesses doing $10K–$1M/month.",
      color: "orange"
    }
  ];

  const colorMap: Record<string, { bg: string; border: string; icon: string }> = {
    blue: { bg: "bg-blue-500/10", border: "border-blue-500/20", icon: "text-blue-400" },
    cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/20", icon: "text-cyan-400" },
    purple: { bg: "bg-purple-500/10", border: "border-purple-500/20", icon: "text-purple-400" },
    pink: { bg: "bg-pink-500/10", border: "border-pink-500/20", icon: "text-pink-400" },
    green: { bg: "bg-green-500/10", border: "border-green-500/20", icon: "text-green-400" },
    orange: { bg: "bg-orange-500/10", border: "border-orange-500/20", icon: "text-orange-400" }
  };

  return (
    <section id="benefits" className="py-16 sm:py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            What you actually get
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {benefits.map((benefit, index) => {
            const colors = colorMap[benefit.color];
            const Icon = benefit.icon;

            return (
              <div
                key={index}
                className={`group relative bg-slate-800/30 rounded-2xl p-6 sm:p-8 border ${colors.border} hover:border-opacity-50 transition-all duration-300`}
              >
                <div className={`${colors.bg} w-12 h-12 rounded-xl flex items-center justify-center mb-5`}>
                  <Icon className={`w-6 h-6 ${colors.icon}`} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
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
