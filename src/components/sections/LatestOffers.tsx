"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Tag, Copy, CheckCircle2, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Upgraded Offers Data with Brand Alignment
const LATEST_OFFERS = [
    {
        firmName: "The Funded Trader",
        discount: "20% OFF",
        code: "PROVEN20",
        description: "Get 20% off all challenges + 15% profit split bonus.",
        expires: "Ends in 2d 14h",
        color: "from-brand-red to-[#FF4444]",
        glow: "shadow-[0_0_30px_rgba(220,38,38,0.3)]"
    },
    {
        firmName: "Blue Guardian",
        discount: "15% OFF",
        code: "GUARDIAN15",
        description: "Unlimited Trading Days + 15% discount on all accounts.",
        expires: "Ends in 5d 10h",
        color: "from-[#3B82F6] to-[#60A5FA]",
        glow: "shadow-[0_0_30px_rgba(59,130,246,0.3)]"
    },
    {
        firmName: "Forex Prop Firm",
        discount: "Buy 1 Get 1",
        code: "BOGO50",
        description: "Buy any $10k challenge and get a second one free.",
        expires: "Ends in 12h 30m",
        color: "from-[#10B981] to-[#34D399]",
        glow: "shadow-[0_0_30px_rgba(16,185,129,0.3)]"
    },
];

export function LatestOffers() {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleCopy = (code: string, index: number) => {
        navigator.clipboard.writeText(code);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <section className="py-24 bg-[#0A0A0A] relative overflow-hidden" id="offers">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-red/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-red/5 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red text-sm font-bold uppercase tracking-widest backdrop-blur-md">
                            <Tag className="h-4 w-4" /> Limited Time Deals
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase">
                            Exclusive <span className="text-brand-red drop-shadow-[0_0_20px_rgba(220,38,38,0.4)]">Offers</span>
                        </h2>
                    </div>
                    <Link href="/promos">
                        <Button variant="outline" className="h-12 px-6 rounded-full border-white/10 bg-white/5 text-white hover:bg-brand-red hover:border-brand-red transition-all group">
                            View All Promos <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>

                {/* Offers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {LATEST_OFFERS.map((offer, index) => (
                        <div 
                            key={index} 
                            className="group relative bg-[#111111]/80 backdrop-blur-xl border border-white/5 rounded-[32px] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex flex-col h-full"
                        >
                            {/* Top Gradient Bar */}
                            <div className={cn("h-2 w-full bg-gradient-to-r", offer.color)} />

                            <div className="p-8 flex-1 flex flex-col">
                                {/* Badge & Timer */}
                                <div className="flex justify-between items-start mb-6">
                                    <div className={cn("px-4 py-1.5 rounded-full text-white font-black text-sm tracking-wide bg-gradient-to-r", offer.color, offer.glow)}>
                                        {offer.discount}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#A3A3A3] bg-black/40 px-3 py-1.5 rounded-full border border-white/5">
                                        <Clock className="h-3 w-3 text-brand-red animate-pulse" />
                                        {offer.expires}
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                                    {offer.firmName}
                                </h3>
                                <p className="text-[#A3A3A3] text-sm leading-relaxed mb-8 flex-1">
                                    {offer.description}
                                </p>

                                {/* Promo Code Box */}
                                <div className="mt-auto">
                                    <div className="p-1 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/5 mb-6 group-hover:border-white/10 transition-colors">
                                        <div className="bg-[#0A0A0A] rounded-xl p-3 flex items-center justify-between relative overflow-hidden">
                                            {/* Flash effect strictly contained */}
                                            <div className="absolute inset-0 bg-brand-red/10 -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
                                            
                                            <div className="flex flex-col relative z-10">
                                                <span className="text-[10px] text-[#A3A3A3] uppercase font-bold tracking-widest mb-1">Use Code</span>
                                                <code className="text-lg font-black text-white tracking-widest">{offer.code}</code>
                                            </div>
                                            
                                            <button 
                                                onClick={() => handleCopy(offer.code, index)}
                                                className={cn(
                                                    "relative z-10 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300",
                                                    copiedIndex === index 
                                                        ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/30" 
                                                        : "bg-white/5 text-white hover:bg-brand-red hover:border-brand-red border border-white/10"
                                                )}
                                            >
                                                {copiedIndex === index ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <button className="w-full h-14 rounded-xl bg-white text-black font-black uppercase tracking-widest text-sm hover:bg-brand-red hover:text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg group/btn relative overflow-hidden">
                                        <span className="relative z-10 flex items-center gap-2">
                                            Claim Offer <Zap className="w-4 h-4 group-hover/btn:animate-bounce" />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
