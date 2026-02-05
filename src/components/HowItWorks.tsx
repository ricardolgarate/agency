import { Upload, Scissors, Rocket } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      number: "1",
      title: "Send your footage",
      description: "Upload raw clips or long videos.",
      color: "blue"
    },
    {
      icon: Scissors,
      number: "2",
      title: "We edit everything",
      description: "Short-form, ads, promos — formatted for each platform.",
      color: "cyan"
    },
    {
      icon: Rocket,
      number: "3",
      title: "You post and grow",
      description: "Consistent content without the workload.",
      color: "purple"
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Simple process. No friction.
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 sm:gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              {/* Connector line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden sm:block absolute top-10 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-slate-600 to-slate-700"></div>
              )}
              
              <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center relative ${
                step.color === 'blue' ? 'bg-blue-500/10 border border-blue-500/20' :
                step.color === 'cyan' ? 'bg-cyan-500/10 border border-cyan-500/20' :
                'bg-purple-500/10 border border-purple-500/20'
              }`}>
                <step.icon className={`w-8 h-8 ${
                  step.color === 'blue' ? 'text-blue-400' :
                  step.color === 'cyan' ? 'text-cyan-400' :
                  'text-purple-400'
                }`} />
                <span className={`absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                  step.color === 'blue' ? 'bg-blue-500 text-white' :
                  step.color === 'cyan' ? 'bg-cyan-500 text-white' :
                  'bg-purple-500 text-white'
                }`}>
                  {step.number}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-slate-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
