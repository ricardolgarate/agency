import { Target, TrendingUp, Clock, Shield, Sparkles, Users } from 'lucide-react';

export default function Benefits() {
  const benefits = [
    {
      icon: Target,
      title: "Get More Customers",
      description: "Professional videos that stop the scroll and turn viewers into paying customers. Your dream outcome delivered.",
      color: "blue"
    },
    {
      icon: TrendingUp,
      title: "Stand Out Instantly",
      description: "Your competition is posting boring content. We make you look like the obvious choice with premium editing.",
      color: "cyan"
    },
    {
      icon: Clock,
      title: "Save 20+ Hours Per Week",
      description: "Stop wasting time on editing. Send us your footage and get back to running your business. Zero learning curve.",
      color: "purple"
    },
    {
      icon: Sparkles,
      title: "Done-For-You Service",
      description: "No software to learn, no tutorials to watch. Just send your footage and get polished videos in 48 hours.",
      color: "pink"
    },
    {
      icon: Shield,
      title: "Risk-Free Process",
      description: "Unlimited revisions until you're thrilled. We don't stop until your videos are converting customers.",
      color: "green"
    },
    {
      icon: Users,
      title: "Built for Small Business",
      description: "Affordable packages designed specifically for entrepreneurs and micro-businesses. No enterprise pricing.",
      color: "orange"
    }
  ];

  const colorMap: Record<string, { bg: string; border: string; icon: string; gradient: string }> = {
    blue: { bg: "bg-blue-500/10", border: "border-blue-500/20", icon: "text-blue-400", gradient: "from-blue-500/20 to-blue-600/5" },
    cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/20", icon: "text-cyan-400", gradient: "from-cyan-500/20 to-cyan-600/5" },
    purple: { bg: "bg-purple-500/10", border: "border-purple-500/20", icon: "text-purple-400", gradient: "from-purple-500/20 to-purple-600/5" },
    pink: { bg: "bg-pink-500/10", border: "border-pink-500/20", icon: "text-pink-400", gradient: "from-pink-500/20 to-pink-600/5" },
    green: { bg: "bg-green-500/10", border: "border-green-500/20", icon: "text-green-400", gradient: "from-green-500/20 to-green-600/5" },
    orange: { bg: "bg-orange-500/10", border: "border-orange-500/20", icon: "text-orange-400", gradient: "from-orange-500/20 to-orange-600/5" }
  };

  return (
    <section className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 text-blue-400 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Why Choose Us</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Everything You Need to
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Dominate Your Market
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            We handle the tedious editing work so you can focus on what you do best—growing your business and serving your customers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const colors = colorMap[benefit.color];
            const Icon = benefit.icon;

            return (
              <div
                key={index}
                className={`group relative bg-gradient-to-br ${colors.gradient} backdrop-blur-sm rounded-xl p-8 border ${colors.border} hover:border-${benefit.color}-500/40 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-${benefit.color}-500/10`}
              >
                <div className={`${colors.bg} w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-7 h-7 ${colors.icon}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
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
