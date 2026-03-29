"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { MousePointerClick, RefreshCw, TrendingUp, Copy, Calendar, Award } from "lucide-react";
import { toast } from "sonner";

interface PromoClick {
  firm_slug: string;
  discount_code: string;
  page_path: string;
  created_at: string;
}

export default function AdminPromoAnalyticsPage() {
  const [clicks, setClicks] = useState<PromoClick[]>([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState<"7d" | "30d" | "all">("30d");

  useEffect(() => { fetchClicks(); }, [range]);

  async function fetchClicks() {
    setLoading(true);
    let query = supabase.from("promo_clicks").select("*").order("created_at", { ascending: false });

    if (range !== "all") {
      const days = range === "7d" ? 7 : 30;
      const since = new Date(Date.now() - days * 86400000).toISOString();
      query = query.gte("created_at", since);
    }

    const { data, error } = await query.limit(10000);
    if (error) toast.error("Failed to load promo data. Did you create the promo_clicks table?");
    setClicks((data || []) as PromoClick[]);
    setLoading(false);
  }

  // Aggregate by firm
  const firmAgg: Record<string, { code: string; total: number; last7d: number }> = {};
  const sevenDaysAgo = Date.now() - 7 * 86400000;

  clicks.forEach(c => {
    if (!firmAgg[c.firm_slug]) firmAgg[c.firm_slug] = { code: c.discount_code || "—", total: 0, last7d: 0 };
    firmAgg[c.firm_slug].total++;
    if (new Date(c.created_at).getTime() > sevenDaysAgo) firmAgg[c.firm_slug].last7d++;
    if (c.discount_code) firmAgg[c.firm_slug].code = c.discount_code;
  });

  const firmRanking = Object.entries(firmAgg).sort((a, b) => b[1].total - a[1].total);
  const maxClicks = firmRanking.length > 0 ? firmRanking[0][1].total : 1;

  // Daily trend
  const dailyCounts: Record<string, number> = {};
  const chartDays = range === "7d" ? 7 : 30;
  for (let i = chartDays - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000).toISOString().split("T")[0];
    dailyCounts[d] = 0;
  }
  clicks.forEach(c => {
    const d = c.created_at.split("T")[0];
    if (dailyCounts[d] !== undefined) dailyCounts[d]++;
  });
  const chartData = Object.entries(dailyCounts);
  const maxDaily = Math.max(...chartData.map(d => d[1]), 1);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white mb-2 flex items-center gap-3">
            <MousePointerClick className="w-8 h-8 text-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
            Promo Code Analytics
          </h1>
          <p className="text-neutral-400">Track which discount codes get the most engagement across all firm pages.</p>
        </div>
        <div className="flex items-center gap-3">
          {(["7d", "30d", "all"] as const).map(r => (
            <button key={r} onClick={() => setRange(r)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${
                range === r ? "bg-orange-500/20 text-orange-400 border border-orange-500/30" : "bg-white/5 text-neutral-500 border border-white/10 hover:text-white"
              }`}
            >{r === "all" ? "All Time" : r === "7d" ? "7 Days" : "30 Days"}</button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><RefreshCw className="w-10 h-10 text-orange-500 animate-spin" /></div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-400 border border-orange-500/20">
                  <Copy className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Total Code Copies</p>
                  <p className="text-4xl font-black text-white mt-1">{clicks.length.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/20">
                  <Award className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Unique Firms Tracked</p>
                  <p className="text-4xl font-black text-white mt-1">{firmRanking.length}</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Top Performer</p>
                  <p className="text-2xl font-black text-white mt-1 truncate">{firmRanking[0]?.[0] || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Chart */}
          <div className="rounded-3xl border border-white/10 bg-[#0c0c12]/80 p-8 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-500" /> Daily Promo Clicks
            </h3>
            <div className="flex items-end gap-1 h-40">
              {chartData.map(([date, count]) => (
                <div key={date} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity font-mono">{count}</span>
                  <div
                    className="w-full bg-gradient-to-t from-orange-600 to-amber-400 rounded-t-lg transition-all duration-500 hover:from-orange-500 hover:to-amber-300 min-h-[2px]"
                    style={{ height: `${Math.max((count / maxDaily) * 100, 2)}%` }}
                  />
                  <span className="text-[9px] text-neutral-600 font-mono truncate w-full text-center">{date.slice(5)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Firm Ranking Table */}
          <div className="rounded-3xl border border-white/10 bg-[#0c0c12]/80 p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-orange-500" /> Firm Promo Leaderboard
            </h3>
            {firmRanking.length === 0 ? (
              <div className="text-center py-16 text-neutral-500">
                <MousePointerClick className="w-16 h-16 text-white/10 mx-auto mb-4" />
                <p className="font-bold text-white text-lg mb-2">No promo clicks recorded yet</p>
                <p>When users copy discount codes on firm pages, their clicks will appear here.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {firmRanking.map(([slug, data], i) => (
                  <div key={slug} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
                    <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm border ${
                      i === 0 ? "bg-amber-500/20 text-amber-400 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]" :
                      i === 1 ? "bg-neutral-300/10 text-neutral-300 border-neutral-400/20" :
                      i === 2 ? "bg-orange-800/20 text-orange-400 border-orange-800/30" :
                      "bg-white/5 text-neutral-500 border-white/10"
                    }`}>#{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-bold">{slug}</p>
                      <p className="text-xs text-neutral-500 font-mono">Code: <span className="text-orange-400">{data.code}</span></p>
                    </div>
                    {/* Bar */}
                    <div className="hidden md:block w-48">
                      <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-orange-600 to-amber-400 rounded-full transition-all duration-700" style={{ width: `${(data.total / maxClicks) * 100}%` }} />
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-white font-black text-lg">{data.total}</p>
                      <p className="text-xs text-neutral-500">clicks</p>
                    </div>
                    <div className="text-right shrink-0 hidden sm:block">
                      <p className="text-emerald-400 font-bold text-sm">{data.last7d}</p>
                      <p className="text-xs text-neutral-600">last 7d</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
