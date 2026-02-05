import { useState } from 'react';
import { Video, Menu, X } from 'lucide-react';

interface HeaderProps {
  onCTAClick: () => void;
}

export default function Header({ onCTAClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#benefits', label: 'Benefits' },
    { href: '#proof', label: 'Portfolio' },
    { href: '#cta', label: 'Pricing' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/50 bg-slate-900/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <a href="#top" className="flex items-center gap-2.5 text-white">
            <span className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg">
              <Video className="w-5 h-5 text-white" />
            </span>
            <span className="font-bold text-lg">VideoEdits</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <button
              onClick={onCTAClick}
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
            >
              Book a Call
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-300 hover:text-white p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800/50">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-300 hover:text-white transition-colors py-2 px-2 rounded-lg hover:bg-slate-800/50"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onCTAClick();
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg text-sm font-semibold transition-colors mt-2"
              >
                Book a Call
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
