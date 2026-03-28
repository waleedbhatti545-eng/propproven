"use client";

import { FirmData } from "@/data/firms";
import { Copy, Check, ExternalLink, CalendarDays, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function TabOffers({ firm }: { firm: FirmData }) {
    const [copiedBtn, setCopiedBtn] = useState<string | null>(null);

    const handleCopy = (code: string, id: string) => {
        navigator.clipboard.writeText(code);
        setCopiedBtn(id);
        setTimeout(() => setCopiedBtn(null), 2000);
    };

    const offers = firm.offers || [];

    if (offers.length === 0) {
        return (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 relative">
                <div className="mb-6 flex items-end justify-between border-b border-white/5 pb-4">
                    <h2 className="text-2xl font-black text-white tracking-tight uppercase">Active Promotions</h2>
                </div>
                <div className="py-24 text-center rounded-[2rem] border border-white/5 bg-[#0a0a0a]">
                    <div className="w-20 h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-6">
                        <Star className="w-8 h-8 text-neutral-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">No Active Offers</h3>
                    <p className="text-neutral-500 max-w-sm mx-auto font-medium">This firm is not currently broadcasting any verified promotions.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="mb-8 flex items-end justify-between border-b border-white/5 pb-4 relative">
                <h2 className="text-2xl font-black text-white tracking-tight uppercase flex items-center gap-3">
                    Active Promotions 
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-orange"></span>
                    </span>
                </h2>
                <span className="text-xs font-bold text-brand-orange bg-brand-orange/10 border border-brand-orange/20 px-3 py-1 rounded-full uppercase tracking-widest shadow-inner">
                    Verified Deal Desk
                </span>
            </div>
            
            <div className="space-y-12">
                {offers.map((offer, index) => (
                    <div key={offer.id || index} className="group relative w-full perspective-1000">
                        {/* Dynamic Core Shadow */}
                        <div className="absolute inset-2 bg-brand-red/10 blur-[60px] rounded-full pointer-events-none group-hover:bg-brand-orange/20 transition-all duration-700 scale-95 group-hover:scale-100" />

                        {/* Outer Glass Card ("The Ticket") */}
                        <div className="relative w-full rounded-[2.5rem] bg-[#050505]/80 backdrop-blur-3xl border border-white/10 overflow-hidden flex flex-col lg:flex-row shadow-2xl transition-all duration-500 group-hover:border-brand-red/30">
                            
                            {/* --- LEFT WING: THE HEADLINE --- */}
                            <div className="relative w-full lg:w-[35%] shrink-0 bg-[#0A0A0A] p-8 lg:p-10 flex flex-col items-start justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-dashed border-white/15">
                                {/* Intense glowing orb inside left wing */}
                                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-brand-red/15 via-transparent to-transparent pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
                                
                                <div className="relative z-10 w-full">
                                    {offer.isNew && (
                                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-red to-brand-orange text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(220,38,38,0.4)] mb-8 animate-pulse">
                                            <Zap className="w-3.5 h-3.5 fill-white" />
                                            Newly Dropped
                                        </div>
                                    )}

                                    <h4 className="text-5xl lg:text-[4rem] font-black text-white tracking-tighter uppercase leading-[0.9] drop-shadow-2xl mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-brand-red transition-all duration-500">
                                        {offer.title}
                                    </h4>

                                    {offer.subtitle && (
                                        <div className="inline-flex items-center font-bold text-brand-orange text-sm uppercase tracking-widest pl-1 border-l-2 border-brand-orange ml-1">
                                            {offer.subtitle}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* --- MIDDLE WING: CONTEXT --- */}
                            <div className="relative flex-grow p-8 lg:p-10 flex flex-col justify-center bg-gradient-to-br from-white/[0.02] to-transparent">
                                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

                                <div className="relative z-10 flex items-center gap-5 mb-6">
                                    <div className="w-16 h-16 rounded-[1.25rem] bg-white shadow-2xl flex items-center justify-center overflow-hidden border border-white/10 shrink-0 transform group-hover:-rotate-2 group-hover:scale-105 transition-all duration-500">
                                        {firm.logo ? (
                                            <img src={firm.logo} alt={firm.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-black font-black text-2xl">{firm.name[0]}</span>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-black text-white tracking-tight">{firm.name}</h4>
                                        {offer.tagLabel && (
                                            <span className="inline-block text-neutral-400 text-xs font-bold mt-1 uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded-md">
                                                {offer.tagLabel}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <p className="text-neutral-300 leading-relaxed font-medium text-lg pr-4 lg:pr-12 relative z-10">
                                    {offer.description}
                                </p>
                            </div>

                            {/* --- RIGHT WING: ACTION (Tear-Away Pass) --- */}
                            <div className="relative w-full lg:w-[28%] shrink-0 bg-[#080808] p-8 flex flex-col justify-center items-center border-t lg:border-t-0 lg:border-l border-white/5">
                                {/* Semi-circle clip-outs mimicking a ticket stub */}
                                <div className="hidden lg:block absolute -left-3 top-[-10px] w-6 h-6 rounded-full bg-[#0a0a0a] border-b border-white/10" />
                                <div className="hidden lg:block absolute -left-3 bottom-[-10px] w-6 h-6 rounded-full bg-[#0a0a0a] border-t border-white/10" />

                                {offer.expiryDate && (
                                    <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-bold uppercase tracking-widest mb-6">
                                        <CalendarDays className="w-4 h-4 text-brand-red" />
                                        Ends: {offer.expiryDate}
                                    </div>
                                )}

                                <div className="w-full flex flex-col gap-4">
                                    {offer.discountCode ? (
                                        <button 
                                            onClick={() => handleCopy(offer.discountCode, offer.id || index.toString())}
                                            className={cn(
                                                "group/code w-full h-[60px] rounded-2xl border-2 flex items-center justify-between px-5 transition-all duration-300 relative overflow-hidden",
                                                copiedBtn === (offer.id || index.toString()) 
                                                    ? "bg-green-500/10 border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.2)]" 
                                                    : "bg-[#0a0a0a] border-white/10 hover:border-brand-red/50 hover:bg-white/5"
                                            )}
                                        >
                                            <div className="flex flex-col items-start relative z-10">
                                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-0.5">Promo Code</span>
                                                <span className={cn(
                                                    "font-mono text-xl font-black tracking-widest uppercase transition-colors",
                                                    copiedBtn === (offer.id || index.toString()) ? "text-green-500" : "text-white"
                                                )}>
                                                    {copiedBtn === (offer.id || index.toString()) ? "COPIED" : offer.discountCode}
                                                </span>
                                            </div>
                                            <div className="relative z-10 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover/code:bg-white/10 transition-colors">
                                                {copiedBtn === (offer.id || index.toString()) ? (
                                                    <Check className="w-5 h-5 text-green-500" />
                                                ) : (
                                                    <Copy className="w-4 h-4 text-neutral-400 group-hover/code:text-white transition-colors" />
                                                )}
                                            </div>
                                        </button>
                                    ) : (
                                        <div className="w-full h-[60px] rounded-2xl border-2 border-dashed border-white/10 bg-transparent flex items-center justify-center opacity-70">
                                            <span className="font-mono text-xs font-bold text-neutral-500 tracking-[0.2em] uppercase">NO CODE LOGGED</span>
                                        </div>
                                    )}

                                    <a href={firm.affiliateLink || firm.websiteUrl || "#"} target="_blank" rel="noopener noreferrer" className="w-full">
                                        <Button className="w-full h-[60px] rounded-2xl bg-white text-black font-black text-lg uppercase tracking-wider hover:bg-brand-orange hover:text-white transition-all duration-300 hover:scale-[1.02] shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(220,38,38,0.3)] flex items-center justify-center gap-3 group/apply border-none">
                                            Activate Offer
                                            <ExternalLink className="w-5 h-5 transition-transform group-hover/apply:translate-x-1 group-hover/apply:-translate-y-1" />
                                        </Button>
                                    </a>
                                </div>

                            </div>
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
