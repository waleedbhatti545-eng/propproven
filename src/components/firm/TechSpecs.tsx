"use client";

import { FirmData } from "@/data/firms";
import { Server, Zap, Globe, Clock, Banknote } from "lucide-react";

export function TechSpecs({ firm }: { firm: FirmData }) {
    return (
        <div className="bg-[#0a0a0a] rounded-3xl border border-white/5 p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Server className="w-5 h-5 text-brand-red" /> Technical Specs
            </h3>

            <div className="space-y-6">
                <SpecRow label="Headquarters" value={firm.location} icon={Globe} />
                <SpecRow label="Execution Speed" value={firm.payoutSpeed} icon={Zap} />
                <SpecRow label="Commissions (FX)" value={firm.commissions.forex} icon={Banknote} />
                <SpecRow label="Instruments" value={firm.instruments.join(", ")} icon={Server} />
                <SpecRow label="Payout Speed" value={firm.payoutSpeed} icon={Clock} />
            </div>
        </div>
    )
}

function SpecRow({ label, value, icon: Icon }: { label: string, value: string, icon: any }) {
    return (
        <div className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400">
                    <Icon className="w-4 h-4" />
                </div>
                <span className="text-gray-400 font-medium">{label}</span>
            </div>
            <span className="text-white font-semibold text-right max-w-[50%]">{value}</span>
        </div>
    )
}
