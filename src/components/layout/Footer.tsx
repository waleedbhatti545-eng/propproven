"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

const FOOTER_LINKS = {
    Product: [
        { label: "Prop Firms", href: "/firms" },
        { label: "Compare Tool", href: "/compare" },
        { label: "Payout Proofs", href: "/payouts" },
        { label: "Promo Codes", href: "/promos" },
    ],
    Resources: [
        { label: "Trading Guides", href: "/guides" },
        { label: "Evaluation Help", href: "/help" },
        { label: "Prop Strategies", href: "/strategies" },
        { label: "Risk Calculator", href: "/calculator" },
    ],
    Company: [
        { label: "About Us", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Careers", href: "/careers" },
        { label: "Partners", href: "/partners" },
    ],
    Legal: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Affiliate Disclaimer", href: "/disclaimer" },
    ],
};

export function Footer() {
    const pathname = usePathname();
    if (pathname?.startsWith("/admin") || pathname?.startsWith("/sign-in") || pathname?.startsWith("/sign-up") || pathname?.startsWith("/login")) return null;

    return (
        <footer className="w-full border-t border-border bg-dark-bg text-secondary-foreground py-16 md:py-24 lg:py-32">
            <div className="container-width px-4 md:px-6">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
                    <div className="col-span-2 lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            {/* Replaced Text with Real Logo */}
                            <img
                                src="/images/logo.png"
                                alt="PropProven Logo"
                                className="h-10 md:h-12 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                            />
                        </Link>
                        <p className="text-muted-foreground max-w-xs mb-6 text-sm leading-relaxed">
                            Find your proven trading partner. The most trusted comparison platform for proprietary trading firms, verifying payouts and rules so you don't have to.
                        </p>
                        <div className="flex items-center gap-4 text-muted-foreground">
                            <Link href="#" className="hover:text-brand-red transition-colors">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link href="#" className="hover:text-brand-red transition-colors">
                                <Youtube className="h-5 w-5" />
                                <span className="sr-only">YouTube</span>
                            </Link>
                            <Link href="#" className="hover:text-brand-red transition-colors">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link href="#" className="hover:text-brand-red transition-colors">
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="font-semibold text-white">Product</h3>
                        <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                            {FOOTER_LINKS.Product.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="hover:text-brand-red transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="font-semibold text-white">Resources</h3>
                        <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                            {FOOTER_LINKS.Resources.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="hover:text-brand-red transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="font-semibold text-white">Company</h3>
                        <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                            {FOOTER_LINKS.Company.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="hover:text-brand-red transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>© 2026 PropProven. All rights reserved.</p>
                    <div className="flex gap-6">
                        {FOOTER_LINKS.Legal.map((link) => (
                            <Link key={link.href} href={link.href} className="hover:text-brand-red transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
