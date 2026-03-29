"use client";

import { FirmOwnerProvider, useFirmOwner } from "@/components/propfirm/FirmOwnerContext";
import { PropFirmSidebar } from "@/components/propfirm/PropFirmSidebar";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function DashboardGuard({ children }: { children: React.ReactNode }) {
  const { user, firmSlug, loading } = useFirmOwner();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // Not logged in — kick back to login
      router.push("/");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-brand-red animate-spin" />
          <p className="text-neutral-500 text-sm font-medium animate-pulse">Loading Partner Console...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  if (!firmSlug) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-center px-6">
        <div className="max-w-md space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-8 h-8 text-amber-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Application Under Review</h2>
          <p className="text-neutral-400 leading-relaxed">
            Your firm application is currently being reviewed by the PropProven team. 
            Once approved, your dashboard will be automatically activated.
          </p>
          <p className="text-xs text-neutral-600 mt-6">Check back soon or watch your inbox for a confirmation email.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black">
      <PropFirmSidebar />
      <main className="ml-64 p-6 md:p-10 flex-1 min-h-screen">
        {children}
      </main>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <FirmOwnerProvider>
      <DashboardGuard>{children}</DashboardGuard>
    </FirmOwnerProvider>
  );
}
