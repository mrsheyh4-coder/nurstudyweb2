import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase.js';

const STATUS_COLORS = {
  yangi:               'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  murojaat_qilindi:    'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  aktiv:               'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
  arxivlandi:          'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
};

const STATUS_LABELS = {
  yangi:            '🆕 Yangi',
  murojaat_qilindi: '📞 Murojaat qilindi',
  aktiv:            '✅ Aktiv',
  arxivlandi:       '📦 Arxivlandi',
};

function formatDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('uz-UZ') + ' ' + d.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
}

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('hammasi');

  useEffect(() => {
    fetchUsers();
    const sub = supabase
      .channel('profiles-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, fetchUsers)
      .subscribe();
    return () => supabase.removeChannel(sub);
  }, []);

  async function fetchUsers() {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setUsers(data);
    setLoading(false);
  }

  async function updateStatus(id, status) {
    await supabase.from('profiles').update({ status }).eq('id', id);
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status } : u));
  }

  async function updateAdminNotes(id, admin_notes) {
    await supabase.from('profiles').update({ admin_notes }).eq('id', id);
  }

  const filteredUsers = filterStatus === 'hammasi'
    ? users
    : users.filter(u => (u.status || 'yangi') === filterStatus);

  const counts = {
    total: users.length,
    yangi: users.filter(u => !u.status || u.status === 'yangi').length,
    aktiv: users.filter(u => u.status === 'aktiv').length,
  };

  return (
    <div className="animate-fade-in">

      {/* Header + Filter */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-950 dark:text-white">Ro'yxatdan o'tganlar</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Saytda ro'yxatdan o'tgan barcha foydalanuvchilar.</p>
        </div>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold shadow-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-slate-900 dark:text-white"
        >
          <option value="hammasi">📋 Hammasi</option>
          <option value="yangi">🆕 Yangi</option>
          <option value="murojaat_qilindi">📞 Murojaat qilindi</option>
          <option value="aktiv">✅ Aktiv</option>
          <option value="arxivlandi">📦 Arxivlandi</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="rounded-2xl bg-white border border-slate-200 dark:border-white/10 dark:bg-slate-900 p-4 text-center shadow-sm">
          <p className="text-3xl font-black text-slate-900 dark:text-white">{counts.total}</p>
          <p className="text-xs font-bold text-slate-500 mt-1">Jami</p>
        </div>
        <div className="rounded-2xl bg-blue-50 border border-blue-100 dark:bg-blue-900/20 dark:border-blue-800/30 p-4 text-center shadow-sm">
          <p className="text-3xl font-black text-blue-600 dark:text-blue-400">{counts.yangi}</p>
          <p className="text-xs font-bold text-blue-500 mt-1">Yangi</p>
        </div>
        <div className="rounded-2xl bg-emerald-50 border border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800/30 p-4 text-center shadow-sm">
          <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{counts.aktiv}</p>
          <p className="text-xs font-bold text-emerald-500 mt-1">Aktiv</p>
        </div>
      </div>

      {loading ? (
        <p className="text-slate-500">Yuklanmoqda...</p>
      ) : (
        <div className="grid gap-4">
          {filteredUsers.map(user => (
            <div key={user.id} className="rounded-3xl border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900 p-5 shadow-sm">

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-white font-black text-lg">
                      {(user.first_name || '?')[0].toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {user.first_name || ''} {user.last_name || ''}
                        {!user.first_name && !user.last_name && <span className="text-slate-400">Nomsiz</span>}
                      </h3>
                      <p className="text-xs text-slate-400">🕒 {formatDate(user.created_at)}</p>
                    </div>
                    <span className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-bold ${STATUS_COLORS[user.status] || STATUS_COLORS.yangi}`}>
                      {STATUS_LABELS[user.status] || '🆕 Yangi'}
                    </span>
                  </div>

                  {user.phone && (
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      📞 {user.phone}
                    </p>
                  )}
                </div>

                {/* Status dropdown */}
                <div className="shrink-0 w-full md:w-52">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Holat</label>
                  <select
                    value={user.status || 'yangi'}
                    onChange={e => updateStatus(user.id, e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold outline-none focus:border-brand-500 dark:border-white/10 dark:bg-slate-950 dark:text-white"
                  >
                    <option value="yangi">🆕 Yangi</option>
                    <option value="murojaat_qilindi">📞 Murojaat qilindi</option>
                    <option value="aktiv">✅ Aktiv</option>
                    <option value="arxivlandi">📦 Arxivlandi</option>
                  </select>
                </div>
              </div>

              {/* Admin notes */}
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-white/5">
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">📝 Admin izohi (ichki)</p>
                <textarea
                  defaultValue={user.admin_notes || ''}
                  onBlur={e => updateAdminNotes(user.id, e.target.value)}
                  placeholder="Foydalanuvchi haqida izoh..."
                  className="w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-slate-950 dark:text-white"
                  rows={2}
                />
              </div>
            </div>
          ))}

          {filteredUsers.length === 0 && (
            <div className="text-center py-16 rounded-3xl border border-dashed border-slate-200 dark:border-white/10">
              <p className="text-slate-500 font-medium">
                {filterStatus === 'hammasi' ? "Hozircha hech kim ro'yxatdan o'tmagan." : "Bu filtrdagi foydalanuvchi yo'q."}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
