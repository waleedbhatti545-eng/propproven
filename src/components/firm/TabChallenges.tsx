"use client";

import { FirmData } from "@/data/firms";
import { Check, ShoppingCart, Info, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function TabChallenges({ firm }: { firm: FirmData }) {

    // STATE: Active Filter
    const [filter, setFilter] = useState("All");
    const [copiedBtn, setCopiedBtn] = useState<string | null>(null);

    const handleCopy = (code: string, id: string) => {
        navigator.clipboard.writeText(code);
        setCopiedBtn(id);
        setTimeout(() => setCopiedBtn(null), 2000);
    };

    // Filter Logic
    const filteredAccounts = firm.accounts.filter(acc => {
        if (filter === "All") return true;
        // Exact match for "1-Step", "2-Step", etc.
        return acc.type === filter;
    }).sort((a, b) => a.price - b.price);

    // Dynamic Counts for Buttons
    const getCount = (type: string) => {
        if (type === "All") return firm.accounts.length;
        return firm.accounts.filter(a => a.type === type).length;
    };

    const filters = ["All", "1-Step", "2-Step", "3-Step", "Instant"];

    return (
        <div className="w-full">

            {/* FILTER BAR (Glass + Yellow/Orange) */}
            <div className="flex flex-wrap items-center gap-2 mb-6 bg-[#1A1A1A]/50 p-1.5 rounded-xl border border-white/5 w-fit">
                {filters.map(f => {
                    const count = getCount(f);
                    const isActive = filter === f;

                    // Disable if count is 0
                    const isDisabled = count === 0;

                    return (
                        <button
                            key={f}
                            onClick={() => !isDisabled && setFilter(f)}
                            disabled={isDisabled}
                            className={cn(
                                "px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 border",
                                isActive
                                    ? "bg-brand-red/10 border-brand-red/30 text-white shadow-[0_0_15px_-3px_rgba(220,38,38,0.3)]"
                                    : isDisabled
                                        ? "opacity-30 cursor-not-allowed text-neutral-600 border-transparent bg-transparent"
                                        : "text-neutral-400 border-transparent hover:text-white hover:bg-white/5"
                            )}
                        >
                            {f}
                            {!isDisabled && (
                                <span className={cn(
                                    "text-[10px] px-2 py-0.5 rounded-full border",
                                    isActive ? "bg-brand-red border-brand-red text-white" : "bg-black/40 border-white/10 text-neutral-400 group-hover:bg-white/10"
                                )}>
                                    {count}
                                </span>
                            )}
                        </button>
                    )
                })}
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#121212]">
                <table className="w-full min-w-[800px] border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 text-left bg-[#1A1A1A]/50">
                            <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Account Size</th>
                            <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Profit Target</th>
                            <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Daily DD</th>
                            <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Max DD</th>
                            <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="py-4 px-6 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredAccounts.length > 0 ? (
                            filteredAccounts.map((account) => (
                                <tr
                                    key={account.size + account.type}
                                    className="bg-[#1A1A1A]/20 hover:bg-[#1A1A1A] transition-colors group"
                                >
                                    {/* ACCOUNT SIZE */}
                                    <td className="py-4 px-6 text-white font-bold text-lg">
                                        {account.balance}
                                    </td>

                                    {/* TYPE (Dynamic Tag) */}
                                    <td className="py-4 px-6">
                                        <span className={cn(
                                            "border text-xs px-2.5 py-1 rounded-full font-bold tracking-wide",
                                            account.type === "2-Step" ? "bg-brand-orange/10 border-brand-orange/20 text-brand-orange" :
                                                account.type === "1-Step" ? "bg-brand-red/10 border-brand-red/20 text-brand-red" :
                                                    "bg-white/5 border-white/10 text-neutral-300"
                                        )}>
                                            {account.type}
                                        </span>
                                    </td>

                                    {/* TARGETS */}
                                    <td className="py-4 px-6 text-sm text-gray-300 font-mono">
                                        {account.targetPhase1}
                                    </td>

                                    {/* DAILY DD */}
                                    <td className="py-4 px-6 text-sm text-gray-300">
                                        {account.maxDailyLoss}
                                    </td>

                                    {/* MAX DD */}
                                    <td className="py-4 px-6 text-sm text-gray-300">
                                        {account.maxTotalLoss}
                                    </td>

                                    {/* PRICE */}
                                    <td className="py-4 px-6 text-white font-bold text-lg">
                                        ${account.price}
                                    </td>

                                    {/* ACTIONS */}
                                    <td className="py-4 px-6 flex items-center justify-end gap-3">
                                        {firm.discountCode && (
                                            <button 
                                              onClick={() => firm.discountCode && handleCopy(firm.discountCode, account.id || account.size)}
                                              className="hidden md:flex items-center gap-1.5 bg-brand-red/5 border border-brand-red/20 px-3 py-2 rounded-xl text-xs text-brand-red font-mono font-bold hover:bg-brand-red/10 transition-colors group cursor-pointer"
                                            >
                                                {copiedBtn === (account.id || account.size) ? (
                                                  <>
                                                    <Check className="w-3.5 h-3.5 text-emerald-400 animate-in zoom-in" />
                                                    <span className="text-emerald-400">Copied!</span>
                                                  </>
                                                ) : (
                                                  <>
                                                    <Copy className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                                                    Code: {firm.discountCode}
                                                  </>
                                                )}
                                            </button>
                                        )}
                                        <a href={firm.affiliateLink || firm.websiteUrl || "#"} target="_blank" rel="noopener noreferrer">
                                            <Button className="bg-gradient-to-r from-brand-red to-brand-orange hover:shadow-[0_0_20px_-3px_rgba(220,38,38,0.5)] text-white font-bold h-10 rounded-xl text-sm px-6 hover:scale-105 transition-all outline-none border-none">
                                                Buy Now <ExternalLink className="w-4 h-4 ml-1.5 opacity-70" />
                                            </Button>
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="py-12 text-center text-gray-500">
                                    No challenges found for this filter.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
