import { useState } from 'react';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { X } from 'lucide-react';

interface DayEditorProps {
  uid: string;
  existingDay?: { id: string; name: string };
  nextIndex: number;
  onClose: () => void;
  onSaved: () => void;
}

export default function DayEditor({ uid, existingDay, nextIndex, onClose, onSaved }: DayEditorProps) {
  const [name, setName] = useState(existingDay?.name ?? `Day ${nextIndex + 1}`);

  const handleSave = async () => {
    if (!name.trim()) return;
    if (existingDay) {
      await setDoc(doc(db, 'users', uid, 'days', existingDay.id), {
        name: name.trim(),
        updatedAt: new Date()
      }, { merge: true });
    } else {
      await addDoc(collection(db, 'users', uid, 'days'), {
        name: name.trim(),
        orderIndex: nextIndex,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-950 border border-white/[0.08] rounded-2xl max-w-sm w-full p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-white">
            {existingDay ? 'Edit Day' : 'New Day'}
          </h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Day name"
          autoFocus
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none text-sm mb-4"
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
        />

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/[0.04] text-white font-semibold hover:bg-white/[0.08] transition-all">
            Cancel
          </button>
          <button onClick={handleSave} className="flex-1 py-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-400 transition-all">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
