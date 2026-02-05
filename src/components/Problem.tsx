import { Clock, Users, TrendingDown } from 'lucide-react';

export default function Problem() {
  const problems = [
    {
      icon: Clock,
      text: "Spending nights learning software"
    },
    {
      icon: Users,
      text: "Waiting weeks on freelancers"
    },
    {
      icon: TrendingDown,
      text: "Posting inconsistently and losing momentum"
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Posting consistently shouldn't slow your business down
          </h2>
          <p className="text-lg text-slate-400">
            Most businesses know video works — they just can't keep up with editing.
          </p>
        </div>

        <div className="mb-10">
          <p className="text-slate-300 text-center mb-6">You're either:</p>
          <div className="space-y-4 max-w-md mx-auto">
            {problems.map((problem, index) => (
              <div key={index} className="flex items-center gap-4 bg-slate-700/30 rounded-xl p-4 border border-slate-700/50">
                <problem.icon className="w-5 h-5 text-red-400 flex-shrink-0" />
                <span className="text-slate-300">{problem.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-6">
            We fix that.
          </p>
          <div className="text-slate-300 space-y-2">
            <p className="text-lg">Send us your footage.</p>
            <p className="text-lg">We deliver clean, on-brand videos — fast.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
