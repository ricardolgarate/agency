import { Play, Star, Quote } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

export default function Proof() {
  const ref = useReveal();

  const testimonials = [
    {
      name: "Marcus Thompson",
      business: "Personal Trainer",
      initial: "MT",
      quote: "We went from 500 to 15K followers in 3 months. The videos basically sell for me now.",
      result: "30x followers",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      name: "Sarah Chen",
      business: "E-commerce Founder",
      initial: "SC",
      quote: "Our ads finally convert. Sales are up 3x since we started.",
      result: "3x revenue",
      gradient: "from-violet-500 to-pink-500"
    },
    {
      name: "David Rodriguez",
      business: "Real Estate Agent",
      initial: "DR",
      quote: "Clients literally tell me my videos are why they called me instead of competitors.",
      result: "2x listings",
      gradient: "from-cyan-500 to-emerald-500"
    }
  ];

  const videoLabels = [
    "Social Reel Edit",
    "Product Launch Ad",
    "Testimonial Cut",
    "Brand Story",
    "Tutorial Clip",
    "Promo Video"
  ];

  return (
    <section id="proof" className="relative py-20 sm:py-28 bg-slate-950 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Portfolio header */}
        <div className="reveal text-center mb-14 sm:mb-16">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-3">
            Portfolio
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-white tracking-tight mb-4">
            Real edits. Real businesses.
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            See how raw footage turns into high-performing content.
          </p>
        </div>

        {/* Video grid */}
        <div className="reveal-children grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-20 sm:mb-24">
          {videoLabels.map((label, item) => (
            <div
              key={item}
              className="group relative rounded-2xl overflow-hidden cursor-pointer border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
            >
              <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
                {/* Accent gradient */}
                <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${
                  item % 3 === 0 ? 'from-blue-600/30 to-transparent' :
                  item % 3 === 1 ? 'from-cyan-600/30 to-transparent' :
                  'from-violet-600/30 to-transparent'
                }`} />

                {/* Play button */}
                <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300 border border-white/10">
                  <Play className="w-6 h-6 text-white ml-0.5" fill="white" fillOpacity={0.8} />
                </div>

                {/* Duration badge */}
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-md">
                  0:{30 + item * 5}
                </div>
              </div>
              <div className="p-4 bg-white/[0.02]">
                <div className="text-white font-medium text-sm">{label}</div>
                <div className="text-slate-500 text-xs mt-0.5">Before & After</div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div>
          <div className="reveal text-center mb-10 sm:mb-12">
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-3">
              Testimonials
            </p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              What clients say
            </h3>
          </div>

          <div className="reveal-children grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 sm:p-7 hover:border-white/[0.12] transition-all duration-300"
              >
                <Quote className="w-8 h-8 text-blue-500/15 mb-5" />
                
                <p className="text-white/90 text-base leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                <div className="flex items-center justify-between pt-5 border-t border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-xs`}>
                      {testimonial.initial}
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm">{testimonial.name}</div>
                      <div className="text-slate-500 text-xs">{testimonial.business}</div>
                    </div>
                  </div>
                  <div className="bg-blue-500/10 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full">
                    {testimonial.result}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
