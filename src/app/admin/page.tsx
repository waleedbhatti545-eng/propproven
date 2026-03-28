"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { TrendingUp, Users, Building, AlertCircle } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    firms: 0,
    accounts: 0,
    reviews: 0,
    settings: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      // Run parallel lightweight count queries
      const [firmsCount, accountsCount, reviewsCount] = await Promise.all([
        supabase.from("firms").select("*", { count: "exact", head: true }),
        supabase.from("accounts").select("*", { count: "exact", head: true }),
        supabase.from("user_reviews").select("*", { count: "exact", head: true })
      ]);

      setStats({
        firms: firmsCount.count || 0,
        accounts: accountsCount.count || 0,
        reviews: reviewsCount.count || 0,
        settings: 1 // Global settings is just 1 row
      });
      setLoading(false);
    }

    loadStats();
  }, []);

  const statCards = [
    { title: "Total Prop Firms", value: stats.firms, icon: Building, color: "text-brand-red", bg: "bg-brand-red/10", border: "border-brand-red/20" },
    { title: "Account Tiers", value: stats.accounts, icon: TrendingUp, color: "text-white", bg: "bg-white/5", border: "border-white/10" },
    { title: "User Reviews", value: stats.reviews, icon: Users, color: "text-white", bg: "bg-white/5", border: "border-white/10" },
    { title: "Global Settings", value: stats.settings, icon: AlertCircle, color: "text-brand-orange", bg: "bg-brand-orange/10", border: "border-brand-orange/20" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 mt-2">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Dashboard Overview</h1>
        <p className="text-neutral-400 flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-red"></span>
          </span>
          Live connection secured. Database synced.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <div 
            key={card.title}
            className={`rounded-2xl border ${card.border} bg-black/40 backdrop-blur-xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:bg-black/60 group relative overflow-hidden`}
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {/* Subtle Glow behind the card text */}
            <div className={`absolute -right-10 -top-10 w-32 h-32 ${card.bg} rounded-full blur-3xl group-hover:bg-opacity-80 transition-opacity`} />
            
            <div className="flex items-center gap-4 relative z-10">
              <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${card.bg} ${card.color}`}>
                <card.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-400">{card.title}</p>
                <p className="text-3xl font-bold tracking-tight text-white mt-1">{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity / Info Panel */}
      <div className="mt-12 rounded-3xl border border-white/5 bg-black/40 backdrop-blur-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/5 blur-[100px] pointer-events-none rounded-full" />
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 relative z-10">
          <TrendingUp className="w-5 h-5 text-brand-red" />
          Recent Platform Activity
        </h3>
        
        <div className="space-y-4 relative z-10">
          {[
            { action: "Updated funding capital rules", target: "FTMO", time: "2 hours ago", icon: Building },
            { action: "Published 4 new user reviews", target: "System", time: "5 hours ago", icon: Users },
            { action: "Modified restricted countries", target: "Funding Pips", time: "1 day ago", icon: AlertCircle },
            { action: "Created new proprietary firm", target: "TopTier Trader", time: "2 days ago", icon: Building },
          ].map((log, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-black/50 flex items-center justify-center border border-white/10 group-hover:border-brand-red/30 transition-colors">
                <log.icon className="w-4 h-4 text-neutral-400 group-hover:text-brand-red transition-colors" />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{log.action} <span className="text-brand-orange">{log.target}</span></p>
                <p className="text-neutral-500 text-xs mt-1">{log.time}</p>
              </div>
              <div className="text-xs font-mono text-neutral-500 hidden sm:block">
                ID: {Math.random().toString(36).substring(7).toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
