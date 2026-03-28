import { Button } from "@/components/ui/button";
import { Search, ShieldCheck, HeartPulse, Trophy, ArrowRight, Activity, Users, Globe2, Sparkles } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#0A0A0A] flex flex-col relative overflow-hidden">
            {/* Ambient Background Effects */}
            <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-brand-red/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-red/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

            <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 pt-32 pb-24 relative z-10">

                {/* Hero Section */}
                <div className="text-center max-w-4xl mx-auto mb-24 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-red text-sm font-bold uppercase tracking-widest backdrop-blur-md mb-4">
                        <Sparkles className="w-4 h-4" />
                        Our Mission
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]">
                        Transparency in <br className="hidden md:block" /> a world of <span className="text-brand-red drop-shadow-[0_0_30px_rgba(220,38,38,0.5)]">uncertainty.</span>
                    </h1>
                    <p className="text-[#A3A3A3] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mt-6">
                        We built <strong className="text-white">PropProven</strong> because the proprietary trading industry was drowning in fake reviews, hidden rules, and delayed payouts. We believe traders deserve absolute clarity before investing their time and capital into an evaluation.
                    </p>
                </div>

                {/* KPI / Stats Ribbon */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-32">
                    {[
                        { label: "Prop Firms Tracked", value: "85+", icon: Globe2 },
                        { label: "Community Reviews", value: "24,000+", icon: Users },
                        { label: "Scams Exposed", value: "15+", icon: ShieldCheck },
                        { label: "Trader Match Rate", value: "94%", icon: Activity }
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col items-center justify-center p-6 bg-[#111] border border-white/5 rounded-2xl flex-1 backdrop-blur-sm relative overflow-hidden group">
                            <div className="absolute inset-0 bg-brand-red/0 group-hover:bg-brand-red/5 transition-colors duration-500" />
                            <stat.icon className="w-6 h-6 text-brand-red mb-4 opacity-80" />
                            <h3 className="text-3xl md:text-4xl font-black text-white mb-2">{stat.value}</h3>
                            <p className="text-[#A3A3A3] text-xs font-bold uppercase tracking-widest text-center">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Core Values Section */}
                <div className="space-y-16">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">How We Evaluate Firms</h2>
                        <p className="text-[#A3A3A3] max-w-2xl mx-auto">Our rigorous 3-step continuous monitoring system ensures you only trade with the most reliable capital providers.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                        {/* Step 1 */}
                        <div className="bg-gradient-to-b from-[#151515] to-[#0A0A0A] p-8 md:p-10 rounded-[32px] border border-white/5 relative overflow-hidden group hover:border-brand-red/30 transition-all duration-500">
                            <div className="absolute top-0 right-0 p-8 text-white/5 font-black text-8xl pointer-events-none group-hover:scale-110 transition-transform duration-700">1</div>
                            <div className="w-14 h-14 bg-brand-red/10 border border-brand-red/20 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(220,38,38,0.15)] relative z-10">
                                <Search className="w-6 h-6 text-brand-red" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Data Extraction</h3>
                            <p className="text-[#A3A3A3] leading-relaxed relative z-10 text-sm md:text-base">
                                We crawl through the endless fine print, extracting exact scaling plans, hidden trailing drawdown complexities, and precise weekend holding rules so you don't have to guess.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-gradient-to-b from-[#151515] to-[#0A0A0A] p-8 md:p-10 rounded-[32px] border border-white/5 relative overflow-hidden group hover:border-brand-red/30 transition-all duration-500">
                            <div className="absolute top-0 right-0 p-8 text-white/5 font-black text-8xl pointer-events-none group-hover:scale-110 transition-transform duration-700">2</div>
                            <div className="w-14 h-14 bg-brand-red/10 border border-brand-red/20 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(220,38,38,0.15)] relative z-10">
                                <ShieldCheck className="w-6 h-6 text-brand-red" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Payout Verification</h3>
                            <p className="text-[#A3A3A3] leading-relaxed relative z-10 text-sm md:text-base">
                                We actively monitor global trader communities to cross-reference reported payout delays. If a firm begins experiencing consistent Deel or Crypto payout failures, their Trust Score instantly plummets.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-gradient-to-b from-[#151515] to-[#0A0A0A] p-8 md:p-10 rounded-[32px] border border-white/5 relative overflow-hidden group hover:border-brand-red/30 transition-all duration-500 mt-0 md:translate-y-6">
                            <div className="absolute top-0 right-0 p-8 text-white/5 font-black text-8xl pointer-events-none group-hover:scale-110 transition-transform duration-700">3</div>
                            <div className="w-14 h-14 bg-brand-red/10 border border-brand-red/20 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(220,38,38,0.15)] relative z-10">
                                <HeartPulse className="w-6 h-6 text-brand-red" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Continuous Tracking</h3>
                            <p className="text-[#A3A3A3] leading-relaxed relative z-10 text-sm md:text-base">
                                Prop firms notoriously change their terms overnight. Our engine continuously scrapes feature updates, technology migrations (like MT4 to DXtrade shifts), and pricing changes in real-time.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA Overlay */}
                <div className="mt-32 relative rounded-[40px] p-[1px] bg-gradient-to-br from-brand-red/50 to-transparent overflow-hidden shadow-[0_0_100px_rgba(220,38,38,0.1)]">
                    <div className="bg-[#111111]/90 backdrop-blur-2xl rounded-[39px] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="max-w-2xl text-center md:text-left z-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to find your match?</h2>
                            <p className="text-[#A3A3A3] text-lg">Compare real-world spreads, verified payout speeds, and completely transparent rules across the top tier capital providers.</p>
                        </div>
                        <div className="shrink-0 z-10">
                            <Link href="/firms">
                                <Button className="h-16 px-10 rounded-2xl bg-brand-red hover:bg-[#EF4444] text-white font-bold text-lg shadow-[0_0_40px_rgba(220,38,38,0.4)] transition-all hover:scale-105 group relative overflow-hidden">
                                    <span className="relative z-10 flex items-center gap-3">
                                        Browse Verified Firms
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
