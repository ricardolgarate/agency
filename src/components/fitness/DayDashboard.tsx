import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import {
  collection, doc, getDoc, getDocs, addDoc, setDoc,
  query, orderBy, where, limit
} from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import {
  ArrowLeft, Plus, Pencil, Loader2, TrendingUp, TrendingDown,
  AlertTriangle, ChevronDown, ChevronUp, BarChart3
} from 'lucide-react';
import ExerciseEditor from './ExerciseEditor';
import ExerciseLogger from './ExerciseLogger';
import PredictModal from './PredictModal';
import {
  calcE1RM, shouldIncreaseWeight, compareToLastSession,
  suggestTarget, type SetData
} from '../../lib/fitness-utils';

interface Exercise {
  id: string;
  name: string;
  type: string;
  targetRepRangeMin: number;
  targetRepRangeMax: number;
  plannedSetCount: number;
  notes: string;
  orderIndex: number;
}

interface SetLog {
  setNumber: number;
  weight: number;
  reps: number;
  rir: number;
  tempoChoice: string;
  restTimeSeconds: number;
  qualityScore: number;
  qualityLabel: string;
}

interface PrevBest {
  weight: number;
  reps: number;
  rir: number;
  qualityScore: number;
}

export default function DayDashboard() {
  const { dayId } = useParams<{ dayId: string }>();
  const [uid, setUid] = useState<string | null>(null);
  const [dayName, setDayName] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [showAddExercise, setShowAddExercise] = useState(false);
  const [openExerciseId, setOpenExerciseId] = useState<string | null>(null);
  const [setLogs, setSetLogs] = useState<Record<string, SetLog[]>>({});
  const [prevBests, setPrevBests] = useState<Record<string, PrevBest | null>>({});
  const [workoutId, setWorkoutId] = useState<string | null>(null);
  const [restDays, setRestDays] = useState(2);
  const [predictExercise, setPredictExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) setUid(user.uid);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (uid && dayId) loadDay();
  }, [uid, dayId]);

  const loadDay = async () => {
    if (!uid || !dayId) return;
    setLoading(true);

    // Load day name
    const daySnap = await getDoc(doc(db, 'users', uid, 'days', dayId));
    if (daySnap.exists()) setDayName(daySnap.data().name);

    // Load user rest days
    const userSnap = await getDoc(doc(db, 'users', uid));
    if (userSnap.exists()) setRestDays(userSnap.data().restDaysPerWeek ?? 2);

    // Load exercises
    const exRef = collection(db, 'users', uid, 'days', dayId, 'exercises');
    const exSnap = await getDocs(query(exRef, orderBy('orderIndex', 'asc')));
    const exList: Exercise[] = [];
    exSnap.forEach((d) => {
      const data = d.data();
      exList.push({
        id: d.id,
        name: data.name,
        type: data.type,
        targetRepRangeMin: data.targetRepRangeMin,
        targetRepRangeMax: data.targetRepRangeMax,
        plannedSetCount: data.plannedSetCount,
        notes: data.notes ?? '',
        orderIndex: data.orderIndex
      });
    });
    setExercises(exList);

    // Load previous best for each exercise (from last workout with this dayId)
    const workoutsRef = collection(db, 'users', uid, 'workouts');
    const prevWorkoutQ = query(
      workoutsRef,
      where('dayId', '==', dayId),
      orderBy('performedAt', 'desc'),
      limit(1)
    );
    const prevWorkoutSnap = await getDocs(prevWorkoutQ);
    const bests: Record<string, PrevBest | null> = {};

    if (!prevWorkoutSnap.empty) {
      const prevWId = prevWorkoutSnap.docs[0].id;
      const prevExLogsRef = collection(db, 'users', uid, 'workouts', prevWId, 'exerciseLogs');
      const prevExLogsSnap = await getDocs(prevExLogsRef);

      for (const exLogDoc of prevExLogsSnap.docs) {
        const exLogData = exLogDoc.data();
        const setsRef = collection(prevExLogsRef, exLogDoc.id, 'setLogs');
        const setsSnap = await getDocs(query(setsRef, orderBy('setNumber', 'asc')));
        let best: PrevBest | null = null;
        setsSnap.forEach((s) => {
          const sd = s.data();
          const e1rm = calcE1RM(sd.weight, sd.reps);
          if (!best || calcE1RM(best.weight, best.reps) < e1rm) {
            best = { weight: sd.weight, reps: sd.reps, rir: sd.rir, qualityScore: sd.qualityScore };
          }
        });
        bests[exLogData.exerciseId] = best;
      }
    }
    setPrevBests(bests);
    setLoading(false);
  };

  const ensureWorkout = async (): Promise<string> => {
    if (workoutId) return workoutId;
    if (!uid || !dayId) throw new Error('No user or day');

    const today = new Date().toISOString().slice(0, 10);
    const wRef = await addDoc(collection(db, 'users', uid, 'workouts'), {
      date: today,
      performedAt: new Date(),
      dayId,
      dayName,
      totalSets: 0,
      totalExercises: 0
    });
    setWorkoutId(wRef.id);

    // Also create/update workout summary for calendar
    await setDoc(doc(db, 'users', uid, 'workoutSummaries', today), {
      workoutId: wRef.id,
      dayName,
      totalSets: 0,
      totalExercises: 0
    }, { merge: true });

    return wRef.id;
  };

  const handleSetLogged = async (exerciseId: string, exerciseName: string, setLog: SetLog) => {
    if (!uid) return;
    const wId = await ensureWorkout();

    // Find or create exerciseLog
    const exLogsRef = collection(db, 'users', uid, 'workouts', wId, 'exerciseLogs');
    const exLogQ = query(exLogsRef, where('exerciseId', '==', exerciseId));
    const exLogSnap = await getDocs(exLogQ);

    let exLogId: string;
    if (exLogSnap.empty) {
      const exLogDoc = await addDoc(exLogsRef, {
        exerciseId,
        exerciseName,
        orderIndex: exercises.findIndex((e) => e.id === exerciseId)
      });
      exLogId = exLogDoc.id;
    } else {
      exLogId = exLogSnap.docs[0].id;
    }

    // Save set log
    const setLogsRef = collection(exLogsRef, exLogId, 'setLogs');
    await addDoc(setLogsRef, { ...setLog, createdAt: new Date() });

    // Update local state
    setSetLogs((prev) => ({
      ...prev,
      [exerciseId]: [...(prev[exerciseId] ?? []), setLog]
    }));

    // Update workout summary counts
    const allLogs = { ...setLogs, [exerciseId]: [...(setLogs[exerciseId] ?? []), setLog] };
    const totalSets = Object.values(allLogs).reduce((sum, logs) => sum + logs.length, 0);
    const totalExercises = Object.keys(allLogs).length;
    const today = new Date().toISOString().slice(0, 10);

    await setDoc(doc(db, 'users', uid, 'workouts', wId), { totalSets, totalExercises }, { merge: true });
    await setDoc(doc(db, 'users', uid, 'workoutSummaries', today), { totalSets, totalExercises }, { merge: true });
  };

  const handleDeleteExercise = async (exId: string) => {
    if (!uid || !dayId) return;
    if (!confirm('Delete this exercise from the template?')) return;
    const ref = doc(db, 'users', uid, 'days', dayId, 'exercises', exId);
    await setDoc(ref, { isDeleted: true }, { merge: true });
    loadDay();
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
      {/* Header */}
      <div className="flex items-center justify-between py-5">
        <div className="flex items-center gap-3">
          <Link to="/fitness" className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold">{dayName}</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setEditMode(!editMode)}
            className={`p-2 rounded-lg transition-colors ${editMode ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-white/5 text-slate-400'}`}
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowAddExercise(true)}
            className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Exercises */}
      {exercises.length === 0 ? (
        <button
          onClick={() => setShowAddExercise(true)}
          className="w-full py-16 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center gap-3 text-slate-500 hover:text-slate-300 hover:border-white/20 transition-all"
        >
          <Plus className="w-8 h-8" />
          <span className="font-medium">Add your first Exercise</span>
        </button>
      ) : (
        <div className="space-y-4">
          {exercises.map((ex) => {
            const isOpen = openExerciseId === ex.id;
            const prev = prevBests[ex.id] ?? null;
            const currentLogs = setLogs[ex.id] ?? [];
            const currentBest: SetData | null = currentLogs.length > 0
              ? currentLogs.reduce((best, l) =>
                  calcE1RM(l.weight, l.reps) > calcE1RM(best.weight, best.reps) ? l : best
                , currentLogs[0])
              : null;

            const increaseWeight = prev
              ? shouldIncreaseWeight(prev.reps, ex.targetRepRangeMax, prev.rir, prev.qualityLabel as 'Low' | 'Medium' | 'High')
              : false;

            const comparison = compareToLastSession(currentBest, prev);
            const suggestion = prev
              ? suggestTarget(prev.weight, prev.reps, ex.targetRepRangeMin, ex.targetRepRangeMax, increaseWeight)
              : `Start with a comfortable weight for ${ex.targetRepRangeMin}–${ex.targetRepRangeMax} reps`;

            return (
              <div key={ex.id} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden">
                {/* Exercise header */}
                <div
                  onClick={() => !editMode && setOpenExerciseId(isOpen ? null : ex.id)}
                  className={`flex items-center justify-between p-4 ${editMode ? '' : 'cursor-pointer'}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white truncate">{ex.name}</h3>
                      <span className="text-xs text-slate-500 capitalize">{ex.type}</span>
                    </div>

                    {/* Coach suggestion */}
                    {!editMode && (
                      <p className="text-xs text-blue-400 mt-1">{suggestion}</p>
                    )}

                    {/* Alerts */}
                    {increaseWeight && !editMode && (
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-xs text-emerald-400 font-medium">Time to increase weight!</span>
                      </div>
                    )}

                    {comparison && !editMode && (
                      <div className="flex items-center gap-1.5 mt-1">
                        {comparison.includes('+') ? (
                          <TrendingUp className="w-3 h-3 text-emerald-400" />
                        ) : comparison.includes('-') ? (
                          <TrendingDown className="w-3 h-3 text-red-400" />
                        ) : (
                          <AlertTriangle className="w-3 h-3 text-yellow-400" />
                        )}
                        <span className="text-xs text-slate-400">{comparison}</span>
                      </div>
                    )}

                    {/* Previous best */}
                    {prev && !editMode && (
                      <p className="text-xs text-slate-500 mt-1">
                        Last: {prev.weight} lbs × {prev.reps} reps @ RIR {prev.rir}
                      </p>
                    )}
                  </div>

                  {editMode ? (
                    <div className="flex items-center gap-1 ml-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); setPredictExercise(ex); }}
                        className="p-2 text-slate-400 hover:text-blue-400 rounded-lg hover:bg-white/5"
                      >
                        <BarChart3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDeleteExercise(ex.id); }}
                        className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-white/5 text-sm"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 ml-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); setPredictExercise(ex); }}
                        className="p-2 text-slate-400 hover:text-blue-400 rounded-lg hover:bg-white/5"
                        title="Predict"
                      >
                        <BarChart3 className="w-4 h-4" />
                      </button>
                      {isOpen
                        ? <ChevronUp className="w-5 h-5 text-slate-500" />
                        : <ChevronDown className="w-5 h-5 text-slate-500" />
                      }
                    </div>
                  )}
                </div>

                {/* Logging area */}
                {isOpen && !editMode && (
                  <div className="px-4 pb-4 border-t border-white/[0.04] pt-4">
                    <ExerciseLogger
                      plannedSetCount={ex.plannedSetCount}
                      targetRepRangeMin={ex.targetRepRangeMin}
                      targetRepRangeMax={ex.targetRepRangeMax}
                      defaultRestSeconds={120}
                      existingLogs={currentLogs}
                      onSetLogged={(setLog) => handleSetLogged(ex.id, ex.name, setLog)}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Add Exercise Modal */}
      {showAddExercise && uid && dayId && (
        <ExerciseEditor
          uid={uid}
          dayId={dayId}
          nextIndex={exercises.length}
          onClose={() => setShowAddExercise(false)}
          onSaved={loadDay}
        />
      )}

      {/* Predict Modal */}
      {predictExercise && uid && dayId && (
        <PredictModal
          uid={uid}
          dayId={dayId}
          exercise={predictExercise}
          restDaysPerWeek={restDays}
          onClose={() => setPredictExercise(null)}
        />
      )}
    </div>
  );
}
