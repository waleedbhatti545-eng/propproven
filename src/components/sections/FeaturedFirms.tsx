"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight, Check, Monitor, Zap, Copy, Trophy, Percent } from "lucide-react";
import Link from "next/link";
import { FirmData } from "@/data/firms";
import { usePathname } from "next/navigation";

const formatFunding = (val: string) => {
    if (!val) return val;
    if (val.toUpperCase().includes('M') || val.toUpperCase().includes('K')) {
        return val.replace(/\s/g, '');
    }
    const cleanNum = val.replace(/,/g, '').replace('$', '').trim();
    const num = parseInt(cleanNum, 10);
    if (isNaN(num)) return val;
    
    if (num >= 1000000) {
        return `$${num / 1000000}M`;
    } else if (num >= 1000) {
        return `$${num / 1000}K`;
    }
    return `$${num}`;
};

export function FeaturedFirms({ firms }: { firms: FirmData[] }) {
    const pathname = usePathname();
    const isFutures = pathname?.startsWith("/futures");
    const firmBasePath = isFutures ? "/futures/firms" : "/firms";
    const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

    const handleCopy = (slug: string, code: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!code) return;
        navigator.clipboard.writeText(code);
        setCopiedStates(prev => ({ ...prev, [slug]: true }));
        setTimeout(() => {
            setCopiedStates(prev => ({ ...prev, [slug]: false }));
        }, 2000);
    };

    // Enforce Global Status Engine: Only "Live" featured firms are mapped
    const finalFirms = firms.filter(f => f.is_featured === true && (!f.status || f.status === "Live")).sort((a, b) => (a.featured_order || 0) - (b.featured_order || 0));

    // If no firms are explicitly featured, we hide the section entirely to respect admin settings
    if (finalFirms.length === 0) return null;

    let gridClass = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    if (finalFirms.length === 1) {
        gridClass = "grid-cols-1 max-w-md mx-auto";
    } else if (finalFirms.length === 2) {
        gridClass = "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto";
    }

    return (
        <section className="relative w-full py-12 md:py-16 px-4 md:px-8 bg-dark-bg overflow-hidden">

            {/* Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-brand-red/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto">

                {/* Section Header */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-3xl md:text-6xl font-bold text-white tracking-tight uppercase">
                        <span>TOP</span>
                        <span className="hidden md:inline">RATED</span>
                        <img
                            src={isFutures ? "/images/futures-logo.png" : "/images/logo.png"}
                            alt="PropProven"
                            className="h-14 md:h-28 w-auto object-contain opacity-100"
                        />
                        <span>FIRMS</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Compare key features, spreads, and exclusive discounts for the industry's leading prop firms.
                    </p>
                </div>

                {/* Cards Grid - Dynamic Centering */}
                <div className={`grid gap-8 w-full ${gridClass}`}>
                    {finalFirms.map((firm, i) => (
                        <Link
                            href={`${firmBasePath}/${firm.slug}`}
                            key={firm.slug}
                            className={`group relative p-1 rounded-3xl bg-gradient-to-b from-white/10 to-transparent transition-all duration-500 hover:-translate-y-2 cursor-pointer`}
                        >
                            {/* Inner Card */}
                            <div className="relative h-full bg-[#0a0a0a] rounded-[22px] p-6 flex flex-col border border-white/5 overflow-hidden">

                                {/* Glow Effect */}
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-${firm.color}-500/20 to-transparent`} />

                                {/* Header */}
                                <div className="relative z-10 flex items-start justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-colors shadow-lg overflow-hidden">
                                            {firm.logo ? (
                                                <img src={firm.logo} alt={firm.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-xl font-bold text-white">{firm.name[0]}</span>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white leading-tight group-hover:text-brand-red transition-colors">{firm.name}</h3>
                                            <div className="flex items-center gap-1.5 mt-1.5">
                                                <div className="flex items-center bg-white/5 rounded px-1.5 py-0.5">
                                                    <Star className="w-3 h-3 fill-[#00B67A] text-[#00B67A]" />
                                                    <Star className="w-3 h-3 fill-[#00B67A] text-[#00B67A]" />
                                                    <Star className="w-3 h-3 fill-[#00B67A] text-[#00B67A]" />
                                                    <Star className="w-3 h-3 fill-[#00B67A] text-[#00B67A]" />
                                                    <Star className="w-3 h-3 fill-[#00B67A] text-[#00B67A]" />
                                                </div>
                                                <span className="text-xs text-gray-400 font-medium">{firm.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Badge */}
                                    {firm.badge && (
                                        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md group-hover:bg-brand-red/10 group-hover:border-brand-red/20 transition-all">
                                            <span className="text-[10px] font-bold text-white uppercase tracking-wider whitespace-nowrap">{firm.badge}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Detailed Stats Grid - 2x2 */}
                                <div className="relative z-10 grid grid-cols-2 gap-3 mb-6">
                                    {/* Max Funding */}
                                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 group-hover:bg-white/10 transition-colors">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Trophy className="w-3.5 h-3.5 text-brand-red" />
                                            <span className="text-[10px] text-gray-400 uppercase tracking-wide">Max Funding</span>
                                        </div>
                                        <div className="text-base font-bold text-white">{firm.maxFunding ? formatFunding(firm.maxFunding) : "-"}</div>
                                    </div>
                                    {/* Profit Split */}
                                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 group-hover:bg-white/10 transition-colors">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Percent className="w-3.5 h-3.5 text-brand-red" />
                                            <span className="text-[10px] text-gray-400 uppercase tracking-wide">Profit Split</span>
                                        </div>
                                        <div className="text-base font-bold text-white">{firm.profitSplit}</div>
                                    </div>
                                    {/* Platforms */}
                                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 group-hover:bg-white/10 transition-colors">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Monitor className="w-3.5 h-3.5 text-brand-red" />
                                            <span className="text-[10px] text-gray-400 uppercase tracking-wide">Platforms</span>
                                        </div>
                                        <div className="text-xs font-semibold text-white truncate">
                                            {firm.platformNames.join(", ")}
                                        </div>
                                    </div>
                                    {/* Targets */}
                                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 group-hover:bg-white/10 transition-colors">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Zap className="w-3.5 h-3.5 text-brand-red" />
                                            <span className="text-[10px] text-gray-400 uppercase tracking-wide">Targets</span>
                                        </div>
                                        <div className="text-base font-bold text-white">{firm.profitTarget}</div>
                                    </div>
                                </div>

                                {/* Discount Code Section */}
                                <div className="relative z-10 mb-6 mx-1" onClick={(e) => handleCopy(firm.slug, firm.discountCode || "PROVEN", e)}>
                                    <div className="flex items-center justify-between p-3 rounded-xl border border-dashed border-white/20 bg-white/5 hover:border-brand-red/40 hover:bg-brand-red/5 transition-all group/code cursor-copy">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-gray-400 uppercase">Exclusive Code</span>
                                            <span className="text-sm font-mono font-bold text-white tracking-wider">{firm.discountCode || "PROVEN"}</span>
                                        </div>
                                        <div className="h-8 w-8 flex items-center justify-center text-gray-400 group-hover/code:text-white group-hover/code:bg-white/10 rounded-md transition-colors">
                                            {copiedStates[firm.slug] ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                                        </div>
                                    </div>
                                </div>

                                {/* Features List */}
                                <ul className="relative z-10 space-y-2 mb-8 flex-grow">
                                    {firm.pros.slice(0, 3).map((pro, idx) => (
                                        <li key={idx} className="flex items-center gap-2.5 text-xs font-medium text-gray-400">
                                            <Check className="w-3.5 h-3.5 text-green-500" />
                                            {pro}
                                        </li>
                                    ))}
                                </ul>

                                {/* Price & Actions */}
                                <div className="relative z-10 mt-auto border-t border-white/10 pt-4">
                                    <div className="flex items-end justify-between mb-4">
                                        <span className="text-xs text-gray-400">Values from</span>
                                        <span className="text-2xl font-bold text-white">
                                            ${firm.accounts && firm.accounts.length > 0 ? Math.min(...firm.accounts.map((a: any) => a.price)) : "N/A"}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 hover:text-white text-xs">
                                            View Details
                                        </Button>
                                        <Button className="w-full bg-brand-red hover:bg-brand-orange text-white font-bold text-xs group-hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all">
                                            Visit Site
                                        </Button>
                                    </div>
                                </div>

                            </div>
                        </Link>
                    ))}
                </div>

                {/* View All */}
                <div className="mt-8 text-center">
                    <Button variant="link" className="text-gray-400 hover:text-white text-base">
                        View All verified firms <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>

            </div>
        </section>
    );
}
