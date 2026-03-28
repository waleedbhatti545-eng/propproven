"use client";

import { FirmData, AccountTier } from "@/data/firms";
import { Check, X, Trophy, TrendingUp } from "lucide-react";
import { VisualTimeline } from "./VisualTimeline";
import ReactCountryFlag from "react-country-flag";

export function TabRules({ firm, selectedAccount }: { firm: FirmData, selectedAccount: AccountTier }) {

    const activeAccount = selectedAccount || firm.accounts[0];

    return (
        <div className="space-y-12">

            {/* A. VISUAL TIMELINE (New V5 Feature) */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-[#FF0000]" />
                    Evaluation Roadmap
                </h2>
                <VisualTimeline firm={firm} selectedAccount={activeAccount} />
            </div>

            {/* B. TRADING RULES (Allowed vs Prohibited) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Allowed */}
                <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-6 hover:border-[#FF0000]/40 transition-colors">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Check className="w-5 h-5 text-[#FF0000]" /> Allowed Strategies
                    </h3>
                    <ul className="space-y-3">
                        <CheckItem text={`News Trading (${firm.newsTrading})`} />
                        <CheckItem text={`Weekend Holding (${firm.weekendHolding})`} />
                        <CheckItem text={`EA / Algo Trading (${firm.eaTrading})`} />
                        <CheckItem text="Scalping & Day Trading" />
                    </ul>
                </div>
                {/* Prohibited */}
                <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-6 hover:border-[#FF0000]/40 transition-colors">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <X className="w-5 h-5 text-[#FF0000]" /> Prohibited
                    </h3>
                    <ul className="space-y-3">
                        <XItem text="High-Frequency Trading (HFT)" />
                        <XItem text="Arbitrage Strategies" />
                        <XItem text="Tick Scalping" />
                        <XItem text="Multi-Account Hedging" />
                    </ul>
                </div>
            </div>

            {/* C. SCALING PLAN */}
            <div className="relative group mt-8">
                <div className="absolute inset-0 bg-[#FF0000]/10 blur-[40px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="relative bg-[#111111]/80 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-white/10 group-hover:border-[#FF0000]/30 transition-colors duration-500 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
                        <div className="p-2.5 bg-[#FF0000]/10 rounded-xl border border-[#FF0000]/20 shadow-[0_0_15px_rgba(255,0,0,0.15)] group-hover:shadow-[0_0_25px_rgba(255,0,0,0.3)] transition-shadow">
                            <TrendingUp className="w-5 h-5 text-[#FF0000]" />
                        </div>
                        Scaling Plan
                    </h3>
                    
                    <div className="relative z-10 bg-black/40 p-5 md:p-6 rounded-xl border border-white/5 group-hover:bg-black/60 transition-colors duration-500">
                        <p className="text-gray-400 mb-6 leading-relaxed text-sm md:text-base">
                            Consistently profitable traders can scale their account up to <span className="text-[#FF0000] font-bold px-1">{firm.maxFunding}</span>.
                            Typically requires achieving a 10% profit over a 4-month period.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="bg-[#0F0F0F] px-5 py-3 rounded-xl border border-white/5 hover:border-[#FF0000]/40 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_10px_20px_rgba(255,0,0,0.15)] flex-1">
                                <span className="block text-[11px] text-[#FF0000] uppercase font-bold tracking-widest mb-1.5 opacity-90">Benefit</span>
                                <span className="text-white font-bold tracking-tight text-[15px]">+25% Balance Increase</span>
                            </div>
                            <div className="bg-[#0F0F0F] px-5 py-3 rounded-xl border border-white/5 hover:border-[#FF0000]/40 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_10px_20px_rgba(255,0,0,0.15)] flex-1">
                                <span className="block text-[11px] text-[#FF0000] uppercase font-bold tracking-widest mb-1.5 opacity-90">Profit Split</span>
                                <span className="text-white font-bold tracking-tight text-[15px]">Up to 90%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* D. RESTRICTED COUNTRIES PILL GRID */}
            <div className="relative group mt-8">
                <div className="absolute inset-0 bg-[#FF0000]/5 blur-[40px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="relative bg-[#1A1A1A] p-6 md:p-8 rounded-2xl border border-white/10 group-hover:border-[#FF0000]/20 transition-colors duration-500">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#FF0000]/10 flex items-center justify-center border border-[#FF0000]/20 text-[#FF0000]">
                            <X className="w-5 h-5" />
                        </div>
                        Restricted Countries
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                        {[
                            { name: "Afghanistan", code: "AF" },
                            { name: "Belarus", code: "BY" },
                            { name: "Burundi", code: "BI" },
                            { name: "Central African Republic", code: "CF" },
                            { name: "Crimea (Region of Ukraine)", code: "" },
                            { name: "Cuba", code: "CU" },
                            { name: "Democratic Republic of the Congo", code: "CD" },
                            { name: "Eritrea", code: "ER" },
                            { name: "Guinea", code: "GN" },
                            { name: "Guinea-Bissau", code: "GW" },
                            { name: "Iran", code: "IR" },
                            { name: "Iraq", code: "IQ" },
                            { name: "Israel", code: "IL" },
                            { name: "Laos", code: "LA" },
                            { name: "Lebanon", code: "LB" },
                            { name: "Liberia", code: "LR" },
                            { name: "Libya", code: "LY" },
                            { name: "Myanmar (Burma)", code: "MM" },
                            { name: "North Korea", code: "KP" },
                            { name: "Palestinian Territory", code: "PS" },
                            { name: "Papua New Guinea", code: "PG" },
                            { name: "Republic of the Congo", code: "CG" },
                            { name: "Russia", code: "RU" },
                            { name: "Somalia", code: "SO" },
                            { name: "South Sudan", code: "SS" },
                            { name: "Sudan", code: "SD" },
                            { name: "Syria", code: "SY" },
                            { name: "Vanuatu", code: "VU" },
                            { name: "Venezuela", code: "VE" },
                            { name: "Yemen", code: "YE" },
                        ].map((country, i) => (
                            <div key={i} className="flex items-center gap-2.5 px-3 py-1.5 bg-[#1F1F1F] hover:bg-[#000000] border border-white/5 hover:border-white/10 rounded-full text-[13px] text-gray-300 font-medium transition-colors cursor-default hover:shadow-[0_4px_10px_rgba(255,0,0,0.15)] group/pill">
                                {country.code && (
                                    <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 shadow-sm border border-white/10 relative flex items-center justify-center group-hover/pill:border-[#FF0000]/40 transition-colors">
                                        <ReactCountryFlag
                                            countryCode={country.code}
                                            svg
                                            style={{
                                                width: '1.5em',
                                                height: '1.5em',
                                                objectFit: 'cover',
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)'
                                            }}
                                        />
                                    </div>
                                )}
                                {country.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}

function CheckItem({ text }: { text: string }) {
    return (
        <li className="flex items-center gap-3 text-sm text-gray-300">
            <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-[#FF0000]" />
            </div>
            {text}
        </li>
    )
}

function XItem({ text }: { text: string }) {
    return (
        <li className="flex items-center gap-3 text-sm text-gray-300">
            <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <X className="w-3 h-3 text-[#FF0000]" />
            </div>
            {text}
        </li>
    )
}
