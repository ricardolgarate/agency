import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { collection, getDocs, orderBy, query, Timestamp } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { LogOut, Loader2, Users, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  budget: string;
  authority: string;
  need: string;
  timeline: string;
  qualified: boolean;
  createdAt: Timestamp | null;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchLeads = async () => {
    setLoading(true);
    setError('');
    try {
      const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as Lead[];
      setLeads(data);
    } catch (err) {
      console.error('Error fetching leads:', err);
      setError('Failed to load leads. Check Firestore rules.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin', { replace: true });
  };

  const formatDate = (timestamp: Timestamp | null) => {
    if (!timestamp) return '—';
    const date = timestamp.toDate();
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatBudget = (budget: string) => {
    const map: Record<string, string> = {
      'under-500': '< $500',
      '500-1000': '$500–$1K',
      '1000-2000': '$1K–$2K',
      '2000-plus': '$2K+'
    };
    return map[budget] || budget;
  };

  const formatAuthority = (authority: string) => {
    const map: Record<string, string> = {
      'yes': 'Decision maker',
      'shared': 'Shared',
      'need-approval': 'Needs approval'
    };
    return map[authority] || authority;
  };

  const formatTimeline = (timeline: string) => {
    const map: Record<string, string> = {
      'immediately': 'ASAP',
      'this-month': 'This month',
      'next-month': 'Next month',
      'just-exploring': 'Exploring'
    };
    return map[timeline] || timeline;
  };

  const qualifiedCount = leads.filter((l) => l.qualified).length;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="border-b border-white/[0.06] bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <a href="/">
                <img src="/logo.png" alt="Carter Studios" className="h-9 w-auto" />
              </a>
              <span className="text-slate-600 text-sm hidden sm:inline">/</span>
              <span className="text-slate-400 text-sm font-medium hidden sm:inline">Admin</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Leads</h1>
            <p className="text-slate-500 text-sm mt-1">
              All form submissions from the landing page
            </p>
          </div>
          <button
            onClick={fetchLeads}
            disabled={loading}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white px-4 py-2.5 rounded-lg border border-white/[0.08] hover:bg-white/5 transition-all disabled:opacity-50 self-start"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-4 h-4 text-slate-500" />
              <span className="text-slate-500 text-xs uppercase tracking-wider font-medium">Total</span>
            </div>
            <span className="text-2xl font-bold text-white">{leads.length}</span>
          </div>
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span className="text-slate-500 text-xs uppercase tracking-wider font-medium">Qualified</span>
            </div>
            <span className="text-2xl font-bold text-white">{qualifiedCount}</span>
          </div>
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 col-span-2 sm:col-span-1">
            <div className="flex items-center gap-3 mb-2">
              <XCircle className="w-4 h-4 text-slate-500" />
              <span className="text-slate-500 text-xs uppercase tracking-wider font-medium">Unqualified</span>
            </div>
            <span className="text-2xl font-bold text-white">{leads.length - qualifiedCount}</span>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-5 py-4 mb-6">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && leads.length === 0 && (
          <div className="text-center py-20">
            <Users className="w-12 h-12 text-slate-700 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">No leads yet</p>
            <p className="text-slate-600 text-sm mt-1">Submissions will appear here</p>
          </div>
        )}

        {/* Table */}
        {!loading && leads.length > 0 && (
          <div className="border border-white/[0.06] rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                    <th className="text-left px-4 py-3 text-slate-500 font-medium text-xs uppercase tracking-wider">Status</th>
                    <th className="text-left px-4 py-3 text-slate-500 font-medium text-xs uppercase tracking-wider">Name</th>
                    <th className="text-left px-4 py-3 text-slate-500 font-medium text-xs uppercase tracking-wider">Email</th>
                    <th className="text-left px-4 py-3 text-slate-500 font-medium text-xs uppercase tracking-wider">Company</th>
                    <th className="text-left px-4 py-3 text-slate-500 font-medium text-xs uppercase tracking-wider">Budget</th>
                    <th className="text-left px-4 py-3 text-slate-500 font-medium text-xs uppercase tracking-wider">Authority</th>
                    <th className="text-left px-4 py-3 text-slate-500 font-medium text-xs uppercase tracking-wider">Need</th>
                    <th className="text-left px-4 py-3 text-slate-500 font-medium text-xs uppercase tracking-wider">Timeline</th>
                    <th className="text-left px-4 py-3 text-slate-500 font-medium text-xs uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-4 py-3.5">
                        {lead.qualified ? (
                          <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 text-xs font-medium px-2.5 py-1 rounded-full">
                            <CheckCircle className="w-3 h-3" />
                            Qualified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 bg-slate-500/10 text-slate-400 text-xs font-medium px-2.5 py-1 rounded-full">
                            <XCircle className="w-3 h-3" />
                            Unqualified
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-white font-medium whitespace-nowrap">{lead.name}</td>
                      <td className="px-4 py-3.5 text-slate-400 whitespace-nowrap">
                        <a href={`mailto:${lead.email}`} className="hover:text-blue-400 transition-colors">
                          {lead.email}
                        </a>
                      </td>
                      <td className="px-4 py-3.5 text-slate-400 whitespace-nowrap">{lead.company || '—'}</td>
                      <td className="px-4 py-3.5 text-slate-400 whitespace-nowrap">{formatBudget(lead.budget)}</td>
                      <td className="px-4 py-3.5 text-slate-400 whitespace-nowrap">{formatAuthority(lead.authority)}</td>
                      <td className="px-4 py-3.5 text-slate-400 whitespace-nowrap capitalize">{lead.need?.replace(/-/g, ' ') || '—'}</td>
                      <td className="px-4 py-3.5 text-slate-400 whitespace-nowrap">{formatTimeline(lead.timeline)}</td>
                      <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap text-xs">{formatDate(lead.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
