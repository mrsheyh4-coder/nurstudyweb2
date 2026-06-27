import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase.js';

const STATUS_COLORS = {
  yangi: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  telefon_qilindi: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  uchrashuv_belgilandi: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  qabul_qilindi: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
  rad_etildi: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
};

const STATUS_LABELS = {
  yangi: '🆕 Yangi',
  telefon_qilindi: '📞 Telefon qilindi',
  uchrashuv_belgilandi: '📅 Uchrashuv',
  qabul_qilindi: '✅ Qabul qilindi',
  rad_etildi: '❌ Rad etildi',
};

function formatDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('uz-UZ') + ' ' + d.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
}

function InfoBadge({ icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-1.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 px-3 py-1.5">
      <span className="text-base">{icon}</span>
      <div>
        <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">{label}</p>
        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{value}</p>
      </div>
    </div>
  );
}

export default function AdminApplications() {
  const [apps, setApps] = useState([]);
  const [filterStatus, setFilterStatus] = useState('hammasi');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApps();
    const sub = supabase
      .channel('applications-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'applications' }, fetchApps)
      .subscribe();
    return () => supabase.removeChannel(sub);
  }, []);

  async function fetchApps() {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setApps(data);
    setLoading(false);
  }

  async function updateStatus(id, status) {
    await supabase.from('applications').update({ status }).eq('id', id);
    setApps(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  }

  async function updateAdminNotes(id, admin_notes) {
    await supabase.from('applications').update({ admin_notes }).eq('id', id);
  }

  const counts = {
    total: apps.length,
    yangi: apps.filter(a => a.status === 'yangi').length,
    qabul: apps.filter(a => a.status === 'qabul_qilindi').length,
  };

  const filteredApps = filterStatus === 'hammasi'
    ? apps
    : apps.filter(a => (a.status || 'yangi') === filterStatus);

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-950 dark:text-white">Leadlar / Arizalar</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Saytdan ariza qoldirgan barcha foydalanuvchilar.</p>
        </div>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold shadow-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-slate-900 dark:text-white"
        >
          <option value="hammasi">📋 Hammasi</option>
          <option value="yangi">🆕 Yangi</option>
          <option value="telefon_qilindi">📞 Telefon qilindi</option>
          <option value="uchrashuv_belgilandi">📅 Uchrashuv</option>
          <option value="qabul_qilindi">✅ Qabul qilindi</option>
          <option value="rad_etildi">❌ Rad etildi</option>
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
          <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{counts.qabul}</p>
          <p className="text-xs font-bold text-emerald-500 mt-1">Qabul qilindi</p>
        </div>
      </div>

      {loading ? (
        <p className="text-slate-500">Yuklanmoqda...</p>
      ) : (
        <div className="grid gap-4">
          {filteredApps.map(app => (
            <div key={app.id} className="rounded-3xl border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900 p-5 shadow-sm">

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{app.name || '—'}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${STATUS_COLORS[app.status] || STATUS_COLORS.yangi}`}>
                      {STATUS_LABELS[app.status] || app.status}
                    </span>
                    <span className="text-xs text-slate-400 ml-auto">🕒 {formatDate(app.created_at)}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <InfoBadge icon="📞" label="Telefon" value={app.phone} />
                    <InfoBadge icon="🎂" label="Yoshi" value={app.age ? `${app.age} yosh` : null} />
                    <InfoBadge icon="📜" label="Sertifikat" value={app.certificate} />
                    <InfoBadge icon="🎓" label="Yo'nalish" value={app.direction} />
                    <InfoBadge icon="💰" label="Byudjet" value={app.budget} />
                    <InfoBadge icon="🌍" label="Davlat" value={app.country} />
                  </div>

                  {app.notes && (
                    <div className="mt-3 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800/20 px-4 py-2.5">
                      <p className="text-[10px] font-black uppercase tracking-wider text-amber-500 mb-1">💬 Mijoz izohi</p>
                      <p className="text-sm text-slate-700 dark:text-slate-300 italic">{app.notes}</p>
                    </div>
                  )}
                </div>

                <div className="shrink-0 w-full md:w-52">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Holat</label>
                  <select
                    value={app.status || 'yangi'}
                    onChange={e => updateStatus(app.id, e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold outline-none focus:border-brand-500 dark:border-white/10 dark:bg-slate-950 dark:text-white"
                  >
                    <option value="yangi">🆕 Yangi</option>
                    <option value="telefon_qilindi">📞 Telefon qilindi</option>
                    <option value="uchrashuv_belgilandi">📅 Uchrashuv belgilandi</option>
                    <option value="qabul_qilindi">✅ Qabul qilindi</option>
                    <option value="rad_etildi">❌ Rad etildi</option>
                  </select>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-white/5">
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">📝 Admin izohi (ichki)</p>
                <textarea
                  defaultValue={app.admin_notes || ''}
                  onBlur={e => updateAdminNotes(app.id, e.target.value)}
                  placeholder="Masalan: ertaga soat 10 da qo'ng'iroq qilish..."
                  className="w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-slate-950 dark:text-white"
                  rows={2}
                />
              </div>
            </div>
          ))}

          {filteredApps.length === 0 && (
            <div className="text-center py-16 rounded-3xl border border-dashed border-slate-200 dark:border-white/10">
              <p className="text-slate-500 font-medium">
                {filterStatus === 'hammasi' ? "Hozircha hech qanday ariza yo'q." : "Bu filtrdagi ariza yo'q."}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
