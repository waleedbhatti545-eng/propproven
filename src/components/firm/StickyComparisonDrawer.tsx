"use client";

import { FirmData } from "@/data/firms";
import { Scale, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function StickyComparisonDrawer({ firm }: { firm: FirmData }) {
    const [isVisible, setIsVisible] = useState(false);

    // Show after scrolling past header (300px)
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full z-40 px-4 pb-4 animate-in slide-in-from-bottom-5 duration-300">
            <div className="max-w-3xl mx-auto bg-[#1A1A1A]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-4">

                <div className="flex items-center gap-4">
                    {/* Tiny Logo */}
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center font-bold text-black border border-white/20 overflow-hidden">
                        {firm.logo ? (
                            <img src={firm.logo} alt={firm.name} className="w-full h-full object-cover" />
                        ) : (
                            firm.name[0]
                        )}
                    </div>

                    <div className="hidden sm:block">
                        <div className="font-bold text-white text-sm">{firm.name}</div>
                        <div className="text-xs text-brand-red font-semibold">
                            {firm.rating} Rating
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span className="hidden md:inline text-xs text-gray-400">
                        Compare {firm.name} against industry leaders
                    </span>

                    <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 h-9 text-xs gap-2 rounded-lg">
                        <Scale className="w-3.5 h-3.5" />
                        Add to Compare
                    </Button>

                    <a href={firm.affiliateLink || firm.websiteUrl || "#"} target="_blank" rel="noopener noreferrer">
                        <Button className="bg-brand-red hover:bg-brand-orange text-white font-bold h-9 text-xs rounded-lg shadow-lg">
                            View Offer
                        </Button>
                    </a>

                    <button
                        onClick={() => setIsVisible(false)}
                        className="p-1 rounded-full hover:bg-white/10 text-gray-500 transition-colors ml-2"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

            </div>
        </div>
    );
}
