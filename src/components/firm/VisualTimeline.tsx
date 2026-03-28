"use client";

import { Check, Trophy, Flag, Ban } from "lucide-react";
import { AccountTier, FirmData } from "@/data/firms";

export function VisualTimeline({ firm, selectedAccount }: { firm: FirmData, selectedAccount: AccountTier }) {

    const parseCurrency = (val: string) => Number(val.replace(/[^0-9.-]+/g, ""));

    const Phase1 = {
        target: selectedAccount.targetPhase1,
        maxLoss: selectedAccount.maxTotalLoss,
        dailyLoss: selectedAccount.maxDailyLoss,
    }

    const Phase2 = {
        target: selectedAccount.targetPhase2,
        maxLoss: selectedAccount.maxTotalLoss,
        dailyLoss: selectedAccount.maxDailyLoss,
    }

    return (
        <div className="relative w-full py-12 overflow-hidden">

            {/* Connecting Line - Animated Glow Line */}
            <div className="absolute top-1/2 left-[10%] w-[80%] h-[2px] bg-white/5 -translate-y-1/2 hidden md:block">
                <div className="absolute top-0 left-0 h-full w-full bg-[#FF0000]/50 block shadow-[0_0_15px_rgba(255,0,0,0.8)]" />
                <div className="absolute top-0 left-0 h-full w-[20%] bg-gradient-to-r from-transparent via-white to-transparent opacity-80 animate-pulse" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">

                {/* STEP 1: EVALUATION */}
                <div className="relative group [perspective:1000px]">
                    <div className="absolute inset-0 bg-[#FF0000]/10 blur-[40px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    
                    <div className="relative h-full bg-[#111111]/80 backdrop-blur-xl border border-white/10 group-hover:border-[#FF0000]/50 p-6 rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,0,0,0.15)] flex flex-col overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <div className="absolute -top-4 -right-4 p-8 opacity-10 group-hover:opacity-20 transition-all duration-500 rotate-12 group-hover:rotate-0 transform origin-center pointer-events-none">
                            <Flag className="w-24 h-24 text-[#FF0000]" />
                        </div>

                        <div className="flex items-center gap-4 mb-6 relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#FF0000]/20 border border-[#FF0000]/30 flex items-center justify-center text-[#FF0000] font-black text-xl shadow-[inset_0_2px_10px_rgba(255,0,0,0.2)]">
                                1
                            </div>
                            <div>
                                <h3 className="font-bold text-white tracking-tight text-xl group-hover:text-[#FF0000] transition-colors duration-300">Evaluation</h3>
                                <div className="text-[11px] text-[#FF0000] font-bold tracking-widest uppercase bg-[#FF0000]/10 px-2 py-0.5 rounded-full inline-block mt-1 border border-[#FF0000]/20 shadow-[0_0_10px_rgba(255,0,0,0.1)]">Phase 1</div>
                            </div>
                        </div>

                        <div className="space-y-4 text-sm relative z-10 flex-grow">
                            <div className="flex justify-between items-center p-3 bg-black/40 rounded-xl border border-white/5 group-hover:border-[#FF0000]/20 transition-colors duration-300">
                                <span className="text-gray-400 font-medium">Target</span>
                                <span className="font-bold text-white text-base">{Phase1.target}</span>
                            </div>
                            <div className="flex justify-between items-center px-3">
                                <span className="text-gray-500 font-medium">Max Loss</span>
                                <span className="font-bold text-gray-200">{Phase1.maxLoss}</span>
                            </div>
                            <div className="flex justify-between items-center px-3">
                                <span className="text-gray-500 font-medium">Daily Loss</span>
                                <span className="font-bold text-gray-200">{Phase1.dailyLoss}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* STEP 2: VERIFICATION */}
                <div className="relative group [perspective:1000px]">
                    <div className="absolute inset-0 bg-[#FF0000]/10 blur-[40px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    
                    <div className="relative h-full bg-[#111111]/80 backdrop-blur-xl border border-white/10 group-hover:border-[#FF0000]/50 p-6 rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,0,0,0.15)] flex flex-col overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <div className="absolute -top-4 -right-4 p-8 opacity-10 group-hover:opacity-20 transition-all duration-500 -rotate-12 group-hover:rotate-0 transform origin-center pointer-events-none">
                            <Check className="w-24 h-24 text-[#FF0000]" />
                        </div>

                        <div className="flex items-center gap-4 mb-6 relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#FF0000]/20 border border-[#FF0000]/30 flex items-center justify-center text-[#FF0000] font-black text-xl shadow-[inset_0_2px_10px_rgba(255,0,0,0.2)]">
                                2
                            </div>
                            <div>
                                <h3 className="font-bold text-white tracking-tight text-xl group-hover:text-[#FF0000] transition-colors duration-300">Verification</h3>
                                <div className="text-[11px] text-[#FF0000] font-bold tracking-widest uppercase bg-[#FF0000]/10 px-2 py-0.5 rounded-full inline-block mt-1 border border-[#FF0000]/20 shadow-[0_0_10px_rgba(255,0,0,0.1)]">Phase 2</div>
                            </div>
                        </div>

                        <div className="space-y-4 text-sm relative z-10 flex-grow">
                            <div className="flex justify-between items-center p-3 bg-black/40 rounded-xl border border-white/5 group-hover:border-[#FF0000]/20 transition-colors duration-300">
                                <span className="text-gray-400 font-medium">Target</span>
                                <span className="font-bold text-white text-base">{Phase2.target}</span>
                            </div>
                            <div className="flex justify-between items-center px-3">
                                <span className="text-gray-500 font-medium">Max Loss</span>
                                <span className="font-bold text-gray-200">{Phase2.maxLoss}</span>
                            </div>
                            <div className="flex justify-between items-center px-3">
                                <span className="text-gray-500 font-medium">Daily Loss</span>
                                <span className="font-bold text-gray-200">{Phase2.dailyLoss}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* STEP 3: FUNDED TRADER */}
                <div className="relative group [perspective:1000px]">
                    <div className="absolute inset-0 bg-[#FF0000]/30 blur-[50px] rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    
                    <div className="relative h-full bg-gradient-to-b from-[#111111]/90 to-[#FF0000]/10 backdrop-blur-xl border border-[#FF0000]/30 group-hover:border-[#FF0000]/80 p-6 rounded-2xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_25px_50px_rgba(255,0,0,0.3)] flex flex-col overflow-hidden">
                        
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF0000] to-transparent opacity-60 pointer-events-none" />

                        <div className="absolute -top-4 -right-4 p-8 opacity-20 group-hover:opacity-40 transition-all duration-500 scale-90 group-hover:scale-110 transform origin-center pointer-events-none">
                            <Trophy className="w-24 h-24 text-[#FF0000] drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]" />
                        </div>

                        <div className="flex items-center gap-4 mb-6 relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-[#FF0000] border-2 border-white/20 flex items-center justify-center text-white font-black text-xl shadow-[0_0_20px_rgba(255,0,0,0.6)] group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(255,0,0,0.8)] transition-all duration-500">
                                <Check className="w-6 h-6 stroke-[3]" />
                            </div>
                            <div>
                                <h3 className="font-bold tracking-tight text-xl text-white">Funded Trader</h3>
                                <div className="text-[11px] text-white font-bold tracking-widest uppercase bg-[#FF0000]/40 px-2 py-0.5 rounded-full inline-block mt-1 border border-[#FF0000]/60 shadow-[0_0_15px_rgba(255,0,0,0.3)]">Pro Status</div>
                            </div>
                        </div>

                        <div className="space-y-4 text-sm relative z-10 flex-grow">
                            <div className="flex justify-between items-center p-3 bg-black/60 rounded-xl border border-[#FF0000]/30">
                                <span className="text-gray-300 font-medium">Profit Split</span>
                                <span className="font-bold text-white text-base drop-shadow-[0_0_8px_rgba(255,0,0,0.4)]">{firm.profitSplit}</span>
                            </div>
                            <div className="flex justify-between items-center px-3">
                                <span className="text-gray-400 font-medium">First Payout</span>
                                <span className="font-bold text-gray-100">{firm.payoutSpeed}</span>
                            </div>
                            <div className="flex justify-between items-center px-3">
                                <span className="text-gray-400 font-medium">Refund</span>
                                <span className="font-bold text-white tracking-wide">100% Fee</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
