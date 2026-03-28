"use client";

import { DollarSign, ShieldCheck, Star, Calendar, ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock Payout Data
const RECENT_PAYOUTS = [
    {
        id: "PO-10492",
        trader: "Alex M.",
        firmSlug: "the-funded-trader",
        firmName: "The Funded Trader",
        amount: "$12,450",
        date: "2 hours ago",
        status: "Verified",
    },
    {
        id: "PO-10491",
        trader: "Sarah J.",
        firmSlug: "ftmo",
        firmName: "FTMO",
        amount: "$8,900",
        date: "5 hours ago",
        status: "Verified",
    },
    {
        id: "PO-10490",
        trader: "David K.",
        firmSlug: "e8-markets",
        firmName: "E8 Markets",
        amount: "$24,100",
        date: "1 day ago",
        status: "Verified",
    },
    {
        id: "PO-10489",
        trader: "Michael T.",
        firmSlug: "blue-guardian",
        firmName: "Blue Guardian",
        amount: "$5,200",
        date: "1 day ago",
        status: "Verified",
    },
    {
        id: "PO-10488",
        trader: "Emma R.",
        firmSlug: "ftmo",
        firmName: "FTMO",
        amount: "$15,750",
        date: "2 days ago",
        status: "Verified",
    },
    {
        id: "PO-10487",
        trader: "James L.",
        firmSlug: "funding-pips",
        firmName: "Funding Pips",
        amount: "$4,300",
        date: "2 days ago",
        status: "Verified",
    },
];

export default function PayoutsClient({ initialFirms }: { initialFirms: any[] }) {
    return (
        <div className="min-h-screen bg-[#0A0A0A] relative pb-32 overflow-hidden">
            
            {/* Ambient Lighting */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/10 blur-[200px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-red/5 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 md:pt-40 relative z-10">
                
                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold uppercase tracking-widest backdrop-blur-md shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                        <DollarSign className="w-5 h-5 animate-pulse" />
                        Verified Proof
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight uppercase leading-[1.1]">
                        Prop Firm <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-200 drop-shadow-[0_0_40px_rgba(52,211,153,0.5)]">
                            Payouts
                        </span>
                    </h1>
                    <p className="text-[#A3A3A3] text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed mt-6">
                        Don't just take their word for it. We scour the web, Discord servers, and Trustpilot to aggregate 100% verified payout certificates from the industry's top capital providers.
                    </p>
                </div>

                {/* Stats Ribbon */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                    {[
                        { label: "Total Tracked", value: "$4.2M+" },
                        { label: "Verified Certificates", value: "1,250+" },
                        { label: "Active Firms", value: String(initialFirms.length) },
                        { label: "Updated", value: "Today" },
                    ].map((stat, i) => (
                        <div key={i} className="bg-[#111111]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 text-center hover:border-emerald-500/30 transition-colors">
                            <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                            <div className="text-sm font-bold text-[#A3A3A3] uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Payouts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {RECENT_PAYOUTS.map((payout, idx) => {
                        const firmData = initialFirms.find(f => f.slug === payout.firmSlug || f.name === payout.firmName) || initialFirms[0];

                        return (
                            <div 
                                key={idx}
                                className="group relative bg-[#111111]/80 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden hover:border-emerald-500/30 hover:shadow-[0_10px_40px_rgba(16,185,129,0.1)] transition-all duration-500 hover:-translate-y-1 flex flex-col"
                            >
                                {/* Payout Certificate Visual */}
                                <div className="h-48 w-full relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-emerald-900/30 via-[#111] to-[#0A0A0A]">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(16,185,129,0.15),transparent_70%)]" />
                                    
                                    <div className="relative z-20 flex flex-col items-center justify-center text-center p-6">
                                        <div className="bg-emerald-500/20 text-emerald-400 p-3 rounded-full mb-3 backdrop-blur-md border border-emerald-500/30">
                                            <ShieldCheck className="w-8 h-8" />
                                        </div>
                                        <div className="text-3xl font-black text-white tracking-tight">{payout.amount}</div>
                                        <div className="text-sm font-medium text-emerald-400 tracking-widest uppercase">Verified Certificate</div>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="p-6 flex-1 flex flex-col relative z-20 bg-[#111]">
                                    
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center p-1.5 shadow-lg">
                                                {firmData && <Image src={firmData.logo} alt={firmData.name} width={30} height={30} className="object-contain" />}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-white text-lg leading-none mb-1">{payout.firmName}</h3>
                                                <div className="text-xs font-medium text-[#A3A3A3] flex items-center gap-1.5">
                                                    <Calendar className="w-3 h-3" /> {payout.date}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-6 flex-1">
                                        <div className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
                                            <span className="text-[#A3A3A3]">Trader</span>
                                            <span className="font-bold text-white">{payout.trader}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
                                            <span className="text-[#A3A3A3]">Certificate ID</span>
                                            <span className="font-mono text-white/60">{payout.id}</span>
                                        </div>
                                    </div>

                                    {firmData && (
                                        <Link href={`/firms/${firmData.slug}`}>
                                            <Button className="w-full bg-white/5 hover:bg-emerald-500 hover:text-white text-[#A3A3A3] font-bold border border-white/10 hover:border-emerald-500 transition-all group/btn">
                                                Review Firm <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-16 text-center">
                    <Button variant="outline" className="h-14 px-8 rounded-full border-white/10 bg-transparent text-white hover:bg-white/5 hover:border-white/20 font-bold tracking-widest uppercase text-sm">
                        Load More Payouts
                    </Button>
                </div>

            </div>
        </div>
    );
}
