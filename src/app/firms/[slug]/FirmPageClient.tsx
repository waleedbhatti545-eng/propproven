"use client";

import { AccountTier, FirmData } from "@/data/firms";
// New V6 Components
import { FirmHeroCard } from "@/components/firm/FirmHeroCard";
import { FirmTabs } from "@/components/firm/FirmTabs";
import { SectionInstruments } from "@/components/firm/SectionInstruments";
import { SectionCommissions } from "@/components/firm/SectionCommissions";
import { SectionScaling } from "@/components/firm/SectionScaling";

// Existing Components
import { TabChallenges } from "@/components/firm/TabChallenges";
import { TabRules } from "@/components/firm/TabRules";
import { TabReviews } from "@/components/firm/TabReviews";
import { TabOffers } from "@/components/firm/TabOffers";
import { FirmSidebar } from "@/components/firm/FirmSidebar";
import { RelatedFirms } from "@/components/firm/RelatedFirms";
import { StickyComparisonDrawer } from "@/components/firm/StickyComparisonDrawer";
import { useState, useEffect } from "react";

export default function FirmPageClient({ firm }: { firm: any }) {

    // STATES
    const [selectedAccount, setSelectedAccount] = useState<AccountTier | null>(null);
    const [activeTab, setActiveTab] = useState("overview"); // Default tab

    useEffect(() => {
        if (firm && firm.accounts.length > 0) {
            setSelectedAccount(firm.accounts[0]);
        }
    }, [firm]);

    const activeAccount = selectedAccount || firm.accounts?.[0];

    return (
        <div className="min-h-screen bg-[#0F0F0F] text-white font-sans selection:bg-purple-500/30">

            {/* 1. HERO CARD */}
            <FirmHeroCard firm={firm} />

            {/* 2. TABS NAV (Sticky) */}
            <FirmTabs firm={firm} activeTab={activeTab} onTabChange={setActiveTab} />

            {/* 3. DYNAMIC CONTENT AREA */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-10 min-h-[600px]">

                {/* --- TAB: OVERVIEW --- */}
                {activeTab === "overview" && (
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 animate-in fade-in zoom-in-95 duration-300">
                        <main className="space-y-12">
                            <SectionInstruments firm={firm} />
                            <SectionCommissions firm={firm} />
                            <TabRules firm={firm} selectedAccount={activeAccount} />
                        </main>
                        <aside className="hidden lg:block relative">
                            <FirmSidebar firm={firm} selectedAccount={activeAccount} onSelectAccount={setSelectedAccount} />
                        </aside>
                    </div>
                )}

                {/* --- TAB: CHALLENGES --- */}
                {activeTab === "challenges" && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                        <div className="mb-8 flex items-end justify-between">
                            <h2 className="text-3xl font-bold text-white">Challenges & Pricing</h2>
                        </div>
                        <TabChallenges firm={firm} />
                        <div className="mt-12">
                            <SectionScaling firm={firm} />
                        </div>
                    </div>
                )}

                {/* --- TAB: REVIEWS --- */}
                {activeTab === "reviews" && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                        <TabReviews firm={firm} />
                    </div>
                )}

                {/* --- TAB: NEW RELATIONAL OFFERS --- */}
                {activeTab === "offers" && (
                    <TabOffers firm={firm} />
                )}

                {/* --- TAB: PAYOUTS (Reuse Reviews or New Component) --- */}
                {activeTab === "payouts" && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-300 text-center py-20">
                        <h2 className="text-2xl font-bold text-gray-400">Payout Stats Coming Soon</h2>
                    </div>
                )}

            </div>

            {/* Sticky Comparison Footer */}
            <StickyComparisonDrawer firm={firm} />

            {/* Mobile Sidebar (Only show on Overview or make global at bottom?) */}
            {activeTab === "overview" && (
                <div className="lg:hidden px-4 md:px-8 pb-12">
                    <FirmSidebar firm={firm} selectedAccount={activeAccount} onSelectAccount={setSelectedAccount} />
                </div>
            )}

        </div>
    );
}
