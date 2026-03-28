"use client";

import { FirmData } from "@/data/firms";
import { Check, Calendar, Wallet, Layers, ShieldCheck } from "lucide-react";

export function TabPayouts({ firm }: { firm: FirmData }) {
    return (
        <div className="space-y-12">

            {/* A. PAYOUT STRUCTURE */}
            <div className="bg-[#1A1A1A] border border-white/5 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-white/5 bg-white/5">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Wallet className="w-5 h-5 text-[#10B981]" /> Payout Structure
                    </h2>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <PayoutItem label="Profit Split" value={firm.profitSplit} icon={<Layers className="w-4 h-4" />} />
                        <PayoutItem label="Frequency" value={firm.payoutFrequency} icon={<Calendar className="w-4 h-4" />} />
                        <PayoutItem label="Minimum Payout" value="1% of Balance" icon={<Wallet className="w-4 h-4" />} />
                        <PayoutItem label="Processing Time" value={firm.payoutSpeed} icon={<Clock className="w-4 h-4" />} />
                    </div>
                    <div className="bg-[#10B981]/5 p-6 rounded-xl border border-[#10B981]/10">
                        <h3 className="text-[#10B981] font-bold mb-4 flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5" /> Guaranteed Payouts
                        </h3>
                        <p className="text-sm text-[#A3A3A3] leading-relaxed">
                            {firm.name} guarantees payouts for all profitable traders who adhere to the strict trading rules.
                            Payouts are processed via Deel, Crypto, or Bank Transfer with zero hidden fees.
                        </p>
                    </div>
                </div>
            </div>

            {/* B. PAYOUT METHODS */}
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-white">Supported Withdrawal Methods</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {firm.payoutMethods.map((method, i) => (
                        <div key={i} className="bg-[#1A1A1A] p-4 rounded-xl border border-white/5 hover:border-white/10 flex items-center justify-center text-center font-bold text-white">
                            {method}
                        </div>
                    ))}
                </div>
            </div>

            {/* C. VERIFIED PAYOUTS (Placeholder) */}
            <div className="bg-[#1A1A1A] p-8 rounded-xl border border-white/5">
                <h3 className="text-xl font-bold text-white mb-6">Recent Verified Payouts</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white/5 p-4 rounded-lg flex items-center justify-between">
                            <div>
                                <div className="text-xs text-[#A3A3A3]">Jan 1{i}, 2026</div>
                                <div className="font-bold text-white text-lg">${(Math.random() * 5000 + 1000).toFixed(2)}</div>
                            </div>
                            <div className="text-[#10B981] text-xs font-bold uppercase bg-[#10B981]/10 px-2 py-1 rounded">Paid</div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

function Clock({ className }: { className?: string }) { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg> }

function PayoutItem({ label, value, icon }: { label: string, value: string, icon?: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0">
            <div className="flex items-center gap-3 text-[#A3A3A3]">
                {icon}
                <span>{label}</span>
            </div>
            <span className="font-bold text-white">{value}</span>
        </div>
    )
}
