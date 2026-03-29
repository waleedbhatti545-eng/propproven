"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Star, TrendingUp, Monitor, Globe, Award, Copy, Check, Heart, ChevronRight, SlidersHorizontal, Sparkles, Zap, ChevronDown, CheckCircle2, Bitcoin, CircleDollarSign, LineChart, Flame, Coins, ArrowUp, ArrowDown, Search } from "lucide-react";
import Link from "next/link";
import { FirmData } from "@/data/firms";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
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

// Helper to map country code to flag emoji (simple version) or visual
const countryFlags: Record<string, string> = {
    cz: "🇨🇿",
    us: "🇺🇸",
    ae: "🇦🇪",
    gb: "🇬🇧",
    lc: "🇱🇨",
    hk: "🇭🇰",
    hu: "🇭🇺",
    za: "🇿🇦",
    ca: "🇨🇦",
    au: "🇦🇺",
    sg: "🇸🇬",
    mt: "🇲🇹",
    cy: "🇨🇾",
    sc: "🇸🇨",
    bs: "🇧🇸",
    vg: "🇻🇬",
    ky: "🇰🇾",
    de: "🇩🇪",
    fr: "🇫🇷",
    es: "🇪🇸",
    it: "🇮🇹",
    nl: "🇳🇱",
    se: "🇸🇪",
    ch: "🇨🇭",
    // Add more as needed
};

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
        case 'tradovate': domain = 'tradovate.com'; break;
        case 'ninjatrader': domain = 'ninjatrader.com'; break;
        case 'quantower': domain = 'quantower.com'; break;
        case 'rithmic': domain = 'rithmic.com'; break;
        case 'sierra chart': domain = 'sierrachart.com'; break;
        default: return null;
    }
    return domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=64` : null;
};

const OperationYearsWidget = ({ years }: { years: number }) => {
    const cappedYears = Math.min(years || 1, 10);
    const radius = 14;
    const circumference = 2 * Math.PI * radius;
    const segmentWidth = circumference / 10;
    const gap = 2;

    return (
        <div className="relative w-10 h-10 flex items-center justify-center group/years mx-auto">
            <svg width="36" height="36" viewBox="0 0 36 36" className="transform -rotate-90">
                {Array.from({ length: 10 }).map((_, i) => {
                    const isActive = i < cappedYears;
                    return (
                        <circle
                            key={i}
                            cx="18"
                            cy="18"
                            r={radius}
                            fill="none"
                            stroke={isActive ? "var(--brand-red)" : "#2A2A2A"}
                            strokeWidth="3.5"
                            strokeDasharray={`${segmentWidth - gap} ${circumference}`}
                            strokeDashoffset={-i * segmentWidth}
                            strokeLinecap="round"
                            className="transition-all duration-500"
                        />
                    );
                })}
            </svg>
            <span className="absolute text-[11px] font-black text-white">{years}{years >= 10 ? '+' : ''}</span>
            
            <div className="absolute bottom-full mb-2 bg-[#111] text-white text-[10px] py-1 px-2 rounded-md font-bold opacity-0 group-hover/years:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-[0_5px_15px_rgba(0,0,0,0.5)] border border-white/10 z-50 uppercase tracking-widest flex items-center gap-1">
                Years Operating
            </div>
        </div>
    );
};

export function PopularFirms({ firms }: { firms: FirmData[] }) {
    const pathname = usePathname();
    const isFutures = pathname?.startsWith("/futures");
    const firmBasePath = isFutures ? "/futures/firms" : "/firms";
    const [activeFilter, setActiveFilter] = useState("Popular");
    const [sortCol, setSortCol] = useState<string | null>(null);
    const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
    const [visibleCount, setVisibleCount] = useState(10);
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

    const handleSort = (col: string) => {
        if (sortCol === col) {
            setSortDir(sortDir === "asc" ? "desc" : "asc");
        } else {
            setSortCol(col);
            setSortDir("desc");
        }
    };

    const processedFirms = useMemo(() => {
        // Enforce Global Status Engine: Only "Live" firms should ever display here
        let result = [...firms].filter(f => !f.status || f.status === "Live");

        // 1. Apply Pill Filters
        if (activeFilter === "Popular") {
            // Explicit Database Curation logic: Show ONLY firms designated as popular, strictly ordered
            result = result.filter(f => f.is_popular === true).sort((a, b) => (a.popular_order || 0) - (b.popular_order || 0));
        } else if (activeFilter === "Favorite KOS") {
            // Pseudo KOS logic: Firms above 4.8 rating only
            result = result.filter(f => f.rating >= 4.8);
        } else if (activeFilter === "News") {
            // Pseudo News logic: Filter firms that support news trading
            result = result.filter(f => f.newsTrading && (f.newsTrading.toLowerCase() === "yes" || f.newsTrading.toLowerCase() === "allowed"));
        } else if (activeFilter === "All") {
            // Do nothing, show all
        }

        // 2. Apply Column Sorting
        if (sortCol) {
            result.sort((a, b) => {
                let valA: any = a[sortCol as keyof FirmData];
                let valB: any = b[sortCol as keyof FirmData];

                // Override for Reviews Column (Map to rating)
                if (sortCol === "reviews") {
                    valA = a.rating;
                    valB = b.rating;
                }
                
                // Override for Country Column
                if (sortCol === "countryCode") {
                    valA = a.countryCode || "zz";
                    valB = b.countryCode || "zz";
                }

                if (typeof valA === "string" && typeof valB === "string") {
                    return sortDir === "asc" 
                        ? valA.localeCompare(valB) 
                        : valB.localeCompare(valA);
                }
                
                if (typeof valA === "number" && typeof valB === "number") {
                    return sortDir === "asc" ? valA - valB : valB - valA;
                }

                return 0;
            });
        }

        return result;
    }, [firms, activeFilter, sortCol, sortDir]);

    const displayedFirms = processedFirms.slice(0, visibleCount);

    const renderSortIcon = (col: string) => {
        if (sortCol !== col) return <span className="inline-block ml-1 opacity-20">↕</span>;
        return sortDir === "asc" 
            ? <ArrowUp className="inline-block w-3 h-3 ml-1 text-brand-red animate-in fade-in" /> 
            : <ArrowDown className="inline-block w-3 h-3 ml-1 text-brand-red animate-in fade-in" />;
    };

    return (
        <section className="py-8 md:py-12 bg-[#0F0F0F] relative overflow-hidden" id="popular-firms">
            {/* Ambient background glow - Red/Brand aligned */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-brand-red/5 blur-[150px] rounded-full pointer-events-none opacity-40" />

            <div className="max-w-[1280px] mx-auto px-4 md:px-5 relative z-10">

                {/* Header - Matching Featured Firms Style Exactly */}
                <div className="text-center mb-8 md:mb-16 space-y-4">
                    <h2 className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-3xl md:text-6xl font-black text-white tracking-tight uppercase">
                        <span>MOST</span>
                        <span className="text-brand-red drop-shadow-[0_0_20px_rgba(220,38,38,0.4)]">POPULAR</span>
                        <span className="hidden md:inline">FIRMS</span>
                    </h2>
                    <p className="text-[#A3A3A3] text-lg max-w-2xl mx-auto font-medium">
                        Explore the trending prop firms trusted by thousands of traders worldwide.
                    </p>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-10 gap-6 md:gap-8 w-full z-20 relative px-1">
                    <div className="flex items-center gap-3 w-full overflow-x-auto pb-4 md:pb-0 scrollbar-hide md:flex-wrap pt-2 -mt-2">
                        {/* All Filters Button */}
                        <Button variant="outline" className="h-[38px] rounded-full border-[#2A2A2A] bg-transparent text-[#A3A3A3] hover:text-white hover:border-brand-red hover:bg-transparent gap-2 text-sm font-medium px-5 transition-all shrink-0 border-dashed">
                            <SlidersHorizontal className="w-4 h-4" /> Attributes
                        </Button>

                        <div className="w-px h-6 bg-white/10 mx-2 hidden md:block" />

                        {/* Pills */}
                        {["Popular", "Favorite KOS", "News", "All"].map((filter) => (
                            <Button 
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`h-[38px] rounded-full gap-2 text-sm font-semibold transition-all shrink-0 px-6 border ${
                                    activeFilter === filter 
                                        ? "bg-brand-red text-white hover:bg-[#EF4444] shadow-[0_0_20px_rgba(220,38,38,0.3)] border-brand-red scale-[1.02]" 
                                        : "bg-transparent text-[#A3A3A3] hover:text-white border-[#2A2A2A] hover:border-white/20"
                                }`}
                            >
                                {filter === "Popular" && <Globe className="w-4 h-4" />}
                                {filter === "Favorite KOS" && <Heart className="w-4 h-4" />}
                                {filter}
                            </Button>
                        ))}
                    </div>

                    <div className="flex items-center justify-center gap-3 bg-[#111] px-5 py-2.5 rounded-[14px] border border-[#222] shadow-inner flex-shrink-0 w-full md:w-auto min-w-[140px]">
                        <span className="text-[#A3A3A3] text-[11px] font-black tracking-widest uppercase">Valid Firms</span>
                        <div className="w-px h-4 bg-white/10" />
                        <span className="text-white font-black text-lg drop-shadow-md">{processedFirms.length}</span>
                    </div>
                </div>

                {/* ===== TABLE VIEW (all screens) ===== */}
                <div className="w-full overflow-x-auto pb-8 scrollbar-hide">
                    {processedFirms.length > 0 ? (
                        <table className="w-full text-left border-separate border-spacing-y-2 md:border-spacing-y-3">
                            <thead>
                                <tr className="text-[10px] lg:text-[11px] uppercase text-[#777] tracking-[0.1em] lg:tracking-[0.2em] font-black select-none">
                                    <th className="pb-3 md:pb-4 pl-2 md:pl-4 w-[40px] md:w-[60px]"></th>
                                    <th 
                                        className={`pb-3 md:pb-4 cursor-pointer hover:text-white transition-colors ${sortCol === "name" ? "text-brand-red drop-shadow-md" : ""}`}
                                        onClick={() => handleSort("name")}
                                    >
                                        Entity {renderSortIcon("name")}
                                    </th>
                                    <th 
                                        className={`pb-4 cursor-pointer hover:text-white transition-colors ${sortCol === "reviews" ? "text-brand-red drop-shadow-md" : ""}`}
                                        onClick={() => handleSort("reviews")}
                                    >
                                        Statistics {renderSortIcon("reviews")}
                                    </th>
                                    <th 
                                        className={`pb-4 cursor-pointer hover:text-white transition-colors ${sortCol === "countryCode" ? "text-brand-red drop-shadow-md" : ""}`}
                                        onClick={() => handleSort("countryCode")}
                                    >
                                        Base {renderSortIcon("countryCode")}
                                    </th>
                                    <th 
                                        className={`pb-4 text-center cursor-pointer hover:text-white transition-colors ${sortCol === "yearsOperational" ? "text-brand-red drop-shadow-md" : ""}`}
                                        onClick={() => handleSort("yearsOperational")}
                                    >
                                        Years {renderSortIcon("yearsOperational")}
                                    </th>
                                    <th className="pb-4">Assets</th>
                                    <th className="pb-4">Platforms</th>
                                    <th className="pb-3 md:pb-4 text-center">Max Funding</th>
                                    <th className="pb-3 md:pb-4 text-center">Offers</th>
                                    <th className="pb-3 md:pb-4 text-right pr-4 md:pr-8">Direct Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedFirms.map((firm, index) => {
                                    const codeToCopy = firm.discountCode || "PROVEN";
                                    const displayDiscount = firm.discountAmount || "EXCLUSIVE";
                                    const isCopied = copiedStates[firm.slug];

                                    return (
                                    <tr key={firm.slug} className="group transition-all duration-500 hover:translate-y-[-4px]">

                                        {/* Column 1: Rank / Logo Wrapper */}
                                        <td className="p-2 md:py-4 md:px-2.5 bg-[#111111] rounded-l-[1.2rem] md:rounded-l-[1.5rem] border border-[#222] group-hover:border-brand-red group-hover:bg-[#151515] group-hover:shadow-[0_10px_30px_rgba(220,38,38,0.15)] border-r-0 transition-all align-middle relative overflow-hidden">
                                            {/* Subtle internal glow on hover */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-brand-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                            
                                            <div className="flex items-center gap-1 md:gap-2 relative z-10 w-[50px] md:w-[70px] justify-center">
                                                <span className="text-[#333] font-black text-[15px] italic group-hover:text-brand-red/50 transition-colors w-6 text-center select-none">
                                                    {index + 1}
                                                </span>
                                                <div className="w-12 h-12 rounded-2xl bg-[#080808] border border-white/5 flex items-center justify-center shadow-inner overflow-hidden transform group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.2)] transition-all duration-500 shrink-0">
                                                    <Image src={firm.logo} alt={firm.name} width={48} height={48} className="w-full h-full object-cover" />
                                                </div>
                                            </div>
                                        </td>

                                        {/* Column 2: Name & Status */}
                                        <td className="p-2 md:py-4 md:px-2.5 bg-[#111111] border-y border-[#222] group-hover:border-y-brand-red group-hover:bg-[#151515] transition-all align-middle">
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-1 md:gap-2 mb-1">
                                                    <Link href={`${firmBasePath}/${firm.slug}`} className="font-black text-white text-[14px] md:text-[18px] leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-brand-red transition-all cursor-pointer">
                                                        {firm.name}
                                                    </Link>
                                                    {firm.trustpilot && <CheckCircle2 className="w-4 h-4 text-[#10B981] fill-[#10B981]/10 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]" />}
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                    <span className="text-[#777] text-[11px] font-bold uppercase tracking-widest text-emerald-500/80">Active</span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Column 3: Trust Metrics */}
                                        <td className="p-2 md:py-4 md:px-2.5 bg-[#111111] border-y border-[#222] group-hover:border-y-brand-red group-hover:bg-[#151515] transition-all align-middle">
                                            <div className="flex flex-col justify-center">
                                                <div className="flex items-center gap-1 md:gap-2 mb-1">
                                                    <div className="flex gap-[1px]">
                                                        {[1, 2, 3, 4, 5].map(i => (
                                                            <Star key={i} className={`w-3.5 h-3.5 ${i <= Math.round(firm.rating) ? "fill-brand-orange text-brand-orange drop-shadow-[0_0_5px_rgba(255,140,0,0.5)]" : "fill-white/5 text-white/10"}`} />
                                                        ))}
                                                    </div>
                                                    <span className="text-white font-black text-[15px]">{firm.rating}</span>
                                                </div>
                                                <span className="text-[#666] text-[11px] font-bold tracking-widest uppercase">{firm.reviews || firm.reviewCount} Reports</span>
                                            </div>
                                        </td>

                                        {/* Column 4: Base Country */}
                                        <td className="p-2 md:py-4 md:px-2.5 bg-[#111111] border-y border-[#222] group-hover:border-y-brand-red group-hover:bg-[#151515] transition-all align-middle">
                                            <div className="flex items-center gap-2 md:gap-3 bg-white/5 px-2 py-1 md:px-3 md:py-1.5 rounded-lg border border-white/5 inline-flex shadow-inner">
                                                {firm.countryCode ? (
                                                    <div className="w-3 h-3 md:w-4 md:h-4 rounded-sm overflow-hidden shrink-0 relative flex items-center justify-center">
                                                        <ReactCountryFlag
                                                            countryCode={firm.countryCode}
                                                            svg
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: 'cover',
                                                                position: 'absolute',
                                                                top: '50%',
                                                                left: '50%',
                                                                transform: 'translate(-50%, -50%)'
                                                            }}
                                                        />
                                                    </div>
                                                ) : (
                                                    <Globe className="w-3.5 h-3.5 text-neutral-500" />
                                                )}
                                                <span className="text-[12px] text-white font-black uppercase tracking-widest">{firm.countryCode || "INTL"}</span>
                                            </div>
                                        </td>

                                        {/* Column 4.5: Years Operational */}
                                        <td className="p-2 md:py-4 md:px-2.5 bg-[#111111] border-y border-[#222] group-hover:border-y-brand-red group-hover:bg-[#151515] transition-all align-middle text-center relative z-0">
                                            <OperationYearsWidget years={firm.yearsOperational || 1} />
                                        </td>

                                        {/* Column 5: Assets Matrix */}
                                        <td className="p-2 md:py-4 md:px-2.5 bg-[#111111] border-y border-[#222] group-hover:border-y-brand-red group-hover:bg-[#151515] transition-all align-middle">
                                            <div className="grid grid-cols-2 gap-1.5 w-max">
                                                {(firm.instruments || ["Forex", "Crypto", "Indices"]).slice(0, 4).map(asset => {
                                                    const displayAsset = asset === 'Forex' ? 'FX' : asset;
                                                    return (
                                                        <div key={asset} className="group/asset relative flex items-center justify-center w-8 h-8 rounded-[10px] bg-[#0A0A0A] border border-white/10 hover:border-white/30 hover:bg-white/5 transition-colors shadow-inner cursor-help">
                                                            {getAssetIcon(asset)}
                                                            <div className="absolute bottom-full mb-2 bg-[#111] text-white text-[10px] py-1 px-2 rounded-md font-bold opacity-0 group-hover/asset:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-[0_5px_15px_rgba(0,0,0,0.5)] border border-white/10 z-50 uppercase tracking-widest">
                                                                {displayAsset}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </td>

                                        {/* Column 6: Platforms */}
                                        <td className="p-2 md:py-4 md:px-2.5 bg-[#111111] border-y border-[#222] group-hover:border-y-brand-red group-hover:bg-[#151515] transition-all align-middle">
                                            <div className="grid grid-cols-2 gap-1.5 md:gap-2 w-max">
                                                {firm.platformNames?.slice(0, 3).map((platform, i) => {
                                                    const iconUrl = getPlatformIcon(platform);
                                                    return (
                                                        <div key={i} className="group/platform relative flex items-center justify-center w-8 h-8 rounded-[10px] bg-[#0A0A0A] border border-white/10 hover:border-white/30 hover:bg-white/5 transition-colors shadow-inner cursor-help">
                                                            {iconUrl ? (
                                                                <Image src={iconUrl} alt={platform} width={18} height={18} className="object-contain filter drop-shadow-sm" />
                                                            ) : (
                                                                <span className="text-[9px] font-black text-white text-center leading-none uppercase">{platform.substring(0, 3)}</span>
                                                            )}
                                                            {/* Actual Pop-up Name Tooltip */}
                                                            <div className="absolute bottom-full mb-2 bg-[#111] text-white text-[10px] py-1 px-2 rounded-md font-bold opacity-0 group-hover/platform:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-[0_5px_15px_rgba(0,0,0,0.5)] border border-white/10 z-50 uppercase tracking-widest">
                                                                {platform}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </td>

                                        {/* Column 7: Max Funding */}
                                        <td className="p-2 md:py-4 md:px-2.5 bg-[#111111] border-y border-[#222] group-hover:border-y-brand-red group-hover:bg-[#151515] transition-all align-middle text-center">
                                            {firm.maxFunding ? (
                                                <div className="inline-flex h-[32px] md:h-[40px] px-3 md:px-5 rounded-xl bg-gradient-to-b from-[#0f0f0f] to-[#050505] border border-emerald-500/20 text-emerald-400 text-[12px] md:text-[14px] font-black uppercase tracking-widest items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_0_10px_rgba(16,185,129,0.05)] group-hover:border-emerald-500/50 group-hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_0_20px_rgba(16,185,129,0.2)] transition-all mx-auto relative cursor-help group/funding overflow-hidden">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent translate-x-[-100%] group-hover/funding:translate-x-[100%] transition-transform duration-1000" />
                                                    <span className="relative z-10">{formatFunding(firm.maxFunding)}</span>
                                                    <div className="absolute bottom-full mb-2 bg-[#111] text-white text-[10px] py-1 px-2 rounded-md font-bold opacity-0 group-hover/funding:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-[0_5px_15px_rgba(0,0,0,0.5)] border border-white/10 z-50 uppercase tracking-widest flex items-center gap-1">
                                                        <Award className="w-3 h-3 text-emerald-500" /> Max Funding Plan
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-[12px] text-[#555] font-black">-</span>
                                            )}
                                        </td>

                                        {/* Column 8: PROMO Desk / OFFERS */}
                                        <td className="p-2 md:py-4 md:px-2.5 bg-[#111111] border-y border-[#222] group-hover:border-y-brand-red group-hover:bg-[#151515] transition-all align-middle text-center">
                                            <div className="inline-flex flex-col rounded-xl overflow-hidden group/promo border border-white/10 group-hover:border-brand-red/50 shadow-lg group-hover:shadow-[0_0_20px_rgba(220,38,38,0.2)] transition-all transform hover:scale-105 mx-auto">
                                                {/* Top Half - Red Gradient */}
                                                <div className="bg-gradient-to-r from-brand-red to-brand-orange px-2 py-1.5 md:px-3 md:py-2 flex items-center justify-center relative overflow-hidden">
                                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/promo:translate-y-0 transition-transform duration-300 pointer-events-none" />
                                                    <span className="text-[10px] md:text-[12px] font-black text-white leading-tight uppercase relative z-10 group-hover/promo:scale-110 transition-transform select-none">
                                                        {displayDiscount}
                                                        {(displayDiscount !== "EXCLUSIVE" && !displayDiscount.toLowerCase().includes('off') && !displayDiscount.includes('%')) && ' OFF'}
                                                    </span>
                                                </div>
                                                {/* Bottom Toggle Half - Dynamic Admin Code (Clipboard Copier) */}
                                                <div 
                                                    onClick={(e) => handleCopy(firm.slug, codeToCopy, e)}
                                                    className="bg-[#050505] cursor-pointer hover:bg-[#1a1a1a] px-2 py-2 flex items-center justify-center gap-1.5 border-t border-brand-red/30 relative transition-colors"
                                                >
                                                    {isCopied ? (
                                                        <div className="flex items-center gap-1 animate-in fade-in zoom-in text-emerald-500">
                                                            <Check className="w-3 h-3" />
                                                            <span className="text-[9px] font-black tracking-widest uppercase">Copied!</span>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <span className="text-[9px] font-black tracking-widest text-[#AAA] group-hover/promo:text-white uppercase transition-colors">
                                                                {codeToCopy}
                                                            </span>
                                                            <Copy className="w-3 h-3 text-brand-red hidden group-hover/promo:block" />
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </td>

                                        {/* Column 9: Direct Action */}
                                        <td className="p-2 pr-4 md:p-4 md:pr-6 bg-[#111111] rounded-r-[1.2rem] md:rounded-r-[1.5rem] border border-[#222] group-hover:border-brand-red border-l-0 group-hover:bg-[#151515] group-hover:shadow-[10px_10px_30px_rgba(220,38,38,0.15)] transition-all align-middle text-right">
                                            <div className="flex items-center justify-end">
                                                <Link href={`${firmBasePath}/${firm.slug}`} className="block">
                                                    <Button className="h-[32px] md:h-[40px] px-4 md:px-6 rounded-xl bg-white text-black text-[11px] md:text-[13px] font-black tracking-widest uppercase hover:bg-brand-red hover:text-white shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] border-none transition-all transform hover:scale-105 flex items-center gap-1.5 md:gap-2 group/btn">
                                                        Visit Firm
                                                        <div className="w-4 h-4 rounded-full bg-black/10 flex items-center justify-center group-hover/btn:bg-white/20 transition-colors">
                                                            <ChevronRight className="w-3 h-3" />
                                                        </div>
                                                    </Button>
                                                </Link>
                                            </div>
                                        </td>

                                    </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <div className="w-full flex justify-center py-20 bg-[#111] rounded-[2rem] border border-white/5">
                            <div className="text-center space-y-4">
                                <Search className="w-12 h-12 text-white/10 mx-auto" />
                                <h3 className="font-black text-xl text-white uppercase tracking-tight">No Market Intersections Found</h3>
                                <p className="text-[#666] font-medium max-w-sm mx-auto">Try resetting the algorithm parameters to scan the entire firm matrix.</p>
                                <Button onClick={() => setActiveFilter("All")} className="mt-4 bg-white/5 text-white border-white/10 hover:bg-brand-red hover:border-brand-red rounded-xl text-xs font-bold uppercase tracking-widest">Reset Filter</Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* View All / Load More */}
                {processedFirms.length > visibleCount && (
                    <div className="flex justify-center mt-12 relative z-20">
                        <Button 
                            onClick={() => setVisibleCount(v => v + 10)}
                            className="h-14 px-10 rounded-full border border-[#2A2A2A] bg-[#111] hover:bg-brand-red hover:border-brand-red text-white transition-all text-sm font-black uppercase tracking-widest shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:-translate-y-1 overflow-hidden group/load"
                        >
                            <span className="relative z-10 flex items-center gap-2">Load More Entries <ChevronDown className="w-4 h-4 group-hover/load:animate-bounce" /></span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/load:animate-[shimmer_1.5s_infinite]" />
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
