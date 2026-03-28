"use client";

import { FirmData } from "@/data/firms";
import { Check, X, Info, Globe, ShieldCheck, Monitor, MapPin, CreditCard, ChevronRight } from "lucide-react";
import ReactCountryFlag from "react-country-flag";

export function TabOverview({ firm }: { firm: FirmData }) {
    return (
        <div className="space-y-12">

            {/* A. ABOUT */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    About {firm.name}
                    <div className="h-px bg-white/10 flex-grow ml-4" />
                </h2>
                <div className="text-[#A3A3A3] leading-relaxed space-y-4">
                    <p>{firm.description}</p>
                </div>
            </div>

            {/* B. KEY FEATURES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {firm.features.map((feat, idx) => (
                    <div key={idx} className="bg-[#1A1A1A] p-6 rounded-lg border border-white/5 hover:border-[#FF0000]/30 transition-colors">
                        <div className="flex items-center gap-3 mb-2 text-[#FF0000]">
                            <Info className="w-5 h-5" />
                            <span className="text-sm font-semibold text-white">{feat.title}</span>
                        </div>
                        <div className="text-xl font-bold text-white">{feat.value}</div>
                    </div>
                ))}
            </div>

            {/* C. PROS & CONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Pros */}
                <div className="space-y-4 relative group">
                    <div className="absolute inset-0 bg-[#FF0000]/5 blur-[30px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    <h3 className="flex items-center gap-2 text-lg font-bold text-white relative z-10">
                        <Check className="w-5 h-5 text-[#FF0000]" /> PROS
                    </h3>
                    <div className="space-y-3 relative z-10">
                        {firm.pros.map((pro, i) => (
                            <div key={i} className="flex gap-3 p-3 bg-white/5 border border-white/10 hover:border-[#FF0000]/30 transition-colors rounded-lg">
                                <Check className="w-5 h-5 text-[#FF0000] shrink-0 mt-0.5" />
                                <span className="text-sm text-gray-300">{pro}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cons */}
                <div className="space-y-4 relative group">
                    <div className="absolute inset-0 bg-[#FF0000]/5 blur-[30px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    <h3 className="flex items-center gap-2 text-lg font-bold text-white relative z-10">
                        <X className="w-5 h-5 text-[#FF0000]" /> CONS
                    </h3>
                    <div className="space-y-3 relative z-10">
                        {firm.cons.map((con, i) => (
                            <div key={i} className="flex gap-3 p-3 bg-white/5 border border-white/10 hover:border-[#FF0000]/30 transition-colors rounded-lg">
                                <X className="w-5 h-5 text-[#FF0000] shrink-0 mt-0.5" />
                                <span className="text-sm text-gray-300">{con}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* D. INSTRUMENTS & PLATFORMS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Instruments */}
                <div className="bg-[#1A1A1A] p-6 rounded-xl border border-white/5 hover:border-[#FF0000]/30 transition-colors">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-[#FF0000]" />
                        Trading Instruments
                    </h3>
                    <ul className="space-y-3">
                        {firm.instruments.map((inst, i) => (
                            <li key={i} className="flex items-center gap-2 text-[#A3A3A3] text-sm hover:text-white transition-colors">
                                <span className="w-1.5 h-1.5 bg-[#FF0000] rounded-full shadow-[0_0_8px_rgba(255,0,0,0.8)]" />
                                {inst}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Platforms */}
                <div className="bg-[#1A1A1A] p-6 rounded-xl border border-white/5 hover:border-[#FF0000]/30 transition-colors">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <Monitor className="w-5 h-5 text-[#FF0000]" />
                        Platforms
                    </h3>
                    <div className="flex flex-wrap gap-4">
                        {firm.platformNames.map((platform, i) => (
                            <div key={i} className="flex flex-col items-center justify-center w-24 h-24 bg-black/40 rounded-lg border border-white/10 hover:border-[#FF0000] hover:shadow-[0_0_15px_rgba(255,0,0,0.2)] transition-all">
                                <span className="text-2xl font-bold text-white/20 mb-1">{platform[0]}</span>
                                <span className="text-xs font-semibold text-white">{platform}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* E. GEOGRAPHIC AVAILABILITY */}
            <div className="bg-[#1A1A1A] p-6 rounded-xl border border-white/5 hover:border-[#FF0000]/20 transition-colors">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#FF0000]" />
                    Geographic Requirements
                </h3>
                <div className="flex flex-col sm:flex-row gap-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#FF0000]/10 flex items-center justify-center text-[#FF0000] border border-[#FF0000]/20 shadow-[inset_0_2px_10px_rgba(255,0,0,0.1)]">
                            <Globe className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-white font-bold text-sm uppercase tracking-wide">Worldwide Available</div>
                            <div className="text-xs text-[#A3A3A3] mt-0.5">Accepts traders from 180+ countries</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#FF0000]/10 flex items-center justify-center text-[#FF0000] border border-[#FF0000]/20 shadow-[inset_0_2px_10px_rgba(255,0,0,0.1)]">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-white font-bold text-sm uppercase tracking-wide">KYC Required</div>
                            <div className="text-xs text-[#A3A3A3] mt-0.5">ID verification for funded accounts</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* F. RESTRICTED COUNTRIES PILL GRID */}
            <div className="space-y-6 pt-4">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    Restricted Countries
                </h3>
                <div className="flex flex-wrap gap-3">
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
                        <div key={i} className="flex items-center gap-2.5 px-3.5 py-1.5 bg-[#1F1F1F] hover:bg-black border border-white/5 hover:border-white/10 rounded-full text-[13px] text-gray-300 font-medium transition-colors cursor-default hover:shadow-lg">
                            {country.code && (
                                <div className="w-[1.2rem] h-[1.2rem] rounded-full overflow-hidden shrink-0 shadow-sm border border-white/10">
                                    <ReactCountryFlag
                                        countryCode={country.code}
                                        svg
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </div>
                            )}
                            {country.name}
                        </div>
                    ))}
                </div>
            </div>

            {/* G. OUR VERDICT */}
            <div className="bg-[#1A1A1A] p-8 rounded-xl border-l-[6px] border-[#FF0000] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF0000]/5 to-transparent pointer-events-none" />
                
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Our Verdict</h3>
                <p className="text-[#A3A3A3] mb-8 leading-relaxed max-w-4xl relative z-10">
                    {firm.name} offers a solid evaluation structure with competitive profit splits and multiple platform options.
                    The firm's {firm.scalingPlan} scaling plan is well-structured, rewarding consistent performance.
                    With a {firm.rating}/5 rating based on {firm.reviews} reviews, it is a top-tier choice for serious traders.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 bg-black/40 p-6 rounded-xl border border-white/5">
                    <div>
                        <h4 className="font-bold text-white mb-3 tracking-widest text-xs uppercase uppercase text-[#FF0000]">Best For:</h4>
                        <ul className="space-y-2.5 text-sm text-[#A3A3A3]">
                            <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#FF0000]" /> High profit split seekers</li>
                            <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#FF0000]" /> Swing traders</li>
                            <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#FF0000]" /> Multi-asset traders</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-3 tracking-widest text-xs uppercase text-[#FF0000]">Overall Rating:</h4>
                        <div className="flex items-center gap-4">
                            <span className="text-[2.5rem] leading-none font-black text-white">{firm.rating}</span>
                            <div className="flex flex-col">
                                <div className="flex text-[#FFC107] gap-0.5 mb-1">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className={`w-4 h-4 ${i <= Math.round(firm.rating) ? 'fill-current' : 'opacity-20'}`} />)}
                                </div>
                                <span className="text-xs font-bold text-[#A3A3A3] tracking-widest uppercase">/ 5.0 Score</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

function Star({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
}
