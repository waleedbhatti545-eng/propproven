"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
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

    // Silent page view tracking for analytics
    useEffect(() => {
        if (pathname && !pathname.startsWith("/admin")) {
            fetch("/api/track", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    page_path: pathname,
                    firm_slug: pathname.startsWith("/firms/") ? pathname.split("/firms/")[1] : null,
                    referrer: document.referrer || null,
                }),
            }).catch(() => {});
        }
    }, [pathname]);

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
                <Link href={pathname?.startsWith("/futures") ? "/futures" : "/"} className="flex items-center gap-2 group shrink-0">
                    <Image
                        src={pathname?.startsWith("/futures") ? "/images/futures-logo.png" : "/images/logo.png"}
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
                    {/* Market Toggle Switch */}
                    <div className="flex bg-black/40 border border-white/10 p-1 rounded-full items-center mr-4 shrink-0">
                        <Link 
                            href={pathname?.startsWith("/futures") ? (pathname.replace("/futures", "") || "/") : (pathname || "/")} 
                            className={`px-5 py-1.5 rounded-full text-sm font-bold transition-all ${
                                !(pathname?.startsWith("/futures")) 
                                ? 'bg-brand-red text-white shadow-[0_0_15px_rgba(255,50,50,0.3)]' 
                                : 'text-neutral-500 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            Forex
                        </Link>
                        <Link 
                            href={pathname?.startsWith("/futures") ? pathname : `/futures${pathname === "/" ? "" : pathname}`} 
                            className={`px-5 py-1.5 rounded-full text-sm font-bold transition-all ${
                                pathname?.startsWith("/futures") 
                                ? 'bg-[#06b6d4] text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]' 
                                : 'text-neutral-500 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            Futures
                        </Link>
                    </div>

                    {NAV_ITEMS.map((item) => {
                        const isFutures = pathname?.startsWith("/futures");
                        const targetHref = isFutures ? `/futures${item.href}` : item.href;
                        return (
                        <Link
                            key={item.name}
                            href={targetHref}
                            className={cn(
                                "px-4 py-2 text-sm font-bold text-gray-300 hover:text-white rounded-full transition-all duration-300",
                                "hover:bg-white/10"
                            )}
                        >
                            {item.name}
                        </Link>
                    )})}
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
                    <Link href={pathname?.startsWith("/futures") ? "/futures/firms" : "/firms"}>
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
                            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                            <div className="flex flex-col gap-6 max-h-[80vh] overflow-y-auto pb-6">
                                {/* Mobile Market Toggle */}
                                <div className="flex bg-[#111111] border border-white/5 p-1 rounded-2xl items-center w-full shadow-inner">
                                    <Link 
                                        href={pathname?.startsWith("/futures") ? (pathname.replace("/futures", "") || "/") : (pathname || "/")} 
                                        className={`flex-1 text-center py-3 rounded-xl text-sm font-bold transition-all ${
                                            !(pathname?.startsWith("/futures")) 
                                            ? 'bg-brand-red text-white shadow-[0_0_15px_rgba(255,50,50,0.3)]' 
                                            : 'text-neutral-500 hover:text-white hover:bg-white/5'
                                        }`}
                                    >
                                        Forex
                                    </Link>
                                    <Link 
                                        href={pathname?.startsWith("/futures") ? pathname : `/futures${pathname === "/" ? "" : pathname}`} 
                                        className={`flex-1 text-center py-3 rounded-xl text-sm font-bold transition-all ${
                                            pathname?.startsWith("/futures") 
                                            ? 'bg-[#06b6d4] text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]' 
                                            : 'text-neutral-500 hover:text-white hover:bg-white/5'
                                        }`}
                                    >
                                        Futures
                                    </Link>
                                </div>

                                {/* Navigation Links */}
                                <nav className="flex flex-col gap-2 bg-[#111111] p-2 rounded-3xl border border-white/5">
                                    {NAV_ITEMS.map((item) => {
                                        const isFutures = pathname?.startsWith("/futures");
                                        const targetHref = isFutures ? `/futures${item.href}` : item.href;
                                        return (
                                        <Link
                                            key={item.name}
                                            href={targetHref}
                                            className="px-6 py-4 text-base font-bold text-white hover:bg-white/5 rounded-2xl transition-all flex items-center justify-between"
                                        >
                                            {item.name}
                                            <ChevronDown className="w-4 h-4 opacity-50 -rotate-90" />
                                        </Link>
                                    )})}
                                </nav>
                                
                                {/* Secondary Actions */}
                                <div className="flex flex-col gap-3">
                                    <Link href="/sign-in" className="w-full">
                                        <Button variant="ghost" className="w-full h-14 rounded-2xl bg-[#111111] text-white font-bold hover:bg-white/10 hover:text-white border border-white/5">
                                            Log In
                                        </Button>
                                    </Link>
                                    <Link href={pathname?.startsWith("/futures") ? "/futures/firms" : "/firms"} className="w-full">
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
