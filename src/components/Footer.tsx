import { Video, Mail, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg">
                <Video className="w-6 h-6 text-white" />
              </div>
              <span className="text-white font-bold text-xl">VideoEdits Pro</span>
            </div>
            <p className="text-sm">
              Professional video editing services designed specifically for small businesses and entrepreneurs.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Social Media Videos</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Promotional Content</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Product Videos</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Testimonials</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#proof" className="hover:text-blue-400 transition-colors">Portfolio</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex gap-3 mb-4">
              <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-blue-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-pink-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-blue-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <a href="mailto:hello@videoedits.com" className="flex items-center gap-2 text-sm hover:text-blue-400 transition-colors">
              <Mail className="w-4 h-4" />
              <span>hello@videoedits.com</span>
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} VideoEdits Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
