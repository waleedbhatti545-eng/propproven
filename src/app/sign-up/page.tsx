"use client";

import { useState, useEffect, useMemo } from "react";
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
  User,
  ArrowRight,
  Star,
  BarChart3,
  Users,
  ChevronRight,
  Check,
} from "lucide-react";

function PasswordStrengthBar({ password }: { password: string }) {
  const strength = useMemo(() => {
    if (!password) return { score: 0, label: "", color: "" };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (password.length >= 12) score++;

    if (score <= 1) return { score: 1, label: "Weak", color: "bg-red-500" };
    if (score <= 2) return { score: 2, label: "Fair", color: "bg-orange-500" };
    if (score <= 3) return { score: 3, label: "Good", color: "bg-yellow-500" };
    if (score <= 4) return { score: 4, label: "Strong", color: "bg-emerald-500" };
    return { score: 5, label: "Very Strong", color: "bg-emerald-400" };
  }, [password]);

  if (!password) return null;

  return (
    <div className="space-y-1.5 mt-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-500 ${
              i <= strength.score ? strength.color : "bg-white/10"
            }`}
          />
        ))}
      </div>
      <p
        className={`text-[11px] font-medium transition-colors ${
          strength.score <= 1
            ? "text-red-400"
            : strength.score <= 2
            ? "text-orange-400"
            : strength.score <= 3
            ? "text-yellow-400"
            : "text-emerald-400"
        }`}
      >
        {strength.label}
      </p>
    </div>
  );
}

export default function SignUpPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreedToTerms) {
      toast.error("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
    } else if (data.user) {
      toast.success(
        "Account created! Check your email to verify your account."
      );
      router.push("/sign-in");
    }
  };

  const handleGoogleSignUp = async () => {
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
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-brand-red/8 blur-[150px] animate-float" />
        <div
          className="absolute bottom-[15%] left-[10%] w-[400px] h-[400px] rounded-full bg-brand-orange/6 blur-[120px]"
          style={{ animationDelay: "2s", animationDuration: "9s" }}
        />
        <div
          className="absolute top-[50%] right-[40%] w-[350px] h-[350px] rounded-full bg-rose-500/5 blur-[100px]"
          style={{ animationDelay: "4s", animationDuration: "11s" }}
        />
        {/* Radial Glow */}
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
          {/* Decorative Accents */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-brand-red/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-brand-orange/10 to-transparent rounded-full blur-[60px]" />

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
              <Star className="w-4 h-4 fill-brand-red" />
              Join 10,000+ Smart Traders
            </div>
            <h1 className="text-[3.5rem] xl:text-[4rem] font-bold text-white tracking-tight leading-[1.1]">
              Discover Top
              <br />
              <span className="text-gradient">Prop Firms.</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-md leading-relaxed">
              Create your free account to compare firms, save favorites, and
              unlock exclusive promo codes.
            </p>
          </div>

          {/* Stats */}
          <div className="relative z-10 mt-14 grid grid-cols-3 gap-6 border-t border-white/[0.06] pt-8">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <BarChart3 className="w-5 h-5 text-brand-red" />
                <span className="text-2xl font-bold text-white">80+</span>
              </div>
              <span className="text-[11px] text-gray-500 uppercase tracking-wider font-medium">
                Reviewed Firms
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <Users className="w-5 h-5 text-brand-red" />
                <span className="text-2xl font-bold text-white">$5M+</span>
              </div>
              <span className="text-[11px] text-gray-500 uppercase tracking-wider font-medium">
                Funding Capital
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <Star className="w-5 h-5 text-brand-red fill-brand-red" />
                <span className="text-2xl font-bold text-white">4.8</span>
              </div>
              <span className="text-[11px] text-gray-500 uppercase tracking-wider font-medium">
                Avg Rating
              </span>
            </div>
          </div>

          {/* Browse CTA */}
          <div className="relative z-10 mt-8">
            <Link href="/firms">
              <Button className="w-full h-12 bg-white/[0.05] border border-white/10 hover:bg-white/10 text-white rounded-2xl font-semibold transition-all duration-300 group">
                Browse Firms
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        {/* ── Right Panel: Form ── */}
        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14 xl:p-16 bg-[#080810]/90 backdrop-blur-3xl border border-white/[0.08] lg:border-l-0 rounded-[32px] lg:rounded-l-none lg:rounded-r-[32px] shadow-2xl shadow-black/40 relative overflow-hidden">
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

          <div className="w-full max-w-[420px] mx-auto space-y-7">
            {/* Header */}
            <div className="text-center lg:text-left space-y-2">
              <h2 className="text-3xl md:text-[2.5rem] font-bold text-white tracking-tight">
                Create Account
              </h2>
              <p className="text-gray-500 text-sm">
                Start your journey to finding the perfect prop firm
              </p>
            </div>

            {/* Google OAuth */}
            <Button
              type="button"
              variant="outline"
              disabled={googleLoading}
              onClick={handleGoogleSignUp}
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

            {/* Sign-up Form */}
            <form onSubmit={handleSignUp} className="space-y-5">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-400 ml-1">
                  Full Name
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-600 group-focus-within:text-brand-red transition-colors" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    disabled={loading}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full h-[52px] pl-12 pr-5 bg-white/[0.03] border border-white/10 rounded-2xl text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-red/50 focus:ring-2 focus:ring-brand-red/20 transition-all duration-300 font-medium text-sm"
                  />
                </div>
              </div>

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
                <label className="text-sm font-semibold text-gray-400 ml-1">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-600 group-focus-within:text-brand-red transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    disabled={loading}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    className="w-full h-[52px] pl-12 pr-14 bg-white/[0.03] border border-white/10 rounded-2xl text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-red/50 focus:ring-2 focus:ring-brand-red/20 transition-all duration-300 font-medium text-sm"
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
                <PasswordStrengthBar password={password} />
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setAgreedToTerms(!agreedToTerms)}
                  className={`mt-0.5 w-5 h-5 rounded-md border flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
                    agreedToTerms
                      ? "bg-brand-red border-brand-red"
                      : "border-white/20 bg-white/[0.03] hover:border-white/30"
                  }`}
                >
                  {agreedToTerms && <Check className="w-3 h-3 text-white" />}
                </button>
                <p className="text-xs text-gray-500 leading-relaxed">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-brand-red/80 hover:text-brand-red transition-colors"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-brand-red/80 hover:text-brand-red transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </p>
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
                    <span>Creating account...</span>
                  </div>
                ) : (
                  <span className="flex items-center gap-2">
                    Create Account
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>

            {/* Footer */}
            <p className="text-center text-gray-500 text-sm">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-brand-red font-semibold hover:text-brand-orange transition-colors inline-flex items-center gap-1"
              >
                Sign In
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
