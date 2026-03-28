"use client";

import { FirmData } from "@/data/firms";
import { TrendingUp, ArrowRight, Zap } from "lucide-react";

export function SectionScaling({ firm }: { firm: FirmData }) {
    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 border-t border-white/5">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-blue-500" />
                Scaling Plan
            </h2>

            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/10 p-8 md:p-12">

                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            <Zap className="w-3 h-3" /> Growth Opportunity
                        </div>

                        <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                            Scale your capital up to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{firm.maxFunding}</span>
                        </h3>

                        <p className="text-gray-400 text-lg leading-relaxed">
                            {firm.scalingPlan || "Consistently profitable traders are rewarded with increased capital limits. Prove your skills and manage larger accounts over time."}
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <div className="flex items-center gap-3 bg-[#0F0F0F] px-4 py-3 rounded-xl border border-white/10">
                                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">1</div>
                                <div>
                                    <div className="text-xs text-gray-500 uppercase font-bold">Requirement</div>
                                    <div className="text-white font-medium">10% Profit</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 space-x-2">
                                <ArrowRight className="w-5 h-5 text-gray-600" />
                            </div>

                            <div className="flex items-center gap-3 bg-[#0F0F0F] px-4 py-3 rounded-xl border border-white/10">
                                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold">2</div>
                                <div>
                                    <div className="text-xs text-gray-500 uppercase font-bold">Reward</div>
                                    <div className="text-white font-medium">+25% Balance</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right side visual (abstract bars) */}
                    <div className="relative h-64 flex items-end justify-center gap-4 px-8">
                        <div className="w-16 bg-white/5 rounded-t-xl h-[40%] border border-white/10 relative group">
                            <div className="absolute bottom-full mb-2 w-full text-center text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">Start</div>
                        </div>
                        <div className="w-16 bg-white/10 rounded-t-xl h-[60%] border border-white/10 relative group">
                            <div className="absolute bottom-full mb-2 w-full text-center text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">Scale 1</div>
                        </div>
                        <div className="w-16 bg-brand-primary/20 rounded-t-xl h-[80%] border border-brand-primary/30 relative group">
                            <div className="absolute bottom-full mb-2 w-full text-center text-xs text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity">Scale 2</div>
                        </div>
                        <div className="w-16 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-xl h-[100%] shadow-[0_0_30px_rgba(59,130,246,0.3)] relative group">
                            <div className="absolute bottom-full mb-2 w-full text-center text-xs text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">Funded</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
