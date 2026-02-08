import { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

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
      await addDoc(collection(db, 'leads'), {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        budget: formData.budget,
        authority: formData.authority,
        need: formData.need,
        timeline: formData.timeline,
        qualified,
        createdAt: serverTimestamp()
      });

      if (qualified) {
        onQualified();
      } else {
        alert("Thanks for your interest! We'll send you some resources via email. Reach out when you're ready to move forward!");
        onClose();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  const inputClasses = "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all text-sm";
  const labelClasses = "block text-white font-medium text-sm mb-2";
  const selectClasses = "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all text-sm appearance-none";

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="relative bg-slate-950 rounded-2xl max-w-lg w-full border border-white/[0.08] shadow-2xl shadow-black/50 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/[0.04] rounded-t-2xl overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500 ease-out"
            style={{ width: step === 1 ? '50%' : '100%' }}
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-0">
          <div>
            <h3 className="text-xl font-bold text-white">Free Strategy Session</h3>
            <p className="text-slate-500 text-sm mt-1">Step {step} of 2</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className={labelClasses}>Your name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className={inputClasses}
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label className={labelClasses}>Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className={inputClasses}
                  placeholder="john@business.com"
                />
              </div>

              <div>
                <label className={labelClasses}>Business name</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => updateField('company', e.target.value)}
                  className={inputClasses}
                  placeholder="Acme Fitness"
                />
              </div>

              <div>
                <label className={labelClasses}>Monthly budget for video editing</label>
                <select
                  required
                  value={formData.budget}
                  onChange={(e) => updateField('budget', e.target.value)}
                  className={selectClasses}
                >
                  <option value="">Select a range</option>
                  <option value="under-500">Under $500/month</option>
                  <option value="500-1000">$500 – $1,000/month</option>
                  <option value="1000-2000">$1,000 – $2,000/month</option>
                  <option value="2000-plus">$2,000+/month</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!formData.name || !formData.email || !formData.budget}
                className="w-full bg-blue-500 hover:bg-blue-400 text-white px-6 py-4 rounded-xl font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className={labelClasses}>Are you the decision-maker?</label>
                <select
                  required
                  value={formData.authority}
                  onChange={(e) => updateField('authority', e.target.value)}
                  className={selectClasses}
                >
                  <option value="">Select one</option>
                  <option value="yes">Yes, I decide</option>
                  <option value="shared">Shared with partner/team</option>
                  <option value="need-approval">I need someone else's approval</option>
                </select>
              </div>

              <div>
                <label className={labelClasses}>What type of videos do you need?</label>
                <select
                  required
                  value={formData.need}
                  onChange={(e) => updateField('need', e.target.value)}
                  className={selectClasses}
                >
                  <option value="">Select type</option>
                  <option value="social-media">Social media (Reels, TikTok, Shorts)</option>
                  <option value="promotional">Promotional videos</option>
                  <option value="educational">Tutorials / Educational</option>
                  <option value="product">Product demos</option>
                  <option value="testimonials">Customer testimonials</option>
                  <option value="multiple">Multiple types</option>
                </select>
              </div>

              <div>
                <label className={labelClasses}>When do you want to start?</label>
                <select
                  required
                  value={formData.timeline}
                  onChange={(e) => updateField('timeline', e.target.value)}
                  className={selectClasses}
                >
                  <option value="">Select timeline</option>
                  <option value="immediately">ASAP</option>
                  <option value="this-month">This month</option>
                  <option value="next-month">Next month</option>
                  <option value="just-exploring">Just exploring</option>
                </select>
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-white/[0.04] border border-white/[0.08] text-white px-6 py-4 rounded-xl font-semibold hover:bg-white/[0.08] transition-all flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading || !formData.authority || !formData.need || !formData.timeline}
                  className="flex-1 bg-blue-500 hover:bg-blue-400 text-white px-6 py-4 rounded-xl font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Submit'
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
