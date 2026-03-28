"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowDown, Star, Shield, TrendingUp, Award } from "lucide-react";
import { useEffect, useState } from "react";

const STATS = [
    { icon: Shield, value: "30+", label: "Verified Firms" },
    { icon: TrendingUp, value: "$12M+", label: "Total Payouts" },
    { icon: Award, value: "50K+", label: "Active Traders" },
];

// Words that rotate in the animation
const ROTATING_WORDS = ["PROVEN", "TRUSTED", "VERIFIED", "REAL"];

export function HeroSection() {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
                setIsAnimating(false);
            }, 400);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-[100dvh] w-full flex flex-col items-center overflow-hidden bg-dark-bg text-white">

            {/* Custom Hero Background Image */}
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('http://zainenterprisespakistan.com/wp-content/uploads/2026/01/ChatGPT-Image-Jan-31-2026-04_23_22-PM.png')`,
                }}
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-transparent to-dark-bg" />
            <div className="absolute inset-0 bg-dark-bg/20" />

            {/* Main Content */}
            <div className="relative z-10 w-full flex-grow flex flex-col items-center justify-center px-4 md:px-8 pt-28">


                {/* Main Headline Structure */}
                <div className="text-center mb-6 animate-in fade-in zoom-in-95 duration-1000">
                    {/* STOP GUESSING - Big & Bold */}
                    <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-white mb-3 uppercase">
                        STOP GUESSING.
                    </h1>

                    {/* START TRADING WITH [ANIMATED WORD] FIRMS - Proportionally larger */}
                    <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-wide text-white/90 uppercase">
                        START TRADING WITH
                        <br className="md:hidden" />
                        {" "}
                        <span
                            className={`inline-block text-[#DC2626] font-black transition-all duration-400 ease-out min-w-[5ch] text-center ${isAnimating
                                ? 'opacity-0 translate-y-3 scale-95'
                                : 'opacity-100 translate-y-0 scale-100'
                                }`}
                        >
                            {ROTATING_WORDS[currentWordIndex]}
                        </span>
                        {" "}FIRMS.
                    </h2>
                </div>

                {/* Stats Pills Bar - Like reference */}
                <div className="grid grid-cols-2 md:flex flex-wrap items-center justify-center gap-3 md:gap-4 w-full md:w-auto mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">

                    <div className="flex items-center gap-2 px-3 py-2.5 md:px-4 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
                        <div className="w-6 h-6 rounded-full bg-brand-red/20 flex items-center justify-center shrink-0">
                            <Shield className="w-3.5 h-3.5 text-brand-red" />
                        </div>
                        <span className="text-brand-red font-bold text-xs md:text-sm">30+</span>
                        <span className="text-gray-400 text-[10px] md:text-sm whitespace-nowrap">Verified Prop Firms</span>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-2.5 md:px-4 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
                        <div className="w-6 h-6 rounded-full bg-brand-red/20 flex items-center justify-center shrink-0">
                            <TrendingUp className="w-3.5 h-3.5 text-brand-red" />
                        </div>
                        <span className="text-brand-red font-bold text-xs md:text-sm">500+</span>
                        <span className="text-gray-400 text-[10px] md:text-sm whitespace-nowrap">Challenges</span>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-2.5 md:px-4 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
                        <div className="w-6 h-6 rounded-full bg-brand-red/20 flex items-center justify-center shrink-0">
                            <Star className="w-3.5 h-3.5 text-brand-red" />
                        </div>
                        <span className="text-brand-red font-bold text-xs md:text-sm">5k+</span>
                        <span className="text-gray-400 text-[10px] md:text-sm whitespace-nowrap">Trader Reviews</span>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-2.5 md:px-4 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
                        <div className="w-6 h-6 rounded-full bg-brand-red/20 flex items-center justify-center shrink-0">
                            <Award className="w-3.5 h-3.5 text-brand-red" />
                        </div>
                        <span className="text-brand-red font-bold text-xs md:text-sm">1M+</span>
                        <span className="text-gray-400 text-[10px] md:text-sm whitespace-nowrap">Monthly Views</span>
                    </div>

                </div>

                {/* CTA Buttons */}
                <div className="flex flex-row items-center gap-3 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 w-full sm:w-auto px-2 justify-center">
                    <Link href="/firms" className="flex-1 sm:flex-none">
                        <Button
                            size="lg"
                            className="w-full h-12 sm:h-14 px-4 sm:px-10 rounded-full bg-white text-black font-bold text-xs sm:text-base hover:scale-105 hover:bg-gray-100 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] whitespace-nowrap"
                        >
                            Compare Firms Now
                        </Button>
                    </Link>
                    <Link href="/firms" className="flex-1 sm:flex-none">
                        <Button
                            variant="outline"
                            size="lg"
                            className="w-full h-12 sm:h-14 px-4 sm:px-8 rounded-full border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-semibold text-xs sm:text-base transition-all whitespace-nowrap"
                        >
                            Read Reviews
                        </Button>
                    </Link>
                </div>

            </div>

            {/* Bottom Stats Bar - Marquee Slider */}
            <div className="relative z-10 w-full pb-6 mt-auto overflow-hidden">
                <div className="flex items-center gap-16 md:gap-24 animate-marquee py-4 whitespace-nowrap">
                    {/* Duplicate items for seamless loop (4 sets) */}
                    {[...STATS, ...STATS, ...STATS, ...STATS].map((stat, i) => (
                        <div key={i} className="flex items-center gap-3 opacity-90 hover:opacity-100 transition-opacity group shrink-0">
                            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-red/10 group-hover:border-brand-red/30 transition-all">
                                <stat.icon className="w-5 h-5 text-brand-red" />
                            </div>
                            <div>
                                <span className="text-2xl md:text-3xl font-bold text-white tracking-tighter block">{stat.value}</span>
                                <span className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider">
                                    {stat.label}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function FeaturesSection() {
    return null;
}
