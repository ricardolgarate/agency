import { X } from 'lucide-react';
import { useEffect } from 'react';

interface CalendlyEmbedProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CalendlyEmbed({ isOpen, onClose }: CalendlyEmbedProps) {
  useEffect(() => {
    if (isOpen) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full h-[90vh] relative shadow-2xl overflow-hidden">
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="bg-slate-900 text-white p-2 rounded-full hover:bg-slate-800 transition-colors shadow-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div
          className="calendly-inline-widget h-full w-full"
          data-url="https://calendly.com/darnellcarter12345/tashaundetails?hide_gdpr_banner=1"
        ></div>
      </div>
    </div>
  );
}
