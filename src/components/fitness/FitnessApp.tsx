import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import DayDashboard from './DayDashboard';
import CalendarView from './CalendarView';
import Settings from './Settings';

export default function FitnessApp() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Routes>
        <Route index element={<Home />} />
        <Route path="day/:dayId" element={<DayDashboard />} />
        <Route path="calendar" element={<CalendarView />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/fitness" replace />} />
      </Routes>
    </div>
  );
}
