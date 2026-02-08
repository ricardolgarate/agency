import { Upload, Scissors, Rocket } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

export default function HowItWorks() {
  const ref = useReveal();

  const steps = [
    {
      icon: Upload,
      number: "01",
      title: "Send your footage",
      description: "Upload raw clips, long recordings, or phone videos. Any format works.",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Scissors,
      number: "02",
      title: "We edit everything",
      description: "Short-form, ads, promos, stories — formatted and optimized for each platform.",
      gradient: "from-cyan-500 to-cyan-600"
    },
    {
      icon: Rocket,
      number: "03",
      title: "You post and grow",
      description: "Get polished content back in 48 hours. Post consistently without the workload.",
      gradient: "from-violet-500 to-violet-600"
    }
  ];

  return (
    <section id="how-it-works" className="relative py-20 sm:py-28 overflow-hidden" ref={ref}>
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="reveal text-center mb-14 sm:mb-16">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-3">
            How it works
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-white tracking-tight">
            Simple process. No friction.
          </h2>
        </div>

        <div className="reveal-children relative grid md:grid-cols-3 gap-6 sm:gap-8">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-[52px] left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-px">
            <div className="h-full bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-violet-500/30" />
          </div>

          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              {/* Step icon */}
              <div className="relative mx-auto mb-7 w-[104px] h-[104px]">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-2xl border border-white/[0.06]" />
                {/* Icon container */}
                <div className={`absolute inset-2 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                {/* Step number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-slate-400">{step.number}</span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
