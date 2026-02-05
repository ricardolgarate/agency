import { Play, Star, Quote } from 'lucide-react';

export default function Proof() {
  const testimonials = [
    {
      name: "Marcus Thompson",
      business: "Personal Trainer",
      initial: "MT",
      quote: "We went from 500 to 15K followers in 3 months. The videos basically sell for me now.",
      result: "30x follower growth"
    },
    {
      name: "Sarah Chen",
      business: "E-commerce Founder",
      initial: "SC",
      quote: "Our ads finally convert. Sales are up 3x since we started.",
      result: "3x revenue increase"
    },
    {
      name: "David Rodriguez",
      business: "Real Estate Agent",
      initial: "DR",
      quote: "Clients literally tell me my videos are why they called me.",
      result: "2x more listings"
    }
  ];

  return (
    <section id="proof" className="py-16 sm:py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Portfolio header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Real edits. Real businesses.
          </h2>
          <p className="text-lg text-slate-400">
            See how raw footage turns into high-performing content.
          </p>
        </div>

        {/* Video grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-20 sm:mb-24">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="group relative bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 cursor-pointer"
            >
              <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5"></div>
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                  <Play className="w-7 h-7 text-white ml-1" fill="white" />
                </div>
              </div>
              <div className="p-4">
                <div className="text-white font-medium">Before & After #{item}</div>
                <div className="text-slate-400 text-sm">See transformation</div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div>
          <div className="text-center mb-10 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              What clients say
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 sm:p-8"
              >
                <Quote className="w-8 h-8 text-blue-500/20 mb-4" />
                
                <p className="text-white text-base sm:text-lg leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                      {testimonial.initial}
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm">{testimonial.name}</div>
                      <div className="text-slate-400 text-xs">{testimonial.business}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-blue-400 font-semibold text-sm">{testimonial.result}</div>
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
