"use client";

import { FirmData, AccountTier } from "@/data/firms";
import { Copy, ExternalLink, Check, Scale, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function FirmSidebar({
    firm,
    selectedAccount,
    onSelectAccount
}: {
    firm: FirmData,
    selectedAccount: AccountTier,
    onSelectAccount: (acc: AccountTier) => void
}) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (firm.discountCode) {
            navigator.clipboard.writeText(firm.discountCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="space-y-6 sticky top-24">

            {/* 0. ACCOUNT SELECTOR UI */}
            <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/5 space-y-3">
                <span className="text-xs font-bold text-[#A3A3A3] uppercase tracking-wider">Select Account Size</span>
                <div className="grid grid-cols-3 gap-2">
                    {firm.accounts.map((acc) => (
                        <button
                            key={acc.size}
                            onClick={() => onSelectAccount(acc)}
                            className={cn(
                                "px-2 py-2 rounded-lg text-sm font-bold transition-all border",
                                selectedAccount.size === acc.size
                                    ? "bg-white text-black border-white shadow-lg scale-105"
                                    : "bg-white/5 text-gray-400 border-transparent hover:bg-white/10 hover:text-white"
                            )}
                        >
                            {acc.size.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            {/* 1. QUICK STATS CARD (Dynamic) */}
            <div className="bg-[#1A1A1A] p-6 rounded-xl border border-white/5 shadow-lg relative overflow-hidden">
                {/* Dynamic Price Highlight */}
                <div className="flex justify-between items-end mb-6 border-b border-white/5 pb-4">
                    <div>
                        <div className="text-sm text-gray-400 mb-1">Price</div>
                        <div className="text-3xl font-bold text-white">${selectedAccount.price}</div>
                    </div>
                    {selectedAccount.promoPrice && (
                        <div className="text-right">
                            <div className="text-xs text-[#DC2626] font-bold uppercase bg-[#DC2626]/10 px-2 py-1 rounded mb-1">Sale</div>
                            <div className="text-sm text-gray-500 line-through">${selectedAccount.price}</div>
                        </div>
                    )}
                </div>

                <h3 className="text-white font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider text-[#A3A3A3]">
                    📊 Account Specs
                </h3>
                <div className="space-y-3 text-sm">
                    <StatRow label="Target" value={`${selectedAccount.targetPhase1} / ${selectedAccount.targetPhase2}`} highlight />
                    <StatRow label="Max Loss" value={selectedAccount.maxTotalLoss} />
                    <StatRow label="Daily Loss" value={selectedAccount.maxDailyLoss} />
                    <StatRow label="Leverage" value={selectedAccount.leverage} />
                    <StatRow label="Duration" value={selectedAccount.duration} />
                </div>
            </div>

            {/* 2. DISCOUNT CARD */}
            {firm.discountCode && (
                <div className="bg-gradient-to-br from-[#DC2626] to-[#EF4444] p-6 rounded-xl border border-red-500 shadow-xl shadow-red-900/20 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[40px] rounded-full pointer-events-none group-hover:bg-white/20 transition-colors" />

                    <h3 className="text-white font-bold text-lg mb-1 flex items-center gap-2 relative z-10">
                        🏷️ EXCLUSIVE OFFER
                    </h3>
                    <div className="text-white/90 text-sm mb-4 relative z-10 font-medium">
                        {firm.discountAmount} All Challenge Sizes
                    </div>

                    <div className="bg-black/20 backdrop-blur-sm p-3 rounded-lg flex items-center justify-between border border-white/10 mb-3 relative z-10">
                        <span className="font-mono font-bold text-white tracking-wider">{firm.discountCode}</span>
                        <button
                            onClick={handleCopy}
                            className="text-white/80 hover:text-white transition-colors"
                        >
                            {copied ? <Check className="w-4 h-4 text-green-300" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            )}

            {/* 3. CTA CARD */}
            <div className="bg-[#1A1A1A] p-6 rounded-xl border border-white/5 space-y-4 text-center">
                <Button className="w-full bg-[#DC2626] hover:bg-red-700 text-white font-bold h-12 rounded-lg shadow-lg shadow-red-900/20 gap-2">
                    Start {selectedAccount.size.toUpperCase()} Challenge <ExternalLink className="w-4 h-4" />
                </Button>

                <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5 h-12 rounded-lg gap-2">
                    <Scale className="w-4 h-4" /> Compare with Others
                </Button>
            </div>

        </div>
    );
}

function StatRow({ label, value, highlight }: { label: string, value: string, highlight?: boolean }) {
    return (
        <div className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0 last:pb-0">
            <span className="text-[#A3A3A3]">{label}</span>
            <span className={cn("font-bold text-right", highlight ? "text-white" : "text-gray-300")}>{value}</span>
        </div>
    )
}
