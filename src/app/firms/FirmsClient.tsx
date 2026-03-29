"use client";

import { FirmData } from "@/data/firms";
import { Star, ShieldCheck, ArrowRight, Search, SlidersHorizontal, Bitcoin, CircleDollarSign, LineChart, Flame, Coins, TrendingUp, CheckCircle2, XCircle, Zap, Award, DollarSign, Timer, BarChart3, Filter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ReactCountryFlag from "react-country-flag";
import { useState, useMemo } from "react";

const getAssetIcon = (asset: string) => {
    switch (asset.toLowerCase()) {
        case 'crypto': return <Bitcoin className="w-3.5 h-3.5 text-[#F7931A]" />;
        case 'forex':
        case 'fx': return <CircleDollarSign className="w-3.5 h-3.5 text-[#10B981]" />;
        case 'indices': return <LineChart className="w-3.5 h-3.5 text-[#3B82F6]" />;
        case 'energy': return <Flame className="w-3.5 h-3.5 text-[#EF4444]" />;
        case 'commodities':
        case 'metals': return <Coins className="w-3.5 h-3.5 text-[#EAB308]" />;
        case 'stocks': return <TrendingUp className="w-3.5 h-3.5 text-[#8B5CF6]" />;
        default: return <CircleDollarSign className="w-3.5 h-3.5 text-[#A3A3A3]" />;
    }
};

const getPlatformIcon = (platform: string) => {
    let domain = '';
    switch (platform.toLowerCase()) {
        case 'mt4':
        case 'metatrader 4': domain = 'metatrader4.com'; break;
        case 'mt5':
        case 'metatrader 5': domain = 'metatrader5.com'; break;
        case 'ctrader': domain = 'ctrader.com'; break;
        case 'matchtrader': domain = 'match-trade.com'; break;
        case 'dxtrade': domain = 'devexperts.com'; break;
        case 'tradelocker': domain = 'tradelocker.com'; break;
        default: return null;
    }
    return domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=64` : null;
};

const SORT_OPTIONS = [
    { label: "Rating", value: "rating" },
    { label: "Newest", value: "newest" },
    { label: "Max Funding", value: "funding" },
];

export default function FirmsClient({ initialFirms }: { initialFirms: any[] }) {
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("rating");

    const filteredFirms = useMemo(() => {
        // Enforce Global Status Engine: Only show "Live" public firms
        let results = initialFirms.filter(f => !f.status || f.status === "Live");

        if (search.trim()) {
            const q = search.toLowerCase();
            results = results.filter(f =>
                f.name.toLowerCase().includes(q) ||
                f.location.toLowerCase().includes(q) ||
                f.instruments?.some((i: string) => i.toLowerCase().includes(q)) ||
                f.platformNames?.some((p: string) => p.toLowerCase().includes(q))
            );
        }

        if (sortBy === "rating") {
            results = [...results].sort((a, b) => b.rating - a.rating);
        } else if (sortBy === "newest") {
            results = [...results].sort((a, b) => b.yearsOperational - a.yearsOperational);
        }

        return results;
    }, [search, sortBy, initialFirms]);

    return (
        <div className="min-h-screen bg-[#0A0A0A] relative pb-32 overflow-hidden">

            {/* Massive Ambient Lighting */}
            <div className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-full max-w-6xl h-[700px] bg-brand-red/10 blur-[200px] rounded-[100%] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-brand-red/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-32 md:pt-40 relative z-10">

                {/* Hero Header */}
                <div className="text-center max-w-4xl mx-auto mb-20 space-y-8">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red text-sm font-bold uppercase tracking-widest backdrop-blur-md shadow-[0_0_30px_rgba(220,38,38,0.2)]">
                        <Award className="w-5 h-5 animate-pulse" />
                        Verified Directory
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight uppercase leading-[1.1]">
                        Every Prop Firm,<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-[#FF4444] to-[#ff8888] drop-shadow-[0_0_40px_rgba(220,38,38,0.8)]">
                            Verified & Ranked
                        </span>
                    </h1>
                    <p className="text-[#A3A3A3] text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                        Our complete database of audited proprietary trading firms. Every data point verified, every payout tracked, every rule documented.
                    </p>
                </div>

                {/* Search + Filter Bar */}
                <div className="max-w-4xl mx-auto mb-6">
                    <div className="bg-[#111111]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-3 flex items-center gap-3 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                        <div className="relative flex-1">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#555]" />
                            <input
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search by name, platform, or instrument..."
                                className="w-full bg-[#0A0A0A] border border-white/5 rounded-2xl h-14 pl-14 pr-6 text-white placeholder-[#444] focus:outline-none focus:border-brand-red/30 transition-all font-medium"
                            />
                        </div>
                        <div className="hidden md:flex items-center gap-2">
                            {SORT_OPTIONS.map(opt => (
                                <button
                                    key={opt.value}
                                    onClick={() => setSortBy(opt.value)}
                                    className={`px-5 h-14 rounded-2xl font-bold text-sm uppercase tracking-wider transition-all ${
                                        sortBy === opt.value
                                            ? "bg-brand-red text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                                            : "bg-[#0A0A0A] text-[#666] border border-white/5 hover:text-white hover:border-white/10"
                                    }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Result Count */}
                <div className="flex items-center justify-center gap-2 mb-14 text-sm text-[#555] font-bold tracking-widest uppercase">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    {filteredFirms.length} Verified Firms
                </div>

                {/* Firms List - Horizontal Cards */}
                <div className="space-y-6">
                    {filteredFirms.map((firm, idx) => (
                        <Link href={`/firms/${firm.slug}`} key={firm.slug} className="block group">
                            <div className="relative bg-[#111111]/80 backdrop-blur-xl border border-white/5 rounded-[28px] overflow-hidden transition-all duration-500 hover:border-brand-red/30 hover:shadow-[0_10px_40px_rgba(220,38,38,0.08)]">

                                {/* Rank Number Watermark */}
                                <div className="absolute top-4 left-6 text-[80px] font-black text-white/[0.02] leading-none pointer-events-none group-hover:text-brand-red/[0.04] transition-colors duration-700">
                                    {String(idx + 1).padStart(2, '0')}
                                </div>

                                <div className="flex flex-col lg:flex-row items-stretch">

                                    {/* Left: Logo + Core Info */}
                                    <div className="lg:w-[380px] p-8 flex items-start gap-6 border-b lg:border-b-0 lg:border-r border-white/5 relative">
                                        
                                        {/* Rank Badge */}
                                        <div className="absolute top-6 right-6 w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sm font-black text-[#555] group-hover:bg-brand-red/10 group-hover:text-brand-red group-hover:border-brand-red/20 transition-all">
                                            #{idx + 1}
                                        </div>

                                        <div className="w-20 h-20 shrink-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center shadow-xl group-hover:shadow-brand-red/10 group-hover:scale-105 transition-all duration-500 overflow-hidden">
                                            <Image src={firm.logo} alt={firm.name} width={80} height={80} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0 pt-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h2 className="text-2xl font-bold text-white group-hover:text-brand-red transition-colors truncate">{firm.name}</h2>
                                                {firm.trustpilot && <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />}
                                            </div>
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="flex items-center gap-1 text-yellow-500 bg-yellow-500/10 px-2.5 py-1 rounded-lg text-xs font-bold">
                                                    <Star className="w-3.5 h-3.5 fill-current" /> {firm.rating}
                                                </div>
                                                <span className="text-xs text-[#555] font-medium">{firm.reviews || firm.reviewCount} reviews</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-[#777]">
                                                {firm.countryCode && (
                                                    <ReactCountryFlag
                                                        countryCode={firm.countryCode.toUpperCase()}
                                                        svg
                                                        style={{ width: '18px', height: '14px', borderRadius: '2px' }}
                                                    />
                                                )}
                                                <span className="font-medium">{firm.location}</span>
                                                <span className="text-white/10">·</span>
                                                <span className="text-[#555]">Est. {firm.foundedDate}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Center: Key Metrics */}
                                    <div className="flex-1 px-6 lg:px-10 py-6 lg:py-8">
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-5 mb-6">
                                            <div>
                                                <div className="flex items-center gap-1.5 text-[10px] text-[#555] uppercase font-bold tracking-widest mb-1.5">
                                                    <DollarSign className="w-3 h-3" /> Max Funding
                                                </div>
                                                <div className="text-xl font-black text-white">{firm.maxFunding}</div>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-1.5 text-[10px] text-[#555] uppercase font-bold tracking-widest mb-1.5">
                                                    <BarChart3 className="w-3 h-3" /> Profit Split
                                                </div>
                                                <div className="text-xl font-black text-white">{firm.profitSplit}</div>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-1.5 text-[10px] text-[#555] uppercase font-bold tracking-widest mb-1.5">
                                                    <Timer className="w-3 h-3" /> Payout
                                                </div>
                                                <div className="text-xl font-black text-white">{firm.payoutSpeed}</div>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-1.5 text-[10px] text-[#555] uppercase font-bold tracking-widest mb-1.5">
                                                    <Zap className="w-3 h-3" /> Max Drawdown
                                                </div>
                                                <div className="text-xl font-black text-white">{firm.maxLoss}</div>
                                            </div>
                                        </div>

                                        {/* Bottom Row: Rules + Assets + Platforms */}
                                        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                                            {/* Quick Rules */}
                                            <div className="flex items-center gap-4 text-xs font-bold">
                                                <span className={`flex items-center gap-1 ${firm.newsTrading?.toLowerCase().includes('not') ? 'text-red-400/60' : 'text-emerald-500'}`}>
                                                    {firm.newsTrading?.toLowerCase().includes('not') ? <XCircle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                                                    News
                                                </span>
                                                <span className={`flex items-center gap-1 ${firm.weekendHolding?.toLowerCase().includes('not') ? 'text-red-400/60' : 'text-emerald-500'}`}>
                                                    {firm.weekendHolding?.toLowerCase().includes('not') ? <XCircle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                                                    Weekend
                                                </span>
                                                <span className={`flex items-center gap-1 ${firm.eaTrading?.toLowerCase().includes('not') ? 'text-red-400/60' : 'text-emerald-500'}`}>
                                                    {firm.eaTrading?.toLowerCase().includes('not') ? <XCircle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                                                    EA
                                                </span>
                                            </div>

                                            <div className="w-px h-5 bg-white/5 hidden md:block" />

                                            {/* Assets */}
                                            <div className="flex items-center gap-1.5">
                                                {firm.instruments?.slice(0, 5).map((asset: string) => (
                                                    <div key={asset} className="group/asset relative w-7 h-7 rounded-full bg-[#1A1A1A] border border-white/10 flex items-center justify-center hover:border-white/30 transition-colors cursor-help">
                                                        {getAssetIcon(asset)}
                                                        <div className="absolute bottom-full mb-2 bg-[#0A0A0A] text-white text-[10px] py-1 px-2 rounded-md font-bold opacity-0 group-hover/asset:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-lg border border-white/10 z-50">
                                                            {asset}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="w-px h-5 bg-white/5 hidden md:block" />

                                            {/* Platforms */}
                                            <div className="flex items-center gap-1.5">
                                                {firm.platformNames?.map((platform: string) => {
                                                    const iconUrl = getPlatformIcon(platform);
                                                    return (
                                                        <div key={platform} className="group/plat relative w-7 h-7 rounded-full bg-[#1A1A1A] border border-white/10 flex items-center justify-center hover:border-white/30 transition-colors cursor-help overflow-hidden">
                                                            {iconUrl ? (
                                                                // eslint-disable-next-line @next/next/no-img-element
                                                                <img src={iconUrl} alt={platform} className="w-4 h-4 object-contain" />
                                                            ) : (
                                                                <span className="text-[9px] font-bold text-white">{platform.substring(0, 2)}</span>
                                                            )}
                                                            <div className="absolute bottom-full mb-2 bg-[#0A0A0A] text-white text-[10px] py-1 px-2 rounded-md font-bold opacity-0 group-hover/plat:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-lg border border-white/10 z-50">
                                                                {platform}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: CTA + Promo */}
                                    <div className="lg:w-[260px] p-6 lg:p-8 flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-white/5 bg-gradient-to-br from-transparent to-white/[0.01]">
                                        
                                        {firm.discountCode ? (
                                            <div className="w-full mb-5">
                                                <div className="bg-brand-red/10 border border-brand-red/20 rounded-2xl p-3 text-center">
                                                    <div className="text-[10px] text-brand-red uppercase font-bold tracking-widest mb-1">Exclusive Code</div>
                                                    <code className="text-lg font-black text-white tracking-widest">{firm.discountCode}</code>
                                                    <div className="mt-1">
                                                        <span className="bg-brand-red text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                                                            {firm.discountAmount}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center mb-5">
                                                <div className="text-[10px] text-[#555] uppercase font-bold tracking-widest mb-1">Starting From</div>
                                                <div className="text-3xl font-black text-white">${firm.accounts?.[0]?.price || '—'}</div>
                                            </div>
                                        )}

                                        <div className="w-full bg-white/5 hover:bg-brand-red text-[#999] hover:text-white border border-white/10 hover:border-brand-red rounded-2xl h-12 flex items-center justify-center font-bold uppercase tracking-widest text-xs transition-all group-hover:bg-brand-red group-hover:text-white group-hover:border-brand-red group-hover:shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                                            View Details <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Empty State */}
                {filteredFirms.length === 0 && (
                    <div className="text-center py-24 bg-[#111] rounded-3xl border border-white/5">
                        <Search className="w-16 h-16 text-white/10 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-2">No firms found</h3>
                        <p className="text-[#555]">Try adjusting your search query to find what you're looking for.</p>
                    </div>
                )}

            </div>
        </div>
    );
}
