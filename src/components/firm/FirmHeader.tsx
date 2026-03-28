"use client";

import { FirmData } from "@/data/firms";
import { Star, Heart, Scale, ExternalLink, ShieldCheck, MapPin, Calendar, Layers } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import { Button } from "@/components/ui/button";

export function FirmHeader({ firm }: { firm: FirmData }) {
    return (
        <div className="w-full bg-[#0F0F0F] border-b border-white/5 pt-32 pb-12">
            <div className="max-w-7xl mx-auto px-4 md:px-8">

                <div className="flex flex-col md:flex-row items-start gap-8">

                    {/* 1. Firm Logo (120x120px) */}
                    <div className="w-[120px] h-[120px] rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-lg p-4">
                        {/* Fallback */}
                        <span className={`text-5xl font-black text-${firm.color}-600`}>{firm.name[0]}</span>
                    </div>

                    {/* Content Column */}
                    <div className="flex-grow w-full">

                        {/* 2. Title & Verified Badge */}
                        <div className="flex flex-wrap items-center gap-4 mb-2">
                            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{firm.name}</h1>
                            {firm.trustpilot && (
                                <div className="flex items-center gap-1.5 text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded text-sm font-semibold">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span>Verified Firm</span>
                                </div>
                            )}
                        </div>

                        {/* 3. Rating Display */}
                        <div className="flex items-center gap-4 mb-4 text-sm">
                            <div className="flex items-center text-[#FFC107] gap-1">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <Star key={i} className={`w-5 h-5 ${i <= Math.round(firm.rating) ? 'fill-current' : 'opacity-30'}`} />
                                ))}
                            </div>
                            <span className="text-white font-bold text-lg">{firm.rating} <span className="text-gray-500 font-normal text-sm">/ 5.0</span></span>
                            <a href="#reviews" className="text-gray-400 hover:text-white underline decoration-dotted">({firm.reviewCount} reviews)</a>
                        </div>

                        {/* 4. Meta Info */}
                        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-[#A3A3A3] mb-6">
                            <div className="flex items-center gap-1.5">
                                <ReactCountryFlag countryCode={firm.countryCode} svg className="text-lg" />
                                <span>{firm.location}</span>
                            </div>
                            <span className="hidden md:inline">•</span>
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                <span>Founded {firm.foundedDate}</span>
                            </div>
                            <span className="hidden md:inline">•</span>
                            <div className="flex items-center gap-1.5">
                                <Layers className="w-4 h-4" />
                                <span>Forex, Indices, Commodities</span>
                            </div>
                        </div>

                        {/* 5. Action Buttons */}
                        <div className="flex flex-wrap items-center gap-4">

                            {/* Favorites */}
                            <Button variant="outline" className="border-gray-700 bg-transparent text-white hover:bg-white/5 h-11 px-5 gap-2">
                                <Heart className="w-4 h-4" />
                                Add to Favorites
                            </Button>

                            {/* Compare */}
                            <Button variant="outline" className="border-gray-700 bg-transparent text-white hover:bg-white/5 h-11 px-5 gap-2">
                                <Scale className="w-4 h-4" />
                                Add to Compare
                            </Button>

                            {/* Visit Site - Primary */}
                            <Button className="bg-[#DC2626] hover:bg-red-700 text-white font-semibold h-11 px-8 gap-2 shadow-lg shadow-red-900/20">
                                Visit Site
                                <ExternalLink className="w-4 h-4" />
                            </Button>

                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
