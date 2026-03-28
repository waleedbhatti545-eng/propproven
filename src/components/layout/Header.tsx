"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Globe, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { name: "Firms", href: "/firms" },
    { name: "Compare", href: "/compare" },
    { name: "Promos", href: "/promos" },
    { name: "Payouts", href: "/payouts" },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const pathname = usePathname();
    if (pathname?.startsWith("/admin") || pathname?.startsWith("/sign-in") || pathname?.startsWith("/sign-up") || pathname?.startsWith("/login")) return null;

    return (
        <header className="fixed top-0 z-50 w-full pt-6 pb-4 px-4 md:px-8">
            {/* Floating Navbar Container */}
            <nav
                className={cn(
                    "mx-auto flex items-center justify-between transition-all duration-500 ease-out",
                    "bg-white/5 backdrop-blur-xl border border-white/10 rounded-full",
                    "px-4 md:px-6 py-3",
                    isHovered ? "max-w-6xl shadow-2xl shadow-black/30 bg-white/10" : "max-w-5xl",
                    isScrolled && "bg-white/10 border-white/15"
                )}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >

                {/* Logo - Bigger & More Visible */}
                <Link href="/" className="flex items-center gap-2 group shrink-0">
                    <Image
                        src="/images/logo.png"
                        alt="PropProven Logo"
                        width={200}
                        height={60}
                        className="h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                        unoptimized
                    />
                </Link>

                {/* Center Navigation */}
                <div className={cn(
                    "hidden lg:flex items-center gap-1 transition-all duration-500",
                    isHovered ? "gap-2" : "gap-1"
                )}>
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "px-4 py-2 text-sm font-bold text-gray-300 hover:text-white rounded-full transition-all duration-300",
                                "hover:bg-white/10"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 md:gap-3 shrink-0">

                    {/* Language (Removed Translator) */}

                    {/* Login */}
                    <Link href="/sign-in" className="hidden md:block">
                        <Button
                            variant="ghost"
                            className={cn(
                                "h-10 px-5 rounded-full text-white font-medium transition-all duration-300",
                                "hover:bg-white/10 hover:text-white"
                            )}
                        >
                            Login
                        </Button>
                    </Link>

                    {/* CTA - Brand Red */}
                    <Link href="/firms">
                        <Button className={cn(
                            "h-10 px-6 rounded-full bg-brand-red hover:bg-brand-orange text-white font-bold text-sm transition-all duration-300",
                            "shadow-[0_0_20px_rgba(255,60,0,0.3)] hover:shadow-[0_0_30px_rgba(255,60,0,0.5)]",
                            "hover:scale-105"
                        )}>
                            Trade Now
                        </Button>
                    </Link>

                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-white/10 rounded-full">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="top" className="bg-[#0A0A0A]/95 backdrop-blur-3xl border-b border-white/5 w-full pt-20 pb-8 px-6 rounded-b-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
                            <div className="flex flex-col gap-6 max-h-[80vh] overflow-y-auto pb-6">
                                {/* Navigation Links */}
                                <nav className="flex flex-col gap-2 bg-[#111111] p-2 rounded-3xl border border-white/5">
                                    {NAV_ITEMS.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="px-6 py-4 text-base font-bold text-white hover:bg-white/5 rounded-2xl transition-all flex items-center justify-between"
                                        >
                                            {item.name}
                                            <ChevronDown className="w-4 h-4 opacity-50 -rotate-90" />
                                        </Link>
                                    ))}
                                </nav>
                                
                                {/* Secondary Actions */}
                                <div className="flex flex-col gap-3">
                                    <Link href="/sign-in" className="w-full">
                                        <Button variant="ghost" className="w-full h-14 rounded-2xl bg-[#111111] text-white font-bold hover:bg-white/10 hover:text-white border border-white/5">
                                            Log In
                                        </Button>
                                    </Link>
                                    <Link href="/firms" className="w-full">
                                        <Button className="w-full h-14 rounded-2xl bg-white text-black hover:bg-white/90 font-bold text-base transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                            Get Funded
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>

                </div>
            </nav>
        </header>
    );
}
