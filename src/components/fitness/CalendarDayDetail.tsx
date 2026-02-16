import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { X, Loader2 } from 'lucide-react';

interface SetLog {
  setNumber: number;
  weight: number;
  reps: number;
  rir: number;
  tempoChoice: string;
  qualityLabel: string;
  restTimeSeconds: number;
}

interface ExerciseLog {
  exerciseName: string;
  sets: SetLog[];
}

interface CalendarDayDetailProps {
  uid: string;
  dateKey: string;
  summary: { workoutId: string; dayName: string; totalSets: number; totalExercises: number };
  onClose: () => void;
}

export default function CalendarDayDetail({ uid, dateKey, summary, onClose }: CalendarDayDetailProps) {
  const [loading, setLoading] = useState(true);
  const [exerciseLogs, setExerciseLogs] = useState<ExerciseLog[]>([]);

  useEffect(() => {
    loadDetail();
  }, []);

  const loadDetail = async () => {
    setLoading(true);
    const exLogsRef = collection(db, 'users', uid, 'workouts', summary.workoutId, 'exerciseLogs');
    const exLogsSnap = await getDocs(query(exLogsRef, orderBy('orderIndex', 'asc')));

    const logs: ExerciseLog[] = [];
    for (const exDoc of exLogsSnap.docs) {
      const exData = exDoc.data();
      const setsRef = collection(exLogsRef, exDoc.id, 'setLogs');
      const setsSnap = await getDocs(query(setsRef, orderBy('setNumber', 'asc')));
      const sets: SetLog[] = [];
      setsSnap.forEach((s) => {
        const sd = s.data();
        sets.push({
          setNumber: sd.setNumber,
          weight: sd.weight,
          reps: sd.reps,
          rir: sd.rir,
          tempoChoice: sd.tempoChoice,
          qualityLabel: sd.qualityLabel,
          restTimeSeconds: sd.restTimeSeconds
        });
      });
      logs.push({ exerciseName: exData.exerciseName, sets });
    }
    setExerciseLogs(logs);
    setLoading(false);
  };

  const qualityColor = (label: string) => {
    if (label === 'High') return 'text-emerald-400 bg-emerald-500/10';
    if (label === 'Medium') return 'text-yellow-400 bg-yellow-500/10';
    return 'text-red-400 bg-red-500/10';
  };

  const formatDate = (key: string) => {
    const d = new Date(key + 'T12:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-slate-950 border border-white/[0.08] rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-slate-950 border-b border-white/[0.06] p-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">{summary.dayName}</h3>
            <p className="text-xs text-slate-500">{formatDate(dateKey)}</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
            </div>
          ) : exerciseLogs.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No detailed logs found.</p>
          ) : (
            <div className="space-y-5">
              {exerciseLogs.map((ex, i) => (
                <div key={i}>
                  <h4 className="text-sm font-semibold text-white mb-2">{ex.exerciseName}</h4>
                  <div className="space-y-1.5">
                    {ex.sets.map((s) => (
                      <div key={s.setNumber} className="flex items-center gap-3 bg-white/[0.02] border border-white/[0.04] rounded-lg px-3 py-2">
                        <span className="w-6 h-6 rounded bg-white/[0.06] flex items-center justify-center text-xs text-slate-400 font-bold">
                          {s.setNumber}
                        </span>
                        <div className="flex-1 text-xs">
                          <span className="text-white font-medium">{s.weight} lbs</span>
                          <span className="text-slate-500 mx-1">×</span>
                          <span className="text-white">{s.reps}</span>
                          <span className="text-slate-500 mx-1">@</span>
                          <span className="text-slate-400">RIR {s.rir}</span>
                        </div>
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${qualityColor(s.qualityLabel)}`}>
                          {s.qualityLabel}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="text-center text-xs text-slate-600 pt-2">
                {summary.totalExercises} exercises · {summary.totalSets} sets
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
