import { Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 text-slate-400 pt-16 pb-10 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <img src="/logo.png" alt="Carter Studios" className="h-10 w-auto" />
            <p className="text-sm leading-relaxed text-slate-500">
              Professional video editing for businesses that want their content to drive growth — not distractions.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">Short-form content</a></li>
              <li><a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">Ads & promos</a></li>
              <li><a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">Product videos</a></li>
              <li><a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">Testimonials</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#benefits" className="text-slate-500 hover:text-slate-300 transition-colors">Why us</a></li>
              <li><a href="#how-it-works" className="text-slate-500 hover:text-slate-300 transition-colors">Process</a></li>
              <li><a href="#proof" className="text-slate-500 hover:text-slate-300 transition-colors">Portfolio</a></li>
              <li><a href="#cta" className="text-slate-500 hover:text-slate-300 transition-colors">Get started</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            <a href="mailto:hello@carterstudios.com" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors">
              <Mail className="w-4 h-4" />
              <span>hello@carterstudios.com</span>
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-600">&copy; {new Date().getFullYear()} Carter Studios. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-slate-600">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
