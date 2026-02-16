import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { ArrowLeft, ChevronLeft, ChevronRight, Loader2, Dumbbell } from 'lucide-react';
import CalendarDayDetail from './CalendarDayDetail';

interface DaySummary {
  workoutId: string;
  dayName: string;
  totalSets: number;
  totalExercises: number;
}

export default function CalendarView() {
  const [uid, setUid] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [summaries, setSummaries] = useState<Record<string, DaySummary>>({});
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) setUid(user.uid);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (uid) loadMonth();
  }, [uid, currentMonth]);

  const loadMonth = async () => {
    if (!uid) return;
    setLoading(true);

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const startDate = `${year}-${String(month + 1).padStart(2, '0')}-01`;
    const endDate = `${year}-${String(month + 1).padStart(2, '0')}-31`;

    const summRef = collection(db, 'users', uid, 'workoutSummaries');
    const q = query(summRef, where('__name__', '>=', startDate), where('__name__', '<=', endDate));

    try {
      const snap = await getDocs(q);
      const loaded: Record<string, DaySummary> = {};
      snap.forEach((d) => {
        loaded[d.id] = d.data() as DaySummary;
      });
      setSummaries(loaded);
    } catch {
      // Fallback: load all summaries and filter client-side
      const allSnap = await getDocs(collection(db, 'users', uid, 'workoutSummaries'));
      const loaded: Record<string, DaySummary> = {};
      allSnap.forEach((d) => {
        if (d.id >= startDate && d.id <= endDate) {
          loaded[d.id] = d.data() as DaySummary;
        }
      });
      setSummaries(loaded);
    }
    setLoading(false);
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const formatDateKey = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth() + 1;
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const { firstDay, daysInMonth } = getDaysInMonth();
  const today = new Date().toISOString().slice(0, 10);

  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="max-w-lg mx-auto px-4 pb-20">
      {/* Header */}
      <div className="flex items-center gap-3 py-5">
        <Link to="/fitness" className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-bold">Calendar</h1>
      </div>

      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold">{monthName}</h2>
        <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
        </div>
      ) : (
        <>
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div key={d} className="text-center text-xs text-slate-500 font-medium py-2">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for offset */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {/* Day cells */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateKey = formatDateKey(day);
              const summary = summaries[dateKey];
              const isToday = dateKey === today;

              return (
                <button
                  key={day}
                  onClick={() => summary && setSelectedDate(dateKey)}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center relative transition-all ${
                    summary
                      ? 'bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 cursor-pointer'
                      : 'hover:bg-white/[0.02]'
                  } ${isToday ? 'ring-1 ring-blue-500/50' : ''}`}
                >
                  <span className={`text-sm ${isToday ? 'text-blue-400 font-bold' : summary ? 'text-white font-medium' : 'text-slate-500'}`}>
                    {day}
                  </span>
                  {summary && (
                    <Dumbbell className="w-3 h-3 text-blue-400 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 justify-center">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-blue-500/20 border border-blue-500/30" />
              <span className="text-xs text-slate-500">Workout day</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm ring-1 ring-blue-500/50" />
              <span className="text-xs text-slate-500">Today</span>
            </div>
          </div>
        </>
      )}

      {/* Day detail modal */}
      {selectedDate && uid && (
        <CalendarDayDetail
          uid={uid}
          dateKey={selectedDate}
          summary={summaries[selectedDate]}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  );
}
