import { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface BANTModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQualified: () => void;
}

export default function BANTModal({ isOpen, onClose, onQualified }: BANTModalProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    authority: '',
    need: '',
    timeline: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const qualified =
      formData.budget !== 'under-500' &&
      (formData.authority === 'yes' || formData.authority === 'shared') &&
      formData.timeline !== 'just-exploring';

    setLoading(true);

    try {
      const { error } = await supabase
        .from('leads')
        .insert([{
          name: formData.name,
          email: formData.email,
          company: formData.company,
          budget: formData.budget,
          authority: formData.authority,
          need: formData.need,
          timeline: formData.timeline,
          qualified
        }]);

      if (error) throw error;

      if (qualified) {
        onQualified();
      } else {
        alert("Thank you for your interest! Based on your responses, we'll send you some resources via email. When you're ready to move forward, feel free to reach out!");
        onClose();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 rounded-2xl max-w-2xl w-full border border-slate-700 shadow-2xl my-8">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div>
            <h3 className="text-2xl font-bold text-white">Free Strategy Session</h3>
            <p className="text-slate-400 text-sm mt-1">Step {step} of 2</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">
                  What's your name?
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  What's your email?
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="john@business.com"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  What's your business name?
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => updateField('company', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Smith Fitness Coaching"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  What's your monthly budget for video editing?
                </label>
                <select
                  required
                  value={formData.budget}
                  onChange={(e) => updateField('budget', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Select your budget</option>
                  <option value="under-500">Under $500/month</option>
                  <option value="500-1000">$500 - $1,000/month</option>
                  <option value="1000-2000">$1,000 - $2,000/month</option>
                  <option value="2000-plus">$2,000+/month</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!formData.name || !formData.email || !formData.budget}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-4 rounded-lg font-semibold hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Are you the decision-maker for video content?
                </label>
                <select
                  required
                  value={formData.authority}
                  onChange={(e) => updateField('authority', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Select option</option>
                  <option value="yes">Yes, I make the final decision</option>
                  <option value="shared">Shared decision with partner/team</option>
                  <option value="need-approval">I need approval from someone else</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  What type of videos do you need?
                </label>
                <select
                  required
                  value={formData.need}
                  onChange={(e) => updateField('need', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Select type</option>
                  <option value="social-media">Social media content (Reels, TikTok, etc.)</option>
                  <option value="promotional">Promotional videos</option>
                  <option value="educational">Educational/Tutorial videos</option>
                  <option value="product">Product demonstrations</option>
                  <option value="testimonials">Customer testimonials</option>
                  <option value="multiple">Multiple types</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  When do you need to get started?
                </label>
                <select
                  required
                  value={formData.timeline}
                  onChange={(e) => updateField('timeline', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Select timeline</option>
                  <option value="immediately">Immediately (ASAP)</option>
                  <option value="this-month">Within this month</option>
                  <option value="next-month">Next month</option>
                  <option value="just-exploring">Just exploring options</option>
                </select>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-slate-800 text-white px-6 py-4 rounded-lg font-semibold hover:bg-slate-700 transition-all duration-300"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading || !formData.authority || !formData.need || !formData.timeline}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-4 rounded-lg font-semibold hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
