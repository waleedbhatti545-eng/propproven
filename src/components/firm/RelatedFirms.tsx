"use client";

import { Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

export function RelatedFirms({ currentFirm }: { currentFirm: any }) {
    const [related, setRelated] = useState<any[]>([]);

    useEffect(() => {
        supabase
            .from("firms")
            .select("slug, name, rating, profitSplit, maxFunding")
            .neq("slug", currentFirm.slug)
            .limit(4)
            .then(({ data }) => setRelated(data || []));
    }, [currentFirm.slug]);

    return (
        <div className="py-12 border-t border-white/5">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">Compare with Similar Firms</h2>
                <Link href="/firms" className="text-[#DC2626] font-semibold flex items-center gap-2 hover:underline">
                    View All Firms <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((firm) => (
                    <div key={firm.slug} className="bg-[#1A1A1A] border border-white/5 rounded-xl p-6 hover:border-white/20 transition-all group">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center font-black text-black text-lg">
                                {firm.name[0]}
                            </div>
                            <div>
                                <h3 className="font-bold text-white group-hover:text-[#DC2626] transition-colors">{firm.name}</h3>
                                <div className="flex text-[#FFC107] text-xs gap-0.5">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className={`w-3 h-3 ${i <= Math.round(firm.rating) ? 'fill-current' : 'opacity-30'}`} />)}
                                    <span className="text-gray-500 ml-1">{firm.rating}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 text-sm text-[#A3A3A3] mb-6">
                            <div className="flex justify-between">
                                <span>Profit Split</span>
                                <span className="text-white font-bold">{firm.profitSplit}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Max Funding</span>
                                <span className="text-white font-bold">{firm.maxFunding}</span>
                            </div>
                        </div>

                        <Link href={`/firms/${firm.slug}`}>
                            <Button className="w-full bg-white/5 hover:bg-white/10 text-white font-semibold">
                                View Details
                            </Button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
