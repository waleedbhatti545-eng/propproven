"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
    } else if (data.session) {
      toast.success("Authentication successful. Welcome Admin.");
      // Force page refresh to clear client router cache and establish global auth session
      window.location.href = "/admin"; 
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center p-4 selection:bg-indigo-500/30">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        <div className="text-center mb-8">
          <Image src="/images/logo.png" alt="PropProven" width={240} height={60} className="mx-auto mb-6 h-12 w-auto object-contain" />
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin Authentication Gateway</h1>
          <p className="text-neutral-400 mt-2 text-sm">Secure access to PropProven database systems required to edit or modify production resources.</p>
        </div>

        <div className="bg-[#0c0c12]/80 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <form className="space-y-6" onSubmit={handleLogin}>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300 ml-1">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <Input 
                  type="email" 
                  required
                  value={email}
                  disabled={loading}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border-white/10 rounded-xl h-12 pl-12 pr-4 text-white placeholder:text-neutral-500 focus:ring-indigo-500" 
                  placeholder="admin@propproven.com" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300 ml-1">Master Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <Input 
                  type="password" 
                  required
                  value={password}
                  disabled={loading}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 border-white/10 rounded-xl h-12 pl-12 pr-4 text-white placeholder:text-neutral-500 focus:ring-indigo-500" 
                  placeholder="••••••••••••" 
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold tracking-wide shadow-[0_0_20px_-3px_rgba(99,102,241,0.5)] transition-all hover:scale-[1.02]"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <span className="flex items-center gap-2">Verify Identity <ArrowRight className="w-5 h-5" /></span>
              )}
            </Button>
          </form>
        </div>

        <div className="mt-8 text-center flex items-center justify-center gap-2 text-xs text-neutral-500">
           <ShieldCheck className="w-4 h-4 text-emerald-500" />
           <p>Protected by Supabase Row Level Security (RLS)</p>
        </div>

      </div>
    </div>
  );
}
