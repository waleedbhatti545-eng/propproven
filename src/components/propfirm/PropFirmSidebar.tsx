"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useFirmOwner } from "@/components/propfirm/FirmOwnerContext";
import { LayoutDashboard, Building2, Layers, Ticket, LogOut, Shield, Loader2 } from "lucide-react";
import { supabase } from "@/utils/supabase";

export function PropFirmSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { firmData, loading } = useFirmOwner();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Firm Profile", href: "/dashboard/profile", icon: Building2 },
    { name: "Challenges", href: "/dashboard/challenges", icon: Layers },
    { name: "Offers & Promos", href: "/dashboard/promos", icon: Ticket },
  ];

  if (loading) {
    return (
      <aside className="w-64 fixed inset-y-0 left-0 z-50 flex items-center justify-center bg-black/60 border-r border-white/5">
        <Loader2 className="w-6 h-6 text-brand-red animate-spin" />
      </aside>
    );
  }

  return (
    <aside className="w-64 fixed inset-y-0 left-0 z-50 flex flex-col pt-6 pb-4 border-r border-white/5 bg-black/60 backdrop-blur-3xl shadow-[4px_0_24px_-4px_rgba(0,0,0,0.5)]">
      {/* Brand */}
      <div className="flex flex-col items-center justify-center px-6 mb-10 border-b border-white/5 pb-8">
        <div className="flex items-center gap-3 mb-3">
          <Shield className="w-8 h-8 text-brand-red" />
          <div className="flex flex-col">
            <span className="text-lg font-black uppercase tracking-wider text-white leading-tight">PropProven</span>
            <span className="text-brand-orange text-[10px] tracking-[0.25em] font-bold uppercase">Partner Portal</span>
          </div>
        </div>
        
        {firmData && (
          <div className="mt-4 w-full p-3 rounded-xl bg-white/5 border border-white/5 text-center">
            <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-1">Managing</p>
            <p className="text-white font-bold text-sm truncate">{firmData.name}</p>
            <span className={`inline-flex items-center gap-1 mt-2 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${
              firmData.on_platform_status === "Live" 
                ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/30" 
                : "text-amber-400 bg-amber-400/10 border-amber-400/30"
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              {firmData.on_platform_status || "Draft"}
            </span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-4 pb-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all duration-300 relative overflow-hidden
                ${isActive
                  ? "text-white bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
                }
              `}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1/2 w-1 rounded-r-full bg-brand-red shadow-[0_0_12px_rgba(220,38,38,0.8)]" />
              )}
              <item.icon className={`h-5 w-5 transition-transform duration-300 ${isActive ? "scale-110 text-brand-red" : "group-hover:scale-110"}`} />
              <span className="transition-transform duration-300 group-hover:translate-x-1">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-4 mt-auto">
        <button onClick={handleSignOut} className="w-full flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-red-400 transition-all duration-300 hover:bg-red-500/10 hover:text-red-300">
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
