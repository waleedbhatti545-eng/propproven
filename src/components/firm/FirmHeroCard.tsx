"use client";

import { FirmData } from "@/data/firms";
import { ShieldCheck, Star, ExternalLink, Share2, Heart, Trophy, Percent, Zap, Clock, ChevronRight, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import ReactCountryFlag from "react-country-flag";

export function FirmHeroCard({ firm }: { firm: FirmData }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (firm.discountCode) {
            navigator.clipboard.writeText(firm.discountCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="relative w-full pt-32 pb-8 px-4 md:px-8 bg-[#0F0F0F] overflow-hidden">

            {/* IMMERSIVE BACKGROUND: Blurry Logo Mesh - RED BRANDING */}
            <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
                {/* Right/Bottom Glow - FORCED RED */}
                <div className="absolute -right-[10%] -bottom-[20%] w-[60%] h-[80%] opacity-20 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow"
                    style={{ backgroundColor: '#ff0000' }}></div>

                {/* Left/Top Tint - FORCED RED */}
                <div className="absolute -left-[10%] top-0 w-[50%] h-[50%] bg-red-900/10 blur-[100px] rounded-full"></div>
            </div>

            {/* Breadcrumbs */}
            <div className="relative z-10 max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-400 mb-8 pl-1 font-medium tracking-wide uppercase">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3 text-gray-600" />
                <span>Prop Firms</span>
                <ChevronRight className="w-3 h-3 text-gray-600" />
                <span className="text-white bg-white/5 px-2 py-0.5 rounded border border-white/5">{firm.name}</span>
            </div>

            {/* MAIN CARD CONTAINER: Ultra Glass + RED SHADOW */}
            <div className="relative z-10 max-w-7xl mx-auto rounded-[32px] p-[1px] bg-gradient-to-b from-white/10 via-white/5 to-transparent shadow-[0_20px_50px_rgba(255,0,0,0.15)] backdrop-blur-3xl">

                <div className="bg-[#121212]/80 backdrop-blur-2xl rounded-[31px] w-full p-6 md:p-10 relative overflow-hidden">

                    {/* Inner Content Glow */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

                    {/* TOP SECTION: Identity & Actions */}
                    <div className="relative flex flex-col lg:flex-row justify-between gap-10 mb-10">

                        {/* LEFT: Branding & Metadata */}
                        <div className="flex flex-col gap-8 w-full">

                            {/* Header Row: Logo + Name + Description */}
                            <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
                                {/* Logo Box */}
                                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/10 shrink-0 backdrop-blur-md overflow-hidden">
                                    <img src={firm.logo} alt={firm.name} className="w-full h-full object-cover" />
                                </div>

                                <div className="space-y-4 pt-1 w-full">
                                    <div className="flex justify-between items-start w-full">
                                        <div>
                                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-2">
                                                {firm.name}
                                            </h1>
                                            <p className="text-gray-400 text-sm md:text-base max-w-xl leading-relaxed">
                                                {firm.shortDesc}
                                            </p>
                                        </div>
                                    </div>

                                    {/* NEW: Metadata Strip (Precise Mobile Grid Dividers) */}
                                    <div className="grid grid-cols-2 md:flex md:flex-wrap md:items-center md:divide-x md:divide-white/10 border-t border-b border-white/5 py-4 md:py-4 w-full md:w-fit text-left pb-5 md:pb-4">
                                        
                                        {/* Row 1: CEO (Full Width on Mobile, Bottom Border via divider) */}
                                        <div className="col-span-2 md:col-span-1 px-4 md:px-6 first:pl-0">
                                            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">CEO</div>
                                            <div className="text-white font-bold text-base md:text-xl">{firm.ceo || "Otakar Suffner"}</div>
                                        </div>

                                        <div className="col-span-2 border-b border-white/5 my-5 md:hidden"></div>

                                        {/* Row 2 Left: Country (Right Border Only) */}
                                        <div className="col-span-1 border-r border-white/5 md:border-r-0 px-4 md:px-6">
                                            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Country</div>
                                            <div className="flex items-center gap-2 text-white font-bold text-base md:text-xl">
                                                {firm.countryCode ? (
                                                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full overflow-hidden shrink-0 shadow-sm border border-white/10 relative flex items-center justify-center">
                                                        <ReactCountryFlag
                                                            countryCode={firm.countryCode}
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
                                                ) : (
                                                    <span className="text-lg">🌍</span>
                                                )}
                                                <span>{firm.countryCode?.toUpperCase() || 'GLO'}</span>
                                            </div>
                                        </div>

                                        {/* Row 2 Right: Date Created */}
                                        <div className="col-span-1 px-4 md:px-6">
                                            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Date Created</div>
                                            <div className="text-white font-bold text-base md:text-xl">{firm.foundedDate}</div>
                                        </div>

                                        <div className="col-span-2 border-b border-white/5 my-5 md:hidden"></div>

                                        {/* Row 3 Left: Trust Pilot (Right Border Only) */}
                                        <div className="col-span-1 border-r border-white/5 md:border-r-0 px-4 md:px-6">
                                            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Trust Pilot</div>
                                            <div className="text-white font-bold text-base md:text-xl">{firm.rating}</div>
                                        </div>

                                        {/* Row 3 Right: Years in Operation (No Borders) */}
                                        <div className="col-span-1 px-4 md:px-6 last:pr-0">
                                            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Years in Operation</div>
                                            <div className="text-white font-bold text-base md:text-xl">{firm.yearsOperational}</div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: CTAs */}
                        <div className="flex flex-col gap-4 min-w-[240px] shrink-0 mt-2 lg:mt-0">

                            {/* Primary CTA with RED Pulse */}
                            <a href={firm.websiteUrl || "#"} target="_blank" rel="noopener noreferrer" className="block w-full">
                                <Button className="h-14 w-full bg-white hover:bg-gray-100 text-black font-bold rounded-xl shadow-[0_0_30px_rgba(255,0,0,0.3)] transition-all hover:scale-[1.02] text-lg relative group overflow-hidden border border-white">
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Visit Website <ExternalLink className="w-5 h-5" />
                                    </span>
                                    {/* Hover Gradient Red */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                </Button>
                            </a>

                            {/* Discount Code Box */}
                            {firm.discountCode && (
                                <div className="bg-[#1A1A1A]/80 border border-white/10 rounded-xl p-4 flex items-center justify-between gap-4 backdrop-blur-md">
                                    <div>
                                        <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-0.5">Discount Code</div>
                                        <div className="text-red-400 font-mono text-sm font-bold tracking-wider">{firm.discountCode}</div>
                                    </div>
                                    <button
                                        onClick={handleCopy}
                                        className="h-8 w-8 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                                    >
                                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* BOTTOM SECTION: Stats Dashboard Strip (Image 1 Style - Preserved as requested) */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-white/5 rounded-2xl blur-xl" />
                        <div className="relative bg-[#1A1A1A]/60 backdrop-blur-md border border-white/5 rounded-2xl p-4 md:p-6 grid grid-cols-2 md:grid-cols-5 md:divide-x divide-white/5 text-center md:text-left shadow-lg">
                            {/* Row 1 Full Width */}
                            <StatItem label="Max Funding" value={firm.maxFunding} icon={Trophy} className="col-span-2 md:col-span-1" />
                            
                            <div className="col-span-2 border-b border-white/5 my-5 md:hidden"></div>

                            {/* Row 2 */}
                            <StatItem label="Daily Loss" value={firm.dailyLoss} icon={Zap} className="col-span-1 border-r border-white/5 md:border-r-0" />
                            <StatItem label="Max Loss" value={firm.maxLoss} icon={Zap} className="col-span-1" />
                            
                            <div className="col-span-2 border-b border-white/5 my-5 md:hidden"></div>

                            {/* Row 3 */}
                            <StatItem label="Profit Split" value={firm.profitSplit} icon={Percent} className="col-span-1 border-r border-white/5 md:border-r-0" />
                            <StatItem label="Trading Period" value={firm.accounts?.[0]?.duration || "Unlimited"} icon={Clock} className="col-span-1" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function StatItem({ label, value, icon: Icon, className }: { label: string, value: string, icon: any, className?: string }) {
    return (
        <div className={cn("flex flex-col justify-center px-4 md:px-6 align-middle", className)}>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2 text-gray-500">
                <Icon className="w-4 h-4 md:w-5 md:h-5 text-brand-red opacity-80" />
                <span className="text-[11px] md:text-sm font-bold uppercase tracking-widest">{label}</span>
            </div>
            <div className="text-white font-black text-2xl md:text-3xl tracking-tight">
                {value}
            </div>
        </div>
    )
}
