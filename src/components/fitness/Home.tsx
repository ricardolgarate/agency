import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import {
  collection, doc, getDocs, getDoc, setDoc, query, orderBy
} from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import {
  Dumbbell, Plus, Pencil, Calendar, Settings as SettingsIcon,
  Loader2, LogOut, ChevronRight
} from 'lucide-react';
import { signOut } from 'firebase/auth';
import DayEditor from './DayEditor';

interface Day {
  id: string;
  name: string;
  orderIndex: number;
  isDeleted: boolean;
}

export default function Home() {
  const [uid, setUid] = useState<string | null>(null);
  const [days, setDays] = useState<Day[]>([]);
  const [restDays, setRestDays] = useState(2);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [showAddDay, setShowAddDay] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) setUid(user.uid);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!uid) return;
    loadData();
  }, [uid]);

  const loadData = async () => {
    if (!uid) return;
    setLoading(true);

    // Load user profile
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const data = userSnap.data();
      if (data.restDaysPerWeek) setRestDays(data.restDaysPerWeek);
    } else {
      await setDoc(userRef, {
        unitPreference: 'lb',
        restDaysPerWeek: 2,
        defaultRestTimerSeconds: 120,
        createdAt: new Date()
      });
    }

    // Load days
    const daysRef = collection(db, 'users', uid, 'days');
    const q = query(daysRef, orderBy('orderIndex', 'asc'));
    const snap = await getDocs(q);
    const loaded: Day[] = [];
    snap.forEach((d) => {
      const data = d.data();
      if (!data.isDeleted) {
        loaded.push({ id: d.id, name: data.name, orderIndex: data.orderIndex, isDeleted: false });
      }
    });
    setDays(loaded);
    setLoading(false);
  };

  const handleRestDayChange = async (val: number) => {
    setRestDays(val);
    if (uid) {
      await setDoc(doc(db, 'users', uid), { restDaysPerWeek: val }, { merge: true });
    }
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
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <Dumbbell className="w-5 h-5 text-blue-400" />
          </div>
          <h1 className="text-xl font-bold">Lift Tracker</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/fitness/calendar"
            className="p-2.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
          >
            <Calendar className="w-5 h-5" />
          </Link>
          <Link
            to="/fitness/settings"
            className="p-2.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
          >
            <SettingsIcon className="w-5 h-5" />
          </Link>
          <button
            onClick={() => signOut(auth)}
            className="p-2.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Rest Days Selector */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 mb-6">
        <p className="text-sm text-slate-400 mb-3">Rest days per week</p>
        <div className="flex gap-2">
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              onClick={() => handleRestDayChange(n)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                restDays === n
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/[0.04] text-slate-400 hover:bg-white/[0.08]'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Days Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Your Days</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setEditMode(!editMode)}
            className={`p-2 rounded-lg transition-colors ${
              editMode
                ? 'bg-blue-500/20 text-blue-400'
                : 'hover:bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowAddDay(true)}
            className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Days List */}
      {days.length === 0 ? (
        <button
          onClick={() => setShowAddDay(true)}
          className="w-full py-16 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center gap-3 text-slate-500 hover:text-slate-300 hover:border-white/20 transition-all"
        >
          <Plus className="w-8 h-8" />
          <span className="font-medium">Create your first Day</span>
        </button>
      ) : (
        <div className="space-y-3">
          {days.map((day) => (
            <DayCard
              key={day.id}
              day={day}
              editMode={editMode}
              uid={uid!}
              days={days}
              onRefresh={loadData}
            />
          ))}
        </div>
      )}

      {/* Add Day Modal */}
      {showAddDay && uid && (
        <DayEditor
          uid={uid}
          nextIndex={days.length}
          onClose={() => setShowAddDay(false)}
          onSaved={loadData}
        />
      )}
    </div>
  );
}

function DayCard({
  day,
  editMode,
  uid,
  days,
  onRefresh
}: {
  day: Day;
  editMode: boolean;
  uid: string;
  days: Day[];
  onRefresh: () => void;
}) {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Delete "${day.name}"? Workout logs will be kept.`)) return;
    const ref = doc(db, 'users', uid, 'days', day.id);
    await setDoc(ref, { isDeleted: true, updatedAt: new Date() }, { merge: true });
    onRefresh();
  };

  const handleMove = async (direction: 'up' | 'down') => {
    const idx = days.findIndex((d) => d.id === day.id);
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= days.length) return;

    const other = days[swapIdx];
    await setDoc(doc(db, 'users', uid, 'days', day.id), { orderIndex: other.orderIndex }, { merge: true });
    await setDoc(doc(db, 'users', uid, 'days', other.id), { orderIndex: day.orderIndex }, { merge: true });
    onRefresh();
  };

  return (
    <>
      <div
        onClick={() => !editMode && navigate(`/fitness/day/${day.id}`)}
        className={`flex items-center justify-between bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 transition-all ${
          editMode ? '' : 'cursor-pointer hover:bg-white/[0.04] hover:border-white/[0.1] active:scale-[0.98]'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
            {day.name.charAt(0).toUpperCase()}
          </div>
          <span className="font-medium">{day.name}</span>
        </div>

        {editMode ? (
          <div className="flex items-center gap-1">
            <button onClick={() => handleMove('up')} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5">↑</button>
            <button onClick={() => handleMove('down')} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5">↓</button>
            <button onClick={() => setEditing(true)} className="p-2 text-slate-400 hover:text-blue-400 rounded-lg hover:bg-white/5">
              <Pencil className="w-4 h-4" />
            </button>
            <button onClick={handleDelete} className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-white/5 text-sm">✕</button>
          </div>
        ) : (
          <ChevronRight className="w-5 h-5 text-slate-600" />
        )}
      </div>

      {editing && (
        <DayEditor
          uid={uid}
          existingDay={day}
          nextIndex={days.length}
          onClose={() => setEditing(false)}
          onSaved={onRefresh}
        />
      )}
    </>
  );
}
