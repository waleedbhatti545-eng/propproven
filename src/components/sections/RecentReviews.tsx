"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Check, Star, ThumbsUp, MessageSquare, Quote } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Review {
    id: string;
    author: string;
    avatar: string;
    rating: number;
    firm: string;
    title: string;
    content: string;
    date: string;
}

const RECENT_REVIEWS: Review[] = [
    {
        id: "1",
        author: "Josh Allen",
        avatar: "JA",
        rating: 5,
        firm: "FTMO",
        title: "Best spreads in the industry",
        content: "Passed my challenge last week. The spreads are super tight on gold and indices. Payout was processed in exactly 24 hours.",
        date: "2 days ago",
    },
    {
        id: "2",
        author: "Sarah Conner",
        avatar: "SC",
        rating: 4,
        firm: "The5ers",
        title: "Incredible scaling matrix",
        content: "I love that they double your account every 10%. The dashboard UI is incredibly smooth. The only downside is the lower leverage on some obscure pairs.",
        date: "5 days ago",
    },
    {
        id: "3",
        author: "Mike Ross",
        avatar: "MR",
        rating: 5,
        firm: "FundedNext",
        title: "Elite live trade matching",
        content: "Had an issue with my MT5 server routing but their discord support desk rerouted it within 10 minutes. Extremely deep liquidity pools.",
        date: "1 week ago",
    },
];

export function RecentReviews() {
    return (
        <section className="py-32 bg-[#050505] border-t border-white/5 relative overflow-hidden">
            {/* Massive Ambient Underglow */}
            <div className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-brand-red/5 blur-[150px] rounded-[100%] pointer-events-none -translate-y-1/2 mix-blend-screen" />
            <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-brand-red/5 blur-[150px] rounded-[100%] pointer-events-none -translate-y-1/2 mix-blend-screen" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                
                <div className="flex flex-col items-center justify-center text-center mb-20 space-y-4">
                    <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-brand-red/10 border border-brand-red/30 text-brand-red text-xs font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(220,38,38,0.1)] mb-2 group cursor-default">
                        <MessageSquare className="h-4 w-4" /> Validated Community Data
                    </div>
                    <h2 className="text-3xl md:text-6xl font-black tracking-tight text-white uppercase leading-none drop-shadow-md">
                        Proven <br className="hidden md:block" /> 
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-[#EF4444] to-[#F97316] drop-shadow-[0_0_30px_rgba(220,38,38,0.4)]">Trader Results</span>
                    </h2>
                    <p className="text-[#A3A3A3] text-lg max-w-2xl font-medium leading-relaxed mt-4">
                        Raw, unfiltered payout logs and evaluation metrics streamed directly from our global network of successfully funded traders.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                    {RECENT_REVIEWS.map((review) => (
                        <div key={review.id} className="h-full">
                            <ReviewCard review={review} />
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center flex flex-col items-center justify-center">
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-brand-red/50 to-transparent mb-8" />
                    <Button asChild className="h-14 px-10 rounded-full bg-transparent border-2 border-brand-red/20 text-brand-red hover:bg-brand-red hover:text-white hover:border-brand-red hover:shadow-[0_0_30px_rgba(220,38,38,0.3)] font-bold text-lg uppercase tracking-wider transition-all duration-500 hover:scale-[1.02]">
                        <Link href="/reviews">Explore All 5,000+ Data Points &rarr;</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}

function ReviewCard({ review }: { review: Review }) {
    return (
        <div className="relative group perspective-1000 h-full">
            {/* Deep hover shadow projection */}
            <div className="absolute inset-2 bg-brand-red/20 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="bg-[#0A0A0A] backdrop-blur-3xl border border-white/10 hover:border-brand-red/50 transition-all duration-500 flex flex-col h-full rounded-[2.5rem] p-8 relative z-10 transform-gpu group-hover:-translate-y-2">
                
                {/* Floating Ethereal Quote Marker */}
                <Quote className="absolute top-6 right-6 w-24 h-24 text-white/[0.03] pointer-events-none -rotate-12 group-hover:text-brand-red/[0.05] transition-colors duration-500" />

                <div className="flex justify-between items-start w-full mb-8 relative z-10">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-14 w-14 border-2 border-[#151515] ring-2 ring-white/10 group-hover:ring-brand-red/50 transition-all duration-500 shadow-xl overflow-hidden rounded-2xl relative">
                            {/* Inner gleam over avatar */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-brand-red/20 to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                            <AvatarFallback className="bg-gradient-to-br from-[#1A1A1A] to-[#050505] text-white font-black text-xl w-full h-full flex justify-center items-center">
                                {review.avatar}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <p className="text-lg font-black text-white flex items-center gap-1.5 uppercase tracking-wide">
                                {review.author}
                                {review.rating >= 4 && (
                                    <span className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center">
                                        <Check className="h-2.5 w-2.5 text-emerald-400" strokeWidth={4} />
                                    </span>
                                )}
                            </p>
                            <p className="text-[11px] text-[#A3A3A3] font-bold uppercase tracking-widest mt-0.5">
                                Funded Via <span className="text-brand-red ml-1">{review.firm}</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex-grow relative z-10 space-y-4">
                    {/* Star Array */}
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < review.rating ? "fill-brand-red text-brand-red drop-shadow-[0_0_8px_rgba(220,38,38,0.6)]" : "text-white/10 fill-white/5"}`} 
                            />
                        ))}
                    </div>

                    <div>
                        <h4 className="font-black text-2xl text-white leading-tight uppercase tracking-tight mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-brand-red transition-all duration-300">"{review.title}"</h4>
                        <p className="text-base text-[#A3A3A3] font-medium leading-relaxed pr-2">
                            {review.content}
                        </p>
                    </div>
                </div>

                {/* Footer Metrics */}
                <div className="w-full pt-6 mt-8 border-t border-dashed border-white/10 flex justify-between items-center text-xs text-neutral-500 font-bold uppercase tracking-widest relative z-10">
                    <span className="bg-[#111111] px-3 py-1.5 rounded-lg border border-white/5 shadow-inner">{review.date}</span>
                    
                    <button className="flex items-center gap-2 hover:text-white transition-colors group/btn bg-white/5 hover:bg-brand-red/20 hover:border-brand-red/30 px-4 py-1.5 rounded-lg border border-transparent">
                        <ThumbsUp className="h-3.5 w-3.5 group-hover/btn:text-brand-red transition-colors group-hover/btn:-translate-y-0.5 duration-300" />
                        Upvote
                    </button>
                </div>

            </div>
        </div>
    )
}
