import { useState } from 'react';
import { calcSetQuality, type TempoChoice } from '../../lib/fitness-utils';
import SetTimer from './SetTimer';

interface SetLogEntry {
  setNumber: number;
  weight: number;
  reps: number;
  rir: number;
  tempoChoice: TempoChoice;
  restTimeSeconds: number;
  qualityScore: number;
  qualityLabel: string;
}

interface ExerciseLoggerProps {
  plannedSetCount: number;
  targetRepRangeMin: number;
  targetRepRangeMax: number;
  defaultRestSeconds: number;
  onSetLogged: (setLog: SetLogEntry) => void;
  existingLogs: SetLogEntry[];
}

const TEMPOS: { value: TempoChoice; label: string; color: string }[] = [
  { value: 'slow', label: 'Slow', color: 'text-emerald-400' },
  { value: 'controlled', label: 'Controlled', color: 'text-blue-400' },
  { value: 'fast', label: 'Fast', color: 'text-yellow-400' },
  { value: 'very-fast', label: 'Very Fast', color: 'text-red-400' },
];

export default function ExerciseLogger({
  plannedSetCount, targetRepRangeMin, targetRepRangeMax,
  defaultRestSeconds, onSetLogged, existingLogs
}: ExerciseLoggerProps) {
  const nextSet = existingLogs.length + 1;
  const allDone = existingLogs.length >= plannedSetCount;

  const [weight, setWeight] = useState(existingLogs.length > 0 ? existingLogs[existingLogs.length - 1].weight : 0);
  const [reps, setReps] = useState(0);
  const [rir, setRir] = useState(2);
  const [tempo, setTempo] = useState<TempoChoice>('controlled');
  const [restTime, setRestTime] = useState(0);
  const [showTimer, setShowTimer] = useState(false);

  const handleSave = () => {
    if (weight <= 0 || reps <= 0) return;
    const { score, label } = calcSetQuality(tempo, rir);
    onSetLogged({
      setNumber: nextSet,
      weight,
      reps,
      rir,
      tempoChoice: tempo,
      restTimeSeconds: restTime,
      qualityScore: score,
      qualityLabel: label
    });
    setReps(0);
    setRir(2);
    setRestTime(0);
    setShowTimer(true);
  };

  const qualityColor = (label: string) => {
    if (label === 'High') return 'text-emerald-400 bg-emerald-500/10';
    if (label === 'Medium') return 'text-yellow-400 bg-yellow-500/10';
    return 'text-red-400 bg-red-500/10';
  };

  const inputCls = "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 text-white text-center text-sm focus:ring-2 focus:ring-blue-500/50 outline-none";

  return (
    <div className="space-y-3">
      {/* Completed sets */}
      {existingLogs.map((log) => (
        <div key={log.setNumber} className="flex items-center gap-3 bg-white/[0.02] border border-white/[0.04] rounded-xl px-4 py-3">
          <span className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-xs font-bold">
            {log.setNumber}
          </span>
          <div className="flex-1 text-sm">
            <span className="text-white font-medium">{log.weight} lbs</span>
            <span className="text-slate-500 mx-1.5">×</span>
            <span className="text-white">{log.reps} reps</span>
            <span className="text-slate-500 mx-1.5">@</span>
            <span className="text-slate-400">RIR {log.rir}</span>
          </div>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${qualityColor(log.qualityLabel)}`}>
            {log.qualityLabel}
          </span>
        </div>
      ))}

      {/* Rest timer between sets */}
      {showTimer && !allDone && (
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 flex items-center justify-between">
          <span className="text-sm text-slate-400">Rest before Set {nextSet}</span>
          <SetTimer
            autoStart
            defaultSeconds={defaultRestSeconds}
            onTimeRecorded={(s) => { setRestTime(s); setShowTimer(false); }}
          />
        </div>
      )}

      {/* Log next set */}
      {!allDone && (
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-white">Set {nextSet} of {plannedSetCount}</span>
            <span className="text-xs text-slate-500">Target: {targetRepRangeMin}–{targetRepRangeMax} reps</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-slate-500 mb-1">Weight</label>
              <input
                type="number"
                value={weight || ''}
                onChange={(e) => setWeight(Number(e.target.value))}
                placeholder="lbs"
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Reps</label>
              <input
                type="number"
                value={reps || ''}
                onChange={(e) => setReps(Number(e.target.value))}
                min={0}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">RIR (0-6)</label>
              <input
                type="number"
                value={rir}
                onChange={(e) => setRir(Math.min(6, Math.max(0, Number(e.target.value))))}
                min={0}
                max={6}
                className={inputCls}
              />
            </div>
          </div>

          {/* Tempo */}
          <div>
            <label className="block text-xs text-slate-500 mb-2">Rep tempo</label>
            <div className="flex gap-2">
              {TEMPOS.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTempo(t.value)}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                    tempo === t.value
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/[0.04] text-slate-400 hover:bg-white/[0.08]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={weight <= 0 || reps <= 0}
            className="w-full py-3.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Log Set {nextSet}
          </button>
        </div>
      )}

      {allDone && (
        <div className="text-center py-4">
          <span className="text-emerald-400 text-sm font-medium">All {plannedSetCount} sets completed!</span>
        </div>
      )}
    </div>
  );
}
