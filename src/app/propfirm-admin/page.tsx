"use client";

import { useState } from "react";
import { ArrowRight, Lock, CheckCircle2 } from "lucide-react";
import { supabase } from "@/utils/supabase";

export default function PropFirmGateway() {
  const [view, setView] = useState<"login" | "apply">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simple Auth Flow
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
       alert(error.message);
    } else {
       // redirect handled by auth listener or we push
       window.location.href = "/dashboard"; 
    }
    setLoading(false);
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Create auth user conceptually, or store as application only. 
    // In strict B2B pipelines, they sign up, then their account sits "pending" review.
    const { data: authData, error: signupError } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (signupError && signupError.message !== "User already registered") {
      alert(signupError.message);
      setLoading(false);
      return;
    }

    const userId = authData?.user?.id;
    if (userId) {
       // Insert into firm_applications table created via SQL
       const { error: appError } = await supabase.from("firm_applications").insert({
           user_id: userId,
           company_name: companyName,
           website_url: website,
           email: email
       });

       if (!appError) {
          setSuccessMsg("Application received. The PropProven team will review your firm shortly.");
          setView("login");
       } else {
          alert(appError.message);
       }
    } else {
       // Just insert without UUID if email already exists but they forgot they applied
       alert("Email already exists. Please log in.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-700">
      
      <div className="w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
        {/* Top Glow Edge */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-red to-brand-orange" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/10 blur-[50px] pointer-events-none" />

        <div className="mb-10 text-center">
            <Lock className="w-8 h-8 text-neutral-500 mx-auto mb-4" />
            <h2 className="text-3xl font-black text-white px-2">
               {view === "login" ? "OWNER PORTAL" : "FIRM ONBOARDING"}
            </h2>
            <p className="text-neutral-500 mt-2 text-sm">
               {view === "login" ? "Secure access for verified prop firms." : "List your firm, algorithms, and exclusive offers."}
            </p>
        </div>

        {successMsg && (
            <div className="mb-6 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 p-4 rounded-xl flex items-center gap-3 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5" />
                {successMsg}
            </div>
        )}

        {view === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4 relative z-10">
                <div>
                   <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest pl-2">Executive Email</label>
                   <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 mt-1.5 focus:border-brand-red outline-none text-white focus:shadow-[0_0_15px_rgba(220,38,38,0.2)] transition-all" />
                </div>
                <div>
                   <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest pl-2">Security Key</label>
                   <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 mt-1.5 focus:border-brand-red outline-none text-white focus:shadow-[0_0_15px_rgba(220,38,38,0.2)] transition-all" />
                </div>
                <button disabled={loading} className="w-full bg-white hover:bg-neutral-200 text-black font-black uppercase tracking-widest py-4 rounded-xl mt-6 transition-all flex items-center justify-center gap-2">
                    {loading ? "Authenticating..." : "Login To Console"} <ArrowRight className="w-4 h-4 ml-1" />
                </button>
                <div className="text-center mt-6">
                    <button type="button" onClick={() => {setView("apply"); setSuccessMsg("");}} className="text-neutral-500 hover:text-white text-xs underline underline-offset-4 decoration-white/20 transition-all font-medium">
                        Not listed yet? Apply for Verification.
                    </button>
                </div>
            </form>
        ) : (
            <form onSubmit={handleApply} className="space-y-4 relative z-10">
                <div>
                   <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest pl-2">Company Name</label>
                   <input required value={companyName} onChange={e => setCompanyName(e.target.value)} className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 mt-1.5 focus:border-brand-orange outline-none text-white transition-all" />
                </div>
                <div>
                   <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest pl-2">Corporate Website</label>
                   <input required type="url" placeholder="https://..." value={website} onChange={e => setWebsite(e.target.value)} className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 mt-1.5 focus:border-brand-orange outline-none text-white transition-all" />
                </div>
                <div className="w-full h-px bg-white/5 my-4" />
                <div>
                   <label className="text-xs font-bold text-brand-orange uppercase tracking-widest pl-2">Account Email</label>
                   <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-[#111] border border-brand-orange/30 rounded-xl px-4 py-3 mt-1.5 focus:border-brand-orange outline-none text-white transition-all" />
                </div>
                <div>
                   <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest pl-2">Secure Password</label>
                   <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 mt-1.5 focus:border-brand-orange outline-none text-white transition-all" />
                </div>
                <button disabled={loading} className="w-full bg-gradient-to-r from-brand-red to-brand-orange hover:from-[#EF4444] hover:to-[#F97316] text-white font-black uppercase tracking-widest py-4 rounded-xl mt-6 transition-all flex items-center justify-center gap-2">
                    {loading ? "Submitting..." : "Submit Application"} 
                </button>
                <div className="text-center mt-6">
                    <button type="button" onClick={() => setView("login")} className="text-neutral-500 hover:text-white text-xs underline underline-offset-4 decoration-white/20 transition-all font-medium">
                        Already verified? Login here.
                    </button>
                </div>
            </form>
        )}
      </div>

    </div>
  );
}
