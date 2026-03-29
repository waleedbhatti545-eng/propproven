"use client";

import { FirmData } from "@/data/firms";
import { Banknote, LineChart, Bitcoin, Layers } from "lucide-react";

export function SectionInstruments({ firm }: { firm: FirmData }) {

    const items = [
        { name: "Forex", leverage: firm.leverage.forex ?? "1:100", icon: Banknote },
        { name: "Indices", leverage: firm.leverage.indices ?? "1:50", icon: LineChart },
        { name: "Crypto", leverage: firm.leverage.crypto ?? "1:5", icon: Bitcoin },
        { name: "Commodities", leverage: firm.leverage.commodities ?? "1:30", icon: Layers },
    ];

    return (
        <div className="relative">
            {/* Global Section Glow */}
            <div className="absolute top-0 right-[20%] w-[500px] h-[300px] bg-brand-red/5 blur-[120px] rounded-full pointer-events-none" />

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 tracking-tight flex items-center gap-4 relative z-10">
                Instruments & Assets
                <div className="h-[2px] w-12 bg-gradient-to-r from-brand-red to-transparent rounded-full opacity-60 hidden md:block" />
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative z-10">
                {items.map((item) => (
                    <div
                        key={item.name}
                        className="relative group [perspective:1000px]"
                    >
                        {/* Ambient Card Glow */}
                        <div className="absolute inset-0 bg-brand-red/10 blur-[30px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                        
                        <div className="relative bg-[#111111]/80 backdrop-blur-xl border border-white/5 group-hover:border-brand-red/30 rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,0,0,0.15)] overflow-hidden h-full flex flex-col justify-between">
                            
                            {/* Inner Shimmer */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1A1A1A] to-brand-red/20 border border-brand-red/20 flex items-center justify-center mb-6 shadow-[inset_0_2px_10px_rgba(255,0,0,0.2)] group-hover:shadow-[0_0_25px_rgba(255,0,0,0.4)] group-hover:scale-110 transition-all duration-500 origin-bottom-left">
                                    <item.icon className="w-7 h-7 text-brand-red group-hover:text-white transition-colors" />
                                </div>

                                <div className="space-y-1.5">
                                    <h3 className="text-gray-400 text-[13px] font-bold tracking-widest uppercase opacity-80 group-hover:opacity-100 transition-opacity">{item.name}</h3>
                                    <div className="text-2xl md:text-3xl font-black tracking-tight text-white group-hover:text-brand-red transition-colors duration-500">
                                        <span className="text-xs md:text-[13px] font-bold text-gray-500 mr-1.5 align-middle uppercase tracking-widest">up to</span>
                                        {item.leverage}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
