"use client";

import { useFirmOwner } from "@/components/propfirm/FirmOwnerContext";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { Building2, Layers, Ticket, Eye, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function DashboardOverview() {
  const { firmData, firmSlug } = useFirmOwner();
  const [accountCount, setAccountCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firmSlug) return;
    (async () => {
      const { count } = await supabase
        .from("accounts")
        .select("*", { count: "exact", head: true })
        .eq("firm_slug", firmSlug);
      setAccountCount(count || 0);
      setLoading(false);
    })();
  }, [firmSlug]);

  if (!firmData) return null;

  // Profile completion metric
  const requiredFields = ["logo", "shortDesc", "description", "location", "countryCode", "maxFunding", "profitSplit", "platformNames", "instruments"];
  const filledFields = requiredFields.filter(f => {
    const val = firmData[f];
    if (Array.isArray(val)) return val.length > 0;
    return val && val.toString().trim() !== "";
  });
  const completionPct = Math.round((filledFields.length / requiredFields.length) * 100);

  const hasPromo = !!firmData.discountCode;
  const isDraft = firmData.on_platform_status !== "Live";

  const metricCards = [
    { label: "Listed Challenges", value: accountCount, icon: Layers, color: "text-cyan-400" },
    { label: "Active Promos", value: hasPromo ? 1 : 0, icon: Ticket, color: "text-amber-400" },
    { label: "Profile Score", value: `${completionPct}%`, icon: TrendingUp, color: "text-emerald-400" },
    { label: "Firm Rating", value: firmData.rating || "N/A", icon: Eye, color: "text-brand-orange" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
          <Building2 className="w-8 h-8 text-brand-red" />
          Welcome back, {firmData.name}
        </h1>
        <p className="text-neutral-400">Manage your listing, challenges, and offers from this central control panel.</p>
      </div>

      {/* Status Banner */}
      {isDraft && (
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-amber-400/5 border border-amber-400/20">
          <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0" />
          <div>
            <p className="text-amber-400 font-bold text-sm">Your firm is in DRAFT mode</p>
            <p className="text-neutral-500 text-xs mt-0.5">Complete your profile to at least 80% to request a Live listing on PropProven.</p>
          </div>
        </div>
      )}

      {!isDraft && (
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-400/5 border border-emerald-400/20">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
          <div>
            <p className="text-emerald-400 font-bold text-sm">Your firm is LIVE on PropProven</p>
            <p className="text-neutral-500 text-xs mt-0.5">Your listing is visible to all traders on the platform.</p>
          </div>
        </div>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((card) => (
          <div key={card.label} className="relative rounded-2xl border border-white/10 bg-[#0c0c12]/80 backdrop-blur-md p-6 overflow-hidden group hover:-translate-y-1 transition-all duration-300 hover:border-brand-red/30">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-red/5 blur-[40px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-4">
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
            <p className="text-3xl font-black text-white">{loading ? "..." : card.value}</p>
            <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Profile Completion Bar */}
      <div className="rounded-2xl border border-white/10 bg-[#0c0c12]/80 backdrop-blur-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-bold text-lg">Profile Completion</h3>
          <span className={`text-sm font-black ${completionPct >= 80 ? "text-emerald-400" : completionPct >= 50 ? "text-amber-400" : "text-red-400"}`}>
            {completionPct}%
          </span>
        </div>
        <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-out ${
              completionPct >= 80 ? "bg-gradient-to-r from-emerald-500 to-emerald-400" :
              completionPct >= 50 ? "bg-gradient-to-r from-amber-500 to-amber-400" :
              "bg-gradient-to-r from-red-500 to-red-400"
            }`}
            style={{ width: `${completionPct}%` }}
          />
        </div>
        <div className="mt-4 grid grid-cols-3 md:grid-cols-5 gap-2">
          {requiredFields.map((field) => {
            const val = firmData[field];
            const filled = Array.isArray(val) ? val.length > 0 : val && val.toString().trim() !== "";
            return (
              <div key={field} className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1.5 rounded-lg text-center border ${
                filled ? "text-emerald-400 bg-emerald-400/5 border-emerald-400/20" : "text-neutral-600 bg-white/5 border-white/5"
              }`}>
                {field.replace(/([A-Z])/g, " $1").trim()}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
