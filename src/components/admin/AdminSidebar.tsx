import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import { LayoutDashboard, Building2, Settings, LogOut, Ticket, Star, Flame, MessageSquareWarning, BarChart3, Mail, MousePointerClick, Bell, Users } from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Firm Manager", href: "/admin/firms", icon: Building2 },
    { name: "Featured Rank", href: "/admin/featured", icon: Star },
    { name: "Popular Rank", href: "/admin/popular", icon: Flame },
    { name: "Promos", href: "/admin/promos", icon: Ticket },
    { name: "Review Moderation", href: "/admin/reviews", icon: MessageSquareWarning },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "Subscribers", href: "/admin/subscribers", icon: Mail },
    { name: "Promo Clicks", href: "/admin/promo-analytics", icon: MousePointerClick },
    { name: "Notifications", href: "/admin/notifications", icon: Bell },
    { name: "Team", href: "/admin/team", icon: Users },
    { name: "Global Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 fixed inset-y-0 left-0 z-50 flex flex-col pt-6 pb-4 border-r border-white/5 bg-black/60 backdrop-blur-3xl shadow-[4px_0_24px_-4px_rgba(0,0,0,0.5)]">
      {/* Brand */}
      <div className="flex flex-col items-center justify-center px-6 mb-12 border-b border-white/5 pb-8">
        <Image
          src="/images/logo.png"
          alt="PropProven Admin"
          width={240}
          height={64}
          className="h-14 w-auto object-contain transition-transform duration-500 hover:scale-105"
          unoptimized
        />
        <div className="mt-3 flex items-center justify-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
          </span>
          <span className="text-[10px] tracking-[0.2em] text-gray-500 font-semibold uppercase">
            Admin Workspace
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-4 pb-4 overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
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
              {/* Active Indicator Glow */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1/2 w-1 bg-brand-red rounded-r-full shadow-[0_0_12px_rgba(220,38,38,0.8)]" />
              )}
              
              <item.icon className={`h-5 w-5 transition-transform duration-300 ${isActive ? "scale-110 text-brand-red" : "group-hover:scale-110 group-hover:text-brand-orange"}`} />
              <span className="transition-transform duration-300 group-hover:translate-x-1">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout / User Area */}
      <div className="px-4 mt-auto">
        <button onClick={handleSignOut} className="w-full flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-red-400 transition-all duration-300 hover:bg-red-500/10 hover:text-red-300">
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
