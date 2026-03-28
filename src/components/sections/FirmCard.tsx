"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check, Star, Heart, TrendingUp, DollarSign, ArrowRight, Activity, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FirmCardProps {
    id: string;
    name: string;
    slug: string;
    rating: number;
    reviewCount: number;
    profitSplit: string;
    minAccount: string;
    maxAccount: string;
    platforms: string[];
    discountCode?: string;
    discountValue?: string;
    isVerified?: boolean;
}

export function FirmCard({
    id,
    name,
    slug,
    rating,
    reviewCount,
    profitSplit,
    minAccount,
    maxAccount,
    platforms,
    discountCode,
    discountValue,
    isVerified,
}: FirmCardProps) {
    return (
        <Card className="group relative overflow-hidden rounded-xl border border-white/5 bg-black/60 backdrop-blur-md hover:border-brand-orange/40 transition-all duration-300 h-full flex flex-col hover:shadow-[0_0_30px_rgba(255,100,0,0.1)]">

            {/* Decorative Top Line */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-brand-orange/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <CardHeader className="pb-3 pt-5 px-5">
                <div className="flex justify-between items-start">
                    {/* Logo Placeholder / Name */}
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white text-lg group-hover:text-brand-orange group-hover:border-brand-orange/30 transition-colors">
                            {name.charAt(0)}
                        </div>
                        <div>
                            <CardTitle className="text-lg font-bold text-white leading-tight group-hover:text-brand-orange transition-colors cursor-pointer">
                                <Link href={`/firms/${slug}`} className="hover:underline underline-offset-4 decoration-brand-orange/50">
                                    {name}
                                </Link>
                            </CardTitle>
                            <div className="flex items-center gap-1.5 mt-1">
                                <div className="flex gap-0.5 text-brand-orange">
                                    <Star className="h-3 w-3 fill-current" />
                                    <span className="text-xs font-bold text-white">{rating}</span>
                                </div>
                                <span className="text-[10px] text-muted-foreground/60">({reviewCount} reviews)</span>
                            </div>
                        </div>
                    </div>

                    {/* Discount Badge */}
                    {discountValue && (
                        <Badge className="bg-brand-red/10 text-brand-red hover:bg-brand-red/20 border-brand-red/20 text-xs font-mono font-bold px-2 py-0.5 whitespace-nowrap">
                            <Zap className="h-3 w-3 mr-1 fill-current" />
                            {discountValue} OFF
                        </Badge>
                    )}
                </div>
            </CardHeader>

            <CardContent className="px-5 py-2 flex-grow space-y-4">
                {/* Key Metrics Grid (Terminal Style) */}
                <div className="grid grid-cols-2 gap-2">
                    <MetricBox label="Profit Split" value={profitSplit} icon={<DollarSign className="h-3 w-3 text-brand-orange" />} />
                    <MetricBox label="Min Account" value={minAccount} icon={<TrendingUp className="h-3 w-3 text-green-400" />} />
                    <MetricBox label="Max Funding" value={maxAccount} icon={<Activity className="h-3 w-3 text-blue-400" />} />
                    <MetricBox label="Platforms" value={platforms[0]} icon={<Check className="h-3 w-3 text-muted-foreground" />} />
                </div>

                {/* Code Snippet Box */}
                {discountCode && (
                    <div className="flex items-center justify-between rounded bg-white/5 border border-white/5 border-dashed p-2 px-3 group-hover:border-brand-orange/20 transition-colors">
                        <span className="text-[10px] uppercase text-muted-foreground font-medium tracking-wider">Use Code</span>
                        <code className="text-sm font-mono font-bold text-brand-orange tracking-wide">{discountCode}</code>
                    </div>
                )}
            </CardContent>

            <CardFooter className="px-5 pb-5 pt-2">
                <Button className="w-full h-10 bg-white text-black hover:bg-brand-orange hover:text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-brand-orange/20">
                    Visit Site <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </CardFooter>
        </Card>
    );
}

function MetricBox({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
    return (
        <div className="flex flex-col p-2 rounded bg-black/40 border border-white/5">
            <div className="flex items-center gap-1.5 mb-1">
                {icon}
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{label}</span>
            </div>
            <span className="text-sm font-bold text-white font-mono truncate">{value}</span>
        </div>
    )
}
