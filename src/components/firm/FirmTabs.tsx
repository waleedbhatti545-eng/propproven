"use client";

import { FirmData } from "@/data/firms";
import { cn } from "@/lib/utils";

interface FirmTabsProps {
    firm: FirmData;
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export function FirmTabs({ firm, activeTab, onTabChange }: FirmTabsProps) {

    // TABS CONFIGURATION
    // Styled exactly like the reference: Pill shape, Counts in badges
    const tabs = [
        { id: "overview", label: "Overview" },
        { id: "challenges", label: "Challenges", count: firm.accounts.length },
        { id: "reviews", label: "Reviews", count: firm.reviewCount },
        { id: "offers", label: "Offers", count: firm.offers?.length || 0 },
        { id: "payouts", label: "Payouts", badge: "New" },
    ];

    return (
        <div className="bg-[#0F0F0F] border-b border-white/5 w-full">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide mask-image-linear-to-r">

                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;

                        return (
                            <button
                                key={tab.id}
                                onClick={() => onTabChange(tab.id)}
                                className={cn(
                                    "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap",
                                    isActive
                                        ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                        : "bg-[#1A1A1A] text-gray-400 hover:text-white hover:bg-[#252525]"
                                )}
                            >
                                {tab.label}

                                {/* COUNT BADGE */}
                                {tab.count !== undefined && tab.count > 0 && (
                                    <span className={cn(
                                        "px-1.5 py-0.5 rounded text-[10px] font-bold",
                                        isActive
                                            ? "bg-black/10 text-black/70"
                                            : "bg-[#333] text-[#A3A3A3]"
                                    )}>
                                        {tab.count}
                                    </span>
                                )}

                                {/* NEW BADGE */}
                                {tab.badge && (
                                    <span className="bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded text-[10px] font-bold">
                                        {tab.badge}
                                    </span>
                                )}
                            </button>
                        );
                    })}

                </div>
            </div>
        </div>
    );
}
