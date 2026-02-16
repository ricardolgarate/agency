import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { ArrowLeft, Loader2, Check } from 'lucide-react';

export default function Settings() {
  const [uid, setUid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [unit, setUnit] = useState<'lb' | 'kg'>('lb');
  const [restTimer, setRestTimer] = useState(120);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) setUid(user.uid);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (uid) loadSettings();
  }, [uid]);

  const loadSettings = async () => {
    if (!uid) return;
    setLoading(true);
    const snap = await getDoc(doc(db, 'users', uid));
    if (snap.exists()) {
      const data = snap.data();
      setUnit(data.unitPreference ?? 'lb');
      setRestTimer(data.defaultRestTimerSeconds ?? 120);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!uid) return;
    await setDoc(doc(db, 'users', uid), {
      unitPreference: unit,
      defaultRestTimerSeconds: restTimer
    }, { merge: true });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 pb-20">
      <div className="flex items-center gap-3 py-5">
        <Link to="/fitness" className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-bold">Settings</h1>
      </div>

      <div className="space-y-6">
        {/* Unit preference */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
          <label className="block text-sm text-slate-400 mb-3">Weight unit</label>
          <div className="flex gap-2">
            {(['lb', 'kg'] as const).map((u) => (
              <button
                key={u}
                onClick={() => setUnit(u)}
                className={`flex-1 py-3 rounded-lg text-sm font-semibold uppercase transition-all ${
                  unit === u
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/[0.04] text-slate-400 hover:bg-white/[0.08]'
                }`}
              >
                {u}
              </button>
            ))}
          </div>
        </div>

        {/* Default rest timer */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
          <label className="block text-sm text-slate-400 mb-3">Default rest timer (seconds)</label>
          <div className="flex gap-2">
            {[60, 90, 120, 150, 180, 240].map((s) => (
              <button
                key={s}
                onClick={() => setRestTimer(s)}
                className={`flex-1 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  restTimer === s
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/[0.04] text-slate-400 hover:bg-white/[0.08]'
                }`}
              >
                {s >= 60 ? `${s / 60}m` : `${s}s`}
              </button>
            ))}
          </div>
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          className="w-full py-3.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-semibold transition-all flex items-center justify-center gap-2"
        >
          {saved ? (
            <>
              <Check className="w-4 h-4" />
              Saved!
            </>
          ) : (
            'Save Settings'
          )}
        </button>
      </div>
    </div>
  );
}
