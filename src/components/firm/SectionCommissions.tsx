"use client";

import { FirmData } from "@/data/firms";

export function SectionCommissions({ firm }: { firm: FirmData }) {

    const data = [
        { asset: "Forex", commission: firm.commissions.forex },
        { asset: "Indices", commission: firm.commissions.indices },
        { asset: "Commodities", commission: firm.commissions.commodities },
        { asset: "Crypto", commission: firm.commissions.crypto },
    ];

    return (
        <div className="relative pt-10 border-t border-white/5">
            <div className="absolute top-[20%] right-[30%] w-[400px] h-[200px] bg-[#FF0000]/5 blur-[120px] rounded-full pointer-events-none" />

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 flex items-center gap-4 relative z-10">
                Commissions
                <div className="h-[2px] w-12 bg-gradient-to-r from-[#FF0000] to-transparent rounded-full opacity-60 hidden md:block" />
            </h2>

            <div className="bg-[#111111]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden relative group transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-[#FF0000]/30 z-10 max-w-4xl">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="grid grid-cols-2 p-5 md:p-6 bg-black/60 border-b border-white/5 text-[12px] md:text-[13px] font-bold text-gray-400 uppercase tracking-widest relative z-10">
                    <div>Asset Class</div>
                    <div>Commission</div>
                </div>

                <div className="divide-y divide-white/5 relative z-10">
                    {data.map((item) => (
                        <div key={item.asset} className="grid grid-cols-2 p-5 md:p-6 hover:bg-[#FF0000]/5 transition-all duration-300 group/row border-l-2 border-transparent hover:border-[#FF0000] cursor-default bg-black/20">
                            <div className="text-white font-medium flex items-center gap-4 transition-transform duration-300 group-hover/row:translate-x-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-white/20 group-hover/row:bg-[#FF0000] group-hover/row:shadow-[0_0_10px_rgba(255,0,0,0.8)] transition-all duration-300" />
                                <span className="group-hover/row:text-[#FF0000] transition-colors">{item.asset}</span>
                            </div>
                            <div className="text-gray-300 font-mono tracking-wide group-hover/row:text-white transition-colors flex items-center">
                                {item.commission}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <p className="mt-5 text-sm font-medium text-gray-500 flex items-center gap-2 relative z-10 opacity-70 max-w-4xl">
                <span className="text-[#FF0000]">*</span> Commissions are per lot round turn unless specified otherwise.
            </p>
        </div>
    );
}
