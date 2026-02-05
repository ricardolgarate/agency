import { Video, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg">
                <Video className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-lg">VideoEdits</span>
            </div>
            <p className="text-sm leading-relaxed">
              Professional video editing for businesses that want their content to drive growth — not distractions.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Short-form content</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ads & promos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Product videos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Testimonials</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#benefits" className="hover:text-white transition-colors">Why us</a></li>
              <li><a href="#proof" className="hover:text-white transition-colors">Portfolio</a></li>
              <li><a href="#cta" className="hover:text-white transition-colors">Get started</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <a href="mailto:hello@videoedits.com" className="flex items-center gap-2 text-sm hover:text-white transition-colors">
              <Mail className="w-4 h-4" />
              <span>hello@videoedits.com</span>
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} VideoEdits. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
