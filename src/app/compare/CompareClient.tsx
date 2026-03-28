"use client";

import React, { useState } from "react";
import { ArrowRightLeft, CheckCircle2, XCircle, Star, ShieldCheck, ChevronDown, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// The metrics we want to compare row by row
const COMPARISON_METRICS = [
    { category: "Basic Info", id: "founded", label: "Founded", getValue: (f: any) => f.foundedDate },
    { category: "Basic Info", id: "country", label: "Headquarters", getValue: (f: any) => f.location },
    { category: "Basic Info", id: "trustpilot", label: "Trustpilot Score", getValue: (f: any) => f.rating },
    { category: "Trading Rules", id: "dailyLoss", label: "Daily Drawdown", getValue: (f: any) => f.dailyLoss },
    { category: "Trading Rules", id: "maxLoss", label: "Overall Drawdown", getValue: (f: any) => f.maxLoss },
    { category: "Trading Rules", id: "profitTarget", label: "Profit Target", getValue: (f: any) => f.profitTarget },
    { category: "Trading Rules", id: "newsTrading", label: "News Trading", getValue: (f: any) => f.newsTrading },
    { category: "Trading Rules", id: "weekendHolding", label: "Weekend Holding", getValue: (f: any) => f.weekendHolding },
    { category: "Trading Conditions", id: "platforms", label: "Platforms", getValue: (f: any) => (f.platformNames || []).join(", ") },
    { category: "Trading Conditions", id: "leverageFx", label: "Leverage (FX)", getValue: (f: any) => f.leverage?.forex },
    { category: "Trading Conditions", id: "leverageCrypto", label: "Leverage (Crypto)", getValue: (f: any) => f.leverage?.crypto },
    { category: "Payouts & Scaling", id: "profitSplit", label: "Profit Split", getValue: (f: any) => f.profitSplit },
    { category: "Payouts & Scaling", id: "payoutSpeed", label: "Payout Speed", getValue: (f: any) => f.payoutSpeed },
    { category: "Payouts & Scaling", id: "scaling", label: "Scaling Plan", getValue: (f: any) => f.scalingPlan },
];

export default function CompareClient({ initialFirms }: { initialFirms: any[] }) {
    // Default select first 3 firms
    const [selectedSlugs, setSelectedSlugs] = useState<string[]>([
        initialFirms[0]?.slug,
        initialFirms[1]?.slug,
        initialFirms[2]?.slug || initialFirms[0]?.slug // fallback if only 2 firms exist
    ]);

    const handleSelectFirm = (columnIndex: number, slug: string) => {
        const newSlugs = [...selectedSlugs];
        newSlugs[columnIndex] = slug;
        setSelectedSlugs(newSlugs);
    };

    // Get categories uniquely
    const categories = Array.from(new Set(COMPARISON_METRICS.map(m => m.category)));

    // Helper to render boolean-like text (Allowed/Not Allowed) nicely
    const renderValue = (val: string | number) => {
        if (val === undefined || val === null) return <span className="text-gray-700">-</span>;
        const strVal = String(val);
        const lower = strVal.toLowerCase();
        
        if (lower.includes("not allowed") || lower === "no") {
            return (
                <span className="flex items-center gap-1.5 text-red-400 font-medium">
                    <XCircle className="w-4 h-4" /> {strVal}
                </span>
            );
        }
        if (lower.includes("allowed") || lower === "yes" || lower === "zero") {
            return (
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <CheckCircle2 className="w-4 h-4" /> {strVal}
                </span>
            );
        }
        return <span className="text-white font-medium">{strVal}</span>;
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] relative pb-24">
            
            {/* Header Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[400px] bg-brand-red/10 blur-[150px] rounded-[100%] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 relative z-10">
                
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight flex items-center justify-center gap-4">
                        <ArrowRightLeft className="w-10 h-10 md:w-14 md:h-14 text-brand-red" />
                        Compare Firms
                    </h1>
                    <p className="text-[#A3A3A3] text-lg max-w-2xl mx-auto font-medium">
                        Pit top proprietary trading firms head-to-head. Select up to 3 firms below and compare their exact trading conditions, rules, and payout speeds to find your perfect match.
                    </p>
                </div>

                {/* Main Comparison Table Wrapper */}
                <div className="bg-[#111111]/80 backdrop-blur-2xl border border-white/5 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                    <div className="overflow-x-auto scrollbar-hide">
                        
                        {/* Table */}
                        <table className="w-full text-left min-w-[900px]">
                            {/* THEAD - Firm Selection & Logos */}
                            <thead>
                                <tr>
                                    {/* Empty Corner */}
                                    <th className="w-1/4 p-6 border-b border-black/20 bg-[#161616]">
                                        <div className="text-[#A3A3A3] text-sm uppercase font-bold tracking-widest pl-2">Select Firms to Compare:</div>
                                    </th>

                                    {/* Firm Columns */}
                                    {selectedSlugs.map((slug, columnIndex) => {
                                        const firm = initialFirms.find(f => f.slug === slug);
                                        return (
                                            <th key={`header-${columnIndex}`} className="w-1/4 p-6 border-b border-black/20 bg-[#161616] border-l border-black/10 relative">
                                                
                                                {/* Dropdown Selector */}
                                                <div className="relative mb-6">
                                                    <select 
                                                        className="w-full appearance-none bg-[#0a0a0a] border border-[#222] text-white font-bold py-3 px-4 rounded-xl outline-none focus:border-brand-red transition-colors shadow-inner"
                                                        value={slug}
                                                        onChange={(e) => handleSelectFirm(columnIndex, e.target.value)}
                                                    >
                                                        {initialFirms.map(f => (
                                                            <option key={f.slug} value={f.slug}>{f.name}</option>
                                                        ))}
                                                    </select>
                                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                                </div>

                                                {/* Firm Info Card inside Header */}
                                                {firm ? (
                                                    <div className="flex flex-col items-center text-center space-y-4">
                                                        <div className="w-24 h-24 bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-xl flex items-center justify-center overflow-hidden">
                                                            <Image src={firm.logo} alt={firm.name} width={96} height={96} className="w-full h-full object-cover" />
                                                        </div>
                                                        <div>
                                                            <h2 className="text-xl font-bold text-white mb-1 flex items-center justify-center gap-1.5">
                                                                {firm.name}
                                                                {firm.trustpilot && <ShieldCheck className="w-4 h-4 text-emerald-500" />}
                                                            </h2>
                                                            <div className="flex items-center justify-center gap-1 text-yellow-500 bg-yellow-500/10 w-fit mx-auto px-2 py-0.5 rounded text-xs font-bold">
                                                                <Star className="w-3 h-3 fill-current" />
                                                                {firm.rating}
                                                            </div>
                                                        </div>
                                                        <Link href={firm.websiteUrl || `/firms/${firm.slug}`} target="_blank" rel="noopener noreferrer" className="w-full">
                                                            <Button className="w-full bg-brand-red hover:bg-[#EF4444] text-white font-bold h-10 shadow-[0_4px_15px_rgba(220,38,38,0.3)]">
                                                                Visit Source <ExternalLink className="w-4 h-4 ml-2" />
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                ) : (
                                                    <div className="h-[200px] flex items-center justify-center text-gray-600 font-medium">None Selected</div>
                                                )}
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>

                            <tbody>
                                {categories.map(category => (
                                    <React.Fragment key={category}>
                                        {/* Category Divider Header */}
                                        <tr>
                                            <td colSpan={4} className="bg-[#1A1A1A] py-3 px-8 text-white font-black uppercase tracking-[0.2em] text-xs border-y border-black/40 shadow-inner">
                                                {category}
                                            </td>
                                        </tr>
                                        
                                        {/* Metrics rows for this category */}
                                        {COMPARISON_METRICS.filter(m => m.category === category).map((metric, rowIdx) => (
                                            <tr key={metric.id} className="group hover:bg-white/[0.02] transition-colors">
                                                {/* Left Label */}
                                                <td className="p-4 pl-8 border-b border-white/[0.02] font-semibold text-[#A3A3A3] text-sm">
                                                    {metric.label}
                                                </td>
                                                
                                                {/* Column Data */}
                                                {selectedSlugs.map((slug, colIdx) => {
                                                    const firm = initialFirms.find(f => f.slug === slug);
                                                    return (
                                                        <td key={`${metric.id}-${colIdx}`} className="p-4 border-b border-l border-white/[0.02] text-sm">
                                                            {firm ? renderValue(metric.getValue(firm)) : <span className="text-gray-700">-</span>}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                ))}

                                {/* Final Verification Row */}
                                <tr>
                                    <td className="p-6"></td>
                                    {selectedSlugs.map((slug, colIdx) => {
                                        const firm = initialFirms.find(f => f.slug === slug);
                                        return (
                                            <td key={`footer-${colIdx}`} className="p-6 text-center border-l border-white/[0.02]">
                                                {firm && (
                                                    <Link href={`/firms/${firm.slug}`}>
                                                        <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:text-white hover:border-brand-red bg-transparent">
                                                            Read Full Review
                                                        </Button>
                                                    </Link>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            </tbody>

                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
