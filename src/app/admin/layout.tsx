"use client";

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { AdminMarketProvider } from "@/components/admin/AdminMarketContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        window.location.href = "/login";
      } else {
        setAuthenticated(true);
      }
      setMounted(true);
    });

    // Listen for auth state changes (e.g. logging out)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        window.location.href = "/login";
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Do not render anything until we confirm admin is securely logged in
  if (!mounted || !authenticated) return null;

  return (
    <AdminMarketProvider>
      <div className="min-h-screen bg-[#07070a] text-white selection:bg-brand-red/30 overflow-x-hidden">
        {/* Dynamic Background Glows */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-red/5 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-orange/5 blur-[120px]" />
        </div>

        <AdminSidebar />
        
        {/* Main Content Area */}
        <div className="pl-64 relative z-10">
          {/* Top Gradient Header */}
          <header className="h-20 border-b border-white/5 bg-black/20 backdrop-blur-md flex items-center justify-between px-10">
            <h2 className="text-xl font-light tracking-wide text-neutral-300">
              Welcome back, <span className="font-semibold text-white">Admin</span>
            </h2>
            <a href="/" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-brand-red hover:text-white transition-all bg-brand-red/10 px-5 py-2.5 rounded-xl hover:bg-brand-red/20 shadow-[0_0_20px_-5px_rgba(220,38,38,0.3)] hover:shadow-[0_0_25px_-5px_rgba(220,38,38,0.5)] border border-brand-red/20 flex items-center gap-2">
              Open Live Site
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          </header>

          {/* Page Content */}
          <main className="p-10 max-w-7xl mx-auto">
            {children}
          </main>
        </div>
      </div>
    </AdminMarketProvider>
  );
}
