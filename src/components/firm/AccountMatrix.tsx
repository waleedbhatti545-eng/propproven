"use client";

import { useState } from "react";
import { AccountTier } from "@/data/firms";
import { Check, Info } from "lucide-react";

interface AccountMatrixProps {
    accounts: AccountTier[];
    color: string;
}

export function AccountMatrix({ accounts, color }: AccountMatrixProps) {
    const [selectedSize, setSelectedSize] = useState(accounts?.[0]?.size || '');
    const activeAccount = accounts?.find(a => a.size === selectedSize) || accounts?.[0];

    if (!accounts || accounts.length === 0 || !activeAccount) {
        return (
            <div className="bg-[#0a0a0a] rounded-3xl border border-white/5 p-8 text-center text-gray-500">
                <p className="text-sm font-medium">No account tiers available for this firm yet.</p>
            </div>
        );
    }

    // Safe color map for Tailwind to detect classes
    const colorMap: Record<string, string> = {
        blue: "bg-blue-500/20 border-blue-500 text-white shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)]",
        yellow: "bg-yellow-500/20 border-yellow-500 text-white shadow-[0_0_20px_-5px_rgba(234,179,8,0.5)]",
        red: "bg-red-500/20 border-red-500 text-white shadow-[0_0_20px_-5px_rgba(239,68,68,0.5)]",
    };

    const activeClass = colorMap[color] || colorMap.blue;

    return (
        <div className="bg-[#0a0a0a] rounded-3xl border border-white/5 overflow-hidden">
            <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    Choose Your Account Size
                </h3>

                {/* Size Selectors */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {accounts.map((acc) => (
                        <button
                            key={acc.size}
                            onClick={() => setSelectedSize(acc.size)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${selectedSize === acc.size
                                ? activeClass
                                : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                                }`}
                        >
                            {acc.size.toUpperCase()}
                        </button>
                    ))}
                </div>

                {/* Matrix Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Main Price Card */}
                    <div className="relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 flex flex-col justify-center items-center text-center">
                        <div className="text-sm text-gray-400 uppercase tracking-widest mb-2">Account Balance</div>
                        <div className="text-3xl md:text-4xl font-bold text-white mb-6">{activeAccount.balance}</div>

                        <div className="flex items-baseline gap-2 mb-2">
                            {activeAccount.promoPrice && (
                                <span className="text-lg text-gray-500 line-through">${activeAccount.price}</span>
                            )}
                            <span className="text-4xl font-bold text-brand-red">
                                ${activeAccount.promoPrice || activeAccount.price}
                            </span>
                        </div>
                        <div className="text-xs text-gray-400">One-time fee • No hidden costs</div>
                    </div>

                    {/* Details List */}
                    <div className="grid grid-cols-2 gap-4">
                        <DetailItem label="Profit Target" value={`${activeAccount.targetPhase1 || 'N/A'} / ${activeAccount.targetPhase2 || 'N/A'}`} />
                        <DetailItem label="Daily Loss" value={activeAccount.maxDailyLoss} highlight />
                        <DetailItem label="Max Loss" value={activeAccount.maxTotalLoss} highlight />
                        <DetailItem label="Leverage" value={activeAccount.leverage} />
                        <DetailItem label="Time Limit" value={activeAccount.duration} />
                        <DetailItem label="Refundable" value="Yes (+ Profit)" />
                    </div>

                </div>
            </div>
        </div>
    );
}

function DetailItem({ label, value, highlight = false }: { label: string, value: string, highlight?: boolean }) {
    return (
        <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="text-xs text-gray-400 mb-1">{label}</div>
            <div className={`text-sm font-bold ${highlight ? 'text-white' : 'text-gray-200'}`}>{value}</div>
        </div>
    )
}
