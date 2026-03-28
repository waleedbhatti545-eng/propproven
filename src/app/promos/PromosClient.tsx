"use client";

import React, { useState } from "react";
import { Tag, Copy, CheckCircle2, ArrowRight, Clock, Star, Zap, ShieldCheck, TicketPercent, ExternalLink, Percent, Check, CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function PromosClient({ initialFirms }: { initialFirms: any[] }) {
    const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

    const handleCopy = (code: string, id: string) => {
        navigator.clipboard.writeText(code);
        setCopiedIndex(id);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    // Flatten all relational offers into one master feed + fallback for legacy
    const mergedOffers = initialFirms.flatMap(firm => {
        if (firm.offers && firm.offers.length > 0) {
            return firm.offers.map((off: any) => ({ ...off, firm }));
        }
        // Fallback to legacy single discount to prevent breaking
        if (firm.discountCode) {
            return [{
                id: `legacy-${firm.slug}`,
                firm: firm,
                title: firm.discountAmount || `SAVE ON ${firm.name.toUpperCase()}`,
                subtitle: "VERIFIED ACTIVE",
                description: firm.promoDescription || `Apply our exclusive partner code at checkout to instantly lock in your discount. Valid for all ${firm.name} account evaluation models and platform configurations.`,
                discountCode: firm.discountCode,
                expiryDate: firm.discountExpiry || "Ongoing",
                isNew: false,
                tagLabel: "Exclusive Partner"
            }];
        }
        return [];
    });

    return (
        <div className="min-h-screen bg-[#0A0A0A] relative pb-32 overflow-hidden">
            
            {/* Massive Hero Glow */}
            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-brand-red/10 blur-[180px] rounded-[100%] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 md:pt-40 relative z-10">
                
                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red text-sm font-bold uppercase tracking-widest backdrop-blur-md shadow-[0_0_30px_rgba(220,38,38,0.2)]">
                        <TicketPercent className="w-5 h-5 animate-pulse" />
                        Exclusive Promo Desk
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight uppercase leading-[1.1]">
                        The Ultimate <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-[#FF4444] to-[#ff8888] drop-shadow-[0_0_40px_rgba(220,38,38,0.8)]">
                            Discount Hub
                        </span>
                    </h1>
                    <p className="text-[#A3A3A3] text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed mt-6">
                        We actively track all promotional databases. Use our exact custom-coded Tear-Away passes below to bypass retail pricing and lock in the maximum possible discounts instantly.
                    </p>
                </div>

                {/* Main Promos List - "Tear Away Event Passes" */}
                <div className="space-y-12">
                    {mergedOffers.length > 0 ? mergedOffers.map((offer, index) => {
                        const firm = offer.firm;
                        
                        return (
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
                                                <h4 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                                                    {firm.name}
                                                    {firm.trustpilot && <ShieldCheck className="w-5 h-5 text-emerald-500" />}
                                                </h4>
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
                                                        copiedIndex === (offer.id || index.toString()) 
                                                            ? "bg-green-500/10 border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.2)]" 
                                                            : "bg-[#0a0a0a] border-white/10 hover:border-brand-red/50 hover:bg-white/5"
                                                    )}
                                                >
                                                    <div className="flex flex-col items-start relative z-10">
                                                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-0.5">Promo Code</span>
                                                        <span className={cn(
                                                            "font-mono text-xl font-black tracking-widest uppercase transition-colors",
                                                            copiedIndex === (offer.id || index.toString()) ? "text-green-500" : "text-white"
                                                        )}>
                                                            {copiedIndex === (offer.id || index.toString()) ? "COPIED" : offer.discountCode}
                                                        </span>
                                                    </div>
                                                    <div className="relative z-10 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover/code:bg-white/10 transition-colors">
                                                        {copiedIndex === (offer.id || index.toString()) ? (
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
                        );
                    }) : (
                        <div className="text-center py-20 bg-[#111] rounded-[2.5rem] border border-white/5">
                            <Percent className="w-16 h-16 text-white/20 mx-auto mb-6" />
                            <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">Vault is Empty</h3>
                            <p className="text-[#A3A3A3] text-lg max-w-sm mx-auto font-medium">No verified partner promotions are currently broadcasting. Check back soon for flash sales.</p>
                        </div>
                    )}
                </div>

                {/* Warning / Terms Banner */}
                <div className="mt-16 p-8 rounded-[2.5rem] bg-brand-red/5 border border-brand-red/10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left scale-95 opacity-80 hover:opacity-100 hover:scale-100 transition-all duration-700 hover:bg-brand-red/10">
                    <div className="w-20 h-20 shrink-0 rounded-[1.5rem] bg-brand-red/10 border border-brand-red/20 flex items-center justify-center shadow-inner">
                        <Zap className="w-10 h-10 text-brand-red animate-pulse" />
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-white mb-2 tracking-tight uppercase">Direct Desk Routing</h4>
                        <p className="text-[#A3A3A3] text-sm leading-relaxed font-medium">
                            If you currently hold a high-value account at an unverified competitor prop firm, executing the "Activate Offer" pass above will drop you right directly into an Account Match screening. Simply copy your code, connect with their desk, and instantly trade up.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
