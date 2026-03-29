"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { BarChart3, RefreshCw, Eye, TrendingUp, Globe, Calendar, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";

interface PageViewRow {
  page_path: string;
  firm_slug: string | null;
  created_at: string;
}

export default function AdminAnalyticsPage() {
  const [views, setViews] = useState<PageViewRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState<"7d" | "30d" | "all">("7d");

  useEffect(() => { fetchViews(); }, [range]);

  async function fetchViews() {
    setLoading(true);
    let query = supabase.from("page_views").select("page_path, firm_slug, created_at").order("created_at", { ascending: false });

    if (range !== "all") {
      const days = range === "7d" ? 7 : 30;
      const since = new Date(Date.now() - days * 86400000).toISOString();
      query = query.gte("created_at", since);
    }

    const { data, error } = await query.limit(10000);
    if (error) {
      toast.error("Failed to load analytics. Did you create the page_views table?");
    }
    setViews((data || []) as PageViewRow[]);
    setLoading(false);
  }

  // Aggregate metrics
  const totalViews = views.length;
  const today = new Date().toISOString().split("T")[0];
  const viewsToday = views.filter(v => v.created_at.startsWith(today)).length;

  // Top pages
  const pageCounts: Record<string, number> = {};
  views.forEach(v => { pageCounts[v.page_path] = (pageCounts[v.page_path] || 0) + 1; });
  const topPages = Object.entries(pageCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);

  // Top firms
  const firmCounts: Record<string, number> = {};
  views.filter(v => v.firm_slug).forEach(v => { firmCounts[v.firm_slug!] = (firmCounts[v.firm_slug!] || 0) + 1; });
  const topFirms = Object.entries(firmCounts).sort((a, b) => b[1] - a[1]).slice(0, 8);

  // Daily chart data (last 7 or 30 days)
  const dailyCounts: Record<string, number> = {};
  const chartDays = range === "7d" ? 7 : range === "30d" ? 30 : 30;
  for (let i = chartDays - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000).toISOString().split("T")[0];
    dailyCounts[d] = 0;
  }
  views.forEach(v => {
    const d = v.created_at.split("T")[0];
    if (dailyCounts[d] !== undefined) dailyCounts[d]++;
  });
  const chartData = Object.entries(dailyCounts);
  const maxDaily = Math.max(...chartData.map(d => d[1]), 1);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white mb-2 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
            Traffic Analytics
          </h1>
          <p className="text-neutral-400">Self-hosted page view tracking. No external dependencies.</p>
        </div>
        <div className="flex items-center gap-3">
          {(["7d", "30d", "all"] as const).map(r => (
            <button key={r} onClick={() => setRange(r)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${
                range === r ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "bg-white/5 text-neutral-500 border border-white/10 hover:text-white"
              }`}
            >{r === "all" ? "All Time" : r === "7d" ? "7 Days" : "30 Days"}</button>
          ))}
          <button onClick={fetchViews} disabled={loading} className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all">
            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><RefreshCw className="w-10 h-10 text-blue-500 animate-spin" /></div>
      ) : (
        <>
          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { label: "Total Page Views", value: totalViews, icon: Eye, color: "blue" },
              { label: "Views Today", value: viewsToday, icon: TrendingUp, color: "emerald" },
              { label: "Unique Pages Hit", value: Object.keys(pageCounts).length, icon: Globe, color: "purple" },
            ].map(card => (
              <div key={card.label} className={`rounded-2xl border border-${card.color}-500/20 bg-${card.color}-500/5 p-6 shadow-xl`}>
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-${card.color}-500/10 flex items-center justify-center text-${card.color}-400 border border-${card.color}-500/20`}>
                    <card.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest">{card.label}</p>
                    <p className="text-4xl font-black text-white mt-1">{card.value.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Daily Chart */}
          <div className="rounded-3xl border border-white/10 bg-[#0c0c12]/80 p-8 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" /> Daily Traffic
            </h3>
            <div className="flex items-end gap-1 h-48">
              {chartData.map(([date, count]) => (
                <div key={date} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity font-mono">{count}</span>
                  <div
                    className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-500 hover:from-blue-500 hover:to-blue-300 min-h-[2px]"
                    style={{ height: `${Math.max((count / maxDaily) * 100, 2)}%` }}
                  />
                  <span className="text-[9px] text-neutral-600 font-mono truncate w-full text-center">{date.slice(5)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Two Column: Top Pages & Top Firms */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-3xl border border-white/10 bg-[#0c0c12]/80 p-6 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-500" /> Top Pages
              </h3>
              <div className="space-y-3">
                {topPages.length === 0 ? (
                  <p className="text-neutral-500 text-center py-10">No page views recorded yet.</p>
                ) : topPages.map(([path, count], i) => (
                  <div key={path} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                    <span className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-black text-sm border border-blue-500/20">#{i+1}</span>
                    <span className="flex-1 text-white text-sm font-medium truncate font-mono">{path}</span>
                    <span className="text-neutral-400 text-sm font-bold">{count} views</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#0c0c12]/80 p-6 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-500" /> Top Firm Pages
              </h3>
              <div className="space-y-3">
                {topFirms.length === 0 ? (
                  <p className="text-neutral-500 text-center py-10">No firm page views recorded yet.</p>
                ) : topFirms.map(([slug, count], i) => (
                  <div key={slug} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                    <span className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-black text-sm border border-emerald-500/20">#{i+1}</span>
                    <span className="flex-1 text-white text-sm font-bold">{slug}</span>
                    <span className="text-neutral-400 text-sm font-bold">{count} views</span>
                    <ArrowUpRight className="w-4 h-4 text-neutral-600" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
