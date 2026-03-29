"use client";

import { FirmData } from "@/data/firms";
import { Star, ThumbsUp, MessageSquare, Flag, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TabReviews({ firm }: { firm: FirmData }) {
    const ratingDistribution = firm.ratingDistribution || [0, 0, 0, 0, 0];
    const totalRatings = ratingDistribution.reduce((a, b) => a + b, 0);
    // Enforce Review Moderation: Only show Approved or Featured reviews publicly
    const userReviews = (firm.userReviews || []).filter(
        (r: any) => !r.status || r.status === "Approved" || r.status === "Featured"
    );

    return (
        <div className="space-y-12">

            {/* A. RATING BREAKDOWN */}
            <div className="bg-[#1A1A1A] p-8 rounded-xl border border-white/5 flex flex-col md:flex-row gap-12 items-center">

                {/* Left: Big Score */}
                <div className="flex flex-col items-center justify-center text-center shrink-0">
                    <span className="text-6xl font-bold text-white mb-2">{firm.rating}</span>
                    <div className="flex text-[#FFC107] gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className={`w-6 h-6 ${i <= Math.round(firm.rating) ? 'fill-current' : 'opacity-30'}`} />)}
                    </div>
                    <span className="text-[#A3A3A3] text-sm">Based on {firm.reviewCount.toLocaleString()} reviews</span>
                </div>

                {/* Right: Bars */}
                <div className="flex-grow w-full space-y-3">
                    {[5, 4, 3, 2, 1].map((stars, idx) => {
                        const count = ratingDistribution[idx] || 0;
                        const percentage = totalRatings > 0 ? (count / totalRatings) * 100 : 0;
                        return (
                            <div key={stars} className="flex items-center gap-4 text-sm">
                                <span className="w-8 font-bold text-white text-right">{stars} ★</span>
                                <div className="flex-grow h-3 bg-[#0F0F0F] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-[#FFC107] rounded-full"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                                <span className="w-12 text-[#A3A3A3] text-right">{Math.round(percentage)}%</span>
                                <span className="w-16 text-[#A3A3A3] text-right text-xs">({count})</span>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* B. REVIEWS LIST */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">{firm.reviews} Verified Reviews</h3>
                    <select className="bg-[#1A1A1A] border border-white/10 text-white text-sm rounded-lg px-3 py-1.5 focus:outline-none">
                        <option>Most Recent</option>
                        <option>Highest Rated</option>
                        <option>Lowest Rated</option>
                    </select>
                </div>

                {userReviews.map((review: any) => (
                    <div key={review.id} className="bg-[#1A1A1A] p-6 rounded-xl border border-white/5">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#2A2A2A] flex items-center justify-center font-bold text-white">
                                    {review.author[0]}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-white">{review.author}</span>
                                        {review.verified && <CheckCircle className="w-3 h-3 text-[#10B981]" />}
                                    </div>
                                    <div className="text-xs text-[#A3A3A3]">{review.date}</div>
                                </div>
                            </div>
                            <div className="flex text-[#FFC107] gap-0.5">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} className={`w-4 h-4 ${i <= review.rating ? 'fill-current' : 'opacity-30'}`} />)}
                            </div>
                        </div>

                        <h4 className="font-bold text-white mb-2">{review.title}</h4>
                        <p className="text-[#A3A3A3] text-sm leading-relaxed mb-6">
                            {review.content}
                        </p>

                        <div className="flex items-center gap-6 text-xs text-[#A3A3A3]">
                            <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                                <ThumbsUp className="w-4 h-4" /> Helpful ({review.helpfulCount})
                            </button>
                            <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                                <Flag className="w-4 h-4" /> Report
                            </button>
                        </div>
                    </div>
                ))}

                <Button variant="outline" className="w-full border-white/10 text-[#A3A3A3] hover:text-white hover:bg-white/5">
                    Load More Reviews
                </Button>
            </div>

        </div>
    );
}
