import { useReveal } from '../hooks/useReveal';
import { X, ArrowDown, Check } from 'lucide-react';

export default function Problem() {
  const ref = useReveal();

  const problems = [
    "Spending nights trying to learn editing software",
    "Waiting weeks on unreliable freelancers",
    "Posting inconsistently and losing momentum"
  ];

  return (
    <section className="relative py-20 sm:py-28 bg-slate-950 overflow-hidden" ref={ref}>
      {/* Subtle accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-white tracking-tight mb-5">
            Posting consistently shouldn't{' '}
            <span className="text-slate-500">slow your business down</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
            Most businesses know video works — they just can't keep up with editing.
          </p>
        </div>

        {/* Problem / Solution split */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {/* Problems */}
          <div className="reveal bg-red-500/[0.03] border border-red-500/10 rounded-2xl p-6 sm:p-8">
            <p className="text-red-400/80 text-sm font-semibold uppercase tracking-wider mb-5">
              Sound familiar?
            </p>
            <div className="space-y-4">
              {problems.map((problem, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                    <X className="w-3.5 h-3.5 text-red-400" />
                  </div>
                  <span className="text-slate-300 leading-relaxed">{problem}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Solution */}
          <div className="reveal bg-blue-500/[0.03] border border-blue-500/10 rounded-2xl p-6 sm:p-8">
            <p className="text-blue-400/80 text-sm font-semibold uppercase tracking-wider mb-5">
              With Carter Studios
            </p>
            <div className="space-y-4">
              {[
                "Send us your raw footage — any format",
                "We edit and deliver in 48 hours",
                "You post consistently and grow"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <span className="text-slate-300 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transition arrow */}
        <div className="reveal flex justify-center mt-12">
          <div className="flex flex-col items-center gap-3">
            <ArrowDown className="w-5 h-5 text-slate-600 animate-bounce" />
            <span className="text-slate-600 text-sm">Here's what you get</span>
          </div>
        </div>
      </div>
    </section>
  );
}
