import { useEffect, useState } from 'react';
import {
  collection, getDocs, query, where, orderBy
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { X, Loader2, TrendingUp, Lock } from 'lucide-react';
import { calcE1RM, predictStrength, type PredictionResult } from '../../lib/fitness-utils';

interface PredictModalProps {
  uid: string;
  dayId: string;
  exercise: { id: string; name: string };
  restDaysPerWeek: number;
  onClose: () => void;
}

export default function PredictModal({ uid, dayId, exercise, restDaysPerWeek, onClose }: PredictModalProps) {
  const [loading, setLoading] = useState(true);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [dataPoints, setDataPoints] = useState(0);
  const [currentE1RM, setCurrentE1RM] = useState(0);

  useEffect(() => {
    loadPrediction();
  }, []);

  const loadPrediction = async () => {
    setLoading(true);

    // Fetch all workouts for this day
    const workoutsRef = collection(db, 'users', uid, 'workouts');
    const wQ = query(workoutsRef, where('dayId', '==', dayId), orderBy('performedAt', 'asc'));
    const wSnap = await getDocs(wQ);

    const e1rmHistory: { sessionIndex: number; e1rm: number }[] = [];
    let firstDate: Date | null = null;
    let lastDate: Date | null = null;

    let sessionIdx = 0;
    for (const wDoc of wSnap.docs) {
      const wData = wDoc.data();
      const perfAt = wData.performedAt?.toDate?.() ?? new Date(wData.date);
      if (!firstDate) firstDate = perfAt;
      lastDate = perfAt;

      // Find exercise log for this exercise
      const exLogsRef = collection(db, 'users', uid, 'workouts', wDoc.id, 'exerciseLogs');
      const exLogQ = query(exLogsRef, where('exerciseId', '==', exercise.id));
      const exLogSnap = await getDocs(exLogQ);

      for (const exLogDoc of exLogSnap.docs) {
        const setsRef = collection(exLogsRef, exLogDoc.id, 'setLogs');
        const setsSnap = await getDocs(setsRef);

        let bestE1RM = 0;
        setsSnap.forEach((s) => {
          const sd = s.data();
          const e = calcE1RM(sd.weight, sd.reps);
          if (e > bestE1RM) bestE1RM = e;
        });

        if (bestE1RM > 0) {
          e1rmHistory.push({ sessionIndex: sessionIdx, e1rm: bestE1RM });
          setCurrentE1RM(bestE1RM);
        }
      }
      sessionIdx++;
    }

    setDataPoints(e1rmHistory.length);

    // Check if 1 month of data
    let hasOneMonth = false;
    if (firstDate && lastDate) {
      const diffMs = lastDate.getTime() - firstDate.getTime();
      hasOneMonth = diffMs >= 30 * 24 * 60 * 60 * 1000;
    }

    const result = predictStrength(e1rmHistory, restDaysPerWeek, hasOneMonth);
    setPrediction(result);
    setLoading(false);
  };

  const confidenceColor = (c: string) => {
    if (c === 'High') return 'text-emerald-400 bg-emerald-500/10';
    if (c === 'Medium') return 'text-yellow-400 bg-yellow-500/10';
    return 'text-slate-400 bg-slate-500/10';
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-950 border border-white/[0.08] rounded-2xl max-w-sm w-full p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-bold text-white">Prediction</h3>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-slate-400 mb-4">{exercise.name}</p>

        {loading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
          </div>
        ) : !prediction || dataPoints < 3 ? (
          <div className="text-center py-8">
            <BarChartPlaceholder />
            <p className="text-slate-400 text-sm mt-4">
              Need at least 3 logged sessions to predict.
            </p>
            <p className="text-slate-500 text-xs mt-1">
              You have {dataPoints} data point{dataPoints !== 1 ? 's' : ''}.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Current */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
              <p className="text-xs text-slate-500 mb-1">Current estimated 1RM</p>
              <p className="text-2xl font-bold text-white">{currentE1RM} lbs</p>
            </div>

            {/* 3 month */}
            <div className="bg-blue-500/[0.05] border border-blue-500/[0.15] rounded-xl p-4">
              <p className="text-xs text-blue-400 mb-1">3-month prediction</p>
              <p className="text-2xl font-bold text-white">
                {prediction.threeMonth ? `${prediction.threeMonth} lbs` : 'N/A'}
              </p>
              <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mt-2 ${confidenceColor(prediction.confidence)}`}>
                {prediction.confidence} confidence
              </span>
            </div>

            {/* 1 year */}
            <div className={`rounded-xl p-4 ${prediction.oneYear ? 'bg-purple-500/[0.05] border border-purple-500/[0.15]' : 'bg-white/[0.02] border border-white/[0.06]'}`}>
              <p className="text-xs text-slate-400 mb-1">1-year prediction</p>
              {prediction.oneYear ? (
                <p className="text-2xl font-bold text-white">{prediction.oneYear} lbs</p>
              ) : (
                <div className="flex items-center gap-2 mt-1">
                  <Lock className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-500">Unlocks after 1 month of data</span>
                </div>
              )}
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Predictions are estimates based on your recent trend + recovery settings ({restDaysPerWeek} rest day{restDaysPerWeek !== 1 ? 's' : ''}/week).
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function BarChartPlaceholder() {
  return (
    <div className="flex items-end justify-center gap-1.5 h-16">
      {[30, 50, 40, 60, 45, 70].map((h, i) => (
        <div key={i} className="w-4 bg-white/[0.06] rounded-sm" style={{ height: `${h}%` }} />
      ))}
    </div>
  );
}
