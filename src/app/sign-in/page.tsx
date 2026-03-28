"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  Zap,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

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
      toast.success("Welcome back! Redirecting...");
      router.push("/firms");
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/firms`,
      },
    });
    if (error) {
      toast.error(error.message);
      setGoogleLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 md:p-8 overflow-hidden bg-black font-sans">
      {/* ── Animated Background ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Floating Orbs */}
        <div className="absolute top-[15%] left-[10%] w-[500px] h-[500px] rounded-full bg-brand-red/8 blur-[150px] animate-float" />
        <div
          className="absolute bottom-[10%] right-[15%] w-[400px] h-[400px] rounded-full bg-brand-orange/6 blur-[120px]"
          style={{ animationDelay: "3s", animationDuration: "8s" }}
        />
        <div
          className="absolute top-[60%] left-[50%] w-[300px] h-[300px] rounded-full bg-purple-500/5 blur-[100px]"
          style={{ animationDelay: "1.5s", animationDuration: "10s" }}
        />
        {/* Radial Glow Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-brand-red/5 to-transparent blur-[80px]" />
      </div>

      {/* ── Main Container ── */}
      <div
        className={`relative z-10 w-[92vw] max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-0 transition-all duration-1000 ${
          mounted
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        {/* ── Left Panel: Brand ── */}
        <div className="hidden lg:flex flex-col justify-between p-12 xl:p-14 bg-gradient-to-br from-black/80 via-black/60 to-brand-red/10 backdrop-blur-2xl border border-white/[0.08] rounded-l-[32px] relative overflow-hidden">
          {/* Decorative Corner Accent */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-brand-red/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-brand-red/10 to-transparent rounded-full blur-[60px]" />

          {/* Logo */}
          <div className="relative z-10">
            <Link href="/" className="inline-block group">
              <Image
                src="/images/logo.png"
                alt="PropProven"
                width={260}
                height={70}
                className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                unoptimized
              />
            </Link>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 space-y-6 mt-auto">
            <div className="inline-flex items-center gap-2 bg-brand-red/10 border border-brand-red/20 rounded-full px-4 py-1.5 text-sm text-brand-red font-medium">
              <Zap className="w-4 h-4" />
              Trusted by 10,000+ Traders
            </div>
            <h1 className="text-[3.5rem] xl:text-[4rem] font-bold text-white tracking-tight leading-[1.1]">
              Welcome
              <br />
              <span className="text-gradient">Back.</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-md leading-relaxed">
              Sign in to access your personalized dashboard, saved firms, and
              exclusive trading insights.
            </p>
          </div>

          {/* Trust Badges */}
          <div className="relative z-10 mt-14 flex items-center gap-10 text-gray-500">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-brand-red" />
              </div>
              <div>
                <span className="block text-sm font-semibold text-gray-300">
                  Secure
                </span>
                <span className="block text-xs text-gray-500">
                  256-bit SSL
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Lock className="w-5 h-5 text-brand-red" />
              </div>
              <div>
                <span className="block text-sm font-semibold text-gray-300">
                  Private
                </span>
                <span className="block text-xs text-gray-500">
                  No data sharing
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-brand-red" />
              </div>
              <div>
                <span className="block text-sm font-semibold text-gray-300">
                  Trusted
                </span>
                <span className="block text-xs text-gray-500">
                  80+ firms
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Panel: Form ── */}
        <div className="flex flex-col justify-center p-8 md:p-14 lg:p-16 xl:p-20 bg-[#080810]/90 backdrop-blur-3xl border border-white/[0.08] lg:border-l-0 rounded-[32px] lg:rounded-l-none lg:rounded-r-[32px] shadow-2xl shadow-black/40 relative overflow-hidden">
          {/* Subtle top glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-brand-red/40 to-transparent" />

          {/* Mobile Logo */}
          <div className="lg:hidden mb-10 flex justify-center">
            <Image
              src="/images/logo.png"
              alt="PropProven"
              width={240}
              height={60}
              className="h-14 w-auto object-contain"
              unoptimized
            />
          </div>

          <div className="w-full max-w-[420px] mx-auto space-y-8">
            {/* Header */}
            <div className="text-center lg:text-left space-y-2">
              <h2 className="text-3xl md:text-[2.5rem] font-bold text-white tracking-tight">
                Sign In
              </h2>
              <p className="text-gray-500 text-sm">
                Enter your credentials to access your account
              </p>
            </div>

            {/* Google OAuth */}
            <Button
              type="button"
              variant="outline"
              disabled={googleLoading}
              onClick={handleGoogleSignIn}
              className="w-full h-[52px] bg-white/[0.03] border-white/10 hover:bg-white/[0.07] hover:border-white/20 text-white font-medium rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 group"
            >
              {googleLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/20 border-t-white" />
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </>
              )}
            </Button>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="absolute w-full border-t border-white/[0.06]" />
              <span className="relative px-4 text-gray-600 text-xs font-medium uppercase tracking-wider bg-[#080810]">
                or
              </span>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-400 ml-1">
                  Email
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-600 group-focus-within:text-brand-red transition-colors" />
                  <input
                    type="email"
                    required
                    value={email}
                    disabled={loading}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full h-[52px] pl-12 pr-5 bg-white/[0.03] border border-white/10 rounded-2xl text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-red/50 focus:ring-2 focus:ring-brand-red/20 transition-all duration-300 font-medium text-sm"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-semibold text-gray-400">
                    Password
                  </label>
                  <Link
                    href="#"
                    className="text-xs text-brand-red/70 hover:text-brand-red transition-colors font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-600 group-focus-within:text-brand-red transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    disabled={loading}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-[52px] pl-12 pr-14 bg-white/[0.03] border border-white/10 rounded-2xl text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-red/50 focus:ring-2 focus:ring-brand-red/20 transition-all duration-300 font-medium text-sm tracking-widest"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="w-[18px] h-[18px]" />
                    ) : (
                      <Eye className="w-[18px] h-[18px]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-[52px] bg-gradient-to-r from-brand-red to-brand-orange text-white font-bold text-[15px] rounded-2xl shadow-[0_0_30px_-5px_rgba(220,38,38,0.4)] hover:shadow-[0_0_40px_-5px_rgba(220,38,38,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 mt-2"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>

            {/* Footer */}
            <p className="text-center text-gray-500 text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="text-brand-red font-semibold hover:text-brand-orange transition-colors inline-flex items-center gap-1"
              >
                Create Account
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
