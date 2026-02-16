import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface SetTimerProps {
  autoStart?: boolean;
  defaultSeconds?: number;
  onTimeRecorded?: (seconds: number) => void;
}

export default function SetTimer({ autoStart = false, defaultSeconds = 120, onTimeRecorded }: SetTimerProps) {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(autoStart);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    setRunning(false);
    if (onTimeRecorded && seconds > 0) onTimeRecorded(seconds);
    setSeconds(0);
  };

  const isOvertime = seconds >= defaultSeconds;

  return (
    <div className="flex items-center gap-3">
      <span className={`font-mono text-lg font-bold tabular-nums ${isOvertime ? 'text-green-400' : 'text-white'}`}>
        {formatTime(seconds)}
      </span>
      <button
        onClick={() => setRunning(!running)}
        className="p-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-slate-300 transition-colors"
      >
        {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </button>
      <button
        onClick={handleReset}
        className="p-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-slate-300 transition-colors"
      >
        <RotateCcw className="w-4 h-4" />
      </button>
      {isOvertime && (
        <span className="text-green-400 text-xs font-medium">Ready!</span>
      )}
    </div>
  );
}
