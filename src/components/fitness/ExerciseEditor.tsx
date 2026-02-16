import { useState } from 'react';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { X } from 'lucide-react';

interface ExerciseEditorProps {
  uid: string;
  dayId: string;
  existingExercise?: {
    id: string;
    name: string;
    type: string;
    targetRepRangeMin: number;
    targetRepRangeMax: number;
    plannedSetCount: number;
    notes: string;
  };
  nextIndex: number;
  onClose: () => void;
  onSaved: () => void;
}

const TYPES = ['barbell', 'dumbbell', 'machine', 'cable', 'bodyweight'];

export default function ExerciseEditor({
  uid, dayId, existingExercise, nextIndex, onClose, onSaved
}: ExerciseEditorProps) {
  const [name, setName] = useState(existingExercise?.name ?? '');
  const [type, setType] = useState(existingExercise?.type ?? 'machine');
  const [repMin, setRepMin] = useState(existingExercise?.targetRepRangeMin ?? 8);
  const [repMax, setRepMax] = useState(existingExercise?.targetRepRangeMax ?? 12);
  const [sets, setSets] = useState(existingExercise?.plannedSetCount ?? 3);
  const [notes, setNotes] = useState(existingExercise?.notes ?? '');

  const handleSave = async () => {
    if (!name.trim()) return;
    const data = {
      name: name.trim(),
      type,
      targetRepRangeMin: repMin,
      targetRepRangeMax: repMax,
      plannedSetCount: sets,
      notes: notes.trim(),
      updatedAt: new Date()
    };

    const exCol = collection(db, 'users', uid, 'days', dayId, 'exercises');
    if (existingExercise) {
      await setDoc(doc(exCol, existingExercise.id), data, { merge: true });
    } else {
      await addDoc(exCol, { ...data, orderIndex: nextIndex, createdAt: new Date() });
    }
    onSaved();
    onClose();
  };

  const inputCls = "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none text-sm";

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-slate-950 border border-white/[0.08] rounded-2xl max-w-md w-full p-6 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-white">
            {existingExercise ? 'Edit Exercise' : 'Add Exercise'}
          </h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Exercise name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Incline Bench Press"
              autoFocus
              className={inputCls}
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Type</label>
            <div className="flex flex-wrap gap-2">
              {TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium capitalize transition-all ${
                    type === t
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/[0.04] text-slate-400 hover:bg-white/[0.08]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Rep min</label>
              <input
                type="number"
                value={repMin}
                onChange={(e) => setRepMin(Number(e.target.value))}
                min={1}
                max={30}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Rep max</label>
              <input
                type="number"
                value={repMax}
                onChange={(e) => setRepMax(Number(e.target.value))}
                min={1}
                max={30}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Sets</label>
              <input
                type="number"
                value={sets}
                onChange={(e) => setSets(Number(e.target.value))}
                min={1}
                max={10}
                className={inputCls}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Notes (optional)</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., slow eccentric"
              className={inputCls}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/[0.04] text-white font-semibold hover:bg-white/[0.08] transition-all">
            Cancel
          </button>
          <button onClick={handleSave} disabled={!name.trim()} className="flex-1 py-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-400 transition-all disabled:opacity-40">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
