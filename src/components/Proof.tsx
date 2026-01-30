import { Play, Star } from 'lucide-react';

export default function Proof() {
  const testimonials = [
    {
      name: "Marcus Thompson",
      business: "Personal Trainer",
      initial: "MT",
      quote: "Went from 50 followers to 5,000 in 3 months. These videos changed everything for my business.",
      rating: 5
    },
    {
      name: "Sarah Chen",
      business: "E-commerce Store",
      initial: "SC",
      quote: "My product videos now look like the big brands. Sales increased 250% since switching to their service.",
      rating: 5
    },
    {
      name: "David Rodriguez",
      business: "Real Estate Agent",
      initial: "DR",
      quote: "I close deals faster now because my property videos stand out. Clients are impressed before we even meet.",
      rating: 5
    }
  ];

  return (
    <section id="proof" className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 text-green-400 text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            <span>Real Results</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            See What We've Created for
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Businesses Like Yours
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            From boring raw footage to conversion-focused content. Every video designed to attract, engage, and convert your ideal customers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="group relative bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
                <Play className="w-16 h-16 text-white relative z-10 group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all"></div>
                <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                  LIVE
                </div>
              </div>
              <div className="p-4">
                <div className="text-slate-400 text-sm mb-1">Sample Video {item}</div>
                <div className="text-white font-semibold">Professional Edit Example</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            What Our Clients Say
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                    {testimonial.initial}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{testimonial.name}</div>
                    <div className="text-slate-400 text-sm">{testimonial.business}</div>
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
