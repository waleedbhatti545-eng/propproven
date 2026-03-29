"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { Mail, RefreshCw, Search, Download, UserPlus, UserMinus, CheckCircle2, XCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Subscriber {
  id: string;
  email: string;
  source: string;
  status: string;
  subscribed_at: string;
}

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | "Active" | "Unsubscribed">("All");

  useEffect(() => { fetchSubscribers(); }, []);

  async function fetchSubscribers() {
    setLoading(true);
    const { data, error } = await supabase
      .from("subscribers")
      .select("*")
      .order("subscribed_at", { ascending: false });

    if (error) toast.error("Failed to load subscribers. Did you create the table?");
    setSubscribers((data || []) as Subscriber[]);
    setLoading(false);
  }

  async function toggleStatus(id: string, currentStatus: string) {
    const newStatus = currentStatus === "Active" ? "Unsubscribed" : "Active";
    const { error } = await supabase.from("subscribers").update({ status: newStatus }).eq("id", id);
    if (error) { toast.error("Failed to update"); return; }
    setSubscribers(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
    toast.success(`Subscriber ${newStatus === "Active" ? "reactivated" : "unsubscribed"}`);
  }

  async function deleteSubscriber(id: string) {
    const { error } = await supabase.from("subscribers").delete().eq("id", id);
    if (error) { toast.error("Failed to delete"); return; }
    setSubscribers(prev => prev.filter(s => s.id !== id));
    toast.success("Subscriber removed permanently");
  }

  function exportCSV() {
    const activeEmails = subscribers.filter(s => s.status === "Active");
    const csv = "Email,Source,Date\n" + activeEmails.map(s => `${s.email},${s.source},${s.subscribed_at}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "propproven-subscribers.csv"; a.click();
    toast.success(`Exported ${activeEmails.length} active subscribers`);
  }

  const filtered = subscribers.filter(s => {
    const matchFilter = filter === "All" || s.status === filter;
    const matchSearch = !search.trim() || s.email.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const activeCount = subscribers.filter(s => s.status === "Active").length;
  const unsubCount = subscribers.filter(s => s.status === "Unsubscribed").length;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white mb-2 flex items-center gap-3">
            <Mail className="w-8 h-8 text-violet-500 drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]" />
            Subscriber Management
          </h1>
          <p className="text-neutral-400">Manage your newsletter list. Export emails for campaigns.</p>
        </div>
        <button onClick={exportCSV} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 font-bold text-white hover:scale-[1.02] transition-all shadow-lg shadow-violet-500/20">
          <Download className="w-5 h-5" /> Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total", value: subscribers.length, color: "white" },
          { label: "Active", value: activeCount, color: "emerald" },
          { label: "Unsubscribed", value: unsubCount, color: "red" },
        ].map(s => (
          <div key={s.label} className={`rounded-2xl border border-${s.color === "white" ? "white" : s.color + "-500"}/20 bg-${s.color === "white" ? "white" : s.color + "-500"}/5 p-5 text-center`}>
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest">{s.label}</p>
            <p className={`text-3xl font-black text-${s.color === "white" ? "white" : s.color + "-400"} mt-1`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          {(["All", "Active", "Unsubscribed"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${
              filter === f ? "bg-violet-500/20 text-violet-400 border border-violet-500/30" : "bg-white/5 text-neutral-500 border border-white/10 hover:text-white"
            }`}>{f}</button>
          ))}
        </div>
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search email..."
            className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white text-sm placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
          />
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-20"><RefreshCw className="w-10 h-10 text-violet-500 animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-white/10 rounded-3xl">
          <Mail className="w-16 h-16 text-white/10 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Subscribers</h3>
          <p className="text-neutral-500">Subscribers will appear here when users sign up via the newsletter form.</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="text-left px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-widest">Email</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-widest">Source</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-widest">Status</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-widest">Date</th>
                <th className="text-right px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(sub => (
                <tr key={sub.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">{sub.email}</td>
                  <td className="px-6 py-4 text-neutral-400 text-sm">{sub.source}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${
                      sub.status === "Active" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}>
                      {sub.status === "Active" ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-500 text-sm font-mono">{new Date(sub.subscribed_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => toggleStatus(sub.id, sub.status)} className={`p-2 rounded-lg transition-all ${
                        sub.status === "Active" ? "bg-red-500/10 text-red-400 hover:bg-red-500/20" : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                      }`}>{sub.status === "Active" ? <UserMinus className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}</button>
                      <button onClick={() => deleteSubscriber(sub.id)} className="p-2 rounded-lg bg-red-900/30 text-red-500 hover:bg-red-500/20 transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
